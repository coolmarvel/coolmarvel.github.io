"use client";

import { useEffect, useState } from "react";
import { formatCareer } from "@/lib/career";

/**
 * 총 경력 문자열. 빌드 시점 값으로 먼저 렌더링(hydration 일치)한 뒤,
 * 브라우저에서 현재 날짜 기준으로 다시 계산해 정적 배포 후에도 자동 갱신된다.
 */
export default function CareerDuration() {
  const [text, setText] = useState(() => formatCareer());
  useEffect(() => {
    setText(formatCareer());
  }, []);
  return <>{text}</>;
}
