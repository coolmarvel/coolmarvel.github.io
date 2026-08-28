---
id: coolmarvel-portfolio
name: 이성현 포트폴리오
country: KR
category: portfolio
homepage: "https://coolmarvel.github.io"
primary_color: "#3182f6"
verified: "2026-08-28"
omd: "0.1"
mode: inspired
base_reference: toss
provenance:
  - { kind: prompt-fact, note: "사용자 지시 2026-08-28: 'toss처럼' — 콘텐츠는 유지하고 UI/UX/디자인을 교체. 모바일 반응형 최우선. 다크모드 유지" }
  - { kind: verified-reference-inspiration, id: toss, verified: "2026-07-11", note: ".claude/data/references/toss/DESIGN.md — TDS Mobile 토큰과 toss.im 마케팅 토큰을 분리해 인용" }
  - { kind: repository-fact, path: "src/data/*.ts", note: "콘텐츠 SSOT. 디자인은 데이터를 바꾸지 않는다" }
  - { kind: repository-fact, path: "src/app/globals.css", note: "Tailwind 4 @theme 토큰이 유일한 스타일 권위. 페이지에 hex 하드코딩 금지" }
  - { kind: agent-proposed-greenfield-decision, note: "다크모드 팔레트·도메인 배지 색·모션 곡선은 Toss 공개 근거에 없어 확장(extension)으로 표기" }
tokens:
  source: repository
  extracted: "2026-08-28"
  colors:
    primary: "#3182f6"
    primary-hover: "#2272eb"
    primary-pressed: "#1b64da"
    weak-bg: "#e8f3ff"
    weak-fg: "#1b64da"
    canvas: "#ffffff"
    surface: "#f2f4f6"
    surface-2: "#f9fafb"
    surface-hover: "#e8ebee"
    foreground: "#191f28"
    body: "#4e5968"
    muted: "#8b95a1"
    placeholder: "#b0b8c1"
    border: "#e5e8eb"
    danger: "#e42939"
    on-primary: "#ffffff"
    dark-canvas: "#17171c"
    dark-surface: "#202027"
    dark-surface-2: "#1b1b20"
    dark-surface-hover: "#2a2a31"
    dark-foreground: "#e5e8eb"
    dark-body: "#b0b8c1"
    dark-muted: "#8b95a1"
    dark-border: "#2e2e36"
    dark-weak-bg: "rgba(49, 130, 246, 0.18)"
    dark-weak-fg: "#7fb3ff"
  accents:
    blue:   { bg: "#e8f3ff", fg: "#1b64da", use: "블록체인 · 링크 · 기본" }
    green:  { bg: "#e5f7ee", fg: "#0f8a4b", use: "의료 · 재직중 · 완료" }
    orange: { bg: "#fff1e1", fg: "#c96a0a", use: "커머스" }
    purple: { bg: "#efe9ff", fg: "#6a4fd8", use: "AI" }
    teal:   { bg: "#e0f5f5", fg: "#0c7d84", use: "데스크톱" }
    indigo: { bg: "#eceeff", fg: "#4b52d9", use: "웹 서비스(라이브)" }
  typography:
    family: { sans: "Pretendard Variable", fallback: "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, 'Segoe UI', 'Apple SD Gothic Neo', 'Malgun Gothic', Roboto, 'Helvetica Neue', Arial, sans-serif" }
    display: { size: "clamp(32px, 4.6vw, 48px)", weight: 700, lineHeight: 1.3, tracking: "-0.02em", use: "홈 히어로 h1 한 곳" }
    h1: { size: 28, mobile: 24, weight: 700, lineHeight: 1.35, tracking: "-0.01em", use: "페이지 제목" }
    h2: { size: 22, mobile: 20, weight: 700, lineHeight: 1.4, tracking: "-0.01em", use: "섹션 제목" }
    h3: { size: 17, weight: 600, lineHeight: 1.45, use: "카드 제목" }
    body: { size: 15, weight: 400, lineHeight: 1.65, use: "본문 기본(한국어)" }
    body-sm: { size: 14, weight: 400, lineHeight: 1.6, use: "목록·보조 설명" }
    caption: { size: 13, weight: 400, lineHeight: 1.5, use: "메타 정보(기간·회사), 색은 muted" }
    label: { size: 13, weight: 600, lineHeight: 1.2, use: "칩·배지·탭" }
    number: { size: 28, weight: 700, lineHeight: 1.2, tracking: "-0.02em", use: "지표 숫자, tabular-nums" }
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, section: 48, section-lg: 72 }
  rounded: { chip: 9999, button-sm: 10, button: 12, inner: 14, image: 16, card: 20 }
  shadow:
    none: "none"
    float: "0 8px 24px rgba(0, 0, 0, 0.08)"
    focus-ring: "0 0 0 4px rgba(49, 130, 246, 0.24)"
  icon: { size: 20, stroke: 1.6, cap: round }
  control-height: { nav: 64, button: 44, button-lg: 48, button-sm: 36, icon-button: 36, touch-min: 44, tab: 36 }
  container: { max: 1360, pad: 20, pad-md: 32 }
  motion: { fast: "160ms", base: "220ms", easing: "cubic-bezier(0.2, 0, 0, 1)", press: "scale(0.98)" }
  components:
    nav: { type: header, height: 64, bg: "canvas @ 80% + backdrop-blur", border: "1px border only after scroll", link: "15px/600 body; active foreground", cta: "weak button '이력서'", mobile: "햄버거 → 카드형 시트(링크 48px 행) + CTA" }
    primary-button: { type: button, bg: "#3182f6", fg: "#ffffff", radius: 12, height: 44, padding: "0 20px", font: "15px/600", states: "hover #2272eb; pressed #1b64da + scale .98; focus ring; disabled surface-hover/muted", use: "뷰당 1개 — 이력서 다운로드, 라이브 접속" }
    weak-button: { type: button, bg: "#e8f3ff", fg: "#1b64da", radius: 12, height: 44, padding: "0 20px", font: "15px/600", states: "hover #d8eaff; pressed scale .98", use: "GitHub, 전체 보기, 보조 CTA" }
    ghost-button: { type: button, bg: "transparent", fg: "#4e5968", radius: 12, height: 44, font: "15px/600", states: "hover surface", use: "인라인·헤더 액션, 테마 토글" }
    chip: { type: badge, radius: 9999, height: 24, padding: "0 8px", font: "12.5px/600", states: "accent weak 쌍 6종 + neutral(surface/body); 액션 아님", use: "도메인·상태·스택" }
    filter-tab: { type: tab, radius: 9999, height: 36, padding: "0 14px", font: "14px/600", states: "selected bg #191f28 fg #fff; idle bg surface fg body; hover surface-hover", use: "프로젝트 소속 필터" }
    card: { type: card, bg: "#f2f4f6", border: "none", radius: 20, padding: "24 (mobile 20)", shadow: none, states: "clickable → hover #e8ebee, pressed scale .985", use: "지표·프로젝트·경력·섹션 컨테이너" }
    card-outlined: { type: card, bg: "#ffffff", border: "1px solid #e5e8eb", radius: 16, padding: 20, use: "surface 밴드 위 목록 항목(경력 프로젝트 블록)" }
    metric: { type: stat, label: "14px muted", value: "28px/700 foreground tabular", trend: "chip", use: "홈 핵심 지표 4종" }
    timeline: { type: list, line: "2px #e5e8eb", dot: "10px; current primary; past border", use: "경력 요약" }
    gauge: { type: progress, track: "#e8ebee", fill: "#3182f6", height: 8, radius: 9999, use: "숙련도" }
    table: { type: table, header: "13px/600 muted", row: "14px hairline #e5e8eb", first-col: "sticky, canvas bg", use: "AI 하네스 매트릭스 — 가로 스크롤 컨테이너 필수" }
    screenshot: { type: figure, radius: 16, border: "1px #e5e8eb", thumb: "96x56 radius 10, selected ring primary 2px", use: "프로젝트 상세" }
    demo-box: { type: callout, bg: "#e8f3ff", fg: "#191f28", radius: 20, padding: 24, use: "라이브 데모 안내 + 접속 버튼(primary) + 계정 코드" }
    footer: { type: footer, bg: "#f2f4f6", font: "14px muted", use: "저작권·링크" }
  components_harvested: true
---

# Design System of 이성현 포트폴리오

**Toss** 레퍼런스의 inspired variation. 흰 캔버스, 강한 근검정 텍스트, 하나의 파란 액션, 회색 면(surface)으로만 나누는 위계, 넉넉한 여백 — 토스의 "쉽게 답할 수 있게, 가치를 먼저" 태도를 개발자 포트폴리오에 옮긴다. 콘텐츠(`src/data/*.ts`)는 그대로 두고 표현만 바꾼다.

## 1. Visual Theme & Atmosphere

이 사이트는 한 사람의 경력을 채용 담당자가 **3분 안에 판단**할 수 있게 하는 문서형 제품이다. 대시보드(사이드바·위젯)가 아니라 **읽는 페이지**다. 첫 화면에 한 문장의 주장, 그 아래 숫자 4개, 그 아래 근거(프로젝트)가 순서대로 온다.

토스에서 가져오는 것: 파란색은 장식이 아니라 "여기가 액션"이라는 뜻이다(뷰당 1개). 깊이는 그림자가 아니라 흰색/회색 면의 대비로 만든다. 제목은 굵고 짧게, 본문은 길게 쓰지 않는다. 카드는 테두리 없이 회색 면 위에 둥글게(20px) 놓인다.

**Key characteristics:**
- 캔버스 흰색, 카드는 `#f2f4f6` 면. 테두리·그림자 없음. 그림자는 떠 있는 층(모바일 메뉴)에만
- 텍스트 3단계: `#191f28` 제목 / `#4e5968` 본문 / `#8b95a1` 메타
- 파랑 `#3182f6`은 뷰당 주 액션 1개. 보조 액션은 `#e8f3ff`/`#1b64da` weak 버튼
- Pretendard Variable, 15px 본문(줄간 1.65), 제목은 700에 자간 -1~-2%
- 아이콘 20px stroke 1.6, 라운드. 눌리면 `scale(.98)` — 토스식 촉각 피드백

## 2. Color Palette & Roles

### Brand
- **Primary** (`#3182f6`): primary 버튼 채움, 활성 링크, 게이지 채움, 타임라인 현재 점, 포커스 링.
- **Primary hover / pressed** (`#2272eb` / `#1b64da`): primary 버튼 전용.
- **Weak** (`#e8f3ff` 위 `#1b64da`): 보조 버튼, 라이브 데모 콜아웃, 기본 배지. 페이지 배경으로 쓰지 않는다.

### Neutral
- **Foreground** (`#191f28`): 제목, 지표 숫자, 선택된 필터 탭 배경.
- **Body** (`#4e5968`): 본문, 내비 링크, ghost 버튼 텍스트.
- **Muted** (`#8b95a1`): 기간·회사·캡션·플레이스홀더성 설명.
- **Surface** (`#f2f4f6`): 카드·푸터·필터 탭 idle. **Surface-2** (`#f9fafb`): 카드 안의 안쪽 블록. **Surface-hover** (`#e8ebee`): 클릭 가능한 카드 hover, 게이지 트랙.
- **Border** (`#e5e8eb`): 헤더 스크롤 후 하단선, 표 행, outlined 카드, 스크린샷 프레임. 카드 기본에는 쓰지 않는다.

### Accents (extension — 도메인 배지 전용, Toss 근거 없음)
blue 블록체인 · green 의료/재직중 · orange 커머스 · purple AI · teal 데스크톱 · indigo 웹 서비스. 항상 weak 쌍(연한 배경 + 진한 글자)으로만 쓰고, 채움(solid) 배지는 만들지 않는다.

### Dark mode (extension)
`.dark`에서 canvas `#17171c`, surface `#202027`, surface-2 `#1b1b20`, hover `#2a2a31`, border `#2e2e36`, foreground `#e5e8eb`, body `#b0b8c1`, muted `#8b95a1`. Primary는 유지하고 weak 쌍은 `rgba(49,130,246,.18)` / `#7fb3ff`. 액센트 배지는 다크에서 배경 알파 18%·글자를 한 단계 밝게(예: green `#4cd08a`).

## 3. Typography Rules

**Family.** `Pretendard Variable`(jsDelivr dynamic-subset CSS) + 시스템 폴백. Toss Product Sans는 재배포 권리가 없어 채택하지 않는다(레퍼런스 §3 "Unresolved").

| Role | Size | Weight | Line height | Use |
|---|---:|---:|---:|---|
| Display | clamp(32, 4.6vw, 48) | 700 | 1.3 | 홈 h1 한 곳, tracking -0.02em |
| H1 | 28 (모바일 24) | 700 | 1.35 | 페이지 제목 |
| H2 | 22 (모바일 20) | 700 | 1.4 | 섹션 제목 |
| H3 | 17 | 600 | 1.45 | 카드 제목 |
| Body | 15 | 400 | 1.65 | 본문 |
| Body small | 14 | 400 | 1.6 | 목록, 하이라이트 |
| Caption | 13 | 400 | 1.5 | 메타(기간·회사), muted |
| Label | 13 | 600 | 1.2 | 칩·탭 |
| Number | 28 | 700 | 1.2 | 지표, `font-variant-numeric: tabular-nums` |

Rules:
- 제목 자간은 -1%~-2%, 본문은 0. 대문자 변환·letter-spacing 라벨 금지.
- 700이 상한. 800·900 쓰지 않는다.
- 크롬(내비·버튼·칩·탭)은 한 줄. 넘치면 문구를 줄인다. 카드 본문은 자연 줄바꿈.
- 텍스트 화살표(`→`) 대신 아이콘. 단, 데이터 파일 안의 파이프라인 표기(`queued → converting`)는 콘텐츠이므로 예외.

## 4. Component Stylings

### Top navigation
- 64px, `canvas` 80% + `backdrop-blur`, 스크롤 전 하단선 없음 → 스크롤 후 1px `border`.
- 왼쪽 워드마크: 파란 12px 라운드 사각 + "이성현" 700, 옆에 "coolmarvel" muted 13.
- 링크 15/600 `body`, 활성 `foreground`(밑줄·배경 없음). hover `foreground`.
- 오른쪽: 테마 토글(ghost 36 icon), "이력서" weak 버튼(모바일에서는 아이콘만).
- 모바일(<768): 햄버거 → 헤더 아래 카드형 시트(`canvas`, radius 20, `float` 그림자), 링크 행 48px, 마지막에 primary "이력서 다운로드". 배경 탭·ESC로 닫힘.

### Buttons
- **Primary**: `#3182f6`/white, 44px(lg 48), radius 12, 0 20px, 15/600. hover `#2272eb`, pressed `#1b64da` + scale .98, focus ring 4px 24%. 뷰당 1개.
- **Weak**: `#e8f3ff`/`#1b64da`, 같은 기하. hover `#d8eaff`.
- **Ghost**: 투명/`body`, hover `surface`. 아이콘 버튼은 36px 정사각, 터치에서 44px.
- 링크형 버튼(“전체 보기”)은 15/600 `weak-fg` 텍스트 + 20px chevron 아이콘.

### Chip (배지)
- 24px, 0 8px, radius 9999, 12.5/600. weak 쌍 6종 + neutral(`surface`/`body`). 액션 아님. 스택 태그도 같은 칩(neutral)로 통일.

### Filter tab
- 36px, 0 14px, radius 9999, 14/600. selected `#191f28`/white, idle `surface`/`body`, hover `surface-hover`. 카운트는 같은 줄 muted 13.

### Card
- `surface`, radius 20, padding 24(모바일 20), 테두리·그림자 없음.
- 클릭 가능하면 전체가 하나의 hit area: hover `surface-hover`, pressed scale .985, 우하단에 별도 “상세 보기” 텍스트 없음(제목 옆 chevron으로 표현).
- 카드 안의 하위 블록은 `card-outlined`(white + 1px border, radius 16)나 `surface-2`.

### Metric tile
- surface 카드. 라벨 14 muted → 숫자 28/700 → 보조 칩. 4열(≥1024) / 2열(≥640) / 1열.

### Timeline
- 2px `border` 세로선, 10px 점(현재 primary, 과거 border). 회사명 17/600, 메타 13 muted.

### Gauge
- 트랙 `surface-hover` 8px radius 9999, 채움 primary. 수치는 오른쪽 13 muted tabular.

### Table (AI 매트릭스)
- `overflow-x:auto` 컨테이너 필수, 첫 열 sticky + `canvas` 배경. 헤더 13/600 muted, 행 14, 행 구분 1px `border`.

### Screenshot slider
- 프레임 radius 16 + 1px `border`, 이미지 `object-contain` 최대 640px. 좌우 버튼은 흰 원형 40px + `float` 그림자(떠 있는 층). 썸네일 96×56 radius 10, 선택 ring primary 2px.

### Demo callout
- `weak-bg` 위 `foreground` 텍스트, radius 20, 24 padding. primary 버튼 "접속하기" + 계정 `<code>`(white, radius 10, 13 mono).

## 5. Layout Principles

- 컨테이너 최대 1360px(헤더·본문·푸터 동일), 좌우 패딩 20(모바일)/32. 섹션 간격 40(모바일)/64. 사용자 피드백(2026-08-28): 1040은 큰 모니터에서 여백이 과했다.
- 홈 순서: 히어로(주장 + CTA + 프로필) → 지표 4 → 대표 프로젝트 → 소개 + 경력 타임라인 → 기술 스택 → 학력·자격.
- 위계는 면의 대비(`canvas` > `surface` > `surface-2`)로 만든다. 같은 층에 테두리와 면을 겹쳐 쓰지 않는다.
- 그리드: 프로젝트 2열(≥768)/3열(≥1280), 홈 대표 프로젝트 4열(≥1280), 지표 4열, 나머지 1열. 모바일은 전부 1열이며 가로 스크롤은 표·썸네일 스트립만 허용한다.
- 리듬 4/8/12/16/24/32/48/72.

## 6. Depth & Elevation

세 층만: **Flat**(카드·버튼·칩: 면 대비만) / **Floating**(모바일 메뉴·슬라이더 버튼: `float` 그림자) / **Focus**(4px 24% 파란 링). 색 있는 그림자·다층 그림자·카드 hover lift 금지.

## 7. Do's and Don'ts

### Do
- 파랑은 뷰당 액션 1개. 나머지는 weak·ghost.
- 카드는 면으로, 목록은 hairline으로.
- 모바일 1열, 터치 타깃 44px, 표는 가로 스크롤 컨테이너 안에.
- 토큰은 `globals.css` `@theme`에서만. 페이지·컴포넌트에 hex 금지.
- 콘텐츠는 `src/data`만 고친다. 디자인 변경이 데이터 스키마를 요구하면 타입을 먼저 확장한다.

### Don't (TailAdmin 대시보드 잔재·일반 SaaS 관성)
- 사이드바·위젯 그리드·상단 검색바 없음.
- 카드 테두리 + 그림자 동시 사용 금지. hover 시 떠오르는 카드 금지.
- 채움(solid) 배지·빨간 CTA·그라데이션 버튼·대문자 라벨 금지.
- 이모지 아이콘, 텍스트 화살표(크롬), 800 이상 굵기 금지.
- 스크롤 진입 애니메이션·패럴랙스 금지.

## 8. Responsive Behavior

- 브레이크포인트: sm 640 / md 768 / lg 1024 / xl 1280. 데스크톱 기준 렌더는 1024+.
- <768: 내비는 시트 메뉴, 히어로는 세로 스택(사진 → 문장 → CTA 전폭), 지표 2열, 카드 패딩 20.
- <640: 지표 1열, 버튼 전폭, 필터 탭은 가로 스크롤 스트립(`no-scrollbar`).
- `(pointer: coarse)`: 아이콘 버튼 44px, 썸네일 스트립 스냅.
- 이미지 `max-width:100%`, 표·코드·썸네일만 자체 `overflow-x:auto`. body는 절대 가로 스크롤 없음.

## 9. Agent Prompt Guide

- Primary 버튼: `#3182f6`/white, 44px, radius 12, 15/600, hover `#2272eb`, pressed scale .98.
- Weak 버튼: `#e8f3ff`/`#1b64da`, 같은 기하.
- 카드: `#f2f4f6`, radius 20, padding 24, 테두리·그림자 없음, hover `#e8ebee`(클릭 가능할 때만).
- 칩: 24px, radius 9999, 12.5/600, weak 쌍.
- 텍스트: Pretendard, 15 본문 1.65, 제목 700 자간 -1%.
- 새 컴포넌트는 `src/components/ui`에 두고 이 문서에 계약을 추가한 뒤 쓴다.
- 출시 전: `npm run build` + playwright 라이트/다크/모바일(390px) 스크린샷 확인.

## 10. Voice & Tone

이력서와 같은 목소리 — 담백하고 직접적. 존댓말(“~합니다”), 느낌표·과장·"열정" 류 없음. 문장은 사실 + 근거(숫자·도구명). 영어 고유명사는 원문 그대로.

| Do | Don't |
|---|---|
| "13개 업무 도메인을 DDD로 모듈화했습니다." | "혁신적인 그룹웨어를 만들었습니다!" |
| 버튼: 이력서 다운로드, 접속하기, 전체 보기 | "지금 바로 확인해보세요" |
| 메타는 짧게: 씨엠병원 · 2026.05 ~ | 문장형 메타 |

## 11. Brand Narrative

이성현(coolmarvel)은 블록체인 → 커머스 → 의료로 도메인을 옮기며 백엔드 중심 풀스택로 일해 온 개발자이고, 최근에는 Claude Code·MCP·hooks로 AI가 일하는 하네스를 직접 설계한다(사용자 이력서·`src/data/profile.ts`). 사이트는 그 주장을 세 층으로 증명한다: 숫자(경력·회사·프로젝트) → 실제로 돌아가는 산출물(라이브 서비스·인스톨러·스크린샷) → 방법(AI 워크플로우). 디자인은 증거가 먼저 보이게 하고 장식은 뺀다.

## 12. Principles

1. **주장 하나, 근거 순서대로.** 히어로는 한 문장, 그 아래는 전부 근거. *UI:* 히어로에 두 개 이상의 헤드라인 없음.
2. **파랑은 액션이다.** *UI:* 뷰당 primary 1개, 나머지 weak/ghost.
3. **면으로 나눈다.** *UI:* 테두리·그림자 대신 canvas/surface 대비.
4. **모바일이 기본 렌더.** *UI:* 1열이 기본, 넓어질 때만 열을 늘린다.
5. **콘텐츠는 데이터.** *UI:* 뷰는 `src/data`를 읽기만 한다.

## 13. Personas

사이트의 실제 사용 맥락에서 도출한 역할이며 조사 결과가 아니다.

- **채용 담당자(비개발).** 첫 화면에서 경력 연차·도메인·재직 상태를 10초 안에 읽어야 한다. → 지표 4종, 큰 숫자.
- **기술 면접관.** 프로젝트 하나를 골라 아키텍처·성과·실제 동작을 확인한다. → 상세 페이지의 배경/아키텍처/스크린샷/링크.
- **모바일로 링크를 연 사람.** 카카오톡에서 열었다. → OG 미리보기, 1열, 44px 타깃, 가로 스크롤 없음.

## 14. States

| State | Treatment |
|---|---|
| Hover (버튼) | primary `#2272eb`, weak `#d8eaff`, ghost `surface` |
| Hover (클릭 카드) | 배경 `surface-hover`, 제목 색 변화 없음 |
| Pressed | `scale(.98)` 160ms |
| Focus-visible | 4px `rgba(49,130,246,.24)` 링 |
| Active nav | `foreground` 색, 굵기 동일 |
| Selected tab | `#191f28`/white |
| Current (재직중) | green 칩 + 타임라인 primary 점 |
| Empty / Loading | 정적 사이트라 없음. 이미지 로딩은 `surface` 플레이스홀더 |
| External link | 라벨 + 20px external 아이콘, `rel="noopener noreferrer"` |

## 15. Motion & Easing

- 160ms(hover·press) / 220ms(메뉴 열림·테마 전환) `cubic-bezier(.2,0,0,1)`.
- opacity·transform만 애니메이션. 레이아웃 속성 애니메이션 금지.
- `prefers-reduced-motion: reduce`에서 전부 0ms.
- 스크롤 진입 효과·패럴랙스·자동 슬라이드 없음.
