import type { Accent } from "@/components/ui/Chip";
import type { Project } from "@/data/projects";

/** 도메인 → 액센트 (DESIGN.md §2 Accents) */
export const domainAccent: Record<Project["domain"], Accent> = {
  의료: "green",
  커머스: "orange",
  블록체인: "blue",
  AI: "purple",
  데스크톱: "teal",
  "웹 서비스": "indigo",
};

export const experienceDomainAccent = {
  medical: "green",
  blockchain: "blue",
  commerce: "orange",
} as const satisfies Record<string, Accent>;

export const experienceDomainLabel = {
  medical: "의료",
  blockchain: "블록체인",
  commerce: "커머스",
} as const;
