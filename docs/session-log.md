# 세션 로그 — 진행 이력 SSOT

> 최신 세션이 맨 위. 각 블록은 "무엇을 했나 / 어떤 결정을 했나 / 다음에 뭘 하면 되나"를 담는다.

## 2026-09-07 — remote-assist 프로젝트 추가 (Windows interop 으로 실제 앱 캡처) + private 저장소 링크 규칙

**발단**: 사용자 요청 — 새 개인 프로젝트 `~/remote-assist`(C#/.NET 8 원격 지원, private 저장소)를 포트폴리오에 반영하고
스크린샷은 직접 실행해 캡처할 것. 함께 "private 저장소에는 GitHub 버튼을 달지 말 것"(공개 계획 없음). 시작 전 `git pull` 두 레포 모두 최신.

**한 일**
- **콘텐츠** — 서브에이전트가 `~/remote-assist` 의 CLAUDE.md·brief·changelog·ADR 6건·guides 7건을 읽어 팩트 시트(수치: 코드 17,695줄,
  테스트 217, 4일간 v0.1.0→0.1.15, ADR 6)를 만들고, 그 사실만으로 `projects.ts` 맨 앞 카드(featured, 도메인 데스크톱) +
  `projectDetails.ts` 상세(배경 3·아키텍처 8·sections 4[보안/성능/UI/플랫폼 정책]·usage 6·AI 활용 6·스크린샷 8·demo note).
  **links 없음** — private 저장소·내부 도구라 GitHub·다운로드 모두 생략. 서버 도메인·IP·병원명 미기재.
- **스크린샷 8장 — WSL 에서 Windows 앱을 직접 띄워 캡처** (절차, 재사용 가능):
  1. `release/{agent,console}`(0.1.15 publish) 을 `/mnt/c/Users/user/AppData/Local/Temp/ra-shots/` 로 rsync(pdb 제외, 316MB).
  2. 중계 서버는 WSL 에서 `ASPNETCORE_URLS=http://0.0.0.0:5000 dotnet run --project src/RemoteAssist.Server` — Windows 에서 `localhost:5000` 으로 닿음.
     양쪽 exe 옆 `settings.json` 에 `serverUrl: http://localhost:5000`, Console `h264:false`(이 PC 의 MF 디코더 실패 문구를 피하려고), `directConnect:false`.
  3. `ra.ps1`(PowerShell 5.1, UTF-8 BOM) 을 `powershell.exe -File` 로 실행 — `Start-Process` 로 exe 기동, **UI Automation**(`AutomationId` = WPF `x:Name`)
     으로 CodeText 읽기 → NameBox/CodeBox `ValuePattern` → ConnectButton/AcceptButton `InvokePattern` → 모니터 탭은 ToggleButton 이라
     `TogglePattern` 은 Click 핸들러를 안 태워서 **실제 마우스 클릭(SetCursorPos + mouse_event)** 로 전환. 캡처는 `DwmGetWindowAttribute(9)`
     경계로 `CopyFromScreen`(창을 foreground 로 올린 뒤). `SetProcessDPIAware` 필수.
  4. 공유 화면에 사용자 데스크톱(업무 앱 아이콘)·터미널(Claude 세션)이 찍혀서 1·2차는 폐기 → 3차는 모니터 2 에 **Edge kiosk**(임시 프로필,
     `--kiosk --edge-kiosk-type=fullscreen`)로 `out/` 을 서빙한 이 사이트를 띄우고 Agent 창을 그 위에 복원해 캡처.
  5. Agent 4상태(코드·수락 요청·제어 중·종료)는 창이 426px 라 회색 캔버스에 2×2 로 배치 후 **NEAREST 2배**(클래식 12px UI 가 흐려지지 않게).
     Console 3장(접속·대기·뷰어)과 사용자 쪽 전체 화면(빨간 테두리+배너)은 원본 크기 JPEG.
  - 부작용 기록: AhnLab Safe Transaction 이 임시 폴더의 `RemoteAssist.Agent.exe` 인터넷 연결 탐지 창을 띄움(사용자 PC 보안 SW — 내가 누르지 않음,
    중계 경로는 그대로 동작). 임시 폴더 `ra-shots/` 는 사용자가 지워도 됨. 실행 중 프로세스는 모두 종료 확인(0개).
  - remote-assist 쪽 관찰(코드 미수정): 지원자가 끊으면 Console 접속 화면에 사유가 영어 `session ended` 로 뜸(Agent 쪽은 한국어) — 그쪽 todo 후보.
- **AI 워크플로우** — 매트릭스 10번째 열 remote-assist(스택·hooks·커맨드·MCP·스킬·디자인 계약·ADR 6·테스트 217), "9개 → 10개 프로젝트",
  ADR "29건(8개) → 35건(9개)". `techStack.ts` 에 WPF(아이콘 없음) 추가.
- **규칙** — CLAUDE.md 에 private 저장소 링크 금지 + Windows interop 캡처 절차 요약. todo 의 "pdf-editor-live public 전환 시 링크" 항목 삭제.
- 홈 대표 프로젝트: `featured` 가 5개가 되어 앞 4개(remote-assist·pdf-editor-live·cm-groupware·meeting-todo-mcp)만 노출 — gaia-backoffice 가 밀림(todo P4).
- 검증: `npm run build` 통과, Playwright 로 /projects/remote-assist 라이트/다크/390px + 홈·프로젝트 목록·AI 매트릭스 캡처, body 가로 넘침 0.

- **후속(같은 날)** — 사용자가 "저장소 링크를 걸까, 어차피 404" 라고 물어 **비클릭 라벨**로 절충: `ProjectDetail.privateRepo`
  + `PrivateRepoLabel`(카드 하단 링크 행·상세 헤더, GithubIcon + "GitHub 저장소 (비공개)", muted, 화살표 없음). pdf-editor-live·remote-assist 에 적용.
  `.claude/settings.json` 의 Remote Control 3키도 사용자 확인 후 커밋. 푸시·Pages 배포·라이브 200 확인까지 Claude 가 수행(사용자 위임).

**다음에**
- 맥 dmg 0.1.15 재빌드·M3 로그인이 들어오면 상세 갱신(todo P4).

## 2026-08-28 (2차) — 컨테이너 폭 1040 → 1360, 그리드 열 확장 (여백 피드백)

**발단**: 배포 후 사용자 스크린샷 피드백(→ `docs/feedback-archive/2026-08-28-wider-container/`) — 1920 모니터에서 양쪽 여백이 과함.
헤더·본문·푸터 모두 같은 컨테이너를 쓰므로 한 곳만 바꾸면 전 페이지에 적용된다.

**한 일**
- `container-page` 최대폭 1040 → **1360px**, 데스크톱 좌우 패딩 24 → 32. 메인 상하 패딩·홈 섹션 간격도 한 단계 축소.
- 프로젝트 목록 2열 → **md 2열 / xl 3열**, 홈 대표 프로젝트 **xl 4열**, 히어로 본문 폭 640 → 760.
- DESIGN.md §5 Layout 토큰·문장 갱신(근거: 사용자 피드백).
- 검증: 빌드 통과, 1920×1000 뷰포트에서 홈·프로젝트·상세 캡처 확인.

## 2026-08-28 — Toss 레퍼런스 UI 전면 재설계(oh-my-design) + PDF Editor Live 추가 + 프로젝트 순서·링크 정리

**발단**: 사용자 요청 — project-seed 의 oh-my-design 으로 "Toss처럼" UI/UX 를 바꾸고(콘텐츠 유지), 새 이력서 반영,
pdf-editor-live 를 상세히(개발 방식·OAuth·SEO·Lightsail 프록시·사용법) 추가, 프로젝트 탭을 전체 → 개인 프로젝트 순으로,
목록도 개인 프로젝트 우선, 카드에 접속 링크, 모바일 반응형, 스크린샷 직접 캡처. sh-econsent 는 추가하지 않기로(사용자 지시).

**한 일**
- **oh-my-design 설치·디자인 계약** — `npx oh-my-design-cli install-skills --agent claude-code --all`(스킬 22·에이전트 19·훅 4,
  `.claude/data/` 는 gitignore). `omd-init` 의 `query-references.mjs --brand toss` 로 toss 1위(104, verified_v2) 확인 →
  `DESIGN.md`(inspired, 15절 + 토큰 프런트매터) 직접 작성, `.omd/init-context.json`·`sync.lock.json`, shim 3종
  (CLAUDE.md·AGENTS.md·.cursor/rules/omd-design.mdc) 설치. 결정과 대안은 **ADR-0002**.
- **토큰·레이아웃 전면 교체** — `globals.css` 를 Toss 팔레트(primary #3182f6, weak, surface #f2f4f6, fg #191f28 …)로
  재작성. CSS 변수 한 벌을 `.dark` 에서 바꾸고 `@theme inline` 으로 매핑해 컴포넌트에 `dark:` 접두가 거의 없다.
  Pretendard Variable(jsDelivr) 채택(Toss Product Sans 재배포 불가). 사이드바 대시보드 → **상단 내비 + 1040px 문서형 + 푸터**,
  모바일 시트 메뉴, 페인트 전 테마 스크립트(플래시 제거). 삭제: AppSidebar·AppHeader·Backdrop·SidebarContext·Badge·ProfileCard.
  신설: `ui/{Button,Chip,Card,SectionTitle}`, `layout/{SiteHeader,SiteFooter}`, `sections/Hero`, `lib/{site,domain}`.
- **페이지 재작성 5종** — 홈(히어로 한 문장 + 지표 4 + 대표 프로젝트 + 소개/경력 + 스택 + 학력), 경력, 프로젝트(필터 탭 가로
  스크롤, 선택=inverse), 상세(usage 단계·sections 카드·이전/다음 내비), AI 워크플로우(6축, 매트릭스 9열 sticky 첫 열).
- **PDF Editor Live 추가** — `projects.ts` 맨 앞(featured, 도메인 "웹 서비스" 신설) + `projectDetails.ts` 상세: 배경 3문단,
  아키텍처 6항목, **sections 5개**(인증·OAuth / 구독·결제 / SEO / 인프라·배포 Lightsail+Caddy / 에디터 기능), usage 5단계,
  AI 활용 5항목, 스크린샷 20장, demo(라이브 URL, 계정 미노출), links 2. 근거는 서브에이전트가 `~/pdf-editor-live` 를 조사한
  사실(ADR-0001·guides·Caddyfile·deploy.yml). **저장소는 private 이라 GitHub 링크 없음**, 서버 IP·키 경로·관리자 메일 등은 제외.
  `ProjectDetail` 타입에 `sections`·`usage` 추가.
- **스크린샷 20장** — 서브에이전트가 Playwright(pdf-editor-live 의 playwright 1.62 + headless_shell-1237)로 사용자 계정 로그인
  후 캡처(랜딩·로그인·가입·요금제·마이페이지·에디터 도구 11장면·관리자 집계·모바일 2). 샘플 PDF 는 pdf-lib 로 만든 가상
  견적서. `me.jpg` 는 작업 내역에 실문서명이 보여 **상단 800px 로 크롭**. 로그인 rate limit(10회/15분)에 한 번 걸려 4장 재캡처.
- **프로젝트 순서·링크** — 배열 순서를 개인 프로젝트(pdf-editor-live → pdf-editor → file-converter → dicom-studio →
  sh-dicom-studio → sh-ip-scanner) → 씨엠병원 → 파라메타 → 앳홈트립 → 위메이드 → 드림시큐리티로 재배열(탭 순서는 데이터
  순서를 따름). 카드 하단에 라이브/GitHub/다운로드 링크 행(카드 링크와 중첩 앵커 없이 분리). featured = pdf-editor-live·
  cm-groupware·meeting-todo-mcp·gaia-backoffice.
- **콘텐츠 갱신** — pdf-editor 카드 v1.7.0(검색·페이지 관리 모달·서체 승계·툴바 스플릿, 웹과 코어 공유, Electron 43) + 웹 버전
  링크. `profile` 에 headline/subheadline, 지표 "프로젝트" 는 `projects.length` 자동. 경력 그룹웨어 기간 "26.05 ~". techStack
  +Fastify·Drizzle·Vite·Caddy·OAuth 2.0·oh-my-design(53종, simple-icons 4종 추가). aiWorkflow: 9개 프로젝트·ADR 29건,
  **Design 축 신설**, 매트릭스 pdf-editor-live 열 + "디자인 계약" 행. sh-web-editor·jazz-community 는 얇아 보류.
- **SEO** — metadataBase·title 템플릿·OG/twitter(`public/og.png` 1200×630 Playwright 렌더)·JSON-LD Person·`app/sitemap.ts`·`app/robots.ts`
  (todo P2·P3 항목 완료).
- 검증: `npm run build` 통과(28 페이지), 로컬 서빙 후 Playwright 로 5개 라우트 × 라이트/다크 × 1440/390 캡처 확인, body 가로 넘침
  0(상세 페이지의 긴 토큰은 전역 `overflow-wrap: anywhere` 로 해결, 매트릭스 첫 열은 nowrap). 스크린샷 스크립트는 scratchpad
  `shoot.mjs`(playwright 절대 경로 import + executablePath).

**다음에**
- 사용자 검토 후 푸시. OG 미리보기는 배포 후 카카오톡/슬랙에서 확인.
- 대화형 세션에서 `omd:init` 을 다시 돌려 Core v2 컴파일(승인 영수증)로 승격할지 결정(ADR-0002 대안 C).
- pdf-editor-live 저장소가 public 이 되면 상세 links 에 GitHub 추가.

## 2026-08-25 — 이력서 PDF 교체 + 총 경력 자동 계산 + 원본 PDF gitignore 정리

**한 일**
- **이력서 교체** — 레포 루트의 새 원본 `백엔드 중심 풀스택 개발자 이성현.pdf`(사람인 양식, "총 4년")를
  `public/resume.pdf`로 복사. 다운로드 파일명도 원본과 동일하게 저장되도록 `profile.resumeFileName`
  신설 → `ProfileCard`·`AppSidebar`의 `download` 속성이 이를 사용 (기존 `이성현_이력서.pdf` 폐기).
- **총 경력 자동 계산** — `src/lib/career.ts`(`CAREER_START = 2022.05`, `formatCareer()`) +
  `src/components/common/CareerDuration.tsx`(클라이언트 컴포넌트). 빌드 시점 값으로 렌더링한 뒤
  `useEffect`에서 브라우저 현재 날짜로 재계산 → **정적 배포 후 재빌드 없이도 매달 자동 갱신**.
  계산식은 시작월~현재월 차이(2022.05→2026.08 = 51개월 = "4년 3개월"; 회사 사이 공백 포함 연속 계산).
  사용처 3곳: 대시보드 지표 카드(`profile.highlights` value `"auto"` 센티널), 대시보드 타임라인 카드 desc,
  `/experience` 헤더. `Card.desc` 타입을 `ReactNode`로 확장.
- **프로필 최신화** — `title` "백엔드 중심 풀스택 개발자", `summary` 3문단을 새 이력서 간략 소개로 교체.
- **gitignore** — 옛 원본 `풀스택 개발자 메디컬 · 커머스 · 블록체인.pdf` 항목 제거(파일은 사용자가 이미 삭제),
  새 원본 3종(`백엔드 중심…pdf`·`이성현_경력기술서.pdf`·`이성현_포트폴리오_링크.pdf`) 추가.
  경력기술서·포트폴리오 링크 PDF는 사이트에 올리지 않음(사이트 자체가 경력기술서 역할).
- 검증: `npm run build` 통과, `out/index.html`에 "4년 3개월"·새 다운로드 파일명 반영, `out/resume.pdf` 원본과 일치.

**다음에**
- 이력서 "총 4년"은 사람인 방식(공백 제외 합산)이라 사이트의 연속 계산(4년 3개월)과 다르다. 합산 방식을
  원하면 `career.ts`를 `experiences`의 기간 합산으로 바꾸면 된다.

## 2026-08-15 — dicom-studio 저장소 public 전환 + 릴리스 이관 (포트폴리오 태그 정리)

**발단**: 이 레포에 `dicom-studio-v1.4.0` 태그가 왜 있는지 문의. 조사 결과 브랜치가 아니라
**태그**이고, dicom-studio 저장소가 프라이빗이라 인스톨러(114MB)를 이 공개 레포 릴리스에
얹어 두느라 만든 것이었다 (2026-07-24 항목). 링크는 `projectDetails.ts` 에서 실사용 중이라
그냥 지우면 다운로드가 깨지는 상태 → **저장소를 public 으로 바꿔 정리**하기로 결정.

**한 일**
- **dicom-studio 레포 공개 전 민감정보 스캔** — 히스토리 전체(5커밋·113파일) 검사.
  - **발견 1건**: `docs/session-log.md` 에 고객사(병원) 내부 Oracle PACS 주소
    `PACSPLUS(192.168.1.31:1521/ORCL)·RDEV1` — 제3자 인프라라 가장 민감. 5커밋 중 4개에 존재.
  - 함께 처리: `SendDialog.tsx` placeholder 의 `192.168.0.28` → `192.168.0.100` (실주소 가능성).
  - **깨끗했던 것**: `.env`·키·인증서 미커밋, 하드코딩 시크릿 0건, 주민번호·환자 실명·실제
    검사데이터 0건(커밋된 바이너리는 아이콘 4개+서명 이미지뿐), `manual.pdf`(타사 저작권)와
    feedback-archive 스크린샷은 처음부터 gitignore, TailAdmin 유료 템플릿 소스 미유입,
    병원명·기관 표기 없음(프로젝트 CLAUDE.md 에 "특정 기관 표기 금지" 규칙이 처음부터 있었음).
  - `todo.md` 의 "로컬 DB 평문 저장" 항목은 **그대로 뒀다** — 오프라인 데스크톱 앱의 정직한
    백로그이고, 알려진 한계를 숨기려 백로그를 손대는 게 더 나쁜 관행이라 판단.
- **⚠️ 핵심 발견 — force push 만으로는 GitHub 에서 안 지워진다**. `git filter-repo --replace-text`
  로 마스킹 후 force push 했고 새로 clone 하면 깨끗했지만, **밀려난 옛 커밋이 살아 있었다**:
  `gh api "repos/coolmarvel/dicom-studio/contents/docs/session-log.md?ref=<옛SHA>"` 로
  병원망 IP 가 그대로 읽혔다. 이 상태로 public 전환했으면 재작성이 무의미해질 뻔.
  - → **레포 삭제 후 퍼블릭으로 재생성**. 이슈·PR·릴리스·스타·포크 전부 0건이라 잃을 게 없었음.
    재생성 후 옛 SHA 조회가 `No commit found` (422) 로 바뀐 것까지 확인.
  - 안전장치: 재작성 전/후 히스토리를 `~/dicom-studio-clean-backup/*.bundle` 로 이중 백업.
- **릴리스 이관** — 인스톨러를 먼저 내려받아 크기(114,036,253 bytes) 검증 후,
  `coolmarvel/dicom-studio` v1.4.0 으로 재업로드. 새 URL 200/206 확인.
- **포트폴리오 반영** — `projectDetails.ts` 다운로드 링크를 새 레포로 교체 + "GitHub 저장소"
  링크 추가(다른 프로젝트와 동일한 순서·라벨), `demo.note` 의 "저장소는 비공개입니다" 제거하고
  범용 앱 성격 문구로 교체. 이 레포의 `dicom-studio-v1.4.0` 태그·릴리스 삭제.
- 검증: `npm run build` 통과(25페이지), 생성 HTML 에 새 링크 반영·옛 링크 0건·"비공개" 문구 0건.

**다음에**
- 이 레포 자신의 히스토리에도 사내 내부 IP 가 남아 있다(todo P4). 이번에 확인한 대로
  force push 로는 안 지워지는데, 이 레포는 Pages·Actions·도메인이 딸려 있어 삭제·재생성
  비용이 크다 → **GitHub 지원팀 GC 요청**이 현실적.

## 2026-08-06 (1차) — sh-dicom-studio 프로젝트 추가 (카드 + 상세 + 스크린샷 8장 + 릴리스 2종)

**한 일**
- **sh DICOM Studio(v1.0.1) 프로젝트 추가** — `projects.ts` 카드(의료/개인 프로젝트,
  sh-ip-scanner 다음 위치) + `projectDetails.ts` 상세(배경·아키텍처·AI 활용·스크린샷 8장·링크 3종).
  - 서사의 중심은 **C# 학습 마이그레이션** — sh-ip-scanner(문법) 다음 단계로, 직접 만든
    dicom-studio(Electron)를 C#/Avalonia + **ASP.NET Core 8 + Oracle 23ai(도커)** 로 재구현하며
    웹 API·상용 DB·컨테이너 배포까지 관통. 1~4차 마일스톤(오프라인 → 서버 → PACS → Worklist) 완주.
  - 저장소가 public 이라 GitHub 링크 포함. **릴리스는 sh-dicom-studio 레포 v1.0.1** —
    인스톨러(36.5MB) + **학습교재 PDF**(바탕화면의 "C#과 ASP.NET 학습교재 - sh DICOM Studio.pdf",
    12강, WeasyPrint 제작)를 `csharp-aspnet-study-guide.pdf` 로 업로드. 두 URL 모두 200 + 매직바이트 확인.
- **스크린샷 8장 캡처** — Avalonia 앱이라 sh-dicom-studio 의 `tools/ShotTool`(헤드리스 렌더러)을
  `SHDS_SHOT_IMAGES` 환경변수(실이미지 주입)로 확장해 사용(sh-dicom-studio 쪽 변경, 커밋·푸시 완료).
  장면: 로그인 / 서버 설정 / 초기 화면 / 뷰어(오버레이+회전) / Worklist 예약 접수 / 검사 검색 / 검사 보내기 / JPG 오버레이 산출물.
  - **Worklist 는 라이브 시연** — 사용자가 띄워 둔 도커 서버(Oracle+API+Orthanc)에 admin 로그인,
    가상 예약 3건(김예약·김영희·홍길동)을 등록해 실제 조회 화면을 캡처.
  - **개인정보 마스킹**: 뷰어에 쓴 동맥경화도 검사지 2장(바탕화면 `동맥경화도검사결과/`)은
    **타인의 실제 결과지**(ID 78965·KSH)라 sharp 로 ID·이름을 가상 값(**20260001·KYH**)으로
    마스킹한 사본만 사용. 폼·오버레이 환자정보도 가상 값(김영희 F/57)으로 정렬하고 상세
    demo.note 에 "전부 가상 값" 명시. 마스킹·변환 스크립트는 scratchpad(mask.mjs·to-jpg.mjs, 일회성).
  - 모달 3장(380~560px)은 sh-ip-scanner 방식대로 1.6배 확대 후 앱 배경색 캔버스(1000px)에 얹음.
- **대시보드 기술 스택 갱신** — `techStack.ts` 에 **ASP.NET Core**(dotnet 아이콘 재사용)·
  **Oracle**(simple-icons@9 에서 추출, #F80000) 추가 → 46종. `skills.ts` Backend 게이지를
  "C# · .NET 8 · ASP.NET Core · Avalonia" 70 으로 갱신(65→70, ASP.NET Core·Oracle 경험 반영).
- **/ai-workflow 갱신** — intro 7→**8개 프로젝트**, ADR 25→**28건(7개 프로젝트)**,
  매트릭스에 sh-dicom-studio 열 추가(C#·ASP.NET Core·Oracle / hooks 3종 / 커맨드 2종 /
  context7+playwright / ADR 3건 / Avalonia 헤드리스 렌더 + 라이브 서버 E2E).
- 검증: `npm run build` 통과(상세 16개 생성), 로컬 서빙 스모크(/, /projects/, 상세, /ai-workflow/,
  이미지 8장, 릴리스 PDF 전부 200), playwright-core 로 상세 라이트/다크/모바일 + 대시보드 렌더 확인.

**다음에**
- sh-dicom-studio 새 버전 릴리스 시 상세 페이지 다운로드 링크(v1.0.1) 갱신 (todo P4).

## 2026-08-05 (3차) — 대시보드 카드 순서 교체 + 기술 스택 배지 스타일 통일

**한 일** (스크린샷 피드백 → `docs/feedback-archive/2026-08-05-dashboard-stack-swap/`)
- **간략 소개(+경력 타임라인) 그리드와 기술 스택 카드의 순서 교체** — 이제 MetricCards 아래에
  간략 소개가 먼저 오고 기술 스택이 그 다음.
- **기술 스택 배지 스타일 통일** — 언어 그룹만 강조하던 `emphasis` 분기를 제거하고, **모든 그룹을
  언어와 같은 밝은 스타일**(흰 배경 + 테두리 + shadow + semibold + size-4 아이콘)로 렌더.
  그룹 제목 폰트도 semibold 로 통일. `techStack.ts` 의 `emphasis` 필드 삭제 (2차의 "언어 강조"
  결정을 사용자 피드백으로 뒤집음).
- 검증: 빌드 통과, 로컬 서빙 후 라이트/다크/모바일 스크린샷 확인.
  - playwright 스크린샷 시 pdf-editor 의 playwright-core 가 기대하는 chromium 빌드(1228)가 없어
    `~/.cache/ms-playwright/chromium_headless_shell-1232` 바이너리를 `executablePath` 로 직접 지정.

## 2026-08-05 (2차) — 대시보드 기술 스택 섹션 신설 + 경력/AI 워크플로우 갱신

**한 일**
- **기술 스택을 "간략 소개" 안의 배지 목록에서 독립 섹션으로 분리** (사용자 요청) — `TechStack`
  컴포넌트를 만들어 **간략 소개 위**(MetricCards 다음)에 배치. 데이터 SSOT 는 `src/data/techStack.ts`.
  - 그룹: 언어 / 프레임워크·런타임 / 데이터베이스 / 인프라·도구 / 블록체인 / AI 협업 (총 44종).
  - **언어 그룹은 시각적으로 한 단계 강조**(흰 배경 + 테두리 + shadow, 아이콘도 크게) — "언어와
    프레임워크를 구별해달라"는 요청 반영.
  - **브랜드 SVG 아이콘**: simple-icons 에서 필요한 39종만 뽑아 정적 파일(`src/icons/techIcons.ts`)로
    구움 — 런타임 의존성은 늘리지 않음(생성 스크립트는 scratchpad, 일회성).
    - **상표권 이슈로 최신 simple-icons 에서 제거된 C#·AWS·Azure 는 simple-icons@9 에서** 가져왔다
      (2026-07-10 프로필 README 때와 같은 방식).
    - 어두운 로고(Next.js·Express·Java·Solidity 등)는 다크모드에서 묻히므로 **상대 휘도 < 0.16 이면
      밝은 회색으로 대체**하는 `darkHex` 를 생성 시점에 계산해 CSS 변수로 넘긴다.
    - 브랜드 로고가 없는 항목(caver-js·ICON SDK·MCP 등)은 중립 글리프로 렌더.
  - `skills.ts` 의 `skillBadges` 는 이 섹션으로 대체돼 **삭제**(dead data 방지). skills.ts 는
    /experience 게이지 SSOT 만 담당.
- **C#/.NET 추가** — 기술 스택(언어 C#, 프레임워크 .NET 8·Avalonia)과 `skills.ts` Backend 게이지
  ("C# · .NET 8 · Avalonia (데스크톱)" 65).
- **경력에 빠져 있던 씨엠병원 프로젝트 2건 추가** (`experience.ts`) — **voice_server**(사용자 지적)와
  함께 같은 상황이던 **PT Schedule** 도 추가. 내용은 projectDetails 의 기술 서술과 일치시켰다.
- **/ai-workflow 갱신** — intro(7개 프로젝트·C#/.NET·project-seed 발사대), Constrain 에 build-check,
  Verify 에 .NET 검증 3종, **5번째 축 "Bootstrap — project-seed 발사대"** 신설(page 에 neutral 색 추가).
  매트릭스는 **7개 프로젝트**(+file-converter·dicom-studio·sh-ip-scanner)로 확장 + "UI 자가검증" 행 추가.
  - **수치는 형제 레포에서 직접 세어 교정**: cm_groupware ADR 8→**7건**(0000-template 제외분),
    file-converter 6건, dicom-studio·pdf-editor·sh-ip-scanner 각 2건 → 총 25건. MCP 행에 있던
    pdf-editor/file-converter 의 "Playwright"는 **MCP 가 아니라 직접 E2E 하네스**라 UI 자가검증 행으로 이동.
  - 같은 이유로 `projects.ts`·`projectDetails.ts` 의 "ADR 8건" 표기도 7건으로 교정.
- 검증: 빌드 통과, 로컬 서빙 후 대시보드(라이트/다크/모바일)·ai-workflow·experience 렌더 확인.

**다음에**
- 기술 스택 목록은 사용자 감각과 다를 수 있음 — 빠진/과한 항목은 `src/data/techStack.ts` 한 곳만 고치면 된다.

## 2026-08-05 (1차) — sh-ip-scanner 프로젝트 추가 (카드 + 상세 + 스크린샷 7장)

**한 일**
- **sh IP Scanner(v1.0.1) 프로젝트 추가** — `projects.ts` 카드(데스크톱/개인 프로젝트, dicom-studio
  다음 위치) + `projectDetails.ts` 상세(배경·아키텍처·AI 활용·스크린샷·GitHub 링크).
  - 서사의 중심은 **C#/.NET 학습**(사용자 지시). 주력 스택(TS·React·Electron)에서 벗어나 새 언어를
    익히려고, 실제로 쓰던 포터블 툴 faIpScanner(Delphi exe)를 정적 분석해 C#으로 재현한 프로젝트.
  - **MAC(SendARP) 조회는 미구현**(sh-ip-scanner todo P4)이라 상세에 성과로 적지 않았다 —
    원본 분석 내용으로만 언급. 구현된 것은 병렬 핑 스윕 + NetBIOS(UDP137·CP949) + 역DNS 폴백.
  - 저장소가 public 이라 GitHub 링크를 넣음: https://github.com/coolmarvel/sh-ip-scanner
- **스크린샷 7장 캡처** — 이 앱은 브라우저가 아닌 **Avalonia 데스크톱 앱이라 Playwright 로는 구동
  불가**. 대신 레포에 있던 `tools/ShotTool`(Avalonia 헤드리스 렌더러)을 장면별 캡처가 되도록 확장해
  사용(sh-ip-scanner 쪽 변경). 장면: 스캔 완료 / 스캔 중 / 초기 화면 / 대역 관리 / 설정 / 첫 실행 안내 / 정보.
  - **대역 마스킹**: 실 운영 대역 3개는 화면에 넣지 않고 예시 대역(192.168.0/10/20 · 네트워크 A·B·C)과
    일반 PC명으로 대체 — sh-ip-scanner 레포가 이미 실 대역을 전부 예시로 치환한 정책과 동일하게 맞췄다.
    상세 페이지 demo.note 에도 "예시 데이터"임을 명시.
  - 모달 캡처(380~440px)는 슬라이더에서 너무 작아, sharp 로 1.6배 확대 후 앱 배경색 캔버스(1000px)에
    얹어 폭을 통일. 변환 스크립트는 scratchpad(to-jpg.mjs, 일회성).
- 검증: `npm run build` 통과(상세 15개 생성), 로컬 서빙 스모크(/, /projects/, 상세, 이미지 7장 200),
  playwright-core 로 상세 페이지 라이트/다크/모바일 렌더 확인.
  - 함정: `~/pdf-editor/node_modules/playwright-core`(1.61.1)가 찾는 헤드리스 셸 빌드(1228)가 없어
    `~/.cache/ms-playwright/chromium-1232/chrome-linux64/chrome` 를 `executablePath` 로 직접 지정해야 했다.
    CJS 모듈이라 `import pw from ...; const { chromium } = pw;` 형태여야 함.

**후속 (같은 날)** — 인스톨러 릴리스 + 다운로드 버튼
- 사용자 요청으로 인스톨러를 굽고 공개 다운로드까지 연결. 현재 소스로 재게시
  (`dotnet publish` Release·win-x64·self-contained·SingleFile) → wine 으로 Inno Setup 컴파일 →
  `sh-ip-scanner-Setup-1.0.1.exe`(31MB).
- **릴리스 위치는 sh-ip-scanner 레포** — dicom-studio 는 저장소가 프라이빗이라 포트폴리오 레포
  릴리스로 우회했지만, sh-ip-scanner 는 public 이라 그럴 필요가 없다.
  https://github.com/coolmarvel/sh-ip-scanner/releases/tag/v1.0.1
- `projectDetails.ts` 에 [Windows 인스톨러 다운로드 (v1.0.1)] 버튼 추가 + demo.note 에 자체포함·
  SmartScreen 안내 명시. 다운로드 URL 200 + 선두 바이트 `MZ` 확인.
- **주의**: 이 인스톨러는 WSL 에서 구운 산출물로 **Windows 실환경 설치·스캔 검증 전**이다
  (sh-ip-scanner todo P1).

## 2026-07-24 (1차) — dicom-studio 프로젝트 추가 (카드 + 상세 + 스크린샷 11장 + 다운로드)

**한 일**
- **dicom-studio(DICOM Studio v1.4.0) 프로젝트 추가** — `projects.ts` 카드(의료/개인 프로젝트,
  file-converter 다음 위치) + `projectDetails.ts` 상세(배경·아키텍처·AI 활용·스크린샷·다운로드).
  - **저장소가 프라이빗이라 GitHub 저장소 링크는 넣지 않음** (사용자 지시). 다운로드는 이
    포트폴리오 공개 레포의 릴리스(태그 `dicom-studio-v1.4.0`)에 인스톨러(114MB)를 올려 제공 —
    프라이빗 레포 주소가 어디에도 노출되지 않는 방식. gh로 릴리스 생성·업로드, URL 200/206 확인.
    상세에는 demo.note로 "저장소 비공개" 안내를 명시.
- **기능별 스크린샷 11장 캡처** — Playwright `_electron`으로 dicom-studio 프로덕션 빌드(out/)를
  실구동. 사용자 실제 동맥경화도검사 PDF 2건(`C:\Users\user\Desktop\scan\동맥경화도검사-01/02.pdf`)
  + 본인 인적사항(이성현·M·1997-11-25, 나이는 만 나이 28 자동 계산 — 검사지 인쇄 표기와 일치)으로
  전 워크플로우 시연: 랜딩 / 처방 등록 모달 / 달력(1997년 11월) / 워크리스트 행 클릭 자동입력 /
  뷰어(자동 레이아웃) / 회전(옆으로 스캔된 2번 검사지를 ↺로 바로 세움 — 편집 유지해 저장·전송에 반영) /
  크게 보기 / DICOM 저장 토스트 / SaveDB(처방 자동 완료) / FindDB(썸네일) / Multisend.
  - **Multisend는 동봉 테스트 SCP(`npm run store:test`, 포트 11113)로 실제 C-STORE 전송** —
    서버 수신 로그(`C-STORE ← 20260001 · 이성현 · VP`)와 화면 "✓ 2장 전송 완료"까지 확인.
  - 함정: ① `<label>` 안의 커스텀 Select·DatePicker 버튼은 click()이 label 클릭 전달로 이중
    토글되어 드롭다운이 닫힘 → `dispatchEvent('click')` ② Playwright `:text-is()`가 중첩 span
    옵션 버튼과 매칭 안 됨 → `getByRole(name, exact)` ③ 뷰어 셀마다 숨은 돋보기 렌즈
    canvas(160px)가 있어 nth 인덱스가 밀림 → `canvas:visible` ④ `pkill -f` 패턴이 자기 자신의
    커맨드라인과 매치되어 셸이 죽음(exit 144) → `[n]` 브래킷 트릭.
  - 캡처 전 `~/.config/dicom-studio`(개발용 DB) 백업 후 초기화, 캡처 후 원복. 스크립트는
    scratchpad(ds-capture.cjs, 일회성) + sharp JPG 변환 → `public/images/projects/dicom-studio/`.
- 검증: `npm run build` 통과(상세 14개 생성), 로컬 서빙 스모크(/, /projects/, 상세, 이미지 200),
  상세 HTML에 스크린샷 11장 포함 확인.

**다음에**
- dicom-studio 새 버전 릴리스 시 포트폴리오 레포에 `dicom-studio-vX.Y.Z` 태그로 인스톨러
  재업로드 + `projectDetails.ts` 링크 갱신 (todo P4).

## 2026-07-13 (1차) — file-converter 프로젝트 추가 (카드 + 상세 + 기능별 스크린샷 10장)

**한 일**
- **file-converter(파일 변환기 v1.3.2) 프로젝트 추가** — `projects.ts` 카드(데스크톱/개인 프로젝트,
  pdf-editor 다음 위치) + `projectDetails.ts` 상세(배경·아키텍처·AI 활용·스크린샷·링크).
  - 배경 서사는 사용자 지시 그대로: "온라인 변환 서비스에 내 데이터를 주기 싫고, 무료처럼 쓰다
    나중에 결제를 요구받는 게 싫어서 직접 만들었다" + AI 추론까지 완전 오프라인.
  - AI 모델 명시: ISNet 계열 세그멘테이션(@imgly/background-removal 1.4.5, ONNX) +
    onnxruntime-web wasm 354MB 번들, Electron `bgrm://` 프로토콜 서빙. 흰색→투명은 AI 아닌
    픽셀 연산임을 구분해 기술.
- **기능별 스크린샷 10장 캡처** — file-converter의 상설 E2E(test/e2e/full-regression.mjs) 하네스
  패턴 재사용(Playwright `_electron`, 픽스처 자체 생성). 랜딩/변환 대시보드/리사이즈·회전/자르기/
  워터마크/흰색→투명/AI 로딩/AI 결과(공개 프로필 사진 실추론)/PDF 미리보기/PDF 페이지 도구.
  스크립트는 scratchpad(fc-capture*.mjs), sharp로 JPG 변환 → `public/images/projects/file-converter/`.
  - 함정: ① PNG+JPG 혼합 추가 시 `commonKind='mixed'`라 변환 대상 버튼이 안 뜸 → 입력을 PNG로 통일
    ② 클릭 직후 MUI 툴팁이 툴바를 가림 → 캡처 전 마우스를 여백으로 이동 ③ 회전은 미리보기에 시각 반영
    안 됨(변환 시 적용) — 캡션에서 과장하지 않음.
- **다운로드 링크**: Windows 인스톨러(v1.3.2) 링크 추가 — **릴리스는 아직 미업로드**(아래 P1).
  macOS DMG 2종(x64/arm64)은 맥 빌드 환경이 없어 **주석 처리**로 준비만 해둠 (사용자 지시).
  업로드용 ASCII명 사본 `File-Converter-Setup-1.3.2.exe`를 릴리스 폴더와 윈도우 바탕화면에 복사.
- 검증: `npm run build` 통과(상세 페이지 13개 생성), 로컬 서빙 스모크(/, /projects/,
  /projects/file-converter/, 이미지 200), 상세 페이지 라이트/다크/모바일 렌더 확인.

**후속 (같은 날)** — 릴리스·배포 완료
- WSL에 gh CLI 설치(apt, 2.45) + 사용자 웹 인증(`gh auth login`, coolmarvel) + `gh auth setup-git`.
  → 이후 이 환경에서 Claude가 git push·릴리스 업로드 가능해짐.
- file-converter **v1.3.2 릴리스 생성 + 인스톨러(367MB) 업로드** 완료, 다운로드 링크 200.
- 포트폴리오 push → Actions 배포 success → 라이브 상세 페이지·이미지 200 확인.

**다음에**
- 맥 빌드 후 DMG 업로드되면 `projectDetails.ts`의 주석 해제.

## 2026-07-11 (1차) — git pull 분기 해소 + 기본 브랜치 master→main 전환

**한 일**
- `git pull` 에러(divergent branches) 해소: 로컬 문서 커밋 2개 vs 원격 커밋 1개(7차, DMG 링크)
  분기 → `git pull --rebase`로 충돌 없이 정리.
- 기본 브랜치 **master → main 전환**: 로컬 `git branch -m`, `deploy.yml` 트리거 브랜치,
  CLAUDE.md·AGENTS.md·README.md의 master 참조를 main으로 일괄 교체.
- GitHub 웹에서 사용자가 기본 브랜치 전환 후, 원격 master 삭제 + `git fetch --prune` 완료.
- 첫 main 배포 실패: `github-pages` 환경 보호 규칙이 master만 허용 → 사용자가 웹에서 main으로
  수정(스크린샷: feedback-archive/2026-07-11-pages-env-main/), 빈 커밋으로 재배포 → 성공, 사이트 200 확인.

**다음에**
- 재발 방지로 `git config pull.rebase true` 권장 (아직 미설정).

## 2026-07-10 (7차) — pdf-editor v1.5.2 macOS DMG 링크 추가

**한 일**
- `projectDetails.ts`의 pdf-editor 링크에 v1.5.2 macOS DMG 2종 추가:
  `PDF-Editor-1.5.2-x64.dmg`, `PDF-Editor-1.5.2-arm64.dmg`.
- 로컬 DMG 위치 확인: `/Users/iseonghyeon/Desktop/cm_hospital/pdf-editor/release/`.
- `gh auth login` 웹 인증으로 CLI 토큰 갱신 후, v1.5.2 GitHub Release에 x64/arm64 DMG 업로드 완료.
- 검증: `npm run build` 통과, 로컬 상세 페이지에 Windows/x64/Apple Silicon 다운로드 버튼 렌더 확인,
  x64/arm64 DMG URL 모두 200 확인.

## 2026-07-10 (6차) — 파비콘 추가

**한 일**
- `src/app/`에 파일 기반 메타데이터 아이콘 3종 추가 — `icon.svg`(원본: 브랜드 그라데이션
  #465fff→#2a31d8 라운드 사각형 + 흰색 `</>` 코드 모노그램, 폰트 비의존 순수 패스),
  `favicon.ico`(32px PNG-in-ICO), `apple-icon.png`(180px). PNG/ICO는 sharp(node_modules 기존
  설치본)로 SVG에서 파생 — 생성 스크립트는 scratchpad에 (일회성, 레포 미포함).
- 검증: 빌드 통과, `out/`에 3종 내보내짐 + `index.html`에 favicon.ico(32)·icon.svg(any)·
  apple-touch-icon(180) 링크 태그 자동 생성 확인.
- 별건: 사용자 GitHub 프로필 README(coolmarvel/coolmarvel) 최신화 초안을 md로 전달
  (커밋은 사용자가 직접 붙여넣기로 함) — 포트폴리오 링크 루트 URL로 교정, 경력 5개사 반영.
- **프로필 README 후속**: 채팅 복사-붙여넣기로 URL이 깨져(문자 유실) 배지 다수 미렌더링
  (피드백 스크린샷: feedback-archive/2026-07-10-profile-readme-badges/). 해결책으로 프로필 레포를
  scratchpad에 클론해 파일로 직접 커밋(8e9dc2f), 푸시는 사용자 몫. 검증하며 알게 된 것:
  - simple-icons에서 **AWS·Azure·OpenAI 로고 제거됨**(상표권) → AWS·Azure는 구버전
    simple-icons@9 SVG를 브랜드색 입혀 base64 data-URI로 배지에 내장, OpenAI는 huggingface로 대체.
  - **github-readme-stats.vercel.app 공개 인스턴스 DEPLOYMENT_PAUSED**(영구 중단 상태) →
    streak-stats.demolab.com + github-profile-summary-cards.vercel.app 조합으로 교체.
  - readme-typing-svg는 URL의 비ASCII `·`에 400 → %C2%B7 인코딩. 배지 라벨의 괄호도 %28%29 인코딩.
  - 전 이미지 URL을 curl로 200 + 로고 `<image>` 포함까지 일괄 검증 완료.
- **프로필 README 2차 피드백**(스택 부족 + AWS 배지 깨짐, 스크린샷 같은 아카이브 폴더):
  - AWS 깨짐 원인: 4KB SVG data-URI가 **GitHub camo 프록시 URL 길이 한도 초과**
    (같은 방식의 Azure는 0.9KB라 정상). → sharp로 28px PNG(base64 1.5KB)로 재생성, b64의 `+`는
    쿼리스트링에서 공백으로 풀리므로 %2B 인코딩. 커밋 a2c876c.
  - 스택 확장: skills.ts 기준으로 Java·PHP·Python·WebSocket/Socket.IO·JS·Redux·Recoil·Zustand·
    Livewire·Alpine.js·caver-js/ICON SDK·MariaDB·Cloudflare·Linux·Git·GitHub Actions·
    Harness Engineering 배지 추가 (Zustand·caver-js는 simple-icons에 로고 없어 텍스트 배지).
  - README 이미지 54개 전수 검증(200 + 로고 렌더 + shields URL 1900자 이내) 통과.

**다음에 하면 좋은 것**
- OG 메타태그(og:image·description) — todo P2 잔여. og:image는 이번 아이콘 디자인을 1200×630으로
  확장 제작하면 됨.

## 2026-07-10 (5차) — 이력서 최신본 교체 + 로컬 폴더명 이관

**한 일**
- 사용자 갱신 이력서(루트 PDF, 07-10 13:59) → `public/resume.pdf` 교체. 연락처·경력 요약은 사이트 데이터와 일치 확인.
- 로컬 폴더 `~/coolmarvel_portfolio` → `~/coolmarvel.github.io` 이름 변경 (git은 폴더명 무관, remote URL만 정리).
- Claude 세션 메모리 디렉토리도 새 경로 매핑으로 복사.

## 2026-07-10 (4차) — coolmarvel.github.io 사용자 사이트로 이관 준비 (basePath 제거)

**한 일**
- 배포 주소를 `coolmarvel.github.io/coolmarvel_portfolio` → **`coolmarvel.github.io` 루트**로 옮기기로 결정.
  방식은 **레포 이름 교체**(기존 사용자 사이트 레포는 2022-05 마지막 푸시의 옛 React 포트폴리오 —
  `portfolio-2022-legacy` 등으로 개명해 보존, 이 레포를 `coolmarvel.github.io`로 개명).
- `next.config.ts` basePath 제거, `src/lib/assets.ts` basePath `""` (asset() 헬퍼는 관례로 유지).
- CLAUDE.md(하드 제약 2번·스모크 테스트 명령·URL)·README 갱신. 소스 내 잔여 참조 grep 확인 0건.
- 검증: 빌드 통과, 루트 경로 서빙 스모크(/,  /projects/, 상세, 이미지, resume.pdf 모두 200).
- 별건: 라이브 사이트가 README를 보여주는 문제 원인 확인 — **Pages Source가 "Deploy from a branch"로
  바뀌어 Jekyll 빌드가 서빙됨** (라이브 HTML에 Jekyll generator 확인). 이관 후 새 레포에서
  Source=GitHub Actions로 설정하면 함께 해결. 피드백 스크린샷은 feedback-archive/2026-07-10-pages-source-readme/.

**이관 완료 (같은 날)**
- 사용자가 레포 개명(옛 레포 → legacy, 이 레포 → coolmarvel.github.io) + Pages Source=GitHub Actions 설정 + 푸시.
- 라이브 검증: https://coolmarvel.github.io/ 루트에서 Next.js 빌드 서빙 확인(타이틀 정상, Jekyll 아님),
  /projects/·상세·이미지·resume.pdf 200. README만 보이던 문제도 함께 해소.
- 잔여: 이력서·명함 등 외부에 적어둔 옛 URL(coolmarvel.github.io/coolmarvel_portfolio) 갱신은 사용자 몫.

## 2026-07-10 (3차) — 스크린샷 슬라이더 + pdf-editor 기능별 캡처 13장 + 웹 캡처 추가

**한 일**
- 상세 페이지 스크린샷 갤러리를 그리드 → **슬라이더**(ScreenshotSlider.tsx, client)로 교체.
  좌우 화살표·카운터(n/N)·캡션·썸네일 스트립·키보드 화살표 지원. 전 프로젝트 공통 적용.
- **pdf-editor 기능별 캡처 13장 추가** (총 15장): 텍스트 추가(한글)·텍스트 수정 세션·형광펜·연필·
  도형·스탬프·서명·주석·링크·페이지 썸네일 메뉴·페이지 관리 그리드·두 쪽 레이아웃·영어 UI.
  - 방법: pdf-editor의 기존 e2e 스크립트(e2e/visual-check.cjs·pages-check.cjs) 패턴 재사용 —
    _electron.launch + pdf-lib 즉석 샘플 PDF + DataTransfer 드롭. 스크립트는 scratchpad에.
  - 함정 2개: ① 페이지 요소가 ~1970px이라 y비율 0.4+ 좌표는 뷰포트 밖 → 도구 드래그가 무시됨
    (y<0.3으로 해결) ② 언어 전환이 localStorage에 남아 다음 실행 랜딩이 영어가 됨 (한국어 클릭 선행).
- **cm_groupware 2장 추가**: 게시판 허브, EMR QA 트래커(실운영 300건+, 앱 자체 마스킹 확인).
  demo 계정의 나머지 메뉴 11종은 전부 빈 상태(0건)라 제외. **voice_server 1장 추가**: Swagger UI.
- PII 검수: 캡처 에이전트가 화면별 노출 정보를 보고 → 원본 이미지를 직접 확인 후 채택.
  QA 게시판은 앱 자체 마스킹(이*영)이 있으나 성+끝자 재식별 우려가 지적되어(권한 분류기)
  기존 관례대로 담당자·작성자 열을 CSS blur(6px)로 재캡처해 반영.
- 검증: 빌드 통과, 로컬 서빙에서 슬라이더 넘김(4/15)·캡션·썸네일 동작 확인.

**결정**
- pt_schedule 추가 캡처는 관리자 계정 미보유(시크릿 미기록 원칙)로 불가 — 기존 1장 유지.
- 근무표·프로필 등 "구조만 보이는 빈 화면"은 포트폴리오 가치가 낮아 채택하지 않음.

## 2026-07-10 (2차) — 프로젝트 회사별 필터 탭 + Windows 인스톨러 v1.5.2 링크

**한 일**
- `/projects`에 회사별 필터 탭 추가 — `ProjectsExplorer.tsx`(client) 신설, "전체(12)" + 회사 6종
  (씨엠병원·개인 프로젝트·파라메타·앳홈트립·위메이드·드림시큐리티) pill 탭 + 카운트 표시.
  회사 목록은 `projects.ts`의 `company` 필드에서 등장 순서대로 자동 도출 — 하드코딩 없음.
- Windows 인스톨러 링크 v1.4.3 → **v1.5.2** (`projectDetails.ts`). 로컬 exe는 1.5.2까지 빌드돼 있음.
- `~/pdf-editor/scripts/upload-release-win.sh` 작성 — 버전 파라미터화(기본 1.5.2), 기존 v1.4.3 스크립트와 동일 방식.
- 검증: 빌드 통과. 로컬 서빙 + playwright 스크린샷으로 필터 클릭(위메이드 → 2건)·다크·모바일 확인.

**결정 / 주의**
- v1.5.2 릴리스 업로드 완료 (사용자 제공 토큰으로 실행, 링크 200 확인) → 푸시 가능 상태.
- **사용자 토큰이 채팅에 또 평문 노출됨** — 2026-07-09 건과 함께 폐기 필요 (todo P1 갱신).
- 토큰 탐색(자격증명 헬퍼 조회)은 권한 정책상 차단됨 — 릴리스 업로드는 사용자 토큰 제공 시에만.

## 2026-07-10 — pdf-editor macOS DMG 다운로드 링크 추가

**한 일**
- 사용자가 맥에서 구운 **v1.4.7 arm64 DMG**(사용자 확인)를 프로젝트에 반영:
  - `projectDetails.ts` pdf-editor links에 "macOS 인스톨러 다운로드 (v1.4.7, Apple Silicon)" 추가.
    URL은 `.../releases/download/v1.4.7/PDF-Editor-1.4.7-arm64.dmg` (exe와 같은 ASCII 리네임 컨벤션).
  - architecture에 macOS DMG 파이프라인 항목 추가 (한글 번들명 크래시 회피 → ASCII 내부명 + ad-hoc 서명 + hdiutil).
  - `projects.ts` 카드 highlights를 "Windows(NSIS)·macOS(DMG) 멀티플랫폼 배포"로 갱신, "v1.4.0까지" → "v1.4.x".
- `~/pdf-editor/scripts/upload-release-mac.sh` 작성 (upload-release.sh와 동일 방식, v1.4.7 태그 + DMG 업로드).
  DMG는 사용자 맥 바탕화면에 있음 — **맥에서 실행하거나 dmg를 WSL로 복사 후 실행 필요** (토큰 필요).
- 검증: `npm run build` 통과 (18페이지 정상).

**결정**
- Windows(v1.4.3)와 macOS(v1.4.7) 버전이 다른 것은 사용자 인지 상태 — 라벨에 버전을 명시해 혼동 방지.
- DMG가 아직 릴리스에 없어 링크가 404 → **사용자 지시로 macOS 링크는 주석 처리로 숨김**.
  업로드 완료 후 `projectDetails.ts`의 주석을 해제하면 된다 (todo P1).

## 2026-07-09 (3차) — 회의록/잡 상세·pt_schedule 캡처 추가 (PII 블러)

**한 일**
- 그룹웨어 회의록 상세 캡처 2장 — 암호화 게이트(+수신 정보) / 데모 계정 복호화 차단(읽기 전용 가드) 화면.
  ※ 데모 계정은 복호화가 서버에서 차단됨 — 이 자체가 데모 가드 증빙으로 포트폴리오에 사용.
- voice_server 잡 상세 캡처 2장 — 파이프라인 타임라인+할 일 50건(카드 내용 블러) / 패스워드 복호화 후 요약(본문 블러).
  회의록 패스워드는 캡처용으로만 사용, 어디에도 기록하지 않음.
- pt_schedule(https://ptsch.chungmu.xyz) 관리자 화면 캡처 1장 — 환자명(셀)과 치료사 성명(헤더) 블러, 직책·구조는 유지.
  관리자 계정은 캡처용으로만 사용, 사이트에는 "계정 비공개" 안내만 표기. 월간 캘린더 탭은 셀렉터 미발견으로 생략.
- PII 블러 기법: Playwright page.evaluate로 캡처 직전 대상 텍스트 노드에 CSS blur(5px) 주입
  (잡 상세는 '#n' 마커 기준 카드 탐색, 시간표는 tbody td div + thead th div.font-bold).
- projectDetails.ts에 신규 캡처 연결 (meeting-todo-mcp 3장, voice-server 4장, pt-schedule 1장).

**결정**
- 치료사 실명은 사용자 지시(환자명만) 범위 밖이지만 공개 사이트 안전 원칙으로 블러 처리 — 사용자 재확인 대기.
- 시크릿(회의록 암호·관리자 계정)은 세션 로그·코드·사이트 어디에도 기록 금지.

## 2026-07-09 (2차) — 프로젝트 상세 페이지 + 라이브 스크린샷 캡처

**한 일**
- 사용자 스크린샷 피드백 2장(루트 → `docs/feedback-archive/2026-07-09-project-detail-request/`) 반영:
  대시보드 메트릭 카드 4개를 각 페이지로 링크, 프로젝트 카드 → 상세 페이지 이동.
- `/projects/[slug]` 상세 페이지 신설 (12개 SSG) — 담당 역할·배경과 문제·아키텍처·AI 활용·핵심 성과·
  스크린샷 갤러리·라이브 데모 박스·기술 스택 섹션. 데이터는 `src/data/projectDetails.ts` (신규 SSOT).
- **라이브 스크린샷 직접 캡처** (playwright-core + chromium-1229, `~/pdf-editor/node_modules` 차용):
  - cm_groupware: https://chungmu.xyz 에 demo/123456 로그인 → login·dashboard·approval-box·schedule·meetings 5장.
    빈 화면(칸반·근무표)은 제외. **데모 계정(demo/123456)은 공개 허용** — 기능 차단된 열람용 계정 (사용자 확인).
  - voice_server: 내부망 서버(사내 대역, 포트 8000) → home(업로드+암호화 UI)·jobs(처리 이력) 2장.
    (2026-08-05: 이 줄에 실 내부 IP 가 그대로 적혀 있어 마스킹함. 문서에 사내 IP 를 적지 않는다.)
  - pdf-editor: Electron 앱을 `_electron.launch`로 직접 구동(WSLg DISPLAY=:0) → landing·editor·text-edit 3장.
  - 저장 위치: `public/images/projects/{slug}/*.jpg` (JPEG q80~85).
- pdf-editor 릴리스 준비: `~/pdf-editor/scripts/upload-release.sh` 작성 (v1.4.3 태그 + 103MB 인스톨러 업로드).
  **토큰이 필요해 사용자가 직접 실행해야 함** — `! GH_TOKEN=<token> bash scripts/upload-release.sh` (pdf-editor에서).
- 검증: 빌드 18페이지 통과, 로컬 서빙 상세 라우트·이미지 200, 상세 페이지 스크린샷 확인.

**결정**
- 스크린샷 피드백 루프 컨벤션 도입 (pdf-editor 방식) — 부팅 프로토콜 4단계로 CLAUDE.md에 추가.
- 프로젝트 상세 콘텐츠는 `projectDetails.ts`로 분리 (카드용 `projects.ts`와 역할 구분).

**다음 세션에서**
- (완료) pdf-editor GitHub Release v1.4.3 업로드됨 — 상세 페이지 링크를 직접 다운로드 URL로 갱신.
- todo.md P2 나머지(수치 검토·파비콘·OG 태그)부터 이어가면 됨.

## 2026-07-09 (1차) — 포트폴리오 전면 재구축 + 배포 + 문서 하네스 구축

**한 일**
- Bootstrap 통짜 HTML(index.html + portfolio-*.html 14개)을 전부 제거하고
  **Next.js 16 + React 19 + Tailwind CSS 4 정적 사이트**로 재구축 (커밋 `bff1ab5`, 187 files).
- TailAdmin Pro v2.2.4(`tailadmin-nextjs-pro-225/`, gitignore됨)를 학습해 디자인 토큰(globals.css `@theme`)과
  카드/배지/사이드바 idiom을 차용, 컴포넌트는 전부 자체 작성 (라이선스 — ADR-0001).
- 페이지 4개: `/` 대시보드, `/experience`, `/projects`, `/ai-workflow`.
- 콘텐츠를 `src/data/*.ts`로 데이터화:
  - 이력서 PDF(레포 루트)에서 5개사 경력·프로젝트 14건·학력·자격 추출.
  - 형제 프로젝트 4개(cm_groupware·pdf-editor·pt_schedule·voice_server)의 CLAUDE.md·ADR을
    탐색 에이전트로 분석해 `/ai-workflow` 페이지(Harness Engineering 4축 + 하네스 매트릭스 + 회의록 자동화 플로우) 작성.
- 명함 사진 713KB → ffmpeg 480px 압축 37KB → `public/images/profile.jpg`. 이력서 → `public/resume.pdf`.
- `.github/workflows/deploy.yml` (actions/upload-pages-artifact + deploy-pages) 추가.
- 검증: `npm run build` 통과, 로컬 서빙(포트 8931, basePath 재현) 전 라우트 200,
  playwright-core(`~/pdf-editor/node_modules` 차용) + `~/.cache/ms-playwright/chromium-1229/chrome-linux64/chrome`으로
  라이트/다크/모바일 스크린샷 확인. 메트릭 카드 값 잘림 버그 발견 → 배지를 상단으로 이동해 수정.
- 사용자가 직접 푸시(`!` 접두 명령, classic token 사용) → Actions 성공 → **라이브 확인 완료**
  (https://coolmarvel.github.io/coolmarvel_portfolio/ 전 라우트 200, 새 title 확인).
- CLAUDE.md 부팅 프로토콜 + docs/ 하네스(이 파일, todo.md, ADR-0001) 신설.

**결정**
- GH Pages 배포는 GitHub Actions 방식 (Pages Settings → Source: GitHub Actions). 근거는 ADR-0001.
- Claude의 직접 `git push`는 auto-mode 분류기가 토큰 노출로 차단 → **푸시는 사용자가 `!`로 직접** 하는 규칙 확정.
- 스킬 게이지 %·"수행 프로젝트 14+" 등 수치는 Claude가 이력서 기반으로 산정한 임의값 — 사용자 검토 대기.

**다음 세션에서**
- `docs/todo.md`의 P1(토큰 폐기 확인)부터 확인할 것.

## (이전 이력 — git log 요약)

- `54864d7` 앳홈트립 경력 추가 / `e401938` career update / 이전: Bootstrap 기반 구 사이트 유지보수.
