/*
 * @Author: colpu
 * @Date: 2026-02-11 10:57:35
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-11 11:15:51
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
import { Icon } from "@iconify/react";
export default function WrapIcon({ iconProps, ...props }) {
  props.className = ["inline-flex align-middle hover:opacity-85", props.className].join(" ");
  return (
    <span
      className="text-a"
      style={{ display: "inline-flex", alignItems: "center" }}
      {...props}
    >
      <Icon {...iconProps} />
    </span>
  );
}
