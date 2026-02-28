/*
 * @Author: colpu
 * @Date: 2026-02-11 10:57:35
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-27 22:47:25
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
import { Icon, IconProps } from "@iconify/react";
import { DetailedHTMLProps, HTMLAttributes } from "react";
export default function WrapIcon({
  iconProps,
  className,
  ...reset
}: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & {
  iconProps: IconProps;
}) {
  return (
    <span
      className={["inline-flex align-middle hover:opacity-85", className].join(
        " ",
      )}
      style={{ display: "inline-flex", alignItems: "center" }}
      {...reset}
    >
      <Icon {...iconProps} />
    </span>
  );
}
