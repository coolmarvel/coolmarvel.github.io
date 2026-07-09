import type { Metadata } from "next";

import Badge from "@/components/ui/Badge";
import SkillsSection from "@/components/sections/SkillsSection";
import { experiences } from "@/data/experience";
import { CalendarIcon } from "@/icons";

export const metadata: Metadata = {
  title: "경력 | 이성현 포트폴리오",
};

const domainColor = {
  medical: "success" as const,
  blockchain: "primary" as const,
  commerce: "warning" as const,
};

const domainLabel = {
  medical: "의료",
  blockchain: "블록체인",
  commerce: "커머스",
};

export default function ExperiencePage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div>
        <h1 className="text-title-sm font-semibold text-gray-800 dark:text-white/90">
          경력
        </h1>
        <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">
          총 3년 10개월 · 의료 · 커머스 · 블록체인 도메인을 넘나들며 설계부터
          운영까지 담당했습니다.
        </p>
      </div>

      {experiences.map((exp) => (
        <div
          key={exp.company}
          className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-4 dark:border-gray-800 sm:px-6">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                {exp.company}
              </h2>
              <Badge color={domainColor[exp.domain]} size="sm">
                {domainLabel[exp.domain]}
              </Badge>
              {exp.current && (
                <Badge color="success" size="sm" variant="solid">
                  재직중
                </Badge>
              )}
              <span className="text-theme-sm text-gray-500 dark:text-gray-400">
                {exp.team} · {exp.role}
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-theme-sm text-gray-500 dark:text-gray-400">
              <CalendarIcon className="size-4" />
              {exp.period}
              {exp.duration !== "재직중" && ` (${exp.duration})`}
            </span>
          </div>

          <div className="flex flex-col gap-6 p-5 sm:p-6">
            {exp.projects.map((project) => (
              <div
                key={project.name}
                className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-white/[0.02] sm:p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-gray-800 dark:text-white/90">
                    {project.name}
                  </h3>
                  <span className="text-theme-xs text-gray-400">
                    {project.period}
                  </span>
                </div>

                <div className="mt-2 flex flex-col gap-1.5 text-theme-sm text-gray-600 dark:text-gray-300">
                  {project.description.map((d, i) => (
                    <p key={i}>{d}</p>
                  ))}
                </div>

                <p className="mt-4 mb-2 text-theme-xs font-semibold uppercase text-gray-400">
                  상세 업무
                </p>
                <ul className="flex list-outside list-disc flex-col gap-1.5 pl-5 text-theme-sm text-gray-600 dark:text-gray-300">
                  {project.tasks.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-white px-2.5 py-1 text-theme-xs font-medium text-gray-600 shadow-theme-xs dark:bg-white/5 dark:text-gray-400 dark:shadow-none"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div>
        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white/90">
          기술 스택
        </h2>
        <SkillsSection />
      </div>
    </div>
  );
}
