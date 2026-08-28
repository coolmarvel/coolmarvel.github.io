import Link from "next/link";

import Chip from "@/components/ui/Chip";
import CareerDuration from "@/components/common/CareerDuration";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { ChevronRightIcon } from "@/icons";

/** 핵심 지표 4종 — DESIGN.md §4 Metric tile */
export default function MetricCards() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
      {profile.highlights.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="press-card group flex flex-col justify-between rounded-card bg-surface p-5 hover:bg-surface-hover"
        >
          <div className="flex items-center justify-between">
            <span className="text-body-sm text-muted">{item.label}</span>
            <ChevronRightIcon className="size-5 text-placeholder transition-colors group-hover:text-body" />
          </div>
          <p className="tabular mt-3 text-number text-fg">
            {item.value === "auto" ? <CareerDuration /> : item.value === "projects" ? `${projects.length}개` : item.value}
          </p>
          <div className="mt-3">
            <Chip accent={item.label === "총 경력" ? "green" : "blue"}>{item.badge}</Chip>
          </div>
        </Link>
      ))}
    </div>
  );
}
