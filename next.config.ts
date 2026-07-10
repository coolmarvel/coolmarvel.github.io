import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // coolmarvel.github.io (사용자 사이트) 루트 배포 — basePath 없음
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
