/*
 * @Author: colpu
 * @Date: 2026-01-26 15:50:34
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-18 22:25:26
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
import Link from "next/link";
import Drapdown from "./Drapdown";
export default function Menu({ item }: any) {
  const items = item.children || [];
  if (items.length > 0) {
    return (
      <Drapdown items={items}>
        <Link className="inline-block px-4 py-2 " href={item.path}>{item.name}</Link>
      </Drapdown>
    );
  } else {
    return <Link className="inline-block px-4 py-2 " href={item.path}>{item.name}</Link>;
  }
}
