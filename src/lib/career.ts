/** 경력 시작 시점 — 첫 입사(㈜드림시큐리티) 2022년 5월. 총 경력은 이 시점부터 현재까지 연속 계산한다. */
export const CAREER_START = { year: 2022, month: 5 };

/** 시작 월부터 기준일까지의 개월 수 (시작 월·현재 월 차이, 예: 2022.05 → 2026.08 = 51개월) */
export function careerMonths(now: Date = new Date()): number {
  return (
    (now.getFullYear() - CAREER_START.year) * 12 +
    (now.getMonth() + 1 - CAREER_START.month)
  );
}

/** "4년 3개월" 형식. 개월이 0이면 "4년". */
export function formatCareer(now: Date = new Date()): string {
  const total = Math.max(0, careerMonths(now));
  const y = Math.floor(total / 12);
  const m = total % 12;
  if (y === 0) return `${m}개월`;
  return m === 0 ? `${y}년` : `${y}년 ${m}개월`;
}
