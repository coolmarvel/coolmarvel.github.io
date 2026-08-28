# coolmarvel.github.io

이성현(coolmarvel)의 개발자 포트폴리오 — [coolmarvel.github.io](https://coolmarvel.github.io/)

oh-my-design 디자인 계약(`DESIGN.md`, Toss 레퍼런스 inspired)을 따르는 문서형 포트폴리오입니다.

## 기술 스택

- **Next.js 16** (App Router, `output: "export"` 정적 내보내기)
- **React 19** · **TypeScript**
- **Tailwind CSS 4** (`DESIGN.md` 토큰을 `globals.css` `@theme inline` 으로 매핑, 라이트/다크 CSS 변수)
- 다크모드 지원, 반응형 레이아웃

## 페이지 구성

| 경로 | 내용 |
|---|---|
| `/` | 홈 — 히어로, 핵심 지표, 대표 프로젝트, 소개·경력 타임라인, 기술 스택, 학력/자격 |
| `/experience` | 경력 상세 (회사별 프로젝트·상세 업무·기술 스택) + 스킬셋 |
| `/projects` | 전체 프로젝트 카드 |
| `/ai-workflow` | AI(Claude Code) 개발 방법론 — Harness Engineering, MCP, ADR |

## 콘텐츠 수정

모든 콘텐츠는 `src/data/` 아래 데이터 파일에서 관리합니다.

- `profile.ts` — 프로필·연락처·핵심 지표
- `experience.ts` — 경력·학력·자격
- `projects.ts` — 프로젝트 카드
- `skills.ts` — 스킬 카테고리·배지
- `aiWorkflow.ts` — AI 워크플로우 페이지

이력서 PDF는 `public/resume.pdf`, 프로필 사진은 `public/images/profile.jpg`를 교체하면 됩니다.

## 개발 & 빌드

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # 정적 내보내기 → out/
```

## 배포

`main` 브랜치에 push하면 GitHub Actions(`.github/workflows/deploy.yml`)가 정적 빌드 후 GitHub Pages로 배포합니다.

> 최초 1회: 저장소 **Settings → Pages → Source**를 **GitHub Actions**로 설정해야 합니다.
