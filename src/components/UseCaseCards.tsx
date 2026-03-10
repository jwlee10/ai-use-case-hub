import { Eye, Star } from "lucide-react";
import type { UseCase } from "@/data/useCases";

interface UseCaseCardsProps {
  data: UseCase[];
  starredIds: Set<string>;
  onToggleStar: (id: string) => void;
}

const UseCaseCards = ({ data, starredIds, onToggleStar }: UseCaseCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((uc) => (
        <div
          key={uc.id}
          className="rounded-lg border border-border bg-card p-5 space-y-3 hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <h3 className="font-ui font-semibold text-foreground hover:text-primary transition-colors">
              {uc.title}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleStar(uc.id);
              }}
              className="ml-2 shrink-0 transition-colors hover:scale-110"
            >
              <Star
                className={`h-4 w-4 ${
                  starredIds.has(uc.id)
                    ? "fill-primary text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              />
            </button>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {uc.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {uc.jobFamilies.map((jf) => (
              <span
                key={jf}
                className="inline-block rounded-full border border-border px-2.5 py-0.5 text-xs font-ui text-muted-foreground"
              >
                {jf}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">{uc.impact}</p>
          <div className="flex items-center justify-between pt-1 border-t border-border">
            <span className="inline-flex items-center gap-1 text-muted-foreground font-ui text-xs">
              <Eye className="h-3.5 w-3.5" />
              {uc.views}
            </span>
            <span className="font-ui text-xs text-muted-foreground">
              {uc.aiToolUsed}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UseCaseCards;
