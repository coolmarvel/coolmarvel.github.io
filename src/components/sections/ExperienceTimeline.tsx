import Badge from "@/components/ui/Badge";
import { experiences } from "@/data/experience";

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

export default function ExperienceTimeline({ compact = false }: { compact?: boolean }) {
  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-800">
      {experiences.map((exp) => (
        <li key={exp.company} className="mb-8 ml-5 last:mb-0">
          <span
            className={`absolute -left-[7px] mt-1.5 flex h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-900 ${
              exp.current ? "bg-brand-500" : "bg-gray-300 dark:bg-gray-700"
            }`}
          />
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-gray-800 dark:text-white/90">
              {exp.company}
            </h3>
            <Badge color={domainColor[exp.domain]} size="sm">
              {domainLabel[exp.domain]}
            </Badge>
            {exp.current && (
              <Badge color="success" size="sm" variant="solid">
                재직중
              </Badge>
            )}
          </div>
          <p className="mt-0.5 text-theme-sm text-gray-500 dark:text-gray-400">
            {exp.team} · {exp.role} · {exp.period}
            {exp.duration !== "재직중" && ` (${exp.duration})`}
          </p>
          {!compact && (
            <ul className="mt-2 list-inside list-disc text-theme-sm text-gray-600 dark:text-gray-300">
              {exp.projects.map((p) => (
                <li key={p.name}>{p.name}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
