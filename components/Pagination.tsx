/*
 * @Author: colpu
 * @Date: 2026-02-12 20:11:52
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-13 19:25:11
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */

import Link from "next/link";

// 生成页码数组
const getPageNumbers = (
  totalPages: number,
  currentPage: number,
  options: {
    delta?: number; // 当前页前后显示几页
    ellipsis?: string; // 省略号
  } = {},
) => {
  const { delta = 2, ellipsis = "..." } = options;
  const range = [];
  const rangeWithDots: (string | number)[] = [];
  let l: number;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    }
  }
  range.forEach((i) => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push(ellipsis);
      }
    }
    rangeWithDots.push(i);
    l = i;
  });

  return rangeWithDots;
};
// 分页组件
export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  delta,
  ellipsis = "...",
  className = "",
  style,
}: {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  delta?: number;
  ellipsis?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  currentPage = Number(currentPage); // 解决传惨不为数字的问题
  if (totalPages > 0) {
    return (
      <nav
        style={style}
        className={`flex justify-center items-center space-x-2 text-sm ${className}`}
      >
        {/* 上一页 */}
        <Link
          href={currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : "#"}
          className={`px-3 py-2 rounded-xs bg-gray-50 ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-primary hover:bg-gray-100"
          }`}
          aria-disabled={currentPage === 1}
        >
          上一页
        </Link>

        {/* 页码 */}
        {getPageNumbers(totalPages, currentPage, {
          delta,
          ellipsis,
        }).map((page, index) => {
          return (
            <Link
              key={index}
              href={page === ellipsis ? "#" : `${baseUrl}?page=${page}`}
              className={`inline-block px-3 py-2 rounded-xs min-w-[1rem] text-gray-500 ${
                page === currentPage
                  ? "bg-primary text-white font-bold"
                  : page === ellipsis
                    ? "cursor-default"
                    : "bg-gray-50 hover:bg-gray-100"
              }`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </Link>
          );
        })}

        {/* 下一页 */}
        <Link
          href={
            currentPage < totalPages
              ? `${baseUrl}?page=${currentPage + 1}`
              : "#"
          }
          className={`px-3 py-2 rounded-xs bg-gray-50 ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-primary hover:bg-gray-100"
          }`}
          aria-disabled={currentPage === totalPages}
        >
          下一页
        </Link>
      </nav>
    );
  }
  return null;
}
