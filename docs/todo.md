# TODO

> P1 = 즉시 / P2 = 다음 세션 / P3 = 여유 있을 때 / P4 = 아이디어

## P1
- [ ] **노출된 GitHub classic token 폐기 확인** — 2026-07-09 채팅·셸 히스토리에 평문 노출됨.
      사용자가 https://github.com/settings/tokens 에서 삭제했는지 확인하고 이 항목을 지울 것.

## P2
- [x] pdf-editor GitHub Release 업로드 — 2026-07-09 완료.
      https://github.com/coolmarvel/pdf-editor/releases/download/v1.4.3/PDF-Editor-Setup-1.4.3.exe
- [ ] 대시보드 수치 사용자 검토 — 스킬 게이지 %(`skills.ts`), "수행 프로젝트 14+"·핵심 지표(`profile.ts`)는
      Claude 산정 임의값. 사용자 감각에 맞게 조정.
- [ ] 파비콘 없음 — `src/app/` 에 favicon/icon 추가 (현재 브라우저 기본 아이콘).
- [ ] OG 메타태그(og:image·description) 추가 — 링크 공유 시 미리보기.

## P3
- [ ] 프로젝트 스크린샷 — 구 사이트가 갖고 있던 프로젝트 이미지들(GAIA 등)은 git 히스토리(`54864d7` 이전)에 남아 있음.
      필요하면 `git show 54864d7:assets/img/...`로 복구해 프로젝트 카드에 이미지 섹션 추가.
- [ ] 프로젝트 상세 페이지(`/projects/[slug]`) — 카드 → 상세로 확장할지 검토.
- [ ] sitemap.xml / robots.txt 생성 (정적 export라 수동 또는 스크립트).

## P4
- [ ] 형제 프로젝트에 새 ADR/기능 생기면 `/ai-workflow`·`projects.ts` 반영.
- [ ] 이력서 PDF 갱신 시 `public/resume.pdf` 교체 + `src/data/` 동기화.
- [ ] 방문 통계(GoatCounter 등 무료 정적 친화 도구) 검토.
