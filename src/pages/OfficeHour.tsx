import { useState, useMemo } from "react";
import { format, parseISO } from "date-fns";
import { Menu, Plus, Upload, MessageSquare, Paperclip, ChevronDown } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  getOfficeHourQuestions,
  addOfficeHourQuestion,
  type OfficeHourQuestion,
} from "@/data/officeHourQuestions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const OfficeHour = () => {
  const [questions, setQuestions] = useState(getOfficeHourQuestions());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [error, setError] = useState("");

  // Group questions by week
  const groupedByWeek = useMemo(() => {
    const groups: Record<string, OfficeHourQuestion[]> = {};
    questions.forEach((q) => {
      if (!groups[q.weekOf]) groups[q.weekOf] = [];
      groups[q.weekOf].push(q);
    });
    // Sort weeks descending
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
  }, [questions]);

  const handleSubmit = () => {
    if (!newQuestion.trim()) {
      setError("Please enter your question.");
      return;
    }
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now);
    monday.setDate(diff);
    const weekOf = monday.toISOString().split("T")[0];

    const q: OfficeHourQuestion = {
      id: `q-${Date.now()}`,
      question: newQuestion.trim(),
      submittedBy: "You",
      submittedAt: now.toISOString(),
      weekOf,
      attachmentName: attachment?.name,
    };
    addOfficeHourQuestion(q);
    setQuestions(getOfficeHourQuestions());
    setNewQuestion("");
    setAttachment(null);
    setError("");
    setDialogOpen(false);
  };

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
                Office Hour
              </h1>
              <p className="mt-1 text-sm text-primary-foreground/70 font-body">
                Submit questions for our weekly AI office hours session.
              </p>
            </div>
          </div>
          <Button
            onClick={() => setDialogOpen(true)}
            className="rounded-lg bg-primary px-5 py-2.5 font-ui text-sm font-semibold"
          >
            <Plus className="mr-1 h-4 w-4" />
            Submit a Question
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-3 py-5 space-y-6">
        {groupedByWeek.map(([weekOf, weekQuestions]) => (
          <div key={weekOf} className="space-y-3">
            <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Week of {format(parseISO(weekOf), "MMMM d, yyyy")}
              <span className="ml-2 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {weekQuestions.length} question{weekQuestions.length !== 1 && "s"}
              </span>
            </h2>
            <div className="space-y-2">
              {weekQuestions.map((q) => {
                const isExpanded = expandedId === q.id;
                return (
                  <div
                    key={q.id}
                    className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className={`text-sm font-body text-foreground leading-relaxed ${isExpanded ? "" : "line-clamp-2"}`}>
                        {q.question}
                      </p>
                      <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 mt-0.5 ${isExpanded ? "rotate-180" : ""}`} />
                    </div>
                    <div className={`mt-2 flex items-center gap-4 text-xs text-muted-foreground font-ui ${isExpanded ? "" : ""}`}>
                      <span>Submitted by {q.submittedBy}</span>
                      <span>•</span>
                      <span>{format(parseISO(q.submittedAt), "MMM d, yyyy 'at' h:mm a")}</span>
                      {q.attachmentName && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-primary">
                            <Paperclip className="h-3 w-3" />
                            {q.attachmentName}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {groupedByWeek.length === 0 && (
          <div className="text-center py-16 text-muted-foreground font-body">
            No questions submitted yet. Be the first to ask!
          </div>
        )}
      </main>

      {/* Submit Question Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Submit a Question for Office Hours</DialogTitle>
            <DialogDescription>
              Your question will be added to this week's office hour queue.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <label className="mb-1.5 block font-ui text-xs font-semibold tracking-wider text-muted-foreground">
                YOUR QUESTION <span className="text-destructive">*</span>
              </label>
              <Textarea
                value={newQuestion}
                onChange={(e) => {
                  setNewQuestion(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Type your question here..."
                rows={4}
              />
              {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
            </div>
            <div>
              <label className="mb-1.5 block font-ui text-xs font-semibold tracking-wider text-muted-foreground">
                ATTACHMENT (OPTIONAL)
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-input bg-background px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground">
                <Upload className="h-4 w-4" />
                {attachment ? attachment.name : "Click to upload a screenshot or file"}
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setAttachment(e.target.files?.[0] || null)}
                />
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Submit Question</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OfficeHour;
