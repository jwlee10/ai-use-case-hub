import { Menu, BookOpen } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const LearningLab = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-foreground">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-3 py-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-primary-foreground hover:bg-primary-foreground/10">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-primary-foreground">
                Learning Lab
              </h1>
              <p className="mt-1 text-sm text-primary-foreground/70 font-body">
                Curated learning resources to level up your AI skills.
              </p>
            </div>
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
