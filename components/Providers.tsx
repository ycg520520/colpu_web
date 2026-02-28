/*
 * @Author: colpu
 * @Date: 2026-02-21 16:01:45
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-27 22:22:55
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
"use client";
import { userStore } from "@/store/user";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { useEffect } from "react";
export default function Providers({ children }: { children: React.ReactNode }) {
  const { userToken, user, userInfo, getToken } = userStore();
  useEffect(() => {
    if (!userToken) {
      getToken();
    }
    if (userToken && !user) {
      userInfo();
    }
  }, [userToken, user]);
  return (
    <HeroUIProvider>
      <ToastProvider placement="top-center" toastOffset={100} />
      {children}
    </HeroUIProvider>
  );
}
