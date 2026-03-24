import { useLocation, Link } from "react-router-dom";
import {
  Home,
  MessageCircleQuestion,
  BookOpen,
  CalendarDays,
  Newspaper,
} from "lucide-react";

const sections = [
  { label: "Use Case Library", url: "/", icon: Home, matchPaths: ["/", "/liked", "/my-use-cases", "/leaderboard", "/add"] },
  { label: "Office Hour", url: "/office-hour", icon: MessageCircleQuestion, matchPaths: ["/office-hour"] },
  { label: "Learning Lab", url: "/learning-lab", icon: BookOpen, matchPaths: ["/learning-lab"] },
  { label: "Event Calendar", url: "/event-calendar", icon: CalendarDays, matchPaths: ["/event-calendar"] },
  { label: "Newsletters", url: "/newsletter", icon: Newspaper, matchPaths: ["/newsletter"] },
];

export function TopNav() {
  const location = useLocation();

  const isActive = (matchPaths: string[]) =>
    matchPaths.some((p) => (p === "/" ? location.pathname === "/" : location.pathname.startsWith(p)));

  return (
    <nav className="border-b border-border bg-foreground">
      <div className="mx-auto flex max-w-[1280px] items-center px-3">
        <Link to="/" className="mr-6 font-heading text-lg font-bold text-primary-foreground py-3 whitespace-nowrap">
          SPG AI Productivity
        </Link>
        <div className="flex items-center gap-1">
          {sections.map((s) => {
            const active = isActive(s.matchPaths);
            return (
              <Link
                key={s.url}
                to={s.url}
                className={`flex items-center gap-1.5 rounded-md px-3 py-2 font-ui text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary-foreground/15 text-primary-foreground"
                    : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                <s.icon className="h-4 w-4" />
                <span>{s.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
