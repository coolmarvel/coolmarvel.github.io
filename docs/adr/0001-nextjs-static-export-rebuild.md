# ADR-0001: Next.js 정적 내보내기 + TailAdmin 디자인 차용으로 포트폴리오 재구축

- 상태: 승인됨 (2026-07-09)
- 결정자: 이성현 + Claude Code

## 맥락

- 기존 사이트는 Bootstrap 5 템플릿 기반 통짜 HTML 15개 파일. 이력서와 내용이 어긋나고(최신 경력 누락),
  UI 품질이 낮으며, 콘텐츠가 HTML에 하드코딩되어 유지보수가 어려웠다.
- 사용자는 TailAdmin Next.js Pro v2.2.5 라이선스를 보유하고 있고, cm_groupware에서 이미
  TailAdmin 디자인 시스템을 Blade로 이식해 쓰고 있어 시각적 일관성 요구가 있었다.
- 호스팅은 GitHub Pages(프로젝트 페이지, `/coolmarvel_portfolio` 하위 경로) 유지가 전제.

## 결정

1. **Next.js 16 `output: "export"` 정적 내보내기 + GitHub Actions 배포** (`actions/deploy-pages`).
   - Pages Source를 "GitHub Actions"로 전환 (기존 branch 방식 폐기).
   - `basePath`는 production에서만 `/coolmarvel_portfolio`. 정적 에셋은 `asset()` 헬퍼로 접두.
2. **TailAdmin Pro는 디자인 토큰·idiom만 차용, 소스 복사 금지.**
   - `@theme` 토큰(컬러·타이포·섀도)은 globals.css로 가져오되, 컴포넌트(사이드바·카드·배지 등)는
     구조를 참고해 자체 작성. 템플릿 폴더는 gitignore.
   - 근거: TailAdmin Pro 라이선스는 소스 재배포 금지 — 공개 레포에 Pro 컴포넌트를 커밋할 수 없다.
3. **콘텐츠와 뷰 분리**: 모든 이력 콘텐츠는 `src/data/*.ts`에 타입 있는 데이터로 보관.
4. 의존성 최소화: next/react/tailwind만 사용. 차트 라이브러리(ApexCharts 등)는 도입하지 않고
   스킬 게이지는 순수 CSS로 구현 (정적 사이트 번들 경량 유지).

## 검토한 대안

- **A. 기존 HTML 손질**: 근본 문제(하드코딩·낡은 UI) 해결 불가 → 기각.
- **B. TailAdmin Pro 템플릿을 그대로 fork해서 수정**: 가장 빠르지만 공개 레포 라이선스 위반 +
  admin 데모 코드(차트·CRM 등) 수십 개 도메인이 불필요한 무게 → 기각.
- **C. gh-pages 브랜치에 빌드 산출물만 push (소스는 비공개)**: 라이선스는 해결되나 소스 이력 관리가
  이 레포의 목적(공개 포트폴리오)과 상충, 배포 절차도 복잡 → 기각.
- **D. Notion/외부 빌더**: 이미 Notion 포트폴리오 별도 운영 중. 이 레포는 "직접 만든 사이트"라는
  증명 가치가 있어야 함 → 기각.

## 결과

- 성공: 빌드/배포 파이프라인 동작, 전 라우트 200, 라이트/다크/모바일 검증 완료 (session-log 2026-07-09).
- 트레이드오프:
  - 정적 export라 이미지 최적화(next/image loader)·서버 기능 사용 불가 — 포트폴리오 특성상 무영향.
  - unoptimized `<img>`는 basePath 자동 접두가 안 되어 `asset()` 헬퍼 규칙을 지켜야 함 (CLAUDE.md ⛔ 2).
  - TailAdmin 업데이트를 자동으로 받을 수 없음 — 토큰만 차용했으므로 수동 동기화도 사실상 불필요.
