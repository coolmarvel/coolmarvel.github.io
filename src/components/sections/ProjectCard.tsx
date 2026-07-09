import Link from "next/link";

import Badge from "@/components/ui/Badge";
import { projectDetails } from "@/data/projectDetails";
import type { Project } from "@/data/projects";
import { CheckIcon } from "@/icons";

const domainColor: Record<Project["domain"], "success" | "warning" | "primary" | "error" | "info"> = {
  의료: "success",
  커머스: "warning",
  블록체인: "primary",
  AI: "error",
  데스크톱: "info",
};

export default function ProjectCard({ project }: { project: Project }) {
  const hasShots = (projectDetails[project.slug]?.screenshots?.length ?? 0) > 0;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-brand-300 hover:shadow-theme-md dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-brand-500/40 md:p-6"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge color={domainColor[project.domain]} size="sm">
          {project.domain}
        </Badge>
        {hasShots && (
          <Badge color="light" size="sm">
            스크린샷
          </Badge>
        )}
        <span className="text-theme-xs text-gray-400">
          {project.company} · {project.period}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-gray-800 group-hover:text-brand-600 dark:text-white/90 dark:group-hover:text-brand-400">
        {project.name}
      </h3>
      <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">
        {project.oneLiner}
      </p>

      <div className="mt-4 flex flex-col gap-3 text-theme-sm text-gray-600 dark:text-gray-300">
        {project.description.map((d, i) => (
          <p key={i}>{d}</p>
        ))}
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {project.highlights.map((h) => (
          <li
            key={h}
            className="flex items-start gap-2 text-theme-sm text-gray-700 dark:text-gray-300"
          >
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-success-500" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-5">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full bg-gray-100 px-2.5 py-1 text-theme-xs font-medium text-gray-600 dark:bg-white/5 dark:text-gray-400"
            >
              {s}
            </span>
          ))}
        </div>
        <p className="mt-4 text-theme-sm font-medium text-brand-500 opacity-0 transition group-hover:opacity-100 dark:text-brand-400">
          상세 보기 →
        </p>
      </div>
    </Link>
  );
}
