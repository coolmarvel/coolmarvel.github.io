import Card from "@/components/ui/Card";
import { skillCategories } from "@/data/skills";
import { ServerIcon, CodeIcon, ChainIcon, BotIcon, GridIcon } from "@/icons";

const iconMap = { server: ServerIcon, code: CodeIcon, chain: ChainIcon, db: GridIcon, bot: BotIcon };

/** 숙련도 게이지 — DESIGN.md §4 Gauge */
export default function SkillsSection() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {skillCategories.map((category) => {
        const Icon = iconMap[category.icon];
        return (
          <Card key={category.title} className="h-full">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-inner bg-weak text-weak-fg">
                <Icon className="size-5" />
              </span>
              <h3 className="text-h3 text-fg">{category.title}</h3>
            </div>
            <ul className="flex flex-col gap-3.5">
              {category.skills.map((skill) => (
                <li key={skill.name}>
                  <div className="mb-1.5 flex items-center justify-between gap-3">
                    <span className="text-body-sm text-fg">{skill.name}</span>
                    <span className="tabular text-caption text-muted">{skill.level}%</span>
                  </div>
                  <div
                    className="h-2 w-full overflow-hidden rounded-chip bg-surface-hover"
                    role="progressbar"
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={skill.name}
                  >
                    <div className="h-full rounded-chip bg-primary" style={{ width: `${skill.level}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        );
      })}
    </div>
  );
}
