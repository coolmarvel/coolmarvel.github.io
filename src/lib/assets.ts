// coolmarvel.github.io 루트 배포로 전환(2026-07-10) — basePath 없음.
// 헬퍼는 호출부 호환과 향후 basePath 재도입 대비로 유지한다.
export const basePath = "";

export const asset = (path: string) => `${basePath}${path}`;
