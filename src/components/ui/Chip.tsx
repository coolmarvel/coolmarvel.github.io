import type React from "react";

export type Accent = "blue" | "green" | "orange" | "purple" | "teal" | "indigo" | "neutral";

const accents: Record<Accent, string> = {
  blue: "bg-acc-blue-bg text-acc-blue-fg",
  green: "bg-acc-green-bg text-acc-green-fg",
  orange: "bg-acc-orange-bg text-acc-orange-fg",
  purple: "bg-acc-purple-bg text-acc-purple-fg",
  teal: "bg-acc-teal-bg text-acc-teal-fg",
  indigo: "bg-acc-indigo-bg text-acc-indigo-fg",
  neutral: "bg-surface text-body",
};

/** DESIGN.md §4 Chip — 상태·카테고리 라벨. 액션 아님. */
export default function Chip({
  accent = "neutral",
  className = "",
  children,
}: {
  accent?: Accent;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex h-6 shrink-0 items-center whitespace-nowrap rounded-chip px-2 text-chip ${accents[accent]} ${className}`}
    >
      {children}
    </span>
  );
}

/** 스택 태그 — 카드 안(surface 위)에서는 흰 칩, 캔버스 위에서는 surface 칩. */
export function Tag({ children, onSurface = false }: { children: React.ReactNode; onSurface?: boolean }) {
  return (
    <span
      className={`inline-flex h-6 items-center whitespace-nowrap rounded-chip px-2 text-chip font-medium ${
        onSurface ? "bg-canvas text-body dark:bg-surface-hover" : "bg-surface text-body"
      }`}
    >
      {children}
    </span>
  );
}
