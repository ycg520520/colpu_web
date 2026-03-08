/*
 * @Author: colpu
 * @Date: 2026-01-19 17:32:14
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-03-08 16:57:02
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
import type { NextConfig } from "next";
import { version, name, repository } from "./package.json";
const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  env: {
    APP_VERSION: version,
    APP_NAME: name,
    APP_GIT_URL: repository.url,
    // 你也可以注入其他字段，如 APP_NAME: name
  },
};

export default nextConfig;
