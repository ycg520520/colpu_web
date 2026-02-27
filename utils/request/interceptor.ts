import { config } from "./../../proxy";
/*
 * @Author: colpu
 * @Date: 2026-02-18 15:01:42
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-25 17:25:22
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */

import { TOKEN } from "@/constants";
import { RequestExtra } from ".";
import { isClient } from "..";
import { getItem } from "../storage";

export interface RequestInterceptor {
  onRequest?: (
    config: RequestInit,
    url: string,
    extra?: RequestExtra,
  ) => Promise<[RequestInit, string]>;
  onResponse?: <T>(response: T, extra?: RequestExtra) => Promise<T>;
  onError?: (error: any, extra?: RequestExtra) => Promise<any>;
}

// ==================== 拦截器管理 ====================
class InterceptorManager {
  private requestInterceptors: RequestInterceptor[] = [];

  add(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);
  }

  remove(interceptor: RequestInterceptor) {
    const index = this.requestInterceptors.indexOf(interceptor);
    if (index > -1) {
      this.requestInterceptors.splice(index, 1);
    }
  }

  async applyRequest(
    config: RequestInit,
    url: string,
    extra?: RequestExtra,
  ): Promise<[RequestInit, string]> {
    let currentConfig = { ...config };
    let currentUrl = url;

    for (const interceptor of this.requestInterceptors) {
      if (interceptor.onRequest) {
        try {
          [currentConfig, currentUrl] = await interceptor.onRequest(
            currentConfig,
            currentUrl,
            extra,
          );
        } catch (error) {
          console.error("Request interceptor error:", error);
        }
      }
    }

    return [currentConfig, currentUrl];
  }

  async applyResponse<T>(response: T, extra?: RequestExtra): Promise<T> {
    let currentResponse = response;

    for (const interceptor of this.requestInterceptors) {
      if (interceptor.onResponse) {
        try {
          currentResponse = await interceptor.onResponse(
            currentResponse,
            extra,
          );
        } catch (error) {
          console.error("Response interceptor error:", error);
        }
      }
    }

    return currentResponse;
  }

  async applyError(error: any, extra?: RequestExtra): Promise<any> {
    let currentError = error;

    // 如果设置了 skipError，直接返回错误，不经过拦截器
    if (extra?.skipError) {
      return Promise.reject(currentError);
    }

    for (const interceptor of this.requestInterceptors) {
      if (interceptor.onError) {
        try {
          currentError = await interceptor.onError(currentError, extra);
        } catch (e) {
          console.error("Error interceptor error:", e);
        }
      }
    }

    return Promise.reject(currentError);
  }
}

// ==================== 内置拦截器示例 ====================
// 认证拦截器
export const authInterceptor: RequestInterceptor = {
  onRequest: async (config, url, extra) => {
    // 如果设置了skipAuth，直接跳过
    if (extra?.skipAuth || !isClient) {
      return [config, url];
    }
    const tokens = getItem(TOKEN);
    if (tokens) {
      config.headers = new Headers(config.headers);
      config.headers.set(
        "Authorization",
        `${tokens.token_type} ${tokens.access_token}`,
      );
    }
    return [config, url];
  },
  onError: async (error) => {
    if (error.status === 401) {
      console.log("error.status", error.status, error.config);
      // 重定向到登录页
      if (isClient) {
        // window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
};

// 日志拦截器（支持 skipLogger）
export const loggerInterceptor: RequestInterceptor = {
  onRequest: async (config, url, extra) => {
    if (extra?.skipLogger) {
      console.log(`[Request] ${config.method} ${url}`, { config, extra });
    }
    return [config, url];
  },
  onResponse: async (response, extra) => {
    if (extra?.skipLogger) {
      console.log("[Response]", { response, extra });
    }
    return response;
  },
  onError: async (error, extra) => {
    debugger;
    if (!extra?.skipLogger) {
      console.error("[Error]", { error, extra });
    }
    return Promise.reject(error);
  },
};

// ==================== 默认添加拦截器 ====================

export const interceptors = new InterceptorManager();
interceptors.add(loggerInterceptor);
interceptors.add(authInterceptor);
