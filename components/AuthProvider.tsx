/*
 * @Author: colpu
 * @Date: 2026-02-21 16:01:45
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-25 17:00:52
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
"use client";
import { userStore } from "@/store/user";
import { useEffect } from "react";
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userToken, user, userInfo, getToken } = userStore();
  useEffect(() => {
    if (!userToken) {
      getToken();
    }
    if (userToken && !user) {
      userInfo();
    }
  }, [userToken, user]);
  return children;
}
