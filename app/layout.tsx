/*
 * @Author: colpu
 * @Date: 2026-01-19 17:32:14
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-02-21 16:05:43
 *
 * Copyright (c) 2026 by colpu, All Rights Reserved.
 */
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import { Metadata } from "next/types";
import AuthProvider from "@/components/AuthProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  icons: "/logo_bg.svg",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-sm font-medium font-sans`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
