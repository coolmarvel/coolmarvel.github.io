# 세션 로그 — 진행 이력 SSOT

> 최신 세션이 맨 위. 각 블록은 "무엇을 했나 / 어떤 결정을 했나 / 다음에 뭘 하면 되나"를 담는다.

## 2026-07-09 — 포트폴리오 전면 재구축 + 배포 + 문서 하네스 구축

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
