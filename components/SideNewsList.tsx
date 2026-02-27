/*
 * @Author: colpu
 * @Date: 2026-02-26 20:33:19
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-26 21:02:18
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
import dayjs from "dayjs";
export default function SideNewsList({
  title = "热点新闻",
  data,
}: {
  title?: string;
  data: any[];
}) {
  if (data.length === 0) return null;
  return (
    <section className="p-4 border-b border-solid border-gray-100">
      <h2 className="text-lg text-primary font-bold leading-[1.25] border-b-2 border-solid border-primary mb-2 w-fit">
        {title}
      </h2>
      <ul>
        {data.map((item: any, index: number) => {
          return (
            <li
              key={index}
              className="flex items-center py-2 border-b border-dashed border-gray-200 last:border-0 content-['d']"
            >
              <a
                className="text-sm overflow-hidden text-clip text-gray-950 hover:text-primary line-clamp-1"
                href={`/detail/${item.id}`}
                title={item.title}
              >
                {item.title}
              </a>
              <time className="inline-block w-[60] text-xs text-right text-gray-400">
                {dayjs(item.created_at).format("DD-MM")}
              </time>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
