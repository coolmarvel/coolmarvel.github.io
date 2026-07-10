# TODO

> P1 = 즉시 / P2 = 다음 세션 / P3 = 여유 있을 때 / P4 = 아이디어

## P1
- [ ] **노출된 GitHub classic token 폐기 확인** — 2026-07-09 건에 이어 **2026-07-10에도 새 토큰이
      채팅에 평문 노출됨** (v1.5.2 릴리스 업로드에 사용). 두 토큰 모두
      https://github.com/settings/tokens 에서 삭제 확인 후 이 항목을 지울 것.
- [x] pdf-editor v1.5.2 Windows 릴리스 업로드 — 2026-07-10 완료, 링크 200 확인.
      https://github.com/coolmarvel/pdf-editor/releases/download/v1.5.2/PDF-Editor-Setup-1.5.2.exe
- [ ] **pdf-editor v1.4.7 DMG 릴리스 업로드 + 링크 살리기** — macOS 링크는 404 방지를 위해
      `projectDetails.ts`에 주석 처리로 숨겨둠(2026-07-10). 맥(또는 dmg 복사 후 WSL)에서
      `bash ~/pdf-editor/scripts/upload-release-mac.sh <token> [dmg경로]` 실행 →
      `curl -sI` 200 확인 → 주석 해제 후 이 항목을 지울 것.
      ※ Windows가 1.5.2로 올라가서 dmg도 맥에서 1.5.2로 재빌드하는 게 더 깔끔할 수 있음.

## P2
- [x] pdf-editor GitHub Release 업로드 — 2026-07-09 완료.
      https://github.com/coolmarvel/pdf-editor/releases/download/v1.4.3/PDF-Editor-Setup-1.4.3.exe
- [ ] 대시보드 수치 사용자 검토 — 스킬 게이지 %(`skills.ts`), "수행 프로젝트 14+"·핵심 지표(`profile.ts`)는
      Claude 산정 임의값. 사용자 감각에 맞게 조정.
- [x] 파비콘 — 2026-07-10 완료. `src/app/`에 icon.svg(브랜드 그라데이션 + `</>` 모노그램)·
      favicon.ico·apple-icon.png 추가, 빌드 검증 완료.
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
