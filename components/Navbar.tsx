"use client";
/*
 * @Author: colpu
 * @Date: 2026-01-23 16:12:07
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-18 22:24:44
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */

import { isCurrentPath } from "@/utils";
import { usePathname } from "next/navigation";
import Menu from "@/components/Menu";
const Hot = () => {
  return (
    <div className="absolute -top-1 -right-2 bg-gradient-to-r from-green-500 to-blue-500 font-bold text-white text-[10px] px-2 py-1 rounded-full shadow-sm scale-75">
      HOT
    </div>
  );
};
export default function Navbar({ menus }: { menus: any[] }) {
  const pathname = usePathname(); // 获取当前路径
  return (
    <nav className="hidden md:flex">
      <ul className="flex text-base items-center gap-2 ml-8">
        {menus.map((item, index) => {
          const path = item.path;
          const isActive = isCurrentPath(pathname, path);
          return (
            <li
              key={path}
              className={[
                "transition-all duration-200 rounded-full hover:text-primary-600 hover:bg-neutral-50 relative cursor-pointer font-medium",
                isActive
                  ? "text-primary hover:text-primary-600 bg-primary-50 hover:bg-primary-50 font-bold"
                  : "",
              ].join(" ")}
            >
              <Menu item={item} />
              {item.path === "/news" ? <Hot /> : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
