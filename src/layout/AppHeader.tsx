"use client";

import { useSidebar } from "@/context/SidebarContext";
import { useTheme } from "@/context/ThemeContext";
import { profile } from "@/data/profile";
import {
  MenuIcon,
  CloseIcon,
  ChevronLeftIcon,
  SunIcon,
  MoonIcon,
  GithubIcon,
  MailIcon,
} from "@/icons";

export default function AppHeader() {
  const { isExpanded, isMobileOpen, toggleSidebar, toggleMobileSidebar } =
    useSidebar();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-99 flex w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex w-full items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            aria-label="사이드바 토글"
            className="hidden h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-white/5 xl:flex"
          >
            <ChevronLeftIcon
              className={`size-5 transition-transform ${
                isExpanded ? "" : "rotate-180"
              }`}
            />
          </button>
          <button
            onClick={toggleMobileSidebar}
            aria-label="모바일 메뉴"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-white/5 xl:hidden"
          >
            {isMobileOpen ? (
              <CloseIcon className="size-5" />
            ) : (
              <MenuIcon className="size-5" />
            )}
          </button>
          <div className="hidden sm:block">
            <p className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
              {profile.name} · {profile.title}
            </p>
            <p className="text-theme-xs text-gray-500 dark:text-gray-400">
              {profile.tagline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${profile.email}`}
            aria-label="이메일 보내기"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-white/5"
          >
            <MailIcon className="size-5" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-white/5"
          >
            <GithubIcon className="size-5" />
          </a>
          <button
            onClick={toggleTheme}
            aria-label="다크모드 토글"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-white/5"
          >
            {theme === "dark" ? (
              <SunIcon className="size-5" />
            ) : (
              <MoonIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
