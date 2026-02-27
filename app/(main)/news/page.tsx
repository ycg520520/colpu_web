/*
 * @Author: colpu
 * @Date: 2026-01-19 19:59:22
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-26 20:35:51
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
import { get } from "@/utils/request";
import { headers } from "next/headers";
import Pagination from "@/components/Pagination";
import Breadcrumb from "@/components/Breadcrumb";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import Empty from "@/components/Empty";
import NewsList from "@/components/NewsList";
import TagsList from "@/components/TagList";
import SideNewsList from "@/components/SideNewsList";
export default async function Page({ params, searchParams }: any) {
  const { page = 1 } = await searchParams;
  const headersList = await headers();
  const param = await params;
  // 获得当前页面的path
  const path = headersList.get("x-pathname") || "";
  const category = param.category || path.split("/").pop();
  const { rows: news, totalPages } = await get("web/article/list", {
    page,
    pageSize: 5,
    category,
  }).catch((error) => {
    if (error.status === 404) {
      notFound();
    }
  });
  // 1头条 2推荐 3轮播 4热门
  const recommend = await get("web/article/type", { type: 2 });
  const tags = await get("web/article/tags");
  // const tags: any[] = [];

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto p-4 grid grid-cols-4 gap-4">
        <div className="col-span-3 bg-white py-5 px-10 rounded-md shadow-[0_0_5px_rgba(0,0,0,.05)]">
          <Breadcrumb path={path} />
          {news.length > 0 ? <NewsList {...{ data: news, path }} /> : <Empty />}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            baseUrl={path || ""}
            className="my-5"
          />
        </div>
        <div className="bg-white rounded-md shadow-[0_0_5px_rgba(0,0,0,.05)]">
          <SideNewsList data={recommend} />
          <TagsList data={tags} />
        </div>
      </div>
    </div>
  );
}
