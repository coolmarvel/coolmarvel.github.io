import type { ProjectLink } from "@/data/projectDetails";

/** 설치 파일 링크 — GitHub 릴리스 자산이거나 인스톨러 확장자로 끝나는 주소(자체 배포 서버 포함) */
export function isDownload(href: string) {
  return href.includes("/releases/download/") || /\.(exe|dmg|msi|zip)$/i.test(href);
}

export function isRepo(href: string) {
  return href.includes("github.com") && !href.includes("/releases/");
}

const isWindows = (l: ProjectLink) => /\.(exe|msi)$/i.test(l.href) || /windows/i.test(l.label);
const isMac = (l: ProjectLink) => /\.dmg$/i.test(l.href) || /macos/i.test(l.label);
const isIntelMac = (l: ProjectLink) => /x64|intel/i.test(l.href + l.label);

/**
 * 링크 표시 순서(사용자 규칙 2026-10-08) — 저장소가 있으면 맨 왼쪽, 그다음 설치 파일(Windows → macOS Intel → macOS Apple Silicon),
 * 그 밖의 다운로드(PDF 등), 마지막으로 접속 링크. 같은 등급 안에서는 데이터 순서를 유지한다(stable sort).
 */
export function linkRank(l: ProjectLink) {
  if (isRepo(l.href)) return 0;
  if (isWindows(l)) return 1;
  if (isMac(l)) return isIntelMac(l) ? 2 : 3;
  if (isDownload(l.href)) return 4;
  return 5;
}

export function sortLinks(links: ProjectLink[] | undefined) {
  return [...(links ?? [])].sort((a, b) => linkRank(a) - linkRank(b));
}
