# AGENTS.md — coolmarvel_portfolio 작업 가이드

이 파일은 **세션이 바뀌어도 맥락을 즉시 복구**하기 위한 진입점이다. Codex(또는 다른 AI 에이전트)는
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
3. UI 변경 시 가능하면 로컬 서빙 + 스크린샷으로 라이트/다크/모바일을 확인한다
   (방법은 session-log 2026-07-09 항목 참고 — playwright-core는 `~/pdf-editor/node_modules`에서 차용 가능).
4. 커밋은 Conventional Commits + **한국어 제목** + `Co-Authored-By: Codex <noreply@anthropic.com>` 트레일러.
   **푸시는 사용자가 직접** 한다 (`!` 접두 명령). 푸시하면 GitHub Actions가 자동 배포한다.

## 이 프로젝트가 뭔가

**이성현(coolmarvel)의 개발자 포트폴리오** — https://coolmarvel.github.io/
(2026-07-10에 프로젝트 페이지에서 **사용자 사이트 레포(coolmarvel.github.io)로 이관** — 레포 이름 교체 방식)

2026-07-09에 Bootstrap 통짜 HTML에서 **TailAdmin 디자인 시스템 기반 Next.js 16 정적 사이트**로
전면 재구축했다 (ADR-0001). 대시보드 스타일 UI, 다크모드, 반응형.

- **스택**: Next.js 16 (App Router, `output: "export"`) · React 19 · TypeScript · Tailwind CSS 4
- **페이지**: `/`(대시보드) · `/experience`(경력+스킬) · `/projects`(프로젝트 카드) · `/ai-workflow`(Harness Engineering 소개)
- **배포**: master push → `.github/workflows/deploy.yml` → GitHub Pages (Source: GitHub Actions 방식)

## 콘텐츠 SSOT — 여기만 고치면 된다

모든 이력/콘텐츠는 `src/data/*.ts`에 데이터로 분리되어 있다. **페이지 컴포넌트에 콘텐츠를 하드코딩하지 않는다.**

| 파일 | 내용 | 갱신 시점 |
|---|---|---|
| `src/data/profile.ts` | 이름·연락처·소개·핵심 지표 4종 | 신상/지표 변동 |
| `src/data/experience.ts` | 회사별 경력·상세 업무 + 학력·자격 | 이직/프로젝트 종료 |
| `src/data/projects.ts` | 프로젝트 카드 (slug·domain·highlights·stack) | 새 프로젝트 |
| `src/data/skills.ts` | 스킬 카테고리(게이지 %)·배지 | 스택 변동 |
| `src/data/aiWorkflow.ts` | AI 워크플로우 페이지 전체 콘텐츠 | 하네스 진화 시 |

콘텐츠의 원천은 두 가지:
- **이력서 PDF** (레포 루트, gitignore됨 — 사람인 양식). 갱신되면 `public/resume.pdf`도 교체.
- **형제 프로젝트 문서** (`~/cm_groupware`, `~/pdf-editor`, `~/pt_schedule`, `~/voice_server`의
  AGENTS.md·ADR) — `/ai-workflow` 페이지와 최신 프로젝트 카드의 근거. 새 ADR/기능이 생기면 반영 후보.

## ⛔ 하드 제약 (어기면 안 됨)

1. **`tailadmin-nextjs-pro-225/`는 절대 커밋 금지** (gitignore 처리됨). TailAdmin Pro는 유료 라이선스로
   소스를 공개 레포에 올릴 수 없다. 디자인 토큰·idiom만 차용해 자체 컴포넌트로 작성한다.
   새 UI가 필요하면 이 폴더에서 **참고만** 하고 코드를 복사하지 않는다.
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
