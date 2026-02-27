/*
 * @Author: colpu
 * @Date: 2026-01-24 11:08:31
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-13 18:19:28
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // 1. 获取完整的 nextUrl 信息
  const {
    pathname,
    search = "",
    protocol,
    host,
    port,
    hash = "",
  } = request.nextUrl;
  // 2. 构建完整 URL
  const fullUrl = `${protocol}//${host}${pathname}${hash}${search}`;
  // 3. 解析路径段
  const segments = pathname.split("/").filter(Boolean);
  // 4. 通过 headers 传递给页面组件
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-host", host);
  requestHeaders.set("x-protocol", protocol);
  requestHeaders.set("x-port", port);
  requestHeaders.set("x-full-url", fullUrl);
  requestHeaders.set("x-pathname", pathname);
  requestHeaders.set("x-segments", JSON.stringify(segments));
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.well-known).*)"],
};
