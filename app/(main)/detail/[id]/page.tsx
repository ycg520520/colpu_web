/*
 * @Author: colpu
 * @Date: 2026-01-19 22:17:09
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-27 17:54:57
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
import Breadcrumb from "@/components/Breadcrumb";
import { ServerSafeHTML } from "@/components/ServerSafeHTML";
import { get } from "@/utils/request";
import { Metadata } from "next";
const apiArticleList = (id: number) => {
  return get("web/article", { id });
};
const getPageId = (params: { page?: string; id: number }) => {
  const { page, id } = params;
  switch (page) {
    case "agreement":
      return 1;
    case "policy":
      return 2;
    default:
      return id;
  }
};
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const id = getPageId(await params);

  const article = await apiArticleList(id); // 这里调用一次
  return {
    title: article.title,
    keywords: article.keywords,
    description: article.description,
  };
}
export default async function Page({ params }: any) {
  const id = getPageId(await params);
  const article = await apiArticleList(id); // 这里调用第二次，但不会多次发送请求，因Nextjs对fetch做了cache处理
  return (
    <section className="container mx-auto px-20">
      <Breadcrumb crumbs={article.crumbs} className="mt-5" />
      <h1 className="text-4xl text-center font-bold mt-8 mb-2">
        {article.title}
      </h1>
      <h2 className="text-base text-center text-gray-500 mb-6">
        {article.subtitle}
      </h2>
      <ul className="flex items-center justify-center gap-1 text-xs text-gray-400 mb-2 mt-1">
        <li className="ico-20 ico-time pos-r t-4">
          发布时间: {article.created_at}
        </li>
        <li className="ico-20 ico-admin pos-r t-4 ml-4">
          作者: {article.author || "佚名"}
        </li>
        <li className="ico-20 ico-view pos-r t-5 ml-4">阅读（{article.pv}）</li>
        <li className="ico-20 ico-zan pos-r t-4 ml-4">点赞（95）</li>
      </ul>
      <ServerSafeHTML
        className="colpu__article-bd leading-[2] [&_p]:text-justify [&_p]:mb-4 [&_p]:indent-[2em]"
        html={article.content}
      />
    </section>
  );
}
