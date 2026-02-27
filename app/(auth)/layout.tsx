import TopTip from "@/components/TopTip";

/*
 * @Author: colpu
 * @Date: 2026-02-14 17:56:47
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-14 21:24:05
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopTip className="sticky top-0" />
      {children}
    </>
  );
}
