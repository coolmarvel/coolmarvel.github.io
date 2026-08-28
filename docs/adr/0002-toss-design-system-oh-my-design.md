# ADR-0002: oh-my-design 디자인 계약(DESIGN.md, Toss 레퍼런스)으로 UI 전면 재설계

- 상태: 승인됨 (2026-08-28)
- 결정자: 이성현 + Claude Code

## 맥락

- ADR-0001 이후 사이트는 TailAdmin 대시보드 idiom(사이드바·위젯 카드·브랜드 보라색·Outfit 폰트)을 따랐다.
  포트폴리오는 "읽는 문서"에 가까운데 관리자 대시보드 관성이 남아 있었고, 사용자가 **"Toss처럼"** 명료하고
  여백이 넓은 UI로 바꾸길 원했다(콘텐츠는 유지).
- project-seed(2026-08-27)와 pdf-editor-live(2026-08-28)가 이미 **oh-my-design(OmD)** 으로 DESIGN.md 디자인 계약을
  쓰고 있다. 같은 규율을 이 레포에도 적용해 UI 작업의 SSOT를 두는 것이 하네스 일관성에 맞다.

## 결정

1. **oh-my-design 설치** — `npx oh-my-design-cli install-skills --agent claude-code --all` 로 `.claude/`(스킬 22·서브에이전트 19·
   훅 4·settings.json)를 프로젝트 로컬에 설치. 레퍼런스 카탈로그 `.claude/data/`(15MB)는 gitignore.
2. **DESIGN.md — Toss inspired variation** — `omd-init` 의 `query-references.mjs` 로 toss 가 1위(match 104, verified_v2)인
   것을 확인하고, 레퍼런스 토큰(primary `#3182f6`, weak `#e8f3ff/#1b64da`, fg `#191f28`, body `#4e5968`, surface `#f2f4f6`,
   border `#e5e8eb`)을 채택. Toss Product Sans 는 재배포 권리가 없어 **Pretendard Variable(jsDelivr)** 로 대체.
   다크모드·도메인 액센트 6종·모션은 Toss 공개 근거가 없어 extension 으로 명시.
   Core v2 컴파일러는 소유자 승인 영수증이 필요해 실행하지 않고 **레퍼런스 형식으로 직접 작성**(pdf-editor-live 와 동일 방식).
   shim 3종(CLAUDE.md·AGENTS.md·.cursor/rules)과 `.omd/sync.lock.json` 은 omd-sync 규격대로 기록.
3. **토큰 구조** — `globals.css` 에서 CSS 변수 한 벌(`--c-*`)을 `.dark` 에서만 바꾸고 `@theme inline` 으로 Tailwind 색에 매핑.
   컴포넌트는 `dark:` 접두 없이 시맨틱 색(`bg-surface`, `text-fg` …)만 쓴다. 페이지에 hex 금지.
4. **레이아웃 전환** — 사이드바+헤더 대시보드 → **상단 내비 + 1040px 컨테이너 + 푸터** 문서형. 모바일은 시트 메뉴.
   `SidebarContext`·`AppSidebar`·`Backdrop`·`Badge` 삭제, `Button`·`Chip`·`Card`·`SectionTitle` 신설.
5. **테마 플래시 제거** — 페인트 전 인라인 스크립트가 localStorage/`prefers-color-scheme` 로 `.dark` 를 붙인다.
6. **SEO 동반 정리** — metadataBase·OG(`public/og.png`, Playwright 렌더)·twitter·JSON-LD Person·`app/sitemap.ts`·`app/robots.ts`.

## 검토한 대안

- **A. TailAdmin 토큰을 유지하고 색만 파랑으로** — 사이드바·위젯 관성이 남아 "Toss처럼"이 안 된다 → 기각.
- **B. Toss 디자인 시스템(TDS) 코드를 직접 차용** — TDS 는 비공개/모바일 전용이고 라이선스 불명 → 기각. 공개 문서에서 검증된
  토큰만 inspired 로 채택.
- **C. OmD Core v2 컴파일까지 완주** — `prepare-review → approve-review → compile --adopt` 는 사용자 대화형 승인이 전제.
  자율 세션에서 승인을 대신할 수 없어 보류. 필요하면 다음 세션에서 `omd:init` 을 대화형으로 재실행해 승격.

## 결과

- 빌드 통과(28 페이지), 라이트/다크/모바일(390px) 5개 라우트 렌더 확인, body 가로 스크롤 0.
- 트레이드오프: Pretendard 는 CDN 의존(오프라인이면 시스템 폰트 폴백). `.claude/settings.json` 의 OmD 훅 4종이 이 레포 세션에서
  동작한다(편집 후 DESIGN.md 밖 hex/radius 드리프트 감지 → `.omd/preferences.md` 기록).
