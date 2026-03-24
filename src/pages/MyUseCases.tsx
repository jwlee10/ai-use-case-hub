import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Plus } from "lucide-react";
import { useAppState } from "@/context/AppStateContext";
import { getUserUseCases } from "@/data/userUseCases";
import UseCaseTable from "@/components/UseCaseTable";
import { SidebarTrigger } from "@/components/ui/sidebar";

const MyUseCases = () => {
  const navigate = useNavigate();
  const { likedIds, toggleLike, myUseCases } = useAppState();

  const data = useMemo(() => getUserUseCases(), [myUseCases]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-3 py-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-foreground hover:bg-muted">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                My Use Cases
              </h1>
              <p className="mt-1 text-sm text-muted-foreground font-body">
                Use cases you've submitted — {data.length} total
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/add")}
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-ui text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add New Use Case
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-3 py-5 space-y-5">
        {data.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">You haven't submitted any use cases yet.</p>
            <button
              onClick={() => navigate("/add")}
              className="mt-4 rounded-lg bg-primary px-5 py-2 font-ui text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Submit Your First Use Case
            </button>
          </div>
        ) : (
          <UseCaseTable data={data} likedIds={likedIds} onToggleLike={toggleLike} />
        )}
      </main>
    </div>
  );
};

export default MyUseCases;
