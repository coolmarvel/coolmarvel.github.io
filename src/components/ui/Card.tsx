interface CardProps {
  title?: string;
  desc?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Card({ title, desc, className = "", children }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {(title || desc) && (
        <div className="px-5 py-4 sm:px-6 sm:py-5">
          {title && (
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              {title}
            </h3>
          )}
          {desc && (
            <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">
              {desc}
            </p>
          )}
        </div>
      )}
      <div
        className={
          title || desc
            ? "border-t border-gray-100 p-5 dark:border-gray-800 sm:p-6"
            : "p-5 sm:p-6"
        }
      >
        {children}
      </div>
    </div>
  );
}
