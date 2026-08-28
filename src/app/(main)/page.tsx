import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import SectionTitle from "@/components/ui/SectionTitle";
import Hero from "@/components/sections/Hero";
import MetricCards from "@/components/sections/MetricCards";
import CareerDuration from "@/components/common/CareerDuration";
import TechStack from "@/components/sections/TechStack";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import ProjectCard from "@/components/sections/ProjectCard";

import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { education, certificates } from "@/data/experience";
import { GraduationIcon, AwardIcon } from "@/icons";

export default function HomePage() {
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="flex flex-col gap-10 md:gap-16">
      <Hero />

      <MetricCards />

      <section>
        <SectionTitle
          title="대표 프로젝트"
          desc="라이브로 운영 중인 서비스부터 병원 그룹웨어, AI 파이프라인까지"
          href="/projects"
          linkLabel={`전체 ${projects.length}개 보기`}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} compact />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card title="소개" className="lg:col-span-3">
          <div className="flex flex-col gap-3 text-body text-body">
            {profile.summary.map((s, i) => (
              <p key={i}>{s}</p>
            ))}
          </div>
        </Card>
        <Card
          title="경력"
          desc={
            <>
              총 <CareerDuration /> · 5개사
            </>
          }
          className="lg:col-span-2"
          action={
            <a href="/experience" className="text-[14px] font-semibold text-weak-fg">
              상세 보기
            </a>
          }
        >
          <ExperienceTimeline compact />
        </Card>
      </section>

      <TechStack />

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="학력 및 교육">
          <ul className="flex flex-col gap-4">
            {education.map((e) => (
              <li key={e.name} className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-inner bg-canvas text-fg dark:bg-surface-hover">
                  <GraduationIcon className="size-5" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[15px] font-semibold text-fg">{e.name}</p>
                    <Chip>{e.type}</Chip>
                  </div>
                  <p className="mt-0.5 text-caption text-muted">{e.period}</p>
                  <p className="mt-1 text-body-sm text-body">{e.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="자격 및 수상">
          <ul className="flex flex-col gap-4">
            {certificates.map((c) => (
              <li key={c.name} className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-inner bg-canvas text-fg dark:bg-surface-hover">
                  <AwardIcon className="size-5" />
                </span>
                <div>
                  <p className="text-[15px] font-semibold text-fg">{c.name}</p>
                  <p className="mt-0.5 text-caption text-muted">
                    {c.year} · {c.org}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}
