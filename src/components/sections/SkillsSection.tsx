import Card from "@/components/ui/Card";
import { skillCategories } from "@/data/skills";
import { ServerIcon, CodeIcon, ChainIcon, BotIcon, GridIcon } from "@/icons";

const iconMap = {
  server: ServerIcon,
  code: CodeIcon,
  chain: ChainIcon,
  db: GridIcon,
  bot: BotIcon,
};

export default function SkillsSection() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:grid-cols-3">
      {skillCategories.map((category) => {
        const Icon = iconMap[category.icon];
        return (
          <Card key={category.title} className="h-full">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/15">
                <Icon className="size-5 text-brand-500 dark:text-brand-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white/90">
                {category.title}
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              {category.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-theme-sm text-gray-700 dark:text-gray-300">
                      {skill.name}
                    </span>
                    <span className="text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className="h-2 rounded-full bg-brand-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
