/*
 * @Author: colpu
 * @Date: 2026-02-15 21:20:50
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-15 21:23:01
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
"use client";
import { HeroUIProvider } from "@heroui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
