import type { Metadata } from "next";

import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import SectionTitle from "@/components/ui/SectionTitle";
import { aiPhilosophy, aiPillars, aiMatrix, aiAsProduct } from "@/data/aiWorkflow";
import { BotIcon, ChevronRightIcon } from "@/icons";

export const metadata: Metadata = {
  title: "AI 워크플로우",
  description: "Claude Code · MCP · hooks · ADR · oh-my-design — AI가 일하는 하네스를 9개 프로젝트에 일관되게 적용한 방법.",
};

const barColor = {
  blue: "bg-acc-blue-fg",
  green: "bg-acc-green-fg",
  orange: "bg-acc-orange-fg",
  purple: "bg-acc-purple-fg",
  teal: "bg-acc-teal-fg",
  indigo: "bg-acc-indigo-fg",
  neutral: "bg-muted",
} as const;

export default function AiWorkflowPage() {
  return (
    <div className="flex flex-col gap-10 md:gap-14">
      <header className="max-w-[760px]">
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-inner bg-acc-purple-bg text-acc-purple-fg">
            <BotIcon className="size-6" />
          </span>
          <div>
            <h1 className="text-h1-m text-fg md:text-h1">{aiPhilosophy.title}</h1>
            <p className="mt-0.5 text-body-sm text-muted md:text-body">{aiPhilosophy.subtitle}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 text-body text-body md:text-[16px]">
          {aiPhilosophy.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </header>

      <section>
        <SectionTitle title="하네스의 여섯 축" desc="제약 → 검증 → 컨텍스트 → 기록 → 디자인 → 발사대" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {aiPillars.map((pillar) => (
            <Card key={pillar.title} className="h-full">
              <div className={`h-1.5 w-10 rounded-chip ${barColor[pillar.accent]}`} />
              <h3 className="mt-4 text-h3 text-fg">{pillar.title}</h3>
              <p className="mt-2 text-body-sm text-body">{pillar.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {pillar.items.map((item) => (
                  <Chip key={item} accent={pillar.accent}>
                    {item}
                  </Chip>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Card title={aiAsProduct.title} desc="voice_server ↔ AI 서버 ↔ 그룹웨어 3-시스템 협업">
        <p className="text-body-sm text-body md:text-body">{aiAsProduct.description}</p>
        <ol className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {aiAsProduct.flow.map((f, i) => (
            <li key={f.step} className="relative rounded-image bg-canvas p-4 dark:bg-surface-2">
              <span className="tabular flex size-7 items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-on-primary">
                {f.step}
              </span>
              <p className="mt-3 text-[15px] font-semibold text-fg">{f.label}</p>
              <p className="mt-1 text-caption text-muted">{f.detail}</p>
              {i < aiAsProduct.flow.length - 1 && (
                <ChevronRightIcon className="absolute -right-3 top-1/2 hidden size-5 -translate-y-1/2 text-placeholder lg:block" />
              )}
            </li>
          ))}
        </ol>
      </Card>

      <Card
        title="프로젝트별 하네스 적용 현황"
        desc={`하나의 방법론을 서로 다른 ${aiMatrix.columns.length}개 프로젝트에 일관 적용 (스택 무관)`}
      >
        <div className="thin-scrollbar -mx-5 overflow-x-auto px-5 md:-mx-6 md:px-6">
          <table className="w-full min-w-[1080px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="sticky left-0 z-10 whitespace-nowrap bg-surface py-3 pr-4 text-label text-muted">항목</th>
                {aiMatrix.columns.map((col) => (
                  <th key={col} className="px-3 py-3 align-bottom">
                    <Chip>{col}</Chip>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {aiMatrix.rows.map((row) => (
                <tr key={row.label} className="border-b border-line last:border-0">
                  <td className="sticky left-0 z-10 whitespace-nowrap bg-surface py-3 pr-6 text-body-sm font-semibold text-fg">{row.label}</td>
                  {row.values.map((v, i) => (
                    <td key={i} className="min-w-[150px] px-3 py-3 align-top text-body-sm text-body">
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
