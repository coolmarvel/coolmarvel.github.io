import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/context/ThemeContext";
import { profile } from "@/data/profile";
import { SITE_URL } from "@/lib/site";

const description =
  "블록체인 · 커머스 · 의료 도메인에서 백엔드 중심 풀스택으로 일해 온 이성현의 포트폴리오. 경력, 라이브 서비스·데스크톱 앱 프로젝트, Claude Code 기반 AI 협업 워크플로우를 담았습니다.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "이성현 | 백엔드 중심 풀스택 개발자",
    template: "%s | 이성현 포트폴리오",
  },
  description,
  keywords: ["이성현", "coolmarvel", "풀스택 개발자", "백엔드", "포트폴리오", "Claude Code", "Laravel", "NestJS", "Spring Boot"],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "이성현 포트폴리오",
    title: "이성현 | 백엔드 중심 풀스택 개발자",
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "이성현 포트폴리오" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "이성현 | 백엔드 중심 풀스택 개발자",
    description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

// 페인트 전에 저장된 테마를 <html> 에 반영 — 다크모드 플래시 방지
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}if(t==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: "coolmarvel",
  url: SITE_URL,
  image: `${SITE_URL}/images/profile.jpg`,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  sameAs: [profile.github, profile.blog],
  worksFor: { "@type": "Organization", name: "씨엠병원" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
