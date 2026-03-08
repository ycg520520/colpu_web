/*
 * @Author: colpu
 * @Date: 2026-02-18 22:07:20
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-03-08 19:41:17
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
"use client";
import Link from "next/link";
export default function Drapdown({
  children,
  items,
}: {
  children: React.ReactNode;
  items: any[];
}) {
  return (
    <div className="inline-block relative transition-all duration-200 group">
      {children}
      <div className="w-[100px] absolute left-[50%] -ml-[50px] rounded-sm bg-white drop-shadow-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white -ml-[6px] -top-[6px] left-[50%] absolute"></div>
        <ul className="rounded-sm overflow-hidden py-2">
          {items.map((item: any, index: number) => {
            return (
              <li
                key={index}
                className="px-2 text-foreground hover:text-primary hover:bg-neutral-100 leading-[2] text-sm font-normal"
              >
                {item.node ? (
                  item.node
                ) : (
                  <Link href={item.path}>{item.name}</Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
