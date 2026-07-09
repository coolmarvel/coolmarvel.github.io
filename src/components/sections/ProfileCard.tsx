import Badge from "@/components/ui/Badge";
import { profile, currentPosition } from "@/data/profile";
import { asset } from "@/lib/assets";
import { DownloadIcon, GithubIcon, MailIcon, PhoneIcon, PinIcon } from "@/icons";

export default function ProfileCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-center gap-6 xl:flex-row">
          <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full border border-gray-200 dark:border-gray-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(profile.photo)}
              alt={`${profile.name} 프로필 사진`}
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div className="text-center xl:text-left">
            <div className="flex flex-col items-center gap-2 xl:flex-row">
              <h2 className="text-title-sm font-semibold text-gray-800 dark:text-white/90">
                {profile.name}
              </h2>
              <Badge color="success" size="sm">
                {currentPosition.company} 재직중
              </Badge>
            </div>
            <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">
              {profile.title} · {profile.tagline}
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-theme-sm text-gray-500 dark:text-gray-400 xl:justify-start">
              <span className="inline-flex items-center gap-1.5">
                <MailIcon className="size-4" />
                {profile.email}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <PhoneIcon className="size-4" />
                {profile.phone}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <PinIcon className="size-4" />
                {profile.location}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={asset(profile.resume)}
            download="이성현_이력서.pdf"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-3 text-theme-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
          >
            <DownloadIcon className="size-4" />
            이력서 다운로드
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/5"
          >
            <GithubIcon className="size-4" />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
