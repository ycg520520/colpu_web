/*
 * @Author: colpu
 * @Date: 2026-02-15 15:29:25
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-18 18:59:30
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
"use client";
import { usernameReg } from "@/constants/regex";
import { userStore } from "@/store/user";
import { LoginDataType } from "@/store/user/types";
import { Button, Form, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { StatusEnum } from "@/constants/types";
export default function LoginForm() {
  const { status, login } = userStore();
  const router = useRouter(); // 使用 useRouter
  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const data = Object.fromEntries(new FormData(evt.currentTarget));
    login(data as LoginDataType).then(() => {
      router.replace("/");
    });
  };
  const [userValue, setUserValue] = useState("");
  const [passValue, setPassValue] = useState("");

  // 自定义验证规则
  const validateUsername = (value: string) => {
    return value.match(usernameReg);
  };
  const validatePassword = (value: string) => {
    return value.match(usernameReg);
  };

  const isInvalidUser = userValue !== "" && !validateUsername(userValue);
  const isInvalidPass = passValue !== "" && !validatePassword(passValue);
  const formItemStyle = (isInvalid: boolean) => ({
    mainWrapper: "flex-1",
    helperWrapper: "flex items-start",
    inputWrapper: [
      "rounded-sm",
      "px-2",
      "border-1",
      "border-gray-200",
      "!bg-white",
      "data-[hover=true]:!bg-white",
      "group-data-[focus=true]:outline-1",
      "group-data-[focus=true]:outline-primary-100",
      "group-data-[focus=true]:!bg-white",
      isInvalid ? "border-red-300" : "",
    ],

    label: "block w-20 text-right",
    clearButton:
      "bg-gray-200 radius-full p-0 w-[16] h-[16] flex items-center justify-items-center",
  });
  return (
    <Form className="w-64 max-w-xs gap-0" onSubmit={onSubmit}>
      <Input
        isRequired
        isInvalid={isInvalidUser}
        errorMessage="请输入用户名称"
        // label="用户"
        // labelPlacement="outside-left"
        onChange={(e) => setUserValue(e.target.value)}
        name="username"
        placeholder="请输入用户名称"
        type="text"
        radius="sm"
        onClear={() => {}}
        autoComplete="hidden"
        endContent={<Icon icon="si:close-line" fontSize={14} />}
        description={"\u00A0"}
        classNames={formItemStyle(isInvalidUser)}
      />
      <Input
        isRequired
        isInvalid={isInvalidPass}
        errorMessage="请输入用户密码"
        // label="密码"
        // labelPlacement="outside-left"
        onChange={(e) => setPassValue(e.target.value)}
        name="password"
        placeholder="请输入用户密码"
        type="password"
        radius="sm"
        onClear={() => {}}
        endContent={<Icon icon="si:close-line" fontSize={14} />}
        description={"\u00A0"}
        classNames={formItemStyle(isInvalidPass)}
      />
      <div className="w-full mt-5">
        <Button
          type="submit"
          radius="full"
          color="primary"
          className="inline-block py-1 w-full"
        >
          {status == StatusEnum.LOADING ? (
            <Icon icon="mdi:login" fontSize={20} />
          ) : null}
          登 陆
        </Button>
      </div>
    </Form>
  );
}
