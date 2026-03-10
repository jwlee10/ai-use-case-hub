import { X, Eye, ThumbsUp } from "lucide-react";
import type { UseCase } from "@/data/useCases";
import type { UserUseCase } from "@/data/userUseCases";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UseCaseDetailDialogProps {
  useCase: UseCase | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function isUserUseCase(uc: UseCase): uc is UserUseCase {
  return "aiToolsUsed" in uc;
}

const statusBadge = (status: string) => {
  const cls =
    status === "Complete"
      ? "bg-primary/10 text-primary"
      : status === "Work in Progress"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-secondary text-muted-foreground";
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-ui font-semibold ${cls}`}>
      {status}
    </span>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <h3 className="font-ui text-xs font-semibold tracking-wider text-muted-foreground uppercase">{title}</h3>
    {children}
  </div>
);

const UseCaseDetailDialog = ({ useCase, open, onOpenChange }: UseCaseDetailDialogProps) => {
  if (!useCase) return null;

  const isComplete = useCase.status === "Complete";
  const extended = isUserUseCase(useCase) ? useCase : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle className="text-lg font-bold text-foreground">
              {useCase.title}
            </DialogTitle>
            {statusBadge(useCase.status)}
          </div>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Use Case Overview */}
          <Section title="Use Case Overview">
            <p className="text-sm text-foreground">{useCase.description}</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {useCase.jobFamilies.map((jf) => (
                <span
                  key={jf}
                  className="inline-block rounded-full border border-border px-2.5 py-0.5 text-xs font-ui text-muted-foreground"
                >
                  {jf}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 pt-1">
              <span className="inline-flex items-center gap-1 text-muted-foreground font-ui text-xs">
                <Eye className="h-3.5 w-3.5" />
                {useCase.views} views
              </span>
              <span className="inline-flex items-center gap-1 text-muted-foreground font-ui text-xs">
                <ThumbsUp className="h-3.5 w-3.5" />
                {useCase.likes} likes
              </span>
            </div>
          </Section>

          {/* How the Use Case was Created — only for Complete */}
          {isComplete && (
            <Section title="How the Use Case was Created">
              <div className="space-y-2">
                <div>
                  <span className="font-ui text-xs font-semibold text-muted-foreground">AI Tools Used: </span>
                  <span className="text-sm text-foreground">
                    {extended ? extended.aiToolsUsed.join(", ") : useCase.aiToolUsed}
                  </span>
                </div>
                {extended?.finalProduct && extended.finalProduct.length > 0 && (
                  <div>
                    <span className="font-ui text-xs font-semibold text-muted-foreground">Final Product: </span>
                    <span className="text-sm text-foreground">{extended.finalProduct.join(", ")}</span>
                  </div>
                )}
                {extended?.aiUsageMethod && (
                  <div>
                    <span className="font-ui text-xs font-semibold text-muted-foreground">How AI Was Used: </span>
                    <span className="text-sm text-foreground">{extended.aiUsageMethod}</span>
                  </div>
                )}
              </div>
            </Section>
          )}

          {/* Impact — only for Complete */}
          {isComplete && useCase.impact && (
            <Section title="Impact">
              <p className="text-sm text-foreground">{useCase.impact}</p>
            </Section>
          )}

          {/* Artifacts — only for Complete with data */}
          {isComplete && extended && (extended.prompt || extended.microlearningLink || extended.attachments.length > 0) && (
            <Section title="Artifacts">
              {extended.prompt && (
                <div>
                  <span className="font-ui text-xs font-semibold text-muted-foreground">Prompt: </span>
                  <p className="text-sm text-foreground mt-1 rounded-md bg-secondary p-3 whitespace-pre-wrap">
                    {extended.prompt}
                  </p>
                </div>
              )}
              {extended.microlearningLink && (
                <div>
                  <span className="font-ui text-xs font-semibold text-muted-foreground">Microlearning Video: </span>
                  <a
                    href={extended.microlearningLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {extended.microlearningLink}
                  </a>
                </div>
              )}
              {extended.attachments.length > 0 && (
                <div>
                  <span className="font-ui text-xs font-semibold text-muted-foreground">Attachments: </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {extended.attachments.map((name, i) => (
                      <span key={i} className="inline-block rounded-md bg-secondary px-2.5 py-1 text-xs text-foreground">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UseCaseDetailDialog;
