export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  description?: string;
  type: "office-hour" | "workshop" | "webinar" | "conference" | "other";
}

let events: CalendarEvent[] = [
  {
    id: "e1",
    title: "Weekly AI Office Hour",
    date: "2026-03-24",
    description: "Weekly drop-in session to discuss AI tools, tips, and questions.",
    type: "office-hour",
  },
  {
    id: "e2",
    title: "Copilot Studio Workshop",
    date: "2026-03-26",
    description: "Hands-on session building agents with Copilot Studio.",
    type: "workshop",
  },
  {
    id: "e3",
    title: "Prompt Engineering 101",
    date: "2026-03-31",
    description: "Learn the fundamentals of writing effective prompts.",
    type: "webinar",
  },
  {
    id: "e4",
    title: "Weekly AI Office Hour",
    date: "2026-03-31",
    description: "Weekly drop-in session to discuss AI tools, tips, and questions.",
    type: "office-hour",
  },
  {
    id: "e5",
    title: "AI in Manufacturing Summit",
    date: "2026-04-10",
    description: "External conference on AI applications in manufacturing.",
    type: "conference",
  },
  {
    id: "e6",
    title: "ChatGPT Advanced Tips",
    date: "2026-04-03",
    description: "Deep dive into advanced ChatGPT techniques for work.",
    type: "webinar",
  },
  {
    id: "e7",
    title: "Weekly AI Office Hour",
    date: "2026-04-07",
    description: "Weekly drop-in session to discuss AI tools, tips, and questions.",
    type: "office-hour",
  },
  {
    id: "e8",
    title: "AI Ethics & Governance Talk",
    date: "2026-04-15",
    description: "Discussion on responsible AI use and company policies.",
    type: "other",
  },
];

export const getEvents = () => events;

export const addEvent = (event: CalendarEvent) => {
  events = [...events, event];
};
