import { useState, useMemo } from "react";
import { Search, List, LayoutGrid, Menu } from "lucide-react";
import { useCases, type UseCaseStatus } from "@/data/useCases";
import UseCaseTable from "@/components/UseCaseTable";
import UseCaseCards from "@/components/UseCaseCards";
import MultiSelectFilter from "@/components/MultiSelectFilter";
import { SidebarTrigger } from "@/components/ui/sidebar";

const statusTabs: (UseCaseStatus | "All")[] = ["All", "Complete", "Work in Progress", "New"];
const sortOptions = ["Most Recent", "Most Viewed", "Most Liked", "A-Z"] as const;

const Index = () => {
  const [search, setSearch] = useState("");
  const [jobFamilies, setJobFamilies] = useState<string[]>([]);
  const [aiTool, setAiTool] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeTab, setActiveTab] = useState<UseCaseStatus | "All">("All");
  const [sort, setSort] = useState<string>("Most Recent");
  const [viewMode, setViewMode] = useState<"list" | "cards">("list");
  const [starredIds, setStarredIds] = useState<Set<string>>(new Set());

  const toggleStar = (id: string) => {
    setStarredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allJobFamilyOptions = useMemo(
    () => [...new Set(useCases.flatMap((u) => u.jobFamilies))],
    []
  );
  const allTools = useMemo(
    () => ["All", ...new Set(useCases.map((u) => u.aiToolUsed))],
    []
  );

  const filtered = useMemo(() => {
    return useCases.filter((uc) => {
      if (activeTab !== "All" && uc.status !== activeTab) return false;
      const q = search.toLowerCase();
      if (
        q &&
        !uc.title.toLowerCase().includes(q) &&
        !uc.description.toLowerCase().includes(q) &&
        !uc.impact.toLowerCase().includes(q)
      )
        return false;
      if (jobFamilies.length > 0 && !uc.jobFamilies.some((jf) => jobFamilies.includes(jf)))
        return false;
      if (aiTool !== "All" && uc.aiToolUsed !== aiTool) return false;
      if (statusFilter !== "All" && uc.status !== statusFilter) return false;
      return true;
    });
  }, [search, jobFamilies, aiTool, statusFilter, activeTab]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    if (sort === "Most Recent") copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (sort === "Most Viewed") copy.sort((a, b) => b.views - a.views);
    if (sort === "Most Starred") copy.sort((a, b) => b.stars - a.stars);
    if (sort === "A-Z") copy.sort((a, b) => a.title.localeCompare(b.title));
    return copy;
  }, [filtered, sort, starredIds]);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const s of statusTabs) {
      if (s === "All") {
        map[s] = useCases.length;
      } else {
        map[s] = useCases.filter((u) => u.status === s).length;
      }
    }
    return map;
  }, []);

  const clearFilters = () => {
    setSearch("");
    setJobFamilies([]);
    setAiTool("All");
    setStatusFilter("All");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-foreground">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-3 py-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-primary-foreground hover:bg-primary-foreground/10">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-primary-foreground">
                AI Use Case Library
              </h1>
              <p className="mt-1 text-sm text-primary-foreground/70 font-body">
                Discover proven AI applications across job families—search, filter, and reuse.
              </p>
            </div>
          </div>
          <button className="rounded-lg bg-primary px-5 py-2.5 font-ui text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            Add New Use Case
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-3 py-5 space-y-5">
        {/* Filter Card */}
        <div className="rounded-lg border border-border bg-card p-5 space-y-4">
          <div className="flex flex-wrap items-end gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[240px]">
              <label className="mb-1.5 block font-ui text-xs font-semibold tracking-wider text-muted-foreground">
                SEARCH
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search titles, descriptions, prompts, impact..."
                  className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <MultiSelectFilter
              label="JOB FAMILY"
              selected={jobFamilies}
              onChange={setJobFamilies}
              options={allJobFamilyOptions}
            />
            <SelectFilter
              label="AI TOOL USED"
              value={aiTool}
              onChange={setAiTool}
              options={allTools}
            />
            <SelectFilter
              label="USE CASE STATUS"
              value={statusFilter}
              onChange={setStatusFilter}
              options={["All", "Complete", "Work in Progress", "New"]}
            />
          </div>

          <div className="flex items-center justify-between border-t border-border pt-3">
            <span className="font-ui text-xs text-muted-foreground">
              Showing {sorted.length} use case{sorted.length !== 1 && "s"}
            </span>
            <div className="flex gap-2">
              <button
                onClick={clearFilters}
                className="rounded-md border border-border px-4 py-1.5 font-ui text-xs font-medium text-muted-foreground hover:bg-secondary transition-colors"
              >
                Clear
              </button>
              <button className="rounded-md bg-foreground px-4 py-1.5 font-ui text-xs font-semibold text-card transition-opacity hover:opacity-90">
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Section title + tabs + view toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Use Cases
          </h2>
          <div className="flex items-center gap-6">
            <div className="flex gap-1">
              {statusTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-3 py-1.5 font-ui text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab} ({counts[tab]})
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-ui text-xs font-semibold tracking-wider text-muted-foreground">
                SORT
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-md border border-foreground/20 bg-card px-3 py-1.5 font-ui text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {sortOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>

            {/* View toggle */}
            <div className="flex rounded-md border border-border overflow-hidden">
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-ui text-xs font-medium transition-colors ${
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="h-3.5 w-3.5" />
                List
              </button>
              <button
                onClick={() => setViewMode("cards")}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-ui text-xs font-medium transition-colors ${
                  viewMode === "cards"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                Cards
              </button>
            </div>
          </div>
        </div>

        {/* Table or Cards */}
        {viewMode === "list" ? (
          <UseCaseTable data={sorted} starredIds={starredIds} onToggleStar={toggleStar} />
        ) : (
          <UseCaseCards data={sorted} starredIds={starredIds} onToggleStar={toggleStar} />
        )}
      </main>
    </div>
  );
};

function SelectFilter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="min-w-[160px]">
      <label className="mb-1.5 block font-ui text-xs font-semibold tracking-wider text-muted-foreground">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-foreground/20 bg-card px-3 py-2 font-ui text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export default Index;
