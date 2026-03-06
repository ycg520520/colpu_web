import { Icon } from "@iconify/react";

/*
 * @Author: colpu
 * @Date: 2026-03-01 00:12:37
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-03-07 00:01:20
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
export default function OpenWechat() {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <div className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-full pl-1 pr-3 py-1 hover:shadow-sm transition-all duration-200 cursor-pointer group hover:scale-[1.02] hover:border-green-200">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-green-600">
          <Icon width="24" height="24" icon="token:chat" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-xs font-bold text-green-800">
            公众号：靠谱Colpu
          </span>
          <span className="text-xs text-green-600">获取更多动态</span>
        </div>
      </div>
    </div>
  );
}
