"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useTheme } from "@/context/ThemeContext";
import { profile } from "@/data/profile";
import { asset } from "@/lib/assets";
import { navItems } from "@/lib/site";
import { CloseIcon, DownloadIcon, GithubIcon, MenuIcon, MoonIcon, SunIcon } from "@/icons";

export default function SiteHeader() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (path: string) => (path === "/" ? pathname === "/" : pathname.startsWith(path));

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md transition-[border-color,background-color] duration-200 ${
        scrolled || open ? "border-b border-line" : "border-b border-transparent"
      }`}
      style={{ backgroundColor: "var(--header-bg)" }}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="press flex items-center gap-2.5 rounded-btn" aria-label="홈으로">
          <span className="flex size-8 items-center justify-center rounded-[10px] bg-primary text-[15px] font-bold text-on-primary">
            L
          </span>
          <span className="flex items-baseline gap-1.5">
            <span className="text-[16px] font-bold text-fg">{profile.name}</span>
            <span className="hidden text-caption text-muted sm:inline">coolmarvel</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="주 메뉴">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              aria-current={isActive(item.path) ? "page" : undefined}
              className={`press rounded-btn px-3.5 py-2 text-[15px] font-semibold transition-colors ${
                isActive(item.path) ? "text-fg" : "text-body hover:bg-surface hover:text-fg"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="press hidden size-9 items-center justify-center rounded-btn text-body hover:bg-surface hover:text-fg sm:flex"
          >
            <GithubIcon className="size-5" />
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
            className="press flex size-9 items-center justify-center rounded-btn text-body hover:bg-surface hover:text-fg"
          >
            {theme === "dark" ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
          </button>
          <a
            href={asset(profile.resume)}
            download={profile.resumeFileName}
            className="press hidden h-9 items-center gap-1.5 rounded-btn-sm bg-weak px-3.5 text-[14px] font-semibold text-weak-fg hover:bg-weak-hover md:inline-flex"
          >
            <DownloadIcon className="size-4" />
            이력서
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            className="press flex size-9 items-center justify-center rounded-btn text-body hover:bg-surface hover:text-fg md:hidden"
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      {/* 모바일 시트 메뉴 */}
      {open && (
        <div className="md:hidden">
          <button
            type="button"
            aria-label="메뉴 닫기"
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-16 z-40 cursor-default bg-black/30"
          />
          <div className="container-page relative z-50 pb-4">
            <div className="rounded-card bg-canvas p-2 shadow-float ring-1 ring-line">
              <ul>
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      aria-current={isActive(item.path) ? "page" : undefined}
                      className={`press flex h-12 items-center rounded-inner px-4 text-[16px] font-semibold ${
                        isActive(item.path) ? "bg-surface text-fg" : "text-body"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press flex h-12 items-center gap-2 rounded-inner px-4 text-[16px] font-semibold text-body"
                  >
                    <GithubIcon className="size-5" />
                    GitHub
                  </a>
                </li>
              </ul>
              <a
                href={asset(profile.resume)}
                download={profile.resumeFileName}
                className="press mt-2 flex h-12 items-center justify-center gap-2 rounded-btn bg-primary text-[15px] font-semibold text-on-primary hover:bg-primary-hover"
              >
                <DownloadIcon className="size-5" />
                이력서 다운로드
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
