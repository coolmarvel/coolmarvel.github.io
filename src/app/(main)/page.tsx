import Link from "next/link";

import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import ProfileCard from "@/components/sections/ProfileCard";
import MetricCards from "@/components/sections/MetricCards";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import ProjectCard from "@/components/sections/ProjectCard";

import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillBadges } from "@/data/skills";
import { education, certificates } from "@/data/experience";
import { GraduationIcon, AwardIcon } from "@/icons";

export default function DashboardPage() {
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <ProfileCard />
      <MetricCards />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-3">
        <Card title="간략 소개" className="xl:col-span-2">
          <div className="flex flex-col gap-3 text-theme-sm leading-6 text-gray-600 dark:text-gray-300">
            {profile.summary.map((s, i) => (
              <p key={i}>{s}</p>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {skillBadges.map((s) => (
              <span
                key={s}
                className="rounded-full bg-gray-100 px-2.5 py-1 text-theme-xs font-medium text-gray-600 dark:bg-white/5 dark:text-gray-400"
              >
                {s}
              </span>
            ))}
          </div>
        </Card>

        <Card title="경력 타임라인" desc="총 3년 10개월 · 5개사">
          <ExperienceTimeline compact />
          <Link
            href="/experience"
            className="mt-4 inline-flex text-theme-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400"
          >
            경력 상세 보기 →
          </Link>
        </Card>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            대표 프로젝트
          </h2>
          <Link
            href="/projects"
            className="text-theme-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400"
          >
            전체 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2">
        <Card title="학력 및 교육">
          <ul className="flex flex-col gap-4">
            {education.map((e) => (
              <li key={e.name} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                  <GraduationIcon className="size-5 text-gray-800 dark:text-white/90" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-gray-800 dark:text-white/90">
                      {e.name}
                    </p>
                    <Badge color="light" size="sm">
                      {e.type}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-theme-xs text-gray-400">{e.period}</p>
                  <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">
                    {e.detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="자격 및 수상">
          <ul className="flex flex-col gap-4">
            {certificates.map((c) => (
              <li key={c.name} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                  <AwardIcon className="size-5 text-gray-800 dark:text-white/90" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white/90">
                    {c.name}
                  </p>
                  <p className="mt-0.5 text-theme-xs text-gray-400">
                    {c.year} · {c.org}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
