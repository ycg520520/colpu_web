/*
 * @Author: colpu
 * @Date: 2026-02-18 18:21:05
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-25 17:08:21
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
"use client";
import { userStore } from "@/store/user";
import { User } from "@heroui/react";
import Dropdown from "./Drapdown";
import { useRouter } from "next/navigation";
export default function HeaderUser() {
  const { user } = userStore();
  const { logout } = userStore();
  const router = useRouter();
  const items: any[] = [
    {
      node: (
        <span
          className="cursor-pointer"
          onClick={() => {
            logout().then(() => {
              router.replace("/login");
            });
          }}
        >
          退出登陆
        </span>
      ),
    },
  ];

  return (
    <div className="ml-4">
      <Dropdown items={items}>
        {user ? (
          <User
            name={user.nickname}
            description={user.remark || "什么也没留下"}
            avatarProps={{
              src: user.avatar,
            }}
          />
        ) : (
          <a
            href="/login"
            className="text-gray-600 hover:text-gray-900 transition-colors inline-block py-2"
          >
            登录<span className="text-gray-300 m-1">/</span>注册
          </a>
        )}
      </Dropdown>
    </div>
  );
}
