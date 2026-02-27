/*
 * @Author: colpu
 * @Date: 2026-02-12 22:39:19
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-13 00:54:58
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
import { getMenus } from "@/api";
import Link from "next/link";

interface BreadcrumbProps {
  crumbs?: any[];
  path?: string;
  className?: string;
  style?: React.CSSProperties;
}
export async function getCrumbsByPath(path: string) {
  const crumbs: any[] = [];
  const { dict } = (await getMenus()) as any;
  const paths = path.split("/");
  paths.forEach((_, idx) => {
    const pathKey = paths.slice(0, idx + 1).join("/") || "/";
    const item = dict[pathKey];
    if (item) {
      crumbs.push(item);
    }
  });
  return crumbs;
}
export default async function NewsBreadcrumb({
  crumbs = [],
  path,
  className,
  style,
}: BreadcrumbProps) {
  if(path) {
    crumbs = await getCrumbsByPath(path);
  }
  const len = crumbs.length - 1;
  return (
    <ul
      className={`flex items-center text-gray-400 ${className}`}
      style={style}
    >
      {crumbs.map((item: any, index: number) => {
        return (
          <li key={index} className="flex items-center">
            {index > 0 ? <span className="mx-2 text-gray-200">/</span> : null}
            {index < len ? (
              <Link
                href={item.path}
                className="hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-primary" aria-current="page">
                {item.name}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
