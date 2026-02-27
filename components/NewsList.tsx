/*
 * @Author: colpu
 * @Date: 2026-02-13 19:28:10
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-26 20:26:08
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
export default function NewsList({
  data,
  path,
}: {
  data: any[];
  path: string;
}) {
  return (
    <section>
      <ul>
        {data.map((item: any, index: number) => {
          return (
            <li
              key={index}
              className="flex gap-5 px-2 py-5 border-b border-dashed border-gray-200 hover:bg-gray-50 transition-all duration-300"
            >
              <div className="w-[100] h-[75] bg-gray-200 rounded-xs">
                <a href={`/news/detail/${item.id}`}>
                  <img
                    src={
                      item.thumb ||
                      `https://picsum.photos/100/75?random=${item.id}`
                    }
                    alt={item.title}
                    title={item.title}
                    className="w-[100%] h-[100%] text-xs border-1 border-soild border-gray-100 rounded-xs shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  />
                </a>
              </div>
              <div className="flex flex-1 flex-col item-start">
                <a
                  className="text-lg overflow-hidden text-clip text-gray-950 hover:text-primary"
                  href={`/detail/${item.id}`}
                  title={item.title}
                >
                  {item.title}
                </a>
                <ul className="text-xs flex items-center gap-2 text-gray-400 mb-2 mt-1">
                  <li className="bg-sky-50 px-2 py-1 rounded-xs text-sky-500 hover:text-sky-600">
                    {path === item.classify.path ? (
                      item.classify.name
                    ) : (
                      <a href={item.classify.path} title={item.classify.name}>
                        {item.classify.name}
                      </a>
                    )}
                  </li>
                  <li>{item.created_at}</li>
                  <li>{item.author}</li>
                  <li>阅读: ({item.pv})</li>
                </ul>
                <p className="text-sm text-justify mt-1 text-gray-400 line-clamp-2">
                  {item.summary}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
