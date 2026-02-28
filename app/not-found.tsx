/*
 * @Author: colpu
 * @Date: 2026-02-12 16:16:13
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-27 18:46:53
 * 
 * Copyright (c) 2026 by colpu, All Rights Reserved. 
 */
import Link from "next/link";
import { headers } from "next/headers";
import Back from "@/components/Back";
import { Metadata } from "next/types";

// 生成404页面的元数据
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "404 - 页面未找到 | 网站名称",
    description: "抱歉，您访问的页面不存在。请检查URL或返回首页。",
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: "404 - 页面未找到",
      description: "抱歉，您访问的页面不存在",
      type: "website",
    },
  };
}
export default async function NotFound() {
  // 服务端获取请求路径
  const headersList = await headers();
  const path = headersList.get("x-pathname") || "";

  // 可选：发送到日志服务
  if (process.env.NODE_ENV === "production") {
    // await fetch("https://your-logging-service.com/404", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     path,
    //     timestamp: new Date().toISOString(),
    //     userAgent: headersList.get("user-agent"),
    //     referer: headersList.get("referer"),
    //   }),
    // }).catch(console.error);
  }

  return (
    <section className="min-h-100 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl text-gray-800 mt-4 mb-2">页面未找到</h2>
        <p className="text-gray-600 mb-8">
          抱歉，您访问的页面
          <strong className="bg-gray-100 px-2 py-1 rounded mx-1">
            {path}
          </strong>
          不存在
        </p>
        <div className="space-x-4">
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-primary text-sm text-white rounded-full hover:bg-primary-600 transition-colors cursor-pointer"
          >
            返回首页
          </Link>
          <Back className="inline-block px-6 py-2 bg-gray-100 text-sm text-gray-700 rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
            返回上一页
          </Back>
        </div>
        <div className="mt-8 text-sm text-gray-500">
          <Link href="/sitemap" className="hover:text-primary mx-2">
            站点地图
          </Link>
          <Link href="/search" className="hover:text-primary mx-2">
            搜索
          </Link>
          <Link href="/contact" className="hover:text-primary mx-2">
            联系我们
          </Link>
        </div>
      </div>
    </section>
  );
}
