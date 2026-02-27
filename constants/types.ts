/*
 * @Author: colpu
 * @Date: 2026-02-18 16:13:40
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-18 16:13:41
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
export enum StatusEnum {
  IDLE = "idle",
  LOADING = "loading",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}
export type Status =
  | StatusEnum.IDLE
  | StatusEnum.LOADING
  | StatusEnum.SUCCEEDED
  | StatusEnum.FAILED;
