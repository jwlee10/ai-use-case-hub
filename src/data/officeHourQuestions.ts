export interface OfficeHourQuestion {
  id: string;
  question: string;
  submittedBy: string;
  submittedAt: string;
  attachmentName?: string;
  weekOf: string; // ISO date string for the Monday of that week
}

function getMonday(date: Date): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d.toISOString().split("T")[0];
}

const now = new Date();
const thisMonday = getMonday(now);
const lastMonday = getMonday(new Date(now.getTime() - 7 * 86400000));
const twoWeeksAgo = getMonday(new Date(now.getTime() - 14 * 86400000));

let questions: OfficeHourQuestion[] = [
  {
    id: "q1",
    question: "How do I connect Copilot to our internal SharePoint data sources for better context?",
    submittedBy: "Alex M.",
    submittedAt: `${thisMonday}T09:30:00`,
    weekOf: thisMonday,
  },
  {
    id: "q2",
    question: "What's the best way to write prompts for summarizing long technical documents?",
    submittedBy: "Jordan P.",
    submittedAt: `${thisMonday}T14:15:00`,
    weekOf: thisMonday,
  },
  {
    id: "q3",
    question: "Can ChatGPT be used for data analysis on exported CSV files from our ERP system?",
    submittedBy: "Sam R.",
    submittedAt: `${thisMonday}T11:00:00`,
    attachmentName: "erp_export_example.csv",
    weekOf: thisMonday,
  },
  {
    id: "q4",
    question: "Is there a way to automate recurring meeting agenda creation using AI?",
    submittedBy: "Casey L.",
    submittedAt: `${lastMonday}T10:00:00`,
    weekOf: lastMonday,
  },
  {
    id: "q5",
    question: "How do we ensure sensitive data isn't sent to external AI tools?",
    submittedBy: "Morgan T.",
    submittedAt: `${lastMonday}T15:45:00`,
    attachmentName: "data_policy_screenshot.png",
    weekOf: lastMonday,
  },
  {
    id: "q6",
    question: "What are some quick wins for using Copilot in Excel for financial forecasting?",
    submittedBy: "Taylor B.",
    submittedAt: `${lastMonday}T08:30:00`,
    weekOf: lastMonday,
  },
  {
    id: "q7",
    question: "Can someone demo how to build a Power Automate flow with Copilot Studio?",
    submittedBy: "Riley K.",
    submittedAt: `${twoWeeksAgo}T13:20:00`,
    weekOf: twoWeeksAgo,
  },
  {
    id: "q8",
    question: "What's the difference between Copilot and Copilot Studio for our team's needs?",
    submittedBy: "Drew N.",
    submittedAt: `${twoWeeksAgo}T09:00:00`,
    weekOf: twoWeeksAgo,
  },
];

export const getOfficeHourQuestions = () => questions;

export const addOfficeHourQuestion = (q: OfficeHourQuestion) => {
  questions = [q, ...questions];
};

export const updateOfficeHourQuestion = (id: string, updates: Partial<OfficeHourQuestion>) => {
  questions = questions.map((q) => (q.id === id ? { ...q, ...updates } : q));
};

export const deleteOfficeHourQuestion = (id: string) => {
  questions = questions.filter((q) => q.id !== id);
};

export const getCurrentWeekMonday = () => thisMonday;
