import Chip from "@/components/ui/Chip";
import { experiences } from "@/data/experience";
import { experienceDomainAccent, experienceDomainLabel } from "@/lib/domain";

/** 경력 타임라인 — DESIGN.md §4 Timeline */
export default function ExperienceTimeline({ compact = false }: { compact?: boolean }) {
  return (
    <ol className="relative ml-1.5 border-l-2 border-line">
      {experiences.map((exp) => (
        <li key={exp.company} className="relative mb-6 pl-5 last:mb-0">
          <span
            aria-hidden="true"
            className={`absolute -left-[7px] top-1.5 size-3 rounded-full ring-4 ring-canvas ${
              exp.current ? "bg-primary" : "bg-line"
            }`}
          />
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[16px] font-semibold text-fg">{exp.company}</h3>
            <Chip accent={experienceDomainAccent[exp.domain]}>{experienceDomainLabel[exp.domain]}</Chip>
            {exp.current && <Chip accent="green">재직중</Chip>}
          </div>
          <p className="mt-0.5 text-caption text-muted">
            {exp.team} · {exp.role} · {exp.period}
            {exp.duration !== "재직중" && ` (${exp.duration})`}
          </p>
          {!compact && (
            <ul className="mt-2 flex flex-col gap-1 text-body-sm text-body">
              {exp.projects.map((p) => (
                <li key={p.name}>· {p.name}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
