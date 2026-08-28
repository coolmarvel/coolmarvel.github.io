import Link from "next/link";

import { profile } from "@/data/profile";
import { navItems } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="bg-surface">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[15px] font-semibold text-fg">
            {profile.name} <span className="font-normal text-muted">· {profile.englishName}</span>
          </p>
          <p className="mt-1 text-caption text-muted">
            © 2026 coolmarvel. Next.js · Tailwind CSS · Claude Code · oh-my-design(Toss 레퍼런스)으로 만들었습니다.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-body-sm font-medium text-body" aria-label="푸터 메뉴">
          {navItems.map((n) => (
            <Link key={n.path} href={n.path} className="hover:text-fg">
              {n.name}
            </Link>
          ))}
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
            GitHub
          </a>
          <a href={profile.blog} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
            기술 블로그
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-fg">
            이메일
          </a>
        </nav>
      </div>
    </footer>
  );
}
