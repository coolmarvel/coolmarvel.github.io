export interface SkillCategory {
  title: string;
  icon: "server" | "code" | "chain" | "db" | "bot";
  skills: { name: string; level: number }[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend",
    icon: "server",
    skills: [
      { name: "Node.js · NestJS · Express", level: 90 },
      { name: "Java · Spring Boot · MyBatis", level: 80 },
      { name: "PHP · Laravel (DDD)", level: 85 },
      { name: "Python · FastAPI", level: 75 },
      { name: "RabbitMQ · WebSocket · RestAPI", level: 85 },
    ],
  },
  {
    title: "Frontend",
    icon: "code",
    skills: [
      { name: "React.js · Next.js", level: 85 },
      { name: "TypeScript · JavaScript", level: 90 },
      { name: "TanStack Query/Table", level: 80 },
      { name: "Tailwind CSS · Livewire · Alpine.js", level: 80 },
      { name: "Redux · Recoil · zustand", level: 75 },
    ],
  },
  {
    title: "Blockchain",
    icon: "chain",
    skills: [
      { name: "Solidity · 스마트 컨트랙트 (KIP-17/ERC-721)", level: 80 },
      { name: "web3.js · caver-js · ICON SDK", level: 85 },
      { name: "Fireblocks MPC 커스터디", level: 75 },
      { name: "온체인 데이터 파이프라인", level: 80 },
      { name: "nGrinder 블록체인 부하시험", level: 85 },
    ],
  },
  {
    title: "Database & Infra",
    icon: "db",
    skills: [
      { name: "MySQL · MariaDB · PostgreSQL", level: 85 },
      { name: "Redis", level: 75 },
      { name: "Docker · Docker Compose · Nginx", level: 85 },
      { name: "AWS · Azure · NCP · Cloudflare", level: 75 },
      { name: "Linux · Git · Jenkins", level: 85 },
    ],
  },
  {
    title: "AI Engineering",
    icon: "bot",
    skills: [
      { name: "Claude Code 페어 프로그래밍", level: 95 },
      { name: "MCP 서버 설계·구축", level: 90 },
      { name: "Harness Engineering (Hooks·커맨드)", level: 90 },
      { name: "LLM 파이프라인 (STT·요약·자동화)", level: 80 },
      { name: "ADR 기반 의사결정 문서화", level: 90 },
    ],
  },
];

export const skillBadges = [
  "Node.js",
  "TypeScript",
  "NestJS",
  "Next.js",
  "React",
  "Java",
  "Spring Boot",
  "PHP",
  "Laravel",
  "Python",
  "FastAPI",
  "Solidity",
  "Blockchain",
  "web3.js",
  "MySQL",
  "PostgreSQL",
  "MariaDB",
  "Redis",
  "Docker",
  "Nginx",
  "AWS",
  "Azure",
  "Linux",
  "Git",
  "Jenkins",
  "RabbitMQ",
  "Claude Code",
  "MCP",
  "AI/인공지능",
];
