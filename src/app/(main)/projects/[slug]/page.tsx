import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Chip, { Tag } from "@/components/ui/Chip";
import ScreenshotSlider from "@/components/sections/ScreenshotSlider";
import { projects } from "@/data/projects";
import { projectDetails, type ProjectSection } from "@/data/projectDetails";
import { domainAccent } from "@/lib/domain";
import {
  ArrowUpRightIcon,
  BotIcon,
  CardIcon,
  CheckIcon,
  ChevronLeftIcon,
  CloudIcon,
  DownloadIcon,
  GithubIcon,
  GlobeIcon,
  LayersIcon,
  SearchIcon,
  ShieldIcon,
  SparkIcon,
} from "@/icons";

const sectionIcons: Record<NonNullable<ProjectSection["icon"]>, typeof ShieldIcon> = {
  shield: ShieldIcon,
  card: CardIcon,
  search: SearchIcon,
  cloud: CloudIcon,
  layers: LayersIcon,
  spark: SparkIcon,
};

function linkIcon(href: string) {
  if (href.includes("/releases/download/")) return DownloadIcon;
  if (href.includes("github.com")) return GithubIcon;
  return GlobeIcon;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const detail = projectDetails[slug];
  const image = detail?.screenshots?.[0]?.src;
  return {
    title: project?.name ?? "프로젝트",
    description: project?.oneLiner,
    openGraph: image ? { images: [{ url: image }] } : undefined,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const detail = projectDetails[slug];
  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[index - 1];
  const next = projects[index + 1];

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <Link
        href="/projects"
        className="press inline-flex w-fit items-center gap-0.5 rounded-btn-sm text-[14px] font-semibold text-muted hover:text-fg"
      >
        <ChevronLeftIcon className="size-4" />
        프로젝트 목록
      </Link>

      {/* 헤더 */}
      <header>
        <div className="flex flex-wrap items-center gap-1.5">
          <Chip accent={domainAccent[project.domain]}>{project.domain}</Chip>
          {detail?.demo?.url && <Chip accent="indigo">운영 중</Chip>}
          <span className="text-caption text-muted">
            {project.company} · {project.period}
          </span>
        </div>
        <h1 className="mt-3 text-h1-m text-fg md:text-h1">{project.name}</h1>
        <p className="mt-2 text-body text-body md:text-[16px]">{project.oneLiner}</p>
        {detail?.role && <p className="mt-3 text-body-sm text-muted">담당 — {detail.role}</p>}
        <div className="mt-5 flex flex-col gap-3 text-body text-body">
          {project.description.map((d, i) => (
            <p key={i}>{d}</p>
          ))}
        </div>
        {detail?.links && (
          <div className="mt-6 flex flex-wrap gap-2">
            {detail.links.map((link, i) => {
              const Icon = linkIcon(link.href);
              return (
                <Button key={link.href} href={link.href} variant={i === 0 && !detail.demo?.url ? "primary" : "weak"} size="sm">
                  <Icon className="size-4" />
                  {link.label}
                  <ArrowUpRightIcon className="size-3.5 opacity-70" />
                </Button>
              );
            })}
          </div>
        )}
      </header>

      {/* 라이브 데모 */}
      {detail?.demo && (
        <section className="rounded-card bg-weak p-5 md:p-6">
          <h2 className="text-h3 text-fg">{detail.demo.url ? "직접 사용해보기" : "접속 안내"}</h2>
          <p className="mt-2 text-body-sm text-body md:text-body">{detail.demo.note}</p>
          {detail.demo.url && (
            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <Button href={detail.demo.url} size="md" className="w-full sm:w-auto">
                <GlobeIcon className="size-5" />
                {detail.demo.url.replace("https://", "")} 접속
              </Button>
              {detail.demo.account && (
                <code className="inline-flex h-11 items-center rounded-btn bg-canvas px-4 font-mono text-[13px] text-fg">
                  {detail.demo.account}
                </code>
              )}
            </div>
          )}
        </section>
      )}

      {/* 스크린샷 */}
      {detail?.screenshots && detail.screenshots.length > 0 && (
        <Card title="스크린샷" desc={`실제 화면을 직접 캡처했습니다 · ${detail.screenshots.length}장`}>
          <ScreenshotSlider shots={detail.screenshots} />
        </Card>
      )}

      {/* 이용 방법 */}
      {detail?.usage && (
        <Card title="이렇게 사용합니다">
          <ol className="flex flex-col gap-3">
            {detail.usage.map((u, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="tabular flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-on-primary">
                  {i + 1}
                </span>
                <p className="pt-0.5 text-body-sm text-body md:text-body">{u}</p>
              </li>
            ))}
          </ol>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {detail?.background && (
          <Card title="배경과 문제" className="h-full">
            <div className="flex flex-col gap-3 text-body-sm text-body md:text-body">
              {detail.background.map((b, i) => (
                <p key={i}>{b}</p>
              ))}
            </div>
          </Card>
        )}
        <Card title="핵심 성과" className="h-full">
          <ul className="flex flex-col gap-2.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-body-sm text-fg md:text-body">
                <CheckIcon className="mt-1 size-4 shrink-0 text-acc-green-fg" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {detail?.architecture && (
        <Card title="아키텍처 & 설계 포인트">
          <ul className="flex list-outside list-disc flex-col gap-2.5 pl-5 text-body-sm text-body marker:text-placeholder md:text-body">
            {detail.architecture.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </Card>
      )}

      {detail?.sections?.map((section) => {
        const Icon = section.icon ? sectionIcons[section.icon] : LayersIcon;
        return (
          <Card
            key={section.title}
            title={
              <span className="inline-flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-inner bg-weak text-weak-fg">
                  <Icon className="size-5" />
                </span>
                {section.title}
              </span>
            }
            desc={section.intro}
          >
            <ul className="flex list-outside list-disc flex-col gap-2.5 pl-5 text-body-sm text-body marker:text-placeholder md:text-body">
              {section.items.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </Card>
        );
      })}

      {detail?.aiUsage && (
        <Card
          title={
            <span className="inline-flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-inner bg-acc-purple-bg text-acc-purple-fg">
                <BotIcon className="size-5" />
              </span>
              AI(Claude Code) 활용
            </span>
          }
        >
          <ul className="flex list-outside list-disc flex-col gap-2.5 pl-5 text-body-sm text-body marker:text-placeholder md:text-body">
            {detail.aiUsage.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </Card>
      )}

      <Card title="기술 스택">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Tag key={s} onSurface>
              {s}
            </Tag>
          ))}
        </div>
      </Card>

      <nav className="grid grid-cols-1 gap-3 sm:grid-cols-2" aria-label="이전·다음 프로젝트">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="press-card rounded-card bg-surface p-4 hover:bg-surface-hover">
            <span className="text-caption text-muted">이전</span>
            <p className="mt-1 line-clamp-1 text-[15px] font-semibold text-fg">{prev.name}</p>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/projects/${next.slug}`} className="press-card rounded-card bg-surface p-4 text-right hover:bg-surface-hover">
            <span className="text-caption text-muted">다음</span>
            <p className="mt-1 line-clamp-1 text-[15px] font-semibold text-fg">{next.name}</p>
          </Link>
        )}
      </nav>
    </div>
  );
}
