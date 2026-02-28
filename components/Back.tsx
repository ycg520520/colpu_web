/*
 * @Author: colpu
 * @Date: 2026-02-10 14:27:06
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-12 17:29:44
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
"use client";
export default function Back({ children, ...props }: any) {
  return (
    <button
      {...props}
      onClick={() => {
        window.history.back();
      }}
    >
      {children}
    </button>
  );
}
