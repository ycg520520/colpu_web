/*
 * @Author: colpu
 * @Date: 2026-02-10 14:27:06
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-27 22:21:00
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
"use client";

import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { addToast, ToastProvider } from "@heroui/toast";
import { HeroUIProvider } from "@heroui/react";
export default function CopyButton({
  children,
  ...reset
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      {...{
        onClick: () => {
          addToast({
            title: "拷贝成功",
            color: "success",
            hideIcon: true,
            hideCloseButton: true,
            timeout: 3000,
            classNames: {
              base: [
                "sm:w-auto py-2",
                "bg-primary shadow-xs",
                "border-none rounded-full",
                "flex items-start",
                "text-white",
              ],
              content: ["justify-center w-full"],
              title: ["w-full text-white me-0"],
            },
          });
          // navigator.clipboard.writeText(children as string);
        },
        ...reset,
      }}
    >
      {children}
    </button>
  );
}
