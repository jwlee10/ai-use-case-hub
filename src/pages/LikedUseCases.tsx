import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Menu } from "lucide-react";
import { useCases } from "@/data/useCases";
import { getUserUseCases } from "@/data/userUseCases";
import { useAppState } from "@/context/AppStateContext";
import UseCaseTable from "@/components/UseCaseTable";
import { SidebarTrigger } from "@/components/ui/sidebar";

const LikedUseCases = () => {
  const navigate = useNavigate();
  const { likedIds, toggleLike } = useAppState();

  const allUseCases = useMemo(() => [...useCases, ...getUserUseCases()], []);
  const liked = useMemo(
    () => allUseCases.filter((uc) => likedIds.has(uc.id)),
    [allUseCases, likedIds]
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-3 py-4">
          <SidebarTrigger className="text-foreground hover:bg-muted">
            <Menu className="h-5 w-5" />
          </SidebarTrigger>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Liked Use Cases
            </h1>
            <p className="mt-1 text-sm text-muted-foreground font-body">
              Use cases you've liked — {liked.length} total
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-3 py-5 space-y-5">
        {liked.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">You haven't liked any use cases yet.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 rounded-lg bg-primary px-5 py-2 font-ui text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Browse Use Cases
            </button>
          </div>
        ) : (
          <UseCaseTable data={liked} likedIds={likedIds} onToggleLike={toggleLike} />
        )}
      </main>
    </div>
  );
};

export default LikedUseCases;
