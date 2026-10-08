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
  "sh-econsent": {
    role: "기획부터 문서 모델·데스크톱 앱·서버·실행기·인스톨러·서식 변환까지 혼자 만들었습니다",
    background: [
      "병원 전자동의서는 상용 서식 SDK 위에 올라가 있습니다. 서식을 하나 추가하거나 고치려면 전용 디자이너와 벤더 연동이 필요하고 그때마다 비용과 시간이 듭니다. 'PDF 한 장을 병원이 직접 서명 템플릿으로 만들 수 있으면 얼마나 좋을까'가 출발점이었습니다. 기존 제품은 공개된 사용 흐름만 참고했고, 서식 엔진이나 파일 포맷은 들여다보지 않고 제 방식으로 만들었습니다.",
      "처음에는 PDF 위에 입력 영역을 드래그로 얹는 관리자 앱과 현장 서명 앱, 두 개로 시작했습니다. 나흘 만에 클라우드 서버·로그인·자동 업데이트·웹 편집기까지 붙이고 서식 251종을 등재했는데, 써 볼수록 'PDF 위에 칸을 얹는 방식으로는 서식을 설계할 수 없다'는 한계가 분명해졌습니다. 그래서 9월 말에 구조를 다시 잡았습니다. 앱은 하나로 합쳐 권한으로 메뉴를 나누고, 문서는 PDF가 아니라 구조화된 모델로 다루며(PDF는 산출물), 완료본은 바꿀 수 없게 하고 감사 기록을 남기기로 했습니다.",
      "그 뒤 서식을 직접 설계할 도구로 sh Form Designer를 따로 만들었고, 그 엔진을 이 프로젝트에 들여와 이전 병원 PDF 서식 251종을 전부 레이아웃 서식으로 변환했습니다. 원본이 없는 142종은 골격만 잡아 두었습니다. 실환자 데이터는 아직 넣지 않았습니다. 개인정보를 다루기 전에 보안을 다시 점검할 생각이라 지금은 테스트 데이터만 쓰고, 이 페이지의 화면도 전부 가짜 환자와 가상 병원명입니다.",
    ],
    architecture: [
      "솔루션은 Common(API DTO·HTTP 클라이언트·업데이트 로직) / Core(문서 모델·바인딩·완료본 렌더·PDF·서명) / Server(ASP.NET Core 8 Minimal API, 엔드포인트 33개) / App(Avalonia 11 + CommunityToolkit.Mvvm) / Launcher(단일 exe 실행기)로 나눴습니다. Core에는 UI가 없고 Common에는 Skia가 없습니다. 이 경계 덕에 실행기를 가볍게 유지할 수 있었습니다",
      "서버는 JWT 인증과 admin/staff 역할, 로그인 횟수 제한을 갖추고 PostgreSQL 16 + EF Core 8을 씁니다. 감사 로그 테이블은 PostgreSQL 트리거로 추가만 되게 하고, 게시된 서식 버전은 UPDATE/DELETE를 거부하게 했습니다. 애플리케이션 코드가 실수해도 DB가 막습니다",
      "완료는 서버가 재검증하고 서버가 렌더합니다. 작성완료를 누르면 서버가 필수 입력을 다시 검사해 모자라면 422로 돌려보내고, 통과하면 같은 엔진으로 서명 PDF·감사보고서·원본 JSON을 만들어 한 번만 확정합니다. 이후에는 읽기 전용이고 저장·내보내기만 됩니다. 클라이언트가 만든 PDF를 믿지 않기로 한 것이 이 프로젝트에서 가장 중요한 결정이었습니다",
      "서식에 들어가는 환자·직원·병원 정보는 서버가 고정합니다. 환자 DB·로그인한 직원·병원 설정에서 바인딩 스냅샷을 만들어 채우므로, 디자이너에서 쓴 샘플 값이 실제 문서에 새어 들어갈 수 없습니다",
      "임시저장(Ctrl+S)은 서버에 revision 단위로 쌓이고 작성현황 탭에서 이어 씁니다. 완료본 PDF는 디스크 볼륨에 두고 DB에는 메타만 남기며, 파일 경로 탈출은 저장소 계층에서 막습니다",
      "서식 엔진은 sh Form Designer가 만든 패키지를 로컬 NuGet으로 가져다 씁니다. 처음에 실행기까지 Skia가 딸려 가 90MB가 189MB로 불어난 적이 있어서, Core만 엔진을 참조하도록 경계를 다시 그었습니다",
      "실행기는 Inno Setup 인스톨러로 앱과 함께 설치되고 바로가기는 실행기를 가리킵니다. 실행할 때마다 서버 manifest(경로·SHA-256·크기)와 대조해 바뀐 파일만 내려받고, 서버에 못 붙으면 설치본 그대로 실행합니다. 재설치 없이 배포하려고 만든 장치이고 sh Form Designer도 같은 실행기를 씁니다",
      "서버는 docker-compose로 PostgreSQL과 함께 띄웁니다. 클라우드로 옮기는 안도 검토했지만 병원 내부에서 쓰는 시스템이라 당분간 내부 Docker로 두기로 했습니다",
    ],
    sections: [
      {
        title: "현장 흐름 — 환자 앞에서 끊기지 않게",
        icon: "layers",
        intro: "동의서는 의료진이 설명하면서 환자가 보고 서명하는 문서입니다. 그 장면을 염두에 두고 듀얼 모니터와 펜 주석을 넣었습니다.",
        items: [
          "환자를 조회(진료일·진료과·번호·성명)하고 분류 트리에서 서식을 열면 등록번호·환자명·성별/나이·진료과·진단명·설명의사가 자동으로 채워집니다",
          "문서 위에서 바로 입력합니다. 글자·체크·라디오·날짜(달력)·선택 목록·서명 패드가 있고, 필수 입력이 남으면 '남은 필수 n'과 '다음 필수' 이동으로 안내합니다. '대리인 체크 시 대리인 서명 필수' 같은 서식 규칙도 바로 적용됩니다",
          "환자용 화면은 보조 모니터에 테두리 없는 전체화면으로 뜨고 같은 문서를 실시간으로 보여 줍니다. 한쪽이 입력 중이면 다른 쪽은 잠기고, 환자 쪽에는 터치용 큰 도구모음을 둡니다",
          "펜 주석(형광펜·펜·지우개·실행취소)은 설명을 도우려는 것이라 두 화면에 동시에 보이지만 서식 값과 완료본 PDF에는 넣지 않습니다",
          "앱이 예외로 꺼지지 않게 crash.log를 남기고 알리는 보호 장치를 두었고, 로그인 창에는 서버 별칭 선택과 오프라인 시작을 넣었습니다",
        ],
      },
      {
        title: "서식 393종 — 이전 병원 PDF를 레이아웃 서식으로",
        icon: "card",
        intro: "서식 디자이너가 생긴 뒤 'PDF 위 영역' 방식의 옛 서식을 전부 레이아웃 서식으로 옮겼습니다.",
        items: [
          "PyMuPDF로 만든 변환기가 원본 PDF 251종의 텍스트·선·표를 서식 컨트롤로 옮깁니다. 원본이 없는 142종은 골격 서식으로 만들어 함께 게시했습니다",
          "옮기기 전에 DB 덤프와 파일 백업 절차를 정해 두고 진행했습니다",
          "393종을 서버에서 게시 → 작성 → 완료까지 전부 돌려 완료본 502쪽에 문제가 없는 것을 세 차례 확인했습니다",
          "이 페이지에는 이전 병원 서식이나 상용 제품 화면을 넣지 않았습니다. 엔진에 내장한 예제 서식(수술 및 마취 동의서)과 가짜 환자, 가상 병원명만 씁니다",
        ],
      },
      {
        title: "검증 — Headless 렌더로 전수 QA",
        icon: "search",
        intro: "개발은 WSL에서 하는데 창이 없습니다. 그래서 Avalonia Headless로 실제 Skia 렌더를 돌려 눈 대신 코드가 화면을 검사하게 했습니다.",
        items: [
          "환자 미선택·서식 열림·작성 중·완료 등 6개 상태에서 모든 메뉴와 버튼을 눌러 예외·잘림·겹침이 없는지 전수 스윕합니다",
          "열기·입력·서명·저장·완료·재열기를 무작위로 섞은 워크플로를 6시드 × 200단계 돌려 상태 머신이 깨지지 않는지 봅니다",
          "서버 테스트 32건은 Sqlite in-memory로 작업공간·서식 API를, 실서버 E2E 4건은 Docker PostgreSQL 위에서 '관리자 게시 → 직원 작성·완료'와 역할·소유권·익명·경로 탈출 같은 보안 시나리오를 검사합니다",
          "이 페이지의 스크린샷 13장도 같은 Headless 렌더러가 가짜 데이터로 만든 것입니다. 그래서 창 틀 없이 화면 내용만 있습니다",
        ],
      },
    ],
    usage: [
      "아래 Windows 설치 파일을 받아 설치하면 실행기(Launcher)와 앱이 함께 깔립니다. 바로가기는 실행기이고, 실행할 때마다 서버의 새 버전을 확인합니다. 서버가 없으면 설치본 그대로 실행됩니다.",
      "로그인 창에서 서버 별칭을 고르고 사번·비밀번호로 들어갑니다. 서버가 없으면 '오프라인 시작'으로 화면만 둘러볼 수 있습니다.",
      "동의서 작성 탭에서 환자를 고르고 서식 트리에서 서식을 누르면 환자 정보가 채워진 문서가 열립니다. 보조 모니터가 있으면 환자용 화면을 띄워 같이 봅니다.",
      "입력·서명 뒤 작성완료를 누르면 서버가 필수 입력을 다시 확인하고 완료본을 확정합니다. 작성현황 탭에서 서명 PDF·감사보고서·원본 JSON을 저장합니다.",
      "서식은 sh Form Designer에서 만들어 '게시'하고, 관리자는 서식 관리 탭에서 버전을 보고 폐기(삭제 아님)합니다.",
    ],
    aiUsage: [
      "Claude Code와 Codex를 번갈아 쓰며 만들었습니다. 제 역할은 무엇을 만들지와 판단 기준을 문서로 고정하고, AI가 낸 코드를 검증 없이는 받지 않는 구조를 만드는 것이었습니다. 브리프와 작업 규칙(CLAUDE.md), 세션 로그, ADR 12건이 그 장치입니다",
      "검증을 통과하지 않으면 커밋하지 못하게 했습니다. dotnet build && dotnet test가 게이트이고, 전수 QA 스윕·무작위 워크플로·393종 E2E가 AI가 만든 화면과 로직을 걸러 주는 안전망입니다",
      "훅으로 사고를 막습니다. .env 편집과 git add -A를 차단하고, C# 파일을 저장하면 dotnet format이 돕니다",
      "한 번 밟은 함정은 규칙으로 남겼습니다. 좌표는 0..1 정규화만 저장할 것, 서명 완성본은 재편집 금지, 환자 정보·DB 파일·완료본 커밋 금지, UI 코드를 Core에 넣지 말 것, 실행기에 Skia가 딸려 간 사고까지 적어 두어 같은 실수를 반복하지 않게 했습니다",
      "피드백은 스크린샷으로 줍니다. 레포 루트에 화면을 넣어 두면 다음 세션이 읽어 반영하고 아카이브로 옮깁니다. 환자 정보가 찍힌 타사 화면과 실서식 원본은 gitignore로 로컬에만 둡니다",
      "벤치마크한 상용 제품명은 저장소 이력에서 전부 지웠습니다. 문서·커밋 메시지·코드 어디에도 남기지 않았고 이 페이지도 같은 원칙입니다",
    ],
    screenshots: [
      { src: "/images/projects/sh-econsent/01-login.jpg", caption: "로그인 — 서버 별칭 선택·사번·비밀번호·아이디 저장, 서버가 없으면 오프라인 시작" },
      { src: "/images/projects/sh-econsent/02-main-patients-and-form-tree.jpg", caption: "동의서 작성 탭 — 환자 조회(진료일·진료과·번호·성명)와 분류별 연결선 서식 트리, 클래식 메뉴바·도구모음" },
      { src: "/images/projects/sh-econsent/03-form-open-patient-bound.jpg", caption: "서식 열림 — 등록번호·환자명·성별/나이·진료과·진단명이 자동 채움, 체크·라디오 입력, 우상단 '남은 필수 1'" },
      { src: "/images/projects/sh-econsent/04-select-popup.jpg", caption: "선택 목록 입력기 — 대리인 관계 칸 옆에 뜨는 목록(배우자·자녀·부모·기타·선택 안 함), 대상 칸은 주황 테두리" },
      { src: "/images/projects/sh-econsent/05-date-calendar.jpg", caption: "달력 입력기 — 작성일시 칸을 누르면 한국어 달력, 오늘·지우기" },
      { src: "/images/projects/sh-econsent/06-signature-pad.jpg", caption: "서명 패드 — 칸 비율 그대로의 패드(펜·터치·마우스), 초기화·저장·취소" },
      { src: "/images/projects/sh-econsent/07-pen-annotation.jpg", caption: "펜 주석 — 설명하며 형광펜 밑줄·빨간 펜 동그라미, 서식 값에는 영향 없음, '남은 필수 0'" },
      { src: "/images/projects/sh-econsent/08-patient-screen-dual-monitor.jpg", caption: "환자용 화면 — 보조 모니터 전체화면에 같은 문서와 펜 획이 실시간으로 보이고, 우하단에 큰 터치 도구모음" },
      { src: "/images/projects/sh-econsent/09-completed-read-only.jpg", caption: "작성완료 — 서버가 필수 입력을 다시 확인하고 완료본 PDF를 확정, 이후 읽기 전용(완료 · v1 · r3)" },
      { src: "/images/projects/sh-econsent/10-output-page1.jpg", caption: "완료본 1쪽 — 서버 완료 PDF와 같은 엔진으로 그린 출력, 펜 주석은 정책대로 제외" },
      { src: "/images/projects/sh-econsent/10-output-page2.jpg", caption: "완료본 2쪽 — 작성일시·환자 서명 획·대리인 선택값·설명의사, 바닥글 2/2" },
      { src: "/images/projects/sh-econsent/11-document-status.jpg", caption: "작성현황 탭 — 작성 중/완료 문서 목록, 열기/이어쓰기, 완료본 저장(서명 PDF·감사보고서·원본 JSON)" },
      { src: "/images/projects/sh-econsent/12-form-admin.jpg", caption: "서식 관리 탭(관리자) — 서버에 게시된 서식 코드·분류·버전·게시자, 폐기(삭제 아님). 서식은 sh Form Designer에서 만듭니다" },
    ],
    demo: {
      note: "병원 내부용 시스템이라 공개 서버는 없습니다. 아래 Windows 설치 파일을 받아 설치하면 로그인 창의 '오프라인 시작'으로 화면을 둘러볼 수 있습니다. 실행기가 서버를 찾지 못하면 설치본 그대로 실행되니 그냥 받아서 열어 봐도 됩니다. 서식 작성·서명·완료는 서버(ASP.NET Core + PostgreSQL, docker compose)가 있어야 동작합니다. 화면의 환자·직원·병원명은 전부 가짜 데이터입니다.",
    },
    // 저장소가 비공개라 설치 파일은 포트폴리오 저장소 릴리스에 올린다(dicom-studio 전례).
    links: [{ label: "Windows 설치 파일 (v0.2.11)", href: "https://github.com/coolmarvel/coolmarvel.github.io/releases/download/sh-econsent-v0.2.11/sh-econsent-sign-Setup-0.2.11.exe" }],
    privateRepo: true,
  },
  "sh-form-designer": {
    role: "서식 모델·엔진·디자이너·뷰어·서버 연동·인스톨러까지 혼자 만들었습니다",
    background: [
      "sh e-Consent 구조를 다시 잡던 중에 '서식을 직접 설계할 수단이 없다'는 문제가 남았습니다. 병원은 지금까지 상용 서식 디자이너로 서식을 만들어 왔고, PDF 위에 칸만 얹는 방식으로는 표·섹션·규칙이 있는 서식을 만들 수 없었습니다. 요구는 제 머릿속에 분명했습니다. 병원이 쓰던 디자이너처럼 설명서대로 쓸 수 있을 것, 서식은 sh-econsent 서버 DB로 관리할 것, 웹 편집기는 만들지 않을 것. 그래서 별도 저장소로 시작해 병렬로 개발했습니다.",
      "상용 제품은 공개된 기능과 사용 흐름만 참고했습니다. 바이너리 분석이나 파일 포맷·상표·아이콘 복제는 하지 않았고, 저장소와 문서, 커밋 이력에서 벤치마크 제품명도 모두 지웠습니다. 이 페이지에도 쓰지 않습니다.",
      "8일 동안 v0.1.0에서 v0.1.9까지 인스톨러를 8번 전달했습니다. 테스트는 엔진 51건과 디자이너 60건이고, 전수 QA 모드에서는 87건이 더 돕니다. 이 페이지의 디자이너 화면은 Headless 렌더 테스트가 만든 것이고, 환자 작성 화면은 sh-econsent 쪽에서 같은 방식으로 만들었습니다.",
    ],
    architecture: [
      "프로젝트는 셋입니다. ShForm.Engine은 UI 없는 서식 엔진(모델·JSON·식 언어·레이아웃·Skia 렌더·규칙·내보내기), ShForm.Viewer는 Avalonia 작성 화면 부품(FormViewer·SignaturePad·FillController·펜 레이어), ShForm.Designer는 리본·도킹·디자인 캔버스·속성창·대화상자·미리 보기·서버 연동입니다. Engine과 Viewer는 NuGet 패키지로 내보냅니다",
      "서식 모델은 FormDocument → 용지 설정·필드 정의(매개변수·데이터셋·공식·누적합산)·이름 있는 스타일 → Section(보고서/페이지/데이터/그룹 머리글·바닥글, 본문, 배경/전경) → Subsection → FormControl 계층입니다. 정적 컨트롤은 선·사각형·글상자·표·이미지·바코드(Code39·128·EAN·Codabar), 입력 컨트롤은 7종이고 KEY·필수·오류 문구·입력 순서를 갖습니다",
      ".shform은 JSON입니다. 좌표는 서브섹션 좌상단 기준 mm(0.1mm 반올림)이고 화면 픽셀은 저장하지 않습니다. 기본값과 같은 속성은 생략해 파일을 줄였습니다",
      "식 언어는 JS 식의 부분집합을 Pratt 파서로 직접 구현했습니다. parameter.X · data.x · system.PageNofM · formula.F · input.KEY와 집계·필드·날짜 함수를 지원하고 평가 단계에 상한을 두었습니다. 임의 JavaScript는 실행하지 않습니다. 식 편집기는 문법 검사와 샘플 결과('홍길동 (67세)')를 바로 보여 줍니다",
      "서식 스크립트 자리는 선언형 규칙이 대신합니다. when(식) → then/else 동작(require·show·hide·enable·set·check·select 등)으로 적고, 상태형은 조건이 거짓이 되면 자동으로 원복, 이벤트형은 KEY 변경이 트리거입니다",
      "레이아웃은 밴드 페이지네이션입니다. 머리글/바닥글을 예약한 뒤 흐름 배치를 하고, 쪽을 넘는 서브섹션은 컨트롤 묶음 단위, 표는 행 단위로 나눕니다. 렌더는 SkiaPainter 하나이고 디자인/뷰어/인쇄/내보내기는 그리는 대상만 다릅니다. PDF도 SkiaSharp SKDocument로 만들어 화면과 같은 경로를 탑니다",
      "서버 연동은 sh-econsent 서버에 관리자로 로그인해 서버에서 열기, 새 버전 게시, 필드 카탈로그 가져오기를 합니다. 게시 전에 주민번호 같은 개인정보 패턴을 린트로 막고, 게시된 버전은 서버 쪽 트리거로 바꿀 수 없습니다",
      "글꼴은 나눔고딕을 임베드하고 기호·한자 보조 글꼴(Noto Sans CJK KR 부분집합, DejaVu 기호)을 엔진에 번들해 어느 PC에서든 같은 그림이 나오게 했습니다",
    ],
    sections: [
      {
        title: "디자이너 — 설명서대로 쓸 수 있게",
        icon: "layers",
        intro: "Avalonia에는 리본·도킹·속성창이 없어 전부 직접 만들었습니다. 다른 제 앱들과 같은 클래식 UI입니다.",
        items: [
          "리본 8탭. 홈(클립보드·글꼴·정렬·데이터 값·스타일), 삽입(선·도형·글상자·표·그림·바코드·입력 7종·섹션), 데이터/필드(데이터셋·매개변수·공식·누적합산·규칙), 섹션, 컨트롤, 보기, 서버, 그리고 표를 고르면 나타나는 표 상황 탭",
          "필드 창 연결선 트리(데이터·매개변수·시스템 필드·입력 KEY)에서 끌어 놓고, 객체 창 트리(섹션 → 서브섹션 → 컨트롤·KEY)로 구조를 봅니다. 속성창은 다중 선택(셀 4개)도 한 번에 편집합니다",
          "편집. 끌기·크기·정렬 8종·같은 크기 3종·순서 4종·복사/붙여넣기·실행취소 100단계·찾기·스타일·'기능 사용 객체 표시'(입력 컨트롤 주황 강조)·확대/축소·제자리 텍스트 편집·우클릭 메뉴·특수문자",
          "표. 셀 범위 선택, 행/열 삽입·삭제, 셀 합치기/나누기, 셀별 테두리 9방향·두께·색, 표 속성·셀 체크박스",
          "미리 보기가 곧 작성 시험입니다. 샘플 데이터 바인딩, 입력기·달력·선택 목록·서명 패드, 펜 주석, 환자용 전체화면(같은 세션), 필수 검사, PDF/PNG/값 JSON 내보내기",
        ],
      },
      {
        title: "성능 — 컨트롤 1,155개 서식에서 끌기 수 ms",
        icon: "spark",
        intro: "이관한 서식 중 큰 것은 컨트롤이 천 개가 넘습니다. 끌기가 167ms씩 걸려 뚝뚝 끊기는 걸 보고 v0.1.6에서 수 ms로 내렸고, 그 예산을 테스트로 고정했습니다.",
        items: [
          "컨트롤별 SKPicture 캐시 + 화면 해상도 비트맵 굳히기. 바뀐 컨트롤만 다시 그리고 나머지는 비트맵을 재사용합니다",
          "위치·크기만 바뀐 편집은 문서 전체 스냅샷 대신 기하 변화만 실행취소에 기록합니다",
          "속성창은 선택이 바뀔 때 보이는 섹션만 만듭니다. 이 때문에 값이 안 보이는 버그가 한 번 생겼는데 전수 스윕이 잡아 주었습니다",
          "끌기·선택·렌더 시간 예산을 검사하는 테스트가 회귀를 막습니다",
        ],
      },
      {
        title: "전수 QA — 눈 대신 코드가 화면을 검사",
        icon: "search",
        intro: "WSL에서 Avalonia Headless로 실제 Skia 렌더를 돌립니다. 엔진 퍼즈 1,791건의 극단값 변이까지 포함합니다.",
        items: [
          "선택 상태 13종 × 리본 전 버튼을 눌러 예외·레이아웃 겹침이 없는지 전수 스윕합니다",
          "편집 40여 종을 12시드 × 300단계, 작성 화면을 6시드 × 150단계 무작위로 돌리고 매 단계 캐시 화면과 전체 렌더를 픽셀 비교합니다",
          "전수 QA 모드에서는 이관 서식 393종의 입력칸 10,592개를 전부 클릭합니다(87 케이스, 15분 50초)",
          "리본 탭 7개·대화상자 16종·미리 보기를 실제 크기로 렌더해 PNG로 남기는 갤러리 테스트가 있습니다. 이 페이지의 대화상자 화면 일부도 그 갤러리에서 가져왔습니다",
        ],
      },
    ],
    usage: [
      "아래 Windows 설치 파일을 받아 설치합니다. 바로가기는 실행기이고, sh-econsent 서버가 있으면 바뀐 파일만 받아 갱신합니다. 서버가 없어도 설치본 그대로 실행됩니다.",
      "파일 ▸ 새로 만들기(예제 서식)로 '수술 및 마취 동의서' 예제를 열거나, 병원 공통 틀로 빈 서식을 시작합니다.",
      "삽입 탭에서 글상자·표·입력 컨트롤을 끌어 그리고, 필드 창의 데이터·매개변수를 끌어 놓아 바인딩합니다. 규칙 편집기로 '대리인 체크 시 서명 필수' 같은 동작을 추가합니다.",
      "미리 보기에서 샘플 데이터로 실제 작성·서명·펜 주석을 시험하고 PDF로 내보내 확인합니다.",
      "서버 탭에서 관리자로 로그인해 새 버전으로 게시하면 sh e-Consent 앱의 서식 트리에 바로 나타납니다.",
    ],
    aiUsage: [
      "sh e-Consent와 같은 방식으로 Claude Code와 함께 만들었습니다. 시작할 때 브리프와 절대 규칙(상용 제품 clean-room, 개인정보 금지 포함)을 먼저 적었고, 설계가 흔들릴 때마다 브리프가 판정 기준이 됐습니다",
      "dotnet build && dotnet test를 통과하지 않으면 커밋하지 않습니다. .env 편집과 git add -A는 훅이 막고, 저장하면 dotnet format이 돕니다",
      "AI가 만든 UI는 AI가 검사하게 했습니다. 전수 스윕·무작위 편집·성능 예산·갤러리 렌더를 테스트로 두어 '보기엔 되는데 눌러 보면 깨지는' 산출물을 걸렀습니다. 객체 대화상자가 꺼지는 문제와 속성창 값이 안 보이는 문제가 이 경로로 잡혔습니다",
      "제 피드백은 스크린샷으로 줍니다. UI 전면 정비 때 12장, 그다음 판에 10장을 넣어 반영했습니다. 벤더 매뉴얼 이미지는 저작물이라 로컬에만 둡니다",
      "엔진을 로컬 NuGet으로 내보내고 sh-econsent에 가져오는 과정을 스크립트로 고정해 두 저장소의 엔진 버전이 어긋나지 않게 했습니다",
    ],
    screenshots: [
      { src: "/images/projects/sh-form-designer/01-designer-main.jpg", caption: "메인 화면 — 홈 리본, 필드 창 연결선 트리, A4 디자인 캔버스(섹션 바·mm 눈금자), 선택 핸들, 속성창" },
      { src: "/images/projects/sh-form-designer/02-table-cells-and-table-tab.jpg", caption: "표 편집 — 셀 범위 선택 시 표 상황 탭(행/열 삽입·삭제, 합치기/나누기, 셀 테두리), 속성창은 '셀 4개' 다중 편집" },
      { src: "/images/projects/sh-form-designer/03-input-control-and-controls-tab.jpg", caption: "입력 컨트롤 — 라디오(같은 KEY = 그룹) 선택, 컨트롤 탭, 필수 입력·오류 문구·입력 순서·체크 모양 속성" },
      { src: "/images/projects/sh-form-designer/04-highlight-input-controls.jpg", caption: "보기 탭 — '기능 사용 객체 표시'로 입력 컨트롤을 주황으로 강조, 눈금점·격자 맞춤·확대/축소" },
      { src: "/images/projects/sh-form-designer/05-insert-tab-drawing-control.jpg", caption: "삽입 탭 — 선·도형·글상자·표·그림·바코드·입력 7종·섹션, 끌어서 새 글상자를 그리는 중" },
      { src: "/images/projects/sh-form-designer/06-sections-and-object-tree.jpg", caption: "섹션 탭과 객체 창 — 서브섹션 높이·합치기·나누기, 객체 트리(섹션 → 서브섹션 → 컨트롤·KEY)" },
      { src: "/images/projects/sh-form-designer/07-data-tab-zoom-150.jpg", caption: "데이터/필드 탭 — 데이터셋·매개변수·공식·누적합산·규칙 편집, 150% 확대" },
      { src: "/images/projects/sh-form-designer/08-dialog-datasets.jpg", caption: "데이터셋 관리 — JSON/XML/CSV 데이터셋, 필드 리스트, 반복 경로·구분자, 샘플 데이터(가상)" },
      { src: "/images/projects/sh-form-designer/09-dialog-data-view.jpg", caption: "데이터 보기 — 샘플 데이터를 표로 확인" },
      { src: "/images/projects/sh-form-designer/10-dialog-parameters.jpg", caption: "매개변수 — OCR 번호·진단명·수술명·담당의·병원명 등 서버가 채울 값과 기본값·표시 문자" },
      { src: "/images/projects/sh-form-designer/11-dialog-rules.jpg", caption: "규칙 편집기 — '대리인 체크 시 서명·사유 필수' 같은 when → then/else 규칙, 상태형/이벤트형 동작 방식" },
      { src: "/images/projects/sh-form-designer/12-dialog-expression-editor.jpg", caption: "식 편집기 — 필드·함수 트리, 문법 검사와 샘플 결과('홍길동 (67세)')를 바로 표시" },
      { src: "/images/projects/sh-form-designer/13-dialog-sections.jpg", caption: "섹션 관리 — 보고서/페이지/데이터 머리글·바닥글·배경·전경 토글, 서브섹션·그룹 섹션" },
      { src: "/images/projects/sh-form-designer/14-dialog-paper.jpg", caption: "용지 설정 — 종류·방향·사용자 크기·여백(mm)" },
      { src: "/images/projects/sh-form-designer/15-dialog-insert-table.jpg", caption: "표 만들기 — 행·열 수" },
      { src: "/images/projects/sh-form-designer/16-dialog-server-login.jpg", caption: "서버 로그인 — sh-econsent 서버 별칭·사번·비밀번호(관리자만 게시 가능)" },
      { src: "/images/projects/sh-form-designer/25-ribbon-server-tab.jpg", caption: "서버 탭 — 로그인·서버에서 열기·게시·필드 가져오기, 내보내기 PDF/PNG" },
      { src: "/images/projects/sh-form-designer/26-dialog-find.jpg", caption: "찾기 — 이름·문자열·필드로 컨트롤 찾기" },
      { src: "/images/projects/sh-form-designer/27-dialog-settings.jpg", caption: "환경설정 — 눈금점 간격·기본 여백·격자 맞춤·새 서식 기본 틀·서버 목록" },
      { src: "/images/projects/sh-form-designer/28-dialog-special-chars.jpg", caption: "특수문자 — 번들 기호 글꼴의 기호를 골라 제자리 입력" },
      { src: "/images/projects/sh-form-designer/29-dialog-document-info.jpg", caption: "문서 정보 — 제목·주제·작성자·키워드, 스키마 버전·서식 ID·코드, 본문 데이터셋" },
      { src: "/images/projects/sh-form-designer/17-preview-filled.jpg", caption: "미리 보기(작성 시험) — 샘플 데이터가 바인딩된 동의서에 체크·라디오 입력, 도구모음(PDF·PNG·값 JSON·펜·필수 검사·전체화면)" },
      { src: "/images/projects/sh-form-designer/18-preview-select-popup.jpg", caption: "미리 보기 2쪽 — 환자 서명 획, 대리인 칸의 선택 목록 팝업, 대리인 서명 사유 라디오" },
      { src: "/images/projects/sh-form-designer/19-preview-date-calendar.jpg", caption: "미리 보기 — 작성일시 칸의 날짜 선택 달력" },
      { src: "/images/projects/sh-form-designer/20-preview-signature-pad.jpg", caption: "미리 보기 — 환자 서명 패드(초기화·저장·취소), 대상 칸은 주황 편집 테두리" },
      { src: "/images/projects/sh-form-designer/21-preview-pen-annotation.jpg", caption: "미리 보기 — 노란 형광펜 주석, 텍스트 태그 렌더(굵게·빨강)" },
      { src: "/images/projects/sh-form-designer/22-patient-fullscreen.jpg", caption: "환자용 전체화면 — 같은 세션의 체크·라디오·주석이 공유되고 큰 터치 도구모음" },
      { src: "/images/projects/sh-form-designer/23-output-page1.jpg", caption: "출력 1쪽 — PDF와 같은 엔진 그리기, 주석·가이드는 제외, 바닥글에 쪽 번호·병원명·출력 시각" },
      { src: "/images/projects/sh-form-designer/23-output-page2.jpg", caption: "출력 2쪽 — 작성일시·서명 획·대리인 서명 사유·설명의사" },
      { src: "/images/projects/sh-form-designer/24-new-from-hospital-template.jpg", caption: "새로 만들기(병원 공통 틀) — 머리글 OCR 번호, 바닥글 등록번호·환자명·쪽 번호·병원명·출력 시각 식이 미리 들어간 빈 서식" },
    ],
    demo: {
      note: "병원 서식 담당자용 도구라 공개 서버는 없습니다. 아래 Windows 설치 파일을 받아 설치하면 서버 없이도 예제 서식을 열어 설계·미리 보기·PDF 내보내기를 바로 써 볼 수 있습니다. 서버에서 열기·게시만 sh-econsent 서버가 필요합니다.",
    },
    // 저장소가 비공개라 설치 파일은 포트폴리오 저장소 릴리스에 올린다.
    links: [{ label: "Windows 설치 파일 (v0.1.9)", href: "https://github.com/coolmarvel/coolmarvel.github.io/releases/download/sh-form-designer-v0.1.9/sh-form-designer-Setup-0.1.9.exe" }],
    privateRepo: true,
  },
  "sh-compositor": {
    role: "이식 설계·렌더 엔진·Rust 커널·AI 통합·명령 계층·MCP 서버·인스톨러까지 혼자 만들었습니다",
    background: [
      "Photoshop은 비싸고 GIMP는 손에 익지 않았습니다. Compositor(robbietilton, Wonder Assembly LLC, MIT)는 좋은 무료 대안이지만 Swift/SwiftUI/Metal로 된 macOS 전용이라 Windows에서 쓸 수 없었습니다. 파일 변환기에 Compositor의 보정 수식을 옮기다가 '레이어 편집기는 따로 만들자. 화면은 Compositor 구조를 따르고 껍데기만 우리 클래식 UI로' 하고 갈라져 나온 프로젝트입니다. 첫 마일스톤의 성공 기준은 'Compositor에서 되는 건 Windows에서 우리 UI로 다 된다'였습니다.",
      "9월 21일 당일에 첫 설치본을 내고 직접 설치해 보며 고쳤습니다. 같은 날 PSD·성능·눈금자·AI 피사체 선택(v1.0.0), SlimSAM 개체 선택(v1.0.1), 사용 설명서와 설치 파일 다이어트(v1.0.2)를 냈고, 이튿날 Rust 리터칭 가속과 명령 계층·웹·headless·MCP, 23일에 MCP 도구 51개와 포토샵 대비 부족 기능 8종, 28일에 AI 지우개까지 8일간 11번 릴리스했습니다.",
      "설치 파일 325MB의 대부분은 AI 모델(배경 제거 212MB · SlimSAM 35MB · LaMa 92MB)입니다. 사용자 PC에 Rust 툴체인은 필요 없고, 빌드한 wasm을 소스와 함께 저장소에 둡니다.",
    ],
    architecture: [
      "구조. Electron main(frame:false 창, 커스텀 프로토콜로 모델 오프라인 서빙, 원자적 저장, 자동 저장 복구, SharedArrayBuffer) / preload / renderer(React UI·도구 17종·WebGL2 렌더러 + Web Worker 4종: 배경 제거·SlimSAM·LaMa·PNG/zip 저장) / core(순수 TS 문서 모델, 혼합 16종, CPU 합성, 이력, 선택, 브러시, PSD, .shcomp) / application(UI 독립 명령 36개 + MCP 도구 58개) / server(headless HTTP + MCP, Bearer 토큰)",
      "CPU 진실 · GPU 거울. Uint8ClampedArray 비트맵이 정답이고 WebGL2는 바뀐 사각형만 올려 받아 그리는 거울입니다. 테스트는 GPU 화면 픽셀과 CPU 합성 결과를 지점 비교로 확인합니다. WebGL2가 없으면 안내하고, SwiftShader로도 돌아 GPU 없는 환경에서 E2E가 통과합니다",
      "Rust → WebAssembly. kernel.rs 단일 파일을 외부 crate 없이 rustc --target wasm32-unknown-unknown으로 빌드한 24KB를 씁니다. 벤치 중앙값이 TypeScript보다 1.5배 이상 빠른 것만 채택했습니다. 리터칭(흐림·문지르기·리퀴파이)·가우시안 블러·중간값 필터는 통과했고 닷지·번·스펀지는 기준 미달이라 TypeScript에 남겼습니다. wasm 로딩이 실패하면 TypeScript로 폴백합니다",
      "온디바이스 AI. imgly isnet(1.4.5 고정, AGPL-3.0)으로 배경 제거 → 레이어 마스크, SlimSAM-50 q8(Apache-2.0)으로 사각형/클릭/올가미 개체 선택, LaMa(Apache-2.0, 512 입력)로 AI 지우개 인페인팅. ORT wasm 멀티스레드로 1스레드 15.5초를 8스레드 4.7초로 줄였고, 추론 중 화면이 800ms 이상 멈추지 않는지 측정합니다",
      "비동기 저장. 탭 ID + 스냅샷으로 저장 중에도 편집할 수 있고, 1분마다 자동 저장해 비정상 종료 뒤 복구를 묻습니다. 워커 생명주기는 한 곳에서 관리합니다",
      "명령 계층. 명령 36개가 UI와 무관하게 revision·operationId·job을 다루고, 그 위에 데스크톱(편집기 탭이 권위), 웹 로컬 편집기(IndexedDB 복구·File System Access), headless 서버(owner별 메모리 문서)가 올라갑니다. expectedRevision이 다르면 충돌로 거절합니다",
      "MCP 서버. @modelcontextprotocol/sdk + zod 스키마로 compositor_* 도구 58개(문서·레이어·선택·칠하기·보정·필터·AI·내보내기). stdio는 claude mcp add로, Streamable HTTP는 Bearer 토큰으로 붙습니다. Claude Code를 실제 클라이언트로 연결해 도구 5번 호출·7턴으로 편집이 끝나는 것을 확인했습니다",
      "파일. .shcomp(Compositor .comp v7 호환 zip)·.comp 폴더 열기·PSD 열기/저장(ag-psd)·PNG/JPEG/WebP 내보내기(실제 인코딩 미리보기)·레이어별·선택 영역 PNG·HEIC/TIFF 읽기. 설치본은 javascript-obfuscator로 난독화하고 .shcomp 파일 연결을 등록합니다",
    ],
    sections: [
      {
        title: "포토샵 문법 — Compositor 전 기능 + 부족분 8종",
        icon: "layers",
        intro: "저는 포토샵 단축키로 일합니다. v1.2.0에서 포토샵 대비 비어 있던 자리를 채웠습니다.",
        items: [
          "도구 17종(키 15개). 이동·변형 V, 사각/타원 선택 M, 올가미 L, 마법봉·개체 선택 W, 자르기 C, 브러시 B/지우개 E, 스팟 복구·AI 지우개 J, 복제 도장 S, 흐림·문지르기·리퀴파이 R, 닷지·번·스펀지 O, 펜 P, 그라데이션 G, 도형 U, 문자 T, 스포이트 I, 손 H, 돋보기 Z",
          "레이어. 혼합 모드 16종·불투명도·폴더·레이어/폴더 마스크·클리핑·벡터 마스크·조정 레이어 12종·레이어 효과 7종(외곽선·그림자·색 덮기·안쪽 그림자·외부 광선·그라데이션 덮기·경사와 엠보스)·잠금 3종",
          "선택. 더하기/빼기, 반전·확장·축소·페더·매끄럽게, 색상 범위, 퀵 마스크(Q), 가장자리 다듬기, 피사체(AI). 선택 영역 PNG·병합하여 복사",
          "v1.2.0 추가 8종. 닷지·번·스펀지, 펜 도구 + 패스 패널, 퀵 마스크, 브러시 팁·질감·필압, 글자별 서식·세로쓰기, 중간값·언샤프·하이 패스, 모자이크·노이즈 감소, 히스토그램·내비게이터·견본 패널",
          "UI. 포토샵식 단축키, 작업 내역·스냅샷, 탭 여러 문서, 눈금자·안내선·스냅, 사용 설명서(F1, MCP 탭 포함), 환경 설정(실행 취소 메모리 한도), 스킨 13종",
        ],
      },
      {
        title: "간편 AI — 버튼 한 번을 원하는 사람을 위해",
        icon: "spark",
        intro: "여기까지는 포토샵을 배운 사람용이었습니다. 버튼 한 번으로 끝내고 싶은 사람을 위해 v1.2.1을 냈습니다.",
        items: [
          "AI 지우개(J). 빨간 형광펜으로 사람·전봇대 같은 것을 칠하면 LaMa가 지우고 배경을 자연스럽게 채웁니다. MI-GAN과 비교해 LaMa를 골랐고, 한 단계 실행취소로 되돌립니다",
          "간편 AI 메뉴. 선택 영역을 AI로 지우기, 배경 흐리게(인물 사진처럼), 배경을 흰색으로, 배경 투명하게(누끼), 피사체 선택, 사진 자동 보정",
          "개체 선택(W). 사각형으로 넉넉히 감싸거나 클릭 한 번이면 SlimSAM이 테두리에 맞춰 선택합니다(IoU 0.9 이상을 테스트가 확인). 테두리 ±px 조절",
          "배경 제거는 파괴적 삭제가 아니라 레이어 마스크로 들어가 마스크를 칠해 다듬을 수 있습니다. 내장 모델(오프라인)과 최신 온라인 모델 중 선택",
        ],
      },
      {
        title: "검증 — 실제 앱 E2E 177 + 성능·문구 감사",
        icon: "search",
        intro: "화면 조작은 전부 실제 마우스·키보드이고, 상태 확인만 테스트 모드에서 노출한 내부 객체를 읽습니다.",
        items: [
          "Electron E2E 135(Playwright _electron, Xvfb). 새 캔버스·브러시·선택·레이어·혼합·마스크·조정·필터·PSD·저장/복구·AI(실모델) 그룹별로 앱을 새로 띄워 격리하고, 콘솔 오류 0을 조건으로 둡니다",
          "웹 E2E 17(헤드리스 Chromium). 생성 → 열기 → 편집 → 리터칭(WASM) → 저장 → 다시 열기 → 자동 저장·복구, 그리고 WASM 실패 시 TS 폴백·저장 공간 초과 안내",
          "MCP E2E 25. 공식 SDK 클라이언트로 도구 58개를 전부 호출합니다. 그 밖에 대화상자·메뉴·도구 줄 88장을 찍어 문구를 검수하는 감사, 체감 성능 측정, Rust 채택 판정 벤치가 있습니다",
          "이 페이지의 스크린샷도 실제 앱을 띄워 2배 해상도로 찍었고, 개체 선택·AI 지우개·배경 제거 화면은 실제 모델 추론 결과입니다",
        ],
      },
    ],
    usage: [
      "아래 Windows 설치 파일(NSIS)을 받아 설치합니다. AI 모델이 동봉돼 있어 설치 후 네트워크 없이 동작합니다.",
      "파일 ▸ 열기로 사진·PSD·.shcomp를 열거나 Ctrl+N으로 새 캔버스를 만듭니다. 도구는 포토샵과 같은 키(V·M·L·W·B·E·J·T…)입니다.",
      "간편 AI 메뉴에서 배경 흐리게·누끼·자동 보정을 한 번에 적용하거나, J 키로 AI 지우개를 골라 지울 것을 칠합니다.",
      "저장은 .shcomp(Compositor 호환), PSD, PNG/JPEG/WebP 내보내기. 1분마다 자동 저장되고 비정상 종료 뒤 복구를 묻습니다.",
      "AI 클라이언트에서 쓰려면 npm run build:server 후 claude mcp add sh-compositor -- node out/server/index.mjs --stdio 로 붙입니다(도구 58개).",
    ],
    aiUsage: [
      "브리프·부팅 프로토콜·훅(.env 차단·git add -A 차단·Prettier)을 첫 커밋부터 깔고 시작했습니다. Claude Code와 Codex를 번갈아 썼고, 도구에 상관없이 지킬 규칙은 AGENTS.md에, 인계 내용은 handoff 문서에 적어 두 도구가 같은 맥락에서 이어 일하게 했습니다",
      "검증 없이는 전달하지 않습니다. typecheck·단위·빌드·E2E·잔존 프로세스 0을 통과해야 인스톨러를 굽고, 저는 그 설치본을 직접 깔아 보고 스크린샷으로 피드백합니다",
      "AI를 제품 기능으로 넣었습니다. 앱 자체가 MCP 서버가 되어 Claude Code·ChatGPT·Cursor가 편집기를 조작합니다. 작업 순서(문서 생성 → 레이어 목록 → 편집 → 내보내기)와 revision 충돌 규칙은 설명서 MCP 탭에 적었습니다",
      "성능 결정은 감이 아니라 벤치로 합니다. Rust 커널은 중앙값이 TypeScript의 1.5배를 넘는 것만 채택했고, AI 지우개는 MI-GAN과 LaMa를 비교하고 스레드 수별 시간을 재서 골랐습니다. 그 기록은 ADR로 남겼습니다",
      "오픈소스 고지를 빠뜨리지 않았습니다. Compositor MIT, imgly AGPL, SlimSAM, LaMa를 THIRD_PARTY_NOTICES와 정보 대화상자에 적었습니다",
    ],
    screenshots: [
      { src: "/images/projects/sh-compositor/layers.jpg", caption: "메인 화면 — 도구 레일·캔버스·레이어 패널·작업 내역, 도형·브러시 레이어와 사각 선택(개미 행진)·안내선" },
      { src: "/images/projects/sh-compositor/start.jpg", caption: "시작 화면 — 클래식 타이틀바·메뉴 9개·도구 헤더·상태 줄, 문서 없음" },
      { src: "/images/projects/sh-compositor/new-canvas.jpg", caption: "새로 만들기 — 폭·높이·배경" },
      { src: "/images/projects/sh-compositor/layer-effects.jpg", caption: "레이어 효과 — 외곽선·그림자·외부 광선·색 덮기·그라데이션 덮기·경사와 엠보스·안쪽 그림자 7탭, 스티커 프리셋" },
      { src: "/images/projects/sh-compositor/photo-open.jpg", caption: "사진 열기 — 1600×1000 JPEG, 화면에 맞춤(Ctrl+0), 상태 줄에 크기·dpi·배율" },
      { src: "/images/projects/sh-compositor/object-select.jpg", caption: "개체 선택(AI, W) — 풍선을 클릭 한 번으로 SlimSAM이 테두리에 맞춰 선택, 도구 옵션에 사각형/올가미/테두리" },
      { src: "/images/projects/sh-compositor/ai-eraser-paint.jpg", caption: "AI 지우개(J) — 빨간 형광펜으로 지울 것을 칠하는 중(크기 150px)" },
      { src: "/images/projects/sh-compositor/ai-eraser-result.jpg", caption: "AI 지우개 결과 — LaMa 인페인팅이 풍선을 지우고 하늘·산을 자연스럽게 채움, 작업 내역에 'AI 지우개' 한 단계" },
      { src: "/images/projects/sh-compositor/easy-ai-menu.jpg", caption: "간편 AI 메뉴 — AI 지우개·선택 영역 지우기·배경 흐리게·흰색·투명(누끼)·피사체 선택·사진 자동 보정" },
      { src: "/images/projects/sh-compositor/bg-remove-dialog.jpg", caption: "배경 제거(AI) — 내장 모델(오프라인)/최신 온라인 모델 선택" },
      { src: "/images/projects/sh-compositor/bg-remove-result.jpg", caption: "배경 제거 결과 — 삭제가 아니라 레이어 마스크로 들어가고(레이어 패널 썸네일), 토스트로 안내" },
      { src: "/images/projects/sh-compositor/adjust-curves.jpg", caption: "보정 — 커브(채널별, 클릭=점 추가·드래그=이동), S자·밝게 프리셋" },
      { src: "/images/projects/sh-compositor/adjust-hsl.jpg", caption: "보정 — 색조/채도(6색역·색상화)" },
      { src: "/images/projects/sh-compositor/brush-settings.jpg", caption: "브러시 설정 — 팁 모양(둥근·사각·그림)·각도·원형도·간격·흩뿌리기·질감, 획 미리보기" },
      { src: "/images/projects/sh-compositor/quick-mask.jpg", caption: "퀵 마스크(Q) — 선택 밖이 빨간 오버레이로 표시, 브러시로 선택을 칠해 다듬음" },
      { src: "/images/projects/sh-compositor/text-tool.jpg", caption: "문자 도구(T) — 글꼴·크기·굵게·기울임·정렬·줄 간격·자간·세로쓰기, 제자리 입력" },
      { src: "/images/projects/sh-compositor/help-mcp.jpg", caption: "사용 설명서(F1) MCP 탭 — 서버 만들기·stdio/HTTP 연결·작업 순서·revision 충돌 규칙" },
      { src: "/images/projects/sh-compositor/skin-menu.jpg", caption: "보기 ▸ 스킨 — 13종(파랑·갈색·진회색·금색·회색·초록·주황·분홍·보라·빨강·은색·흰색·노랑)" },
      { src: "/images/projects/sh-compositor/skin-dark.jpg", caption: "진회색 스킨 — 크롬 색만 바뀌고 배치는 동일" },
      { src: "/images/projects/sh-compositor/about.jpg", caption: "정보 — 제작 크레딧과 오픈소스 고지(Compositor MIT · imgly AGPL-3.0 · SlimSAM · ag-psd 등)" },
      { src: "/images/projects/sh-compositor/web-editor.jpg", caption: "웹 로컬 편집기 — 같은 코드를 브라우저에서(정적 빌드), 레이어·브러시·작업 내역 동일" },
    ],
    links: [
      { label: "GitHub 저장소", href: "https://github.com/coolmarvel/sh-compositor" },
      { label: "Windows 설치 파일 (v1.2.1)", href: "https://github.com/coolmarvel/sh-compositor/releases/download/v1.2.1/SH-Compositor-Setup-1.2.1.exe" },
    ],
  },
  "sh-messenger": {
    role: "설계·서버·Electron 클라이언트·디자인 계약·인프라·배포까지 혼자 만들었습니다",
    background: [
      "재직 중인 병원에서 쓰려고 만든 사내 메신저가 있었지만, 로그인이 그룹웨어 계정에 묶여 있고 조직도 동기화·이름·도메인·라이선스가 전부 회사 것이었습니다. 개인이 쓰는 서비스로 옮기려면 계정 체계와 브랜딩, UI를 갈아엎어야 했습니다. 그래서 서버 엔진(채팅·업로드·푸시·업데이트)은 이식해 살리고, 계정은 이메일 회원가입으로 바꾸고, Electron 클라이언트는 처음부터 새로 짰습니다.",
      "두 번째 이유는 저장 위치였습니다. 제가 운영하는 2GB짜리 서버 한 대에 남의 대화와 사진을 계속 쌓아 두는 구조는 비용으로도 책임으로도 맞지 않았습니다. 그래서 메시지 본문과 첨부의 원본은 각자 PC에 두고, 서버는 전달과 다른 PC 동기화에 필요한 기간(기본 14일, 못 받은 사람이 있으면 최대 90일)만 갖고 있다가 지우도록 했습니다. 실제로 두 번째 PC에서 대화가 하나도 안 내려오는 문제를 겪고 '받자마자 삭제'를 보관 기간으로 고친 결정입니다.",
      "9월 17일 킥오프에서 브리프를 확정하고 사흘 만에 v0.1.1에서 v0.3.7까지 15번 릴리스했습니다. 테스트는 서버 332건(실제 Postgres·Redis), 데스크톱 유닛 38건, 업데이트 서버 27건, Playwright 브라우저 E2E 38건(2뷰포트), 실제 Electron 앱 E2E 5건입니다.",
    ],
    architecture: [
      "구성. npm 워크스페이스 한 저장소에 apps/desktop(Electron 38 + React 19 + electron-vite), apps/server(NestJS 11 + Prisma 6 + Socket.IO), apps/update-server(electron-updater generic 서버, 의존성은 YAML 파서 하나)를 둡니다. 로컬은 docker compose 한 번으로 API·UI 미리보기·업데이트 서버·Postgres·Redis가 함께 뜹니다",
      "창 구조. 메인 창 420×760(친구·대화·검색·설정)과 대화 창 440×680, 프로필 320×480, 설정·사진 뷰어·대화 서랍이 모두 별도 BrowserWindow입니다. 프레임 없는 창에 자체 타이틀바를 그리고, 드래그 중 작업 영역·다른 창 가장자리 16px 안이면 자석처럼 붙이며(순수 함수 + 유닛 테스트), 창 위치·크기는 대화별로 기억합니다",
      "렌더러 경계. 패키징 앱은 app://bundle 커스텀 프로토콜로 서빙하고 HTML에 CSP를 얹습니다. 오리진이 생기니 모든 창이 localStorage(세션·설정)를 공유하고, 창마다 소켓·스토어를 따로 두고도 읽음·안 읽음이 같이 움직입니다. 렌더러는 preload가 노출한 브릿지로만 메인 프로세스를 부릅니다",
      "서버. NestJS 모듈 경계(auth · chat · contacts · conversations · messages · uploads/storage · link-preview · presence · push · users · health), Prisma 모델 10개, Socket.IO는 Redis 어댑터로 여러 프로세스에 대비했습니다. 친구는 디렉터리 없이 정확 일치 조회 → 추가이고, DM·그룹 생성은 컨트롤러가 친구 사이인지 검사합니다",
      "전달형 저장. Electron은 node:sqlite로 이 PC 보관소를 만들고(사용자별 DB + 미디어 파일), 화면은 항상 로컬을 읽습니다. 서버는 메시지 뼈대·반응·읽음만 영구 보관하고 본문·첨부는 보관 기간이 지나면 1시간 주기 작업(Redis 락)이 지웁니다. 새 PC는 첫 접속 때 그 기간만큼 받아 갑니다",
      "세션. access 15분 + refresh 회전, refresh 토큰은 OS 보안 저장소(safeStorage)에 암호화해 저장합니다. 토큰에 세션 id를 실어 PC 한 대만 로그인시키고, 회전은 Web Locks로 창 사이에서 한 번만 돌게 합니다. 서버가 거절·종료한 소켓은 socket.io가 재접속하지 않으므로 토큰을 회전한 뒤 직접 connect 합니다",
      "첨부. presign → PUT 업로드(XHR 진행률) → 전송. 서버는 640px WebP 썸네일을 만들고, 받은 쪽은 사진·동영상을 미디어 폴더에, 그 밖의 파일은 '받은 파일 폴더'에 원래 이름으로 저장합니다(중복은 (2)). 링크 미리보기는 SSRF를 막은 서버 프록시가 카드를 내려 줍니다",
      "인프라. Lightsail 1대(2 vCPU / 2GB)를 다른 프로젝트와 공유합니다. 공용 Caddy(자동 TLS) 뒤에 채팅 서버·Redis·업데이트 서버 컨테이너를 붙이고 메모리 상한(256/64/96MB)을 걸었으며, 서버에서 빌드하지 않고 WSL에서 만든 이미지를 docker save | ssh docker load로 보냅니다. 배포 스크립트는 다른 프로젝트의 사이트 파일을 건드리지 않도록 이 프로젝트의 Caddy 파일 하나만 올립니다",
    ],
    sections: [
      {
        title: "대화 경험 — 카카오톡 PC를 기준으로",
        icon: "layers",
        intro: "매일 쓰는 앱이라 '비슷한데 어딘가 어색한' 지점이 그대로 불만이 됩니다. 기준을 카카오톡 PC로 잡고 제가 써 보며 스크린샷으로 지적해 맞췄습니다.",
        items: [
          "말풍선. 시간은 말풍선·사진 아래선에 붙고, 답장 인용과 '(수정됨)'은 말풍선 안에. 읽음은 '읽음' 글자 없이 안 읽은 사람 수 숫자만, 모두 읽으면 사라집니다",
          "사진. 한 장은 원본 비율 그대로, 세 장은 위 1 + 아래 2, 다섯 장은 2 + 3 격자. 동영상은 대화 안에서 바로 재생하고, 사진 뷰어 창은 축소·확대·창에 맞춤·회전·드래그 이동·썸네일 띠를 갖췄습니다",
          "메뉴. 대화 목록은 클릭 = 선택, 더블클릭 = 대화 창, 우클릭 = 메뉴(읽음 처리·알림 끄기·상단 고정·이름 설정·대화 서랍·숨기기/나가기). 메시지는 우클릭으로 답장·반응·전달·복사·수정·삭제",
          "받은 파일 폴더와 대화 서랍. 상대가 보낸 파일이 원래 이름으로 저장되고, 서랍(Ctrl+D)에서 대화별·전체 사진/동영상·파일·링크를 모아 보고 골라 저장합니다",
          "알림·트레이. 창이 닫혀 있어도 OS 알림이 오고 작업 표시줄에 안 읽은 수 배지가 붙습니다. 트레이 메뉴는 OS 메뉴가 아니라 직접 그린 클래식 메뉴 창입니다. 포커스를 가져가면 Windows가 트레이 오버플로를 닫아 버려서 그렇게 했습니다",
          "잠금 모드(Ctrl+L). 자리를 비울 때 모든 창을 덮고 계정 비밀번호로 풉니다. 잠금 해제는 로그인이 아니라 별도 API를 씁니다. 로그인을 다시 부르면 PC 1대 정책이 자기 세션을 밀어내기 때문입니다",
        ],
      },
      {
        title: "내 대화는 내 PC에 — 저장과 프라이버시",
        icon: "shield",
        intro: "제가 운영하는 서버라 '무엇을 서버에 남기지 않을 것인가'를 먼저 정했습니다.",
        items: [
          "서버에 영구히 남는 것은 메시지 뼈대(id·보낸 사람·시각)·반응·읽음뿐입니다. 본문과 첨부는 보관 기간(기본 14일, 못 받은 멤버가 있으면 최대 90일)이 지나면 지워지고 purgedAt만 남습니다",
          "원본은 각자 PC의 node:sqlite 보관소와 미디어 파일입니다. 화면은 서버가 아니라 항상 로컬을 읽고, 대화 메뉴의 '이 PC에서 대화 내용 삭제'로 내 쪽만 비울 수 있습니다",
          "같은 계정으로 새 PC에 로그인하면 첫 접속 때 보관 기간 안의 대화·사진을 받아 그 PC 보관소에 쌓습니다. 그보다 오래된 대화는 원래 쓰던 PC에만 남습니다",
          "PC 한 대만 로그인됩니다. 다른 PC에 로그인돼 있으면 '이 PC에서 로그인할까요?'로 되묻고, 진행하면 먼저 쓰던 PC는 안내와 함께 로그아웃되지만 그 PC의 대화 내용은 지우지 않습니다",
          "refresh 토큰은 Electron safeStorage로 암호화해 두고, 렌더러는 app://bundle 오리진 + CSP 안에서만 돕니다. 링크 미리보기는 서버가 대신 가져오되 사설 대역을 막았습니다(SSRF)",
        ],
      },
      {
        title: "배포와 자동 업데이트 — 서버도 직접",
        icon: "cloud",
        items: [
          "업데이트 서버를 따로 만들었습니다(Node, 의존성 1개). latest.yml은 설치 파일이 서버에 이미 있고 sha512·크기가 일치할 때만 저장되고, 같은 이름의 버전 파일은 덮어쓸 수 없습니다. HEAD·ETag·Range(206)를 지원해 차등 다운로드도 받습니다",
          "업데이트 정책. 메이저·마이너 승격이나 minimumVersion 미만이면 하드(자동 다운로드 + '지금 설치'), 패치는 소프트(설정 탭에서 '받기'). 받는 동안 메인 창 배너·정보 탭·트레이 툴팁에 같은 진행률이 뜹니다",
          "릴리스 완료 조건을 문서로 고정했습니다. 검증 통과 → 운영 API 주소로 설치본 빌드 → 커밋·푸시 → 업데이트 서버에 exe·blockmap·latest.yml 게시 → 공개 latest.yml의 버전과 실제 다운로드의 크기·SHA-512 일치 확인. 한 번 게시를 빠뜨려 앱이 옛 버전을 본 사고 뒤에 넣은 절차입니다",
          "macOS는 Apple Silicon·Intel DMG를 따로 냅니다. Developer ID 인증서가 없어 지금은 ad-hoc 서명 + 수동 설치이고, Mac 업데이트 manifest는 게시하지 않습니다",
          "운영 확인은 /health(디비·Redis)와 공개 latest.yml, 그리고 배포 스크립트가 같은 서버의 다른 사이트가 아직 200인지 확인하는 것까지입니다",
        ],
      },
      {
        title: "아직 없는 것 — 모바일",
        icon: "spark",
        items: [
          "지금은 PC 전용입니다. Windows 설치형 exe와 macOS DMG만 있고, 모바일 앱(iOS·Android)은 만들지 않았습니다",
          "서버는 모바일을 받을 준비가 되어 있습니다. 기기 토큰 모델과 FCM 푸시 경로가 이미 들어 있고, 알림 끈 대화를 빼는 규칙도 서버 쪽에 있습니다. 클라이언트만 없는 상태입니다",
          "그래서 화면도 데스크톱 창 크기(420×760, 최소 360×560) 두 가지만 검증합니다. 반응형 웹이 아니라 창 크기 기준이라 Playwright도 그 두 뷰포트로 돕니다",
          "음성·영상 통화, 이메일 인증·비밀번호 찾기, 종단간 암호화는 이번 범위 밖으로 적어 두었습니다",
        ],
      },
    ],
    usage: [
      "Windows는 아래 설치 파일을 받아 실행하면 설치됩니다. macOS는 ad-hoc 서명이라 DMG를 따로 전달합니다(현재 자동 업데이트는 Windows만).",
      "앱을 열고 이메일·아이디·비밀번호로 회원가입합니다. 초대 코드는 없고, 가입하면 바로 쓸 수 있습니다.",
      "친구 추가(＋)에서 상대의 아이디나 이메일을 정확히 입력합니다. 사용자 목록을 훑어보는 디렉터리는 일부러 두지 않았습니다.",
      "친구를 더블클릭하면 그 대화만의 창이 열립니다. 사진·파일은 끌어다 놓거나 붙여넣기로 보내고, 받은 파일은 '받은 파일 폴더'에 원래 이름으로 저장됩니다.",
      "창을 닫아도 트레이에 남아 알림과 안 읽은 수 배지를 띄웁니다. 자리를 비울 때는 Ctrl+L로 잠급니다.",
      "새 버전이 올라오면 앱이 알아서 확인합니다. 패치는 설정 '정보' 탭에서 받고, 마이너 승격은 자동으로 받아 설치합니다.",
    ],
    aiUsage: [
      "킥오프부터 하네스를 깔고 시작했습니다. 브리프(왜/무엇)·세션 부팅 프로토콜·ADR·세션 로그·체인지로그를 제 project-seed 템플릿에서 받아 첫 커밋부터 갖춘 상태로 출발했습니다",
      "훅으로 강제합니다. .env 직접 수정 차단, git add -A·민감 파일 staging 차단, 저장한 파일 Prettier 자동 포맷. 커밋 전에는 typecheck·lint·unit·build를, UI를 바꿨으면 서버 e2e + Playwright 2뷰포트까지 통과해야 산출물을 받습니다",
      "UI는 DESIGN.md 계약으로 고정했습니다. 형태·밀도는 Upbit 기반 클래식, 창 구조는 카카오톡 PC, 색·간격은 토큰 파일 하나로만 씁니다. 화면 작업 뒤에는 슬롭 감사와 사용감 점검을 돌립니다",
      "제 피드백은 스크린샷으로 줍니다. 루트 폴더에 넣으면 그 세션에서 읽어 반영하고, 처리한 뒤 아카이브로 옮깁니다. 사진 비율·읽음 표시·연결 배너 같은 수정이 전부 이 경로로 들어왔습니다",
      "실물로 검증합니다. Playwright가 렌더러 미리보기(브라우저)와 실제 Electron 앱 두 가지를 돌리고, 두 번째 PC 로그인 같은 시나리오는 Electron 앱 두 개를 서로 다른 userData로 띄워 확인합니다",
      "사고는 문서에 박제합니다. 운영 DB를 테스트가 지운 일, 업데이트 게시를 빠뜨린 일, 소켓이 자동 재접속하지 않던 일을 CLAUDE.md '함정'과 ADR에 적어 두고, 같은 실수를 하지 못하게 검사를 붙였습니다",
    ],
    screenshots: [
      { src: "/images/projects/sh-messenger/windows.jpg", caption: "카카오톡 PC식 창 구조 — 메인 창(친구·대화·검색·설정)과 대화 창이 따로 뜹니다" },
      { src: "/images/projects/sh-messenger/login.jpg", caption: "로그인 — refresh 토큰은 OS 보안 저장소에 암호화해 두고 앱을 껐다 켜도 유지됩니다" },
      { src: "/images/projects/sh-messenger/signup.jpg", caption: "회원가입 — 표시 이름·아이디·이메일이면 누구나 가입합니다" },
      { src: "/images/projects/sh-messenger/profile.jpg", caption: "내 프로필 창 — 사진·상태 메시지를 고치고 '나와의 대화'로 메모를 남깁니다" },
      { src: "/images/projects/sh-messenger/add-friend.jpg", caption: "친구 추가 — 디렉터리 없이 아이디 또는 이메일 정확 일치로만 찾습니다" },
      { src: "/images/projects/sh-messenger/friends.jpg", caption: "친구 탭 — 내 프로필과 친구 목록, 행 우클릭으로 대화·프로필·삭제" },
      { src: "/images/projects/sh-messenger/added-me.jpg", caption: "상대 화면 — 한쪽만 추가해도 '나를 추가한 사람'에 실시간으로 뜹니다" },
      { src: "/images/projects/sh-messenger/chats-unread.jpg", caption: "대화 목록 — 안 읽은 수 배지가 행과 레일 아이콘에 함께 붙습니다" },
      { src: "/images/projects/sh-messenger/composer.jpg", caption: "첨부 — 사진 여러 장을 미리보기 스트립에 쌓았다가 한 번에 보냅니다" },
      { src: "/images/projects/sh-messenger/room.jpg", caption: "대화 창 — 사진 묶음 격자·파일 카드(열기·폴더 열기·다른 이름으로 저장)·링크 미리보기" },
      { src: "/images/projects/sh-messenger/message-menu.jpg", caption: "메시지 우클릭 메뉴 — 답장·반응 남기기·전달·복사" },
      { src: "/images/projects/sh-messenger/reply.jpg", caption: "답장 — 입력 영역 위 전체 폭 인용 띠, 보낸 뒤에는 말풍선 안에 원문이 붙습니다" },
      { src: "/images/projects/sh-messenger/room-search.jpg", caption: "대화 안 검색(Ctrl+F) — 결과를 누르면 그 메시지로 이동합니다" },
      { src: "/images/projects/sh-messenger/viewer.jpg", caption: "자체 사진 뷰어 창 — 축소·확대·창에 맞춤·회전·저장, 같은 묶음은 ←/→로 넘깁니다" },
      { src: "/images/projects/sh-messenger/drawer.jpg", caption: "대화 서랍 — 대화별·전체 사진/동영상을 모아 보고 골라 저장합니다" },
      { src: "/images/projects/sh-messenger/drawer-files.jpg", caption: "대화 서랍 파일 탭 — 받은 파일을 원래 이름으로 열고 저장합니다" },
      { src: "/images/projects/sh-messenger/create-group.jpg", caption: "그룹 대화 만들기 — 내가 추가한 친구 중에서 고릅니다" },
      { src: "/images/projects/sh-messenger/invite.jpg", caption: "그룹 초대 — 아이디·이메일로 참여자를 추가합니다" },
      { src: "/images/projects/sh-messenger/chat-menu.jpg", caption: "대화 목록 우클릭 메뉴 — 읽음 처리·알림·상단 고정·이름 설정·대화 서랍·나가기" },
      { src: "/images/projects/sh-messenger/chats-pinned.jpg", caption: "상단 고정 — 고정한 대화가 최근 대화보다 위로 올라옵니다" },
      { src: "/images/projects/sh-messenger/settings-general.jpg", caption: "환경 설정 일반 — 화면 테마·대화 글자 크기·Enter 보내기·단축키" },
      { src: "/images/projects/sh-messenger/settings-chat.jpg", caption: "환경 설정 대화 — 받은 파일 폴더와 이 PC 보관 용량" },
      { src: "/images/projects/sh-messenger/lock.jpg", caption: "잠금 모드(Ctrl+L) — 모든 창을 덮고 계정 비밀번호로 풉니다" },
      { src: "/images/projects/sh-messenger/global-search.jpg", caption: "메인 창 메시지 검색 — 전체 대화를 이 PC 보관소에서 찾습니다" },
      { src: "/images/projects/sh-messenger/compact.jpg", caption: "최소 창 360×560 — 창을 좁혀도 레이아웃이 유지됩니다" },
    ],
    demo: {
      account: "marvel97 · marvel19971125 · marvel97@naver.com · marvel19971125@gmail.com",
      note: "실제로 돌아가는 서비스입니다. 아래 설치 파일을 받아 회원가입한 뒤, 친구 추가에 제 아이디나 이메일(아래 넷 중 하나)을 정확히 입력하면 저와 바로 대화할 수 있습니다. 서버는 messenger.coolmarvel.com에서 운영 중이고, 지금은 PC(Windows·macOS)만 지원합니다.",
    },
    links: [{ label: "Windows 설치 파일 (v0.3.7)", href: "https://messenger.coolmarvel.com/desktop/SHMessenger-Setup-0.3.7-x64.exe" }],
    privateRepo: true,
  },
  "sh-web-editor": {
    role: "설계·에디터·양식 서버·업로더·디자인 실측·배포까지 혼자 만들었습니다",
    background: [
      "Asana·Jira를 쓰면서 무료 요금제의 텍스트 에디터가 UI/UX·기능·성능 어느 쪽도 만족스럽지 않았고, 재직 중인 병원 그룹웨어에서는 진단서·소견서·진료확인서 같은 제증명 서류를 정해진 양식 위에 채워 넣어야 하는 일이 잦았습니다. 국내 기업·기관 웹에서 표준처럼 쓰이는 상용 웹에디터는 폐쇄 소스이고, 오픈소스 대안(CKEditor 5·TinyMCE)은 UI·아이콘·기능 구성이 달라 '국내 업무용 에디터' 감성이 나지 않는 데다 라이선스 부담이 있습니다. 그래서 같은 룩과 같은 기능 구성을 가진 에디터를 직접 만들되, 코드·CSS·아이콘·이미지 자산은 일절 가져오지 않고 전부 자체 제작하기로 했습니다.",
      "양식 문제는 단순하게 풀었습니다. 양식은 특별한 데이터 모델 없이 그냥 HTML 문서이고, 양식을 만들고 고치는 도구도 이 에디터 자신(디자인/HTML/미리 보기/TEXT 4개 뷰)입니다. 사용자는 세 부류입니다. 글 작성자는 양식을 불러와 그 위에 작성하고 첨부를 붙이고, 양식 관리자는 관리자 모드에서 양식 HTML을 만들어 서버에 저장하며, 통합 개발자는 스크립트 로드 후 init() 한 번으로 textarea를 에디터로 바꾸고 서버 주소를 주면 양식 기능이 켜집니다. 에디터 코어는 서버 없이 완결되고, 서버는 양식·첨부 기능에만 쓰입니다.",
      "8월 20일 킥오프에서 뼈대를 잡고, 9월 7일부터 사흘 동안 v0.1.1에서 v1.0.5까지 42번 릴리스하며 9월 8일에 https://sh-web-editor.coolmarvel.com 에 처음 공개했습니다. 테스트는 Vitest 188건 + JUnit 11건 + Playwright E2E이고, 그 사흘 동안 제가 스크린샷 피드백을 15회차 주었습니다.",
    ],
    architecture: [
      "스택. TypeScript strict + Vite 라이브러리 모드로 dist 4개(IIFE 전역 SHWebEditor · ESM · CSS · index.d.ts)를 냅니다. 편집 엔진은 Tiptap 3(ProseMirror, MIT 확장만)이고 UI는 프레임워크 없이 순수 DOM입니다. ProseMirror 직접 사용(같은 결과를 더 느리게), Lexical + Preact(표가 약함), CKEditor/TinyMCE(UI를 바꾸려면 프레임워크와 싸워야 하고 라이선스 부담)를 비교하고 고른 결과입니다",
      "공개 API. init({ el, … })이 textarea를 에디터로 바꾸고 값을 동기화합니다. getHTML()(DOMPurify 정제)/setHTML, getDocumentHTML()(페이지 명·문서 배경 포함), setSkin/setUI/setMode/setZoom, loadTemplate/saveTemplate, checkForbidden/checkAccessibility, getElementHTML(id). 옵션 30여 개(xss · accessibility · forbiddenWords · personalData · manager · mobile · templates · server · spellCheck · onUpload · autosave …)",
      "프레임. 메뉴바 8 → 툴바 2줄(버튼 67, ResizeObserver로 넘침을 » 로 접기) → 눈금자 → 편집 영역 → 뷰 4종(디자인/HTML/미리 보기/TEXT) → 상태바(글자수 · 배율 50~200%) → 높이 손잡이. 툴바와 메뉴가 같은 명령 객체 134개를 공유해 한 기능이 두 곳에 있어도 정의는 하나입니다. 모든 클래스는 shwe- 접두 + 호스트 CSS 누수 방지 리셋",
      "확장 4층. ① Tiptap Extension(ParagraphStyle · LetterSpacing · ElementId · Form 노드 3종 · LockGuard · AuditMarks · CharacterCount) ② ProseMirror 플러그인(Decoration으로 접근성·금칙어·개인정보 밑줄, NodeView로 표 손잡이·이미지 8핸들) ③ 순수 UI 모듈 ④ 외부 모듈. '없는 기능'은 반드시 한 층에 떨어지므로 막히지 않습니다",
      "표. prosemirror-tables TableMap 위에 자체 명령 8묶음(rect · select · structure · style · header · calc · clipboard · index). 업무 문서용 표 HTML(border/cellspacing/인라인 테두리/셀마다 p)을 생성·보존하고, 표 NodeView가 손잡이(⊞ 전체 선택 · 8핸들 · 연필 · 끌어 옮기기)를 그립니다. 셀 안에 넣는 표는 담는 셀의 안쪽 폭을 기본 너비로 합니다",
      "양식 서버. Java 21 + Spring Boot 4.1.1 + PostgreSQL 17 + Flyway, docker compose(db + server). 계약 v0: health · templates CRUD · 파일 업로드(multipart) · 파일 받기(Range 이어받기) · 청크·이어올리기 · zip. 컨트롤러는 HTTP 매핑만, 서비스 4 + 헬퍼 2, JUnit(H2) 11건. server 옵션이 없으면 양식 버튼만 안 뜨고 코어는 불변입니다",
      "SHWebUpload. 목록/썸네일 · 정렬 · 폴더 구조 · 드롭 · 우클릭 · 붙여넣기, XHR 청크 1MB + 이어올리기 + 취소, 전송/다운로드 창(전체·파일별 진행률 · 속도 · 남은 시간). 묶음 다운로드는 서버 zip 또는 브라우저 zip 작성기(CRC32 · UTF-8 이름, 의존성 0), 다운로드는 숨은 iframe 폴백(보안 프로그램 환경)",
      "코드 구성. 타입 전용 파일 10개, 도메인 단위 분할(대화상자 하나 = 파일 하나, 흐름 하나 = 파일 하나), 호환용 barrel 없음, CSS는 26개 부분 파일을 @import로, 문자열은 i18n 15파일(키 636). 에이전트 6개를 각자 worktree에서 병렬로 돌려 분할한 뒤 스크립트로 barrel을 걷어냈습니다",
    ],
    sections: [
      {
        title: "표 편집 — 품질 기준 최상위",
        icon: "layers",
        intro: "국내 업무 문서는 결재란과 '표 안의 표'가 기본이라 표가 가장 중요한 기능입니다.",
        items: [
          "새 표 대화상자 3탭(일반 · 배경 및 제목 셀 · 템플릿 12). 선 모양/종류/색/두께, 셀 간격·안쪽 여백, 테두리 선택 6버튼(바깥쪽만 · 안쪽만 · 모두 · 바깥선 · 안쪽선 · 사용자 지정), 표 제목(caption)·설명(summary), 표 테두리/셀 테두리 분리, 크기 고정",
          "표 대화상자 7종. 표 속성 · 셀 속성 · 가로줄 · 세로줄 · 가로줄/세로줄 삽입 · 셀 나누기 · 셀 테두리(선 모양/종류/색/두께 + 변 4방향 토글, 전체해제/전체선택)",
          "우클릭 표 메뉴 15항목 + 하위 메뉴(표 도구 · 복사/붙여넣기 · 삽입 · 삭제 · 속성 · 선택 · 셀 크기 조정 · 수직 정렬 · 계산식). 메뉴바 '표' 메뉴와 정의를 공유합니다",
          "선택 4종 · 너비/높이 같게 · 셀 배경 팔레트 · 표 들여쓰기 · 가로줄 복제 · 표 위/아래 문단 · 텍스트로 변환 · 표 복사/붙여넣기 · 계산식 10종",
          "표 손잡이. ⊞로 표 전체 선택, 8개 크기 조절 핸들, 연필로 속성 열기, 끌어서 표 옮기기. 제목 셀(th · scope)과 접근성 말풍선으로 스크린리더가 표 구조를 읽을 수 있게 했습니다",
        ],
      },
      {
        title: "양식(템플릿) — HTML 그대로, 서버 주소 하나로",
        icon: "cloud",
        intro: "진단서·소견서·품의서처럼 '정해진 양식 위에 내용을 채우는' 문서를 위한 기능입니다.",
        items: [
          "양식은 데이터 모델 없이 HTML 문서 그대로입니다. 필드 스키마를 정의하지 않아도 기존 서식을 그대로 옮길 수 있고, 만드는 도구도 이 에디터 자신(HTML 소스 뷰에서 직접 다듬기)입니다",
          "파일 > 템플릿…은 클래스 트리 + 목록입니다. templates 옵션(내장 HTML · URL fetch · Promise)과 서버 양식이 한 목록에 합쳐지고, 불러오기 전 '작성 중인 문서가 삭제됩니다'를 확인합니다",
          "관리자(폼) 모드 manager: true. 툴바 3줄, 입력 요소 8종(텍스트 · 텍스트영역 · 선택 · 체크 · 라디오 · 버튼 · 이미지 · 숨김) · 누름틀 · 표/셀 잠금. 사용자 모드는 잠긴 구조를 고칠 수 없고 값만 입력합니다",
          "양식 서버 계약. init({ server: { baseUrl } })만 바꾸면 그 프로젝트의 양식 세트가 붙습니다. 다른 언어로 서버를 다시 써도 계약만 맞추면 되도록 Spring Boot 구현은 '기준 구현'으로 두었습니다",
          "레이아웃 16종 · 자동 저장(localStorage, 최근 10건 불러오기) · 문서 배경 이미지 · 페이지 명 같은 문서 단위 설정은 getDocumentHTML()로 함께 저장됩니다. 데모 양식 4종(부서 회의록 · 주간 보고서 · 휴가(조퇴) 신청서 · 품의서)은 결재란이 바깥 표 안에 들어가는 중첩 구조입니다",
        ],
      },
      {
        title: "안전과 검증 — 게시판에 넣어도 되는 HTML",
        icon: "shield",
        items: [
          "XSS. DOMPurify로 getHTML() 출력 전 정제: script/iframe/object/embed 제거, 이벤트 핸들러 전부 제거, javascript: 링크 제거. 옵션으로 조절합니다",
          "웹 접근성 검증 단계 0·1·2. 이미지 대체 문자열, 표 제목/설명, 제목 셀 scope, 아이디 중복을 검사해 대화상자에 요소별로 나열하고 본문에 표시합니다",
          "금칙어 목록 · 개인정보(이메일 · 전화 · 주민번호) 탐지. 밑줄 표시와 삭제/모두 삭제, checkForbidden() API",
          "맞춤법 검사 연동(spellCheck 콜백 → 낱말별 추천 · 일괄 수정 창), 한/영 오토마타 변환, 계산기, 단축키 표(Ctrl+1~6 · F5~F12 · Shift 조합)와 단축키 도움말",
          "호스트 CSS 누수 방지 리셋 + shwe- 접두. 호스트 페이지의 h1·목록·링크 스타일이 편집 영역을 오염시키지 않고, 반대로 에디터 스타일이 페이지로 새지 않습니다",
        ],
      },
      {
        title: "디자인 — 실물 실측 토큰과 자체 아이콘",
        icon: "spark",
        intro: "'~풍'으로 만들면 색과 높이가 매번 흔들립니다. 그래서 국내 업무용 상용 에디터의 실물을 픽셀 단위로 실측해 토큰으로 고정했습니다.",
        items: [
          "실측 절차. 배포본을 로컬 정적 서버 + Playwright로 렌더해 computed style과 스킨 이미지의 픽셀을 측정했습니다(메뉴바 28 · 툴바 28/30 · 버튼 20 · 콤보 88×22 · 탭 75×22 · 상태바 22, 색 20여 개). 자산(js · css · gif)은 한 줄도 가져오지 않았습니다",
          "oh-my-design 디자인 계약 DESIGN.md. 베이스 Upbit(각지고 촘촘한 한국형 업무 UI) + Money Forward 베벨 버튼 + Palantir 밀도, 실측값은 참고값으로. CSS는 --shwe-* 토큰만 참조합니다",
          "툴바 아이콘 64종 자체 SVG. 흰 면 + 1px 픽셀 윤곽 + 강조색 6종. 메뉴 아이콘 · 표 선택 그림 · 제목 셀 그림 · 유튜브 시청 주소 → 임베드 변환까지 같은 결입니다",
          "대화상자 34종을 실물과 짝 비교했습니다. 라벨 열 · 줄 끝 입력 · 드롭존 · 바닥 버튼 배치, 탭 창 고정 크기, 제목 띠로 화면 어디로든 끌어 옮기기",
          "스킨 13종(blue · green · brown · purple · silver · yellow · orange · darkgray · gray · red · gold · pink · white). .shwe-root 토큰만 바꾸는 구조이고 생성 스크립트로 skins.css를 만듭니다. 모바일 모드(UA 판정, iPad는 데스크톱)는 메뉴바 없는 2줄 툴바 + » 묶음 상자 + 전체 폭 대화상자, 댓글 에디터 프리셋은 한 줄 툴바 · 높이 130",
        ],
      },
    ],
    usage: [
      "https://sh-web-editor.coolmarvel.com 접속. 설치·로그인 없이 데모 페이지에서 바로 써볼 수 있습니다(서버 없는 정적 배포라 업로드는 브라우저 메모리에만 있고 새로 고침하면 사라집니다).",
      "툴바에서 글꼴 · 크기 · 색 · 정렬 · 목록을 쓰고, 표 버튼의 격자로 표를 넣은 뒤 우클릭 메뉴로 행 · 열 · 셀을 편집합니다. 상태바 탭으로 디자인 / HTML / 미리 보기 / TEXT 뷰를 오갑니다.",
      "파일 > 템플릿…에서 회의록 · 휴가신청서 · 품의서 양식을 불러와 그 위에 작성합니다. 파일로 저장 · 인쇄 · 자동 저장 내용 불러오기도 같은 메뉴에 있습니다.",
      "도구 메뉴의 웹 접근성 검증 · 금지어 · 한/영 변환 · 계산기를 쓰고, 환경설정에서 기본 글꼴 · 줄 간격 · 그리드 · 눈금자를 바꿉니다.",
      "아래 파일 업로더에 파일이나 폴더를 끌어 넣고 '전송하기'를 누르면 전송 창이 뜨고, 끝난 파일은 보기 모드 목록으로 옮겨져 열기 · 다운로드 · 전체 다운로드(zip)가 됩니다.",
      "내 페이지에 붙이려면 CSS 1개 + JS 1개를 넣고 SHWebEditor.init({ el: '#content', height: 400 }) 한 줄이면 됩니다. textarea 값이 자동 동기화되고 getHTML()로 정제된 HTML을 받습니다. 양식 서버는 server: { baseUrl } 옵션으로 붙입니다.",
    ],
    aiUsage: [
      "킥오프 때 브리프에 '상용 에디터 샘플 기능 전부 + 동일 룩'을 v1.0 기준으로 적어 두고 시작했습니다. 부팅 프로토콜과 훅(env-guard · git-add-guard · Prettier)을 걸었고, typecheck + lint + test + build가 통과하지 않으면 커밋도 전달도 없습니다. PATCH는 수정 하나마다 +1, MINOR 승격은 제가 선언할 때만 올립니다",
      "실물 실측을 규칙으로 만들었습니다. 벤치마킹 대상을 기억으로 흉내 내지 말고 배포본을 로컬 서버 + Playwright로 띄워 computed style과 픽셀을 재서 DESIGN.md 토큰으로 고정하게 했고, 재대조 절차를 문서화해 세션이 바뀌어도 같은 방법으로 다시 잽니다",
      "제 피드백은 스크린샷 15회차였습니다. feedback/ 폴더에 넣어 두면 미처리 피드백으로 읽고, '지적 → 반영' 표를 아카이브 README로 남깁니다. 대화상자 34종 짝 비교 · 툴바 아이콘 64종 재작도 · 중첩 표 너비 버그가 이 루프에서 나왔습니다",
      "구조 리팩토링은 에이전트 6개를 병렬로 돌렸습니다. 영역별로 파일 소유권을 나눠 각자 git worktree에서 분할하고, 옛 경로는 barrel로 유지해 충돌 없이 병합한 뒤 스크립트로 barrel을 제거했습니다. 동작 · 공개 API · dist 산출물이 바뀌지 않는 것이 전제였습니다",
      "브라우저 QA는 Playwright MCP로 합니다. 툴바 동작 · 룩 · 실물 대조를 브라우저에서 직접 확인하고 끝나면 닫습니다. 한 번 밟은 함정(jsdom 고정 · 툴바 mousedown preventDefault · flex:1 · pkill이 자기 셸을 죽임 등)은 '규칙 한 줄 + 근거'로 CLAUDE.md에 적었습니다",
      "지켜야 할 것은 시스템으로 만들었습니다. 화면 문자열에 벤치마킹 대상 이름 금지, 상용 자산 미복사, .env · 서버 주소 · 키를 공개 저장소에 두지 않는 배포 스크립트(빌드 → scp → caddy validate → reload)",
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
      note: "실제 운영 중인 공개 데모입니다. 서버 없이 정적 파일(JS · CSS · HTML)만 배포해 양식은 내장 샘플 4종, 이미지는 base64, 업로드는 브라우저 메모리에 두고 새로 고침하면 사라집니다. 로그인 · 설치 없이 표 편집 · 양식 불러오기 · 업로더 · 스킨을 바로 써볼 수 있습니다. 저장소는 비공개이며, 양식 서버(Spring Boot)는 저장소의 docker compose로 기동합니다.",
    },
    links: [{ label: "sh-web-editor.coolmarvel.com 접속", href: "https://sh-web-editor.coolmarvel.com" }],
    privateRepo: true,
  },

  "remote-assist": {
    role: "설계·클라이언트 4종·중계 서버·배포·인스톨러까지 혼자 만들었습니다",
    background: [
      "PC 문제가 생기면 담당자가 자리까지 가거나 전화로 화면을 설명받으며 해결해야 하고, 퇴근 후나 출장 중에는 내부 PC를 볼 방법이 없습니다. 상용 원격 도구는 라이선스 비용이 들고, 남의 서버를 거쳐 화면이 밖으로 나간다는 부담이 있습니다. 그래서 '접속 코드 하나로 붙고, 사용자가 수락해야만 열리고, 양쪽 누구든 한 번에 끊는' 원격 지원 앱을 직접 만들었습니다. 첫 사용처는 재직 중인 병원 전산실이지만 문구와 설계는 일반 원격 지원으로 두었습니다.",
      "구성은 사용자용 Agent(코드 표시·수락/거절·화면 공유·끊기)와 지원자용 Console(코드 입력·실시간 보기·마우스/키보드 제어·모니터 선택·파일 전송), 그리고 두 쪽을 잇는 중계 Server(Docker)입니다. 양쪽 모두 서버로 나가는 연결만 맺으므로 어느 쪽 NAT·방화벽도 열 필요가 없고, 원내↔원내·외부↔원내·원내↔외부·외부↔외부 네 조합이 코드 변경 없이 동작합니다. 사용자는 코드를 읽어 주는 것 말고는 아무 설정도 하지 않습니다.",
      "9월 4일 킥오프 뒤 4일 동안 화면 보기 → 입력 제어 → 파일 전송 → 성능 개편(DXGI·H.264·적응·직결) → macOS 클라이언트 → 진단·안정화까지 v0.1.15에 이르렀고, 실제 두 PC 사이 접속·제어·파일 전송을 제 눈으로 확인했습니다. 테스트는 217건입니다.",
    ],
    architecture: [
      "C#/.NET 8 한 언어. Core(플랫폼 중립 프로토콜·타일 차분·JPEG 코덱·적응 품질·2채널 링크·세션 상태 머신) / Server(ASP.NET Core Minimal API + WebSocket) / Agent·SupportConsole(WPF) / Agent.Mac·SupportConsole.Mac(Avalonia 11). 프레임 헤더·제어 메시지 DTO를 Core 하나로 공유해 프로토콜 변경이 한 곳에서 끝납니다",
      "중계 서버는 바이트만 통과시킵니다. 6자리 코드 발급(암호학적 난수, 10분 TTL, 1회용) → 역할×채널 4소켓 짝짓기 → 프레임·제어 메시지를 해석 없이 상대에게 전달. 세션당 32KB×2 ArrayPool 버퍼, 동시 세션 상한 50. SignalR 대신 순수 WebSocket을 썼습니다. 고빈도 바이너리에 직렬화 계층은 낭비이기 때문입니다",
      "화면 파이프라인. DXGI Desktop Duplication으로 바뀐 사각형만 GPU→CPU 복사(정지 화면 CPU 0) → 64px 타일 차분 → 바뀐 타일이 적으면 JPEG 타일, 전면 갱신이면 Media Foundation H.264(HW 우선) 전체 프레임. DXGI·H.264가 안 되면 GDI·JPEG로 자동 폴백하고, 디코더가 실제로 못 풀면 세션 중 codec 재협상으로 JPEG 전환",
      "회선 적응 5단계(Ultra → Survival). RTT·처리량·큐 지연을 보고 JPEG 품질 85→45, fps 30→10, 해상도 1.0→0.5, 비트레이트 8000→800kbps를 함께 조절합니다. 커서는 프레임에 굽지 않고 위치(60Hz, 12바이트)·모양만 따로 보내 Console이 로컬 커서로 그립니다. 마우스 지연 체감이 사라집니다",
      "화면/제어 2채널. 입력·커서·ping·codec 협상은 별도 소켓이라 클릭이 프레임 뒤에서 기다리지 않습니다. 같은 망이면 양쪽이 임의 포트 리스너를 열고 세션마다 RSA 2048 자체 서명 TLS + 토큰으로 직결하며, 인증서 SHA-256 지문을 중계 경유로 먼저 고정해 LAN 중간자를 막습니다(서버 트래픽 0)",
      "입력 제어. 좌표를 선택 모니터 기준 0..65535로 정규화해 보내고 Agent가 가상 데스크톱 절대 좌표로 환산합니다(음수 원점 모니터 지원). 최대 64개 배치 전송, 느린 회선에선 꼬리 마우스 이동만 병합(클릭·키는 절대 안 버림). 포커스 이탈·끊김 시 눌린 키 자동 해제, '단축키 전달' 옵션은 저수준 훅으로 Win·Alt+Tab까지",
      "크로스플랫폼. 세션 흐름(코드 발급 → 2채널 연결 → offer/accept → 캡처 루프 → 입력 주입 → 파일 전송 → 직결 → 종료)을 Core로 옮기고 OS 의존은 IAgentPlatform(모니터·캡처·인코더·입력 주입·커서) 뒤로 두었습니다. 맥은 CoreGraphics 캡처·CGEvent 주입이며, 접속 시 caps·os 필드로 H.264 가능 여부와 키 관습(Ctrl↔⌘)을 협상합니다",
      "파일 전송. 256KB 청크, 4GB 상한, .part 후 이름 변경, 경로 탈출·금지 문자·중복 이름 처리, 취소·끊김 시 정리. 다중 모니터는 목록 → 즉시 전환 + 키프레임. 공유 중에는 모니터 사면 빨간 테두리와 상단 배너(클릭 통과)로 사용자에게 알립니다",
    ],
    sections: [
      {
        title: "보안 — 인터넷에 노출된 중계 서버의 대가",
        icon: "shield",
        intro: "중계 서버가 인터넷에 있으니 '누가 붙을 수 있는가'를 서버와 클라이언트 양쪽에서 강제합니다.",
        items: [
          "사용자 수락 없이는 아무것도 공유되지 않습니다. 거절하면 세션이 생기지 않고, 수락 뒤에도 양쪽 누구든 즉시 끊습니다",
          "접속 코드는 6자리 암호학적 난수, 10분 안에 안 쓰면 만료, 세션이 끝나면 소멸(같은 코드 두 번째 접속은 거부)",
          "클라이언트는 HTTPS/WSS만. TLS 종단은 기존 Caddy(Let's Encrypt 자동 갱신), 앱 서버는 인증서를 모른 채 Docker 뒤 평문",
          "직결은 세션마다 새 자체 서명 인증서 + 토큰, 지문은 중계로 먼저 전달해 고정합니다. 같은 망의 다른 장비가 끼어들 수 없습니다",
          "컨테이너는 read-only 루트·비루트·no-new-privileges·pids 제한, 메모리 상한 160MB(실측 유휴 42MB)",
          "주입 입력은 Windows 보안 데스크톱(Ctrl+Alt+Del·UAC)에 닿지 않습니다. OS 경계를 넘지 않는 설계입니다",
        ],
      },
      {
        title: "성능 — RDP급을 목표로 한 다섯 가지",
        icon: "layers",
        intro: "처음 써 보니 툭툭 끊겼습니다. 그 느낌에서 출발해 성능 계획 0~4단계를 한 번에 구현했습니다.",
        items: [
          "DXGI Desktop Duplication. dirty/move rect만 복사하고 정지 화면은 CPU 0. HDR·회전 모니터는 GDI 폴백",
          "H.264 하이브리드. 바뀐 타일이 임계(20~40%) 미만이면 JPEG 타일, 이상이면 하드웨어 H.264. FFmpeg 대신 Media Foundation을 써 추가 DLL이 없습니다",
          "적응 제어기. 5단계 프로파일로 품질·fps·해상도·비트레이트를 함께 내리고 올립니다. Console 상태 줄에 경로·fps·MB/s·RTT·코덱/캡처·단계를 상시 표시",
          "커서 분리. 위치 60Hz 12바이트 + 모양 변경 시에만 비트맵. 프레임 지연과 무관하게 마우스가 즉시 따라옵니다",
          "핫패스 할당 제거(v0.1.14). 프레임마다 생기던 LOH 배열·수신 목록·펌프 배열 제거, 변화 없는 프레임의 전체 복사 제거, 다운스케일 열 계산 캐시. 와이어 형식은 그대로입니다",
        ],
      },
      {
        title: "UI — 컴팩트 클래식 (Upbit 베이스 + 업무 도구 실측 색)",
        icon: "spark",
        intro: "처음 눈으로 확인했을 때 색과 UI가 마음에 들지 않았습니다. 그래서 제가 매일 쓰는 업무 도구 스크린샷 3장을 기준으로 다시 잡았습니다.",
        items: [
          "oh-my-design 카탈로그 440개를 '밀도 키워드 × 라운드'로 훑어 베이스 Upbit(직각·12px dense·1px 헤어라인), 차용 Money Forward 베벨 버튼 + Palantir 밀도 원칙",
          "색은 그 스크린샷 3장을 픽셀 단위로 실측했습니다. 창 바탕·헤더·버튼 면·테두리·패널·구분선·대기 상태 노랑. 라운드 0, 굴림 12px, 컨트롤 높이 24",
          "WPF-UI(Fluent·Mica)를 걷어내고 WPF 기본 컨트롤 + Tokens.xaml로. 맥은 같은 토큰을 Tokens.axaml로 두어 두 OS가 같은 결로 보입니다",
          "상태는 배지 하나로(지원자 대기 중 · 수락 대기 · 연결됨 · 종료), 수락/거절 버튼만 크고 분명하게",
        ],
      },
      {
        title: "플랫폼 작업 정책 — Windows 작업과 맥 작업이 서로 망치지 않게",
        icon: "cloud",
        intro: "같은 날 WSL과 맥에서 번갈아 작업하다 사고가 났습니다. 맥에서 재현 없이 Windows 경로를 추정해 고친 오진, 맥에서만 돌린 테스트가 WSL에서 네이티브 누락으로 실패. 그래서 정책을 세웠습니다.",
        items: [
          "플랫폼 전용 코드는 그 OS에서 재현·검증할 수 있을 때만 로직을 바꿉니다. 다른 OS에서는 폴백·계측 추가와 '미검증' 표기까지만",
          "산출물은 그 OS에서만 굽습니다(exe = WSL, dmg = 맥). 버전을 올리면 상대 OS 재빌드를 todo에 남깁니다",
          "검증은 항상 전체 솔루션(build · test · format)이 세 OS 어디서든 통과해야 합니다. 솔루션 필터는 편의일 뿐입니다",
          "런타임 폴백이 마지막 안전망입니다. 플랫폼 전용 경로는 자동 폴백을 갖고, 디코더가 실제로 못 풀면 세션 중 codec 재협상",
          "접속 문제는 실서버 docker logs와 양쪽 PC의 진단 로그(%LOCALAPPDATA%)를 먼저 봅니다. Windows .NET 스택만 재현할 땐 콘솔 하네스 exe를 /mnt/c로 퍼블리시해 WSL에서 실행합니다",
        ],
      },
    ],
    usage: [
      "사용자가 Agent를 실행하면 접속 코드 여섯 자리가 크게 표시됩니다. 전화로 지원자에게 읽어 줍니다",
      "지원자가 Console에 이름과 코드를 입력하고 '접속'을 누르면, 사용자 화면에 '○○ 님이 이 PC 화면을 보고 조작하려고 합니다' 수락 요청이 뜹니다",
      "사용자가 '수락'하면 Agent 창은 최소화되고 모니터 가장자리에 빨간 테두리와 '원격 제어 중' 배너가 뜹니다. 거절하면 아무것도 공유되지 않습니다",
      "지원자는 뷰어에서 실시간 화면을 보며 마우스·키보드로 조작하고, 모니터 탭으로 볼 화면을 고르고, '파일 보내기'나 드래그 앤 드롭으로 파일을 보냅니다",
      "상태 줄에서 경로(직결/중계)·fps·MB/s·RTT·코덱과 회선 단계를 확인합니다. 화면이 안 나오면 3초 안에 JPEG로 내려가고 키프레임을 다시 요청합니다",
      "양쪽 누구든 '연결 끊기'로 종료하면 상대에게도 즉시 알려지고, 사용자는 '새 코드 받기'로 다음 세션을 준비합니다",
    ],
    aiUsage: [
      "제 project-seed 템플릿으로 9월 4일에 킥오프했습니다. 브리프·세션 부팅 프로토콜·ADR·세션 로그·훅(.env 편집 차단, git add -A 차단, 편집 후 dotnet format)을 첫날부터 가동했고, build·test·format 3종을 통과하기 전에는 커밋하지 않습니다",
      "결정은 ADR 6건으로 남겼습니다. 스택(WPF·중계·Caddy·WebSocket·GDI+JPEG에서 시작), 컴팩트 클래식 UI, 성능 아키텍처, 크로스플랫폼(세션 로직 Core 이관), 플랫폼 작업 정책. 대안과 기각 사유까지 적어 두어 세션이 바뀌어도 같은 논쟁을 반복하지 않습니다",
      "증거 없이 고치지 않는 것을 규칙으로 했습니다. '다른 PC에서 접속이 안 된다'는 문제에 실서버 로그로 제어 채널 미등록을 먼저 확인하고, 종단 테스트·실서버 스모크·Windows 콘솔 하네스로 세 갈래 재현을 한 뒤, 원인을 확정하기 전에는 계측과 자동 복구만 추가했습니다(v0.1.15)",
      "제 스크린샷·로그·설계서는 feedback-archive에 날짜·주제별로 보관하고 판정·조치를 README로 남깁니다. 검은 화면 한 건은 로그로 직결 페어링 버그를 확정해 수정했습니다(v0.1.12)",
      "한 번씩 실제로 밟은 지뢰만 CLAUDE.md에 적었습니다. MFT 디코더의 stream change 뒤 재시도, Vortice 샘플 이중 Release, 직결 페어링 헤더, SetCapture와 주입 클릭, SkiaSharp Linux 네이티브 누락 등 14항목입니다",
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
      note: "조직 내부용 도구라 저장소와 인스톨러는 공개하지 않습니다. 중계 서버는 제가 직접 운영 중이며(Docker + Caddy, 다른 서비스와 같은 호스트에 공존) 공개 서비스가 아닙니다. 스크린샷은 WSL의 로컬 중계 서버에 Windows Agent·Console을 붙여 같은 PC에서 찍었고, 공유 화면에는 이 포트폴리오 페이지를 띄웠습니다. macOS 앱(Avalonia)은 같은 토큰으로 같은 화면 구성을 갖습니다.",
    },
    privateRepo: true,
  },

  "pdf-editor-live": {
    role: "모노레포 설계·API/웹 구현·인프라 구축·CI/CD·운영까지 혼자 합니다",
    background: [
      "데스크톱 PDF 편집기(pdf-editor)는 '문서가 밖으로 나가지 않는다'는 장점이 있지만 설치가 필요하고, 포트폴리오로는 링크 하나로 바로 써볼 수 있는 형태가 더 설득력 있습니다. 그래서 같은 에디터를 브라우저에서 돌리되 원칙은 유지하기로 했습니다. PDF 바이트는 서버로 가지 않고, 서버는 '누가·몇 번'만 관리합니다.",
      "서버는 AWS Lightsail 2GB 인스턴스 1대에 다른 프로젝트 2~3개와 함께 올려야 해서 메모리 예산이 1급 제약이었습니다. 이 제약이 스택 선택(Fastify·Caddy·공용 Postgres·저메모리 튜닝)과 배포 방식(서버에서 빌드 금지, CI가 이미지를 만들어 전송)을 결정했습니다.",
      "8월 25일 설계에서 시작해 26일 최초 운영 배포, 28일 구독 모델·소셜 로그인·SEO까지 4일 만에 올렸습니다. 그동안 제가 스크린샷 피드백을 11차례 주며 다듬었습니다.",
    ],
    architecture: [
      "npm 워크스페이스 모노레포. apps/web(Vite+React SPA) · apps/api(Fastify 5 + Drizzle ORM) · packages/editor(에디터 코어) · infra/server(공용 Caddy·Postgres) · infra/app(이 서비스의 compose)",
      "에디터 코드 공유. 데스크톱의 core·renderer를 packages/editor로 옮기고, Electron 전용 호출 5종을 Platform 인터페이스(beforeExport/afterExport/quoteExport/finishDialog/signStore …)로 치환했습니다. 웹은 File API·Blob 다운로드·iframe 인쇄로 구현하고 gatedExport() 래퍼가 401→로그인, 402→요금제로 안내합니다",
      "데이터 모델 13 테이블 / 마이그레이션 7개. users(soft delete·환영 체험 1회 기록) · oauth_accounts · sessions(리프레시 회전) · plans · subscriptions · credit_ledger(append-only 원장) · export_tokens · drafts/draft_docs(서버 임시본) · signatures(서명함) · usage_events",
      "REST API 약 42개(/api/v1). auth·oauth·billing·credits·exports·drafts·signatures·activity·admin·usage·health 11개 모듈, zod 타입 프로바이더로 요청/응답 스키마 검증, rate limit(로그인 10회/15분)",
      "내보내기 토큰 패턴. 견적(quote) → 토큰 발급 → 브라우저에서 생성한 결과물 업로드 → 소비(consume). 미소비 토큰은 10분 뒤 자동 환불 잡이 돌려줍니다. 결과물·임시본은 20MB/파일 · 200MB/사용자 · 30일 보관",
      "메모리 예산. 목표 caddy 30 · postgres 70 · api 70MB. Postgres는 shared_buffers 64MB·max_connections 30, API는 커넥션 풀 3 + node --max-old-space-size=128. 실측 API RSS 83~85MB, caddy 13MB, postgres 22MB",
    ],
    sections: [
      {
        title: "인증 · 소셜 로그인 (OAuth 2.0)",
        icon: "shield",
        intro: "이메일 가입과 Google · Kakao · Naver 소셜 로그인을 모두 서버측에서 처리합니다.",
        items: [
          "이메일 가입. argon2id(19MiB, t=2) 해시, 비밀번호 규칙(8자+소문자+숫자+특수문자), 실시간 중복 확인 API",
          "세션. 액세스 JWT 15분(메모리 보관) + 리프레시 30일(httpOnly·Secure·SameSite=Lax 쿠키, 경로 /api/v1/auth). 리프레시는 매번 회전하고 재사용이 감지되면 401. Redis 없이 sessions 테이블로 관리합니다",
          "OAuth 흐름. start → provider 동의 화면 → callback에서 authorization code를 서버가 교환합니다. provider별 어댑터({authorizeUrl, exchange, profile})로 Google·Kakao·Naver 차이를 흡수했습니다",
          "CSRF 방어. state 값을 10분짜리 서명 JWT로 만들어 httpOnly 쿠키에 두고 콜백 쿼리와 대조합니다",
          "계정 매칭 순서. ① oauth_accounts 일치 → ② 같은 이메일의 활성 계정에 자동 연동(계정 통합) → ③ 신규 생성(비밀번호 null). 로그인 중 시작하면 '연동' 모드로 마이페이지에서 provider를 추가합니다",
          "오류 처리. /login?oauth=state_invalid|exchange_failed|no_email|provider_disabled|account_deleted 로 사용자에게 원인을 그대로 전달합니다. e2e 전용 mock provider로 소셜 로그인 6건을 자동 테스트합니다",
          "탈퇴는 soft delete. 세션·구독·임시본·서명·소셜 연동·파일을 지우고 users 행(이메일 점유)은 남겨 재가입 시 환영 체험이 다시 주어지지 않게 했습니다. 모든 요청에서 deleted_at을 확인합니다",
        ],
      },
      {
        title: "구독 · 결제 모델",
        icon: "card",
        intro: "편집과 미리보기는 무료, 돈을 받는 순간은 결과물이 나갈 때뿐입니다.",
        items: [
          "요금제. 환영 체험(trial, 14일·가입 시 자동·이메일당 평생 1회) · 월 6,900원 · 연 59,000원. 요금제는 기동 시 upsert 되는 시드 데이터입니다",
          "판정. 관리자 > 활성 구독(trial 포함) > 없음. 없으면 402 subscription_required 를 돌려주고 웹은 요금제 페이지로 안내합니다",
          "결제 게이트웨이는 PaymentProvider 인터페이스 뒤에 두고 지금은 mock provider입니다. Toss Payments 테스트 모드 연동이 다음 단계입니다",
          "credit_ledger 는 append-only 원장(잔액 = SUM)입니다. 구독 전환 이후 신규 적립·차감은 없고 작업 내역 타임라인에서 과거 이력으로만 표시합니다",
        ],
      },
      {
        title: "SEO — SPA에서 검색 노출까지",
        icon: "search",
        intro: "SSR 없이도 크롤러가 라우트별 제목·설명·OG를 읽도록 빌드 후 프리렌더를 붙였습니다.",
        items: [
          "index.html. title/description/keywords(ko+en), canonical, hreflang(en/ko/x-default), theme-color, robots",
          "Open Graph / Twitter 카드 + og.png(1200×630)로 카카오톡·슬랙 링크 미리보기. 파비콘 세트(svg/ico/png/apple-touch/PWA manifest)는 sharp 스크립트가 icon.svg 에서 만듭니다",
          "JSON-LD WebApplication 구조화 데이터. offers(6,900/59,000 KRW), author Person",
          "라우트별 프리렌더. 빌드 후 스크립트가 /pricing /signup /terms /privacy /login 의 index.html 을 생성해 제목·설명·canonical·og 를 치환(/login 은 noindex)하고 sitemap.xml을 만듭니다. Caddy try_files 가 정적 파일을 우선 서빙합니다",
          "robots.txt. /me /admin /api/ /oauth/ 차단, Sitemap 링크. SPA 안에서도 라우트마다 탭 제목을 갱신합니다",
          "Google Search Console · 네이버 서치어드바이저 소유 확인, 다음 검색 등록 완료. 네이버 진단에 맞춰 제목 40자·설명 80자 이내로 줄였습니다",
        ],
      },
      {
        title: "인프라 · 배포 — AWS Lightsail + Caddy 리버스 프록시",
        icon: "cloud",
        intro: "2GB 서버 한 대를 프로젝트 여러 개가 나눠 쓰는 구조입니다.",
        items: [
          "서버. AWS Lightsail(서울, ap-northeast-2) Ubuntu 22.04 · 2 vCPU · 1.9GB RAM · swap 2GB. *.coolmarvel.com 와일드카드 A 레코드로 서브도메인마다 프로젝트를 붙입니다",
          "Caddy. pdf-editor.coolmarvel.com 사이트 블록에서 /api/* 는 API 컨테이너로 reverse_proxy, 나머지는 정적 dist 를 직접 서빙(try_files … /index.html, /assets/* 1년 immutable 캐시, index.html no-cache). Let's Encrypt TLS 자동 발급·갱신, h1/h2/h3, zstd/gzip, HSTS·nosniff·Referrer-Policy 공통 스니펫. 프론트 컨테이너는 없습니다",
          "공용 vs 앱별 compose. infra/server(edge-caddy 96MB · edge-postgres 256MB, 외부 도커 네트워크 edge)는 서버 공용이고, 각 프로젝트는 infra/app 의 compose(API 192MB)로 edge 네트워크에 참여만 합니다. DB 포트는 loopback 전용",
          "호스트 튜닝. vm.swappiness=10, journald 100M, 도커 json-file 로그 10m×3 + live-restore",
          "CI. npm ci → typecheck → test(Postgres 서비스 컨테이너) → build → 도커 이미지 빌드 확인",
          "CD(main push). 웹 빌드 → API 이미지 docker build + docker save | gzip → compose/Caddyfile/dist 를 rsync → 서버에서 원자적 mv 스왑 → docker load → docker compose up -d → /healthz 확인. 서버에서는 빌드하지 않고(2GB), 앱 비밀은 서버 .env 에만 둡니다. private 레포라 레지스트리 대신 이미지를 직접 전송합니다",
        ],
      },
      {
        title: "에디터 기능",
        icon: "layers",
        items: [
          "툴바 13개. 페이지(사이드바)·선택·실행취소·다시실행·텍스트(추가/수정 스플릿)·지우개·형광펜·연필·이미지/스탬프·사각형/원·표시(X/체크)·주석 도구(서명/주석/링크)·워터마크·레이아웃(한 쪽/두 쪽/맞춤, 이어서/한 장씩, 회전)·페이지 관리",
          "페이지 관리. 드래그 순서 변경·회전·복제·삭제·추출·새 페이지·PDF/이미지 가져오기",
          "텍스트. 원본 서체·굵기·기울임 승계, 정렬 6종, 글자색/배경색/불투명도, 번들 폰트 16종 + 시스템 폰트",
          "서명. 그리기/타이핑/이미지 + 계정 서명함(서버 저장) + 투명 PNG 내려받기. 스탬프 프리셋·날짜, 주석 노트, 링크 영역, 워터마크, 문서 텍스트 검색(Ctrl+F)",
          "내보내기. 다운로드(pdf-lib 평탄화)·인쇄(숨김 iframe)·페이지 추출, 30초 자동 임시 저장과 '이어서 작업하기', 작업 내역에서 30일간 재다운로드",
          "모바일. 터치 40px 타깃, 핀치는 에디터 줌, 툴바 가로 스크롤, 가로 모드 서브툴바 오버레이. 한국어/영어 i18n",
        ],
      },
    ],
    usage: [
      "https://pdf-editor.coolmarvel.com 접속. 별도 설치 없이 브라우저에서 바로 동작합니다.",
      "이메일로 가입하거나 Google · Kakao · Naver 계정으로 로그인합니다. 가입 즉시 환영 체험 14일이 시작됩니다.",
      "PDF를 드롭존에 끌어다 놓으면 에디터가 열립니다. 파일은 브라우저 안에서만 처리되고 서버로 업로드되지 않습니다.",
      "텍스트·그리기·도형·서명·스탬프·주석·링크·워터마크로 편집하고, 페이지 관리에서 순서·회전·추출을 정리합니다.",
      "완료 버튼에서 다운로드 · 인쇄 · 페이지 추출을 선택합니다(활성 구독 필요). 결과물과 임시본은 마이페이지 작업 내역에서 30일간 다시 받을 수 있습니다.",
    ],
    aiUsage: [
      "oh-my-design으로 DESIGN.md 디자인 계약을 먼저 세웠습니다. 베이스 Notion, 툴바·밀도는 Linear 차용, 브랜드 초록 유지. 이후 모든 UI 작업은 이 계약을 통과해야 하고, 편집 후 훅이 계약 밖 hex·radius 드리프트를 잡습니다",
      "에이전트를 병렬로 돌렸습니다. 마지막 라운드는 API ∥ 웹 ∥ 에디터 3갈래로 구현한 뒤 4가지 관점으로 리뷰했고(에이전트 8), 좁은 폭 대응은 수정 → 터치/마우스 비평 2명 → 재수정을 4라운드(에이전트 14), 모바일은 감사 4 → 구현 3 → 리뷰 4(에이전트 11)로 진행했습니다",
      "제 피드백은 스크린샷으로 줍니다. screenshots/ 에 PNG를 두면 미처리 피드백으로 읽어 반영하고 아카이브합니다(6라운드 35장). 세션이 바뀌면 session-log → todo → ADR 순서로 맥락을 복구합니다",
      "typecheck + API 테스트 28건 + Playwright E2E 46건(54 실행)을 통과해야만 배포합니다. 서버에 올린 뒤에는 docker stats 로 RSS를 확인해 메모리 예산과 대조합니다",
      "데스크톱 저장소와의 동기화를 가이드 문서로 적어 두고, 웹에서 고친 에디터 개선(v1.5.8 → v1.7.0)을 데스크톱에 역반영했습니다",
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
      { label: "데스크톱 원본 저장소 (pdf-editor)", href: "https://github.com/coolmarvel/pdf-editor" },
      { label: "pdf-editor.coolmarvel.com 접속", href: "https://pdf-editor.coolmarvel.com" },
    ],
    privateRepo: true,
  },

  "cm-groupware": {
    role: "기획부터 설계·개발·운영까지 혼자 맡고 있습니다",
    background: [
      "입사했을 때 병원 업무는 종이 결재, 수기 근태 관리, 개별 메신저, 흩어진 문서 발급 절차로 나뉘어 있었습니다. 전자결재·근태/연차·게시판·사내 메일/메신저·문서 발급·직무평가·회의록·프로젝트 칸반을 한 플랫폼에 모으는 것이 목표였습니다.",
      "직원 중 고령 사용자가 많아 글자와 버튼의 최소 크기 규칙을 처음부터 정해 두고 만들었습니다.",
    ],
    architecture: [
      "Laravel 12 위에 도메인 주도 설계로 13개 업무 도메인(결재·근태·일정·게시판·메일·직무평가·증명서·칸반 등)을 모듈로 나눴습니다. 도메인 사이는 이벤트로 느슨하게 묶어 기능을 추가해도 다른 도메인이 깨지지 않습니다",
      "다형성 전자결재 엔진. 휴가·연장근무·문서결재 같은 이종 문서를 결재 흐름 하나로 처리하고, 결재가 끝나면 트랜잭션 안의 콜백이 연차 차감 같은 후속 처리를 자동으로 합니다",
      "사용자 생성 이벤트를 받아 Mailcow 메일 계정과 Mattermost 메신저 계정을 자동으로 만드는 이벤트-리스너 구조입니다",
      "알림은 DB 저장 + 30초 폴링 인앱 알림 + Mattermost DM + SMTP 메일을 한 번에 보냅니다",
      "전역 클릭 핸들러가 모든 내부 링크를 Livewire.navigate()로 처리해 링크마다 속성을 붙이지 않아도 전 페이지가 SPA처럼 움직입니다",
      "N+1을 막는 eager loading과 복합 인덱스로 핵심 조회 경로를 정리했고, TailAdmin 디자인 시스템을 Blade로 옮겨 다크모드까지 지원합니다",
    ],
    aiUsage: [
      "Claude Code를 정식 개발 방식으로 쓴 첫 프로젝트입니다. AI가 낸 코드를 믿을 수 있게 만드는 장치를 여기서 처음 설계했고, 그 틀이 이후 모든 프로젝트로 이어졌습니다",
      "훅 4종으로 선을 긋습니다. .env 수정 차단, 민감 파일 staging 차단, 커밋 전 포맷 검증, 편집 후 자동 pint 포맷",
      "리뷰는 슬래시 커맨드로 고정했습니다. 마이그레이션 리뷰, OWASP Top 10 보안 리뷰, DDD 경계 감사, 배포 전 점검, Playwright 브라우저 QA",
      "프로젝트 전용 MCP 서버(Laravel MCP)를 만들어 DB 스키마·모델 관계·라우트를 조회하는 도구를 AI에 주었습니다. 추측이 아니라 실제 코드베이스를 보고 일하게 하려는 것입니다",
      "영역별 스킬 9종을 프로젝트 안에 해시로 고정했고, 아키텍처 결정 7건을 ADR로 남겼습니다",
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
      note: "포트폴리오 열람용 공개 데모 계정입니다. 데모 계정은 조회 외 기능이 막혀 있으니 자유롭게 들어가 보셔도 됩니다.",
    },
  },

  "meeting-todo-mcp": {
    role: "MCP 서버 설계·구현과 LLM 연동 파이프라인을 맡았습니다",
    background: [
      "부서장 회의가 끝나면 회의에서 나온 할 일을 누군가 수기로 정리해 각 부서에 전달해야 했고, 빠뜨리거나 늦는 일이 반복됐습니다.",
      "voice_server가 전사한 회의록을 LLM이 요약·분석한 뒤, 거기서 나온 할 일을 부서별 칸반 보드에 자동으로 카드로 올리는 것까지 사람 손 없이 끝내는 것이 목표였습니다.",
    ],
    architecture: [
      "그룹웨어를 MCP 서버로 엽니다(HTTP/SSE, Bearer 인증). AI 서버가 MCP 클라이언트로 붙어 LLM이 그룹웨어 도구를 직접 부릅니다",
      "회의록 자동화 도구 11종. 부서·프로젝트·멤버·후보 조회와 프로젝트/컬럼/멤버/보드카드 생성",
      "고정된 RPC를 부르는 대신 LLM이 어떤 도구를 언제 쓸지 스스로 판단하도록 도구 설명과 JSON Schema를 LLM이 읽기 좋게 썼습니다",
      "생성 도구는 전부 멱등입니다. 재시도나 중복 호출에도 안전하고, 이미 만들어진 후보는 409로 알립니다",
      "단일 봇 계정 대신 부서 책임자를 자동으로 찾아 카드의 행위자로 삼습니다. 활동 로그가 실제 사람을 가리키게 하려는 결정입니다",
      "REST API·DB 직접 접근 같은 대안을 비교하고 MCP를 고른 이유를 ADR로 남겼습니다",
    ],
    aiUsage: [
      "AI 서버는 Claude Code CLI의 비대화 모드(claude -p)로 LLM을 부릅니다. AI를 개발 도구가 아니라 제품 기능으로 쓴 첫 사례입니다",
      "voice_server(전사) ↔ AI 서버(요약·분석) ↔ 그룹웨어(MCP 도구 호출) 세 시스템이 협업하는 파이프라인입니다",
    ],
    screenshots: [
      { src: "/images/projects/cm-groupware/meetings.jpg", caption: "그룹웨어 회의록 목록 — 자동 수신된 회의별 '할 일 후보 N건 대기' 표시" },
      { src: "/images/projects/cm-groupware/meeting-encrypted.jpg", caption: "회의록 상세 — 암호화 보관 상태와 수신 정보(KDF 600,000 iter). 패스워드 입력 시 1회성으로만 평문 표시" },
      { src: "/images/projects/cm-groupware/meeting-decrypted.jpg", caption: "데모 계정의 복호화 시도 — 읽기 전용 가드가 실제로 차단하는 모습" },
    ],
  },

  "voice-server": {
    role: "파이프라인 설계·구현과 구조 변경을 맡았습니다",
    background: [
      "매주 1~2시간짜리 부서장 회의의 회의록을 손으로 쓰는 부담이 컸습니다. 음성 파일만 올리면 화자분리 → STT → 요약 → 그룹웨어 전송까지 자동으로 끝나는 파이프라인을 만들었습니다.",
      "GPU(12GB VRAM) 한 대라는 제약에서 시작해, 처리 단계를 원격 API로 넘기는 쪽으로 구조를 바꿔 갔고 그 과정을 ADR 6건으로 남겼습니다.",
    ],
    architecture: [
      "queued → converting → diarizing → asr → summarizing → sending → done 상태머신. 단계별 처리 시각을 DB에 남겨 병목을 찾습니다",
      "구조 변화. 로컬 pyannote/faster-whisper GPU 처리 → 원격 WhisperX API 위임 → 요약도 원격 Claude 래퍼 API 위임 → torch·CUDA 의존성을 떼어 내 수 GB에서 수백 MB짜리 얇은 오케스트레이터로",
      "회의록 본문 암호화. 업로드할 때 입력한 패스워드로 PBKDF2 → AES-256-GCM 암호화하고 패스워드는 어디에도 저장하지 않습니다. 서버조차 본문을 풀 수 없습니다",
      "그룹웨어와는 단방향 outbound HTTPS Push만 씁니다(NAT 뒤에서도 동작). Bearer 토큰 + HMAC-SHA256 서명, 실패하면 지수백오프로 5회 재시도",
      "개인정보 보호. 음성 파일은 작업이 끝나면 바로 지우고, 발화 텍스트는 로그에 남기지 않습니다(job_id까지만)",
      "asyncio.Queue 단일 워커로 직렬 처리해 공유 GPU를 보호하고, 그룹웨어와 DB·자격증명을 분리했습니다",
    ],
    aiUsage: [
      "그룹웨어에서 만든 작업 규칙을 그대로 옮겼습니다. 훅 3종(.env 차단·git add 가드·ruff 자동 포맷)과 리뷰 커맨드 3종(파이프라인·보안·배포 전 점검)",
      "'로컬 전량 처리 → 원격 위임 → 얇은 오케스트레이터'로 바꿔 가는 과정을 ADR로 남겨, 버린 대안과 트레이드오프까지 나중에 찾아볼 수 있습니다",
    ],
    screenshots: [
      { src: "/images/projects/voice-server/home.jpg", caption: "업로드 — 회의록 보호 패스워드(암호화)와 WhisperX 원격 설정 패널" },
      { src: "/images/projects/voice-server/jobs.jpg", caption: "처리 이력 — 실제 부서장 회의 50건+ 처리 로그 (완료/실패 상태)" },
      { src: "/images/projects/voice-server/job-detail.jpg", caption: "잡 상세 — 5단계 파이프라인 타임라인, 암호화된 본문 게이트, LLM이 추출한 할 일 50건·10개 부서 (내용은 블러 처리)" },
      { src: "/images/projects/voice-server/job-detail-decrypted.jpg", caption: "패스워드 복호화 후 요약본 — 이 세션에서만 표시, DOCX/MD/JSON 내보내기 (본문 블러 처리)" },
      { src: "/images/projects/voice-server/api-docs.jpg", caption: "FastAPI Swagger — 업로드/잡 상태/스트리밍 부분결과/JSON·MD·DOCX 다운로드 API" },
    ],
    demo: {
      note: "병원 내부망 전용 시스템이라 외부에서는 접속할 수 없습니다. 위 스크린샷은 실제 운영 화면입니다.",
    },
  },

  "pdf-editor": {
    role: "설계·개발·릴리스 전 과정을 혼자 했습니다",
    background: [
      "상용 웹 PDF 편집기는 문서를 서버로 올려야 해서 민감한 문서를 맡기기 어렵습니다. 참고한 서비스(pdfguru.com)의 사용 흐름은 좋았기에, 그 UX를 기준으로 삼되 '문서가 밖으로 나가지 않는' 오프라인 데스크톱 편집기를 만들기로 했습니다.",
      "참고 화면 26장을 기준으로 페이지 관리·텍스트 추가/수정·그리기·형광펜·도형·스탬프·서명·주석·링크까지 상용 수준의 기능을 구현했습니다. 뒤에 같은 에디터를 웹 서비스(PDF Editor Live)로 옮겼고, 지금은 두 쪽이 코어를 공유합니다.",
    ],
    architecture: [
      "정규화 객체 모델. 모든 좌표를 뷰포트 기준 0..1로 정규화하고, 라이브 오버레이와 내보내기가 렌더러 하나(draw.ts)를 공유해 화면과 결과물이 1:1입니다",
      "참조 기반 페이지 연산. 문서를 PageRef[] + objectsByPage로 표현해 원본 PDF 바이트를 건드리지 않고 삭제·복제·이동·회전·타 문서 가져오기를 처리합니다",
      "저장 시 평탄화. 오버레이는 ≈180dpi 투명 PNG로 굽고 링크/노트는 실제 PDF 주석으로 넣으며, 원본 텍스트 벡터는 유지합니다",
      "순수 로직(objects/pages/history)은 node --test로 보호하고, undo/redo는 스냅샷 스택(상한 100)입니다",
      "기존 PDF 텍스트를 자동 인식해 박스 편집하는 텍스트 수정 세션 모드. 버퍼링 후 종료 시 저장을 선택합니다",
      "WSL + Wine 크로스 컴파일로 Windows NSIS 인스톨러를 자동 생성합니다(electron-builder)",
      "macOS(Apple Silicon) DMG 파이프라인. 한글 번들명 크래시를 피하려 내부 제품명을 ASCII로 빌드한 뒤 표시명만 한글을 유지하고, ad-hoc 서명 + hdiutil로 DMG를 만듭니다",
    ],
    aiUsage: [
      "제가 스크린샷을 지정 폴더에 넣으면 Claude Code가 요구사항으로 읽어 구현하고, 처리한 뒤 아카이브로 옮깁니다. 이 방식을 이 프로젝트에서 다듬어 이후 프로젝트에도 그대로 썼습니다",
      "세션이 바뀌어도 문서로 맥락을 복구합니다. CLAUDE.md가 세션 로그 → todo → 최근 계획 순으로 읽게 했습니다",
      "typecheck·test·build를 모두 통과해야만 인스톨러를 굽고 배포합니다",
      "Playwright + WSLg로 앱을 실제로 띄워 PDF 열기 → 편집 → 스크린샷 픽셀 계측까지 자동으로 확인합니다",
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
      { label: "Windows 설치 파일 (v1.5.2)", href: "https://github.com/coolmarvel/pdf-editor/releases/download/v1.5.2/PDF-Editor-Setup-1.5.2.exe" },
      { label: "macOS 설치 파일 (v1.5.2, Intel)", href: "https://github.com/coolmarvel/pdf-editor/releases/download/v1.5.2/PDF-Editor-1.5.2-x64.dmg" },
      { label: "macOS 설치 파일 (v1.5.2, Apple Silicon)", href: "https://github.com/coolmarvel/pdf-editor/releases/download/v1.5.2/PDF-Editor-1.5.2-arm64.dmg" },
      { label: "웹 버전 사용해보기 (PDF Editor Live)", href: "https://pdf-editor.coolmarvel.com" },
    ],
  },

  "file-converter": {
    role: "설계·개발·릴리스 전 과정을 혼자 했습니다",
    background: [
      "온라인 파일 변환 서비스는 편하지만 두 가지가 싫었습니다. 변환하겠다고 개인 파일을 남의 서버에 업로드하는 것 자체가 내 데이터를 제3자에게 넘기는 일이라는 점, 그리고 무료처럼 쓰게 하다가 어느 순간 결제·구독을 요구하는 패턴이 반복된다는 점입니다. '내 파일은 내 컴퓨터 밖으로 나가지 않고, 한 번 설치하면 계속 무료'를 원칙으로 직접 만들었습니다.",
      "배경 제거 같은 AI 기능조차 대부분 서버 업로드와 유료 크레딧으로 제공하기에, AI 추론까지 통째로 로컬에서 돌리는 것을 목표로 잡았습니다. 만들다 보니 PDF 편집 요구가 커져 편집기는 pdf-editor로 분리했고, DICOM 변환은 전용 앱으로 뺐습니다. 9월에는 sh-messenger·remote-assist·sh-web-editor와 같은 클래식 업무 UI로 전면 교체하면서, macOS 전용 무료 포토샵 대안 Compositor(MIT)의 보정·크기·효과·필터·원근·내용 인식 채우기 수식을 TypeScript로 옮겨 왔습니다. 레이어와 브러시 같은 편집기 기능은 sh-compositor로 따로 뺐습니다.",
      "7월 7일 v0.1.0에서 9월 22일 v1.5.1까지 22번 릴리스했습니다. 단위 테스트 44건과 실제 앱을 띄우는 Playwright E2E 41건이 있고, E2E는 난독화된 빌드에 대고 돌립니다.",
    ],
    architecture: [
      "구조. core(순수 TS: 매직 바이트 감지·변환 경로 레지스트리·BMP/ICO 자체 인코더·DPI·한도 30,000px/100MP·Compositor 이식 수식 10모듈, 전부 단위 테스트) / main(1180×780 frame:false 창, IPC 저장·폴더·클립보드·창 버튼, 모델 서빙 프로토콜, 렌더러 크래시 자동 reload) / preload / renderer(React 18 + MUI 6 재스킨: 크롬 3종·대화상자 8종 React.lazy·convert 디스패처·useHistory). 새 변환을 추가할 때 고치는 곳은 두 파일뿐입니다",
      "AI 배경 제거 완전 오프라인. ISNet 계열 모델(@imgly/background-removal 1.4.5, ONNX)과 onnxruntime-web wasm을 인스톨러에 통째로 번들하고 커스텀 프로토콜로 앱 안에서 서빙합니다(경로 탈출 방지·CORS). 1.7.0을 설치하면 모델명이 바뀌어 오프라인에서 실패하는 것을 sh-compositor에서 실제로 겪고 v1.5.1에서 1.4.5로 정확히 고정했습니다. 가장자리 다듬기(GuidedMatte·이동·대비)는 Compositor 이식입니다",
      "흰색 → 투명은 AI 없이 픽셀 연산(허용 오차 + feather)으로 즉시 처리합니다. 로고처럼 단색 배경은 모델 로드 없이, 사진은 AI로 구분합니다",
      "입출력. 입력 11종(PDF·PNG·JPEG·WebP·BMP·GIF·SVG·AVIF·HEIC·TIFF·ICO, + Ctrl+V), 출력 7종(PDF·PNG·JPEG·WebP·BMP·ICO 멀티사이즈·SVG 벡터화). 다중 이미지 → PDF 1개(픽셀×72/DPI pt), PDF → 페이지별 이미지(1.5/2/3x). 종류가 섞이면 '같은 종류끼리만' 안내합니다",
      "렌더 파이프라인은 한 곳입니다. (파일별: 원근 보정 → AI 배경 제거·다듬기) → 리사이즈(2배씩 단계 축소) → 회전/반전/흑백 → 보정 → 필터 → 흰색 제거 → 효과 → 캔버스 크기(+내용 인식) → 자르기 → 워터마크 → 매트 → 인코딩(+DPI). 미리보기와 저장이 같은 함수를 공유해 '보이는 그대로' 저장되고, 필터·효과가 켜지면 미리보기가 실제 파이프라인 결과로 바뀝니다",
      "클래식 UI. 반경 0·1px 테두리·12px 돋움·24px 컨트롤, 앱이 그리는 타이틀바(28)+메뉴 바(22)+상태 줄(22), 어두운 미리보기 스테이지, sh-web-editor에서 실측한 크롬 팔레트 + 스킨 13종(localStorage). MUI는 유지하고 토큰 하나로 재스킨해 E2E 선택자를 보호했습니다",
      "PDF 문서 도구. 전체 병합·분할·회전·페이지 삭제·순서 변경, \"1,3-5\" 페이지 범위 파서. 대용량 PDF 페이지 넘김 메모리 안정화(135MB·30p: 1.4GB → 0.9GB)",
      "번들·배포. pdf.js·pdf-lib·heic2any·utif2·imagetracer·AI 모듈을 지연 로딩 청크로 분리해 시작 청크 2,389KB → 941KB. javascript-obfuscator 난독화를 빌드에 내장(onnx·pdf.worker 청크는 제외). NSIS 인스톨러(설치 경로 선택·한글 파일명), 자동 업데이트는 없습니다",
    ],
    usage: [
      "아래 Windows 인스톨러를 받아 설치합니다(약 367MB, AI 모델 동봉). 설치 후에는 네트워크가 없어도 모든 기능이 동작합니다.",
      "파일을 창에 끌어 놓거나 Ctrl+O·Ctrl+V로 추가합니다. 같은 종류의 파일끼리 묶이면 툴바에 변환 대상(PDF·PNG·JPEG·WebP·BMP·ICO·SVG)이 나타납니다.",
      "옵션 바에서 크기·품질·회전·자르기·배경(흰색 → 투명 / AI 배경 제거)·워터마크를 켜면 미리보기에 바로 반영됩니다. 이미지(I) 메뉴의 이미지 크기·캔버스 크기·보정, 도구(T) 메뉴의 펴기·필터·효과·내보내기 미리보기도 같은 파이프라인입니다.",
      "'변환 후 저장'을 누르면 파일 1개는 저장 대화상자, 여러 개는 폴더를 골라 일괄 저장합니다. PDF는 '페이지 도구'로 분할·회전·삭제·순서 변경을 바로 저장합니다.",
      "보기(V) ▸ 스킨에서 크롬 색을 13종 중에 고릅니다. Ctrl+Z/Y로 파일 추가·삭제·모든 옵션 변경을 되돌립니다.",
    ],
    aiUsage: [
      "제품 기능으로서의 AI부터 결정했습니다. 배경 제거 모델을 npm으로 받을 수 있는 마지막 버전(1.4.5)에 정확히 고정했습니다. 그 위 버전은 자사 CDN 전용이라 오프라인 번들이 불가능하고, 이 버전 선택이 곧 아키텍처 결정이었습니다",
      "Claude Code로 만들고 저는 설치본을 직접 써 보며 피드백했습니다. 스크린샷을 프로젝트 루트에 넣어 두면 다음 세션이 요구사항으로 읽어 반영하고, 매 변경마다 버전을 올려 NSIS 인스톨러를 구워 제 바탕화면에 복사합니다",
      "맥락 복구는 문서에 맡깁니다. CLAUDE.md가 세션 로그 → todo → 최근 계획 순으로 읽게 하고, 결정은 ADR 8건에 남겼습니다",
      "typecheck·test·build를 통과해야만 인스톨러를 굽습니다. Playwright E2E 41건(이미지 14 · PDF 6 · 특수 입력 3 · AI 실추론 1 · 클래식 UI와 Compositor 이식 17)을 난독화 빌드에 대고 상설로 돌립니다",
      "오픈소스를 가져올 때는 범위를 표로 고정했습니다. Compositor(MIT)에서 옮긴 수식은 ADR 표에 적고 정보 대화상자에 고지했으며, 모듈마다 단위 테스트를 먼저 붙였습니다. v1.3.2에서 v1.5.0까지는 하루 한 세션에 Prettier 도입과 전체 리팩토링을 함께 끝냈습니다",
    ],
    screenshots: [
      { src: "/images/projects/file-converter/main.jpg", caption: "변환 화면 — 파일 목록·변환 대상 버튼(PDF·PNG·JPEG·WebP·BMP·ICO·SVG)·옵션 바·어두운 미리보기 스테이지, 클래식 UI(v1.4~)" },
      { src: "/images/projects/file-converter/landing.jpg", caption: "시작 화면 — 드래그 앤 드롭, Ctrl+V 클립보드 붙여넣기, Ctrl+O 파일 열기, 지원 포맷 11종" },
      { src: "/images/projects/file-converter/watermark.jpg", caption: "워터마크 — 문구·색·진하기·크기·간격·기울기를 미리보기에 실시간 합성" },
      { src: "/images/projects/file-converter/crop.jpg", caption: "자르기 — 미리보기 위에서 드래그, 비율 프리셋(1:1·4:3·16:9)·Shift 비율 고정·Alt 가운데 기준, 3분할 안내선" },
      { src: "/images/projects/file-converter/adjust-curves.jpg", caption: "보정(Ctrl+M) — 커브 탭: 채널별(RGB·R·G·B) 점 추가·이동, S자·밝게 프리셋 (Compositor 이식)" },
      { src: "/images/projects/file-converter/adjust-levels.jpg", caption: "보정 — 레벨 탭: 입력/출력 레벨, 자동 3방식, 스포이트(검정 점·회색 점·흰 점)" },
      { src: "/images/projects/file-converter/perspective.jpg", caption: "원근 보정·기울기(Ctrl+Shift+P) — 네 모서리를 문서 귀퉁이에 맞추면 호모그래피로 펴고 결과 크기를 미리 계산" },
      { src: "/images/projects/file-converter/effects.jpg", caption: "효과(Ctrl+Shift+E) — 외곽선·그림자·색 덮기·안쪽 그림자, 스티커 프리셋(흰 외곽선 10px + 옅은 그림자)" },
      { src: "/images/projects/file-converter/filters.jpg", caption: "필터(Ctrl+Shift+F) — 가우시안·모션 블러, 노이즈 추가(가우시안/균일·단색), 렌즈 보정" },
      { src: "/images/projects/file-converter/image-size.jpg", caption: "이미지 크기(Ctrl+Alt+I) — 단위 px/%/인치/cm, 비율 유지, 해상도 DPI, 리샘플(2배씩 단계 축소)" },
      { src: "/images/projects/file-converter/canvas-size.jpg", caption: "캔버스 크기(Ctrl+Alt+C) — 크기 지정/여백 추가/정사각형, 9방향 기준 위치, 여백 채우기 색/투명/내용 인식" },
      { src: "/images/projects/file-converter/export-preview.jpg", caption: "내보내기 미리보기 — 품질 슬라이더에 따라 실제 인코딩 결과와 용량(51.5 KB · 1,600×1,000px)을 표시, 투명 자리 매트 색" },
      { src: "/images/projects/file-converter/transparent.jpg", caption: "흰색 → 투명 — 픽셀 연산(허용 오차 12% + feather)으로 즉시 처리, 체커보드로 투명 표시" },
      { src: "/images/projects/file-converter/ai-loading.jpg", caption: "AI 배경 제거 진행 — 번들된 ISNet 모델 로드(상태 줄 진행률), 네트워크 요청 0회" },
      { src: "/images/projects/file-converter/ai-result.jpg", caption: "AI 배경 제거 결과 — 인물 사진 배경을 로컬 ONNX 추론만으로 제거, 가장자리 다듬기·이동·대비 옵션" },
      { src: "/images/projects/file-converter/pdf.jpg", caption: "PDF 변환 — 페이지별 이미지(해상도 1.5/2/3x), 1/4쪽 넘김 미리보기, 전체 병합" },
      { src: "/images/projects/file-converter/pdf-tools.jpg", caption: "PDF 페이지 도구 — 분할(\"1-2,3-4\" 범위 문법)·회전·삭제·순서 변경을 바로 저장" },
      { src: "/images/projects/file-converter/menu-skins.jpg", caption: "보기(V) 메뉴 — 파일 목록·확대/축소·화면에 맞춤·실제 크기, 스킨 13종" },
      { src: "/images/projects/file-converter/skin-dark.jpg", caption: "진회색 스킨 — 크롬 색만 바뀌고 배치는 동일(localStorage 기억)" },
      { src: "/images/projects/file-converter/about.jpg", caption: "정보 — v1.5.1, 제작 크레딧, 오픈소스 고지(Compositor MIT · @imgly AGPL-3.0 · pdf.js · pdf-lib · MUI)" },
    ],
    links: [
      { label: "GitHub 저장소", href: "https://github.com/coolmarvel/file-converter" },
      { label: "Windows 설치 파일 (v1.5.1)", href: "https://github.com/coolmarvel/file-converter/releases/download/v1.5.1/File-Converter-Setup-1.5.1.exe" },
      // macOS DMG — 맥 빌드 환경이 없어 미배포(electron-builder 설정만 있음).
    ],
  },

  "dicom-studio": {
    role: "설계·개발·릴리스 전 과정을 혼자 했습니다",
    background: [
      "병원 검사장비(혈관검사·심전도 등) 상당수는 결과를 DICOM이 아닌 PDF·JPG 같은 일반 파일로 내놓습니다. 이 결과를 PACS 같은 병원 영상 시스템에 넣으려면 환자·검사정보를 메타데이터로 붙여 DICOM으로 변환하는 중간 게이트웨이가 필요한데, 기존 상용 도구는 특정 장비·벤더에 묶여 있고 라이선스 인증 절차가 번거로웠습니다. 병원 ID·장비 번호까지 전부 설정값인 범용 게이트웨이를 목표로 직접 만들었습니다.",
      "검사실 직원의 실제 동선(장비 결과 열기 → 정리 → 환자정보 입력 → 변환 → 보관·검색 → 전송)을 그대로 화면 구조로 옮기고, 장비 매뉴얼의 클래식 데스크톱 폼 UI를 TailAdmin 디자인 시스템으로 다시 그렸습니다. 아래 스크린샷은 제 실제 동맥경화도검사(baPWV·ABI) 결과지 2장으로 전체 워크플로우를 시연한 것입니다.",
    ],
    architecture: [
      "파일 형식을 확장자가 아닌 매직 바이트로 감지합니다. PDF(페이지별)·JPG·PNG·BMP·TIFF(다중 페이지)·기존 DICOM 입력. pdf.js는 Electron V8 호환을 위해 legacy 빌드를 쓰고 프로덕션 E2E로 검증했습니다",
      "DICOM 3.0 Secondary Capture(RGB, Explicit VR Little Endian) 생성(dcmjs). 다중 이미지는 한 Study 한 Series, <PatientID>_<검사일>/00001.dcm… 폴더 구조",
      "DICOM 네트워크 3종(dcmjs-dimse). C-STORE 전송(복수 대상 동시 + 대상별 결과 표시), C-FIND 워크리스트 조회, C-ECHO 연결 테스트. 실PACS 없이 체험할 수 있는 테스트 SCP 서버를 동봉했습니다",
      "로컬 DB는 sql.js(WASM SQLite)입니다. 처음 쓴 better-sqlite3가 WSL 크로스 빌드에서 Linux 바이너리가 Windows 패키지에 섞여 기동이 안 됐고, 네이티브 모듈 0개 구조로 바꿔 해결했습니다",
      "워크리스트 연결 프로필. 서버 없는 병원은 로컬(내장 DB)에 처방을 직접 등록하고, MWL 서버가 있는 병원은 프로필을 바꿉니다. 처방 행 클릭 = 환자·검사정보 자동 입력(나이 자동 계산), SaveDB 저장 시 일치하는 처방 자동 완료",
      "편집(회전·반전·색반전·순서변경)은 원본 보존 + transform 베이크 구조입니다. 옆으로 스캔된 검사지를 화면에서 세운 그대로 DICOM 저장·전송에 반영합니다",
      "3계층 분리. src/core 순수 로직(node test runner로 직접 테스트) / main은 파일 IO·DB·DICOM 전송 등 OS·네트워크 접점 전담 / contextBridge IPC로만 렌더러에 노출",
    ],
    aiUsage: [
      "제 project-seed 템플릿으로 킥오프했습니다. 브리프(왜/무엇)·세션 부팅 프로토콜·스크린샷 피드백 루프·훅(.env 차단, git add 가드, 자동 포맷)을 첫날부터 가동했습니다",
      "버전 판단은 Claude Code에 맡겼습니다. 패치는 자동으로 올리고 마이너 승격은 근거와 함께 제안받아 제가 결정했습니다. 11일 동안 v1.0.0 → v1.4.0으로 마일스톤 4개(변환·이미지 도구·로컬 DB·PACS 전송)를 완주했습니다",
      "typecheck·lint·test·build를 모두 통과해야만 인스톨러를 굽습니다. WSL에서 개발하고 실제 Windows에서 설치본을 직접 확인했습니다",
      "이 페이지의 스크린샷은 실제 검사 PDF를 DICOM으로 변환하고 테스트 SCP 서버로 C-STORE 전송까지 한 화면입니다",
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
      note: "아래 인스톨러로 설치해 직접 사용해볼 수 있으며, 스크린샷은 제 실제 검사 결과지로 시연한 화면입니다. 특정 병원·장비에 종속되지 않는 범용 앱으로, 기관 ID·이름·장비 번호는 모두 설정값입니다.",
    },
    links: [
      { label: "GitHub 저장소", href: "https://github.com/coolmarvel/dicom-studio" },
      { label: "Windows 설치 파일 (v1.4.0)", href: "https://github.com/coolmarvel/dicom-studio/releases/download/v1.4.0/DICOMStudio-Setup-1.4.0.exe" },
    ],
  },

  "sh-ip-scanner": {
    role: "학습 프로젝트. 설계·개발·패키징 전 과정을 혼자 했습니다",
    background: [
      "지금까지의 주력 스택(TypeScript · React · Electron)에서 한 걸음 나가 새 언어를 제대로 익히고 싶었고, 그 언어로 C#을 골랐습니다. 문법 예제 대신 실제로 매일 쓰던 도구를 교재로 삼기로 하고, 포터블 툴 faIpScanner(Delphi로 만들어진 설치 없는 exe)를 대상으로 정했습니다.",
      "먼저 원본 바이너리를 정적 분석해 동작 원리를 알아냈습니다. VCL/Indy의 TCheckIPThread·TFindHostNameThread로 대역을 멀티스레드 스윕하고, SendARP(iphlpapi)로 MAC을, 역DNS로 호스트명을 채우는 클래식 LAN 스캐너였습니다. 이 세 동작이 C#의 표준 라이브러리와 Win32 P/Invoke로 거의 1:1 재현 가능하다는 판단이 스택 결정의 근거가 되었습니다.",
      "결과물로도 실사용합니다. 관리 중인 네트워크에 지금 어떤 장비가 붙어 있는지(IP·PC명)를 한눈에 보는 전산 자산 파악 용도이며, 스캔 대역은 여러 개를 드롭다운으로 오가며 관리합니다.",
    ],
    architecture: [
      "Core / App 2계층 분리. 네트워크·설정 로직은 UI를 모르는 ShIpScanner.Core에 두고 xUnit으로 직접 테스트하며, 화면은 Avalonia MVVM(ObservableProperty·RelayCommand)으로 상태 바인딩만 담당합니다",
      "병렬 핑 스윕. 원본이 스레드 254개를 굴리던 것을 async/await + SemaphoreSlim(동시 실행 수 제한) + CancellationToken(협조적 중지)으로 재현하고, IProgress<T>로 결과를 도착하는 대로 바둑판에 흘려보내 점진적으로 색칠합니다",
      "PC명 조회를 직접 구현했습니다. NetBIOS Node Status(NBSTAT) 패킷을 UDP 137로 만들어 보내고 응답에서 UNIQUE·접미사 0x00(Workstation) 이름을 파싱합니다. 한글 이름은 CP949로 오기 때문에 .NET Core에 기본 탑재되지 않은 코드페이지 공급자를 등록해 디코드하고, 실패 시 역DNS로 폴백하는 Composite 구조입니다",
      "스캔 대역·스캔 옵션(타임아웃·동시 개수·이름 조회)은 %APPDATA%에 JSON으로 저장합니다. Program Files가 아닌 사용자 쓰기 가능 경로이고, 파일이 없거나 깨져도 앱이 죽지 않고 빈 목록으로 폴백합니다",
      "기본 대역을 코드에 하드코딩하지 않습니다. 저장된 대역이 0개면 첫 실행으로 보고 안내 모달을 띄워 내 대역 자동 감지 결과를 제시합니다. 저장소를 공개로 전환하기 위한 설계 변경이었고, 과거 커밋에 남아 있던 실 대역도 git history 재작성으로 함께 정리했습니다",
      "Win32 종속 기능(SendARP 등)은 인터페이스 뒤로 격리합니다. 개발은 WSL(Linux), 실행 대상은 Windows인 환경에서 빌드가 깨지지 않도록 코드 지도에 규칙으로 적었습니다",
      "자체포함(self-contained) 단일 파일 게시 + Inno Setup 인스톨러. .NET 런타임이 없는 PC에서도 설치·실행되며, WSL에서 wine으로 ISCC를 돌려 Setup.exe까지 굽는 파이프라인을 검증했습니다",
    ],
    aiUsage: [
      "제 project-seed 템플릿으로 킥오프했습니다. 브리프(왜/무엇)·세션 부팅 프로토콜·ADR·세션 로그를 첫날부터 가동해, 세션이 끊겨도 문서만 읽고 맥락을 복구하는 구조입니다",
      "학습이 목적인 프로젝트라 '가장 짧은 코드'가 아니라 '개념이 드러나는 코드 + 개념 주석'을 규칙으로 명시했습니다. Task·SemaphoreSlim·CancellationToken 같은 C# 개념을 코드 옆에 남기게 해서 제가 읽으며 배울 수 있게 했습니다",
      "훅으로 검증을 시스템화했습니다. .env 편집 차단, git add -A 차단, 저장 시 dotnet format, 저장 시 백그라운드 빌드. 커밋 전 build·test·format 3종 통과를 전제 조건으로 고정했습니다",
      "함정은 CLAUDE.md에 적어 재발을 막습니다. net8.0 고정(Avalonia 12는 SDK 8과 소스제너레이터 비호환), [ObservableProperty]는 필드 기반(C# 13 partial property 사용 불가) 등 실제로 한 번씩 밟은 지뢰만 기록했습니다",
      "이 페이지의 스크린샷도 Avalonia 헤드리스 렌더러로 실제 앱 화면을 PNG로 구운 것입니다. GUI 세션이 없는 WSL에서도 UI를 눈으로 검증하는 캡처 하네스입니다",
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
      note: "아래 인스톨러로 설치해 직접 사용해볼 수 있습니다(자체포함 빌드라 .NET 런타임 설치 불필요, 코드 서명은 없어 SmartScreen 경고가 뜰 수 있습니다). 스크린샷의 IP 대역(192.168.x)과 PC명은 예시 데이터입니다. 실제 운영 대역·장비명은 노출하지 않기 위해 저장소와 화면 모두에서 예시 값으로 대체했습니다.",
    },
    links: [
      { label: "GitHub 저장소", href: "https://github.com/coolmarvel/sh-ip-scanner" },
      { label: "Windows 설치 파일 (v1.0.1)", href: "https://github.com/coolmarvel/sh-ip-scanner/releases/download/v1.0.1/sh-ip-scanner-Setup-1.0.1.exe" },
    ],
  },

  "sh-dicom-studio": {
    role: "학습 프로젝트. 설계·개발·서버·패키징 전 과정을 혼자 했습니다",
    background: [
      "sh-ip-scanner로 C# 문법과 Avalonia MVVM을 익힌 뒤, 다음 단계로 실무 규모의 앱 하나를 C# 생태계 전체로 관통하고 싶었습니다. 데스크톱(MVVM)에서 시작해 웹 API(ASP.NET Core), 상용 DB(Oracle), 컨테이너 배포(docker compose)까지입니다. 교재는 제가 만들었던 dicom-studio(Electron)를 골랐습니다. 도메인과 기능 명세를 이미 알고 있는 앱을 다시 만들면, 문제 정의에 쓸 에너지를 아껴 언어·스택 학습에만 집중할 수 있기 때문입니다.",
      "마일스톤을 4차로 나눠 완주했습니다. 1차 오프라인 완결(이미지 열기 → 뷰어 → DICOM 변환 → SQLite 검색), 2차 서버(ASP.NET Core 8 + Oracle 로그인·검사 메타 동기화), 3차 PACS 전송(C-ECHO/C-STORE, Orthanc 도커 동봉), 4차 Worklist(서버 예약 접수 → 선택 시 환자정보 자동 입력). 뷰어 오버레이·워크리스트 UI는 실무에서 쓰는 PACS 프로그램(PACSPLUS·PPW)의 화면을 참고해 다듬었고, 4차가 끝난 시점에 제가 1.0을 선언해 v1.0.x로 올렸습니다.",
      "학습 과정 자체도 산출물로 남겼습니다. 이 앱의 실제 코드를 예제로 쓴 12강짜리 교재 'JAVA 개발자를 위한 C# & ASP.NET Core 실전 입문' PDF를 Claude Code와 함께 만들어 릴리스에 같이 올렸습니다(프로퍼티·record·LINQ·async/await부터 Minimal API·DI·JWT·ADO.NET·도커 배포까지).",
    ],
    architecture: [
      "Core / App / Server 3계층. UI 없는 도메인 로직(DICOM 변환·SQLite·이미지 처리)은 ShDicomStudio.Core에 두고 xUnit 34종으로 직접 테스트하며, 화면은 Avalonia MVVM(CommunityToolkit.Mvvm), 서버는 별도 프로젝트로 분리했습니다",
      "DICOM 변환은 fo-dicom입니다. JPG/PNG/BMP/TIFF/PDF를 Secondary Capture로 변환하고 다중 이미지는 한 Study 한 Series로 묶습니다. 기존 .dcm 파일 열기도 지원합니다",
      "뷰어. 그리드 레이아웃(1×1~4×4, 장수 기반 자동), 회전·반전·색반전·순서변경·삭제, Magnify 돋보기 렌즈(2.5×), PACSPLUS 스타일 4모서리 환자정보 오버레이(토글, 폼 실시간 반영). RenderTransform 호스트를 Canvas로 고정해 변환 좌표계 문제를 해결했습니다",
      "서버. ASP.NET Core 8 Minimal API + Oracle 23ai Free(gvenzl 이미지)를 docker compose로 구동합니다. JWT(HS256) 로그인, BCrypt 비밀번호 해시, 계정 관리(admin 전용), 검사 메타데이터 upsert 동기화, 예약(ORDERS) 등록/조회/삭제 API",
      "PACS 전송. fo-dicom DicomClient로 C-ECHO 연결 테스트·C-STORE 전송, 목적지(AE Title/호스트/포트) 관리. 테스트용 Orthanc 컨테이너를 compose에 동봉해 실PACS 없이 E2E 검증합니다",
      "Worklist 허브. InsExam·FindDB·Worklist 3개 창을 [예약 접수]/[검사 검색(내부·서버 탭)] 2탭 허브 하나로 통합하고, SaveDB가 저장 흐름(업데이트/이미지 추가/새 검사)을 4지선다로 통합합니다",
      "JPG 내보내기. ImageSharp로 네 모서리 환자정보 오버레이(흰 글씨+그림자, 해상도 비례 폰트, 한글 시스템 폰트 자동 탐색)를 구워 내보냅니다(PPW 5.1 참고)",
      "자체포함 단일 파일 게시 + Inno Setup 인스톨러. WSL에서 wine으로 Setup.exe까지 굽는 파이프라인(sh-ip-scanner에서 검증한 조합 재사용)",
    ],
    aiUsage: [
      "제 project-seed 템플릿으로 킥오프했습니다. 브리프(왜/무엇)·세션 부팅 프로토콜·ADR·훅(.env 차단, git add 가드, dotnet format 자동 실행)을 첫날부터 가동했습니다",
      "커밋 전 build·test·format 3종 통과를 전제 조건으로 고정하고, 서버 기능은 라이브 검증까지 합니다. compose 기동 후 실제 로그인/업로드/검색 API 호출, Orthanc으로 C-STORE 실전송 확인을 마쳐야 인스톨러를 굽습니다",
      "함정은 CLAUDE.md에 적어 재발을 막습니다. ItemsPanelTemplate 안의 컴파일 바인딩은 런타임 크래시(ReflectionBinding 사용), Matrix 변환 호스트는 Canvas 고정, Oracle 바인드 변수 예약어(ORA-01745) 등 실제로 밟은 지뢰만 기록했습니다",
      "이 페이지의 스크린샷도 Avalonia 헤드리스 렌더러로 실제 앱을 구동해 찍었습니다. 도커로 띄운 Oracle 서버에 실제 로그인해 Worklist 예약 조회까지 라이브로 시연한 화면입니다",
      "학습 교재 12강 PDF도 Claude Code와 함께 만들었습니다. 앱의 실제 코드를 발췌해 자바 개발자 관점(csproj=pom.xml, LINQ=Stream, ADO.NET=JDBC)으로 재구성했습니다",
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
      note: "스크린샷의 환자·검사 정보는 전부 가상 값입니다. 검사지 이미지의 식별정보(ID·이름)도 예시 값으로 마스킹했습니다. 아래 인스톨러로 설치해 직접 사용해볼 수 있습니다(자체포함 빌드라 .NET 런타임 설치 불필요, 코드 서명이 없어 SmartScreen 경고가 뜰 수 있습니다). 서버 기능(로그인·Worklist·PACS 전송)은 저장소의 docker compose로 로컬에서 재현할 수 있고, 서버 없이도 오프라인으로 모든 변환·조회 기능이 동작합니다.",
    },
    links: [
      { label: "GitHub 저장소", href: "https://github.com/coolmarvel/sh-dicom-studio" },
      { label: "Windows 설치 파일 (v1.0.1)", href: "https://github.com/coolmarvel/sh-dicom-studio/releases/download/v1.0.1/sh-dicom-studio-Setup-1.0.1.exe" },
      { label: "학습 교재 PDF (12강)", href: "https://github.com/coolmarvel/sh-dicom-studio/releases/download/v1.0.1/csharp-aspnet-study-guide.pdf" },
    ],
  },

  "pt-schedule": {
    role: "백엔드와 프론트엔드를 혼자 설계·개발했습니다",
    background: [
      "물리치료실의 치료사별 환자 배정이 수기 시간표로 관리되어 바꾸고 찾고 집계하는 일이 번거로웠습니다. 치료사별 일일 시간표(08:00~18:00)와 월간 통계, 환자/치료사 검색을 제공하는 운영 도구를 만들었습니다.",
    ],
    architecture: [
      "FastAPI 기능별 라우터 + core(config/database) 구조로 schedule·therapist·auth·calendar·search 5개 도메인을 나눴습니다",
      "관리자/치료사 이중 인증. 치료사는 개인 시간표 중심, 관리자는 전체 운영 관리",
      "React 18 + TanStack Query로 시간표 그리드와 월간 캘린더 통계(치료사별 환자 수)를 만들고 치료사별로 색을 구분했습니다",
      "그룹웨어와 같은 서버에서 Docker Compose(edge 외부 네트워크 공유)로 운영하고, 그룹웨어 사이드바에서 바로 들어갑니다",
    ],
    aiUsage: [
      "그룹웨어의 문서·작업 규칙을 가벼운 스택(FastAPI + React)에 그대로 옮겼습니다. 프로젝트 로컬 스킬 5종을 해시로 고정하고 MCP(playwright·context7)도 프로젝트 안에 격리했습니다",
    ],
    screenshots: [
      { src: "/images/projects/pt-schedule/schedule.jpg", caption: "치료사별 일일 시간표 — 직책별 색상 헤더, 시간대별 환자 배정 (환자·치료사 성명은 블러 처리)" },
    ],
    demo: {
      note: "실제 병원 운영 시스템이라 환자 정보 보호를 위해 로그인 계정은 공개하지 않습니다. 위 스크린샷은 관리자 화면을 개인정보 블러 처리 후 찍은 것입니다.",
    },
  },

  "dpp-performance": {
    role: "성능·부하 시험 설계와 TTA 인증 대응을 전담했습니다",
    background: [
      "KISA(한국인터넷진흥원)·부산광역시 주관 블록체인(ICON) 기반 전기차 배터리 이력관리·DPP(Digital Product Passport) 인증 사업에서, TTA 공식 성능시험을 통과하려면 정량 성능 검증이 필요했습니다.",
    ],
    architecture: [
      "nGrinder Controller·Agent를 NCP에 구성하고 Groovy 부하 테스트 스크립트를 설계·개발했습니다",
      "동시 사용자 수·TPS·응답시간 기준으로 부하 시나리오를 정의하고, 단계별로 부하를 올려 네트워크별 한계 처리량을 찾았습니다",
      "측정 결과. 코인 네트워크 조회(READ) 3,000 TPS / 쓰기(WRITE) 1,000 TPS, 토큰(스마트 컨트랙트) 네트워크 조회 1,000 TPS / 쓰기 500 TPS",
      "LFT2(PBFT 기반 BFT) 합의와 DPoC 거버넌스 구조를 이해한 위에서 Mainnet/Testnet 환경 간 성능 편차를 분석했습니다",
      "TTA 담당자와 협업해 시험 기안서와 공식 성능시험 결과 보고서를 쓰고 인증 절차에 대응했습니다",
    ],
  },

  "athometrip-commerce": {
    role: "주문·결제 도메인 설계와 개발을 맡았습니다",
    background: [
      "워드프레스(WooCommerce)로 운영하던 여행 상품 판매가 유지보수와 사업 확장 모두에서 한계에 부딪혀, 자체 주문·결제 플랫폼을 새로 만들어 레거시를 옮겼습니다.",
    ],
    architecture: [
      "Stripe 연동 주문/결제 구조 설계. 해외 결제가 많은 여행 상품에 맞춘 결제 플로우",
      "RabbitMQ 비동기 메시징으로 주문 후처리(알림·정산)를 분리해 결제 응답 지연을 줄였습니다",
      "상품 주문과 가이드/협력사 매칭 로직. 가이드 배정 시스템 구조를 설계·개발했습니다",
      "Spring Boot + MyBatis + MariaDB, AWS EC2 + Nginx 운영",
    ],
  },

  "gaia-backoffice": {
    role: "백오피스 전체(MSA 6개 서비스)를 혼자 설계·개발했습니다",
    background: [
      "내부 CS와 외부 협력사(가이드·티켓 발권·셔틀 기사)가 WooCommerce 주문을 수기로 확인·관리하고 있어 누락과 지연이 잦았습니다. 상품별 주문 관리와 일정 리마인드를 자동화하는 어드민 시스템을 혼자 만들었습니다.",
    ],
    architecture: [
      "주문/발권/리마인드 도메인을 나눈 NestJS MSA 6개 서비스(포트 3000~3005)를 혼자 설계·개발했습니다",
      "WooCommerce Webhook으로 주문 이벤트를 받고 WebSocket으로 CS 화면에 실시간 반영해, 주문발권과 가이드·셔틀 배정 리마인드의 수기 확인 단계를 없앴습니다",
      "Next.js + TanStack(React Query/Table)로 대용량 주문 데이터 조회·관리 어드민 UI를 만들었습니다",
      "Auth.js 기반 인증/인가. 협력사 역할별(가이드/발권/셔틀) 접근 제어",
    ],
  },

  "fireblocks-custody": {
    role: "백엔드 서버 아키텍처 설계·구현과 관리 웹 개발을 맡았습니다",
    background: [
      "기관용 디지털 자산 관리에는 개인키 하나가 아니라 다중 승인 체계가 필요합니다. 사내 권한자(editor·approver·signer)가 역할에 따라 원장을 만들고 서명하고 전송하는 커스터디 시스템을 만들었습니다.",
    ],
    architecture: [
      "Fireblocks MPC 커스터디 SDK 연동. 지갑 생성·트랜잭션 서명·전송·자산/로그 조회 API 구현",
      "역할 기반 접근제어(RBAC)와 다중 승인 흐름을 반영한 권한 처리",
      "Express 기반 서버 아키텍처 설계, Redis 캐싱, JWT 인증",
      "React.js + Redux 기반 반응형 관리 웹, Azure Cloud + JumpBox 운영 환경",
    ],
  },

  wcms: {
    role: "온체인 데이터 수집 파이프라인을 설계·구현했습니다",
    background: [
      "재단 지갑·암호화폐의 재무 현황을 외부 스캐너에 의존하면 데이터 정합성을 보장할 수 없었습니다. 온체인 원장 데이터를 사내 서버에 직접 수집·적재하는 파이프라인을 만들었습니다.",
    ],
    architecture: [
      "web3.js + 스케줄러(Spring Batch·node-schedule) 기반 온체인 데이터 수집 자동화 파이프라인",
      "일별 시작/종료 블록 넘버 수집, 재단 지갑별 보유 토큰 리스트 집계",
      "토큰 분류(FT/NFT)와 트랜잭션 원장(tx-log) 수집. 일별 입고/출고(debit/credit) 합계를 UTC·KST 기준으로 동시에 산출",
      "배치 실행 로그를 월별 CSV로 자동 덤프해 감사·정산 추적이 가능합니다",
    ],
  },

  "kr-esg-nft": {
    role: "스마트 컨트랙트 구현·배포와 백엔드 아키텍처를 맡았습니다",
    background: [
      "한국렌탈 고객사 대상 ESG 캠페인(연말 나무 심기)의 성과를 증빙할 수 있는 형태로 남기기 위해, 식수 좌표를 메타데이터에 담은 NFT를 발행·증여하고 ERP 대시보드로 연동했습니다.",
    ],
    architecture: [
      "KIP-17(ERC-721 호환) NFT 스마트 컨트랙트를 Solidity로 구현하고 Truffle로 Klaytn Mainnet에 배포했습니다",
      "식수 좌표 등 메타데이터를 IPFS(Infura)에 저장하고 caver-js로 온체인 발행·증여 트랜잭션을 처리합니다",
      "Express 기반 서버 아키텍처 설계·구현, Redis 캐싱, JWT 인증",
      "한국렌탈 ERP 연동 + NFT 발행/증여 현황 대시보드(Next.js + Recoil)",
    ],
  },

  magicdid: {
    role: "백오피스 웹(인증·차트 시각화)을 개발했습니다",
    background: [
      "HyperLedger Fabric 기반 분산신원증명(DID) 서비스 'MagicDID'의 발급·갱신·폐기 현황을 한눈에 볼 운영 도구가 없었습니다. DID 생애주기 지표를 시각화하는 백오피스를 만들었습니다.",
    ],
    architecture: [
      "LG 모나체인 백오피스를 참고한 웹 인터페이스 설계",
      "DID 발급/갱신/폐기 지표를 ECharts로 시각화하는 차트 데이터 렌더링",
      "JWT 기반 인증(로그인), Redux-Saga 비동기 처리, On-Premise(Ubuntu) 운영",
    ],
  },
};
