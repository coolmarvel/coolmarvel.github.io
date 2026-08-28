"use client";

import { useState } from "react";

import ProjectCard from "@/components/sections/ProjectCard";
import type { Project } from "@/data/projects";

const ALL = "전체";

/**
 * 소속별 필터 — 탭 순서는 데이터 순서(개인 프로젝트가 먼저)를 그대로 따른다.
 * DESIGN.md §4 Filter tab: 선택 = inverse 배경, 좁은 폭에서는 가로 스크롤 스트립.
 */
export default function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const companies = Array.from(new Set(projects.map((p) => p.company)));
  const [selected, setSelected] = useState(ALL);

  const filtered = selected === ALL ? projects : projects.filter((p) => p.company === selected);

  return (
    <>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:-mx-6 md:px-6" role="tablist" aria-label="소속별 필터">
        {[ALL, ...companies].map((tab) => {
          const count = tab === ALL ? projects.length : projects.filter((p) => p.company === tab).length;
          const active = selected === tab;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelected(tab)}
              className={`press inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-chip px-3.5 text-[14px] font-semibold ${
                active ? "bg-inverse text-on-inverse" : "bg-surface text-body hover:bg-surface-hover"
              }`}
            >
              {tab}
              <span className={`tabular text-caption ${active ? "text-on-inverse/70" : "text-muted"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </>
  );
}
