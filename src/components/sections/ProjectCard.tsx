import Link from "next/link";

import Chip, { Tag } from "@/components/ui/Chip";
import { projectDetails } from "@/data/projectDetails";
import type { Project } from "@/data/projects";
import { domainAccent } from "@/lib/domain";
import { ArrowUpRightIcon, CheckIcon, ChevronRightIcon, DownloadIcon, GithubIcon, GlobeIcon } from "@/icons";

export function projectLinks(slug: string) {
  const detail = projectDetails[slug];
  const links = detail?.links ?? [];
  const live = detail?.demo?.url;
  const github = links.find((l) => l.href.includes("github.com") && !l.href.includes("/releases/"))?.href;
  const download = links.find((l) => l.href.includes("/releases/download/"))?.href;
  return { live, github, download, all: links, hasShots: (detail?.screenshots?.length ?? 0) > 0, privateRepo: detail?.privateRepo === true };
}

function iconFor(href: string) {
  if (href.includes("/releases/download/")) return DownloadIcon;
  if (href.includes("github.com")) return GithubIcon;
  return GlobeIcon;
}

/**
 * 프로젝트 카드 — 카드 전체가 상세로 가는 링크이고, 외부 링크(라이브·GitHub·다운로드)는
 * 카드 밖 하단 행에 별도 앵커로 둔다(중첩 앵커 금지·터치 타깃 44px).
 */
export default function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const { live, github, download, hasShots, privateRepo } = projectLinks(project.slug);
  const external = [
    live && { href: live, label: "라이브", Icon: GlobeIcon },
    github && { href: github, label: "GitHub", Icon: GithubIcon },
    download && { href: download, label: "다운로드", Icon: DownloadIcon },
  ].filter(Boolean) as { href: string; label: string; Icon: typeof GlobeIcon }[];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card bg-surface">
      <Link
        href={`/projects/${project.slug}`}
        className="press-card group flex flex-1 flex-col p-5 hover:bg-surface-hover md:p-6"
      >
        <div className="flex flex-wrap items-center gap-1.5">
          <Chip accent={domainAccent[project.domain]}>{project.domain}</Chip>
          {live && <Chip accent="indigo">운영 중</Chip>}
          {hasShots && <Chip>스크린샷</Chip>}
          <span className="ml-auto text-caption text-muted">
            {project.company} · {project.period}
          </span>
        </div>
        <h3 className="mt-3 flex items-start gap-1 text-h3 text-fg">
          <span>{project.name}</span>
          <ChevronRightIcon className="mt-0.5 size-5 shrink-0 text-placeholder transition-colors group-hover:text-body" />
        </h3>
        <p className="mt-1 text-body-sm text-body">{project.oneLiner}</p>

        {!compact && (
          <div className="mt-4 flex flex-col gap-2.5 text-body-sm text-body">
            {project.description.slice(0, 1).map((d, i) => (
              <p key={i}>{d}</p>
            ))}
          </div>
        )}

        <ul className="mt-4 flex flex-col gap-1.5">
          {project.highlights.slice(0, compact ? 2 : 3).map((h) => (
            <li key={h} className="flex items-start gap-2 text-body-sm text-fg">
              <CheckIcon className="mt-[3px] size-4 shrink-0 text-acc-green-fg" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {project.stack.slice(0, compact ? 6 : 9).map((s) => (
            <Tag key={s} onSurface>
              {s}
            </Tag>
          ))}
          {project.stack.length > (compact ? 6 : 9) && (
            <Tag onSurface>+{project.stack.length - (compact ? 6 : 9)}</Tag>
          )}
        </div>
      </Link>

      {(external.length > 0 || privateRepo) && (
        <div className="flex flex-wrap gap-1 border-t border-line/60 px-3 py-2">
          {external.map(({ href, label, Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="press inline-flex h-9 items-center gap-1.5 rounded-btn-sm px-2.5 text-[13.5px] font-semibold text-weak-fg hover:bg-weak"
            >
              <Icon className="size-4" />
              {label}
              <ArrowUpRightIcon className="size-3.5 opacity-70" />
            </a>
          ))}
          {privateRepo && <PrivateRepoLabel />}
        </div>
      )}
    </article>
  );
}

/** 비공개 저장소 표시 — 링크가 아니라 라벨(클릭 없음, 화살표 없음). 404 로 가는 버튼 대신 사실만 적는다. */
export function PrivateRepoLabel({ className = "" }: { className?: string }) {
  return (
    <span
      title="저장소는 비공개입니다"
      aria-disabled="true"
      className={`inline-flex h-9 cursor-default select-none items-center gap-1.5 rounded-btn-sm px-2.5 text-[13.5px] font-semibold text-muted ${className}`}
    >
      <GithubIcon className="size-4" />
      GitHub 저장소 (비공개)
    </span>
  );
}

export { iconFor };
