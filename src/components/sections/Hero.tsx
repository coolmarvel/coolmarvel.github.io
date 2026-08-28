import Button from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";
import { profile, currentPosition } from "@/data/profile";
import { asset } from "@/lib/assets";
import { DownloadIcon, GithubIcon, MailIcon, PinIcon } from "@/icons";

/** 홈 히어로 — 주장 한 문장 + CTA 2개 + 프로필 (DESIGN.md §5 홈 순서) */
export default function Hero() {
  const lines = profile.headline.split("\n");
  return (
    <section className="flex flex-col-reverse items-start gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
      <div className="max-w-[640px]">
        <div className="flex flex-wrap items-center gap-2">
          <Chip accent="green">{currentPosition.company} 재직중</Chip>
          <span className="text-caption text-muted">{profile.title}</span>
        </div>
        <h1 className="mt-4 text-display text-fg">
          {lines.map((l, i) => (
            <span key={i} className="block">
              {l}
            </span>
          ))}
        </h1>
        <p className="mt-5 max-w-[560px] text-body text-body md:text-[16px]">{profile.subheadline}</p>

        <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <Button href={asset(profile.resume)} download={profile.resumeFileName} size="lg" className="w-full sm:w-auto">
            <DownloadIcon className="size-5" />
            이력서 다운로드
          </Button>
          <Button href={profile.github} variant="weak" size="lg" className="w-full sm:w-auto">
            <GithubIcon className="size-5" />
            GitHub
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-body-sm text-muted">
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 hover:text-fg">
            <MailIcon className="size-4" />
            {profile.email}
          </a>
          <span className="inline-flex items-center gap-1.5">
            <PinIcon className="size-4" />
            {profile.location}
          </span>
          <a href={profile.blog} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
            기술 블로그
          </a>
        </div>
      </div>

      <div className="shrink-0">
        <div className="size-28 overflow-hidden rounded-[32px] bg-surface md:size-40 lg:size-44">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(profile.photo)}
            alt={`${profile.name} 프로필 사진`}
            width={176}
            height={176}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
