import type { Metadata } from "next";

import ProjectCard from "@/components/sections/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "프로젝트 | 이성현 포트폴리오",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div>
        <h1 className="text-title-sm font-semibold text-gray-800 dark:text-white/90">
          프로젝트
        </h1>
        <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">
          병원 그룹웨어부터 블록체인 인증 시험, AI 자동화 파이프라인까지 —
          기획 · 설계 · 개발 · 운영 전 과정을 담당한 프로젝트들입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
