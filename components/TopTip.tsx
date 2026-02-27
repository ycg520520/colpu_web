"use client";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { composeClassName } from "@/utils";

/*
 * @Author: colpu
 * @Date: 2026-01-24 18:01:55
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-16 17:12:06
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
export default function TopTip(
  props?: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
) {
  const [open, setOpen] = useState(true);
  return open ? (
    <div
      className={composeClassName(
        "bg-gradient-to-r from-green-500 to-green-600 text-white p-2 text-center",
        props?.className,
      )}
    >
      <div className="flex items-center justify-center gap-2 cursor-pointer">
        <Icon className="w-5 h-5" fill="currentColor" icon="si:check-fill" />
        <span>基于Nodejs，Koa+mysql的一款轻量级CMS管理系统</span>
        <div
          className="!bg-transparent !text-white p-0 h-auto"
          onClick={() => setOpen(false)}
        >
          <Icon icon="si:close-line" width="24" height="24" />
        </div>
      </div>
    </div>
  ) : null;
}
