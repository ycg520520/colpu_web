import Figure from "@/components/Figure";
import { get } from "@/utils/request";
import LoginForm from "./commponents/LoginForm";

/*
 * @Author: colpu
 * @Date: 2026-02-14 16:16:59
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-18 19:19:33
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
export default async function Login() {
  const features = (await get("web/feature", { type: "feature" })) as any[];

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-[135deg] from-purple-100 to-primary-100 p-4 sm:p-6">
      <div className="w-full max-w-4xl bg-white rounded-md shadow-xl flex flex-col md:flex-row overflow-hidden">
        <div className="hidden md:flex flex-1 flex-col justify-center items-start px-6 py-8 md:px-12 md:py-16 bg-gradient-to-t from-sky-50 to-sky-200">
          <Figure />
          <div className="my-8">
            <ul className="space-y-3 px-2 list-disc">
              {features.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="text-primary text-sm leading-[1.2]"
                  >
                    {item.content}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center px-6 py-8 md:px-12 md:py-16">
          <Figure className="mb-10 md:hidden" />
          <h3 className="text-xl md:text-2xl font-bold text-[#2a2346] mb-6 md:mb-8">
            用户登录
          </h3>
          <LoginForm />
          <div className=" w-full max-w-xs px-2 sm:px-0 text-center">
            <div className="mb-4 md:mb-6 hidden">
              <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
                请使用微信扫描二维码关注公众号登录
              </p>
              <div className="relative inline-block">
                <div className="flex items-center justify-center w-50 h-50 border-1 border-gray-100 rounded-sm hover:border-2 hover:border-primary">
                  <div className="error-container space-y-3">
                    <div className="error-icon">⚠️</div>
                    <p className="text-red-500">二维码已过期</p>
                    <button
                      type="button"
                      className="bg-primary-600 text-white text-xs px-3 py-1 rounded-xs hover:bg-primary"
                    >
                      重新生成
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 mb-2">
                扫码后请关注公众号，系统将自动为您登录
              </p>
              <ul className="flex items-center justify-center space-x-3 text-xs text-gray-500">
                <li>
                  <i className="inline-block w-2 h-2 bg-primary rounded-full mr-1"></i>
                  打开微信
                </li>
                <li>
                  <i className="inline-block w-2 h-2 bg-primary rounded-full mr-1"></i>
                  扫描二维码
                </li>
                <li>
                  <i className="inline-block w-2 h-2 bg-primary rounded-full mr-1"></i>
                  关注公众号
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
