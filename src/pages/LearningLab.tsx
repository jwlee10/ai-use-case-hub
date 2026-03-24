import { BookOpen } from "lucide-react";

const LearningLab = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-3 py-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Learning Lab
            </h1>
            <p className="mt-1 text-sm text-muted-foreground font-body">
              Curated learning resources to level up your AI skills.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-3 py-5">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="rounded-full bg-primary/10 p-4 mb-4">
            <BookOpen className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Coming Soon</h2>
          <p className="max-w-md text-sm text-muted-foreground font-body">
            We're building a collection of tutorials, guides, and hands-on exercises to help you master AI tools. Stay tuned!
          </p>
        </div>
      </main>
    </div>
  );
};

export default LearningLab;
