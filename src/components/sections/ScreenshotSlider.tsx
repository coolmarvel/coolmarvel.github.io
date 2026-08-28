"use client";

import { useCallback, useState } from "react";

import { asset } from "@/lib/assets";
import { ChevronLeftIcon, ChevronRightIcon } from "@/icons";

export interface Screenshot {
  src: string;
  caption: string;
}

/** 스크린샷 슬라이더 — DESIGN.md §4 Screenshot */
export default function ScreenshotSlider({ shots }: { shots: Screenshot[] }) {
  const [index, setIndex] = useState(0);
  const count = shots.length;

  const go = useCallback((delta: number) => setIndex((i) => (i + delta + count) % count), [count]);

  if (count === 0) return null;
  const current = shots[index];

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      className="rounded-image outline-none"
      aria-roledescription="carousel"
    >
      <figure>
        <div className="relative overflow-hidden rounded-image bg-canvas ring-1 ring-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(current.src)} alt={current.caption} className="max-h-[640px] w-full object-contain" />
          {count > 1 && (
            <>
              <button
                type="button"
                aria-label="이전 스크린샷"
                onClick={() => go(-1)}
                className="press absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-canvas text-fg shadow-float"
              >
                <ChevronLeftIcon className="size-5" />
              </button>
              <button
                type="button"
                aria-label="다음 스크린샷"
                onClick={() => go(1)}
                className="press absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-canvas text-fg shadow-float"
              >
                <ChevronRightIcon className="size-5" />
              </button>
              <span className="tabular absolute right-3 top-3 rounded-chip bg-inverse/80 px-2.5 py-1 text-chip text-on-inverse">
                {index + 1} / {count}
              </span>
            </>
          )}
        </div>
        <figcaption className="mt-3 min-h-10 text-body-sm text-body">{current.caption}</figcaption>
      </figure>

      {count > 1 && (
        <div className="thin-scrollbar mt-2 flex gap-2 overflow-x-auto pb-2">
          {shots.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              aria-label={`스크린샷 ${i + 1}: ${shot.caption}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`press shrink-0 overflow-hidden rounded-[10px] ring-2 transition ${
                i === index ? "ring-primary" : "ring-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(shot.src)} alt="" loading="lazy" className="h-14 w-24 object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
