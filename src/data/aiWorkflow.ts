export const aiPhilosophy = {
  title: "Harness Engineering",
  subtitle: "AI를 쓰는 것이 아니라, AI가 일하는 시스템을 설계합니다",
  intro: [
    "AI(Claude Code) 페어 프로그래밍을 단순 코드 생성 도구가 아닌 정식 개발 방법론으로 채택했습니다. 핵심은 \"Constrain → Verify → Correct\" — AI의 행동을 시스템적으로 제약하고, 산출물을 자동 검증하고, 규칙 위반을 즉시 교정하는 하네스(Harness) 레이어를 프로젝트마다 직접 설계하는 것입니다.",
    "이 방법론을 Laravel/PHP, FastAPI/Python, Electron/TypeScript, C#/.NET 등 서로 다른 스택 8개 프로젝트에 일관되게 적용하며, 프로세스 규율 자체를 조직 표준으로 만들었습니다. 언어와 프레임워크가 바뀌어도 하네스의 골격(제약 → 검증 → 기록)은 그대로 이식됩니다.",
    "새 프로젝트는 project-seed라는 자체 \"발사대\" 저장소에서 시작합니다. 브리프(왜/무엇 SSOT)·세션 부팅 프로토콜·hooks·문서 체계·라이선스 표기까지 첫 커밋부터 갖춰진 상태로 출발하기 때문에, 프로젝트가 늘어나도 규율이 흐려지지 않습니다.",
  ],
};

export const aiPillars = [
  {
    title: "Constrain — Hooks",
    color: "brand" as const,
    description:
      "AI가 넘지 말아야 할 선을 코드로 강제합니다. .env 수정 차단(env-guard), 민감파일 staging·git add -A 차단(git-add-guard), 커밋 전 staged 코드 포맷 검증(pre-commit-lint), 편집 직후 자동 포맷팅(pint·ruff·dotnet format) 등 hooks가 AI의 모든 파일 조작을 감시합니다. 편집 직후 백그라운드 빌드를 돌려 깨진 코드를 즉시 알리는 build-check까지, 스택에 맞춰 hooks를 다시 짭니다.",
    items: ["env-guard", "git-add-guard", "pre-commit-lint", "auto-format (pint/ruff/dotnet)", "build-check"],
  },
  {
    title: "Verify — 슬래시 커맨드 & 자동 검증",
    color: "success" as const,
    description:
      "산출물은 자동화된 리뷰를 통과해야 합니다. 마이그레이션 리뷰, OWASP Top 10 보안 리뷰, DDD 경계 감사, 배포 전 체크, Playwright 브라우저 QA 등 프로젝트별 슬래시 커맨드로 검증을 표준화했습니다. 릴리스 전 검증도 스택별로 고정돼 있습니다 — 웹/데스크톱은 typecheck·test·build, .NET은 build·test·format 3종을 전부 통과해야만 인스톨러를 굽습니다.",
    items: [
      "/review-migration",
      "/review-security",
      "/review-architecture",
      "/deploy-check",
      "/qa-browser (Playwright)",
      "dotnet build·test·format",
    ],
  },
  {
    title: "Context — MCP & Skills",
    color: "warning" as const,
    description:
      "AI가 실제 코드베이스 컨텍스트로 일하도록 프로젝트 전용 MCP 서버(DB 스키마·모델 관계·라우트 조회 도구)를 구축했습니다. 영역별 전문 스킬(Laravel·Filament·프론트엔드 등)은 skills-lock.json으로 버전·해시를 고정해 재현성을 확보하고, 전부 프로젝트 로컬로 격리했습니다.",
    items: [
      "Laravel MCP 서버 (자체 구축)",
      "context7 · playwright MCP",
      "프로젝트 로컬 Skills 5~9종",
      "skills-lock.json 해시 고정",
    ],
  },
  {
    title: "Record — ADR & 문서 SSOT",
    color: "error" as const,
    description:
      "아키텍처 결정은 폐기된 대안과 트레이드오프까지 ADR로 기록합니다. voice_server는 \"로컬 GPU 전량 처리 → 원격 API 위임 → thin orchestrator\"로의 진화를 ADR 6건으로 추적했고, CLAUDE.md·writing-guide·runbook·onboarding 문서가 세션이 바뀌어도 AI가 맥락을 복구하는 SSOT 역할을 합니다. 한 번 밟은 지뢰는 \"함정 박제\" 항목으로 남겨 같은 실수가 두 번 나오지 않게 합니다.",
    items: ["ADR 28건 (7개 프로젝트)", "CLAUDE.md 세션 부팅 프로토콜", "writing-guide 문서 표준", "session-log SSOT", "함정 박제"],
  },
  {
    title: "Bootstrap — project-seed 발사대",
    color: "neutral" as const,
    description:
      "프로젝트가 늘어날수록 규율은 흐려지기 쉽습니다. 그래서 킥오프 자체를 템플릿화한 project-seed 저장소를 만들어, 새 프로젝트를 브리프·부팅 프로토콜·hooks·문서 체계·라이선스 표기가 갖춰진 상태에서 시작합니다. 특정 프로젝트에서 검증된 규칙(예: 라이선스·브랜딩 표기 표준)은 발사대로 승격시켜 이후 모든 프로젝트에 자동 적용합니다.",
    items: ["브리프 킥오프 산출물", "세션 부팅 프로토콜", "hooks 기본 세트", "규칙 승격(back-porting)"],
  },
];

export const aiMatrix = {
  columns: [
    "cm_groupware",
    "voice_server",
    "pt_schedule",
    "pdf-editor",
    "file-converter",
    "dicom-studio",
    "sh-ip-scanner",
    "sh-dicom-studio",
  ],
  rows: [
    {
      label: "스택",
      values: [
        "Laravel · PHP",
        "FastAPI · Python",
        "FastAPI · React",
        "Electron · React · TS",
        "Electron · React · TS",
        "Electron · React · TS",
        "C# · .NET 8 · Avalonia",
        "C# · ASP.NET Core · Oracle",
      ],
    },
    {
      label: "Hooks",
      values: [
        "4종 (env·git·lint·pint)",
        "3종 (env·git·ruff)",
        "settings.local",
        "문서/빌드 자동 규칙",
        "문서/빌드 자동 규칙",
        "3종 (env·git·format)",
        "4종 (env·git·format·build)",
        "3종 (env·git·format)",
      ],
    },
    {
      label: "슬래시 커맨드",
      values: ["5종", "3종", "—", "—", "—", "2종", "2종", "2종"],
    },
    {
      label: "MCP",
      values: [
        "Laravel MCP(자체) + context7 + playwright",
        "외부 AI/Gradio 연동",
        "playwright + context7",
        "— (E2E는 MCP 아닌 직접 하네스)",
        "— (E2E는 MCP 아닌 직접 하네스)",
        "context7 + playwright",
        "context7 (데스크톱 앱이라 playwright 미사용)",
        "context7 + playwright",
      ],
    },
    {
      label: "Skills (로컬 고정)",
      values: ["9종", "—", "5종", "—", "—", "—", "—", "—"],
    },
    {
      label: "ADR",
      values: ["7건", "6건", "—", "2건", "6건", "2건", "2건", "3건"],
    },
    {
      label: "UI 자가검증",
      values: [
        "Playwright 브라우저 QA",
        "—",
        "Playwright",
        "Playwright _electron",
        "Playwright _electron (E2E 24종)",
        "Playwright _electron",
        "Avalonia 헤드리스 렌더",
        "Avalonia 헤드리스 렌더 + 라이브 서버 E2E",
      ],
    },
  ],
};

export const aiAsProduct = {
  title: "AI를 개발 도구를 넘어 제품 기능으로",
  description:
    "회의록 자동화 생태계는 3개 시스템의 협업입니다. voice_server가 음성을 전사하고, AI 서버(claude -p 비대화 모드)가 요약·분석하며, 그룹웨어가 MCP 서버로 노출한 도구 11종을 LLM이 직접 호출해 부서별 칸반 보드에 TODO 카드를 자동 등록합니다. 도구 설계는 멱등성·책임자 자동 귀속·Bearer+HMAC 인증까지 프로덕션 기준을 따릅니다.",
  flow: [
    { step: "1", label: "음성 업로드", detail: "voice_server (FastAPI)" },
    { step: "2", label: "화자분리 + STT", detail: "WhisperX 원격 API" },
    { step: "3", label: "LLM 요약·분석", detail: "claude -p 비대화 모드" },
    { step: "4", label: "MCP 도구 호출", detail: "그룹웨어 MCP 서버 (HTTP/SSE)" },
    { step: "5", label: "칸반 TODO 자동 등록", detail: "부서 책임자 자동 귀속" },
  ],
};
