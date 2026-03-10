import { Eye, Star } from "lucide-react";
import type { UseCase } from "@/data/useCases";

interface UseCaseTableProps {
  data: UseCase[];
  starredIds: Set<string>;
  onToggleStar: (id: string) => void;
}

const UseCaseTable = ({ data, starredIds, onToggleStar }: UseCaseTableProps) => {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {["", "TITLE", "DESCRIPTION", "JOB FAMILIES", "IMPACT", "VIEWS", "STARS", "AI TOOL USED"].map(
              (col) => (
                <th
                  key={col || "star"}
                  className="px-4 py-3 text-left font-ui text-xs font-semibold tracking-wider text-muted-foreground"
                >
                  {col}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((uc) => (
            <tr
              key={uc.id}
              className="group border-b border-border last:border-b-0 transition-colors"
            >
              <td className="px-4 py-3">
                <button
                  onClick={() => onToggleStar(uc.id)}
                  className="transition-colors hover:scale-110"
                >
                  <Star
                    className={`h-4 w-4 ${
                      starredIds.has(uc.id)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  />
                </button>
              </td>
              <td className="px-4 py-3 font-ui font-semibold text-foreground group-hover:text-primary transition-colors whitespace-nowrap cursor-pointer">
                {uc.title}
              </td>
              <td className="px-4 py-3 text-muted-foreground max-w-[240px]">
                {uc.description}
              </td>
              <td className="px-4 py-3">
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
              </td>
              <td className="px-4 py-3 text-muted-foreground max-w-[200px]">
                {uc.impact}
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-1 text-muted-foreground font-ui text-xs">
                  <Eye className="h-3.5 w-3.5" />
                  {uc.views}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-1 text-muted-foreground font-ui text-xs">
                  <Star className="h-3.5 w-3.5" />
                  {uc.stars}
                </span>
              </td>
              <td className="px-4 py-3 font-ui text-xs text-muted-foreground">
                {uc.aiToolUsed}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UseCaseTable;
