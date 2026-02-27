/*
 * @Author: colpu
 * @Date: 2026-02-11 19:34:12
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-11 19:40:58
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
import { cache } from "react";

// 服务端环境的 XSS 防护（使用 isomorphic-dompurify）
import DOMPurify from "isomorphic-dompurify";

export const sanitizeHtml = cache((html: string) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "a",
      "ul",
      "ol",
      "li",
      "dl",
      "dt",
      "dd",
      "img",
      "blockquote",
      "pre",
      "code",
      "span",
      "div",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "hr",
    ],
    ALLOWED_ATTR: [
      "href",
      "src",
      "alt",
      "title",
      "class",
      "target",
      "rel",
      "width",
      "height",
    ],
  });
});
export function ServerSafeHTML({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  const cleanHtml = sanitizeHtml(html);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
