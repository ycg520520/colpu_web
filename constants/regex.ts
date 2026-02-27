/*
 * @Author: colpu
 * @Date: 2026-02-03 22:45:31
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-18 13:07:44
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
export const emailReg =
  /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/;
export const passwordReg =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*)(_+}{|:?><]).{8,16}$/;
export const IPReg =
  /^(https?:\/\/)?((([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5]))))\.)((([0-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5]))))\.){2}(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5]))))(:\d{2,5})?$/;
export const domainReg = /^(-?[1-9]\d*\.\d+|-?0\.\d*[1-9]\d*|0\.0+)$/;
export const phoneReg = /^1[3-9]\d{9}$/;
export const urlReg =
  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
export const usernameReg = /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/;
export const strongReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/;
// 规则：允许中文、字母、数字、下划线，2-10位
export const chineseRegex =
  /^[\u4e00-\u9fa5a-zA-Z][\u4e00-\u9fa5a-zA-Z0-9_]{2,9}$/;
