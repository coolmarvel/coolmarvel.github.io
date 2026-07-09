"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { profile } from "@/data/profile";
import { asset } from "@/lib/assets";
import {
  GridIcon,
  BriefcaseIcon,
  FolderIcon,
  BotIcon,
  GithubIcon,
  BlogIcon,
  DownloadIcon,
} from "@/icons";

const navItems = [
  { name: "대시보드", path: "/", icon: GridIcon },
  { name: "경력", path: "/experience", icon: BriefcaseIcon },
  { name: "프로젝트", path: "/projects", icon: FolderIcon },
  { name: "AI 워크플로우", path: "/ai-workflow", icon: BotIcon },
];

const externalLinks = [
  { name: "GitHub", href: profile.github, icon: GithubIcon },
  { name: "기술 블로그", href: profile.blog, icon: BlogIcon },
];

export default function AppSidebar() {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered, closeMobileSidebar } =
    useSidebar();
  const pathname = usePathname();

  const showText = isExpanded || isHovered || isMobileOpen;

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <aside
      className={`fixed top-0 left-0 z-999 flex h-screen flex-col border-r border-gray-200 bg-white px-5 transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900
        ${showText ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        xl:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex items-center gap-3 py-7 ${
          showText ? "justify-start" : "justify-center"
        }`}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-lg font-bold text-white">
          L
        </span>
        {showText && (
          <div className="min-w-0">
            <p className="truncate font-semibold text-gray-800 dark:text-white/90">
              {profile.name}
            </p>
            <p className="truncate text-theme-xs text-gray-500 dark:text-gray-400">
              {profile.title}
            </p>
          </div>
        )}
      </div>

      <nav className="no-scrollbar flex-1 overflow-y-auto">
        <p
          className={`mb-3 text-theme-xs uppercase leading-5 text-gray-400 ${
            showText ? "" : "text-center"
          }`}
        >
          {showText ? "Menu" : "···"}
        </p>
        <ul className="flex flex-col gap-1.5">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                onClick={closeMobileSidebar}
                className={`menu-item group ${
                  isActive(item.path) ? "menu-item-active" : "menu-item-inactive"
                } ${showText ? "" : "justify-center"}`}
              >
                <item.icon
                  className={`size-5 shrink-0 ${
                    isActive(item.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                />
                {showText && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>

        <p
          className={`mt-8 mb-3 text-theme-xs uppercase leading-5 text-gray-400 ${
            showText ? "" : "text-center"
          }`}
        >
          {showText ? "Links" : "···"}
        </p>
        <ul className="flex flex-col gap-1.5">
          {externalLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`menu-item group menu-item-inactive ${
                  showText ? "" : "justify-center"
                }`}
              >
                <link.icon className="size-5 shrink-0 menu-item-icon-inactive" />
                {showText && <span>{link.name}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {showText && (
        <div className="mb-6 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]">
          <p className="mb-1 font-semibold text-gray-800 dark:text-white/90">
            이력서
          </p>
          <p className="mb-4 text-theme-xs text-gray-500 dark:text-gray-400">
            PDF로 전체 경력 기술서를 확인하실 수 있습니다.
          </p>
          <a
            href={asset(profile.resume)}
            download="이성현_이력서.pdf"
            className="flex items-center justify-center gap-2 rounded-lg bg-brand-500 p-3 text-theme-sm font-medium text-white hover:bg-brand-600"
          >
            <DownloadIcon className="size-4" />
            이력서 다운로드
          </a>
        </div>
      )}
    </aside>
  );
}
