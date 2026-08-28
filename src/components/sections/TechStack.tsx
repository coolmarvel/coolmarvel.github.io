import Card from "@/components/ui/Card";
import TechIcon from "@/components/ui/TechIcon";
import { techGroups } from "@/data/techStack";

export default function TechStack() {
  const total = techGroups.reduce((n, g) => n + g.items.length, 0);

  return (
    <Card title="기술 스택" desc={`실무에서 쓰는 언어 · 프레임워크 · 데이터베이스 · 인프라 ${total}종`}>
      <div className="flex flex-col gap-5">
        {techGroups.map((group) => (
          <div key={group.title} className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-[160px_1fr]">
            <div className="flex items-baseline gap-2 md:flex-col md:gap-0">
              <p className="text-[15px] font-semibold text-fg">{group.title}</p>
              <p className="text-caption text-muted">{group.caption}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item.name}
                  className="inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-btn-sm bg-canvas px-2.5 text-[13px] font-semibold text-fg dark:bg-surface-hover"
                >
                  <TechIcon name={item.icon} className="size-4" />
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
