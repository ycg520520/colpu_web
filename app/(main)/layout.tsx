/*
 * @Author: colpu
 * @Date: 2026-02-12 22:46:15
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-03-01 00:13:09
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import WrapIcon from "@/components/WrapIcon";
import { get } from "@/utils/request";
import { headers } from "next/headers";
import TopTip from "@/components/TopTip";
import Figure from "@/components/Figure";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { getMenus } from "@/api";
import UserAvatar from "@/components/UserAvatar";
import CopyButton from "@/components/CopyButton";
import OpenWechat from "@/components/OpenWechat";
function getMenuSEO(map: any, pathname: string) {
  const { name, title, keywords, description } = map[pathname] || {};
  return {
    title: title || name,
    keywords: keywords || [name, "ColpuCMS"].join(","),
    description: description || "ColpuCMS",
  };
}
export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  // 获得当前页面的path
  const path = headersList.get("x-pathname") || "";
  const { dict } = await getMenus();
  return getMenuSEO(dict, path);
}
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { menus } = await getMenus();
  const resume = await get("web/feature", { type: "resume" }).then(
    (res) => res[0],
  );
  const sites = await get("web/site");
  return (
    <>
      <TopTip />
      <header className="bg-white/20 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50 h-[80] transition-all duration-300">
        <div className="container px-4 mx-auto h-full">
          <div className="flex items-center justify-between h-full">
            <Figure />
            <Navbar menus={menus as []} />
            <OpenWechat />
            <UserAvatar />
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-gray-100 bg-white">
        <div className="container px-4 py-6 mx-auto">
          <div className="flex justify-between gap-8 mb-8">
            <dl className="text-xs leading-[24px] text-gray-500 w-80 text-justify">
              <dt className="text-sm mb-1.5 text-gray-900">{resume.title}</dt>
              <dd className="leading-[1.5]">{resume.content}</dd>
            </dl>
            <div className="flex item-align-start justify-around gap-10">
              <dl className="text-xs leading-[24px] text-gray-500">
                <dt className="text-sm mb-1.5 text-gray-900">快速链接</dt>
                <dd className="flex items-center gap-2 mb-1">
                  <a
                    href="/about"
                    className="text-gray-600 hover:text-primary transition-colors"
                    title="关于我们"
                  >
                    关于我们
                  </a>
                </dd>
                <dd className="mb-1">
                  <a
                    href="/agreement"
                    className="text-gray-600 hover:text-primary transition-colors"
                    title="用户协议"
                  >
                    用户协议
                  </a>
                </dd>
                <dd>
                  <a
                    href="/policy"
                    className="text-gray-600 hover:text-primary transition-colors"
                    title="隐私政策"
                  >
                    隐私政策
                  </a>
                </dd>
              </dl>
              <dl className="text-xs leading-[24px] text-gray-600">
                <dt className="text-sm mb-1.5 text-gray-900">联系我们</dt>
                <dd className="flex items-center gap-1 mb-1">
                  <WrapIcon
                    className="bg-primary rounded-full p-1"
                    iconProps={{
                      className: "text-white font-bold",
                      icon: "hugeicons:wechat",
                      width: 16,
                      height: 16,
                    }}
                  />
                  <div>
                    <span className="text-gray-400">微信: </span>
                    <CopyButton
                      type="button"
                      className="text-gray-600 hover:text-primary transition-colors cursor-pointer"
                    >
                      {sites.wx}
                    </CopyButton>
                  </div>
                </dd>
                <dd className="flex items-center gap-1 mb-1">
                  <WrapIcon
                    className="bg-sky-500 rounded-full p-1"
                    iconProps={{
                      className: "text-white",
                      icon: "mi:email",
                      width: 16,
                      height: 16,
                    }}
                  />
                  <a
                    href={"mailto:" + sites.email}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {sites.email}
                  </a>
                </dd>
                <dd className="flex items-center gap-1 relative group">
                  <svg
                    className="text-primary"
                    fill="currentColor"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                  >
                    <path d="M849.92 51.2H174.08c-67.8656 0-122.88 55.0144-122.88 122.88v675.84c0 67.8656 55.0144 122.88 122.88 122.88h675.84c67.8656 0 122.88-55.0144 122.88-122.88V174.08c0-67.8656-55.0144-122.88-122.88-122.88zM448.18432 230.94272c176.98304-53.95968 267.17696 110.98624 267.17696 110.98624-32.59392-17.78176-130.39104-37.53472-235.09504 16.7936s-126.4384 172.87168-126.4384 172.87168c-42.56256-45.4144-44.4928-118.6304-44.4928-118.6304 5.03296-137.41568 138.84928-182.02112 138.84928-182.02112zM393.50784 796.42112c-256.12288-49.6384-197.85216-273.38752-133.81632-371.95264 0 0-2.88256 138.13248 130.22208 214.4 0 0 15.82592 7.1936 10.79296 30.21312l-5.03808 29.49632s-6.656 20.1472 6.02624 22.30272c0 0 4.04992 0 13.39904-6.4768l48.92672-32.37376s10.07104-7.1936 23.01952-5.03808c12.94848 2.16064 95.68768 23.74656 177.70496-44.60032-0.00512 0-15.10912 213.67296-271.23712 164.02944z m256.8448-19.42016c16.54784-7.9104 97.1264-102.8864 58.98752-231.66464s-167.6288-157.55776-167.6288-157.55776c66.19136-28.0576 143.89248-7.19872 143.89248-7.19872 117.9904 34.5344 131.6608 146.77504 131.6608 146.77504 23.01952 200.71936-166.912 249.64608-166.912 249.64608z"></path>
                  </svg>
                  <span className="cursor-pointer">关注公众号获取更多信息</span>
                  <div className="absolute bottom-full left-0 mb-2 opacity-100 transition-all duration-200 z-50 w-[520px] invisible group-hover:opacity-100 group-hover:visible drop-shadow-sm">
                    <div className="bg-white rounded-lg border border-gray-100 shadow-lg p-3">
                      <img
                        src="/gongzhonghao.png"
                        alt="微信公众号二维码"
                        className="w-[520px] object-contain"
                      />
                      <p className="text-xs text-center text-gray-600 mt-2">
                        扫码关注公众号
                      </p>
                    </div>
                    <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-100"></div>
                    <div className="absolute top-full left-4 -mt-px w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                  </div>
                </dd>
              </dl>
            </div>
            <dl className="text-xs leading-[24px] text-gray-500">
              <dt className="text-sm mb-1.5 text-gray-900">
                {sites.copyright}
              </dt>
              <dd className="leading-[1.5]">
                Copyright © {dayjs().format("YYYY")} All Rights Reserved
                <br />
                <a
                  href="https://beian.miit.gov.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  {sites.icp}
                </a>
              </dd>
            </dl>
          </div>
        </div>
      </footer>
    </>
  );
}
