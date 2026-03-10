import { UseCase, UseCaseStatus } from "./useCases";

export interface UserUseCase extends UseCase {
  aiToolsUsed: string[];
  finalProduct: string[];
  aiUsageMethod: string;
  prompt: string;
  microlearningLink: string;
  attachments: string[];
}

// In-memory store for user-submitted use cases
let userUseCases: UserUseCase[] = [
  {
    id: "my-1",
    title: "Spec Document Formatter",
    description: "Automatically format raw engineering specs into standardized templates with proper headings, tables, and cross-references.",
    jobFamilies: ["Engineering", "Process"],
    impact: "Saves 2+ hours per spec document; consistent formatting across teams.",
    views: 45,
    likes: 6,
    aiToolUsed: "Copilot Web",
    status: "Complete",
    rating: 4,
    createdAt: "2026-02-20",
    aiToolsUsed: ["Copilot Web"],
    finalProduct: ["Prompt(s)"],
    aiUsageMethod: "Iterative prompting",
    prompt: "Take the following raw spec and reformat it into our standard template...",
    microlearningLink: "",
    attachments: [],
  },
  {
    id: "my-2",
    title: "Weekly Status Report Generator",
    description: "Compile updates from multiple project trackers into a concise weekly status email.",
    jobFamilies: ["TPM", "BU Ops"],
    impact: "Cuts report prep from 45 min to 10 min per week.",
    views: 28,
    likes: 4,
    aiToolUsed: "Claude Code",
    status: "Complete",
    rating: 3,
    createdAt: "2026-02-28",
    aiToolsUsed: ["Claude Code"],
    finalProduct: ["Script"],
    aiUsageMethod: "Vibe Coding",
    prompt: "",
    microlearningLink: "https://example.com/status-report-demo",
    attachments: ["status_generator.py"],
  },
  {
    id: "my-3",
    title: "Customer Feedback Categorizer",
    description: "Classify incoming customer feedback into themes and sentiment for quarterly review.",
    jobFamilies: ["Sales", "Marketing"],
    impact: "",
    views: 5,
    likes: 0,
    aiToolUsed: "OneLXM",
    status: "Work in Progress",
    rating: 0,
    createdAt: "2026-03-08",
    aiToolsUsed: ["OneLXM"],
    finalProduct: ["Workflow"],
    aiUsageMethod: "",
    prompt: "",
    microlearningLink: "",
    attachments: [],
  },
];

export const addUserUseCase = (uc: UserUseCase) => {
  userUseCases = [...userUseCases, uc];
};

export const getUserUseCases = () => userUseCases;
