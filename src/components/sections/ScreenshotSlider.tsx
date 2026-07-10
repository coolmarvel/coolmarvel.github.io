"use client";

import { useCallback, useState } from "react";

import { asset } from "@/lib/assets";
import { ChevronLeftIcon, ChevronRightIcon } from "@/icons";

export interface Screenshot {
  src: string;
  caption: string;
}

export default function ScreenshotSlider({ shots }: { shots: Screenshot[] }) {
  const [index, setIndex] = useState(0);
  const count = shots.length;

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count],
  );

  if (count === 0) return null;
  const current = shots[index];

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      className="outline-none"
    >
      <figure>
        <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-white/[0.02]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(current.src)}
            alt={current.caption}
            className="max-h-[640px] w-full object-contain"
          />
          {count > 1 && (
            <>
              <button
                type="button"
                aria-label="이전 스크린샷"
                onClick={() => go(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-700 shadow-theme-md transition hover:bg-white dark:bg-gray-900/80 dark:text-gray-200 dark:hover:bg-gray-900"
              >
                <ChevronLeftIcon className="size-5" />
              </button>
              <button
                type="button"
                aria-label="다음 스크린샷"
                onClick={() => go(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-700 shadow-theme-md transition hover:bg-white dark:bg-gray-900/80 dark:text-gray-200 dark:hover:bg-gray-900"
              >
                <ChevronRightIcon className="size-5" />
              </button>
              <span className="absolute right-3 top-3 rounded-full bg-gray-900/70 px-2.5 py-1 text-theme-xs font-medium text-white">
                {index + 1} / {count}
              </span>
            </>
          )}
        </div>
        <figcaption className="mt-3 min-h-10 text-theme-sm text-gray-600 dark:text-gray-300">
          {current.caption}
        </figcaption>
      </figure>

      {count > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {shots.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              aria-label={`스크린샷 ${i + 1}: ${shot.caption}`}
              onClick={() => setIndex(i)}
              className={`shrink-0 overflow-hidden rounded-lg border-2 transition ${
                i === index
                  ? "border-brand-500"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(shot.src)}
                alt=""
                loading="lazy"
                className="h-14 w-24 object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
