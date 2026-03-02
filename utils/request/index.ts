/*
 * @Author: colpu
 * @Date: 2026-01-22 08:59:47
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-03-02
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */

import { interceptors, RequestInterceptor } from "./interceptor";
import { TOKEN } from "@/constants";
import { getItem, removeItem, setItem } from "../storage";
import { normalizeToken } from "../token";
import type { UserToken } from "@/store/user/types";
import { isClient } from "..";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// 401 刷新相关状态
let isRefreshing = false;
type QueuedItem = {
  resolve: (token: UserToken) => void;
  reject: (err: unknown) => void;
  url: string;
  options: Record<string, any>;
};
const failedQueue: QueuedItem[] = [];
const processQueue = (token?: UserToken, error?: unknown) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else if (token) p.resolve(token);
  });
  failedQueue.length = 0;
};

const redirectToLogin = () => {
  if (!isClient) return;
  removeItem(TOKEN);
  const path = encodeURIComponent(window.location.pathname + window.location.search);
  window.location.replace(`/login?redirect=${path}`);
};
// ==================== 类型定义 ====================
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export interface RequestExtra {
  original?: boolean; // 是否返回原始响应数据
  skipAuth?: boolean; // 是否跳过认证
  skipError?: boolean; // 是否跳过错误处理
  [key: string]: any;
}

export type FetchOptions<T = unknown> = Omit<RequestInit, "body" | "method"> & {
  method?: HttpMethod;
  data?: T; // 请求体，使用泛型
  params?: Record<string, string | number | boolean | null | undefined>;
  extra?: RequestExtra;
};

export interface ApiResponse<T = any> {
  status: number;
  data: T;
  message?: string;
  timestamp?: string;
}

// 重试拦截器（最多重试3次）
export const retryInterceptor = (
  maxRetries: number = 3,
): RequestInterceptor => ({
  onError: async (error, extra) => {
    // 如果设置了 skipError，不重试
    if (extra?.skipError) {
      return Promise.reject(error);
    }

    const retryCount = error.config?.retryCount || 0;
    if (retryCount < maxRetries) {
      console.log(`重试请求 (${retryCount + 1}/${maxRetries})`);
      error.config.retryCount = retryCount + 1;
      return fetcher(error.url, { ...error.config, extra });
    }
    return Promise.reject(error);
  },
});

// ==================== 主 fetch 函数 ====================
export async function fetcher<TResponse = any, TBody = unknown>(
  url: string,
  options: FetchOptions<TBody> = {},
): Promise<TResponse> {
  // 默认 headers
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const { params, data, extra, method = "GET", ...reset } = options;

  // 构建完整 URL
  let fullUrl = composeUrl(url, method === "GET" ? params : undefined);

  // 构建请求配置
  let config: RequestInit = {
    ...reset,
    method,
    headers,
  };

  // 非 GET 请求，将 data 作为 body
  if (method !== "GET" && data !== undefined) {
    config.body = JSON.stringify(data);
  }
  try {
    // 应用请求拦截器
    [config, fullUrl] = await interceptors.applyRequest(config, fullUrl);

    const res = await fetch(fullUrl, config);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const error = {
        status: res.status,
        statusText: res.statusText,
        data: errorData,
        config,
        url: fullUrl,
      };
      // 401：尝试刷新 token 后重试
      if (
        res.status === 401 &&
        !extra?.isRefreshRequest &&
        isClient
      ) {
        const userToken: UserToken = getItem(TOKEN) || {};
        if (!userToken.refresh_token) {
          redirectToLogin();
          return Promise.reject(error);
        }
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: () => resolve(fetcher(url, options)),
              reject,
              url,
              options,
            });
          });
        }
        isRefreshing = true;
        try {
          const rawToken = await post("token", {
            grant_type: "refresh_token",
            refresh_token: userToken.refresh_token,
          }, {
            extra: { skipAuth: true, isRefreshRequest: true },
          });
          const token = normalizeToken(rawToken as UserToken);
          setItem(TOKEN, token);
          isRefreshing = false;
          processQueue(token);
          return fetcher(url, options);
        } catch (e) {
          isRefreshing = false;
          processQueue(undefined, e);
          redirectToLogin();
          return Promise.reject(error);
        }
      }
      return interceptors.applyError(error, extra);
    }

    const response = await res.json();
    const processedResponse = returnResponse<TResponse>(response, extra);

    // 应用响应拦截器
    return interceptors.applyResponse(processedResponse);
  } catch (error) {
    console.error("Fetch server error:", error);
    return interceptors.applyError(error, extra);
  }
}

// ==================== 响应处理 ====================
function returnResponse<T>(data: any, extra?: RequestExtra): T {
  if (extra?.original) {
    return data as T;
  }

  // 假设后端返回格式为 { status: 0, data: T, message?: string }
  if (data && data.status === 0) {
    return data.data as T;
  }

  return data as T;
}

// ==================== URL 构建 ====================
function composeUrl(url: string, params?: Record<string, any>): string {
  const _url = url.startsWith("http")
    ? url
    : `${BASE_URL}/${url.replace(/^\//, "")}`;
  const fullUrl = new URL(_url);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        fullUrl.searchParams.set(key, String(value));
      }
    });
  }

  return fullUrl.toString();
}

// ==================== 请求方法生成器 ====================
function createRequestMethod<TBody = any, TResponse = any>(method: HttpMethod) {
  return (
    url: string,
    data?: TBody,
    options?: Omit<FetchOptions<TBody>, "method" | "data">,
  ) => {
    const config: FetchOptions<TBody> = {
      ...options,
      method,
      data: method !== "GET" ? data : undefined,
      params:
        method === "GET" ? (data as Record<string, any>) : options?.params,
    };
    return fetcher<TResponse, TBody>(url, config);
  };
}

// ==================== 导出方法 ====================
export const get = createRequestMethod("GET");
export const post = createRequestMethod("POST");
export const put = createRequestMethod("PUT");
export const del = createRequestMethod("DELETE");
export const patch = createRequestMethod("PATCH");

// ==================== 类型安全版本 ====================
export const getTyped = <TResponse, TParams = any>(
  url: string,
  params?: TParams,
  options?: Omit<FetchOptions<TParams>, "method" | "data">,
) => createRequestMethod<TParams, TResponse>("GET")(url, params, options);

export const postTyped = <TBody, TResponse>(
  url: string,
  data?: TBody,
  options?: Omit<FetchOptions<TBody>, "method" | "data">,
) => createRequestMethod<TBody, TResponse>("POST")(url, data, options);

export const putTyped = <TBody, TResponse>(
  url: string,
  data?: TBody,
  options?: Omit<FetchOptions<TBody>, "method" | "data">,
) => createRequestMethod<TBody, TResponse>("PUT")(url, data, options);

export const deleteTyped = <TBody, TResponse>(
  url: string,
  data?: TBody,
  options?: Omit<FetchOptions<TBody>, "method" | "data">,
) => createRequestMethod<TBody, TResponse>("DELETE")(url, data, options);

export const patchTyped = <TBody, TResponse>(
  url: string,
  data?: TBody,
  options?: Omit<FetchOptions<TBody>, "method" | "data">,
) => createRequestMethod<TBody, TResponse>("PATCH")(url, data, options);
