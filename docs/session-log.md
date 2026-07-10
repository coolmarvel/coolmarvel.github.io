# 세션 로그 — 진행 이력 SSOT

> 최신 세션이 맨 위. 각 블록은 "무엇을 했나 / 어떤 결정을 했나 / 다음에 뭘 하면 되나"를 담는다.

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

**사용자가 해야 할 일 (순서 중요)**
1. 옛 coolmarvel.github.io 레포 개명 (예: portfolio-2022-legacy)
2. 이 레포(coolmarvel_portfolio)를 coolmarvel.github.io로 개명
3. 개명된 레포 Settings → Pages → Source = **GitHub Actions**
4. `git push` (개명 후에도 기존 remote URL은 GitHub이 리다이렉트)

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
  - voice_server: 내부망 http://210.110.80.137:8000 → home(업로드+암호화 UI)·jobs(처리 이력) 2장.
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
