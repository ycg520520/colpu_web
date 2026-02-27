import { installTree } from "@/utils";
import { get } from "@/utils/request";

/*
 * @Author: colpu
 * @Date: 2026-02-12 22:44:22
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-18 14:34:15
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
export async function getMenus() {
  return get("web/menus", { exclude: false }).then((res) => {
    return {
      dict: installTree(res, { key_id: "path", mode: "object" }),
      menus: installTree(res, { key_fid: "parent_id" }),
    };
  });
}
