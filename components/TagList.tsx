/*
 * @Author: colpu
 * @Date: 2026-02-26 20:28:47
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-26 21:01:04
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
export default function TagsList({ data }: { data: any[] }) {
  if (data.length > 0) {
    return (
      <section className="p-4 border-b border-solid border-gray-100">
        <h2 className="text-lg text-primary font-bold leading-[1.25] border-b-2 border-solid border-primary mb-2 w-fit">
          标签
        </h2>
        <ul className="flex items-center gap-2 text-gray-400 mb-2 mt-1">
          {data.map((item: any, index: number) => {
            return (
              <li key={index}>
                <a
                  className="inline-block text-sm text-gray-950 hover:text-primary px-2 rounded-xs border-1 border-dashed border-gray-200 hover:border-primary"
                  href={`/tags/${item.id}`}
                  title={item.title}
                >
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
  return null;
}
