/*
 * @Author: colpu
 * @Date: 2026-03-08 17:19:50
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-03-08 17:36:08
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
import { merge } from "lodash";
import { ENV_MAP } from "@/constants/index";
export async function getConfig(): Promise<any> {
  const env =
    ENV_MAP[process.env.NODE_ENV as keyof typeof ENV_MAP] || "development";

  const [baseConf, envConf] = await Promise.all([
    import("@/config/index.js"),
    import(`@/config/${env}.js`).catch(() => ({ default: {} })),
  ]);

  return merge({}, baseConf.default, envConf.default);
}
