import type React from "react";

interface CardProps {
  title?: React.ReactNode;
  desc?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "surface" | "outlined";
  className?: string;
  children: React.ReactNode;
}

/** DESIGN.md §4 Card — surface 면, radius 20, 테두리·그림자 없음. outlined 는 surface 위의 하위 블록용. */
export default function Card({ title, desc, action, variant = "surface", className = "", children }: CardProps) {
  const shell =
    variant === "surface"
      ? "rounded-card bg-surface p-5 md:p-6"
      : "rounded-image bg-canvas p-5 ring-1 ring-line";
  return (
    <section className={`${shell} ${className}`}>
      {(title || desc || action) && (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            {title && <h3 className="text-h3 text-fg">{title}</h3>}
            {desc && <p className="mt-0.5 text-caption text-muted">{desc}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
