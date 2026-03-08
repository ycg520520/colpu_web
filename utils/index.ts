/*
 * @Author: colpu
 * @Date: 2026-01-23 15:48:25
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-03-08 17:21:46
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
/**
 * @function installTree 组装树
 * @param {Array} data 要处理的树数组
 * @param {Object} options 默认配置
 */
export function installTree(
  data: Array<any> = [],
  options: {
    id?: number;
    mode?: string;
    key_id?: string;
    key_fid?: string;
    is_dict?: boolean;
    handdle?: (item: any) => void;
  } = {},
) {
  const {
    id = 0,
    mode = "tree", // mode: tree, object, array
    key_id = "id",
    key_fid = "fid",
    handdle,
  } = options;
  if (id === 0 && mode === "array") {
    return data;
  }
  const dict: { [key: string]: any } = {},
    filterItem = [];

  // 组装到字典
  data.forEach((item) => {
    if (handdle) {
      handdle(item);
    }
    dict[item[key_id]] = item;
  });
  if (id === 0 && mode === "object") {
    return dict;
  }
  for (const i in dict) {
    const item = dict[i];
    const father = item[key_fid] || 0;
    const fatherData = dict[father];
    if (father > 0 && fatherData) {
      if (!fatherData.children) {
        fatherData.children = [];
      }
      fatherData.children.push(item);
    }
  }

  const result: any[] = [];
  for (const i in dict) {
    const item = dict[i];
    const father = item[key_fid] || 0;
    if (father === id || item[key_id] === id) {
      filterItem.push(item);
      result.push(item);
    }
  }
  const loop = (arr: any, res: any) => {
    arr.forEach((v: any) => {
      const k = v[id];
      const item = dict[k];
      if (item.children) {
        loop(item.children, res);
      }

      delete item.children;
      if (mode === "object") {
        res[k] = item;
      } else if (mode === "array") {
        res.push(item);
      }
    });
  };
  if (mode !== "tree") {
    const res = mode === "object" ? {} : [];
    loop(filterItem, res);
    return res;
  }
  return result;
}
export function treeToPlan(data: any, arr: any[] = []) {
  data.forEach((item: any) => {
    arr.push(item);
    if (item.children) {
      treeToPlan(item.children, arr);
    }
  });
  return arr;
}

export function isCurrentPath(pathname: string, href: string): boolean {
  // 精确匹配
  if (pathname === href) return true;
  // 根路径特殊处理
  if (href === "/") return false;
  // 嵌套路由匹配（/blog → /blog/123）
  if (pathname.startsWith(href)) return true;
  return false;
}

export function composeClassName(initClass: string, addClass?: string): string {
  if (!addClass) return initClass;
  return Array.from(
    new Set([
      ...initClass.split(" "),
      ...(addClass ? addClass.split(" ") : []),
    ]),
  ).join(" ");
}

export const isClient = "window" in globalThis;