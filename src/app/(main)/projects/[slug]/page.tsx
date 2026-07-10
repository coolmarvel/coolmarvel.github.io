import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import ScreenshotSlider from "@/components/sections/ScreenshotSlider";
import { projects } from "@/data/projects";
import { projectDetails } from "@/data/projectDetails";
import { CheckIcon, ExternalLinkIcon, BotIcon, ChevronLeftIcon } from "@/icons";

const domainColor = {
  의료: "success" as const,
  커머스: "warning" as const,
  블록체인: "primary" as const,
  AI: "error" as const,
  데스크톱: "info" as const,
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: `${project?.name ?? "프로젝트"} | 이성현 포트폴리오` };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const detail = projectDetails[slug];

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <Link
        href="/projects"
        className="inline-flex w-fit items-center gap-1 text-theme-sm font-medium text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400"
      >
        <ChevronLeftIcon className="size-4" />
        프로젝트 목록으로
      </Link>

      {/* 헤더 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge color={domainColor[project.domain]} size="sm">
            {project.domain}
          </Badge>
          <span className="text-theme-sm text-gray-400">
            {project.company} · {project.period}
          </span>
        </div>
        <h1 className="mt-3 text-title-sm font-semibold text-gray-800 dark:text-white/90">
          {project.name}
        </h1>
        <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">
          {project.oneLiner}
        </p>
        {detail?.role && (
          <p className="mt-4 inline-flex rounded-lg bg-gray-50 px-3 py-2 text-theme-sm text-gray-700 dark:bg-white/[0.03] dark:text-gray-300">
            담당 — {detail.role}
          </p>
        )}
        <div className="mt-5 flex flex-col gap-3 text-theme-sm leading-6 text-gray-600 dark:text-gray-300">
          {project.description.map((d, i) => (
            <p key={i}>{d}</p>
          ))}
        </div>
        {detail?.links && (
          <div className="mt-5 flex flex-wrap gap-3">
            {detail.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-theme-sm font-medium text-white hover:bg-brand-600"
              >
                <ExternalLinkIcon className="size-4" />
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* 라이브 데모 */}
      {detail?.demo && (
        <div className="rounded-2xl border border-brand-100 bg-brand-25 p-5 dark:border-brand-500/20 dark:bg-brand-500/[0.06] md:p-6">
          <h2 className="font-semibold text-gray-800 dark:text-white/90">
            {detail.demo.url ? "라이브 데모" : "접속 안내"}
          </h2>
          <p className="mt-2 text-theme-sm leading-6 text-gray-600 dark:text-gray-300">
            {detail.demo.note}
          </p>
          {detail.demo.url && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href={detail.demo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-theme-sm font-medium text-white hover:bg-brand-600"
              >
                <ExternalLinkIcon className="size-4" />
                {detail.demo.url.replace("https://", "")} 접속
              </a>
              {detail.demo.account && (
                <code className="rounded-lg bg-white px-3 py-2.5 font-mono text-theme-sm text-gray-700 shadow-theme-xs dark:bg-gray-900 dark:text-gray-300">
                  {detail.demo.account}
                </code>
              )}
            </div>
          )}
        </div>
      )}

      {/* 스크린샷 */}
      {detail?.screenshots && detail.screenshots.length > 0 && (
        <Card title="스크린샷" desc="실제 운영/실행 화면을 직접 캡처했습니다.">
          <ScreenshotSlider shots={detail.screenshots} />
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2">
        {detail?.background && (
          <Card title="배경과 문제" className="h-full">
            <div className="flex flex-col gap-3 text-theme-sm leading-6 text-gray-600 dark:text-gray-300">
              {detail.background.map((b, i) => (
                <p key={i}>{b}</p>
              ))}
            </div>
          </Card>
        )}

        <Card title="핵심 성과" className="h-full">
          <ul className="flex flex-col gap-2.5">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 text-theme-sm text-gray-700 dark:text-gray-300"
              >
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-success-500" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {detail?.architecture && (
        <Card title="아키텍처 & 설계 포인트">
          <ul className="flex list-outside list-disc flex-col gap-2.5 pl-5 text-theme-sm leading-6 text-gray-600 dark:text-gray-300">
            {detail.architecture.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </Card>
      )}

      {detail?.aiUsage && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/15">
              <BotIcon className="size-5 text-brand-500 dark:text-brand-400" />
            </div>
            <h2 className="font-semibold text-gray-800 dark:text-white/90">
              AI(Claude Code) 활용
            </h2>
          </div>
          <ul className="mt-4 flex list-outside list-disc flex-col gap-2.5 pl-5 text-theme-sm leading-6 text-gray-600 dark:text-gray-300">
            {detail.aiUsage.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}

      <Card title="기술 스택">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full bg-gray-100 px-2.5 py-1 text-theme-xs font-medium text-gray-600 dark:bg-white/5 dark:text-gray-400"
            >
              {s}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
