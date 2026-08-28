import Link from "next/link";
import type React from "react";

type Variant = "primary" | "weak" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  download?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-pressed",
  weak: "bg-weak text-weak-fg hover:bg-weak-hover",
  ghost: "bg-transparent text-body hover:bg-surface hover:text-fg",
  outline: "bg-canvas text-fg ring-1 ring-line hover:bg-surface",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[14px] rounded-btn-sm gap-1.5",
  md: "h-11 px-5 text-[15px] rounded-btn gap-2",
  lg: "h-12 px-6 text-[16px] rounded-btn gap-2",
};

/** DESIGN.md §4 Buttons — 뷰당 primary 1개 원칙은 호출부가 지킨다. */
export default function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  download,
  onClick,
  type = "button",
  className = "",
  ariaLabel,
  children,
}: ButtonProps) {
  const cls = `press inline-flex shrink-0 items-center justify-center whitespace-nowrap font-semibold ${variants[variant]} ${sizes[size]} ${className}`;

  if (href && (external || download || href.startsWith("http") || href.startsWith("mailto:"))) {
    return (
      <a
        href={href}
        download={download}
        target={download ? undefined : "_blank"}
        rel={download ? undefined : "noopener noreferrer"}
        className={cls}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
