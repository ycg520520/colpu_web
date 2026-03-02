import { Status } from "@/constants/types";

/*
 * @Author: colpu
 * @Date: 2026-02-18 16:10:52
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-21 16:09:53
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
export interface UserToken {
  access_token: string;
  expires_in: number;
  expires_at?: number; // 过期时间戳（毫秒），由 normalizeToken 计算
  refresh_token: string;
  token_type: string;
}
export interface User {
  id: number;
  username: string;
  nickname?: string;
  phone?: string;
  email?: string;
  avatar?: string;
  gender?: number;
  remark?: string;
  created_at?: string;
  updated_at?: string;
  roles?: string[];
  permissions?: string[];
}
export type LoginDataType = { username: string; password: string };
export interface UserState {
  user?: User;
  userToken?: UserToken;
  status?: Status;
  error?: string;
  getToken(): UserToken | undefined;
  login(data: LoginDataType): Promise<void>;
  userInfo(): Promise<User>;
  logout(): Promise<void>;
}
