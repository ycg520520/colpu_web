/*
 * @Author: colpu
 * @Date: 2026-01-27 09:16:28
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-15 20:44:32
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
import Image from "next/image";
import Logo from "@/public/logo.svg";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { composeClassName } from "@/utils";
export default function Figure(
  props?: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
) {
  return (
    <figure {...props} className={composeClassName("flex items-center gap-2 cursor-pointer group flex-shrink-0", props?.className)}>
      <div className="w-10 h-10 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
        <Image
          src={Logo}
          className="w-10 h-10 bg-primary rounded-[3]"
          alt={"ColpuCMS管理系统"}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xl mb-1 font-bold bg-gradient-to-r from-primary-600 to-primary bg-clip-text text-transparent tracking-[-1]">
          ColpuCMS
        </span>
        <div className="flex items-center gap-2 -mt-1">
          <span className="text-xs text-neutral-500 font-medium">
            一款轻量级CMS管理系统
          </span>
        </div>
      </div>
    </figure>
  );
}
