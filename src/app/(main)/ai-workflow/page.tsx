import type { Metadata } from "next";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import {
  aiPhilosophy,
  aiPillars,
  aiMatrix,
  aiAsProduct,
} from "@/data/aiWorkflow";
import { BotIcon } from "@/icons";

export const metadata: Metadata = {
  title: "AI 워크플로우 | 이성현 포트폴리오",
};

const pillarColors = {
  brand: {
    bg: "bg-brand-50 dark:bg-brand-500/15",
    text: "text-brand-500 dark:text-brand-400",
    bar: "bg-brand-500",
  },
  success: {
    bg: "bg-success-50 dark:bg-success-500/15",
    text: "text-success-600 dark:text-success-500",
    bar: "bg-success-500",
  },
  warning: {
    bg: "bg-warning-50 dark:bg-warning-500/15",
    text: "text-warning-600 dark:text-orange-400",
    bar: "bg-warning-500",
  },
  error: {
    bg: "bg-error-50 dark:bg-error-500/15",
    text: "text-error-600 dark:text-error-500",
    bar: "bg-error-500",
  },
};

export default function AiWorkflowPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] md:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/15">
            <BotIcon className="size-6 text-brand-500 dark:text-brand-400" />
          </div>
          <div>
            <h1 className="text-title-sm font-semibold text-gray-800 dark:text-white/90">
              {aiPhilosophy.title}
            </h1>
            <p className="text-theme-sm text-gray-500 dark:text-gray-400">
              {aiPhilosophy.subtitle}
            </p>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-3 text-theme-sm leading-6 text-gray-600 dark:text-gray-300">
          {aiPhilosophy.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {aiPillars.map((pillar) => {
          const c = pillarColors[pillar.color];
          return (
            <div
              key={pillar.title}
              className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
            >
              <div className={`h-1.5 w-12 rounded-full ${c.bar}`} />
              <h2 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white/90">
                {pillar.title}
              </h2>
              <p className="mt-2 text-theme-sm leading-6 text-gray-600 dark:text-gray-300">
                {pillar.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {pillar.items.map((item) => (
                  <span
                    key={item}
                    className={`rounded-full px-2.5 py-1 text-theme-xs font-medium ${c.bg} ${c.text}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Card
        title={aiAsProduct.title}
        desc="voice_server ↔ AI 서버 ↔ 그룹웨어 3-시스템 협업"
      >
        <p className="text-theme-sm leading-6 text-gray-600 dark:text-gray-300">
          {aiAsProduct.description}
        </p>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {aiAsProduct.flow.map((f, i) => (
            <div
              key={f.step}
              className="relative rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-white/[0.02]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-theme-xs font-semibold text-white">
                {f.step}
              </span>
              <p className="mt-3 font-medium text-gray-800 dark:text-white/90">
                {f.label}
              </p>
              <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
                {f.detail}
              </p>
              {i < aiAsProduct.flow.length - 1 && (
                <span className="absolute -right-2.5 top-1/2 hidden -translate-y-1/2 text-gray-300 dark:text-gray-700 lg:block">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card
        title="프로젝트별 AI 하네스 적용 현황"
        desc="하나의 방법론을 서로 다른 4개 스택에 일관 적용"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="py-3 pr-4 text-theme-xs font-medium uppercase text-gray-400">
                  항목
                </th>
                {aiMatrix.columns.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    <Badge color="light" size="sm">
                      {col}
                    </Badge>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {aiMatrix.rows.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-gray-100 last:border-0 dark:border-gray-800"
                >
                  <td className="py-3 pr-4 text-theme-sm font-medium text-gray-700 dark:text-gray-300">
                    {row.label}
                  </td>
                  {row.values.map((v, i) => (
                    <td
                      key={i}
                      className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-400"
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
