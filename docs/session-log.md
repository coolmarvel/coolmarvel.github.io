# 세션 로그 — 진행 이력 SSOT

> 최신 세션이 맨 위. 각 블록은 "무엇을 했나 / 어떤 결정을 했나 / 다음에 뭘 하면 되나"를 담는다.

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
