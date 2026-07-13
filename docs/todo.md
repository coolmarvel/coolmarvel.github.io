# TODO

> P1 = 즉시 / P2 = 다음 세션 / P3 = 여유 있을 때 / P4 = 아이디어

## P1
- [ ] **file-converter v1.3.2 GitHub Release 업로드** — 사이트의 Windows 인스톨러 다운로드 링크가
      이 릴리스를 가리킴 (업로드 전까지 404).
      https://github.com/coolmarvel/file-converter/releases/new 에서 태그 `v1.3.2` 생성 후
      바탕화면(또는 `~/file-converter/release/`)의 `File-Converter-Setup-1.3.2.exe`(367MB) 첨부.
      업로드 후 링크 200 확인. (이 WSL엔 gh CLI가 없어 Claude가 직접 업로드 불가)
- [ ] file-converter macOS DMG — 맥 빌드 환경 확보 후 x64/arm64 DMG를 릴리스에 올리고
      `projectDetails.ts`의 주석 처리된 DMG 링크 2줄 해제.
      (빌드 가이드: `~/file-converter/docs/guides/packaging.md`)
- [ ] **노출된 GitHub classic token 폐기 확인** — 2026-07-09 건에 이어 **2026-07-10에도 새 토큰이
      채팅에 평문 노출됨** (v1.5.2 릴리스 업로드에 사용). 두 토큰 모두
      https://github.com/settings/tokens 에서 삭제 확인 후 이 항목을 지울 것.
- [x] pdf-editor v1.5.2 Windows 릴리스 업로드 — 2026-07-10 완료, 링크 200 확인.
      https://github.com/coolmarvel/pdf-editor/releases/download/v1.5.2/PDF-Editor-Setup-1.5.2.exe
- [x] pdf-editor v1.5.2 DMG 릴리스 업로드 — 2026-07-10 완료, x64/arm64 링크 200 확인.
      `projectDetails.ts`에는 x64/arm64 DMG 링크를 추가함. 로컬 파일:
      `/Users/iseonghyeon/Desktop/cm_hospital/pdf-editor/release/PDF편집기-1.5.2-x64.dmg`,
      `/Users/iseonghyeon/Desktop/cm_hospital/pdf-editor/release/PDF편집기-1.5.2-arm64.dmg`.
      업로드 자산명은 각각 `PDF-Editor-1.5.2-x64.dmg`, `PDF-Editor-1.5.2-arm64.dmg`.

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
