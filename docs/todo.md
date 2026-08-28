# TODO

> P1 = 즉시 / P2 = 다음 세션 / P3 = 여유 있을 때 / P4 = 아이디어

## P1
- [x] file-converter v1.3.2 GitHub Release 업로드 — 2026-07-13 완료 (WSL에 gh 설치 + 웹 인증 후
      Claude가 릴리스 생성·업로드·배포·링크 200 검증까지 수행).
      https://github.com/coolmarvel/file-converter/releases/tag/v1.3.2
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
- [ ] DESIGN.md Core v2 승격 — 대화형 세션에서 `omd:init` 재실행 → prepare-review/approve/compile --adopt (ADR-0002 대안 C).
- [ ] pdf-editor-live 저장소 public 전환 시 `projectDetails.ts` links 에 GitHub 추가 + ai-workflow 매트릭스 확인.
- [ ] 홈 히어로 문구(`profile.headline/subheadline`)·OG 이미지 문구 사용자 검토.
- [x] pdf-editor GitHub Release 업로드 — 2026-07-09 완료.
      https://github.com/coolmarvel/pdf-editor/releases/download/v1.4.3/PDF-Editor-Setup-1.4.3.exe
- [ ] 대시보드 수치 사용자 검토 — 스킬 게이지 %(`skills.ts`, C#/.NET 65 포함), "수행 프로젝트 14+"·
      핵심 지표(`profile.ts`)는 Claude 산정 임의값. 사용자 감각에 맞게 조정.
- [ ] 기술 스택 목록 사용자 검토 — `src/data/techStack.ts` 53종(6그룹, 2026-08-28 Fastify·Drizzle·Vite·Caddy·OAuth 2.0·oh-my-design 추가). 빠진 스택·안 쓰는 스택 정리 필요. 새 아이콘이 필요하면 simple-icons 에서
      추출(방법은 session-log 2026-08-05 2차).
- [x] 파비콘 — 2026-07-10 완료. `src/app/`에 icon.svg(브랜드 그라데이션 + `</>` 모노그램)·
      favicon.ico·apple-icon.png 추가, 빌드 검증 완료.
- [ ] 총 경력 계산 방식 확정 — 현재 2022.05부터 연속(4년 3개월). 이력서(사람인, 공백 제외 4년)와
      맞추려면 `src/lib/career.ts`를 재직 기간 합산으로 변경.
- [x] OG 메타태그 — 2026-08-28 완료(`public/og.png`, metadataBase, twitter, JSON-LD Person).

## P3
- [ ] 프로젝트 스크린샷 — 구 사이트가 갖고 있던 프로젝트 이미지들(GAIA 등)은 git 히스토리(`54864d7` 이전)에 남아 있음.
      필요하면 `git show 54864d7:assets/img/...`로 복구해 프로젝트 카드에 이미지 섹션 추가.
- [x] 프로젝트 상세 페이지 — 운영 중(2026-08-28 sections·usage·이전/다음 내비 추가).
- [x] sitemap.xml / robots.txt — 2026-08-28 `app/sitemap.ts`·`app/robots.ts` 로 생성.

## P4
- [ ] sh-web-editor(M1)·jazz-community(보일러플레이트) 는 완성도가 오르면 카드 후보. sh-econsent 는 사용자 지시로 제외.
- [ ] 형제 프로젝트에 새 ADR/기능 생기면 `/ai-workflow`·`projects.ts` 반영.
- [x] sh-ip-scanner 인스톨러 다운로드 링크 — 2026-08-05 완료. 저장소가 public 이라 릴리스도
      그쪽(`coolmarvel/sh-ip-scanner` v1.0.1)에 올렸고, 상세 페이지에 다운로드 버튼 추가.
      https://github.com/coolmarvel/sh-ip-scanner/releases/tag/v1.0.1
      (단, **Windows 실환경 설치·스캔 검증은 아직** — sh-ip-scanner todo P1.)
- [x] dicom-studio 저장소 public 전환 — 2026-08-15 완료. 히스토리에 있던 병원망 Oracle PACS
      주소를 `git filter-repo` 로 마스킹한 뒤, **레포 삭제 후 재생성**해서 공개
      (force push 만으로는 옛 커밋이 SHA 직접 접근으로 남는 걸 확인 — 아래 항목 참고).
      릴리스가 `coolmarvel/dicom-studio` v1.4.0 으로 이관되어 이 레포의
      `dicom-studio-v1.4.0` 태그·릴리스는 삭제함.
- [ ] dicom-studio 새 버전 릴리스 시 — 저장소가 public 이라 그쪽 레포 릴리스에 올리고
      `projectDetails.ts` 다운로드 링크(현재 v1.4.0) 갱신.
- [ ] sh-dicom-studio 새 버전 릴리스 시 — 저장소가 public 이라 그쪽 레포 릴리스에 올리고
      `projectDetails.ts` 다운로드 링크(현재 v1.0.1)와 학습교재 PDF 링크 갱신.
- [ ] 이력서 PDF 갱신 시 `public/resume.pdf` 교체 + `src/data/` 동기화.
- [ ] 방문 통계(GoatCounter 등 무료 정적 친화 도구) 검토.
- [ ] **공개 레포 git history 에 남은 내부 IP** — `docs/session-log.md` 의 voice_server 줄에 사내
      내부 IP(포트 8000)가 평문으로 있었고 2026-08-05 에 마스킹했지만, **과거 커밋에는 그대로 남아
      있다.** 이 레포는 이미 public 이라 지금도 열람 가능한 상태.
      - **주의**: `git filter-repo --replace-text` + force push 만으로는 부족하다. 2026-08-15
        dicom-studio 작업에서 확인한 바로, force push 로 밀려난 옛 커밋은 GitHub 에 남아
        `gh api repos/<owner>/<repo>/commits/<옛SHA>` 로 내용이 그대로 읽힌다. 확실히 지우려면
        **레포 삭제 후 재생성**하거나 GitHub 지원팀에 GC 를 요청해야 한다.
      - 다만 이 레포는 dicom-studio 와 달리 **삭제 비용이 크다** — GitHub Pages 설정,
        Actions 배포 이력, `dicom-studio-v1.4.0` 외 릴리스 자산, 사용자 사이트 도메인 연결이
        모두 딸려 있다. 삭제·재생성 대신 지원팀 GC 요청이 현실적. 사용자 판단 후 진행.
