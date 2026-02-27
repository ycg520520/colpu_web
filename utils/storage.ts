/*
 * @Author: colpu
 * @Date: 2026-01-29 16:37:08
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-18 18:17:01
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */

import { isClient } from ".";

const ls = isClient
  ? localStorage
  : {
      setItem: () => {},
      getItem: () => {},
      removeItem: () => {},
    };
export const setItem = (key: string, data: object | string) => {
  ls.setItem(key, typeof data === "object" ? JSON.stringify(data) : data);
};

export const getItem = (key: string) => {
  const data = ls.getItem(key);
  if (data && /^{/.test(data)) {
    return JSON.parse(data);
  } else {
    return data;
  }
};

export const removeItem = (key: string) => {
  ls.removeItem(key);
};
