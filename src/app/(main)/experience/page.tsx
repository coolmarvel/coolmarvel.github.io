import type { Metadata } from "next";

import Chip, { Tag } from "@/components/ui/Chip";
import SectionTitle from "@/components/ui/SectionTitle";
import SkillsSection from "@/components/sections/SkillsSection";
import CareerDuration from "@/components/common/CareerDuration";
import { experiences } from "@/data/experience";
import { experienceDomainAccent, experienceDomainLabel } from "@/lib/domain";
import { CalendarIcon } from "@/icons";

export const metadata: Metadata = {
  title: "경력",
  description: "씨엠병원 · 파라메타 · 앳홈트립 · 위메이드 · 드림시큐리티 — 의료·커머스·블록체인 도메인의 경력과 상세 업무.",
};

export default function ExperiencePage() {
  return (
    <div className="flex flex-col gap-10 md:gap-14">
      <SectionTitle
        as="h1"
        title="경력"
        desc={
          <>
            총 <CareerDuration /> · 의료 · 커머스 · 블록체인 도메인을 넘나들며 설계부터 운영까지 담당했습니다.
          </>
        }
      />

      <div className="flex flex-col gap-6">
        {experiences.map((exp) => (
          <section key={exp.company} className="rounded-card bg-surface p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-h2-m text-fg md:text-h2">{exp.company}</h2>
                <Chip accent={experienceDomainAccent[exp.domain]}>{experienceDomainLabel[exp.domain]}</Chip>
                {exp.current && <Chip accent="green">재직중</Chip>}
              </div>
              <span className="inline-flex items-center gap-1.5 text-caption text-muted">
                <CalendarIcon className="size-4" />
                {exp.period}
                {exp.duration !== "재직중" && ` (${exp.duration})`}
              </span>
            </div>
            <p className="mt-1 text-body-sm text-body">
              {exp.team} · {exp.role}
            </p>

            <div className="mt-5 flex flex-col gap-4">
              {exp.projects.map((project) => (
                <article key={project.name} className="rounded-image bg-canvas p-5 ring-1 ring-line dark:bg-surface-2 dark:ring-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-h3 text-fg">{project.name}</h3>
                    <span className="tabular text-caption text-muted">{project.period}</span>
                  </div>
                  <div className="mt-2 flex flex-col gap-1.5 text-body-sm text-body">
                    {project.description.map((d, i) => (
                      <p key={i}>{d}</p>
                    ))}
                  </div>
                  <p className="mt-4 mb-2 text-label text-muted">상세 업무</p>
                  <ul className="flex list-outside list-disc flex-col gap-1.5 pl-5 text-body-sm text-body marker:text-placeholder">
                    {project.tasks.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section>
        <SectionTitle title="숙련도" desc="카테고리별 상대 숙련도 — 실무 투입 빈도와 깊이를 기준으로 한 자기 평가입니다." />
        <SkillsSection />
      </section>
    </div>
  );
}
