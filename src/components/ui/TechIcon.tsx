import { techIcons, type TechIconName } from "@/icons/techIcons";

// 브랜드 로고 SVG 를 브랜드 색으로 렌더한다.
// 어두운 로고(Next.js·Express 등)는 다크모드에서 묻히므로 techIcons 의 darkHex 로 대체된다
// — CSS 변수로 두 색을 넘기고 라이트/다크에서 각각 집어 쓴다.
export default function TechIcon({
  name,
  className = "size-3.5",
}: {
  name: TechIconName | null;
  className?: string;
}) {
  if (name === null) {
    // 브랜드 로고가 없는 항목(자체 개념·SDK)은 중립 글리프로.
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`${className} text-gray-400 dark:text-gray-500`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 3l7.5 4.5v9L12 21l-7.5-4.5v-9L12 3z" strokeLinejoin="round" />
      </svg>
    );
  }

  const icon = techIcons[name];
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      className={`${className} text-[var(--tech-hex)] dark:text-[var(--tech-dark-hex)]`}
      style={
        {
          "--tech-hex": icon.hex,
          "--tech-dark-hex": icon.darkHex,
        } as React.CSSProperties
      }
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  );
}
