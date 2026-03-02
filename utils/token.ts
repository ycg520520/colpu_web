/*
 * @Author: colpu
 * @Date: 2026-03-02
 * token 过期逻辑：OAuth2 expires_in 为剩余秒数，存储时转换为 expires_at（毫秒时间戳）
 */
import { UserToken } from "@/store/user/types";
import { getItem } from "./storage";
import { TOKEN } from "@/constants";

/** 提前多少毫秒视为过期（缓冲），便于提前刷新 token，默认 60 秒 */
const TOKEN_EXPIRE_BUFFER_MS = 60 * 1000;

/** 存储 token 时计算 expires_at（OAuth2 expires_in 为剩余秒数） */
export const normalizeToken = (token: UserToken): UserToken => ({
  ...token,
  expires_at: Date.now() + (token.expires_in || 0) * 1000,
});

/** 判断 token 是否过期（含缓冲：提前 buffer 时间即视为过期） */
export const isTokenExpire = (): boolean => {
  const userToken: UserToken = getItem(TOKEN) || {};
  const expiresAt = userToken.expires_at;
  if (expiresAt) {
    return Date.now() >= expiresAt - TOKEN_EXPIRE_BUFFER_MS;
  }
  return true;
};
