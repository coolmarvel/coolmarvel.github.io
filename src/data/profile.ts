export const profile = {
  name: "이성현",
  englishName: "Seonghyeon Lee (coolmarvel)",
  title: "백엔드 중심 풀스택 개발자",
  tagline: "메디컬 · 커머스 · 블록체인",
  birthYear: 1997,
  email: "marvel97@naver.com",
  phone: "010-9254-1305",
  location: "서울 중랑구",
  github: "https://github.com/coolmarvel",
  blog: "https://saranghaeo.tistory.com/",
  notion:
    "https://coolmarvel.notion.site/Portfolio-14dd605b71404415b6b562576e9e4128?pvs=4",
  photo: "/images/profile.jpg",
  resume: "/resume.pdf",
  /** 다운로드 시 저장될 파일명 (원본 이력서 파일명과 동일) */
  resumeFileName: "백엔드 중심 풀스택 개발자 이성현.pdf",
  headline: "도메인을 이해하고,\n실제로 쓰이는 시스템을 만듭니다.",
  subheadline: "블록체인 → 커머스 → 의료. 낯선 업무를 데이터 구조와 API로 정리하고, 배포와 운영까지 책임지는 백엔드 중심 풀스택 개발자입니다. 최근에는 AI가 일하는 하네스를 직접 설계해 실무와 개인 프로젝트에 적용하고 있습니다.",
  summary: [
    "블록체인, 커머스, 의료 도메인에서 백엔드 중심의 풀스택 개발 경험을 쌓아온 소프트웨어 엔지니어입니다.",
    "Java/Spring Boot, Node.js/NestJS, PHP/Laravel, React/Next.js 기반으로 REST API, 주문/결제 시스템, 운영 백오피스, 사내 그룹웨어, 외부 서비스 연동, 데이터 처리, 배포와 운영까지 경험했습니다.",
    "최근에는 Claude Code, GPT/Codex, Cursor, MCP를 활용해 설계, 구현, 코드리뷰, 테스트, 문서화까지 AI와 협업하는 개발 방식을 실무와 개인 프로젝트에 적극 적용하고 있습니다. 기술 자체보다 업무와 도메인을 이해하고 실제 사용자가 체감할 수 있는 시스템으로 구현하는 것을 중요하게 생각합니다.",
  ],
  highlights: [
    // value "auto" → CareerDuration 컴포넌트가 src/lib/career.ts 기준(2022.05~)으로 자동 계산
    // value "projects" → projects.length (개수 자동)
    { label: "총 경력", value: "auto", badge: "재직중", href: "/experience" },
    { label: "재직 회사", value: "5개사", badge: "의료 · 커머스 · 블록체인", href: "/experience" },
    { label: "프로젝트", value: "projects", badge: "라이브 서비스 · 인스톨러 배포", href: "/projects" },
    { label: "AI 협업 개발", value: "Claude Code", badge: "Harness Engineering", href: "/ai-workflow" },
  ],
};

export const currentPosition = {
  company: "씨엠병원 전산과",
  role: "백엔드/서버개발",
  since: "2026.05",
};
