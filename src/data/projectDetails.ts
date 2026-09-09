export interface ProjectScreenshot {
  src: string;
  caption: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectSection {
  title: string;
  icon?: "shield" | "card" | "search" | "cloud" | "layers" | "spark";
  intro?: string;
  items: string[];
}

export interface ProjectDetail {
  role: string;
  background: string[];
  architecture: string[];
  /** 프로젝트 고유의 심화 절 (인증·SEO·인프라 등) — 아키텍처 카드 다음에 렌더 */
  sections?: ProjectSection[];
  /** "이렇게 사용합니다" 단계 목록 — 라이브 서비스·설치형 앱용 */
  usage?: string[];
  aiUsage?: string[];
  screenshots?: ProjectScreenshot[];
  demo?: { url?: string; account?: string; note: string };
  links?: ProjectLink[];
  /** 비공개 저장소 — 카드·상세에 클릭되지 않는 "GitHub 저장소 (비공개)" 라벨만 표시(링크 없음, 2026-09-07 사용자 결정) */
  privateRepo?: boolean;
}

export const projectDetails: Record<string, ProjectDetail> = {
  "sh-web-editor": {
    role: "개인 프로젝트 — 브리프·설계·에디터·양식 서버·업로더·디자인 실측·배포 전 과정",
    background: [
      "Asana·Jira를 쓰면서 무료 요금제의 텍스트 에디터가 UI/UX·기능·성능 어느 쪽도 만족스럽지 않았고, 재직 중인 병원 그룹웨어에서는 진단서·소견서·진료확인서 같은 제증명 서류를 정해진 양식 위에 채워 넣어야 하는 일이 잦았습니다. 국내 기업·기관 웹에서 표준처럼 쓰이는 상용 웹에디터는 폐쇄 소스이고, 오픈소스 대안(CKEditor 5·TinyMCE)은 UI·아이콘·기능 구성이 달라 '국내 업무용 에디터' 감성이 나지 않는 데다 라이선스(GPL/상용) 부담이 있습니다. 그래서 같은 룩과 같은 기능 구성을 가진 에디터를 직접 만들되, 코드·CSS·아이콘·이미지 자산은 일절 가져오지 않고 전부 자체 제작하기로 했습니다.",
      "양식 문제는 단순하게 풀었습니다 — 양식은 특별한 데이터 모델 없이 그냥 HTML 문서이고, 양식을 만들고 고치는 도구도 이 에디터 자신(디자인/HTML/미리 보기/TEXT 4개 뷰)입니다. 사용자는 세 부류입니다: 글 작성자는 양식을 불러와 그 위에 작성하고 첨부를 붙이고, 양식 관리자는 관리자 모드에서 양식 HTML을 만들어 서버에 저장하며, 통합 개발자는 스크립트 로드 후 init() 한 번으로 textarea를 에디터로 바꾸고 서버 주소를 주면 양식 기능이 켜집니다. 에디터 코어는 서버 없이 완결되고, 서버는 양식·첨부 기능에만 쓰입니다.",
      "2026-08-20 킥오프(M1 뼈대)에서 시작해 09-07~09 사흘 동안 v0.1.1 → v1.0.5까지 42회 릴리스를 냈고, 09-08 https://sh-web-editor.coolmarvel.com 에 첫 공개 배포했습니다. 코드는 TypeScript 155파일 약 16,700줄 · CSS 3,500줄(부분 파일 26) · Java 1,200줄, 테스트는 Vitest 188건 + JUnit 11건 + Playwright E2E, ADR 6건, 사용자 스크린샷 피드백 15회차입니다.",
    ],
    architecture: [
      "스택(ADR-0002) — TypeScript strict + Vite 라이브러리 모드로 dist 4개(IIFE 전역 SHWebEditor · ESM · CSS · index.d.ts)를 냅니다. 편집 엔진은 Tiptap 3(ProseMirror, MIT 확장만)이고 UI는 프레임워크 없이 순수 DOM입니다. 후보 비교: ProseMirror 직접(같은 결과를 더 느리게), Lexical + Preact(표가 약함), CKEditor/TinyMCE(UI를 바꾸려면 프레임워크와 싸워야 하고 라이선스 부담) 탈락",
      "공개 API — init({ el, … })이 textarea를 에디터로 바꾸고 값을 동기화. getHTML()(DOMPurify 정제)/setHTML, getDocumentHTML()(페이지 명·문서 배경 포함), setSkin/setUI/setMode/setZoom, loadTemplate/saveTemplate, checkForbidden/checkAccessibility, getElementHTML(id) DOM 관리. 옵션 30여 개(xss · accessibility · forbiddenWords · personalData · manager · mobile · templates · server · spellCheck · onUpload · autosave …)",
      "프레임 — 메뉴바 8 → 툴바 2줄(버튼 67, ResizeObserver로 넘침을 » 로 접기) → 눈금자 → 편집 영역 → 뷰 4종(디자인/HTML/미리 보기/TEXT) → 상태바(글자수 · 배율 50~200%) → 높이 손잡이. 툴바와 메뉴가 같은 명령 객체 134개를 공유해 한 기능이 두 곳에 있어도 정의는 하나. 모든 클래스는 shwe- 접두 + 호스트 CSS 누수 방지 리셋",
      "확장 4층 — ① Tiptap Extension(ParagraphStyle · LetterSpacing · ElementId · Form 노드 3종 · LockGuard · AuditMarks · CharacterCount) ② ProseMirror 플러그인(Decoration으로 접근성·금칙어·개인정보 밑줄, NodeView로 표 손잡이·이미지 8핸들) ③ 순수 UI 모듈 ④ 외부 모듈. '없는 기능'은 반드시 한 층에 떨어지므로 막히지 않습니다",
      "표 — prosemirror-tables TableMap 위에 자체 명령 8묶음(rect · select · structure · style · header · calc · clipboard · index). 업무 문서용 표 HTML(border/cellspacing/인라인 테두리/셀마다 p)을 생성·보존하고, ShweTableView가 손잡이(⊞ 전체 선택 · 8핸들 · 연필 · 끌어 옮기기)를 그립니다. 셀 안에 넣는 표는 담는 셀의 안쪽 폭을 기본 너비로(v1.0.5)",
      "양식 서버(ADR-0003) — Java 21 + Spring Boot 4.1.1 + PostgreSQL 17 + Flyway, docker compose(db + server). 계약 v0: GET /api/health · templates CRUD · POST /api/files(multipart) · GET /api/files/{id}(Range 이어받기) · chunks/complete(청크·이어올리기) · zip. 컨트롤러는 HTTP 매핑만, 서비스 4 + 헬퍼 2, JUnit(H2) 11건. server 옵션이 없으면 양식 버튼만 안 뜨고 코어는 불변",
      "SHWebUpload — 목록/썸네일 · 정렬 · 폴더 구조(path) · 드롭 · 우클릭 · 붙여넣기, XHR 청크 1MB + 이어올리기(uploadId) + 취소, 전송/다운로드 창(전체·파일별 진행률 · 속도 · 남은 시간). 묶음 다운로드는 서버 zip 또는 브라우저 zip 작성기(CRC32 · UTF-8 이름, 의존성 0), 다운로드는 숨은 iframe 폴백(보안 프로그램 환경)",
      "코드 구성(ADR-0006) — src/interfaces/ 타입 전용 10파일, 도메인 단위 분할(대화상자 하나 = 파일 하나, 흐름 하나 = 파일 하나), 호환용 barrel 없음, CSS는 26개 부분 파일을 @import로, 문자열은 i18n 15파일(키 636). 병렬 에이전트 6개가 각자 worktree에서 분할한 뒤 스크립트로 barrel을 걷어냈습니다",
    ],
    sections: [
      {
        title: "표 편집 — 품질 기준 최상위",
        icon: "layers",
        intro: "국내 업무 문서는 결재란과 '표 안의 표'가 기본이라 표가 가장 중요한 기능입니다.",
        items: [
          "새 표 대화상자 3탭(일반 · 배경 및 제목 셀 · 템플릿 12) — 선 모양/종류/색/두께, 셀 간격·안쪽 여백, 테두리 선택 6버튼(바깥쪽만 · 안쪽만 · 모두 · 바깥선 · 안쪽선 · 사용자 지정), 표 제목(caption)·설명(summary), 표 테두리/셀 테두리 분리, 크기 고정",
          "표 대화상자 7종 — 표 속성 · 셀 속성 · 가로줄 · 세로줄 · 가로줄/세로줄 삽입 · 셀 나누기 · 셀 테두리(선 모양/종류/색/두께 + 변 4방향 토글, 전체해제/전체선택)",
          "우클릭 표 메뉴 15항목 + 하위 메뉴(표 도구 · 복사/붙여넣기 · 삽입 · 삭제 · 속성 · 선택 · 셀 크기 조정 · 수직 정렬 · 계산식) — 메뉴바 '표' 메뉴와 정의를 공유",
          "선택 4종 · 너비/높이 같게 · 셀 배경 팔레트 · 표 들여쓰기 · 가로줄 복제 · 표 위/아래 문단 · 텍스트로 변환 · 표 복사/붙여넣기 · 계산식 10종",
          "표 손잡이 — ⊞로 표 전체 선택, 8개 크기 조절 핸들, 연필로 속성 열기, 끌어서 표 옮기기. 제목 셀(th · scope)과 접근성 말풍선으로 스크린리더가 표 구조를 읽을 수 있게",
        ],
      },
      {
        title: "양식(템플릿) — HTML 그대로, 서버 주소 하나로",
        icon: "cloud",
        intro: "진단서·소견서·품의서처럼 '정해진 양식 위에 내용을 채우는' 문서를 위한 기능입니다.",
        items: [
          "양식은 데이터 모델 없이 HTML 문서 그대로 — 필드 스키마를 정의하지 않아도 기존 서식을 그대로 옮길 수 있고, 만드는 도구도 이 에디터 자신(HTML 소스 뷰에서 직접 다듬기)",
          "파일 > 템플릿… — 클래스 트리 + 목록. templates 옵션(내장 HTML · URL fetch · Promise)과 서버 양식이 한 목록에 합쳐지고, 불러오기 전 '작성 중인 문서가 삭제됩니다' 확인",
          "관리자(폼) 모드 manager: true — 툴바 3줄, 입력 요소 8종(텍스트 · 텍스트영역 · 선택 · 체크 · 라디오 · 버튼 · 이미지 · 숨김) · 누름틀 · 표/셀 잠금. 사용자 모드는 잠긴 구조를 고칠 수 없고 값만 입력",
          "양식 서버 계약 — init({ server: { baseUrl } })만 바꾸면 그 프로젝트의 양식 세트가 붙습니다. 다른 언어로 서버를 다시 써도 계약만 맞추면 되도록 Spring Boot 구현은 '기준 구현'",
          "레이아웃 16종 · 자동 저장(localStorage, 최근 10건 불러오기) · 문서 배경 이미지 · 페이지 명 같은 문서 단위 설정은 getDocumentHTML()로 함께 저장. 데모 양식 4종(부서 회의록 · 주간 보고서 · 휴가(조퇴) 신청서 · 품의서)은 결재란이 바깥 표 안에 들어가는 중첩 구조",
        ],
      },
      {
        title: "안전과 검증 — 게시판에 넣어도 되는 HTML",
        icon: "shield",
        items: [
          "XSS — DOMPurify로 getHTML() 출력 전 정제: script/iframe/object/embed 제거, 이벤트 핸들러 전부 제거, javascript: 링크 제거. xss.removeTags/removeEvents 옵션으로 조절",
          "웹 접근성 검증 단계 0·1·2 — 이미지 대체 문자열, 표 제목/설명, 제목 셀 scope, 아이디 중복을 검사해 대화상자에 요소별로 나열하고 본문에 표시(Decoration)",
          "금칙어 목록 · 개인정보(이메일 · 전화 · 주민번호) 탐지 — 밑줄 표시와 삭제/모두 삭제, checkForbidden() API",
          "맞춤법 검사 연동(spellCheck 콜백 → 낱말별 추천 · 일괄 수정 창), 한/영 오토마타 변환, 계산기, 단축키 표(Ctrl+1~6 · F5~F12 · Shift 조합)와 단축키 도움말",
          "호스트 CSS 누수 방지 리셋 + shwe- 접두 — 호스트 페이지의 h1·목록·링크 스타일이 편집 영역을 오염시키지 않고, 반대로 에디터 스타일이 페이지로 새지 않음",
        ],
      },
      {
        title: "디자인 — 실물 실측 토큰과 자체 아이콘",
        icon: "spark",
        intro: "'~풍'으로 만들면 색과 높이가 매번 흔들립니다. 그래서 국내 업무용 상용 에디터의 실물을 픽셀 단위로 실측해 토큰으로 고정했습니다(ADR-0004).",
        items: [
          "실측 절차 — 배포본을 로컬 정적 서버 + Playwright로 렌더해 computed style과 스킨 이미지의 픽셀을 측정(메뉴바 28 · 툴바 28/30 · 버튼 20 · 콤보 88×22 · 탭 75×22 · 상태바 22, 색 20여 개). 자산(js · css · gif)은 한 줄도 가져오지 않음",
          "oh-my-design 디자인 계약 DESIGN.md — 베이스 Upbit(각지고 촘촘한 한국형 업무 UI) + Money Forward 베벨 버튼 + Palantir 밀도, 실측값은 user_reference로. CSS는 --shwe-* 토큰만 참조",
          "툴바 아이콘 64종 자체 SVG — 흰 면 + 1px 픽셀 윤곽 + 강조색 6종. 메뉴 아이콘 · 표 선택 그림 · 제목 셀 그림 · 유튜브 시청 주소 → 임베드 변환까지 같은 결로",
          "대화상자 34종을 실물과 짝 비교 — 라벨 열 · 줄 끝 입력 · 드롭존 · 바닥 버튼 배치, 탭 창 고정 크기, 제목 띠로 화면 어디로든 끌어 옮기기",
          "스킨 13종(blue · green · brown · purple · silver · yellow · orange · darkgray · gray · red · gold · pink · white) — .shwe-root 토큰만 바꾸는 구조, 생성 스크립트로 skins.css 산출. 모바일 모드(UA 판정, iPad는 데스크톱)는 메뉴바 없는 2줄 툴바 + » 묶음 상자 + 전체 폭 대화상자, 댓글 에디터 프리셋은 한 줄 툴바 · 높이 130",
        ],
      },
    ],
    usage: [
      "https://sh-web-editor.coolmarvel.com 접속 — 설치·로그인 없이 데모 페이지에서 바로 써볼 수 있습니다(서버 없는 정적 배포라 업로드는 브라우저 메모리에만 있고 새로 고침하면 사라집니다).",
      "툴바에서 글꼴 · 크기 · 색 · 정렬 · 목록을 쓰고, 표 버튼의 격자로 표를 넣은 뒤 우클릭 메뉴로 행 · 열 · 셀을 편집합니다. 상태바 탭으로 디자인 / HTML / 미리 보기 / TEXT 뷰를 오갑니다.",
      "파일 > 템플릿…에서 회의록 · 휴가신청서 · 품의서 양식을 불러와 그 위에 작성합니다. 파일로 저장 · 인쇄 · 자동 저장 내용 불러오기도 같은 메뉴에 있습니다.",
      "도구 메뉴의 웹 접근성 검증 · 금지어 · 한/영 변환 · 계산기를 쓰고, 환경설정에서 기본 글꼴 · 줄 간격 · 그리드 · 눈금자를 바꿉니다.",
      "아래 파일 업로더에 파일이나 폴더를 끌어 넣고 '전송하기'를 누르면 전송 창이 뜨고, 끝난 파일은 보기 모드 목록으로 옮겨져 열기 · 다운로드 · 전체 다운로드(zip)가 됩니다.",
      "내 페이지에 붙이려면 CSS 1개 + JS 1개를 넣고 SHWebEditor.init({ el: '#content', height: 400 }) 한 줄 — textarea 값이 자동 동기화되고 getHTML()로 정제된 HTML을 받습니다. 양식 서버는 server: { baseUrl } 옵션으로 붙입니다.",
    ],
    aiUsage: [
      "project-seed 킥오프(2026-08-20) — 브리프(왜/무엇 SSOT, '상용 에디터 샘플 기능 전부 + 동일 룩'이 v1.0 기준) · ADR · 부팅 프로토콜 · hooks(env-guard · git-add-guard · Prettier 자동 포맷) 가동. pnpm verify(typecheck + lint + test + build) 통과 전엔 커밋·전달 없음, PATCH는 수정 하나마다 +1, MINOR 승격은 사용자가 선언한 시점에만",
      "실물 실측 하네스 — 벤치마킹 대상을 기억으로 흉내 내지 않고 배포본을 로컬 서버 + Playwright로 띄워 computed style · 픽셀을 측정해 DESIGN.md 토큰으로 고정. 재대조 절차를 문서화해 세션이 바뀌어도 같은 방법으로 다시 잰다",
      "스크린샷 피드백 15회차 — 사용자가 feedback/ 폴더에 스크린샷을 두면 미처리 피드백으로 간주, '지적 → 반영' 표를 아카이브 README로 남기고 계획 체크리스트를 갱신. 대화상자 34종 짝 비교 · 툴바 아이콘 64종 재작도 · 중첩 표 너비 버그가 이 루프에서 나옴",
      "병렬 에이전트 리팩토링(ADR-0006) — 영역별 6 에이전트가 각자 git worktree에서 파일 소유권을 나눠 분할하고, 옛 경로는 barrel로 유지해 충돌 없이 병합한 뒤 스크립트로 barrel을 제거. 동작 · 공개 API · dist 산출물 불변을 전제로 155파일 구조를 확립",
      "Playwright MCP 브라우저 QA — 툴바 동작 · 룩 · 실물 대조를 브라우저에서 직접 검증하고 끝나면 닫는다. 함정 박제 14항목(jsdom 고정 · TextAlign 기본값 금지 · 툴바 mousedown preventDefault · flex:1 함정 · pkill이 자기 셸을 죽임 등)을 '규칙 한 줄 + 근거'로 CLAUDE.md에 기록",
      "규칙을 시스템으로 — 화면 문자열에 벤치마킹 대상 이름 금지, 상용 자산 미복사, .env · 서버 주소 · 키를 공개 저장소에 두지 않는 배포 스크립트(pnpm deploy:site → scp → caddy validate → reload). 이 포트폴리오 페이지의 스크린샷 22장도 Playwright로 라이브 데모를 자동 조작해 33개 항목을 검사하며 캡처했습니다",
    ],
    screenshots: [
      { src: "/images/projects/sh-web-editor/editor.jpg", caption: "첫 화면 — 메뉴바 8개 · 툴바 2줄(버튼 67) · 편집 영역 · 상태바(디자인/HTML/미리 보기/TEXT 탭 · 글자수 · 배율). 굴림 12pt · 직각 · 1px 헤어라인의 클래식 업무 UI" },
      { src: "/images/projects/sh-web-editor/editor-formatted.jpg", caption: "서식 · 목록 · 정렬 · 표 — 굵게/기울임/밑줄/글자색, 글머리 기호, 가운데 정렬, 격자로 넣은 표(4행 5열). 표가 선택되면 1줄 툴바의 표 도구가 활성화됩니다" },
      { src: "/images/projects/sh-web-editor/table-context-menu.jpg", caption: "표 안 우클릭 메뉴 15항목 — 표 삽입 · 선택 · 들여쓰기, 셀 합치기/나누기, 하위 메뉴(표 도구 · 복사/붙여넣기 · 삽입 · 삭제 · 속성 · 선택 · 셀 크기 조정 · 수직 정렬 · 계산식). 왼쪽 위 ⊞가 표 손잡이" },
      { src: "/images/projects/sh-web-editor/new-table-dialog.jpg", caption: "새 표 대화상자 — 일반 · 배경 및 제목 셀 · 템플릿 3탭. 선 모양/종류/색/두께, 셀 간격 · 안쪽 여백, 테두리 선택 6버튼, 표 제목(caption) · 설명(summary)" },
      { src: "/images/projects/sh-web-editor/cell-props-dialog.jpg", caption: "셀 속성 — 너비 · 높이 · 정렬 · 줄 바꿈, 제목 셀 · scope(접근성), 선 속성과 변 선택. 배경 탭에서 색 · 이미지" },
      { src: "/images/projects/sh-web-editor/cell-border-dialog.jpg", caption: "셀 테두리 — 선 모양 · 종류 · 색상 · 두께에 변 4방향 토글, 전체해제/전체선택" },
      { src: "/images/projects/sh-web-editor/template-dialog.jpg", caption: "파일 > 템플릿… — 왼쪽 클래스 트리(부서양식 · 총무), 오른쪽 양식 목록. 서버가 붙으면 서버 양식이 같은 목록에 합쳐집니다" },
      { src: "/images/projects/sh-web-editor/template-loaded.jpg", caption: "휴가(조퇴) 신청서 양식을 불러온 화면 — 결재란(담당 · 팀장 · 사장)이 바깥 표 안에 들어간 중첩 표. 양식은 HTML 그대로라 기존 서식을 그대로 옮길 수 있습니다" },
      { src: "/images/projects/sh-web-editor/template-html-view.jpg", caption: "같은 양식의 HTML 뷰 — 들여쓰기된 소스를 직접 고칠 수 있어 양식 관리자가 이 에디터로 양식을 만듭니다" },
      { src: "/images/projects/sh-web-editor/view-html.jpg", caption: "HTML 소스 뷰 — 표 HTML을 border/cellspacing/인라인 style/셀마다 p 형태로 생성 · 보존" },
      { src: "/images/projects/sh-web-editor/image-dialog.jpg", caption: "이미지 대화상자 — 일반 · 하이퍼링크 · 테두리 3탭, 파일 드롭존/URL 입력, 대체 문자열(접근성 필수), 크기 · 정렬 · 여백" },
      { src: "/images/projects/sh-web-editor/settings-dialog.jpg", caption: "환경설정 — 페이지 명 · 인코딩 · 언어 · 줄 바꿈 기준 · 자동 저장 · 자동 글머리 · 기본 글꼴/크기/줄 간격 · 문서 유형 · 눈금자 · 그리드 등 22개 필드" },
      { src: "/images/projects/sh-web-editor/a11y-dialog.jpg", caption: "웹 접근성 검증 — 표 제목/설명 없음, 이미지 대체 문자열 없음을 요소별로 나열하고 본문에 표시" },
      { src: "/images/projects/sh-web-editor/skins.jpg", caption: "스킨 13종 중 green · purple · darkgray · pink — 토큰만 바뀌고 배치는 동일" },
      { src: "/images/projects/sh-web-editor/reply-editor.jpg", caption: "댓글 에디터 프리셋 — 메뉴바 없이 한 줄 툴바, 디자인/미리 보기 탭, 높이 130" },
      { src: "/images/projects/sh-web-editor/manager-mode.jpg", caption: "관리자(폼) 모드 — 툴바 3줄째에 입력 요소 8종(텍스트 · 텍스트영역 · 선택 · 체크 · 라디오 · 버튼 · 이미지 · 숨김) · 누름틀 · 너비/높이 같게 · 표/셀 잠금" },
      { src: "/images/projects/sh-web-editor/uploader-list.jpg", caption: "파일 업로더(SHWebUpload) — 목록 · 크기 · 체크박스, 최대 개수/용량 제한, 파일 추가 · 전송하기 · 항목 제거" },
      { src: "/images/projects/sh-web-editor/transfer-window.jpg", caption: "전송 창 — 전체 진행률, 전송 파일 수 · 용량 · 속도 · 남은 시간, 파일별 진행률과 상태. 취소하면 보낸 청크를 기억했다가 이어 올립니다" },
      { src: "/images/projects/sh-web-editor/uploader-view-preview.jpg", caption: "보기 모드 업로더 — 전송이 끝난 파일이 쌓이고 열기 · 다운로드 · 전체 다운로드(zip). 이미지를 고르면 미리보기 창이 옆에 뜹니다" },
      { src: "/images/projects/sh-web-editor/demo-page.jpg", caption: "공개 데모 페이지 전체 — 에디터 · 댓글 에디터 · 업로더(스킨 매니저) · 보기 모드 업로더. 서버 없이 정적 파일 3개로 배포" },
      { src: "/images/projects/sh-web-editor/mobile.jpg", caption: "모바일 모드(iPhone UA 판정) — 메뉴바 없이 2줄 툴바, 디자인/미리 보기 탭, 가로 스크롤 없음" },
      { src: "/images/projects/sh-web-editor/mobile-more.jpg", caption: "모바일 » 묶음 상자 — 넘친 툴바 항목(삽입 · 표 · 검사 도구)을 한 상자로 모아 보여줍니다" },
    ],
    demo: {
      url: "https://sh-web-editor.coolmarvel.com",
      note: "실제 운영 중인 공개 데모입니다. 서버 없이 정적 파일(JS · CSS · HTML)만 배포해 양식은 내장 샘플 4종, 이미지는 base64, 업로드는 브라우저 메모리에 두고 새로 고침하면 사라집니다. 로그인 · 설치 없이 표 편집 · 양식 불러오기 · 업로더 · 스킨을 바로 써볼 수 있습니다. 저장소는 비공개(독점 라이선스)이며, 양식 서버(Spring Boot)는 저장소의 docker compose로 기동합니다.",
    },
    links: [{ label: "sh-web-editor.coolmarvel.com 접속", href: "https://sh-web-editor.coolmarvel.com" }],
    privateRepo: true,
  },

  "remote-assist": {
    role: "개인 프로젝트 — 브리프·설계·클라이언트 4종·중계 서버·배포·인스톨러 전 과정",
    background: [
      "PC 문제가 생기면 담당자가 자리까지 가거나 전화로 화면을 설명받으며 해결해야 하고, 퇴근 후나 출장 중에는 내부 PC를 볼 방법이 없습니다. 상용 원격 도구는 라이선스 비용이 들고, 남의 서버를 경유해 화면이 밖으로 나간다는 부담이 있습니다. 그래서 '접속 코드 하나로 붙고, 사용자가 수락해야만 열리고, 양쪽 누구든 한 번에 끊는' 원격 지원 앱을 직접 만들었습니다. 첫 사용처는 재직 중인 병원 전산실이지만 문구와 설계는 일반 원격 지원으로 두었습니다.",
      "구성은 사용자용 Agent(코드 표시·수락/거절·화면 공유·끊기)와 지원자용 Console(코드 입력·실시간 보기·마우스/키보드 제어·모니터 선택·파일 전송), 그리고 두 쪽을 잇는 중계 Server(Docker)입니다. 양쪽 모두 서버로 나가는 연결만 맺으므로 어느 쪽 NAT·방화벽도 열 필요가 없고, 원내↔원내·외부↔원내·원내↔외부·외부↔외부 네 조합이 코드 변경 없이 동작합니다. 사용자는 코드를 읽어 주는 것 말고는 아무 설정도 하지 않습니다.",
      "2026-09-04 킥오프 뒤 4일 동안 M1 화면 보기 → M2 입력 제어 → 파일 전송 → 성능 개편(DXGI·H.264·적응·직결) → macOS 클라이언트 → 진단·안정화까지 v0.1.15에 이르렀고, 실제 두 PC 사이 접속·제어·파일 전송을 육안으로 확인했습니다. 코드 약 17,700줄(Core 6,200 · Windows 앱 5,500 · Mac 앱 1,900 · Server 640 · 테스트 3,500), 테스트 217개, ADR 6건입니다.",
    ],
    architecture: [
      "C#/.NET 8 한 언어 — Core(플랫폼 중립 프로토콜·타일 차분·JPEG 코덱·적응 품질·2채널 링크·세션 상태 머신) / Server(ASP.NET Core Minimal API + WebSocket) / Agent·SupportConsole(WPF) / Agent.Mac·SupportConsole.Mac(Avalonia 11). 프레임 헤더·제어 메시지 DTO를 Core 하나로 공유해 프로토콜 변경이 한 곳에서 끝납니다",
      "중계 서버는 바이트만 통과 — 6자리 코드 발급(암호학적 난수, 10분 TTL, 1회용) → 역할×채널 4소켓 짝짓기 → 프레임·제어 메시지를 해석 없이 상대에게 전달. 세션당 32KB×2 ArrayPool 버퍼, 동시 세션 상한 50, SignalR 대신 순수 WebSocket(고빈도 바이너리에 직렬화 계층은 낭비)",
      "화면 파이프라인 — DXGI Desktop Duplication으로 바뀐 사각형만 GPU→CPU 복사(정지 화면 CPU 0) → 64px 타일 차분 → 바뀐 타일이 적으면 JPEG 타일, 전면 갱신이면 Media Foundation H.264(HW 우선) 전체 프레임. DXGI·H.264가 안 되면 GDI·JPEG로 자동 폴백하고, 디코더가 실제로 못 풀면 세션 중 codec 재협상으로 JPEG 전환",
      "회선 적응 5단계(Ultra → Survival) — RTT·처리량·큐 지연을 보고 JPEG 품질 85→45, fps 30→10, 해상도 1.0→0.5, 비트레이트 8000→800kbps를 함께 조절. 커서는 프레임에 굽지 않고 위치(60Hz, 12바이트)·모양만 따로 보내 Console이 로컬 커서로 그립니다 — 마우스 지연 체감 제거",
      "화면/제어 2채널 — 입력·커서·ping·codec 협상은 별도 소켓이라 클릭이 프레임 뒤에서 기다리지 않습니다. 같은 망이면 양쪽이 임의 포트 리스너를 열고 세션마다 RSA 2048 자체 서명 TLS + 토큰으로 직결하며, 인증서 SHA-256 지문을 중계 경유로 먼저 고정해 LAN 중간자를 막습니다(서버 트래픽 0)",
      "입력 제어 — 좌표를 선택 모니터 기준 0..65535로 정규화해 보내고 Agent가 가상 데스크톱 절대 좌표로 환산(음수 원점 모니터 지원). 최대 64개 배치 전송, 느린 회선에선 꼬리 마우스 이동만 병합(클릭·키는 절대 안 버림). 포커스 이탈·끊김 시 눌린 키 자동 해제, '단축키 전달' 옵션은 저수준 훅으로 Win·Alt+Tab까지",
      "크로스플랫폼(ADR-0005) — 세션 흐름(코드 발급 → 2채널 연결 → offer/accept → 캡처 루프 → 입력 주입 → 파일 전송 → 직결 → 종료)을 Core로 옮기고 OS 의존은 IAgentPlatform(모니터·캡처·인코더·입력 주입·커서) 뒤로. 맥은 CoreGraphics 캡처·CGEvent 주입이며, hello의 caps·os 필드로 H.264 가능 여부와 키 관습(Ctrl↔⌘)을 협상합니다",
      "파일 전송 — 256KB 청크, 4GB 상한, .part 후 이름 변경, 경로 탈출·금지 문자·중복 이름 처리, 취소·끊김 시 정리. 다중 모니터는 monitors 목록 → select-monitor 즉시 전환 + 키프레임. 공유 중에는 모니터 사면 빨간 테두리와 상단 배너(클릭 통과)로 사용자에게 알립니다",
    ],
    sections: [
      {
        title: "보안 — 인터넷에 노출된 중계 서버의 대가",
        icon: "shield",
        intro: "중계 서버가 인터넷에 있으니 '누가 붙을 수 있는가'를 서버와 클라이언트 양쪽에서 강제합니다.",
        items: [
          "사용자 수락 없이는 아무것도 공유되지 않음 — 거절하면 세션이 생기지 않고, 수락 뒤에도 양쪽 누구든 즉시 끊기",
          "접속 코드는 6자리 암호학적 난수, 10분 안에 안 쓰면 만료, 세션이 끝나면 소멸(같은 코드 두 번째 접속은 거부)",
          "클라이언트는 HTTPS/WSS만 — TLS 종단은 기존 Caddy(Let's Encrypt 자동 갱신), 앱 서버는 인증서를 모른 채 Docker 뒤 평문",
          "직결은 세션마다 새 자체 서명 인증서 + 토큰, 지문은 중계로 먼저 전달해 고정 — 같은 망의 다른 장비가 끼어들 수 없음",
          "컨테이너는 read-only 루트·비루트·no-new-privileges·pids 제한, 메모리 상한 160MB(실측 유휴 42MB)",
          "주입 입력은 Windows 보안 데스크톱(Ctrl+Alt+Del·UAC)에 닿지 않음 — OS 경계를 넘지 않는 설계",
        ],
      },
      {
        title: "성능 — RDP급을 목표로 한 다섯 가지",
        icon: "layers",
        intro: "'툭툭 끊긴다'는 첫 피드백에서 출발해 plan-0002 0~4단계를 한 번에 구현했습니다(ADR-0004).",
        items: [
          "DXGI Desktop Duplication — dirty/move rect만 복사, 정지 화면은 CPU 0. HDR·회전 모니터는 GDI 폴백",
          "H.264 하이브리드 — 바뀐 타일이 임계(20~40%) 미만이면 JPEG 타일, 이상이면 하드웨어 H.264. FFmpeg 대신 Media Foundation을 써 추가 DLL 0",
          "적응 제어기 — 5단계 프로파일로 품질·fps·해상도·비트레이트를 함께 내리고 올림. Console 상태 줄에 경로·fps·MB/s·RTT·코덱/캡처·단계를 상시 표시",
          "커서 분리 — 위치 60Hz 12바이트 + 모양 변경 시에만 비트맵. 프레임 지연과 무관하게 마우스가 즉시 따라옴",
          "핫패스 할당 제거(v0.1.14) — 프레임마다 생기던 LOH 배열·수신 목록·펌프 배열 제거, 변화 없는 프레임의 전체 복사 제거, 다운스케일 열 계산 캐시. 와이어 형식 불변",
        ],
      },
      {
        title: "UI — 컴팩트 클래식 (Upbit 베이스 + 업무 도구 실측 색)",
        icon: "spark",
        intro: "첫 육안 검증에서 '색상이나 UI가 구리다'는 피드백과 함께 매일 쓰는 업무 도구 스크린샷 3장을 받았습니다(ADR-0003).",
        items: [
          "oh-my-design 카탈로그 440개를 '밀도 키워드 × 라운드'로 훑어 베이스 Upbit(직각·12px dense·1px 헤어라인), 차용 Money Forward 베벨 버튼 + Palantir 밀도 원칙",
          "색은 사용자가 준 스크린샷을 PIL로 실측 — 창 바탕·헤더·버튼 면·테두리·패널·구분선·대기 상태 노랑. 라운드 0, 굴림 12px, 컨트롤 높이 24",
          "WPF-UI(Fluent·Mica) 제거 → WPF 기본 컨트롤 + Tokens.xaml. 맥은 같은 토큰을 Tokens.axaml로 — 두 OS가 같은 결로 보임",
          "상태는 배지 하나로(지원자 대기 중 · 수락 대기 · 연결됨 · 종료), 수락/거절 버튼만 크고 분명하게",
        ],
      },
      {
        title: "플랫폼 작업 정책 — Windows 세션과 맥 세션이 서로 망치지 않게",
        icon: "cloud",
        intro: "같은 날 WSL·맥 세션이 번갈아 진행되며 사고가 났습니다 — 맥에서 재현 없이 Windows 경로를 추정 수정한 오진, 맥에서만 돌린 테스트가 WSL에서 네이티브 누락으로 실패(ADR-0006).",
        items: [
          "플랫폼 전용 코드는 그 OS에서 재현·검증할 수 있을 때만 로직을 바꾼다 — 다른 OS 세션은 폴백·계측 추가와 '미검증' 표기까지만",
          "산출물은 그 OS에서만 굽는다(exe = WSL, dmg = 맥). 버전을 올리면 상대 OS 재빌드를 todo에 남긴다",
          "검증은 항상 전체 솔루션(build · test · format)이 세 OS 어디서든 통과해야 한다. 솔루션 필터는 편의일 뿐",
          "런타임 폴백이 마지막 안전망 — 플랫폼 전용 경로는 자동 폴백을 갖고, 디코더가 실제로 못 풀면 세션 중 codec 재협상",
          "접속 문제는 실서버 docker logs와 양쪽 PC의 진단 로그(%LOCALAPPDATA%)를 먼저 본다. Windows .NET 스택만 재현할 땐 콘솔 하네스 exe를 /mnt/c로 퍼블리시해 WSL에서 실행",
        ],
      },
    ],
    usage: [
      "사용자가 Agent를 실행하면 접속 코드 여섯 자리가 크게 표시됩니다 — 전화로 지원자에게 읽어 줍니다",
      "지원자가 Console에 이름과 코드를 입력하고 '접속'을 누르면, 사용자 화면에 '○○ 님이 이 PC 화면을 보고 조작하려고 합니다' 수락 요청이 뜹니다",
      "사용자가 '수락'하면 Agent 창은 최소화되고 모니터 가장자리에 빨간 테두리와 '원격 제어 중' 배너가 뜹니다. 거절하면 아무것도 공유되지 않습니다",
      "지원자는 뷰어에서 실시간 화면을 보며 마우스·키보드로 조작하고, 모니터 탭으로 볼 화면을 고르고, '파일 보내기'나 드래그 앤 드롭으로 파일을 보냅니다",
      "상태 줄에서 경로(직결/중계)·fps·MB/s·RTT·코덱과 회선 단계를 확인합니다. 화면이 안 나오면 3초 안에 JPEG로 내려가고 키프레임을 다시 요청합니다",
      "양쪽 누구든 '연결 끊기'로 종료하면 상대에게도 즉시 알려지고, 사용자는 '새 코드 받기'로 다음 세션을 준비합니다",
    ],
    aiUsage: [
      "project-seed(자체 발사대) 템플릿으로 2026-09-04 킥오프 — 브리프(왜/무엇 SSOT)·세션 부팅 프로토콜·ADR·세션 로그·hooks(.env 편집 차단, git add -A 차단, 편집 후 dotnet format)를 첫날부터 가동. 검증 명령 build·test·format 3종 통과 전엔 커밋하지 않음",
      "ADR 6건 — 하네스 엔지니어링, 스택(WPF·중계·Caddy·WebSocket·SQLite·GDI+JPEG에서 시작), 컴팩트 클래식 UI, 성능 아키텍처, 크로스플랫폼(세션 로직 Core 이관), 플랫폼 작업 정책. 대안과 기각 사유까지 남겨 세션이 바뀌어도 같은 논쟁을 반복하지 않음",
      "증거 기반 디버깅을 규칙으로 — '다른 PC에서 접속이 안 된다'는 피드백에 실서버 로그로 제어 채널 미등록을 먼저 확인하고, 종단 테스트·실서버 스모크·Windows 콘솔 하네스(Core + 가짜 플랫폼을 /mnt/c로 퍼블리시해 WSL에서 실행)로 세 갈래 재현 후, 원인 확정 전엔 계측과 자동 복구만 추가(v0.1.15)",
      "피드백 아카이브 — 사용자 스크린샷·로그·설계서를 docs/feedback-archive/날짜-주제/로 보관하고 판정·조치를 README로 남김. 검은 화면 한 건은 로그로 직결 페어링 버그를 확정해 수정(v0.1.12)",
      "함정 박제 14항목 — MFT 디코더의 stream change 뒤 같은 호출에서 ProcessOutput 재시도, Vortice 샘플 이중 Release, 직결 페어링 헤더, SetCapture와 주입 클릭, SkiaSharp Linux 네이티브 누락 등 실제로 한 번씩 밟은 지뢰만 CLAUDE.md에 기록",
      "이 페이지의 스크린샷도 하네스로 — WPF는 WSL에서 실행되지 않으므로 Windows interop으로 Agent·Console을 띄우고, UI Automation + PowerShell로 코드 발급 → 접속 → 수락 → 모니터 전환 → 끊기까지 자동 조작해 각 상태를 캡처했습니다(중계 서버는 WSL의 로컬 인스턴스)",
    ],
    screenshots: [
      { src: "/images/projects/remote-assist/console-viewer.jpg", caption: "지원자용 Console 뷰어 — 사용자 PC의 모니터 2를 보며 조작 중. 상단은 상태 배지·모니터 탭·파일 보내기·단축키 전달·연결 끊기, 하단 상태 줄은 경로(중계) · fps · MB/s · RTT · 코덱/캡처(JPEG/DXGI) · 적응 단계(High)" },
      { src: "/images/projects/remote-assist/user-side-fullscreen.jpg", caption: "사용자 PC 쪽 — 수락하면 모니터 가장자리에 빨간 테두리와 상단 '원격 제어 중' 배너(클릭 통과)가 뜨고, Agent 창은 '원격 제어 중' 패널로 바뀝니다(파일 보내기 · 연결 끊기)" },
      { src: "/images/projects/remote-assist/agent-states.jpg", caption: "사용자용 Agent 네 단계 — 접속 코드 표시 → 수락 요청(누가 조작하려는지) → 원격 제어 중(중계/직결 표시) → 종료(새 코드 받기). 컴팩트 클래식 UI(굴림 12px · 라운드 0 · 베벨 버튼)" },
      { src: "/images/projects/remote-assist/console-connect.jpg", caption: "Console 접속 화면 — 지원자 이름과 여섯 자리 코드만 입력합니다. 이름은 다음 실행 때 기억됩니다" },
      { src: "/images/projects/remote-assist/console-waiting.jpg", caption: "수락 대기 — 코드를 입력한 뒤 사용자가 수락할 때까지 아무것도 보이지 않습니다" },
      { src: "/images/projects/remote-assist/agent-offer.jpg", caption: "수락 요청 — 지원자 이름을 보여 주고, 수락해야만 화면 공유와 제어가 시작됩니다. 잘못 누르지 않도록 수락 버튼은 표시 직후 잠깐 비활성" },
      { src: "/images/projects/remote-assist/agent-code.jpg", caption: "접속 코드 — '복사' 버튼은 Win32 클립보드 API로 즉시 복사(WPF 클립보드의 1초 멈춤 문제를 우회, v0.1.10)" },
      { src: "/images/projects/remote-assist/agent-sharing.jpg", caption: "원격 제어 중 — 누가 조작하는지와 경로(중계 서버 경유 / 같은 망 직결)를 표시하고, 파일 보내기와 연결 끊기를 제공합니다" },
    ],
    demo: {
      note: "조직 내부용 도구라 저장소와 인스톨러는 공개하지 않습니다. 중계 서버는 직접 운영 중이며(Docker + Caddy, 다른 서비스와 같은 호스트에 공존) 공개 서비스가 아닙니다. 스크린샷은 WSL의 로컬 중계 서버에 Windows Agent·Console을 붙여 같은 PC에서 촬영했고, 공유 화면에는 이 포트폴리오 페이지를 띄웠습니다. macOS 앱(Avalonia)은 같은 토큰으로 같은 화면 구성을 갖습니다.",
    },
    privateRepo: true,
  },

  "pdf-editor-live": {
    role: "개인 프로젝트 — 모노레포 설계·API/웹 구현·인프라 구축·CI/CD·운영 전체",
    background: [
      "데스크톱 PDF 편집기(pdf-editor)는 \"문서가 밖으로 나가지 않는다\"는 장점이 있지만 설치가 필요하고, 포트폴리오로는 링크 하나로 바로 써볼 수 있는 형태가 더 설득력 있습니다. 그래서 같은 에디터를 브라우저에서 돌리되 원칙은 유지하기로 했습니다 — PDF 바이트는 서버로 가지 않고, 서버는 '누가·몇 번'만 관리합니다.",
      "서버는 AWS Lightsail 2GB 인스턴스 1대에 다른 프로젝트 2~3개와 함께 올려야 해서 메모리 예산이 1급 제약이었습니다. 이 제약이 스택 선택(Fastify·Caddy·공용 Postgres·저메모리 튜닝)과 배포 방식(서버에서 빌드 금지, CI가 이미지를 만들어 전송)을 결정했습니다.",
      "2026-08-25 설계(ADR-0001)에서 시작해 08-26 최초 운영 배포, 08-28 구독 모델·소셜 로그인·SEO까지 4일간 11차례 스크린샷 피드백 라운드를 돌며 완성했습니다.",
    ],
    architecture: [
      "npm 워크스페이스 모노레포 — apps/web(Vite+React SPA) · apps/api(Fastify 5 + Drizzle ORM) · packages/editor(에디터 코어) · infra/server(공용 Caddy·Postgres) · infra/app(이 서비스의 compose)",
      "에디터 코드 공유 — 데스크톱의 src/core·renderer를 packages/editor로 복사하고, Electron 전용 window.api 호출 5종을 Platform 인터페이스(beforeExport/afterExport/quoteExport/finishDialog/signStore …)로 치환. 웹은 File API·Blob 다운로드·iframe 인쇄로 구현하고 gatedExport() 래퍼가 401→로그인, 402→요금제로 안내",
      "데이터 모델 13 테이블 / 마이그레이션 7개 — users(soft delete·환영 체험 1회 기록) · oauth_accounts · sessions(리프레시 회전) · plans · subscriptions · credit_ledger(append-only 원장) · export_tokens · drafts/draft_docs(서버 임시본) · signatures(서명함) · usage_events",
      "REST API 약 42개(/api/v1) — auth·oauth·billing·credits·exports·drafts·signatures·activity·admin·usage·health 11개 모듈, zod 타입 프로바이더로 요청/응답 스키마 검증, rate limit(로그인 10회/15분)",
      "내보내기 토큰 패턴 — 견적(quote) → 토큰 발급 → 브라우저에서 생성한 결과물 업로드 → 소비(consume). 미소비 토큰은 10분 뒤 자동 환불 잡. 결과물·임시본은 20MB/파일 · 200MB/사용자 · 30일 보관",
      "메모리 예산 — 목표 caddy 30 · postgres 70 · api 70MB. Postgres는 shared_buffers 64MB·max_connections 30, API는 커넥션 풀 3 + node --max-old-space-size=128. 실측 API RSS 83~85MB, caddy 13MB, postgres 22MB",
    ],
    sections: [
      {
        title: "인증 · 소셜 로그인 (OAuth 2.0)",
        icon: "shield",
        intro: "이메일 가입과 Google · Kakao · Naver 소셜 로그인을 모두 서버측에서 처리합니다.",
        items: [
          "이메일 가입 — argon2id(19MiB, t=2) 해시, 비밀번호 규칙(8자+소문자+숫자+특수문자), GET /auth/check-email 실시간 중복 확인",
          "세션 — 액세스 JWT 15분(메모리 보관) + 리프레시 30일(httpOnly·Secure·SameSite=Lax 쿠키, 경로 /api/v1/auth). 리프레시는 매번 회전하고 재사용이 감지되면 401. Redis 없이 sessions 테이블로 관리",
          "OAuth 흐름 — /auth/oauth/:provider/start → provider 동의 화면 → /auth/oauth/:provider/callback 에서 authorization code를 서버가 교환. provider별 어댑터({authorizeUrl, exchange, profile})로 Google·Kakao·Naver 차이를 흡수",
          "CSRF 방어 — state 값을 10분짜리 서명 JWT로 만들어 httpOnly 쿠키(pdf_oauth_state)에 두고 콜백 쿼리와 대조",
          "계정 매칭 순서 — ① oauth_accounts 일치 → ② 같은 이메일의 활성 계정에 자동 연동(계정 통합) → ③ 신규 생성(비밀번호 null). 로그인 중 시작하면 '연동' 모드로 마이페이지에서 provider를 추가",
          "오류 처리 — /login?oauth=state_invalid|exchange_failed|no_email|provider_disabled|account_deleted 로 사용자에게 원인을 그대로 전달. e2e 전용 mock provider(OAUTH_MOCK)로 소셜 로그인 6건을 자동 테스트",
          "탈퇴는 soft delete — 세션·구독·임시본·서명·소셜 연동·파일을 지우고 users 행(이메일 점유)은 남겨 재가입 시 환영 체험이 다시 주어지지 않게 함. 모든 요청에서 deleted_at 확인",
        ],
      },
      {
        title: "구독 · 결제 모델",
        icon: "card",
        intro: "편집과 미리보기는 무료, 돈을 받는 순간은 결과물이 나갈 때뿐입니다.",
        items: [
          "요금제 — 환영 체험(trial, 14일·가입 시 자동·이메일당 평생 1회) · 월 6,900원 · 연 59,000원. 요금제는 기동 시 upsert 되는 시드 데이터",
          "판정(quoteCharge) — 관리자 > 활성 구독(trial 포함) > 없음. 없으면 402 subscription_required 를 돌려주고 웹은 요금제 페이지로 안내",
          "결제 게이트웨이는 PaymentProvider 인터페이스 뒤에 두고 현재는 mock provider. Toss Payments 테스트 모드 연동이 다음 단계(ADR D7)",
          "credit_ledger 는 append-only 원장(잔액 = SUM). 구독 전환 이후 신규 적립·차감은 없고 작업 내역 타임라인에서 과거 이력으로만 표시",
        ],
      },
      {
        title: "SEO — SPA에서 검색 노출까지",
        icon: "search",
        intro: "SSR 없이도 크롤러가 라우트별 제목·설명·OG를 읽도록 빌드 후 프리렌더를 붙였습니다.",
        items: [
          "index.html — title/description/keywords(ko+en), canonical, hreflang(en/ko/x-default), theme-color, robots",
          "Open Graph / Twitter 카드 + og.png(1200×630) — 카카오톡·슬랙 링크 미리보기. 파비콘 세트(svg/ico/png/apple-touch/PWA manifest)는 sharp 스크립트가 icon.svg 에서 생성",
          "JSON-LD WebApplication 구조화 데이터 — offers(6,900/59,000 KRW), author Person",
          "라우트별 프리렌더 — 빌드 후 scripts/seo-postbuild.mjs 가 /pricing /signup /terms /privacy /login 의 index.html 을 생성해 제목·설명·canonical·og 를 치환(/login 은 noindex) + sitemap.xml 생성. Caddy try_files 가 정적 파일을 우선 서빙",
          "robots.txt — /me /admin /api/ /oauth/ 차단, Sitemap 링크. SPA 안에서도 라우트마다 탭 제목 갱신",
          "Google Search Console · 네이버 서치어드바이저 소유 확인, 다음 검색 등록 완료. 네이버 진단에 맞춰 제목 40자·설명 80자 이내로 축약",
        ],
      },
      {
        title: "인프라 · 배포 — AWS Lightsail + Caddy 리버스 프록시",
        icon: "cloud",
        intro: "2GB 서버 한 대를 프로젝트 여러 개가 나눠 쓰는 구조입니다.",
        items: [
          "서버 — AWS Lightsail(서울, ap-northeast-2) Ubuntu 22.04 · 2 vCPU · 1.9GB RAM · swap 2GB. *.coolmarvel.com 와일드카드 A 레코드로 서브도메인마다 프로젝트를 붙임",
          "Caddy — pdf-editor.coolmarvel.com 사이트 블록에서 handle /api/* → reverse_proxy pdf-live-api:3000, 나머지는 정적 dist 를 직접 서빙(try_files … /index.html, /assets/* 1년 immutable 캐시, index.html no-cache). Let's Encrypt TLS 자동 발급·갱신, h1/h2/h3, zstd/gzip, HSTS·nosniff·Referrer-Policy 공통 스니펫. 프론트 컨테이너는 없음",
          "공용 vs 앱별 compose — infra/server(edge-caddy 96MB · edge-postgres 256MB, 외부 도커 네트워크 edge)는 서버 공용이고, 각 프로젝트는 infra/app 의 compose(pdf-live-api 192MB)로 edge 네트워크에 참여만 함. DB 포트는 loopback 전용",
          "호스트 튜닝 — vm.swappiness=10, journald 100M, 도커 json-file 로그 10m×3 + live-restore",
          "CI(ci.yml) — npm ci → typecheck → test(Postgres 서비스 컨테이너) → build → 도커 이미지 빌드 확인",
          "CD(deploy.yml, main push) — 웹 빌드 → API 이미지 docker build + docker save | gzip → compose/Caddyfile/dist 를 rsync(--inplace) → 서버에서 원자적 mv 스왑 → docker load → docker compose up -d --remove-orphans → /healthz 확인. 서버에서는 빌드하지 않고(2GB), 앱 비밀은 서버 .env 에만 둠. private 레포라 레지스트리(GHCR) 대신 이미지를 직접 전송",
        ],
      },
      {
        title: "에디터 기능",
        icon: "layers",
        items: [
          "툴바 13개 — 페이지(사이드바)·선택·실행취소·다시실행·텍스트(추가/수정 스플릿)·지우개·형광펜·연필·이미지/스탬프·사각형/원·표시(X/체크)·주석 도구(서명/주석/링크)·워터마크·레이아웃(한 쪽/두 쪽/맞춤, 이어서/한 장씩, 회전)·페이지 관리",
          "페이지 관리 — 드래그 순서 변경·회전·복제·삭제·추출·새 페이지·PDF/이미지 가져오기",
          "텍스트 — 원본 서체·굵기·기울임 승계, 정렬 6종, 글자색/배경색/불투명도, 번들 폰트 16종 + 시스템 폰트",
          "서명 — 그리기/타이핑/이미지 + 계정 서명함(서버 저장) + 투명 PNG 내려받기. 스탬프 프리셋·날짜, 주석 노트, 링크 영역, 워터마크, 문서 텍스트 검색(Ctrl+F)",
          "내보내기 — 다운로드(pdf-lib 평탄화)·인쇄(숨김 iframe)·페이지 추출, 30초 자동 임시 저장과 '이어서 작업하기', 작업 내역에서 30일간 재다운로드",
          "모바일 — 터치 40px 타깃, 핀치는 에디터 줌, 툴바 가로 스크롤, 가로 모드 서브툴바 오버레이. 한국어/영어 i18n",
        ],
      },
    ],
    usage: [
      "https://pdf-editor.coolmarvel.com 접속 — 별도 설치 없이 브라우저에서 바로 동작합니다.",
      "이메일로 가입하거나 Google · Kakao · Naver 계정으로 로그인합니다. 가입 즉시 환영 체험 14일이 시작됩니다.",
      "PDF를 드롭존에 끌어다 놓으면 에디터가 열립니다. 파일은 브라우저 안에서만 처리되고 서버로 업로드되지 않습니다.",
      "텍스트·그리기·도형·서명·스탬프·주석·링크·워터마크로 편집하고, 페이지 관리에서 순서·회전·추출을 정리합니다.",
      "완료 버튼에서 다운로드 · 인쇄 · 페이지 추출을 선택합니다(활성 구독 필요). 결과물과 임시본은 마이페이지 작업 내역에서 30일간 다시 받을 수 있습니다.",
    ],
    aiUsage: [
      "oh-my-design으로 DESIGN.md 디자인 계약을 먼저 세움 — 베이스 Notion, 툴바·밀도는 Linear 차용, 브랜드 초록 유지. 이후 모든 UI 작업은 이 계약을 통과해야 하고 post-edit 훅이 계약 밖 hex·radius 드리프트를 감지",
      "멀티 에이전트 병렬 작업 — 10차 라운드는 API ∥ 웹 ∥ 에디터 3갈래 구현 후 4렌즈 리뷰(에이전트 8), 9차 좁은 폭 대응은 수정 → 터치/마우스 비평가 2명 → 재수정 4라운드(에이전트 14), 8차 모바일은 감사 4 → 구현 3 → 리뷰 4(에이전트 11)",
      "스크린샷 피드백 루프 — screenshots/ 에 PNG를 두면 미처리 피드백으로 간주하고 반영 후 아카이브(6라운드 35장). session-log → todo → ADR 순서의 부팅 프로토콜로 세션 간 맥락 복구",
      "typecheck + API 테스트 28건 + Playwright E2E 46건(54 실행)을 통과해야만 배포. 서버에 올린 뒤에는 docker stats 로 RSS를 확인해 메모리 예산과 대조",
      "데스크톱 저장소와의 동기화를 docs/guides/editor-sync.md 로 문서화 — 웹에서 고친 에디터 개선(v1.5.8 → v1.7.0)을 데스크톱에 역반영",
    ],
    screenshots: [
      { src: "/images/projects/pdf-editor-live/landing.jpg", caption: "랜딩 — 헤드라인과 드롭존. 파일은 브라우저 안에서만 처리된다는 약속을 첫 화면에 적었습니다" },
      { src: "/images/projects/pdf-editor-live/login.jpg", caption: "로그인 — 이메일 로그인과 'Google로 · 카카오로 · 네이버로 계속하기' 소셜 로그인 3종" },
      { src: "/images/projects/pdf-editor-live/signup.jpg", caption: "가입 — 실시간 이메일 중복 확인과 비밀번호 규칙 체크리스트" },
      { src: "/images/projects/pdf-editor-live/pricing.jpg", caption: "요금제 — 월 6,900원 / 연 59,000원 구독 카드, 새 계정은 14일 환영 체험으로 시작(결제는 현재 mock)" },
      { src: "/images/projects/pdf-editor-live/me.jpg", caption: "마이페이지 — 프로필·소셜 로그인 연동(네이버·카카오 연동됨) · 구독·보관함 게이지(200MB) · 작업 내역" },
      { src: "/images/projects/pdf-editor-live/landing-loggedin.jpg", caption: "로그인 후 랜딩 — '이어서 작업하기'(서버 임시본·30일 보관)와 '최근 작업'(다시 받기). 목록의 실제 문서명은 흐리게 처리" },
      { src: "/images/projects/pdf-editor-live/editor.jpg", caption: "에디터 — 툴바(페이지·선택·실행취소·다시실행·텍스트 추가·지우개·형광펜·연필·이미지·사각형·X 표시·서명·워터마크·레이아웃·페이지 관리), 썸네일 사이드바, 페이저" },
      { src: "/images/projects/pdf-editor-live/editor-text.jpg", caption: "텍스트 추가 — 서브툴바(폰트·크기·굵기·정렬·색·불투명도)" },
      { src: "/images/projects/pdf-editor-live/editor-draw.jpg", caption: "형광펜·연필·체크 표시 — 스플릿 메뉴로 사각형/원, X/체크를 고릅니다" },
      { src: "/images/projects/pdf-editor-live/editor-sign.jpg", caption: "서명 추가 — 그리기 / 이미지 / 타이핑 탭, '서명 저장'을 켜면 계정 서명함에 보관" },
      { src: "/images/projects/pdf-editor-live/editor-stamp.jpg", caption: "스탬프 다이얼로그 — 프리셋과 날짜" },
      { src: "/images/projects/pdf-editor-live/editor-link.jpg", caption: "링크·주석 도구 — 영역을 드래그해 링크 삽입" },
      { src: "/images/projects/pdf-editor-live/editor-watermark.jpg", caption: "워터마크" },
      { src: "/images/projects/pdf-editor-live/editor-search.jpg", caption: "문서 텍스트 검색(Ctrl+F)" },
      { src: "/images/projects/pdf-editor-live/editor-pages.jpg", caption: "페이지 관리 — 드래그 순서 변경·회전·복제·삭제·추출" },
      { src: "/images/projects/pdf-editor-live/editor-layout.jpg", caption: "레이아웃 — 한 쪽/두 쪽 보기, 이어서/한 장씩, 회전" },
      { src: "/images/projects/pdf-editor-live/editor-finish.jpg", caption: "완료 — '편집을 마칠까요?' 다운로드 · 인쇄 · 임시 저장(30일 보관), 구독 상태 칩 표시" },
      { src: "/images/projects/pdf-editor-live/admin-stats.jpg", caption: "관리자 대시보드 — 사용자·구독·내보내기 집계 카드" },
      { src: "/images/projects/pdf-editor-live/mobile-landing.jpg", caption: "모바일(390px) 랜딩" },
      { src: "/images/projects/pdf-editor-live/mobile-editor.jpg", caption: "모바일(390px) 에디터 — 가로 스크롤 툴바, 오버레이 사이드바" },
    ],
    demo: {
      url: "https://pdf-editor.coolmarvel.com",
      note: "실제 운영 중인 서비스입니다. 이메일 가입 또는 Google · Kakao · Naver 로그인으로 바로 사용할 수 있고, 가입 시 환영 체험 14일이 주어집니다. 올린 PDF는 브라우저 안에서만 처리되며 서버로 전송되지 않습니다. 저장소는 비공개(운영 인프라 설정 포함)이며 데스크톱 원본은 아래 pdf-editor 저장소에서 볼 수 있습니다.",
    },
    links: [
      { label: "pdf-editor.coolmarvel.com 접속", href: "https://pdf-editor.coolmarvel.com" },
      { label: "데스크톱 원본 저장소 (pdf-editor)", href: "https://github.com/coolmarvel/pdf-editor" },
    ],
    privateRepo: true,
  },

  "cm-groupware": {
    role: "전체 아키텍처 설계 및 단독 개발 (기획 → 설계 → 개발 → 프로덕션 운영)",
    background: [
      "병원의 업무가 종이 결재, 수기 근태 관리, 개별 메신저, 흩어진 문서 발급 절차로 분산되어 있었습니다. 전자 결재·근태/연차·게시판·사내 메일/메신저·문서 발급·직무평가·회의록·프로젝트 칸반을 하나의 플랫폼으로 통합하는 것이 목표였습니다.",
      "병원 직원 중 고령 사용자가 많아 폰트·버튼 최소 크기 규칙을 강제하는 등 접근성을 설계 단계부터 반영했습니다.",
    ],
    architecture: [
      "Laravel 12 기반 도메인 주도 설계(DDD)로 13개 업무 도메인(결재·근태·일정·게시판·메일·직무평가·증명서·칸반 등)을 모듈화 — 도메인 간 결합을 이벤트로 낮춰 기능 추가가 다른 도메인을 깨지 않는 구조",
      "다형성(Polymorphic) 전자결재 엔진 — 휴가/연장근무/문서결재 등 이종 문서를 단일 결재 흐름으로 처리하고, 결재 완료 시 트랜잭션 내 콜백(onApprovalCompleted)으로 연차 차감 등 후속 처리를 자동화",
      "사용자 생성 이벤트(UserCreated) → Mailcow 메일 계정 + Mattermost 메신저 계정 자동 프로비저닝하는 이벤트-리스너 구조",
      "DB 저장 + 30초 폴링 인앱 알림 + Mattermost DM + SMTP 메일의 다중 채널 통합 알림",
      "전역 클릭 위임 핸들러로 모든 내부 링크를 Livewire.navigate() 처리해 전 페이지 SPA 경험 구현 (링크마다 wire:navigate 불필요)",
      "N+1 방지 eager loading과 복합 인덱스 설계로 핵심 조회 경로 최적화, TailAdmin 디자인 시스템을 Blade로 이식해 다크모드까지 지원",
    ],
    aiUsage: [
      "Claude Code 페어 프로그래밍을 정식 개발 방법론으로 채택하고 \"Harness Engineering\" 레이어를 직접 설계 (ADR-0001)",
      "Hooks 4종 — .env 수정 차단(env-guard), 민감파일 staging 차단(git-add-guard), 커밋 전 포맷 검증(pre-commit-lint), 편집 후 자동 pint 포맷팅",
      "자동 코드리뷰 슬래시 커맨드 5종 — /review-migration, /review-security(OWASP Top 10), /review-architecture(DDD 경계 감사), /deploy-check, /qa-browser(Playwright)",
      "프로젝트 전용 MCP 서버(Laravel MCP) 구축 — DB 스키마·모델 관계·라우트 조회 도구를 AI에 제공해 실제 코드베이스 컨텍스트 기반으로 작업",
      "영역별 전문 스킬 9종을 프로젝트 로컬로 고정(skills-lock.json 해시)하고, 아키텍처 결정 7건을 ADR로 영구 기록",
    ],
    screenshots: [
      { src: "/images/projects/cm-groupware/login.jpg", caption: "로그인 — TailAdmin 디자인 시스템 Blade 이식" },
      { src: "/images/projects/cm-groupware/dashboard.jpg", caption: "대시보드 — 출퇴근·연차 현황·결재 대기·알림 통합" },
      { src: "/images/projects/cm-groupware/approval-box.jpg", caption: "결재함 — 대기/승인/반려/참조 상태별 관리" },
      { src: "/images/projects/cm-groupware/schedule.jpg", caption: "일정 캘린더 — 개인/병원공통/회의실/휴가 레이어" },
      { src: "/images/projects/cm-groupware/meetings.jpg", caption: "회의록 — voice_server 자동 수신 + 할 일 후보 대기 표시" },
      { src: "/images/projects/cm-groupware/boards.jpg", caption: "게시판 허브 — 일반/QA 트래커/IT 트래커 3가지 유형, 게시판별 통계" },
      { src: "/images/projects/cm-groupware/board-emr-qa.jpg", caption: "EMR QA 트래커 — 실운영 300건+, 작성자/담당자 이중 상태 관리 (담당자·작성자는 블러 처리)" },
    ],
    demo: {
      url: "https://chungmu.xyz",
      account: "ID: demo / PW: 123456",
      note: "포트폴리오 열람용 공개 데모 계정입니다. 데모 계정은 조회 외 기능이 차단되어 있어 자유롭게 접속해보셔도 됩니다.",
    },
  },

  "meeting-todo-mcp": {
    role: "MCP 서버 설계·구현 및 LLM 연동 파이프라인 구축",
    background: [
      "부서장 회의가 끝나면 회의 중 나온 할 일(Action Item)을 누군가 수기로 정리해 각 부서에 전달해야 했고, 누락과 지연이 반복됐습니다.",
      "voice_server가 전사한 회의록을 LLM이 요약·분석한 뒤, 도출된 할 일을 부서별 칸반 보드에 자동으로 카드 등록하는 완전 자동화가 목표였습니다.",
    ],
    architecture: [
      "그룹웨어를 MCP(Model Context Protocol) 서버로 노출(HTTP/SSE, Bearer 인증)하고 AI 서버가 MCP 클라이언트로 연결 — LLM이 직접 그룹웨어 도구를 호출하는 구조",
      "회의록 자동화 도구 11종 구현 — 부서·프로젝트·멤버·후보 조회 + 프로젝트/컬럼/멤버/보드카드 생성",
      "고정 RPC 호출 대신 LLM이 \"어떤 도구를 언제 호출할지\" 자율 판단하도록 tool description과 JSON Schema를 LLM 친화적으로 설계",
      "모든 생성 도구를 멱등(idempotent)하게 설계 — 재시도·중복 호출에도 안전 (이미 생성된 후보는 409 반환)",
      "단일 봇 계정 대신 부서 책임자를 자동 해석(ResponsibleUserResolver)해 자동 등록 카드의 행위자를 실제 책임자에 귀속 — 활동 로그 추적성 확보",
      "REST API·DB 직접 접근 등 대안을 비교 검토하고 MCP 채택 근거를 ADR로 문서화 (ADR-0007)",
    ],
    aiUsage: [
      "AI 서버는 Claude Code CLI의 비대화 모드(claude -p)로 LLM을 호출 — AI를 개발 도구를 넘어 제품 기능으로 통합한 사례",
      "voice_server(전사) ↔ AI 서버(요약·분석) ↔ 그룹웨어(MCP 도구 호출)의 3-시스템 협업 파이프라인",
    ],
    screenshots: [
      { src: "/images/projects/cm-groupware/meetings.jpg", caption: "그룹웨어 회의록 목록 — 자동 수신된 회의별 '할 일 후보 N건 대기' 표시" },
      { src: "/images/projects/cm-groupware/meeting-encrypted.jpg", caption: "회의록 상세 — 암호화 보관 상태와 수신 정보(KDF 600,000 iter). 패스워드 입력 시 1회성으로만 평문 표시" },
      { src: "/images/projects/cm-groupware/meeting-decrypted.jpg", caption: "데모 계정의 복호화 시도 — 읽기 전용 가드가 실제로 차단하는 모습" },
    ],
  },

  "voice-server": {
    role: "파이프라인 설계·구현 및 아키텍처 진화 주도",
    background: [
      "매주 1~2시간짜리 부서장 회의의 회의록을 수기로 작성하는 부담이 컸습니다. 음성 파일만 올리면 화자분리 → STT → 요약 → 그룹웨어 전송까지 자동으로 처리하는 파이프라인을 구축했습니다.",
      "GPU(12GB VRAM) 1대라는 제약 속에서 시작해, 처리 단계를 원격 API로 위임하는 방향으로 아키텍처를 진화시켰고 그 과정을 ADR 6건으로 추적했습니다.",
    ],
    architecture: [
      "queued → converting → diarizing → asr → summarizing → sending → done 상태머신 — 단계별 처리 시각을 DB에 기록해 병목 추적",
      "아키텍처 진화: 로컬 pyannote/faster-whisper GPU 처리 → 원격 WhisperX API 위임(ADR-0004) → 요약도 원격 Claude 래퍼 API 위임(ADR-0005) → torch·CUDA 의존성 제거로 수 GB → 수백 MB의 thin orchestrator로 경량화",
      "회의록 본문 암호화(ADR-0006) — 업로드 시 입력한 패스워드로 PBKDF2 → AES-256-GCM 암호화. 패스워드는 어디에도 저장하지 않아 서버조차 본문을 복호화할 수 없는 zero-knowledge에 가까운 설계",
      "그룹웨어와 단방향 outbound HTTPS Push만 사용(NAT 뒤에서도 동작) — Bearer 토큰 + HMAC-SHA256 서명, 실패 시 지수백오프 5회 재시도",
      "PII 보호 — 음성 파일은 잡 종료 즉시 삭제, 발화 텍스트는 로그에 기록하지 않음(job_id까지만)",
      "asyncio.Queue 단일 워커 직렬 처리로 공유 GPU 자원 보호, 그룹웨어와 DB·자격증명 분리(ADR-0002)",
    ],
    aiUsage: [
      "cm_groupware의 Harness Engineering 패턴 이식 — hooks 3종(env-guard·git-add-guard·ruff 자동 포맷), 슬래시 커맨드 3종(/review-pipeline·/review-security·/deploy-check)",
      "\"로컬 전량 처리 → 원격 위임 → thin orchestrator\"로의 리팩터링 전 과정을 ADR로 기록 — 폐기한 대안과 트레이드오프까지 추적 가능",
    ],
    screenshots: [
      { src: "/images/projects/voice-server/home.jpg", caption: "업로드 — 회의록 보호 패스워드(암호화)와 WhisperX 원격 설정 패널" },
      { src: "/images/projects/voice-server/jobs.jpg", caption: "처리 이력 — 실제 부서장 회의 50건+ 처리 로그 (완료/실패 상태)" },
      { src: "/images/projects/voice-server/job-detail.jpg", caption: "잡 상세 — 5단계 파이프라인 타임라인, 암호화된 본문 게이트, LLM이 추출한 할 일 50건·10개 부서 (내용은 블러 처리)" },
      { src: "/images/projects/voice-server/job-detail-decrypted.jpg", caption: "패스워드 복호화 후 요약본 — 이 세션에서만 표시, DOCX/MD/JSON 내보내기 (본문 블러 처리)" },
      { src: "/images/projects/voice-server/api-docs.jpg", caption: "FastAPI Swagger — 업로드/잡 상태/스트리밍 부분결과/JSON·MD·DOCX 다운로드 API" },
    ],
    demo: {
      note: "병원 내부망 전용 시스템이라 외부 접속은 불가합니다. 위 스크린샷은 실제 운영 화면입니다.",
    },
  },

  "pdf-editor": {
    role: "개인 프로젝트 — 설계·개발·릴리스 전 과정",
    background: [
      "상용 웹 PDF 편집기는 문서를 서버로 업로드해야 해서 민감 문서를 다루기 어렵습니다. pdfguru.com의 UX를 벤치마킹하되 \"문서가 밖으로 나가지 않는\" 오프라인 데스크톱 편집기를 목표로 했습니다.",
      "벤치마크 스크린샷 26장을 UI/기능의 시각적 SSOT로 삼아, 페이지 관리·텍스트 추가/수정·그리기·형광펜·도형·스탬프·서명·주석·링크까지 상용 수준의 기능을 구현했습니다.",
    ],
    architecture: [
      "정규화 객체 모델(ADR-0002) — 모든 좌표를 뷰포트 기준 0..1로 정규화하고, 라이브 오버레이와 내보내기가 단일 렌더러(draw.ts)를 공유해 \"화면 = 결과물 1:1\" 보장",
      "참조 기반 페이지 연산 — 문서를 PageRef[] + objectsByPage로 표현해 원본 PDF 바이트를 건드리지 않고 삭제·복제·이동·회전·타 문서 가져오기 처리",
      "저장 시 평탄화 — 오버레이는 ≈180dpi 투명 PNG로 굽고 링크/노트는 실제 PDF 주석으로 삽입, 원본 텍스트 벡터는 유지",
      "순수 로직(src/core: objects/pages/history)을 node --test로 보호, undo/redo는 스냅샷 스택(상한 100)",
      "기존 PDF 텍스트를 자동 인식해 박스 편집하는 텍스트 수정 세션 모드 — 버퍼링 후 종료 시 저장 선택",
      "WSL + Wine 크로스 컴파일로 Windows NSIS 인스톨러 자동 생성 (electron-builder)",
      "macOS(Apple Silicon) DMG 파이프라인 — 한글 번들명 크래시를 피하려 내부 제품명을 ASCII로 빌드 후 표시명만 한글 유지, ad-hoc 서명 + hdiutil로 DMG 생성",
    ],
    aiUsage: [
      "스크린샷 피드백 루프 — 사용자가 스크린샷을 지정 디렉토리에 넣으면 AI가 요구사항으로 해석·구현하고 처리 후 아카이브로 이동",
      "세션 부팅 프로토콜 — CLAUDE.md가 session-log(진행 SSOT) → todo → 최근 plan 순으로 맥락을 자동 복구하도록 지시",
      "자동 검증 → 릴리스 파이프라인 — typecheck·test·build를 모두 통과해야만 인스톨러를 굽고 배포",
      "Playwright + WSLg 시각 자가검증 — 앱 구동 → PDF 열기 → 편집 → 스크린샷 픽셀 계측",
    ],
    screenshots: [
      { src: "/images/projects/pdf-editor/landing.jpg", caption: "시작 화면 — 파일 선택/드래그 앤 드롭, 한/영 언어 전환" },
      { src: "/images/projects/pdf-editor/editor.jpg", caption: "편집기 — 전체 도구 툴바와 페이지 썸네일 패널" },
      { src: "/images/projects/pdf-editor/text-add.jpg", caption: "텍스트 추가 — 페이지 위 실시간 입력(한글 지원), 폰트·정렬 서브툴바" },
      { src: "/images/projects/pdf-editor/text-edit.jpg", caption: "텍스트 수정 세션 — 기존 PDF 텍스트를 자동 인식해 박스 단위로 편집" },
      { src: "/images/projects/pdf-editor/highlight.jpg", caption: "형광펜 — 불투명도·블렌드 모드(Multiply) 조절" },
      { src: "/images/projects/pdf-editor/draw.jpg", caption: "연필 그리기 — 자유 곡선, 색상·굵기 조절" },
      { src: "/images/projects/pdf-editor/shapes.jpg", caption: "도형 — 사각형·원, 선 스타일 서브툴바와 선택 핸들" },
      { src: "/images/projects/pdf-editor/stamp.jpg", caption: "스탬프 — APPROVED·DRAFT 등 기본 스탬프 + 커스텀 스탬프" },
      { src: "/images/projects/pdf-editor/sign.jpg", caption: "서명 추가 — 그리기·이미지·타이핑 3가지 방식, 서명 저장" },
      { src: "/images/projects/pdf-editor/annotation.jpg", caption: "주석 노트 — 페이지에 부착되는 스티키 노트" },
      { src: "/images/projects/pdf-editor/link.jpg", caption: "링크 — 영역 지정 후 웹사이트/내부 페이지 연결 (실제 PDF 주석으로 저장)" },
      { src: "/images/projects/pdf-editor/pages-menu.jpg", caption: "페이지 썸네일 메뉴 — 이동·회전·복제·추출·삭제" },
      { src: "/images/projects/pdf-editor/manage-pages.jpg", caption: "페이지 관리 그리드 — 다중 선택 후 일괄 회전·복제·순서 변경·문서 가져오기" },
      { src: "/images/projects/pdf-editor/layout-double.jpg", caption: "레이아웃 — 두 쪽 보기, 페이지 모드/전환/회전 옵션" },
      { src: "/images/projects/pdf-editor/english-editor.jpg", caption: "영어 UI — i18n 한/영 전환 (사전 기반, 라이브러리 없이 구현)" },
    ],
    links: [
      { label: "GitHub 저장소", href: "https://github.com/coolmarvel/pdf-editor" },
      { label: "웹 버전 사용해보기 (PDF Editor Live)", href: "https://pdf-editor.coolmarvel.com" },
      { label: "Windows 인스톨러 다운로드 (v1.5.2)", href: "https://github.com/coolmarvel/pdf-editor/releases/download/v1.5.2/PDF-Editor-Setup-1.5.2.exe" },
      { label: "macOS DMG 다운로드 (v1.5.2, Intel x64)", href: "https://github.com/coolmarvel/pdf-editor/releases/download/v1.5.2/PDF-Editor-1.5.2-x64.dmg" },
      { label: "macOS DMG 다운로드 (v1.5.2, Apple Silicon)", href: "https://github.com/coolmarvel/pdf-editor/releases/download/v1.5.2/PDF-Editor-1.5.2-arm64.dmg" },
    ],
  },

  "file-converter": {
    role: "개인 프로젝트 — 설계·개발·릴리스 전 과정",
    background: [
      "온라인 파일 변환 서비스는 편하지만 두 가지가 싫었습니다. 변환하겠다고 개인 파일을 남의 서버에 업로드하는 것 자체가 내 데이터를 제3자에게 넘기는 일이라는 점, 그리고 무료처럼 쓰게 하다가 어느 순간 결제·구독을 요구하는 패턴이 반복된다는 점입니다. \"내 파일은 내 컴퓨터 밖으로 나가지 않고, 한 번 설치하면 계속 무료\"를 원칙으로 직접 만들었습니다.",
      "배경 제거 같은 AI 기능조차 대부분 서비스가 서버 업로드 + 유료 크레딧으로 제공하기에, AI 추론까지 통째로 로컬에서 돌리는 것을 목표로 했습니다. 개발 중 PDF 편집 요구가 커지자 편집기는 pdf-editor 프로젝트로 분리하고, 이 앱은 변환에 특화했습니다.",
    ],
    architecture: [
      "AI 배경 제거 완전 오프라인 서빙 — ISNet 계열 세그멘테이션 모델(@imgly/background-removal, ONNX)과 onnxruntime-web wasm 354MB를 인스톨러에 통째로 번들하고, Electron 커스텀 프로토콜(bgrm://)로 앱 내부에서 직접 서빙해 네트워크 요청이 한 번도 발생하지 않는 구조",
      "흰색 → 투명 배경은 AI 없이 픽셀 연산(허용 오차 + feather)으로 즉시 처리 — 로고처럼 단색 배경은 모델 로드 없이 가볍게, 사진은 AI로 구분해 제공",
      "입출력 포맷 — 입력: PNG·JPEG·WebP·BMP·HEIC·TIFF·ICO·SVG·PDF (+ Ctrl+V 클립보드), 출력: PNG·JPEG·WebP·BMP·ICO(멀티사이즈)·SVG(벡터화)·PDF. 다중 이미지 → 단일 PDF, PDF → 페이지별 이미지",
      "WYSIWYG 파이프라인 — 리사이즈 → 회전 → 자르기 → 워터마크 순서를 미리보기와 실제 변환이 공유해 \"화면에 보이는 그대로\" 출력, 투명 영역은 체커보드로 표시, undo/redo(Ctrl+Z/Y) 스냅샷 이력",
      "PDF 문서 도구 — 전체 병합·분할·회전·페이지 삭제·순서 변경, \"1,3-5\" 페이지 범위 파서",
      "시작 청크 최적화 — pdf.js·pdf-lib·AI 모듈을 지연 로딩 청크로 분리해 초기 로드 2,389KB → 941KB",
      "배포 소스 보호 — javascript-obfuscator 난독화를 빌드 파이프라인에 내장 (onnx·pdf.js 등 대형 공개 라이브러리 청크는 제외해 동작 리스크 차단)",
    ],
    aiUsage: [
      "제품 기능으로서의 AI — 배경 제거 모델을 npm으로 배포되는 마지막 버전(1.4.5)에 고정해 오프라인 번들 가능성을 확보 (최신 버전은 자사 CDN 전용이라 오프라인 불가 — 버전 선택 자체가 아키텍처 결정)",
      "스크린샷 피드백 루프 — 사용자가 스크린샷을 프로젝트 루트에 넣으면 AI가 요구사항으로 해석·구현 후 아카이브로 이동",
      "세션 부팅 프로토콜 — CLAUDE.md가 session-log(진행 SSOT) → todo → 최근 plan 순으로 맥락 자동 복구",
      "자동 검증 → 릴리스 파이프라인 — typecheck·test·build를 통과해야만 인스톨러를 굽는 규칙, Playwright _electron 전체 기능 회귀 E2E 24종 상설화 (AI 실추론 후 픽셀 alpha 검증 포함)",
    ],
    screenshots: [
      { src: "/images/projects/file-converter/landing.jpg", caption: "시작 화면 — 드래그 앤 드롭, Ctrl+V 클립보드 붙여넣기 지원" },
      { src: "/images/projects/file-converter/convert.jpg", caption: "변환 대시보드 — 파일 사이드바, 실시간 미리보기, 출력 포맷(JPEG·PNG·WebP·BMP·ICO·SVG·PDF) 선택" },
      { src: "/images/projects/file-converter/resize-rotate.jpg", caption: "리사이즈·회전 — 비율 유지 리사이즈와 90° 회전, Ctrl+Z/Y undo·redo" },
      { src: "/images/projects/file-converter/crop.jpg", caption: "자르기 — 미리보기 위에서 드래그로 영역 지정, 잘리는 범위를 그대로 표시" },
      { src: "/images/projects/file-converter/watermark.jpg", caption: "워터마크 — 문구·대각선/바둑판/모서리 배치, 미리보기 실시간 합성" },
      { src: "/images/projects/file-converter/transparent.jpg", caption: "흰색 → 투명 — 픽셀 연산(허용 오차+feather)으로 즉시 처리, 체커보드로 투명 표시" },
      { src: "/images/projects/file-converter/ai-loading.jpg", caption: "AI 배경 제거 진행 — 번들된 ISNet 모델 로드·추론 로딩바 (네트워크 요청 0회)" },
      { src: "/images/projects/file-converter/ai-result.jpg", caption: "AI 배경 제거 결과 — 인물 사진 배경을 로컬 ONNX 추론만으로 제거" },
      { src: "/images/projects/file-converter/pdf-preview.jpg", caption: "PDF 변환 — 페이지별 이미지 추출·전체 병합, PDF 미리보기" },
      { src: "/images/projects/file-converter/pdf-tools.jpg", caption: "PDF 페이지 도구 — 분할·회전·삭제·순서 변경, \"1-2,3\" 페이지 범위 문법" },
    ],
    links: [
      { label: "GitHub 저장소", href: "https://github.com/coolmarvel/file-converter" },
      { label: "Windows 인스톨러 다운로드 (v1.3.2)", href: "https://github.com/coolmarvel/file-converter/releases/download/v1.3.2/File-Converter-Setup-1.3.2.exe" },
      // macOS DMG — 아직 맥 빌드 환경이 없어 미배포. 빌드 후 아래 주석 해제
      // (빌드 방법: file-converter docs/guides/packaging.md — pdf-editor의 dist-mac 파이프라인 이식 가이드)
      // { label: "macOS DMG 다운로드 (v1.3.2, Intel x64)", href: "https://github.com/coolmarvel/file-converter/releases/download/v1.3.2/File-Converter-1.3.2-x64.dmg" },
      // { label: "macOS DMG 다운로드 (v1.3.2, Apple Silicon)", href: "https://github.com/coolmarvel/file-converter/releases/download/v1.3.2/File-Converter-1.3.2-arm64.dmg" },
    ],
  },

  "dicom-studio": {
    role: "개인 프로젝트 — 설계·개발·릴리스 전 과정",
    background: [
      "병원 검사장비(혈관검사·심전도 등) 상당수는 결과를 DICOM이 아닌 PDF·JPG 같은 일반 파일로 출력합니다. 이 결과를 PACS 등 병원 영상 시스템에 넣으려면 환자·검사정보를 메타데이터로 결합해 DICOM으로 변환하는 중간 게이트웨이가 필요한데, 기존 상용 도구는 특정 장비·벤더에 종속되고 라이선스 인증 절차가 번거롭습니다. 병원 ID·장비 번호까지 전부 설정값인 범용 게이트웨이를 목표로 직접 만들었습니다.",
      "검사실 직원의 실제 동선(장비 결과 열기 → 정리 → 환자정보 입력 → 변환 → 보관·검색 → 전송)을 그대로 화면 구조로 옮기고, 장비 매뉴얼의 클래식 데스크톱 폼 UI를 TailAdmin 디자인 시스템으로 재해석했습니다. 아래 스크린샷은 제작자 본인의 실제 동맥경화도검사(baPWV·ABI) 결과지 2장으로 전체 워크플로우를 시연한 것입니다.",
    ],
    architecture: [
      "파일 형식을 확장자가 아닌 매직 바이트로 감지 — PDF(페이지별)·JPG·PNG·BMP·TIFF(다중 페이지)·기존 DICOM 입력. pdf.js는 Electron V8 호환을 위해 legacy 빌드를 채택하고 프로덕션 E2E로 검증",
      "DICOM 3.0 Secondary Capture(RGB, Explicit VR Little Endian) 생성(dcmjs) — 다중 이미지 = 한 Study 한 Series, <PatientID>_<검사일>/00001.dcm… 폴더 구조",
      "DICOM 네트워크 3종(dcmjs-dimse) — C-STORE 전송(복수 대상 동시 + 대상별 결과 표시), C-FIND 워크리스트 조회, C-ECHO 연결 테스트. 실PACS 없이 체험할 수 있는 테스트 SCP 서버를 동봉",
      "로컬 DB는 sql.js(WASM SQLite) — 초기의 better-sqlite3가 WSL 크로스 빌드에서 Linux 바이너리가 Windows 패키지에 섞여 기동 불가 → 네이티브 모듈 0개 구조로 교체해 해결한 아키텍처 결정",
      "워크리스트 연결 프로필 — 서버 없는 병원은 로컬(내장 DB)에 처방을 직접 등록, MWL 서버가 있는 병원은 프로필 전환. 처방 행 클릭 = 환자·검사정보 자동 입력(나이 자동 계산), SaveDB 저장 시 일치하는 처방 자동 완료",
      "편집(회전·반전·색반전·순서변경)은 원본 보존 + transform 베이크 구조 — 옆으로 스캔된 검사지를 화면에서 세운 그대로 DICOM 저장·전송에 반영",
      "3계층 분리 — src/core 순수 로직(node test runner로 직접 테스트) / main은 파일 IO·DB·DICOM 전송 등 OS·네트워크 접점 전담 / contextBridge IPC로만 렌더러에 노출",
    ],
    aiUsage: [
      "project-seed 템플릿으로 킥오프 — 브리프(왜/무엇 SSOT)·세션 부팅 프로토콜·스크린샷 피드백 루프·hooks(.env 차단, git add 가드, 자동 포맷)를 첫날부터 가동",
      "버전 판단을 에이전트에 위임(패치 자동, MINOR 승격은 근거와 함께 제안) — 11일간 v1.0.0 → v1.4.0으로 마일스톤 M1~M4(변환·이미지 도구·로컬 DB·PACS 전송) 완주",
      "typecheck·lint·test·build를 모두 통과해야만 인스톨러를 굽는 검증 파이프라인 — WSL에서 개발하고 실제 Windows에서 설치본을 실물 검증",
      "이 페이지의 스크린샷도 Playwright _electron으로 앱을 실구동해 캡처 — 실제 검사 PDF를 DICOM으로 변환하고 테스트 SCP 서버로 C-STORE 실전송까지 수행한 화면",
    ],
    screenshots: [
      { src: "/images/projects/dicom-studio/landing.jpg", caption: "시작 화면 — Main Tools·검사정보·이미지 도구 3단 사이드바 + 다크 뷰어" },
      { src: "/images/projects/dicom-studio/worklist-register.jpg", caption: "처방 등록 — 워크리스트 서버가 없는 병원용 로컬 워크리스트(내장 DB)에 처방 직접 등록" },
      { src: "/images/projects/dicom-studio/calendar.jpg", caption: "커스텀 달력 — 헤더 클릭으로 연/월 그리드 바로 이동 (1900년대 생년월일도 몇 번의 클릭으로)" },
      { src: "/images/projects/dicom-studio/worklist.jpg", caption: "워크리스트 조회 — 처방 행을 클릭하면 환자·검사정보가 폼에 자동 입력 (나이 자동 계산)" },
      { src: "/images/projects/dicom-studio/viewer.jpg", caption: "검사 결과 로드 — 실제 동맥경화도검사(baPWV·ABI) PDF 2건, 이미지 수에 맞춘 자동 레이아웃" },
      { src: "/images/projects/dicom-studio/image-tools.jpg", caption: "이미지 도구 — 옆으로 스캔된 검사지만 선택해 반시계 회전으로 정리, 편집이 저장에 그대로 반영" },
      { src: "/images/projects/dicom-studio/preview.jpg", caption: "크게 보기 — 더블클릭 확대, ←/→로 페이지 이동" },
      { src: "/images/projects/dicom-studio/save-dicom.jpg", caption: "DICOM 3.0 저장 — Secondary Capture로 변환해 <PatientID>_<검사일> 폴더에 00001.dcm…" },
      { src: "/images/projects/dicom-studio/savedb.jpg", caption: "로컬 DB 저장(SaveDB) — 저장과 동시에 일치하는 워크리스트 처방을 자동 완료 처리" },
      { src: "/images/projects/dicom-studio/finddb.jpg", caption: "로컬 DB 검색(FindDB) — 조건 검색 + 썸네일 미리보기, 열기/이미지 추가/전송/다중 전송" },
      { src: "/images/projects/dicom-studio/send.jpg", caption: "PACS 전송 (C-STORE) — 대상 관리·Echo 연결 테스트·다중 전송, 동봉 테스트 SCP로 실전송한 결과" },
    ],
    demo: {
      note: "아래 인스톨러로 설치해 직접 사용해볼 수 있으며, 스크린샷은 제작자 본인의 실제 검사 결과지로 시연한 화면입니다. 특정 병원·장비에 종속되지 않는 범용 앱으로, 기관 ID·이름·장비 번호는 모두 설정값입니다.",
    },
    links: [
      { label: "Windows 인스톨러 다운로드 (v1.4.0)", href: "https://github.com/coolmarvel/dicom-studio/releases/download/v1.4.0/DICOMStudio-Setup-1.4.0.exe" },
      { label: "GitHub 저장소", href: "https://github.com/coolmarvel/dicom-studio" },
    ],
  },

  "sh-ip-scanner": {
    role: "개인 학습 프로젝트 — 설계·개발·패키징 전 과정",
    background: [
      "지금까지의 주력 스택(TypeScript · React · Electron)에서 한 걸음 나가 새 언어를 제대로 익히고 싶었고, 그 언어로 C#을 골랐습니다. 문법 예제 대신 실제로 매일 쓰던 도구를 교재로 삼기로 하고, 포터블 툴 faIpScanner(Delphi로 만들어진 설치 없는 exe)를 대상으로 정했습니다.",
      "먼저 원본 바이너리를 정적 분석해 동작 원리를 밝혔습니다 — VCL/Indy의 TCheckIPThread·TFindHostNameThread로 대역을 멀티스레드 스윕하고, SendARP(iphlpapi)로 MAC을, 역DNS로 호스트명을 채우는 클래식 LAN 스캐너였습니다. 이 세 동작이 C#의 표준 라이브러리와 Win32 P/Invoke로 거의 1:1 재현 가능하다는 판단이 스택 결정(ADR-0002)의 근거가 되었습니다.",
      "결과물로도 실사용합니다. 관리 중인 네트워크에 지금 어떤 장비가 붙어 있는지(IP·PC명)를 한눈에 보는 전산 자산 파악 용도이며, 스캔 대역은 여러 개를 드롭다운으로 오가며 관리합니다.",
    ],
    architecture: [
      "Core / App 2계층 분리 — 네트워크·설정 로직은 UI를 모르는 ShIpScanner.Core에 두고 xUnit으로 직접 테스트, 화면은 Avalonia MVVM(ObservableProperty·RelayCommand)으로 상태 바인딩만 담당",
      "병렬 핑 스윕 — 원본이 스레드 254개를 굴리던 것을 async/await + SemaphoreSlim(동시 실행 수 제한) + CancellationToken(협조적 중지)으로 재현하고, IProgress<T>로 결과를 도착하는 대로 바둑판에 흘려보내 점진적으로 색칠",
      "PC명 조회를 직접 구현 — NetBIOS Node Status(NBSTAT) 패킷을 UDP 137로 만들어 보내고 응답에서 UNIQUE·접미사 0x00(Workstation) 이름을 파싱. 한글 이름은 CP949로 오기 때문에 .NET Core에 기본 탑재되지 않은 코드페이지 공급자를 등록해 디코드하고, 실패 시 역DNS로 폴백하는 Composite 구조",
      "스캔 대역·스캔 옵션(타임아웃·동시 개수·이름 조회)은 %APPDATA%에 JSON으로 저장 — Program Files가 아닌 사용자 쓰기 가능 경로, 파일이 없거나 깨져도 앱이 죽지 않고 빈 목록으로 폴백",
      "기본 대역을 코드에 하드코딩하지 않는 구조 — 저장된 대역이 0개면 첫 실행으로 보고 안내 모달을 띄워 내 대역 자동 감지 결과를 제시. 저장소를 공개로 전환하기 위한 설계 변경이었고, 과거 커밋에 남아 있던 실 대역도 git history 재작성으로 함께 정리",
      "Win32 종속 기능(SendARP 등)은 인터페이스 뒤로 격리한다는 규칙을 코드 지도에 박제 — 개발은 WSL(Linux), 실행 대상은 Windows인 환경에서 빌드가 깨지지 않도록",
      "자체포함(self-contained) 단일 파일 게시 + Inno Setup 인스톨러 — .NET 런타임이 없는 PC에서도 설치·실행되며, WSL에서 wine으로 ISCC를 돌려 Setup.exe까지 굽는 파이프라인을 검증",
    ],
    aiUsage: [
      "project-seed(자체 프로젝트 발사대) 템플릿으로 킥오프 — 브리프(왜/무엇 SSOT)·세션 부팅 프로토콜·ADR·세션 로그를 첫날부터 가동해, 세션이 끊겨도 문서만 읽고 맥락을 복구하는 구조",
      "학습이 목적인 프로젝트라 \"가장 짧은 코드\"가 아니라 \"개념이 드러나는 코드 + 개념 주석\"을 규칙으로 명시 — Task·SemaphoreSlim·CancellationToken 같은 C# 개념을 코드 옆에 남기도록 에이전트를 제약",
      "hooks로 검증을 시스템화 — .env 편집 차단, git add -A 차단, 저장 시 dotnet format, 저장 시 백그라운드 빌드. 커밋 전 build·test·format 3종 통과를 전제 조건으로 고정",
      "함정을 CLAUDE.md에 박제해 재발 방지 — net8.0 고정(Avalonia 12는 SDK 8과 소스제너레이터 비호환), [ObservableProperty]는 필드 기반(C# 13 partial property 사용 불가) 등 실제로 한 번씩 밟은 지뢰만 기록",
      "이 페이지의 스크린샷도 Avalonia 헤드리스 렌더러(tools/ShotTool)로 실제 앱 화면을 PNG로 구운 것 — GUI 세션이 없는 WSL에서도 UI를 눈으로 검증하는 캡처 하네스",
    ],
    screenshots: [
      { src: "/images/projects/sh-ip-scanner/result.jpg", caption: "스캔 완료 — 주황=사용 중 · 연두=사용 가능, 사용 중인 칸에는 NetBIOS로 조회한 PC명(한글 CP949 디코드)" },
      { src: "/images/projects/sh-ip-scanner/scanning.jpg", caption: "스캔 진행 중 — 판정이 끝난 앞쪽부터 색이 채워지고, 아직 검사하지 않은 칸은 흰색으로 남는다 (스캔 중에는 대역 변경·재시작이 잠긴다)" },
      { src: "/images/projects/sh-ip-scanner/main.jpg", caption: "스캔 전 초기 화면 — 254칸 바둑판, 대역 드롭다운과 [검색 시작]. 좌상단 아이콘이 메뉴(대역 관리·설정·정보)" },
      { src: "/images/projects/sh-ip-scanner/manager.jpg", caption: "대역 관리 — 스캔할 서브넷을 추가·삭제(앞 3옥텟만 입력). 목록은 %APPDATA%에 JSON으로 저장" },
      { src: "/images/projects/sh-ip-scanner/settings.jpg", caption: "설정 — 핑 타임아웃·동시 스캔 개수·PC명 조회 여부. 다음 검색부터 반영" },
      { src: "/images/projects/sh-ip-scanner/firstrun.jpg", caption: "첫 실행 안내 — 기본 대역을 코드에 넣지 않기 때문에, 첫 실행 시 내 대역을 자동 감지해 제시하고 등록을 유도" },
      { src: "/images/projects/sh-ip-scanner/about.jpg", caption: "정보 — 버전·제작자·라이센스 표기" },
    ],
    demo: {
      note: "아래 인스톨러로 설치해 직접 사용해볼 수 있습니다 (자체포함 빌드라 .NET 런타임 설치 불필요, 코드 서명은 없어 SmartScreen 경고가 뜰 수 있습니다). 스크린샷의 IP 대역(192.168.x)과 PC명은 예시 데이터입니다 — 실제 운영 대역·장비명은 노출하지 않기 위해 저장소와 화면 모두에서 예시 값으로 대체했습니다.",
    },
    links: [
      { label: "Windows 인스톨러 다운로드 (v1.0.1)", href: "https://github.com/coolmarvel/sh-ip-scanner/releases/download/v1.0.1/sh-ip-scanner-Setup-1.0.1.exe" },
      { label: "GitHub 저장소", href: "https://github.com/coolmarvel/sh-ip-scanner" },
    ],
  },

  "sh-dicom-studio": {
    role: "개인 학습 프로젝트 — 설계·개발·서버·패키징 전 과정",
    background: [
      "sh-ip-scanner로 C# 문법과 Avalonia MVVM을 익힌 뒤, 다음 단계로 실무 규모의 앱 하나를 C# 생태계 전체로 관통하고 싶었습니다 — 데스크톱(MVVM)에서 시작해 웹 API(ASP.NET Core), 상용 DB(Oracle), 컨테이너 배포(docker compose)까지. 교재는 직접 만들었던 dicom-studio(Electron)를 골랐습니다. 도메인과 기능 명세를 이미 알고 있는 앱을 다시 만들면, 문제 정의에 쓸 에너지를 아껴 언어·스택 학습에만 집중할 수 있기 때문입니다.",
      "마일스톤을 4차로 나눠 완주했습니다 — 1차 오프라인 완결(이미지 열기 → 뷰어 → DICOM 변환 → SQLite 검색), 2차 서버(ASP.NET Core 8 + Oracle 로그인·검사 메타 동기화), 3차 PACS 전송(C-ECHO/C-STORE, Orthanc 도커 동봉), 4차 Worklist(서버 예약 접수 → 선택 시 환자정보 자동 입력). 뷰어 오버레이·워크리스트 UI는 실무에서 쓰는 PACS 프로그램(PACSPLUS·PPW)의 화면을 참고해 다듬었고, 사용자(본인)의 1.0 선언으로 v1.0.x로 승격했습니다.",
      "학습 과정 자체도 산출물로 남겼습니다 — 이 앱의 실제 코드를 예제로 쓴 12강짜리 교재 'JAVA 개발자를 위한 C# & ASP.NET Core 실전 입문' PDF를 Claude Code와 함께 만들어 릴리스에 함께 공개했습니다 (프로퍼티·record·LINQ·async/await부터 Minimal API·DI·JWT·ADO.NET·도커 배포까지).",
    ],
    architecture: [
      "Core / App / Server 3계층 — UI 없는 도메인 로직(DICOM 변환·SQLite·이미지 처리)은 ShDicomStudio.Core에 두고 xUnit 34종으로 직접 테스트, 화면은 Avalonia MVVM(CommunityToolkit.Mvvm), 서버는 별도 프로젝트로 분리",
      "DICOM 변환은 fo-dicom — JPG/PNG/BMP/TIFF/PDF를 Secondary Capture로 변환, 다중 이미지 = 한 Study 한 Series. 기존 .dcm 파일 열기도 지원",
      "뷰어 — 그리드 레이아웃(1×1~4×4, 장수 기반 자동), 회전·반전·색반전·순서변경·삭제, Magnify 돋보기 렌즈(2.5×), PACSPLUS 스타일 4모서리 환자정보 오버레이(토글, 폼 실시간 반영). RenderTransform 호스트를 Canvas로 고정해 변환 좌표계 문제를 해결",
      "서버 — ASP.NET Core 8 Minimal API + Oracle 23ai Free(gvenzl 이미지)를 docker compose로 구동. JWT(HS256) 로그인, BCrypt 비밀번호 해시, 계정 관리(admin 전용), 검사 메타데이터 upsert 동기화, 예약(ORDERS) 등록/조회/삭제 API",
      "PACS 전송 — fo-dicom DicomClient로 C-ECHO 연결 테스트·C-STORE 전송, 목적지(AE Title/호스트/포트) 관리. 테스트용 Orthanc 컨테이너를 compose에 동봉해 실PACS 없이 E2E 검증",
      "Worklist 허브 — InsExam·FindDB·Worklist 3개 창을 [예약 접수]/[검사 검색(내부·서버 탭)] 2탭 허브 하나로 통합, SaveDB가 저장 흐름(업데이트/이미지 추가/새 검사)을 4지선다로 통합",
      "JPG 내보내기 — ImageSharp로 네 모서리 환자정보 오버레이(흰 글씨+그림자, 해상도 비례 폰트, 한글 시스템 폰트 자동 탐색)를 구워 내보내기 — PPW 5.1 참고",
      "자체포함 단일 파일 게시 + Inno Setup 인스톨러 — WSL에서 wine으로 Setup.exe까지 굽는 파이프라인 (sh-ip-scanner에서 검증한 조합 재사용)",
    ],
    aiUsage: [
      "project-seed 발사대로 킥오프 — 브리프(왜/무엇 SSOT)·세션 부팅 프로토콜·ADR·hooks(.env 차단, git add 가드, dotnet format 자동 실행)를 첫날부터 가동",
      "커밋 전 build·test·format 3종 통과를 전제 조건으로 고정하고, 서버 기능은 라이브 검증까지 — compose 기동 후 실제 로그인/업로드/검색 API 호출, Orthanc으로 C-STORE 실전송 확인을 마쳐야 인스톨러를 굽는다",
      "함정을 CLAUDE.md에 박제해 재발 방지 — ItemsPanelTemplate 안의 컴파일 바인딩은 런타임 크래시(ReflectionBinding 사용), Matrix 변환 호스트는 Canvas 고정, Oracle 바인드 변수 예약어(ORA-01745) 등 실제로 밟은 지뢰만 기록",
      "이 페이지의 스크린샷도 Avalonia 헤드리스 렌더러(tools/ShotTool)로 실제 앱을 구동해 캡처 — 도커로 띄운 Oracle 서버에 실제 로그인해 Worklist 예약 조회까지 라이브로 시연한 화면",
      "학습 교재 12강 PDF도 Claude Code와 함께 제작 — 앱의 실제 코드를 발췌해 자바 개발자 관점(csproj=pom.xml, LINQ=Stream, ADO.NET=JDBC)으로 재구성",
    ],
    screenshots: [
      { src: "/images/projects/sh-dicom-studio/login.jpg", caption: "로그인 — 등록된 서버 목록에서 선택(JWT 인증), 서버 없이 [오프라인으로 계속]도 지원" },
      { src: "/images/projects/sh-dicom-studio/dbconfig.jpg", caption: "서버 설정(DB Config) — 서버 이름·주소 목록 관리, 마지막 선택 기억" },
      { src: "/images/projects/sh-dicom-studio/landing.jpg", caption: "시작 화면 — MAIN TOOLS 타일 + 검사정보 폼 + 다크 뷰어 (dicom-studio의 화면 구조를 Avalonia로 재현)" },
      { src: "/images/projects/sh-dicom-studio/viewer.jpg", caption: "뷰어 — 실제 동맥경화도검사지 2장(식별정보는 가상 값으로 마스킹), 옆으로 스캔된 리포트를 회전으로 세우고 4모서리 환자정보 오버레이를 켠 상태" },
      { src: "/images/projects/sh-dicom-studio/worklist.jpg", caption: "Worklist 허브 [예약 접수] — 도커로 띄운 Oracle 서버의 예약을 라이브 조회, 행 선택 시 환자정보 자동 입력" },
      { src: "/images/projects/sh-dicom-studio/finddb.jpg", caption: "Worklist 허브 [검사 검색] — 내부(로컬)/서버(PACS DB) 탭 + Modality 퀵필터 (PPW 워크리스트 스타일)" },
      { src: "/images/projects/sh-dicom-studio/send.jpg", caption: "검사 보내기 — 목적지(AE Title) 관리·C-ECHO 연결 테스트·C-STORE 전송, Orthanc 도커 컨테이너 동봉" },
      { src: "/images/projects/sh-dicom-studio/jpg-overlay.jpg", caption: "JPG 내보내기 산출물 — ImageSharp로 네 모서리에 환자정보 오버레이를 구운 결과 (PPW 5.1 참고)" },
    ],
    demo: {
      note: "스크린샷의 환자·검사 정보는 전부 가상 값입니다 — 검사지 이미지의 식별정보(ID·이름)도 예시 값으로 마스킹했습니다. 아래 인스톨러로 설치해 직접 사용해볼 수 있습니다 (자체포함 빌드라 .NET 런타임 설치 불필요, 코드 서명이 없어 SmartScreen 경고가 뜰 수 있습니다). 서버 기능(로그인·Worklist·PACS 전송)은 저장소의 docker compose로 로컬에서 재현할 수 있고, 서버 없이도 오프라인으로 모든 변환·조회 기능이 동작합니다.",
    },
    links: [
      { label: "GitHub 저장소", href: "https://github.com/coolmarvel/sh-dicom-studio" },
      { label: "Windows 인스톨러 다운로드 (v1.0.1)", href: "https://github.com/coolmarvel/sh-dicom-studio/releases/download/v1.0.1/sh-dicom-studio-Setup-1.0.1.exe" },
      { label: "학습 교재 PDF — JAVA 개발자를 위한 C# & ASP.NET Core 실전 입문 (12강)", href: "https://github.com/coolmarvel/sh-dicom-studio/releases/download/v1.0.1/csharp-aspnet-study-guide.pdf" },
    ],
  },

  "pt-schedule": {
    role: "설계·개발 전 과정 (백엔드 + 프론트엔드)",
    background: [
      "물리치료실의 치료사별 환자 배정이 수기 시간표로 관리되어 변경·조회·통계가 번거로웠습니다. 치료사별 일일 시간표(08:00~18:00)와 월간 통계, 환자/치료사 검색을 제공하는 운영 도구를 구축했습니다.",
    ],
    architecture: [
      "FastAPI 기능별 라우터 + core(config/database) 구조로 schedule·therapist·auth·calendar·search 5개 도메인 분리",
      "관리자/치료사 이중 인증 — 치료사는 개인 시간표 중심, 관리자는 전체 운영 관리",
      "React 18 + TanStack Query로 시간표 그리드·월간 캘린더 통계(치료사별 환자 수) 구현, 치료사별 색상 구분",
      "cm_groupware와 같은 서버에서 Docker Compose(edge 외부 네트워크 공유)로 운영, 그룹웨어 사이드바에서 바로 진입",
    ],
    aiUsage: [
      "cm_groupware의 문서/하네스 표준을 경량 스택(FastAPI+React)에 이식 — 프로젝트 로컬 Skills 5종을 skills-lock.json 해시로 고정, MCP(playwright·context7)도 프로젝트 로컬 격리",
    ],
    screenshots: [
      { src: "/images/projects/pt-schedule/schedule.jpg", caption: "치료사별 일일 시간표 — 직책별 색상 헤더, 시간대별 환자 배정 (환자·치료사 성명은 블러 처리)" },
    ],
    demo: {
      note: "실제 병원 운영 시스템으로, 환자 정보 보호를 위해 로그인 계정은 공개하지 않습니다. 위 스크린샷은 관리자 화면을 개인정보 블러 처리 후 캡처한 것입니다.",
    },
  },

  "dpp-performance": {
    role: "성능·부하 시험 설계 및 TTA 인증 대응 전담",
    background: [
      "KISA(한국인터넷진흥원)·부산광역시 주관 블록체인(ICON) 기반 전기차 배터리 이력관리·DPP(Digital Product Passport) 인증 사업에서, TTA 공식 성능시험을 통과하기 위한 정량 성능 검증이 필요했습니다.",
    ],
    architecture: [
      "nGrinder Controller·Agent를 NCP에 구성하고 Groovy 부하 테스트 스크립트를 설계·개발",
      "동시 사용자 수·TPS·응답시간 기준 부하 시나리오를 정의하고 단계별 부하 인가로 네트워크별 한계 처리량(임계점) 도출",
      "측정 결과 — 코인 네트워크: 조회(READ) 3,000 TPS / 쓰기(WRITE) 1,000 TPS, 토큰(스마트 컨트랙트) 네트워크: 조회 1,000 TPS / 쓰기 500 TPS",
      "LFT2(PBFT 기반 BFT) 합의와 DPoC 거버넌스 구조를 이해한 위에서 Mainnet/Testnet 환경 간 성능 편차 분석",
      "TTA 담당자와 협업해 시험 기안서·공식 성능시험 결과 보고서를 작성, 인증 절차 대응",
    ],
  },

  "athometrip-commerce": {
    role: "주문·결제 도메인 설계 및 개발",
    background: [
      "워드프레스(WooCommerce)로 운영되던 여행 상품 판매의 유지보수 한계와 사업 확장 수요를 해소하기 위해, 자체 주문·결제 플랫폼을 신규 구축해 레거시를 이관했습니다.",
    ],
    architecture: [
      "Stripe 연동 주문/결제 구조 설계 — 해외 결제 중심 여행 상품 특성에 맞춘 결제 플로우",
      "RabbitMQ 기반 비동기 메시징으로 주문 후처리(알림·정산)를 분리해 결제 응답 지연 최소화",
      "상품 주문과 가이드/협력사 매칭 로직 — 가이드 배정 시스템 구조 설계·개발",
      "Spring Boot + MyBatis + MariaDB, AWS EC2 + Nginx 운영",
    ],
  },

  "gaia-backoffice": {
    role: "백오피스 전체 단독 설계·개발 (MSA 6개 서비스)",
    background: [
      "내부 CS와 외부 협력사(가이드·티켓 발권·셔틀 기사)가 WooCommerce 주문을 수기로 확인·관리하고 있어 누락과 지연이 잦았습니다. 상품별 주문 관리와 일정 리마인드를 자동화하는 어드민 시스템을 단독으로 구축했습니다.",
    ],
    architecture: [
      "주문/발권/리마인드 도메인을 분리한 NestJS MSA 6개 서비스(포트 3000~3005) 단독 설계·개발",
      "WooCommerce Webhook으로 주문 이벤트를 구독하고 WebSocket으로 CS 화면에 실시간 반영 — 주문발권/가이드·셔틀 배정 리마인드의 수기 확인 단계 제거",
      "Next.js + TanStack(React Query/Table)로 대용량 주문 데이터 조회·관리 어드민 UI 구현",
      "Auth.js 기반 인증/인가 — 협력사 역할별(가이드/발권/셔틀) 접근 제어",
    ],
  },

  "fireblocks-custody": {
    role: "백엔드 서버 아키텍처 설계·구현 + 관리 웹 개발",
    background: [
      "기관용 디지털 자산 관리에는 단일 개인키가 아닌 다중 승인 체계가 필수입니다. 사내 권한자(editor·approver·signer)가 역할에 따라 원장을 생성·서명·전송하는 커스터디 시스템을 구축했습니다.",
    ],
    architecture: [
      "Fireblocks MPC 커스터디 SDK 연동 — 지갑 생성·트랜잭션 서명·전송·자산/로그 조회 API 구현",
      "역할 기반 접근제어(RBAC)와 다중 승인(Multi-approval) 흐름을 반영한 권한 처리",
      "Express 기반 서버 아키텍처 설계, Redis 캐싱, JWT 인증",
      "React.js + Redux 기반 반응형 관리 웹, Azure Cloud + JumpBox 운영 환경",
    ],
  },

  wcms: {
    role: "온체인 데이터 수집 파이프라인 설계·구현",
    background: [
      "재단 지갑·암호화폐의 재무 현황을 외부 스캐너에 의존하면 데이터 정합성을 보장할 수 없었습니다. 온체인 원장 데이터를 사내 서버에 직접 수집·적재하는 파이프라인을 구축했습니다.",
    ],
    architecture: [
      "web3.js + 스케줄러(Spring Batch·node-schedule) 기반 온체인 데이터 수집 자동화 파이프라인",
      "일별 시작/종료 블록 넘버 수집, 재단 지갑별 보유 토큰 리스트 집계",
      "토큰 분류(FT/NFT)와 트랜잭션 원장(tx-log) 수집 — 일별 입고/출고(debit/credit) 합계를 UTC·KST 기준 동시 산출",
      "배치 실행 로그를 월별 CSV로 자동 덤프해 감사·정산 추적성 확보",
    ],
  },

  "kr-esg-nft": {
    role: "스마트 컨트랙트 구현·배포 + 백엔드 아키텍처",
    background: [
      "한국렌탈 고객사 대상 ESG 캠페인(연말 나무 심기)의 성과를 증빙 가능한 형태로 남기기 위해, 식수 좌표를 메타데이터에 담은 NFT를 발행·증여하고 ERP 대시보드로 연동했습니다.",
    ],
    architecture: [
      "KIP-17(ERC-721 호환) NFT 스마트 컨트랙트를 Solidity로 구현하고 Truffle로 Klaytn Mainnet에 배포",
      "식수 좌표 등 메타데이터를 IPFS(Infura)에 저장, caver-js로 온체인 발행·증여 트랜잭션 처리",
      "Express 기반 서버 아키텍처 설계·구현, Redis 캐싱, JWT 인증",
      "한국렌탈 ERP 연동 + NFT 발행/증여 현황 대시보드(Next.js + Recoil)",
    ],
  },

  magicdid: {
    role: "백오피스 웹 개발 (인증·차트 시각화)",
    background: [
      "HyperLedger Fabric 기반 분산신원증명(DID) 서비스 'MagicDID'의 발급·갱신·폐기 현황을 한눈에 파악할 운영 도구가 없었습니다. DID 생애주기 지표를 시각화하는 백오피스를 구축했습니다.",
    ],
    architecture: [
      "LG 모나체인 백오피스를 벤치마킹한 웹 인터페이스 설계",
      "DID 발급/갱신/폐기 지표를 ECharts로 시각화하는 차트 데이터 렌더링",
      "JWT 기반 인증(로그인), Redux-Saga 비동기 처리, On-Premise(Ubuntu) 운영",
    ],
  },
};
