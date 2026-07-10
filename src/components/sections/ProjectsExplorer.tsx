"use client";

import { useState } from "react";

import ProjectCard from "@/components/sections/ProjectCard";
import type { Project } from "@/data/projects";

const ALL = "전체";

export default function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const companies = Array.from(new Set(projects.map((p) => p.company)));
  const [selected, setSelected] = useState(ALL);

  const filtered =
    selected === ALL ? projects : projects.filter((p) => p.company === selected);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {[ALL, ...companies].map((tab) => {
          const count =
            tab === ALL
              ? projects.length
              : projects.filter((p) => p.company === tab).length;
          const active = selected === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setSelected(tab)}
              className={`rounded-full px-3.5 py-1.5 text-theme-sm font-medium transition ${
                active
                  ? "bg-brand-500 text-white shadow-theme-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10"
              }`}
            >
              {tab}
              <span
                className={`ml-1.5 text-theme-xs ${
                  active ? "text-white/70" : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </>
  );
}
