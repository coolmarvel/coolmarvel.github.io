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
        period: "26.05 ~ 26.06",
        description: [
          "전자 결재, 근태/연차, 게시판, 사내 메일/메신저, 문서·증명서 발급, 직무평가 등 분산된 업무를 단일 플랫폼으로 통합한 사내 그룹웨어",
          "Laravel 12 기반 도메인 주도 설계(DDD)로 13개 업무 도메인을 모듈화",
          "AI(Claude Code) 페어 프로그래밍을 핵심 개발 방식으로 채택, AI 행동을 통제·검증하는 자동화 레이어까지 직접 설계",
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
          "DDD 기반으로 13개 업무 도메인을 모듈화하여 그룹웨어 전체 아키텍처 설계",
          "다형성(Polymorphic) 전자결재 엔진 구현 — 휴가/연장근무/문서결재 등 이종 문서를 단일 결재 흐름으로 처리, 결재선·협조·참조·단계 게이팅 및 결재 완료 후 연차 차감 등 후속 처리 자동화",
          "Mattermost·Mailcow REST API 및 IMAP/SMTP 연동으로 사내 메신저·웹메일 구축, 사용자 생성 시 메일/메신저 계정을 자동 프로비저닝하는 이벤트-리스너 구조 설계",
          "DB·Mattermost DM·이메일 다중 채널 알림 + 30초 폴링 인앱 실시간 반영 구현",
          "Filament 5 관리자 패널 구축 및 사용자 사이트를 TailAdmin 디자인 시스템으로 Blade 이식(다크모드 지원)",
          "N+1 방지 eager loading 및 복합 인덱스 설계로 핵심 조회 경로 쿼리 성능 최적화",
          "[AI] CLAUDE.md에 도메인 규칙·커밋 컨벤션·UI 컴포넌트 사용 규칙을 명문화해 AI 산출물의 일관성 확보, 영역별 전문 스킬 자동 적용 규칙으로 AI 협업 워크플로 표준화",
          "[AI] 프로젝트 전용 MCP 서버(Laravel MCP)를 구축해 DB 스키마·모델 관계·라우트 조회 도구를 AI에 제공",
          "[AI] Git hook(.env 보호·커밋 전 코드 포맷 검증), 자동 코드리뷰 커맨드(마이그레이션/보안/아키텍처), 서브에이전트 병렬 탐색을 결합한 \"Harness Engineering\" 레이어 설계",
        ],
      },
      {
        name: "AI 회의록 요약·업무(TODO) 자동 등록 연동 (LLM + MCP)",
        period: "26.05",
        description: [
          "전사된 회의록을 LLM으로 요약·분석하고, 회의 중 도출된 할 일(Action Item)을 부서별 칸반 보드에 자동으로 카드 등록하는 AI 연동 시스템",
          "그룹웨어를 MCP(Model Context Protocol) 서버로 노출하고, AI 서버가 MCP 클라이언트로 연결되어 LLM이 직접 그룹웨어 도구를 호출하도록 설계",
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
          "그룹웨어를 MCP 서버로 노출(HTTP/SSE, Bearer 인증)하고 회의록 자동화 도구 11종 구현 (부서·프로젝트·멤버·후보 조회 + 프로젝트/컬럼/멤버/보드카드 생성)",
          "LLM이 \"어떤 도구를 언제 호출할지\" 자율 판단하도록 tool description·JSON Schema를 설계, 고정 RPC 호출 대신 LLM 친화 인터페이스로 구성",
          "모든 생성 도구를 멱등(idempotent)하게 설계해 재시도·중복 호출에도 안전하도록 처리",
          "단일 봇 계정 대신 부서 책임자를 자동 해석하여 자동 등록 카드·프로젝트의 행위자를 실제 책임자에 귀속, 활동 로그 추적성 확보",
          "REST API·DB 직접 접근 등 대안을 비교 검토하고 MCP 채택 근거를 ADR로 문서화",
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
          "KISA(한국인터넷진흥원)·부산광역시 주관, 블록체인(ICON) 기반 전기차 배터리 이력관리·DPP(Digital Product Passport) 인증 사업의 성능·부하 시험 담당",
          "TTA(한국정보통신기술협회) 공식 성능시험 대응 — 블록체인 네트워크 및 DApp의 READ/WRITE 처리 성능을 정량 검증하고 인증용 성능시험 보고서 작성",
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
          "nGrinder 기반 부하 테스트 스크립트(Groovy)를 설계·개발하여 ICON 블록체인 네트워크 및 DApp의 READ/WRITE 트랜잭션 처리 성능을 정량 측정",
          "코인 네트워크 조회(READ) 3,000 TPS / 쓰기(WRITE) 1,000 TPS, 토큰(스마트 컨트랙트) 네트워크 조회 1,000 TPS / 쓰기 500 TPS 처리 성능 측정·검증",
          "동시 사용자 수·TPS·응답시간 기준 부하 시나리오를 정의하고 단계별 부하를 인가해 네트워크별 한계 처리량(임계점) 도출",
          "LFT2(PBFT 기반 BFT) 합의 구조를 이해한 위에서 Mainnet/Testnet 환경 간 성능 편차 분석",
          "TTA 담당자와 협업해 성능·환경 시험을 수행, 시험 기안서 및 공식 성능시험 결과 보고서를 작성하여 인증 절차 대응",
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
          "워드프레스로 운영되던 기존 서비스의 유지보수 한계와 사업 확장 수요를 해소하기 위한 자체 주문·결제 플랫폼 신규 개발",
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
          "Stripe 연동 주문/결제 구조를 설계·개발하여 워드프레스 레거시를 자체 서비스로 이관",
          "RabbitMQ 기반 비동기 메시징으로 주문 후처리(알림·정산 등)를 분리해 결제 응답 지연 최소화",
          "가이드 배정 시스템 구조를 설계·개발 — 상품 주문과 가이드/협력사 매칭 로직 구현",
        ],
      },
      {
        name: "GAIA 백오피스 (여행 상품 주문·운영 통합 관리 시스템)",
        period: "24.05 ~ 25.01",
        description: [
          "내부 CS 및 외부 협력사(가이드·티켓 발권·셔틀 기사)가 상품별 주문 관리와 일정 리마인드를 수행하는 어드민 시스템",
          "WooCommerce(워드프레스) 기반 운영의 한계를 보완하기 위해 자체 백오피스를 단독 설계·개발",
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
          "주문/발권/리마인드 도메인을 분리한 NestJS MSA(6개 서비스)를 단독 설계·개발하여 확장성과 유지보수성 확보",
          "WooCommerce Webhook으로 주문 발생 이벤트를 구독하고 상품 정보를 WebSocket으로 CS 화면에 실시간 반영, 주문발권/가이드·셔틀 배정 리마인드의 수기 확인 단계 제거",
          "Next.js + TanStack(React Query/Table)로 대용량 주문 데이터 조회·관리 어드민 UI 구현",
          "Auth.js 기반 인증/인가 및 협력사 역할별 접근 제어 구현",
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
          "사내 권한자(editor·approver·signer)가 역할에 따라 원장을 생성·서명·전송하고 지갑·자산 현황과 트랜잭션 로그를 조회하는 기관용 디지털 자산 관리 시스템",
          "Fireblocks MPC 커스터디 SDK를 연동해 다중 승인(Multi-approval) 기반 전송 워크플로 구현",
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
          "Express 기반 서버 아키텍처 설계·구현",
          "Fireblocks SDK 연동으로 지갑 생성·트랜잭션 서명·전송 및 자산/로그 조회 API 구현",
          "역할 기반 접근제어(RBAC)와 다중 승인 흐름을 반영한 권한 처리 구현",
          "React.js 기반 반응형 관리 웹 개발",
        ],
      },
      {
        name: "WCMS — 재단 재무·온체인 원장 데이터 관리 대시보드",
        period: "23.05 ~ 23.11",
        description: [
          "재단 지갑 및 암호화폐(코인·토큰)의 온체인 원장 데이터를 수집·관리하는 재무 대시보드",
          "외부 스캐너 데이터의 정합성 한계를 보완하기 위해 사내 서버에 원장 데이터를 직접 수집·적재하는 파이프라인 구축",
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
          "web3.js + 스케줄러(Spring Batch·node-schedule) 기반 온체인 데이터 수집 자동화 파이프라인 구현",
          "일별 시작/종료 블록 넘버 수집 및 재단 지갑별 보유 토큰 리스트 집계",
          "토큰 분류(FT/NFT) 및 트랜잭션 원장(tx-log) 수집, 일별 입고/출고 합계를 UTC·KST 기준으로 동시 산출",
          "배치 실행 로그를 월별 CSV로 자동 덤프하여 감사·정산 추적성 확보",
        ],
      },
      {
        name: "온체인 운영 — 지갑 생성·스마트 컨트랙트 배포·암호화폐 전송",
        period: "23.04 ~ 23.11",
        description: [
          "사업별 지갑 생성(SSS·Multisig·Vault·Ledger 등), 스마트 컨트랙트 배포(FT·NFT·Bridge 등), 암호화폐 전송 등 블록체인 온체인 운영 업무 수행",
        ],
        stack: ["MetaMask", "사내 전송 프로그램 (Waffle, CLI)"],
        tasks: [
          "컨트랙트 배포 및 암호화폐 전송 환경 설정·시나리오 작성",
          "작업 전 기안 및 작업자 어레인지, 작업 결과 기안 작성으로 변경관리(Change Management) 절차 준수",
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
          "한국렌탈 고객사 대상 ESG 캠페인(연말 나무 심기)의 식수 좌표를 메타데이터에 담아 NFT로 발행·증여하고, 한국렌탈 ERP에 대시보드로 연동한 서비스",
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
          "Express 기반 서버 아키텍처 설계·구현",
          "KIP-17(ERC-721 호환) NFT 스마트 컨트랙트(Solidity)를 구현하고 Truffle로 Klaytn Mainnet에 배포",
          "식수 좌표 등 메타데이터를 IPFS(Infura)에 저장하고 caver-js로 온체인 발행·증여 트랜잭션 처리",
          "한국렌탈 ERP 연동 및 NFT 발행/증여 현황 대시보드 구현",
        ],
      },
      {
        name: "MagicDID 운영 백오피스 (분산신원증명 DID 모니터링)",
        period: "22.06 ~ 22.08",
        description: [
          "HyperLedger Fabric 기반 분산신원증명(DID) 서비스 'MagicDID'의 발급·갱신·폐기 현황을 모니터링하는 운영 백오피스",
          "DID 생애주기(발급/갱신/폐기) 지표를 시각화하여 운영 가시성 확보",
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
          "웹 인터페이스 설계 및 개발 (LG 모나체인 백오피스 벤치마킹)",
          "인증(로그인) 기능 구현",
          "DID 발급/갱신/폐기 지표를 ECharts로 시각화하는 차트 데이터 렌더링 구현",
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
      "Node.js의 모든 것(Express & NestJS) 초격차 패키지 — 인증/로그인, PostgreSQL·GraphQL, 실시간 채팅, 결제, NestJS 기반 MSA 등 13개 실습 프로젝트",
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
