import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GEO·OPEN｜资源环境开放教材",
  description:
    "以资源环境信息技术为主线，连接遥感与地图学的开放式电子教材。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
