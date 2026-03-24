import { Menu, Trophy, Medal, ThumbsUp, Sparkles, Crown } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface LeaderEntry {
  rank: number;
  name: string;
  department: string;
  avatar: string;
  count: number;
}

const topSubmitters: LeaderEntry[] = [
  { rank: 1, name: "Priya Patel", department: "Process Engineering", avatar: "PP", count: 14 },
  { rank: 2, name: "Marcus Chen", department: "IT Solutions", avatar: "MC", count: 11 },
  { rank: 3, name: "Dana Okafor", department: "GPM", avatar: "DO", count: 9 },
  { rank: 4, name: "James Whitfield", department: "Sales", avatar: "JW", count: 7 },
  { rank: 5, name: "Sofia Reyes", department: "BU Ops", avatar: "SR", count: 6 },
  { rank: 6, name: "Tomás Andersen", department: "Hardware", avatar: "TA", count: 5 },
  { rank: 7, name: "Lin Zhou", department: "Engineering", avatar: "LZ", count: 5 },
  { rank: 8, name: "Ava Mitchell", department: "Finance", avatar: "AM", count: 4 },
];

const mostLikedUseCases: { rank: number; title: string; author: string; likes: number }[] = [
  { rank: 1, title: "Meeting Notes Summarizer", author: "Priya Patel", likes: 58 },
  { rank: 2, title: "JMP Plot Builder Helper", author: "Marcus Chen", likes: 47 },
  { rank: 3, title: "Code Review Assistant", author: "Lin Zhou", likes: 41 },
  { rank: 4, title: "Safety Checklist Assistant", author: "Dana Okafor", likes: 32 },
  { rank: 5, title: "Part Delay Notification Automation", author: "James Whitfield", likes: 25 },
  { rank: 6, title: "Knowledge Article Generator", author: "Sofia Reyes", likes: 19 },
  { rank: 7, title: "RFP Response Drafter", author: "Ava Mitchell", likes: 11 },
  { rank: 8, title: "Onboarding FAQ Bot", author: "Tomás Andersen", likes: 8 },
];

const rankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
  return <span className="flex h-5 w-5 items-center justify-center font-ui text-xs font-bold text-muted-foreground">{rank}</span>;
};

const avatarColors = [
  "bg-primary text-primary-foreground",
  "bg-accent text-accent-foreground",
  "bg-yellow-500 text-white",
  "bg-emerald-500 text-white",
  "bg-rose-500 text-white",
  "bg-violet-500 text-white",
  "bg-cyan-500 text-white",
  "bg-orange-500 text-white",
];

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-3 py-4">
          <SidebarTrigger className="text-foreground hover:bg-muted">
            <Menu className="h-5 w-5" />
          </SidebarTrigger>
          <div className="flex items-center gap-3">
            <Trophy className="h-6 w-6 text-yellow-400" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Leaderboard
              </h1>
              <p className="mt-1 text-sm text-muted-foreground font-body">
                Celebrating our AI champions — keep building, keep sharing! 🚀
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-3 py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Submitters */}
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="border-b border-border bg-secondary/50 px-6 py-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold tracking-tight text-foreground">
                  Most Prolific Builders
                </h2>
              </div>
              <p className="mt-1 text-xs text-muted-foreground font-body">
                Who's shipping the most use cases?
              </p>
            </div>
            <div className="divide-y divide-border">
              {topSubmitters.map((entry, i) => (
                <div
                  key={entry.name}
                  className={`flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-secondary/30 ${
                    entry.rank <= 3 ? "bg-secondary/20" : ""
                  }`}
                >
                  <div className="w-6 flex justify-center">{rankIcon(entry.rank)}</div>
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-ui text-xs font-bold ${avatarColors[i % avatarColors.length]}`}
                  >
                    {entry.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-ui text-sm font-semibold text-foreground truncate">
                      {entry.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{entry.department}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-ui text-lg font-bold text-foreground">{entry.count}</span>
                    <p className="text-xs text-muted-foreground">use cases</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Most Liked Use Cases */}
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="border-b border-border bg-secondary/50 px-6 py-4">
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold tracking-tight text-foreground">
                  Fan Favorites
                </h2>
              </div>
              <p className="mt-1 text-xs text-muted-foreground font-body">
                The use cases your colleagues can't stop liking
              </p>
            </div>
            <div className="divide-y divide-border">
              {mostLikedUseCases.map((entry) => (
                <div
                  key={entry.title}
                  className={`flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-secondary/30 ${
                    entry.rank <= 3 ? "bg-secondary/20" : ""
                  }`}
                >
                  <div className="w-6 flex justify-center">{rankIcon(entry.rank)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-ui text-sm font-semibold text-foreground truncate">
                      {entry.title}
                    </p>
                    <p className="text-xs text-muted-foreground">by {entry.author}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ThumbsUp className="h-3.5 w-3.5 text-primary" />
                    <span className="font-ui text-lg font-bold text-foreground">{entry.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fun footer callout */}
        <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 px-6 py-5 text-center">
          <p className="font-ui text-sm font-semibold text-foreground">
            Want to see your name up here? 🏆
          </p>
          <p className="mt-1 text-sm text-muted-foreground font-body">
            Submit your AI use cases and help your colleagues work smarter. Every contribution counts!
          </p>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
