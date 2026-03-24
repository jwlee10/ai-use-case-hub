import { useState, useMemo } from "react";
import { format, parseISO } from "date-fns";
import { Plus, Upload, MessageSquare, Paperclip, User, Calendar, Clock, Download, MoreVertical, Pencil, Trash2 } from "lucide-react";
import * as XLSX from "xlsx";
import {
  getOfficeHourQuestions,
  addOfficeHourQuestion,
  updateOfficeHourQuestion,
  deleteOfficeHourQuestion,
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
  const [selectedQuestion, setSelectedQuestion] = useState<OfficeHourQuestion | null>(null);
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
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-3 py-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Office Hour
            </h1>
            <p className="mt-1 text-sm text-muted-foreground font-body">
              Submit questions for our weekly AI office hours session.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                const rows = questions.map((q) => ({
                  "Week Of": format(parseISO(q.weekOf), "MMMM d, yyyy"),
                  "Question": q.question,
                  "Submitted By": q.submittedBy,
                  "Date": format(parseISO(q.submittedAt), "MMM d, yyyy"),
                  "Time": format(parseISO(q.submittedAt), "h:mm a"),
                  "Attachment": q.attachmentName || "",
                }));
                const ws = XLSX.utils.json_to_sheet(rows);
                ws["!cols"] = [{ wch: 20 }, { wch: 60 }, { wch: 15 }, { wch: 15 }, { wch: 12 }, { wch: 25 }];
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Office Hour Questions");
                XLSX.writeFile(wb, "office_hour_questions.xlsx");
              }}
              className="rounded-lg px-4 py-2.5 font-ui text-sm"
            >
              <Download className="mr-1 h-4 w-4" />
              Export
            </Button>
            <Button
              onClick={() => setDialogOpen(true)}
              className="rounded-lg px-5 py-2.5 font-ui text-sm font-semibold"
            >
              <Plus className="mr-1 h-4 w-4" />
              Submit a Question
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 space-y-8">
        {groupedByWeek.map(([weekOf, weekQuestions]) => (
          <div key={weekOf} className="space-y-3">
            <h2 className="text-base font-bold tracking-tight text-foreground flex items-center gap-2 font-heading">
              <MessageSquare className="h-4 w-4 text-primary" />
              Week of {format(parseISO(weekOf), "MMMM d, yyyy")}
              <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                {weekQuestions.length}
              </span>
            </h2>
            <div className="space-y-2">
              {weekQuestions.map((q) => (
                <div
                  key={q.id}
                  className="rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-primary/30 cursor-pointer"
                  onClick={() => setSelectedQuestion(q)}
                >
                  <p className="text-sm font-body text-foreground leading-relaxed line-clamp-2">
                    {q.question}
                  </p>
                  <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground font-ui">
                    <span>{q.submittedBy}</span>
                    <span>•</span>
                    <span>{format(parseISO(q.submittedAt), "MMM d 'at' h:mm a")}</span>
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
              ))}
            </div>
          </div>
        ))}

        {groupedByWeek.length === 0 && (
          <div className="text-center py-16 text-muted-foreground font-body">
            No questions submitted yet. Be the first to ask!
          </div>
        )}
      </main>

      {/* View Question Dialog */}
      <Dialog open={!!selectedQuestion} onOpenChange={(open) => !open && setSelectedQuestion(null)}>
        <DialogContent className="sm:max-w-[560px]">
          {selectedQuestion && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg leading-snug">Submitted Question</DialogTitle>
                <DialogDescription className="sr-only">Question details</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-1">
                <p className="text-sm font-body text-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedQuestion.question}
                </p>
                <div className="space-y-2 rounded-md bg-muted/50 p-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Submitted by <span className="font-medium text-foreground">{selectedQuestion.submittedBy}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{format(parseISO(selectedQuestion.submittedAt), "MMMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{format(parseISO(selectedQuestion.submittedAt), "h:mm a")}</span>
                  </div>
                  {selectedQuestion.attachmentName && (
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Paperclip className="h-4 w-4" />
                      <span className="font-medium">{selectedQuestion.attachmentName}</span>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

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
                {attachment ? attachment.name : "Click to upload an image."}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/gif,image/webp"
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
