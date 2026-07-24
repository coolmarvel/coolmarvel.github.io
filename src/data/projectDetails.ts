export interface ProjectScreenshot {
  src: string;
  caption: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectDetail {
  role: string;
  background: string[];
  architecture: string[];
  aiUsage?: string[];
  screenshots?: ProjectScreenshot[];
  demo?: { url?: string; account?: string; note: string };
  links?: ProjectLink[];
}

export const projectDetails: Record<string, ProjectDetail> = {
  "cm-groupware": {
    role: "전체 아키텍처 설계 및 단독 개발 (기획 → 설계 → 개발 → 프로덕션 운영)",
    background: [
      "병원의 업무가 종이 결재, 수기 근태 관리, 개별 메신저, 흩어진 문서 발급 절차로 분산되어 있었습니다. 전자 결재·근태/연차·게시판·사내 메일/메신저·문서 발급·직무평가·회의록·프로젝트 칸반을 하나의 플랫폼으로 통합하는 것이 목표였습니다.",
      "병원 직원 중 고령 사용자가 많아 폰트·버튼 최소 크기 규칙을 강제하는 등 접근성을 설계 단계부터 반영했습니다.",
    ],
    architecture: [
      "Laravel 12 기반 도메인 주도 설계(DDD)로 13개 업무 도메인(결재·근태·일정·게시판·메일·직무평가·증명서·칸반 등)을 모듈화 — 도메인 간 결합을 이벤트로 낮춰 기능 추가가 다른 도메인을 깨지 않는 구조",
      "다형성(Polymorphic) 전자결재 엔진 — 휴가/연장근무/문서결재 등 이종 문서를 단일 결재 흐름으로 처리하고, 결재 완료 시 트랜잭션 내 콜백(onApprovalCompleted)으로 연차 차감 등 후속 처리를 자동화",
      "사용자 생성 이벤트(UserCreated) → Mailcow 메일 계정 + Mattermost 메신저 계정 자동 프로비저닝하는 이벤트-리스너 구조",
      "DB 저장 + 30초 폴링 인앱 알림 + Mattermost DM + SMTP 메일의 다중 채널 통합 알림",
      "전역 클릭 위임 핸들러로 모든 내부 링크를 Livewire.navigate() 처리해 전 페이지 SPA 경험 구현 (링크마다 wire:navigate 불필요)",
      "N+1 방지 eager loading과 복합 인덱스 설계로 핵심 조회 경로 최적화, TailAdmin 디자인 시스템을 Blade로 이식해 다크모드까지 지원",
    ],
    aiUsage: [
      "Claude Code 페어 프로그래밍을 정식 개발 방법론으로 채택하고 \"Harness Engineering\" 레이어를 직접 설계 (ADR-0001)",
      "Hooks 4종 — .env 수정 차단(env-guard), 민감파일 staging 차단(git-add-guard), 커밋 전 포맷 검증(pre-commit-lint), 편집 후 자동 pint 포맷팅",
      "자동 코드리뷰 슬래시 커맨드 5종 — /review-migration, /review-security(OWASP Top 10), /review-architecture(DDD 경계 감사), /deploy-check, /qa-browser(Playwright)",
      "프로젝트 전용 MCP 서버(Laravel MCP) 구축 — DB 스키마·모델 관계·라우트 조회 도구를 AI에 제공해 실제 코드베이스 컨텍스트 기반으로 작업",
      "영역별 전문 스킬 9종을 프로젝트 로컬로 고정(skills-lock.json 해시)하고, 아키텍처 결정 8건을 ADR로 영구 기록",
    ],
    screenshots: [
      { src: "/images/projects/cm-groupware/login.jpg", caption: "로그인 — TailAdmin 디자인 시스템 Blade 이식" },
      { src: "/images/projects/cm-groupware/dashboard.jpg", caption: "대시보드 — 출퇴근·연차 현황·결재 대기·알림 통합" },
      { src: "/images/projects/cm-groupware/approval-box.jpg", caption: "결재함 — 대기/승인/반려/참조 상태별 관리" },
      { src: "/images/projects/cm-groupware/schedule.jpg", caption: "일정 캘린더 — 개인/병원공통/회의실/휴가 레이어" },
      { src: "/images/projects/cm-groupware/meetings.jpg", caption: "회의록 — voice_server 자동 수신 + 할 일 후보 대기 표시" },
      { src: "/images/projects/cm-groupware/boards.jpg", caption: "게시판 허브 — 일반/QA 트래커/IT 트래커 3가지 유형, 게시판별 통계" },
      { src: "/images/projects/cm-groupware/board-emr-qa.jpg", caption: "EMR QA 트래커 — 실운영 300건+, 작성자/담당자 이중 상태 관리 (담당자·작성자는 블러 처리)" },
    ],
    demo: {
      url: "https://chungmu.xyz",
      account: "ID: demo / PW: 123456",
      note: "포트폴리오 열람용 공개 데모 계정입니다. 데모 계정은 조회 외 기능이 차단되어 있어 자유롭게 접속해보셔도 됩니다.",
    },
  },

  "meeting-todo-mcp": {
    role: "MCP 서버 설계·구현 및 LLM 연동 파이프라인 구축",
    background: [
      "부서장 회의가 끝나면 회의 중 나온 할 일(Action Item)을 누군가 수기로 정리해 각 부서에 전달해야 했고, 누락과 지연이 반복됐습니다.",
      "voice_server가 전사한 회의록을 LLM이 요약·분석한 뒤, 도출된 할 일을 부서별 칸반 보드에 자동으로 카드 등록하는 완전 자동화가 목표였습니다.",
    ],
    architecture: [
      "그룹웨어를 MCP(Model Context Protocol) 서버로 노출(HTTP/SSE, Bearer 인증)하고 AI 서버가 MCP 클라이언트로 연결 — LLM이 직접 그룹웨어 도구를 호출하는 구조",
      "회의록 자동화 도구 11종 구현 — 부서·프로젝트·멤버·후보 조회 + 프로젝트/컬럼/멤버/보드카드 생성",
      "고정 RPC 호출 대신 LLM이 \"어떤 도구를 언제 호출할지\" 자율 판단하도록 tool description과 JSON Schema를 LLM 친화적으로 설계",
      "모든 생성 도구를 멱등(idempotent)하게 설계 — 재시도·중복 호출에도 안전 (이미 생성된 후보는 409 반환)",
      "단일 봇 계정 대신 부서 책임자를 자동 해석(ResponsibleUserResolver)해 자동 등록 카드의 행위자를 실제 책임자에 귀속 — 활동 로그 추적성 확보",
      "REST API·DB 직접 접근 등 대안을 비교 검토하고 MCP 채택 근거를 ADR로 문서화 (ADR-0007)",
    ],
    aiUsage: [
      "AI 서버는 Claude Code CLI의 비대화 모드(claude -p)로 LLM을 호출 — AI를 개발 도구를 넘어 제품 기능으로 통합한 사례",
      "voice_server(전사) ↔ AI 서버(요약·분석) ↔ 그룹웨어(MCP 도구 호출)의 3-시스템 협업 파이프라인",
    ],
    screenshots: [
      { src: "/images/projects/cm-groupware/meetings.jpg", caption: "그룹웨어 회의록 목록 — 자동 수신된 회의별 '할 일 후보 N건 대기' 표시" },
      { src: "/images/projects/cm-groupware/meeting-encrypted.jpg", caption: "회의록 상세 — 암호화 보관 상태와 수신 정보(KDF 600,000 iter). 패스워드 입력 시 1회성으로만 평문 표시" },
      { src: "/images/projects/cm-groupware/meeting-decrypted.jpg", caption: "데모 계정의 복호화 시도 — 읽기 전용 가드가 실제로 차단하는 모습" },
    ],
  },

  "voice-server": {
    role: "파이프라인 설계·구현 및 아키텍처 진화 주도",
    background: [
      "매주 1~2시간짜리 부서장 회의의 회의록을 수기로 작성하는 부담이 컸습니다. 음성 파일만 올리면 화자분리 → STT → 요약 → 그룹웨어 전송까지 자동으로 처리하는 파이프라인을 구축했습니다.",
      "GPU(12GB VRAM) 1대라는 제약 속에서 시작해, 처리 단계를 원격 API로 위임하는 방향으로 아키텍처를 진화시켰고 그 과정을 ADR 6건으로 추적했습니다.",
    ],
    architecture: [
      "queued → converting → diarizing → asr → summarizing → sending → done 상태머신 — 단계별 처리 시각을 DB에 기록해 병목 추적",
      "아키텍처 진화: 로컬 pyannote/faster-whisper GPU 처리 → 원격 WhisperX API 위임(ADR-0004) → 요약도 원격 Claude 래퍼 API 위임(ADR-0005) → torch·CUDA 의존성 제거로 수 GB → 수백 MB의 thin orchestrator로 경량화",
      "회의록 본문 암호화(ADR-0006) — 업로드 시 입력한 패스워드로 PBKDF2 → AES-256-GCM 암호화. 패스워드는 어디에도 저장하지 않아 서버조차 본문을 복호화할 수 없는 zero-knowledge에 가까운 설계",
      "그룹웨어와 단방향 outbound HTTPS Push만 사용(NAT 뒤에서도 동작) — Bearer 토큰 + HMAC-SHA256 서명, 실패 시 지수백오프 5회 재시도",
      "PII 보호 — 음성 파일은 잡 종료 즉시 삭제, 발화 텍스트는 로그에 기록하지 않음(job_id까지만)",
      "asyncio.Queue 단일 워커 직렬 처리로 공유 GPU 자원 보호, 그룹웨어와 DB·자격증명 분리(ADR-0002)",
    ],
    aiUsage: [
      "cm_groupware의 Harness Engineering 패턴 이식 — hooks 3종(env-guard·git-add-guard·ruff 자동 포맷), 슬래시 커맨드 3종(/review-pipeline·/review-security·/deploy-check)",
      "\"로컬 전량 처리 → 원격 위임 → thin orchestrator\"로의 리팩터링 전 과정을 ADR로 기록 — 폐기한 대안과 트레이드오프까지 추적 가능",
    ],
    screenshots: [
      { src: "/images/projects/voice-server/home.jpg", caption: "업로드 — 회의록 보호 패스워드(암호화)와 WhisperX 원격 설정 패널" },
      { src: "/images/projects/voice-server/jobs.jpg", caption: "처리 이력 — 실제 부서장 회의 50건+ 처리 로그 (완료/실패 상태)" },
      { src: "/images/projects/voice-server/job-detail.jpg", caption: "잡 상세 — 5단계 파이프라인 타임라인, 암호화된 본문 게이트, LLM이 추출한 할 일 50건·10개 부서 (내용은 블러 처리)" },
      { src: "/images/projects/voice-server/job-detail-decrypted.jpg", caption: "패스워드 복호화 후 요약본 — 이 세션에서만 표시, DOCX/MD/JSON 내보내기 (본문 블러 처리)" },
      { src: "/images/projects/voice-server/api-docs.jpg", caption: "FastAPI Swagger — 업로드/잡 상태/스트리밍 부분결과/JSON·MD·DOCX 다운로드 API" },
    ],
    demo: {
      note: "병원 내부망 전용 시스템이라 외부 접속은 불가합니다. 위 스크린샷은 실제 운영 화면입니다.",
    },
  },

  "pdf-editor": {
    role: "개인 프로젝트 — 설계·개발·릴리스 전 과정",
    background: [
      "상용 웹 PDF 편집기는 문서를 서버로 업로드해야 해서 민감 문서를 다루기 어렵습니다. pdfguru.com의 UX를 벤치마킹하되 \"문서가 밖으로 나가지 않는\" 오프라인 데스크톱 편집기를 목표로 했습니다.",
      "벤치마크 스크린샷 26장을 UI/기능의 시각적 SSOT로 삼아, 페이지 관리·텍스트 추가/수정·그리기·형광펜·도형·스탬프·서명·주석·링크까지 상용 수준의 기능을 구현했습니다.",
    ],
    architecture: [
      "정규화 객체 모델(ADR-0002) — 모든 좌표를 뷰포트 기준 0..1로 정규화하고, 라이브 오버레이와 내보내기가 단일 렌더러(draw.ts)를 공유해 \"화면 = 결과물 1:1\" 보장",
      "참조 기반 페이지 연산 — 문서를 PageRef[] + objectsByPage로 표현해 원본 PDF 바이트를 건드리지 않고 삭제·복제·이동·회전·타 문서 가져오기 처리",
      "저장 시 평탄화 — 오버레이는 ≈180dpi 투명 PNG로 굽고 링크/노트는 실제 PDF 주석으로 삽입, 원본 텍스트 벡터는 유지",
      "순수 로직(src/core: objects/pages/history)을 node --test로 보호, undo/redo는 스냅샷 스택(상한 100)",
      "기존 PDF 텍스트를 자동 인식해 박스 편집하는 텍스트 수정 세션 모드 — 버퍼링 후 종료 시 저장 선택",
      "WSL + Wine 크로스 컴파일로 Windows NSIS 인스톨러 자동 생성 (electron-builder)",
      "macOS(Apple Silicon) DMG 파이프라인 — 한글 번들명 크래시를 피하려 내부 제품명을 ASCII로 빌드 후 표시명만 한글 유지, ad-hoc 서명 + hdiutil로 DMG 생성",
    ],
    aiUsage: [
      "스크린샷 피드백 루프 — 사용자가 스크린샷을 지정 디렉토리에 넣으면 AI가 요구사항으로 해석·구현하고 처리 후 아카이브로 이동",
      "세션 부팅 프로토콜 — CLAUDE.md가 session-log(진행 SSOT) → todo → 최근 plan 순으로 맥락을 자동 복구하도록 지시",
      "자동 검증 → 릴리스 파이프라인 — typecheck·test·build를 모두 통과해야만 인스톨러를 굽고 배포",
      "Playwright + WSLg 시각 자가검증 — 앱 구동 → PDF 열기 → 편집 → 스크린샷 픽셀 계측",
    ],
    screenshots: [
      { src: "/images/projects/pdf-editor/landing.jpg", caption: "시작 화면 — 파일 선택/드래그 앤 드롭, 한/영 언어 전환" },
      { src: "/images/projects/pdf-editor/editor.jpg", caption: "편집기 — 전체 도구 툴바와 페이지 썸네일 패널" },
      { src: "/images/projects/pdf-editor/text-add.jpg", caption: "텍스트 추가 — 페이지 위 실시간 입력(한글 지원), 폰트·정렬 서브툴바" },
      { src: "/images/projects/pdf-editor/text-edit.jpg", caption: "텍스트 수정 세션 — 기존 PDF 텍스트를 자동 인식해 박스 단위로 편집" },
      { src: "/images/projects/pdf-editor/highlight.jpg", caption: "형광펜 — 불투명도·블렌드 모드(Multiply) 조절" },
      { src: "/images/projects/pdf-editor/draw.jpg", caption: "연필 그리기 — 자유 곡선, 색상·굵기 조절" },
      { src: "/images/projects/pdf-editor/shapes.jpg", caption: "도형 — 사각형·원, 선 스타일 서브툴바와 선택 핸들" },
      { src: "/images/projects/pdf-editor/stamp.jpg", caption: "스탬프 — APPROVED·DRAFT 등 기본 스탬프 + 커스텀 스탬프" },
      { src: "/images/projects/pdf-editor/sign.jpg", caption: "서명 추가 — 그리기·이미지·타이핑 3가지 방식, 서명 저장" },
      { src: "/images/projects/pdf-editor/annotation.jpg", caption: "주석 노트 — 페이지에 부착되는 스티키 노트" },
      { src: "/images/projects/pdf-editor/link.jpg", caption: "링크 — 영역 지정 후 웹사이트/내부 페이지 연결 (실제 PDF 주석으로 저장)" },
      { src: "/images/projects/pdf-editor/pages-menu.jpg", caption: "페이지 썸네일 메뉴 — 이동·회전·복제·추출·삭제" },
      { src: "/images/projects/pdf-editor/manage-pages.jpg", caption: "페이지 관리 그리드 — 다중 선택 후 일괄 회전·복제·순서 변경·문서 가져오기" },
      { src: "/images/projects/pdf-editor/layout-double.jpg", caption: "레이아웃 — 두 쪽 보기, 페이지 모드/전환/회전 옵션" },
      { src: "/images/projects/pdf-editor/english-editor.jpg", caption: "영어 UI — i18n 한/영 전환 (사전 기반, 라이브러리 없이 구현)" },
    ],
    links: [
      { label: "GitHub 저장소", href: "https://github.com/coolmarvel/pdf-editor" },
      { label: "Windows 인스톨러 다운로드 (v1.5.2)", href: "https://github.com/coolmarvel/pdf-editor/releases/download/v1.5.2/PDF-Editor-Setup-1.5.2.exe" },
      { label: "macOS DMG 다운로드 (v1.5.2, Intel x64)", href: "https://github.com/coolmarvel/pdf-editor/releases/download/v1.5.2/PDF-Editor-1.5.2-x64.dmg" },
      { label: "macOS DMG 다운로드 (v1.5.2, Apple Silicon)", href: "https://github.com/coolmarvel/pdf-editor/releases/download/v1.5.2/PDF-Editor-1.5.2-arm64.dmg" },
    ],
  },

  "file-converter": {
    role: "개인 프로젝트 — 설계·개발·릴리스 전 과정",
    background: [
      "온라인 파일 변환 서비스는 편하지만 두 가지가 싫었습니다. 변환하겠다고 개인 파일을 남의 서버에 업로드하는 것 자체가 내 데이터를 제3자에게 넘기는 일이라는 점, 그리고 무료처럼 쓰게 하다가 어느 순간 결제·구독을 요구하는 패턴이 반복된다는 점입니다. \"내 파일은 내 컴퓨터 밖으로 나가지 않고, 한 번 설치하면 계속 무료\"를 원칙으로 직접 만들었습니다.",
      "배경 제거 같은 AI 기능조차 대부분 서비스가 서버 업로드 + 유료 크레딧으로 제공하기에, AI 추론까지 통째로 로컬에서 돌리는 것을 목표로 했습니다. 개발 중 PDF 편집 요구가 커지자 편집기는 pdf-editor 프로젝트로 분리하고, 이 앱은 변환에 특화했습니다.",
    ],
    architecture: [
      "AI 배경 제거 완전 오프라인 서빙 — ISNet 계열 세그멘테이션 모델(@imgly/background-removal, ONNX)과 onnxruntime-web wasm 354MB를 인스톨러에 통째로 번들하고, Electron 커스텀 프로토콜(bgrm://)로 앱 내부에서 직접 서빙해 네트워크 요청이 한 번도 발생하지 않는 구조",
      "흰색 → 투명 배경은 AI 없이 픽셀 연산(허용 오차 + feather)으로 즉시 처리 — 로고처럼 단색 배경은 모델 로드 없이 가볍게, 사진은 AI로 구분해 제공",
      "입출력 포맷 — 입력: PNG·JPEG·WebP·BMP·HEIC·TIFF·ICO·SVG·PDF (+ Ctrl+V 클립보드), 출력: PNG·JPEG·WebP·BMP·ICO(멀티사이즈)·SVG(벡터화)·PDF. 다중 이미지 → 단일 PDF, PDF → 페이지별 이미지",
      "WYSIWYG 파이프라인 — 리사이즈 → 회전 → 자르기 → 워터마크 순서를 미리보기와 실제 변환이 공유해 \"화면에 보이는 그대로\" 출력, 투명 영역은 체커보드로 표시, undo/redo(Ctrl+Z/Y) 스냅샷 이력",
      "PDF 문서 도구 — 전체 병합·분할·회전·페이지 삭제·순서 변경, \"1,3-5\" 페이지 범위 파서",
      "시작 청크 최적화 — pdf.js·pdf-lib·AI 모듈을 지연 로딩 청크로 분리해 초기 로드 2,389KB → 941KB",
      "배포 소스 보호 — javascript-obfuscator 난독화를 빌드 파이프라인에 내장 (onnx·pdf.js 등 대형 공개 라이브러리 청크는 제외해 동작 리스크 차단)",
    ],
    aiUsage: [
      "제품 기능으로서의 AI — 배경 제거 모델을 npm으로 배포되는 마지막 버전(1.4.5)에 고정해 오프라인 번들 가능성을 확보 (최신 버전은 자사 CDN 전용이라 오프라인 불가 — 버전 선택 자체가 아키텍처 결정)",
      "스크린샷 피드백 루프 — 사용자가 스크린샷을 프로젝트 루트에 넣으면 AI가 요구사항으로 해석·구현 후 아카이브로 이동",
      "세션 부팅 프로토콜 — CLAUDE.md가 session-log(진행 SSOT) → todo → 최근 plan 순으로 맥락 자동 복구",
      "자동 검증 → 릴리스 파이프라인 — typecheck·test·build를 통과해야만 인스톨러를 굽는 규칙, Playwright _electron 전체 기능 회귀 E2E 24종 상설화 (AI 실추론 후 픽셀 alpha 검증 포함)",
    ],
    screenshots: [
      { src: "/images/projects/file-converter/landing.jpg", caption: "시작 화면 — 드래그 앤 드롭, Ctrl+V 클립보드 붙여넣기 지원" },
      { src: "/images/projects/file-converter/convert.jpg", caption: "변환 대시보드 — 파일 사이드바, 실시간 미리보기, 출력 포맷(JPEG·PNG·WebP·BMP·ICO·SVG·PDF) 선택" },
      { src: "/images/projects/file-converter/resize-rotate.jpg", caption: "리사이즈·회전 — 비율 유지 리사이즈와 90° 회전, Ctrl+Z/Y undo·redo" },
      { src: "/images/projects/file-converter/crop.jpg", caption: "자르기 — 미리보기 위에서 드래그로 영역 지정, 잘리는 범위를 그대로 표시" },
      { src: "/images/projects/file-converter/watermark.jpg", caption: "워터마크 — 문구·대각선/바둑판/모서리 배치, 미리보기 실시간 합성" },
      { src: "/images/projects/file-converter/transparent.jpg", caption: "흰색 → 투명 — 픽셀 연산(허용 오차+feather)으로 즉시 처리, 체커보드로 투명 표시" },
      { src: "/images/projects/file-converter/ai-loading.jpg", caption: "AI 배경 제거 진행 — 번들된 ISNet 모델 로드·추론 로딩바 (네트워크 요청 0회)" },
      { src: "/images/projects/file-converter/ai-result.jpg", caption: "AI 배경 제거 결과 — 인물 사진 배경을 로컬 ONNX 추론만으로 제거" },
      { src: "/images/projects/file-converter/pdf-preview.jpg", caption: "PDF 변환 — 페이지별 이미지 추출·전체 병합, PDF 미리보기" },
      { src: "/images/projects/file-converter/pdf-tools.jpg", caption: "PDF 페이지 도구 — 분할·회전·삭제·순서 변경, \"1-2,3\" 페이지 범위 문법" },
    ],
    links: [
      { label: "GitHub 저장소", href: "https://github.com/coolmarvel/file-converter" },
      { label: "Windows 인스톨러 다운로드 (v1.3.2)", href: "https://github.com/coolmarvel/file-converter/releases/download/v1.3.2/File-Converter-Setup-1.3.2.exe" },
      // macOS DMG — 아직 맥 빌드 환경이 없어 미배포. 빌드 후 아래 주석 해제
      // (빌드 방법: file-converter docs/guides/packaging.md — pdf-editor의 dist-mac 파이프라인 이식 가이드)
      // { label: "macOS DMG 다운로드 (v1.3.2, Intel x64)", href: "https://github.com/coolmarvel/file-converter/releases/download/v1.3.2/File-Converter-1.3.2-x64.dmg" },
      // { label: "macOS DMG 다운로드 (v1.3.2, Apple Silicon)", href: "https://github.com/coolmarvel/file-converter/releases/download/v1.3.2/File-Converter-1.3.2-arm64.dmg" },
    ],
  },

  "dicom-studio": {
    role: "개인 프로젝트 — 설계·개발·릴리스 전 과정",
    background: [
      "병원 검사장비(혈관검사·심전도 등) 상당수는 결과를 DICOM이 아닌 PDF·JPG 같은 일반 파일로 출력합니다. 이 결과를 PACS 등 병원 영상 시스템에 넣으려면 환자·검사정보를 메타데이터로 결합해 DICOM으로 변환하는 중간 게이트웨이가 필요한데, 기존 상용 도구는 특정 장비·벤더에 종속되고 라이선스 인증 절차가 번거롭습니다. 병원 ID·장비 번호까지 전부 설정값인 범용 게이트웨이를 목표로 직접 만들었습니다.",
      "검사실 직원의 실제 동선(장비 결과 열기 → 정리 → 환자정보 입력 → 변환 → 보관·검색 → 전송)을 그대로 화면 구조로 옮기고, 장비 매뉴얼의 클래식 데스크톱 폼 UI를 TailAdmin 디자인 시스템으로 재해석했습니다. 아래 스크린샷은 제작자 본인의 실제 동맥경화도검사(baPWV·ABI) 결과지 2장으로 전체 워크플로우를 시연한 것입니다.",
    ],
    architecture: [
      "파일 형식을 확장자가 아닌 매직 바이트로 감지 — PDF(페이지별)·JPG·PNG·BMP·TIFF(다중 페이지)·기존 DICOM 입력. pdf.js는 Electron V8 호환을 위해 legacy 빌드를 채택하고 프로덕션 E2E로 검증",
      "DICOM 3.0 Secondary Capture(RGB, Explicit VR Little Endian) 생성(dcmjs) — 다중 이미지 = 한 Study 한 Series, <PatientID>_<검사일>/00001.dcm… 폴더 구조",
      "DICOM 네트워크 3종(dcmjs-dimse) — C-STORE 전송(복수 대상 동시 + 대상별 결과 표시), C-FIND 워크리스트 조회, C-ECHO 연결 테스트. 실PACS 없이 체험할 수 있는 테스트 SCP 서버를 동봉",
      "로컬 DB는 sql.js(WASM SQLite) — 초기의 better-sqlite3가 WSL 크로스 빌드에서 Linux 바이너리가 Windows 패키지에 섞여 기동 불가 → 네이티브 모듈 0개 구조로 교체해 해결한 아키텍처 결정",
      "워크리스트 연결 프로필 — 서버 없는 병원은 로컬(내장 DB)에 처방을 직접 등록, MWL 서버가 있는 병원은 프로필 전환. 처방 행 클릭 = 환자·검사정보 자동 입력(나이 자동 계산), SaveDB 저장 시 일치하는 처방 자동 완료",
      "편집(회전·반전·색반전·순서변경)은 원본 보존 + transform 베이크 구조 — 옆으로 스캔된 검사지를 화면에서 세운 그대로 DICOM 저장·전송에 반영",
      "3계층 분리 — src/core 순수 로직(node test runner로 직접 테스트) / main은 파일 IO·DB·DICOM 전송 등 OS·네트워크 접점 전담 / contextBridge IPC로만 렌더러에 노출",
    ],
    aiUsage: [
      "project-seed 템플릿으로 킥오프 — 브리프(왜/무엇 SSOT)·세션 부팅 프로토콜·스크린샷 피드백 루프·hooks(.env 차단, git add 가드, 자동 포맷)를 첫날부터 가동",
      "버전 판단을 에이전트에 위임(패치 자동, MINOR 승격은 근거와 함께 제안) — 11일간 v1.0.0 → v1.4.0으로 마일스톤 M1~M4(변환·이미지 도구·로컬 DB·PACS 전송) 완주",
      "typecheck·lint·test·build를 모두 통과해야만 인스톨러를 굽는 검증 파이프라인 — WSL에서 개발하고 실제 Windows에서 설치본을 실물 검증",
      "이 페이지의 스크린샷도 Playwright _electron으로 앱을 실구동해 캡처 — 실제 검사 PDF를 DICOM으로 변환하고 테스트 SCP 서버로 C-STORE 실전송까지 수행한 화면",
    ],
    screenshots: [
      { src: "/images/projects/dicom-studio/landing.jpg", caption: "시작 화면 — Main Tools·검사정보·이미지 도구 3단 사이드바 + 다크 뷰어" },
      { src: "/images/projects/dicom-studio/worklist-register.jpg", caption: "처방 등록 — 워크리스트 서버가 없는 병원용 로컬 워크리스트(내장 DB)에 처방 직접 등록" },
      { src: "/images/projects/dicom-studio/calendar.jpg", caption: "커스텀 달력 — 헤더 클릭으로 연/월 그리드 바로 이동 (1900년대 생년월일도 몇 번의 클릭으로)" },
      { src: "/images/projects/dicom-studio/worklist.jpg", caption: "워크리스트 조회 — 처방 행을 클릭하면 환자·검사정보가 폼에 자동 입력 (나이 자동 계산)" },
      { src: "/images/projects/dicom-studio/viewer.jpg", caption: "검사 결과 로드 — 실제 동맥경화도검사(baPWV·ABI) PDF 2건, 이미지 수에 맞춘 자동 레이아웃" },
      { src: "/images/projects/dicom-studio/image-tools.jpg", caption: "이미지 도구 — 옆으로 스캔된 검사지만 선택해 반시계 회전으로 정리, 편집이 저장에 그대로 반영" },
      { src: "/images/projects/dicom-studio/preview.jpg", caption: "크게 보기 — 더블클릭 확대, ←/→로 페이지 이동" },
      { src: "/images/projects/dicom-studio/save-dicom.jpg", caption: "DICOM 3.0 저장 — Secondary Capture로 변환해 <PatientID>_<검사일> 폴더에 00001.dcm…" },
      { src: "/images/projects/dicom-studio/savedb.jpg", caption: "로컬 DB 저장(SaveDB) — 저장과 동시에 일치하는 워크리스트 처방을 자동 완료 처리" },
      { src: "/images/projects/dicom-studio/finddb.jpg", caption: "로컬 DB 검색(FindDB) — 조건 검색 + 썸네일 미리보기, 열기/이미지 추가/전송/다중 전송" },
      { src: "/images/projects/dicom-studio/send.jpg", caption: "PACS 전송 (C-STORE) — 대상 관리·Echo 연결 테스트·다중 전송, 동봉 테스트 SCP로 실전송한 결과" },
    ],
    demo: {
      note: "저장소는 비공개입니다 (개인 프로젝트, 소스 비공개 방침). 아래 인스톨러로 설치해 직접 사용해볼 수 있으며, 스크린샷은 제작자 본인의 실제 검사 결과지로 시연한 화면입니다.",
    },
    // 저장소가 프라이빗이라 GitHub 저장소 링크는 넣지 않는다 (사용자 지시).
    // 다운로드 자산만 공개 레포(coolmarvel.github.io) 릴리스로 제공.
    links: [
      { label: "Windows 인스톨러 다운로드 (v1.4.0)", href: "https://github.com/coolmarvel/coolmarvel.github.io/releases/download/dicom-studio-v1.4.0/DICOMStudio-Setup-1.4.0.exe" },
    ],
  },

  "pt-schedule": {
    role: "설계·개발 전 과정 (백엔드 + 프론트엔드)",
    background: [
      "물리치료실의 치료사별 환자 배정이 수기 시간표로 관리되어 변경·조회·통계가 번거로웠습니다. 치료사별 일일 시간표(08:00~18:00)와 월간 통계, 환자/치료사 검색을 제공하는 운영 도구를 구축했습니다.",
    ],
    architecture: [
      "FastAPI 기능별 라우터 + core(config/database) 구조로 schedule·therapist·auth·calendar·search 5개 도메인 분리",
      "관리자/치료사 이중 인증 — 치료사는 개인 시간표 중심, 관리자는 전체 운영 관리",
      "React 18 + TanStack Query로 시간표 그리드·월간 캘린더 통계(치료사별 환자 수) 구현, 치료사별 색상 구분",
      "cm_groupware와 같은 서버에서 Docker Compose(edge 외부 네트워크 공유)로 운영, 그룹웨어 사이드바에서 바로 진입",
    ],
    aiUsage: [
      "cm_groupware의 문서/하네스 표준을 경량 스택(FastAPI+React)에 이식 — 프로젝트 로컬 Skills 5종을 skills-lock.json 해시로 고정, MCP(playwright·context7)도 프로젝트 로컬 격리",
    ],
    screenshots: [
      { src: "/images/projects/pt-schedule/schedule.jpg", caption: "치료사별 일일 시간표 — 직책별 색상 헤더, 시간대별 환자 배정 (환자·치료사 성명은 블러 처리)" },
    ],
    demo: {
      note: "실제 병원 운영 시스템으로, 환자 정보 보호를 위해 로그인 계정은 공개하지 않습니다. 위 스크린샷은 관리자 화면을 개인정보 블러 처리 후 캡처한 것입니다.",
    },
  },

  "dpp-performance": {
    role: "성능·부하 시험 설계 및 TTA 인증 대응 전담",
    background: [
      "KISA(한국인터넷진흥원)·부산광역시 주관 블록체인(ICON) 기반 전기차 배터리 이력관리·DPP(Digital Product Passport) 인증 사업에서, TTA 공식 성능시험을 통과하기 위한 정량 성능 검증이 필요했습니다.",
    ],
    architecture: [
      "nGrinder Controller·Agent를 NCP에 구성하고 Groovy 부하 테스트 스크립트를 설계·개발",
      "동시 사용자 수·TPS·응답시간 기준 부하 시나리오를 정의하고 단계별 부하 인가로 네트워크별 한계 처리량(임계점) 도출",
      "측정 결과 — 코인 네트워크: 조회(READ) 3,000 TPS / 쓰기(WRITE) 1,000 TPS, 토큰(스마트 컨트랙트) 네트워크: 조회 1,000 TPS / 쓰기 500 TPS",
      "LFT2(PBFT 기반 BFT) 합의와 DPoC 거버넌스 구조를 이해한 위에서 Mainnet/Testnet 환경 간 성능 편차 분석",
      "TTA 담당자와 협업해 시험 기안서·공식 성능시험 결과 보고서를 작성, 인증 절차 대응",
    ],
  },

  "athometrip-commerce": {
    role: "주문·결제 도메인 설계 및 개발",
    background: [
      "워드프레스(WooCommerce)로 운영되던 여행 상품 판매의 유지보수 한계와 사업 확장 수요를 해소하기 위해, 자체 주문·결제 플랫폼을 신규 구축해 레거시를 이관했습니다.",
    ],
    architecture: [
      "Stripe 연동 주문/결제 구조 설계 — 해외 결제 중심 여행 상품 특성에 맞춘 결제 플로우",
      "RabbitMQ 기반 비동기 메시징으로 주문 후처리(알림·정산)를 분리해 결제 응답 지연 최소화",
      "상품 주문과 가이드/협력사 매칭 로직 — 가이드 배정 시스템 구조 설계·개발",
      "Spring Boot + MyBatis + MariaDB, AWS EC2 + Nginx 운영",
    ],
  },

  "gaia-backoffice": {
    role: "백오피스 전체 단독 설계·개발 (MSA 6개 서비스)",
    background: [
      "내부 CS와 외부 협력사(가이드·티켓 발권·셔틀 기사)가 WooCommerce 주문을 수기로 확인·관리하고 있어 누락과 지연이 잦았습니다. 상품별 주문 관리와 일정 리마인드를 자동화하는 어드민 시스템을 단독으로 구축했습니다.",
    ],
    architecture: [
      "주문/발권/리마인드 도메인을 분리한 NestJS MSA 6개 서비스(포트 3000~3005) 단독 설계·개발",
      "WooCommerce Webhook으로 주문 이벤트를 구독하고 WebSocket으로 CS 화면에 실시간 반영 — 주문발권/가이드·셔틀 배정 리마인드의 수기 확인 단계 제거",
      "Next.js + TanStack(React Query/Table)로 대용량 주문 데이터 조회·관리 어드민 UI 구현",
      "Auth.js 기반 인증/인가 — 협력사 역할별(가이드/발권/셔틀) 접근 제어",
    ],
  },

  "fireblocks-custody": {
    role: "백엔드 서버 아키텍처 설계·구현 + 관리 웹 개발",
    background: [
      "기관용 디지털 자산 관리에는 단일 개인키가 아닌 다중 승인 체계가 필수입니다. 사내 권한자(editor·approver·signer)가 역할에 따라 원장을 생성·서명·전송하는 커스터디 시스템을 구축했습니다.",
    ],
    architecture: [
      "Fireblocks MPC 커스터디 SDK 연동 — 지갑 생성·트랜잭션 서명·전송·자산/로그 조회 API 구현",
      "역할 기반 접근제어(RBAC)와 다중 승인(Multi-approval) 흐름을 반영한 권한 처리",
      "Express 기반 서버 아키텍처 설계, Redis 캐싱, JWT 인증",
      "React.js + Redux 기반 반응형 관리 웹, Azure Cloud + JumpBox 운영 환경",
    ],
  },

  wcms: {
    role: "온체인 데이터 수집 파이프라인 설계·구현",
    background: [
      "재단 지갑·암호화폐의 재무 현황을 외부 스캐너에 의존하면 데이터 정합성을 보장할 수 없었습니다. 온체인 원장 데이터를 사내 서버에 직접 수집·적재하는 파이프라인을 구축했습니다.",
    ],
    architecture: [
      "web3.js + 스케줄러(Spring Batch·node-schedule) 기반 온체인 데이터 수집 자동화 파이프라인",
      "일별 시작/종료 블록 넘버 수집, 재단 지갑별 보유 토큰 리스트 집계",
      "토큰 분류(FT/NFT)와 트랜잭션 원장(tx-log) 수집 — 일별 입고/출고(debit/credit) 합계를 UTC·KST 기준 동시 산출",
      "배치 실행 로그를 월별 CSV로 자동 덤프해 감사·정산 추적성 확보",
    ],
  },

  "kr-esg-nft": {
    role: "스마트 컨트랙트 구현·배포 + 백엔드 아키텍처",
    background: [
      "한국렌탈 고객사 대상 ESG 캠페인(연말 나무 심기)의 성과를 증빙 가능한 형태로 남기기 위해, 식수 좌표를 메타데이터에 담은 NFT를 발행·증여하고 ERP 대시보드로 연동했습니다.",
    ],
    architecture: [
      "KIP-17(ERC-721 호환) NFT 스마트 컨트랙트를 Solidity로 구현하고 Truffle로 Klaytn Mainnet에 배포",
      "식수 좌표 등 메타데이터를 IPFS(Infura)에 저장, caver-js로 온체인 발행·증여 트랜잭션 처리",
      "Express 기반 서버 아키텍처 설계·구현, Redis 캐싱, JWT 인증",
      "한국렌탈 ERP 연동 + NFT 발행/증여 현황 대시보드(Next.js + Recoil)",
    ],
  },

  magicdid: {
    role: "백오피스 웹 개발 (인증·차트 시각화)",
    background: [
      "HyperLedger Fabric 기반 분산신원증명(DID) 서비스 'MagicDID'의 발급·갱신·폐기 현황을 한눈에 파악할 운영 도구가 없었습니다. DID 생애주기 지표를 시각화하는 백오피스를 구축했습니다.",
    ],
    architecture: [
      "LG 모나체인 백오피스를 벤치마킹한 웹 인터페이스 설계",
      "DID 발급/갱신/폐기 지표를 ECharts로 시각화하는 차트 데이터 렌더링",
      "JWT 기반 인증(로그인), Redux-Saga 비동기 처리, On-Premise(Ubuntu) 운영",
    ],
  },
};
