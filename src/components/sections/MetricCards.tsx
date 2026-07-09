import Link from "next/link";

import Badge from "@/components/ui/Badge";
import { profile } from "@/data/profile";
import { BriefcaseIcon, FolderIcon, BotIcon, GridIcon } from "@/icons";

const icons = [BriefcaseIcon, GridIcon, FolderIcon, BotIcon];

export default function MetricCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
      {profile.highlights.map((item, i) => {
        const Icon = icons[i % icons.length];
        return (
          <Link
            key={item.label}
            href={item.href}
            className="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-brand-300 hover:shadow-theme-md dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-brand-500/40 md:p-6"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                <Icon className="size-6 text-gray-800 dark:text-white/90" />
              </div>
              <Badge color="primary" size="sm">
                {item.badge}
              </Badge>
            </div>
            <div className="mt-5">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {item.label}
              </span>
              <h4 className="mt-2 text-2xl font-bold text-gray-800 group-hover:text-brand-600 dark:text-white/90 dark:group-hover:text-brand-400">
                {item.value}
              </h4>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
