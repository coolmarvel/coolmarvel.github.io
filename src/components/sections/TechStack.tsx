import Card from "@/components/ui/Card";
import TechIcon from "@/components/ui/TechIcon";
import { techGroups } from "@/data/techStack";

export default function TechStack() {
  const total = techGroups.reduce((n, g) => n + g.items.length, 0);

  return (
    <Card title="기술 스택" desc={`실무에서 사용하는 언어 · 프레임워크 · 데이터베이스 · 인프라 ${total}종`}>
      <div className="flex flex-col gap-5">
        {techGroups.map((group) => (
          <div
            key={group.title}
            className="grid grid-cols-1 gap-x-6 gap-y-2.5 md:grid-cols-[168px_1fr]"
          >
            <div className="flex items-baseline gap-2 md:flex-col md:gap-0.5">
              <p
                className={
                  group.emphasis
                    ? "font-semibold text-gray-800 dark:text-white/90"
                    : "font-medium text-gray-700 dark:text-gray-300"
                }
              >
                {group.title}
              </p>
              <p className="text-theme-xs text-gray-400">{group.caption}</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item.name}
                  className={
                    // 언어 그룹은 흰 배경 + 테두리로 한 단계 올려, 프레임워크 칩과 구별되게 한다.
                    group.emphasis
                      ? "inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-theme-xs font-semibold text-gray-800 shadow-theme-xs dark:border-gray-700 dark:bg-white/[0.06] dark:text-white/90"
                      : "inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5 text-theme-xs font-medium text-gray-600 dark:bg-white/[0.04] dark:text-gray-300"
                  }
                >
                  <TechIcon
                    name={item.icon}
                    className={group.emphasis ? "size-4" : "size-3.5"}
                  />
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
