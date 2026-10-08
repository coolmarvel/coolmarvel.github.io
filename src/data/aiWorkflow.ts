import type { Accent } from "@/components/ui/Chip";

export const aiPhilosophy = {
  title: "Harness Engineering",
  subtitle: "AI를 쓰는 것이 아니라, AI가 일하는 시스템을 설계합니다",
  intro: [
    "Claude Code를 정식 개발 방식으로 씁니다. 몇 주 써 보고 분명해진 것은, 중요한 건 AI가 코드를 내놓는 속도가 아니라 그 코드를 믿을 수 있게 만드는 일이고 그게 제 몫이라는 점이었습니다. 그래서 프로젝트마다 AI가 넘지 말아야 할 선을 코드로 막고(제약), 산출물을 자동으로 검사하고(검증), 틀린 것은 그 자리에서 고치게 하는(교정) 하네스를 직접 설계합니다.",
    "같은 틀을 Laravel/PHP, FastAPI/Python, Electron/TypeScript, C#/.NET, Spring Boot, WebGL2/Rust까지 스택이 다른 15개 프로젝트에 그대로 적용했습니다. 언어가 바뀌어도 바뀌는 것은 훅과 검증 명령의 내용뿐이고 골격(제약 → 검증 → 기록)은 같습니다. 재직 중인 병원에서는 이 방식이 그룹웨어·회의록 파이프라인·스케줄 시스템의 작업 표준이 됐습니다.",
    "새 프로젝트는 project-seed라는 제 템플릿 저장소에서 시작합니다. 브리프, 세션 부팅 프로토콜, 훅, 문서 체계, 라이선스 표기, 디자인 계약이 첫 커밋부터 들어 있어서 프로젝트가 열 개를 넘어도 규율이 흐려지지 않습니다. 한 프로젝트에서 검증된 규칙은 템플릿으로 올려 다음 프로젝트부터 자동으로 적용됩니다.",
  ],
};

export interface AiPillar {
  title: string;
  accent: Accent;
  description: string;
  items: string[];
}

export const aiPillars: AiPillar[] = [
  {
    title: "Constrain — Hooks",
    accent: "blue",
    description:
      "AI가 넘지 말아야 할 선은 말로 당부하지 않고 코드로 막습니다. .env를 고치려 하면 차단되고, git add -A로 민감한 파일을 올리려 하면 막히고, 파일을 저장하면 포맷터가 돌고, 커밋 전에는 포맷 검증이 돕니다. 편집 직후 백그라운드 빌드를 돌려 깨진 코드를 바로 알려 주는 훅도 있습니다. 스택이 바뀌면 포맷터(pint·ruff·Prettier·dotnet format)만 바꿔 끼웁니다.",
    items: ["env-guard", "git-add-guard", "pre-commit-lint", "auto-format (pint/ruff/dotnet)", "build-check"],
  },
  {
    title: "Verify — 자동 검증",
    accent: "green",
    description:
      "AI가 '됐습니다'라고 해도 믿지 않습니다. 웹·데스크톱은 typecheck·test·build, .NET은 build·test·format, 웹 서비스는 API 통합 테스트와 E2E까지 통과해야 인스톨러를 굽거나 서버에 올립니다. 마이그레이션·보안(OWASP Top 10)·아키텍처 경계·배포 전 점검은 슬래시 커맨드로 만들어 매번 같은 기준으로 리뷰하게 했고, UI는 Playwright로 실제 브라우저와 실제 앱을 띄워 확인합니다. C# 앱은 창이 없는 WSL에서 Avalonia Headless로 실제 렌더를 돌려 모든 버튼을 눌러 봅니다.",
    items: [
      "/review-migration",
      "/review-security",
      "/review-architecture",
      "/deploy-check",
      "/qa-browser (Playwright)",
      "dotnet build·test·format",
      "API 통합 테스트 + E2E 3프로젝트",
      "Avalonia Headless 전수 스윕",
    ],
  },
  {
    title: "Context — MCP & Skills",
    accent: "orange",
    description:
      "AI가 추측이 아니라 실제 코드베이스를 보고 일하게 합니다. 그룹웨어에는 DB 스키마·모델 관계·라우트를 조회하는 전용 MCP 서버를 만들어 붙였고, 반대로 sh-compositor는 앱 자체를 MCP 서버(도구 58종)로 만들어 Claude Code가 편집기를 직접 조작하게 했습니다. AI가 쓰는 도구와 AI에게 주는 도구를 둘 다 만드는 셈입니다. 영역별 스킬은 버전과 해시를 잠가 프로젝트 안에 두어 다른 PC에서도 같은 결과가 나오게 합니다.",
    items: ["Laravel MCP 서버 (자체 구축)", "sh-compositor MCP 서버 (도구 58종)", "context7 · playwright MCP", "프로젝트 로컬 Skills 5~22종", "skills-lock.json 해시 고정"],
  },
  {
    title: "Record — ADR & 문서 SSOT",
    accent: "purple",
    description:
      "결정은 버린 대안과 이유까지 ADR로 남깁니다. voice_server가 로컬 GPU 처리에서 원격 API 위임을 거쳐 얇은 오케스트레이터가 되기까지의 과정이 ADR 6건에 있고, pdf-editor-live는 설계 ADR 하나에 개정 7번을 쌓으며 구독 모델까지 결정했습니다. 세션이 바뀌면 AI는 CLAUDE.md가 가리키는 세션 로그 → todo → ADR 순서로 맥락을 복구하고, 한 번 밟은 지뢰는 '함정' 항목으로 남겨 같은 실수를 두 번 하지 않게 합니다.",
    items: ["ADR 74건 (14개 프로젝트)", "CLAUDE.md 세션 부팅 프로토콜", "writing-guide 문서 표준", "session-log SSOT", "함정 박제"],
  },
  {
    title: "Design — oh-my-design 디자인 계약",
    accent: "indigo",
    description:
      "UI도 규율의 대상입니다. oh-my-design으로 실제 기업 레퍼런스 카탈로그(440종)에서 프로젝트에 맞는 브랜드를 고르고, 그 톤을 DESIGN.md 계약으로 프로젝트 루트에 둡니다. 모든 UI 작업은 이 계약을 읽고 시작하고, 편집 후 훅이 계약 밖 색·라운드·모션을 잡아냅니다. PDF Editor Live는 Notion 베이스에 Linear 툴바, 이 포트폴리오는 Toss, sh-web-editor는 Upbit 베이스에 상용 웹에디터 실물을 Playwright로 픽셀 실측한 값을 더했습니다. 기억이 아니라 측정값으로 룩을 고정합니다.",
    items: ["DESIGN.md 디자인 계약", "레퍼런스 카탈로그 440종", "OmD 스킬 22 · 서브에이전트 19 · 훅 4", "슬롭 감사(slop-audit) · 디자이너 리뷰"],
  },
  {
    title: "Bootstrap — project-seed 발사대",
    accent: "teal",
    description:
      "프로젝트가 늘수록 규율은 흐려집니다. 그래서 킥오프 자체를 템플릿으로 만들었습니다. 새 프로젝트는 유형 → 스택 → DB → 디자인 레퍼런스 → 이름 순서의 메뉴로 시작하고, 브리프·부팅 프로토콜·훅·문서 체계·라이선스 표기가 갖춰진 첫 커밋이 나옵니다. 한 프로젝트에서 검증된 규칙은 템플릿으로 올려 다음 프로젝트부터 자동으로 적용합니다.",
    items: ["메뉴 위저드 킥오프", "브리프 킥오프 산출물", "세션 부팅 프로토콜", "hooks 기본 세트", "규칙 승격(back-porting)"],
  },
];

export const aiMatrix = {
  columns: [
    "cm_groupware",
    "voice_server",
    "pt_schedule",
    "pdf-editor",
    "pdf-editor-live",
    "file-converter",
    "dicom-studio",
    "sh-ip-scanner",
    "sh-dicom-studio",
    "remote-assist",
    "sh-web-editor",
    "sh-messenger",
    "sh-compositor",
    "sh-econsent",
    "sh-form-designer",
  ],
  rows: [
    {
      label: "스택",
      values: [
        "Laravel · PHP",
        "FastAPI · Python",
        "FastAPI · React",
        "Electron · React · TS",
        "Vite · Fastify · Postgres",
        "Electron · React · TS",
        "Electron · React · TS",
        "C# · .NET 8 · Avalonia",
        "C# · ASP.NET Core · Oracle",
        "C# · .NET 8 · WPF · Avalonia",
        "TS · Tiptap · Vite · Spring Boot 4",
        "Electron · React · NestJS · Postgres",
        "Electron · React · WebGL2 · Rust/WASM",
        "C# · .NET 8 · Avalonia · ASP.NET Core · Postgres",
        "C# · .NET 8 · Avalonia · SkiaSharp",
      ],
    },
    {
      label: "Hooks",
      values: [
        "4종 (env·git·lint·pint)",
        "3종 (env·git·ruff)",
        "settings.local",
        "문서/빌드 자동 규칙",
        "4종 (OmD: 스킬 활성·세션 상태·편집 감시·폴드인)",
        "문서/빌드 자동 규칙 + Prettier",
        "3종 (env·git·format)",
        "4종 (env·git·format·build)",
        "3종 (env·git·format)",
        "3종 (env·git·format) + OmD 4종",
        "3종 (env·git·Prettier) + OmD 4종",
        "3종 (env·git·Prettier) + OmD 4종",
        "3종 (env·git·Prettier)",
        "3종 (env·git·dotnet format)",
        "3종 (env·git·dotnet format)",
      ],
    },
    {
      label: "슬래시 커맨드",
      values: ["5종", "3종", "—", "—", "OmD 스킬 22종", "—", "2종", "2종", "2종", "2종 + OmD 스킬 22종", "2종 + OmD 스킬 22종", "2종 + OmD 스킬 22종", "2종", "2종", "2종"],
    },
    {
      label: "MCP",
      values: [
        "Laravel MCP(자체) + context7 + playwright",
        "외부 AI/Gradio 연동",
        "playwright + context7",
        "— (E2E는 MCP 아닌 직접 하네스)",
        "— (E2E 직접 하네스)",
        "— (E2E는 MCP 아닌 직접 하네스)",
        "context7 + playwright",
        "context7 (데스크톱 앱이라 playwright 미사용)",
        "context7 + playwright",
        "context7 + playwright",
        "context7 + playwright (실물 픽셀 실측·라이브 QA)",
        "context7 + playwright",
        "context7 + playwright · 앱 자체가 MCP 서버(도구 58종), Claude Code 실연결",
        "context7 (playwright는 웹 편집기 시절, 현재 미사용)",
        "context7",
      ],
    },
    {
      label: "Skills (로컬 고정)",
      values: ["9종", "—", "5종", "—", "22종 + 서브에이전트 19", "—", "—", "—", "—", "22종 + 서브에이전트 19", "22종 + 서브에이전트 19", "22종 + 서브에이전트 19", "—", "—", "—"],
    },
    {
      label: "디자인 계약",
      values: ["TailAdmin 이식", "—", "—", "v1.7 디자인 토큰(웹 동기화)", "DESIGN.md (Notion + Linear)", "클래식 UI 토큰 SSOT + 스킨 13종", "—", "—", "—", "DESIGN.md (Upbit + 업무 도구 실측 색, WPF·Avalonia 토큰 쌍둥이)", "DESIGN.md (Upbit + 상용 웹에디터 픽셀 실측 토큰, 자체 SVG 아이콘 64종)", "DESIGN.md (Core v2 그래프 투영, 카카오톡 PC 창 구조)", "DESIGN.md (Compositor 화면 구조 + 클래식 크롬, 스킨 13종)", "DESIGN.md (클래식 돋움 12px·베벨·메뉴바·탭)", "DESIGN.md (클래식 리본·도킹, oh-my-design 미사용)"],
    },
    {
      label: "ADR",
      values: ["7건", "6건", "—", "2건", "1건 (개정 7회)", "8건", "2건", "2건", "3건", "6건", "6건", "9건", "7건", "12건", "3건"],
    },
    {
      label: "테스트 · UI 자가검증",
      values: [
        "Playwright 브라우저 QA",
        "—",
        "Playwright",
        "유닛 25 + Playwright _electron 4",
        "API 통합 28 + Playwright E2E 46 (3프로젝트)",
        "유닛 44 + Playwright _electron E2E 41 (난독화 빌드·AI 실추론)",
        "Playwright _electron",
        "Avalonia 헤드리스 렌더",
        "xUnit 34 + Avalonia 헤드리스 렌더 + 라이브 서버 E2E",
        "xUnit 217 (Core 192 + Server 25) + 가짜 플랫폼 종단 테스트 + 실서버 스모크 + Windows 콘솔 하네스",
        "Vitest 188 + JUnit 11 + Playwright E2E + Playwright MCP 실물 대조",
        "서버 332 + 데스크톱 38 + 업데이트 서버 27 + Playwright 브라우저 38(2뷰포트) + 실제 Electron 앱 E2E 5",
        "단위 108 + Electron E2E 135 + 웹 E2E 17 + MCP E2E 25 + 스크린샷 문구 감사 88장 + 커널 벤치",
        "xUnit 154 (Core 71 · Server 32 · App 47 Avalonia Headless 전수 스윕·무작위 워크플로 · 실서버 E2E 4) + 서식 393종 E2E",
        "xUnit 111 (엔진 51 · 디자이너 60, 전수 QA 87) — Avalonia Headless 전수 스윕·무작위 편집·성능 예산·갤러리 렌더",
      ],
    },
  ],
};

export const aiAsProduct = {
  title: "AI를 개발 도구를 넘어 제품 기능으로",
  description:
    "AI를 개발 도구로만 쓰지 않고 제품 안에도 넣었습니다. 병원 회의록 자동화는 세 시스템이 협업합니다. voice_server가 음성을 전사하고, AI 서버(claude -p 비대화 모드)가 요약·분석하며, 그룹웨어가 MCP 서버로 내놓은 도구 11종을 LLM이 직접 불러 부서별 칸반 보드에 할 일 카드를 등록합니다. 도구는 멱등성·책임자 자동 귀속·Bearer+HMAC 인증까지 운영 기준으로 설계했습니다. 개인 프로젝트에서는 배경 제거·개체 선택·AI 지우개 모델을 설치본에 동봉해 네트워크 없이 돌리고, 편집기 자체를 MCP 서버로 만들었습니다.",
  flow: [
    { step: "1", label: "음성 업로드", detail: "voice_server (FastAPI)" },
    { step: "2", label: "화자분리 + STT", detail: "WhisperX 원격 API" },
    { step: "3", label: "LLM 요약·분석", detail: "claude -p 비대화 모드" },
    { step: "4", label: "MCP 도구 호출", detail: "그룹웨어 MCP 서버 (HTTP/SSE)" },
    { step: "5", label: "칸반 TODO 자동 등록", detail: "부서 책임자 자동 귀속" },
  ],
};
