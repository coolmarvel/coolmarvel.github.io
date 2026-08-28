import type { Metadata } from "next";

import SectionTitle from "@/components/ui/SectionTitle";
import ProjectsExplorer from "@/components/sections/ProjectsExplorer";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "프로젝트",
  description: "운영 중인 웹 서비스, 데스크톱 앱 인스톨러, 병원 그룹웨어, AI 파이프라인, 블록체인 성능 시험까지 — 설계부터 운영까지 담당한 프로젝트 목록.",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <SectionTitle
        as="h1"
        title={`프로젝트 ${projects.length}`}
        desc="개인 프로젝트는 링크로 바로 써보거나 내려받을 수 있고, 회사 프로젝트는 스크린샷과 설계 기록으로 남겼습니다."
      />
      <ProjectsExplorer projects={projects} />
    </div>
  );
}
