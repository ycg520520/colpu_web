/*
 * @Author: colpu
 * @Date: 2026-02-18 15:59:57
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-21 16:11:08
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
"use client";
import { LoginDataType, UserState } from "./types";
import { create } from "zustand";
import { post, get } from "@/utils/request";
import { StatusEnum } from "@/constants/types";
import { getItem, setItem, removeItem } from "@/utils/storage";
import { TOKEN, USER } from "@/constants";
export const userStore = create<UserState>()((set, state) => ({
  user: undefined,
  userToken: undefined,
  status: StatusEnum.IDLE,
  error: undefined,
  getToken() {
    const userToken = getItem(TOKEN);
    if (userToken) {
      set({ userToken });
    }
    return userToken;
  },
  async login(data: LoginDataType) {
    set({ status: StatusEnum.LOADING });
    post("token", {
      grant_type: "password",
      ...data,
    })
      .then((userToken) => {
        setItem(TOKEN, userToken);
        set({ userToken, status: StatusEnum.SUCCEEDED });
      })
      .catch((err) => {
        set({ status: StatusEnum.FAILED });
      });
  },
  async userInfo() {
    const { userToken, user } = state();
    const storeUser = getItem(USER);
    if (storeUser) {
      set({ user: storeUser });
      return storeUser;
    }
    if (userToken && !user) {
      return get("web/user/info").then((res) => {
        set({ user: res });
        setItem(USER, res);
        return res;
      });
    }
  },
  logout: async () => {
    removeItem(TOKEN);
    removeItem(USER);
    set({
      user: undefined,
      userToken: undefined,
      status: StatusEnum.IDLE,
      error: undefined,
    });
  },
}));
