/*
 * @Author: colpu
 * @Date: 2026-01-19 17:32:14
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-03-08 19:25:14
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
import Link from "next/link";
import { get } from "@/utils/request";
import { getConfig } from "@/utils/config";
export default async function Home() {
  const features = (await get("web/feature", { type: "feature" })) as any[];
  const config = await getConfig();
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[400]">
        <h1 className="px-10 text-[40px] sm:text-[64px] tracking-[-4px] sm:tracking-[-5px] text-transparent bg-clip-text bg-linear-[315deg] from-blue-700 from-10% via-primary-500 via-60% to-primary-600">
          <strong className="text-[42px] sm:text-[66px]">ColpuCMS</strong>
          管理系统
          {/*  bg-gradient-to-r from-green-400 via-sky-400 via-50% to-green-400 to-100%  */}
        </h1>
        <p className="text-lg text-neutral-500">
          基于Nodejs，Koa+mysql的一款轻量级CMS管理系统
        </p>
        <p className="flex items-center text-sm text-green-600 font-medium mt-2">
          完全开源
        </p>
        <Link
          className="mt-4 px-12 py-3 rounded-full bg-green-600 text-white text-lg shadow-xs shadow-gray-200 transition-all duration-300 bg-linear-[135deg] from-primary-400 from-[-50%] via-primary to-primary-500 to-300% hover:bg-linear-[135deg] hover:from-primary-400 hover:from-[-80%] hover:via-primary hover:to-primary-600 hover:to-300%"
           href={config.github_url}
        >
          开始使用
        </Link>
      </div>
      <div className="container mx-auto px-4 py-4">
        <section className="pt-12 pb-6 rounded-md bg-linear-[95deg] from-blue-50 via-primary-50 via-50% to-purple-50">
          <h2 className="text-2xl font-bold text-center mb-8 text-neutral-800">
            ColpuCMS特色功能
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-6">
            {features.map((item, index) => {
              return (
                <div
                  key={index}
                  className="px-6 py-6 bg-white rounded-sm shadow-sm border border-neutral-50 transform transition-all hover:scale-105 hover:bg-red-50 hover:border-neutral-150"
                >
                  <h3 className="text-xl font-bold mb-2 text-center">
                    {item.title}
                  </h3>
                  <div className="text-sm text-neutral-600">{item.content}</div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
