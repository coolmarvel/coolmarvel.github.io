import type { Metadata } from "next";
import { Outfit, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit-sans",
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "이성현 | 풀스택 개발자 포트폴리오",
  description:
    "블록체인 · 커머스 · 의료 도메인을 경험한 풀스택 개발자 이성현의 포트폴리오. AI(Claude Code) 기반 개발 워크플로우를 실무에 적용합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${outfit.variable} ${notoSansKr.variable} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
