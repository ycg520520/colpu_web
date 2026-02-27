/*
 * @Author: colpu
 * @Date: 2026-02-10 14:27:06
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-12 17:25:16
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
"use client";

import { Button, ButtonProps } from "@heroui/react";
export default function ClientButton({ children, ...props }: ButtonProps) {
  return <Button {...props}>{children}</Button>;
}
