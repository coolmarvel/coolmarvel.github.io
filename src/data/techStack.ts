import type { TechIconName } from "@/icons/techIcons";

// 대시보드 "기술 스택" 섹션의 SSOT.
// icon 이 null 이면 브랜드 로고가 없는 항목(사내 표준·자체 개념 등) — 중립 글리프로 렌더한다.
export interface TechItem {
  name: string;
  icon: TechIconName | null;
}

export interface TechGroup {
  title: string;
  caption: string;
  items: TechItem[];
}

export const techGroups: TechGroup[] = [
  {
    title: "언어",
    caption: "Languages",
    items: [
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Java", icon: "java" },
      { name: "C#", icon: "csharp" },
      { name: "PHP", icon: "php" },
      { name: "Python", icon: "python" },
      { name: "Solidity", icon: "solidity" },
    ],
  },
  {
    title: "프레임워크 · 런타임",
    caption: "Frameworks & Runtimes",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "NestJS", icon: "nestjs" },
      { name: "Express", icon: "express" },
      { name: "Spring Boot", icon: "springboot" },
      { name: "Laravel", icon: "laravel" },
      { name: "Livewire", icon: "livewire" },
      { name: "FastAPI", icon: "fastapi" },
      { name: ".NET 8", icon: "dotnet" },
      { name: "ASP.NET Core", icon: "dotnet" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "TanStack Query", icon: "tanstack" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Electron", icon: "electron" },
      { name: "Avalonia (MVVM)", icon: "avalonia" },
    ],
  },
  {
    title: "데이터베이스",
    caption: "Databases",
    items: [
      { name: "MySQL", icon: "mysql" },
      { name: "MariaDB", icon: "mariadb" },
      { name: "Oracle", icon: "oracle" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Redis", icon: "redis" },
      { name: "SQLite", icon: "sqlite" },
    ],
  },
  {
    title: "인프라 · 도구",
    caption: "Infra & Tooling",
    items: [
      { name: "Docker", icon: "docker" },
      { name: "Nginx", icon: "nginx" },
      { name: "Linux", icon: "linux" },
      { name: "AWS", icon: "aws" },
      { name: "Azure", icon: "azure" },
      { name: "Cloudflare", icon: "cloudflare" },
      { name: "RabbitMQ", icon: "rabbitmq" },
      { name: "Git", icon: "git" },
      { name: "GitHub Actions", icon: "githubactions" },
      { name: "Jenkins", icon: "jenkins" },
    ],
  },
  {
    title: "블록체인",
    caption: "Blockchain",
    items: [
      { name: "EVM 스마트 컨트랙트", icon: "ethereum" },
      { name: "web3.js", icon: "web3js" },
      { name: "caver-js (Klaytn)", icon: null },
      { name: "ICON SDK", icon: null },
      { name: "Fireblocks MPC", icon: null },
    ],
  },
  {
    title: "AI 협업",
    caption: "AI Engineering",
    items: [
      { name: "Claude Code", icon: "claude" },
      { name: "MCP 서버", icon: null },
      { name: "Harness Engineering", icon: null },
    ],
  },
];
