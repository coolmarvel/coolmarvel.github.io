import Link from "next/link";
import type React from "react";

import { ChevronRightIcon } from "@/icons";

/** 섹션 제목 + 오른쪽 링크형 액션 (DESIGN.md §4 "링크형 버튼"). */
export default function SectionTitle({
  title,
  desc,
  href,
  linkLabel,
  as: Tag = "h2",
}: {
  title: React.ReactNode;
  desc?: React.ReactNode;
  href?: string;
  linkLabel?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4 md:mb-6">
      <div>
        <Tag className={Tag === "h1" ? "text-h1-m text-fg md:text-h1" : "text-h2-m text-fg md:text-h2"}>{title}</Tag>
        {desc && <p className="mt-1.5 text-body-sm text-muted md:text-body">{desc}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="press inline-flex shrink-0 items-center gap-0.5 whitespace-nowrap rounded-btn-sm text-[15px] font-semibold text-weak-fg"
        >
          {linkLabel ?? "전체 보기"}
          <ChevronRightIcon className="size-5" />
        </Link>
      )}
    </div>
  );
}
