# CLAUDE.md — coolmarvel_portfolio 작업 가이드

이 파일은 **세션이 바뀌어도 맥락을 즉시 복구**하기 위한 진입점이다. Claude Code(또는 다른 AI 에이전트)는
세션 시작 시 이 파일을 자동으로 읽는다. 아래 "부팅 프로토콜"이 나머지 상태 파일까지 로드하도록 지시한다.

## 🟢 세션 시작 부팅 프로토콜 (매 세션 첫 작업 전에 반드시 수행)

새 세션에서 이 프로젝트 작업을 시작하면, **코드를 건드리기 전에** 순서대로:

1. `docs/session-log.md` 읽기 — 마지막으로 무엇을 했고 지금 어디쯤인지 (**진행 이력 SSOT**)
2. `docs/todo.md` 읽기 — 남은 일 (P1~P4)
3. 관련 `docs/adr/*.md` 읽기 — 아키텍처 결정과 그 근거 (왜 이 구조인지)
4. **스크린샷 피드백 확인** — 레포 루트에 `스크린샷 *.png`가 있으면 사용자의 새(미처리) 피드백이다.
   Read로 보고 요구사항으로 해석해 반영하고, 처리 후 `docs/feedback-archive/YYYY-MM-DD-*/`로 옮겨 비운다.

이 4단계를 끝내면 이전 세션의 맥락을 복구한 상태가 된다. 그 다음 작업을 시작한다.

## 🔴 변경 후 자동 규칙 (사용자가 매번 요청하지 않아도 수행)

1. 코드를 바꾸면 **같은 턴에** `docs/session-log.md`(최상단 블록 추가)와 `docs/todo.md`를 갱신한다.
2. `npm run build`로 정적 내보내기가 깨지지 않았는지 확인한다. **빌드 검증 없이 커밋하지 않는다.**
3. UI 변경 시 로컬 서빙 + Playwright 스크린샷으로 라이트/다크/모바일(390px)과 **body 가로 넘침 0** 을 확인한다
   (스크립트 예시는 session-log 2026-08-28 항목 — playwright 는 `~/pdf-editor-live/node_modules/playwright/index.mjs`,
   크로미움은 `~/.cache/ms-playwright/chromium_headless_shell-1237` 를 executablePath 로 지정).
4. 커밋은 Conventional Commits + **한국어 제목** + `Co-Authored-By: Claude <noreply@anthropic.com>` 트레일러.
   **푸시는 사용자가 직접** 한다 (`!` 접두 명령). 푸시하면 GitHub Actions가 자동 배포한다.

## 이 프로젝트가 뭔가

**이성현(coolmarvel)의 개발자 포트폴리오** — https://coolmarvel.github.io/
(2026-07-10에 프로젝트 페이지에서 **사용자 사이트 레포(coolmarvel.github.io)로 이관** — 레포 이름 교체 방식)

2026-07-09에 Bootstrap 통짜 HTML에서 Next.js 16 정적 사이트로 재구축했고(ADR-0001), **2026-08-28에
oh-my-design 디자인 계약(`DESIGN.md`, Toss 레퍼런스)으로 UI를 전면 재설계**했다(ADR-0002).
상단 내비 + 문서형 레이아웃, 다크모드, 모바일 반응형.

- **스택**: Next.js 16 (App Router, `output: "export"`) · React 19 · TypeScript · Tailwind CSS 4
- **페이지**: `/`(홈) · `/experience`(경력+숙련도) · `/projects`(카드, 개인 프로젝트 우선) · `/projects/[slug]`(상세) · `/ai-workflow`(Harness Engineering)
- **디자인**: `DESIGN.md` 가 UI 계약(토큰·컴포넌트·보이스). UI 를 고치기 전에 반드시 읽는다. 토큰은 `src/app/globals.css` 한 곳,
  프리미티브는 `src/components/ui/{Button,Chip,Card,SectionTitle}`. 페이지에 hex·`dark:` 접두 남발 금지.
- **배포**: main push → `.github/workflows/deploy.yml` → GitHub Pages (Source: GitHub Actions 방식)

## 콘텐츠 SSOT — 여기만 고치면 된다

모든 이력/콘텐츠는 `src/data/*.ts`에 데이터로 분리되어 있다. **페이지 컴포넌트에 콘텐츠를 하드코딩하지 않는다.**

| 파일 | 내용 | 갱신 시점 |
|---|---|---|
| `src/data/profile.ts` | 이름·연락처·소개·핵심 지표 4종 | 신상/지표 변동 |
| `src/data/experience.ts` | 회사별 경력·상세 업무 + 학력·자격 | 이직/프로젝트 종료 |
| `src/data/projects.ts` | 프로젝트 카드 (slug·domain·highlights·stack). **배열 순서 = 노출 순서**(개인 프로젝트 먼저) | 새 프로젝트 |
| `src/data/projectDetails.ts` | 상세(배경·아키텍처·sections·usage·스크린샷·demo·links). 카드의 라이브/GitHub/다운로드 링크도 여기서 파생 | 상세 갱신 |
| `src/data/skills.ts` | 스킬 카테고리(게이지 %)·배지 | 스택 변동 |
| `src/data/aiWorkflow.ts` | AI 워크플로우 페이지 전체 콘텐츠 | 하네스 진화 시 |

콘텐츠의 원천은 두 가지:
- **이력서 PDF** (레포 루트, gitignore됨 — 사람인 양식). 갱신되면 `public/resume.pdf`도 교체.
- **형제 프로젝트 문서** (`~/cm_groupware`, `~/pdf-editor`, `~/pdf-editor-live`, `~/remote-assist`, `~/sh-web-editor`, `~/pt_schedule`,
  `~/voice_server`의 CLAUDE.md·ADR·changelog) — `/ai-workflow` 페이지와 최신 프로젝트 카드의 근거. 새 ADR/기능이 생기면 반영 후보.

링크 규칙(사용자 결정 2026-09-07): **private 저장소 프로젝트에는 GitHub 링크를 달지 않는다**(pdf-editor-live·remote-assist·sh-web-editor).
대신 `projectDetails.ts` 의 `privateRepo: true` 로 카드·상세에 클릭되지 않는 "GitHub 저장소 (비공개)" 라벨(`PrivateRepoLabel`)만 표시한다 —
404 로 가는 버튼은 깨진 링크로 보이기 때문. 공개할 생각이 없는 저장소라 "public 전환 시 링크 추가" 같은 todo 도 만들지 않는다.
`gh repo view <repo> --json isPrivate` 로 확인.

스크린샷 규칙: 실제 앱을 띄워 캡처한다. 웹 앱은 Playwright(`~/pdf-editor-live/node_modules/playwright`, launch args `--disable-gpu --disable-software-rasterizer` — WSL 에서 rAF 가 안 돌아 click 이 멈추는 함정)로 라이브 URL 을 자동 조작해 기능 검사와 캡처를 한 스크립트에서 하고, **끝나면 반드시 `browser.close()` 후 `pgrep chrome-headless-shell` 로 잔존 프로세스 0 을 확인**한다(2026-09-09 사용자 지시). WPF 앱은 WSL 에서 실행이 안 되지만 **Windows interop**(`powershell.exe`)으로 `/mnt/c` 에 복사한
publish 본을 띄우고 UI Automation 으로 조작·캡처할 수 있다(절차는 session-log 2026-09-07). 화면에 사용자 데스크톱·터미널이 찍히지 않게
공유 모니터에는 중립 화면(kiosk 브라우저 등)을 띄운다.

## ⛔ 하드 제약 (어기면 안 됨)

1. **`tailadmin-nextjs-pro-225/`는 절대 커밋 금지** (gitignore 처리됨, 2026-08-28부터 디자인 참조도 끝남 — 현재 계약은 DESIGN.md).
   `.claude/data/`(OmD 레퍼런스 카탈로그 15MB)도 gitignore — `npx oh-my-design-cli install-skills` 로 재생성.
2. **basePath 규칙**: 사용자 사이트(coolmarvel.github.io) 루트 배포라 **basePath 없음** (2026-07-10~).
   - 단, `<img>`·PDF 등 정적 에셋 경로는 여전히 `src/lib/assets.ts`의 `asset()` 헬퍼를 거친다
     (향후 basePath 재도입 시 한 곳만 고치면 되도록 유지하는 관례).
3. 레포 루트의 `이성현_반명함.jpg`·`풀스택...pdf` 원본은 gitignore 상태 유지. 배포 사본은
   `public/images/profile.jpg`(압축본)·`public/resume.pdf`.
4. 개인정보 주의: 이메일·전화번호는 사용자가 이력서에 공개한 범위만 사이트에 노출한다.

## 자주 쓰는 명령

```bash
npm run dev     # 로컬 개발 (basePath 없음, http://localhost:3000)
npm run build   # 정적 내보내기 → out/  (커밋 전 필수 검증)

# GitHub Pages 환경 재현 스모크 테스트 (루트 배포)
(cd out && python3 -m http.server 8931 &)
curl -s -o /dev/null -w "%{http_code}" http://localhost:8931/
```

## 문서 체계

- `docs/session-log.md` — 세션별 작업 이력 (최신이 위). **이 레포의 진행 SSOT.**
- `docs/todo.md` — 우선순위별(P1~P4) 남은 일.
- `docs/adr/` — 아키텍처 결정 기록. 구조적 결정을 내리면 ADR을 추가한다.
- 문서 작성 규칙은 `~/cm_groupware/docs/writing-guide.md`를 따른다 (조직 표준 원천).

<!-- omd:start v=1 hash=a0905ab87d60 -->
# Design System (oh-my-design)

Read the standalone design contract at **@./DESIGN.md** before any UI,
styling, microcopy, or motion work. When a valid adopted Core v2
`.omd/system/manifest.json` declares `profile: portable-core` and binds exact
graph/projection hashes, the System Graph is machine authority and DESIGN.md is
its standalone projection. A migration candidate is never adopted authority.

Preference log (pending corrections): @./.omd/preferences.md

Precedence: pending explicit preference corrections > adopted Bound System
graph/standalone DESIGN.md > your defaults. Fold pending corrections into the
graph and regenerate the projection before clearing them.
<!-- omd:end -->
