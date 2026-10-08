export interface ExperienceProject {
  name: string;
  period: string;
  description: string[];
  stack: string[];
  tasks: string[];
}

export interface Experience {
  company: string;
  team: string;
  role: string;
  period: string;
  duration: string;
  current?: boolean;
  domain: "medical" | "blockchain" | "commerce";
  projects: ExperienceProject[];
}

export const experiences: Experience[] = [
  {
    company: "씨엠병원",
    team: "전산과",
    role: "백엔드/서버개발",
    period: "2026.05 ~ 재직중",
    duration: "재직중",
    current: true,
    domain: "medical",
    projects: [
      {
        name: "CM병원 그룹웨어 (사내 통합 업무 시스템)",
        period: "26.05 ~",
        description: [
          "전자 결재, 근태/연차, 게시판, 사내 메일/메신저, 문서·증명서 발급, 직무평가처럼 흩어져 있던 업무를 한 플랫폼에 모은 사내 그룹웨어입니다.",
          "Laravel 12 위에 도메인 주도 설계로 13개 업무 도메인을 모듈로 나눴고, 기획부터 운영까지 혼자 맡고 있습니다.",
          "Claude Code를 정식 개발 방식으로 쓰면서 AI의 행동을 막고 검증하는 자동화 장치까지 직접 설계한 첫 프로젝트입니다.",
        ],
        stack: [
          "PHP 8.4",
          "Laravel 12 (DDD)",
          "Filament 5",
          "Livewire 4",
          "Tailwind CSS 4",
          "Alpine.js",
          "MySQL",
          "Docker Compose",
          "Nginx",
          "Cloudflare",
          "Claude Code",
          "MCP",
        ],
        tasks: [
          "DDD 기반으로 13개 업무 도메인을 모듈화해 그룹웨어 전체 아키텍처를 설계했습니다.",
          "다형성 전자결재 엔진을 만들었습니다. 휴가·연장근무·문서결재처럼 종류가 다른 문서를 결재 흐름 하나로 처리하고, 결재선·협조·참조·단계 게이팅과 결재 완료 후 연차 차감 같은 후속 처리를 자동화했습니다.",
          "Mattermost·Mailcow REST API와 IMAP/SMTP를 연동해 사내 메신저·웹메일을 붙였고, 사용자를 만들면 메일·메신저 계정이 자동으로 생기는 이벤트-리스너 구조를 설계했습니다.",
          "DB·Mattermost DM·이메일 다중 채널 알림과 30초 폴링 인앱 실시간 반영을 구현했습니다.",
          "Filament 5 관리자 패널을 만들고, 사용자 사이트는 TailAdmin 디자인 시스템을 Blade로 옮겨 다크모드까지 지원합니다.",
          "N+1을 막는 eager loading과 복합 인덱스로 핵심 조회 경로의 쿼리 성능을 정리했습니다.",
          "[AI] 도메인 규칙·커밋 컨벤션·UI 컴포넌트 사용 규칙을 CLAUDE.md에 적어 AI 산출물의 일관성을 확보하고, 영역별 스킬이 자동으로 적용되는 규칙으로 협업 방식을 표준화했습니다.",
          "[AI] 프로젝트 전용 MCP 서버(Laravel MCP)를 만들어 DB 스키마·모델 관계·라우트 조회 도구를 AI에 주었습니다.",
          "[AI] Git hook(.env 보호·커밋 전 포맷 검증), 자동 코드리뷰 커맨드(마이그레이션/보안/아키텍처), 서브에이전트 병렬 탐색을 묶은 하네스 레이어를 설계했습니다.",
        ],
      },
      {
        name: "AI 회의록 요약·업무(TODO) 자동 등록 연동 (LLM + MCP)",
        period: "26.05",
        description: [
          "전사된 회의록을 LLM이 요약·분석하고, 회의에서 나온 할 일을 부서별 칸반 보드에 자동으로 카드로 올리는 연동입니다.",
          "그룹웨어를 MCP(Model Context Protocol) 서버로 열고 AI 서버가 MCP 클라이언트로 붙어, LLM이 그룹웨어 도구를 직접 부르게 설계했습니다.",
        ],
        stack: [
          "PHP 8.4",
          "Python",
          "Claude Code CLI",
          "MCP (HTTP/SSE)",
          "laravel/mcp",
          "MySQL",
        ],
        tasks: [
          "그룹웨어를 MCP 서버로 열고(HTTP/SSE, Bearer 인증) 회의록 자동화 도구 11종을 만들었습니다. 부서·프로젝트·멤버·후보 조회와 프로젝트/컬럼/멤버/보드카드 생성입니다.",
          "고정된 RPC 대신 LLM이 어떤 도구를 언제 쓸지 스스로 판단하도록 도구 설명과 JSON Schema를 설계했습니다.",
          "생성 도구는 전부 멱등으로 만들어 재시도·중복 호출에도 안전합니다.",
          "단일 봇 계정 대신 부서 책임자를 자동으로 찾아 카드·프로젝트의 행위자로 삼아 활동 로그가 실제 사람을 가리키게 했습니다.",
          "REST API·DB 직접 접근 같은 대안과 비교해 MCP를 고른 이유를 ADR로 남겼습니다.",
        ],
      },
      {
        name: "Voice Server (AI 회의록 전사·요약 파이프라인)",
        period: "26.05 ~",
        description: [
          "부서장 회의 음성 파일을 올리면 화자분리 → STT → LLM 요약 → 그룹웨어 전송까지 자동으로 처리하는 회의록 서버입니다.",
          "GPU 한 대(12GB VRAM) 제약에서 시작해 처리 단계를 원격 API로 넘기는 얇은 오케스트레이터로 구조를 바꿨고, 그 과정을 ADR 6건으로 남겼습니다.",
        ],
        stack: [
          "Python",
          "FastAPI",
          "WhisperX",
          "pyannote.audio",
          "SQLAlchemy",
          "MySQL",
          "AES-256-GCM",
          "HMAC-SHA256",
          "Claude Code",
        ],
        tasks: [
          "queued → converting → diarizing → asr → summarizing → sending → done 상태머신을 설계하고 단계별 처리 시각을 DB에 남겨 병목을 찾습니다.",
          "로컬 pyannote/faster-whisper GPU 처리를 원격 WhisperX API로, 요약도 원격 Claude 래퍼 API로 넘겨 torch·CUDA 의존성을 떼어 냈습니다. 수 GB가 수백 MB가 됐습니다.",
          "회의록 본문을 업로드할 때 입력한 패스워드로 PBKDF2 → AES-256-GCM 암호화합니다. 패스워드를 어디에도 저장하지 않아 서버조차 본문을 풀 수 없습니다.",
          "그룹웨어와는 단방향 outbound HTTPS Push만 씁니다(NAT 뒤에서도 동작). Bearer 토큰 + HMAC-SHA256 서명, 실패 시 지수백오프 5회 재시도.",
          "개인정보 보호를 위해 음성 파일은 작업이 끝나면 바로 지우고 발화 텍스트는 로그에 남기지 않습니다(job_id까지만).",
          "asyncio.Queue 단일 워커로 직렬 처리해 공유 GPU를 보호하고, 그룹웨어와 DB·자격증명을 분리했습니다.",
          "[AI] 그룹웨어의 작업 규칙을 그대로 옮겼습니다. 훅 3종(env-guard·git-add-guard·ruff 자동 포맷)과 리뷰 커맨드 3종(파이프라인·보안·배포 전 점검).",
        ],
      },
      {
        name: "PT Schedule (물리치료실 스케줄 관리 시스템)",
        period: "26.06 ~",
        description: [
          "물리치료실의 치료사별 일일 시간표(08:00~18:00) 환자 배정을 수기에서 웹으로 옮겼습니다.",
          "관리자/치료사 이중 인증과 월간 캘린더 통계, 환자/치료사 검색을 제공하는 운영 도구입니다.",
        ],
        stack: [
          "Python",
          "FastAPI",
          "SQLModel",
          "React 18",
          "Vite",
          "TanStack Query",
          "Tailwind CSS",
          "MySQL",
          "Docker Compose",
        ],
        tasks: [
          "schedule·therapist·auth·calendar·search 5개 도메인을 기능별 라우터로 나눈 FastAPI 백엔드를 설계·개발했습니다.",
          "치료사별 시간표 그리드와 월간 캘린더 통계(치료사별 환자 수)를 React + TanStack Query로 만들고 치료사별로 색을 구분했습니다.",
          "관리자/치료사 역할별로 화면을 나눴습니다. 치료사는 개인 시간표, 관리자는 전체 운영 관리를 봅니다.",
          "그룹웨어와 같은 서버에서 Docker Compose(edge 외부 네트워크 공유)로 운영하고 그룹웨어 사이드바에서 바로 들어가게 연동했습니다.",
        ],
      },
    ],
  },
  {
    company: "㈜파라메타",
    team: "플랫폼팀",
    role: "기술지원",
    period: "2025.10 ~ 2026.01",
    duration: "4개월",
    domain: "blockchain",
    projects: [
      {
        name: "블록체인 기반 전기차 배터리 DPP 인증 시스템 성능 시험 (KISA·부산시 주관)",
        period: "25.10 ~ 26.01",
        description: [
          "KISA(한국인터넷진흥원)·부산광역시 주관, 블록체인(ICON) 기반 전기차 배터리 이력관리·DPP(Digital Product Passport) 인증 사업의 성능·부하 시험을 맡았습니다.",
          "TTA(한국정보통신기술협회) 공식 성능시험에 맞춰 블록체인 네트워크와 DApp의 READ/WRITE 처리 성능을 정량으로 검증하고 인증용 성능시험 보고서를 썼습니다.",
        ],
        stack: [
          "Java (Groovy)",
          "nGrinder",
          "ICON SDK",
          "ICON Mainnet/Testnet",
          "MySQL",
          "NCP",
        ],
        tasks: [
          "nGrinder 기반 부하 테스트 스크립트(Groovy)를 설계·개발해 ICON 블록체인 네트워크와 DApp의 READ/WRITE 트랜잭션 처리 성능을 정량 측정했습니다.",
          "코인 네트워크 조회(READ) 3,000 TPS / 쓰기(WRITE) 1,000 TPS, 토큰(스마트 컨트랙트) 네트워크 조회 1,000 TPS / 쓰기 500 TPS를 측정·검증했습니다.",
          "동시 사용자 수·TPS·응답시간 기준으로 부하 시나리오를 정의하고 단계별로 부하를 올려 네트워크별 한계 처리량을 찾았습니다.",
          "LFT2(PBFT 기반 BFT) 합의 구조를 이해한 위에서 Mainnet/Testnet 환경 간 성능 편차를 분석했습니다.",
          "TTA 담당자와 협업해 성능·환경 시험을 수행하고, 시험 기안서와 공식 성능시험 결과 보고서를 써서 인증 절차에 대응했습니다.",
        ],
      },
    ],
  },
  {
    company: "㈜앳홈트립",
    team: "Product팀",
    role: "웹개발",
    period: "2024.02 ~ 2025.09",
    duration: "1년 8개월",
    domain: "commerce",
    projects: [
      {
        name: "신규 앳홈트립 주문·결제 서비스 구축",
        period: "25.02 ~ 25.08",
        description: [
          "워드프레스로 운영하던 기존 서비스의 유지보수 한계와 사업 확장 수요를 풀기 위해 자체 주문·결제 플랫폼을 새로 만들었습니다.",
        ],
        stack: [
          "Java",
          "Spring Boot",
          "MyBatis",
          "RabbitMQ",
          "Stripe",
          "Thymeleaf",
          "React.js",
          "MariaDB",
          "AWS EC2",
          "Nginx",
        ],
        tasks: [
          "Stripe 연동 주문/결제 구조를 설계·개발해 워드프레스 레거시를 자체 서비스로 옮겼습니다.",
          "RabbitMQ 기반 비동기 메시징으로 주문 후처리(알림·정산 등)를 분리해 결제 응답 지연을 줄였습니다.",
          "가이드 배정 시스템 구조를 설계·개발했습니다. 상품 주문과 가이드/협력사 매칭 로직입니다.",
        ],
      },
      {
        name: "GAIA 백오피스 (여행 상품 주문·운영 통합 관리 시스템)",
        period: "24.05 ~ 25.01",
        description: [
          "내부 CS와 외부 협력사(가이드·티켓 발권·셔틀 기사)가 상품별 주문 관리와 일정 리마인드를 하는 어드민 시스템입니다.",
          "WooCommerce(워드프레스) 기반 운영의 한계를 메우기 위해 자체 백오피스를 혼자 설계·개발했습니다.",
        ],
        stack: [
          "TypeScript",
          "NestJS (MSA)",
          "Next.js",
          "TanStack Query/Table",
          "Auth.js",
          "WebSocket",
          "WooCommerce API",
          "MariaDB",
          "AWS EC2",
        ],
        tasks: [
          "주문/발권/리마인드 도메인을 나눈 NestJS MSA(6개 서비스)를 혼자 설계·개발해 확장성과 유지보수성을 확보했습니다.",
          "WooCommerce Webhook으로 주문 발생 이벤트를 받고 상품 정보를 WebSocket으로 CS 화면에 실시간 반영해, 주문발권/가이드·셔틀 배정 리마인드의 수기 확인 단계를 없앴습니다.",
          "Next.js + TanStack(React Query/Table)로 대용량 주문 데이터 조회·관리 어드민 UI를 만들었습니다.",
          "Auth.js 기반 인증/인가와 협력사 역할별 접근 제어를 구현했습니다.",
        ],
      },
    ],
  },
  {
    company: "㈜위메이드",
    team: "기술그룹 전자서명팀",
    role: "백엔드/서버개발",
    period: "2023.04 ~ 2023.11",
    duration: "8개월",
    domain: "blockchain",
    projects: [
      {
        name: "디지털 자산 커스터디 서명·전송 시스템 (Fireblocks 연동)",
        period: "23.06 ~ 23.09",
        description: [
          "사내 권한자(editor·approver·signer)가 역할에 따라 원장을 만들고 서명하고 전송하며, 지갑·자산 현황과 트랜잭션 로그를 조회하는 기관용 디지털 자산 관리 시스템입니다.",
          "Fireblocks MPC 커스터디 SDK를 연동해 다중 승인(Multi-approval) 기반 전송 워크플로를 구현했습니다.",
        ],
        stack: [
          "JavaScript",
          "Node.js (Express)",
          "React.js",
          "Redux",
          "Fireblocks SDK",
          "JWT",
          "Redis",
          "MySQL",
          "Azure SQL",
          "AWS · Azure",
        ],
        tasks: [
          "Express 기반 서버 아키텍처를 설계·구현했습니다.",
          "Fireblocks SDK를 연동해 지갑 생성·트랜잭션 서명·전송과 자산/로그 조회 API를 만들었습니다.",
          "역할 기반 접근제어(RBAC)와 다중 승인 흐름을 반영한 권한 처리를 구현했습니다.",
          "React.js 기반 반응형 관리 웹을 개발했습니다.",
        ],
      },
      {
        name: "WCMS — 재단 재무·온체인 원장 데이터 관리 대시보드",
        period: "23.05 ~ 23.11",
        description: [
          "재단 지갑과 암호화폐(코인·토큰)의 온체인 원장 데이터를 수집·관리하는 재무 대시보드입니다.",
          "외부 스캐너 데이터의 정합성 한계를 메우기 위해 사내 서버에 원장 데이터를 직접 수집·적재하는 파이프라인을 만들었습니다.",
        ],
        stack: [
          "Java",
          "TypeScript",
          "Spring Boot (Batch)",
          "Node.js",
          "web3.js",
          "JSP",
          "MySQL",
          "Azure SQL",
        ],
        tasks: [
          "web3.js + 스케줄러(Spring Batch·node-schedule) 기반 온체인 데이터 수집 자동화 파이프라인을 구현했습니다.",
          "일별 시작/종료 블록 넘버를 수집하고 재단 지갑별 보유 토큰 리스트를 집계했습니다.",
          "토큰 분류(FT/NFT)와 트랜잭션 원장(tx-log)을 수집하고, 일별 입고/출고 합계를 UTC·KST 기준으로 동시에 산출했습니다.",
          "배치 실행 로그를 월별 CSV로 자동 덤프해 감사·정산 추적이 가능하게 했습니다.",
        ],
      },
      {
        name: "온체인 운영 — 지갑 생성·스마트 컨트랙트 배포·암호화폐 전송",
        period: "23.04 ~ 23.11",
        description: [
          "사업별 지갑 생성(SSS·Multisig·Vault·Ledger 등), 스마트 컨트랙트 배포(FT·NFT·Bridge 등), 암호화폐 전송 같은 블록체인 온체인 운영 업무를 맡았습니다.",
        ],
        stack: ["MetaMask", "사내 전송 프로그램 (Waffle, CLI)"],
        tasks: [
          "컨트랙트 배포와 암호화폐 전송 환경을 설정하고 시나리오를 썼습니다.",
          "작업 전 기안과 작업자 어레인지, 작업 결과 기안 작성으로 변경관리(Change Management) 절차를 지켰습니다.",
        ],
      },
    ],
  },
  {
    company: "㈜드림시큐리티",
    team: "블록체인기술연구센터 전자지갑팀",
    role: "백엔드/서버개발",
    period: "2022.05 ~ 2023.04",
    duration: "1년",
    domain: "blockchain",
    projects: [
      {
        name: "한국렌탈 ESG NFT 발행·증여 대시보드 (Klaytn 기반)",
        period: "22.09 ~ 23.01",
        description: [
          "한국렌탈 고객사 대상 ESG 캠페인(연말 나무 심기)의 식수 좌표를 메타데이터에 담아 NFT로 발행·증여하고, 한국렌탈 ERP에 대시보드로 연동한 서비스입니다.",
        ],
        stack: [
          "Solidity",
          "JavaScript",
          "Node.js (Express)",
          "Next.js",
          "Recoil",
          "Klaytn · caver-js",
          "Truffle",
          "IPFS (Infura)",
          "Redis",
          "MySQL/MariaDB",
          "AWS EC2",
        ],
        tasks: [
          "Express 기반 서버 아키텍처를 설계·구현했습니다.",
          "KIP-17(ERC-721 호환) NFT 스마트 컨트랙트(Solidity)를 만들고 Truffle로 Klaytn Mainnet에 배포했습니다.",
          "식수 좌표 등 메타데이터를 IPFS(Infura)에 저장하고 caver-js로 온체인 발행·증여 트랜잭션을 처리했습니다.",
          "한국렌탈 ERP 연동과 NFT 발행/증여 현황 대시보드를 구현했습니다.",
        ],
      },
      {
        name: "MagicDID 운영 백오피스 (분산신원증명 DID 모니터링)",
        period: "22.06 ~ 22.08",
        description: [
          "HyperLedger Fabric 기반 분산신원증명(DID) 서비스 'MagicDID'의 발급·갱신·폐기 현황을 모니터링하는 운영 백오피스입니다.",
          "DID 생애주기(발급/갱신/폐기) 지표를 시각화해 운영 상태를 볼 수 있게 했습니다.",
        ],
        stack: [
          "JavaScript",
          "React.js",
          "Redux · Redux-Saga",
          "ECharts",
          "MUI",
          "JWT",
          "AWS EC2",
          "On-Premise",
        ],
        tasks: [
          "웹 인터페이스를 설계·개발했습니다(LG 모나체인 백오피스 참고).",
          "인증(로그인) 기능을 구현했습니다.",
          "DID 발급/갱신/폐기 지표를 ECharts로 시각화하는 차트 데이터 렌더링을 구현했습니다.",
        ],
      },
    ],
  },
];

export const education = [
  {
    period: "2016.03 ~ 2022.02",
    name: "삼육대학교 (4년제)",
    detail: "컴퓨터-메카트로닉스 · 학점 3.8/4.5",
    type: "학력",
  },
  {
    period: "2023.12 ~ 2024.01",
    name: "패스트캠퍼스",
    detail:
      "Node.js의 모든 것(Express & NestJS) 초격차 패키지. 인증/로그인, PostgreSQL·GraphQL, 실시간 채팅, 결제, NestJS 기반 MSA 등 13개 실습 프로젝트",
    type: "교육",
  },
  {
    period: "2021.08 ~ 2022.05",
    name: "경일 게임아카데미",
    detail: "블록체인 기반 핀테크 및 응용 SW 개발자 양성과정 수료",
    type: "교육",
  },
];

export const certificates = [
  { year: "2020.12", name: "컴퓨터활용능력 2급", org: "대한상공회의소" },
  { year: "2016.10", name: "1종보통운전면허", org: "경찰청" },
  {
    year: "2013.07",
    name: "대한민국학생창의력챔피언 동상",
    org: "한국발명진흥회",
  },
];
