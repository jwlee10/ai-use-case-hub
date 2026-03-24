import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, X } from "lucide-react";
import { UserUseCase } from "@/data/userUseCases";
import { useAppState } from "@/context/AppStateContext";
import MultiSelectFilter from "@/components/MultiSelectFilter";

const JOB_FAMILY_OPTIONS = [
  "GPM", "Process", "PSE", "Hardware", "BU Ops", "TPM", "Sales",
  "IT", "Support", "All", "BD", "Engineering", "HR", "Marketing", "Finance",
];

const AI_TOOLS = ["Copilot Web", "Copilot License", "Claude Code", "OneLXM", "Github Copilot", "Copilot Studio", "Copilot Cowork"];
const FINAL_PRODUCTS = ["Script", "Workflow", "Prompt(s)", "Agent"];
const AI_METHODS = ["Single prompt", "Vibe Coding", "Iterative prompting", "Copilot feature (no-prompt)", "Agent Creation", "Other"];
const TIME_UNITS = ["seconds", "minutes", "hours"];

const AddUseCase = () => {
  const navigate = useNavigate();
  const { submitUseCase } = useAppState();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [jobFamilies, setJobFamilies] = useState<string[]>([]);
  const [aiToolsUsed, setAiToolsUsed] = useState<string[]>([]);
  const [finalProduct, setFinalProduct] = useState<string[]>([]);
  const [aiMethod, setAiMethod] = useState("");
  const [asIsTime, setAsIsTime] = useState("");
  const [asIsUnit, setAsIsUnit] = useState("minutes");
  const [withAiTime, setWithAiTime] = useState("");
  const [withAiUnit, setWithAiUnit] = useState("minutes");
  const [impact, setImpact] = useState("");
  const [prompt, setPrompt] = useState("");
  const [microlearningLink, setMicrolearningLink] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = "Required";
    if (!description.trim()) e.description = "Required";
    if (jobFamilies.length === 0) e.jobFamilies = "Required";
    if (aiToolsUsed.length === 0) e.aiToolsUsed = "Required";
    if (finalProduct.length === 0) e.finalProduct = "Required";
    if (!aiMethod) e.aiMethod = "Required";
    if (!impact.trim()) e.impact = "Required";
    if (!asIsTime.trim()) e.asIsTime = "Required";
    if (!withAiTime.trim()) e.withAiTime = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const newUseCase: UserUseCase = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      jobFamilies,
      impact: impact.trim(),
      views: 0,
      likes: 0,
      aiToolUsed: aiToolsUsed[0] || "",
      status: "Complete",
      rating: 0,
      createdAt: new Date().toISOString().split("T")[0],
      aiToolsUsed,
      finalProduct,
      aiUsageMethod: aiMethod,
      prompt: prompt.trim(),
      microlearningLink: microlearningLink.trim(),
      attachments: attachments.map((f) => f.name),
    };

    submitUseCase(newUseCase);
    navigate("/");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-foreground">
        <div className="mx-auto flex max-w-[800px] items-center gap-3 px-3 py-4">
          <button
            onClick={() => navigate("/")}
            className="rounded-md p-1.5 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold tracking-tight text-primary-foreground">
            Add New Use Case
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-[800px] px-3 py-8 space-y-8">
        {/* Section 1: Use Case Overview */}
        <section className="rounded-lg border border-border bg-card p-6 space-y-4">
          <h2 className="text-lg font-bold tracking-tight text-foreground">Use Case Overview</h2>

          {/* Title */}
          <div>
            <label className="mb-1.5 block font-ui text-sm font-semibold text-foreground">
              Use Case Title <span className="text-destructive">*</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a descriptive title"
              className="w-full rounded-md border border-input bg-background px-3 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.title && <p className="mt-1 text-xs text-destructive">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block font-ui text-sm font-semibold text-foreground">
              Use Case Description <span className="text-destructive">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the use case in detail"
              rows={4}
              className="w-full rounded-md border border-input bg-background px-3 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            />
            {errors.description && <p className="mt-1 text-xs text-destructive">{errors.description}</p>}
          </div>

          {/* Job Family */}
          <div>
            <label className="mb-1.5 block font-ui text-sm font-semibold text-foreground">
              Job Family This Use Case Applies To <span className="text-destructive">*</span>
            </label>
            <MultiSelectFilter
              label=""
              selected={jobFamilies}
              onChange={setJobFamilies}
              options={JOB_FAMILY_OPTIONS}
            />
            {errors.jobFamilies && <p className="mt-1 text-xs text-destructive">{errors.jobFamilies}</p>}
          </div>
        </section>

        {/* Section 2: How the Use Case was Created */}
        <section className="rounded-lg border border-border bg-card p-6 space-y-4">
          <h2 className="text-lg font-bold tracking-tight text-foreground">How the Use Case was Created</h2>

          {/* AI Tools Used */}
          <div>
            <label className="mb-1.5 block font-ui text-sm font-semibold text-foreground">
              AI Tools Used <span className="text-destructive">*</span>
            </label>
            <MultiSelectFilter
              label=""
              selected={aiToolsUsed}
              onChange={setAiToolsUsed}
              options={AI_TOOLS}
            />
            {errors.aiToolsUsed && <p className="mt-1 text-xs text-destructive">{errors.aiToolsUsed}</p>}
          </div>

          {/* Final Product */}
          <div>
            <label className="mb-1.5 block font-ui text-sm font-semibold text-foreground">
              What is the Final Product? <span className="text-destructive">*</span>
            </label>
            <MultiSelectFilter
              label=""
              selected={finalProduct}
              onChange={setFinalProduct}
              options={FINAL_PRODUCTS}
            />
            {errors.finalProduct && <p className="mt-1 text-xs text-destructive">{errors.finalProduct}</p>}
          </div>

          {/* AI Method */}
          <div>
            <label className="mb-1.5 block font-ui text-sm font-semibold text-foreground">
              How was AI Primarily Used to Create the Solution? <span className="text-destructive">*</span>
            </label>
            <select
              value={aiMethod}
              onChange={(e) => setAiMethod(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 font-ui text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select method...</option>
              {AI_METHODS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            {errors.aiMethod && <p className="mt-1 text-xs text-destructive">{errors.aiMethod}</p>}
          </div>
        </section>

        {/* Section 3: Impact */}
        <section className="rounded-lg border border-border bg-card p-6 space-y-4">
          <h2 className="text-lg font-bold tracking-tight text-foreground">Impact</h2>

          {/* As Is */}
          <div>
            <label className="mb-1 block font-ui text-sm font-semibold text-foreground">
              As Is <span className="text-destructive">*</span>
            </label>
            <p className="mb-2 text-xs text-muted-foreground">
              How long does this task take as-is, without AI-enablement?
            </p>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                value={asIsTime}
                onChange={(e) => setAsIsTime(e.target.value)}
                placeholder="e.g. 30"
                className="w-32 rounded-md border border-input bg-background px-3 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <select
                value={asIsUnit}
                onChange={(e) => setAsIsUnit(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 font-ui text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {TIME_UNITS.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
            {errors.asIsTime && <p className="mt-1 text-xs text-destructive">{errors.asIsTime}</p>}
          </div>

          {/* With AI */}
          <div>
            <label className="mb-1 block font-ui text-sm font-semibold text-foreground">
              With AI <span className="text-destructive">*</span>
            </label>
            <p className="mb-2 text-xs text-muted-foreground">
              How long does this task take now, with AI-enablement?
            </p>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                value={withAiTime}
                onChange={(e) => setWithAiTime(e.target.value)}
                placeholder="e.g. 5"
                className="w-32 rounded-md border border-input bg-background px-3 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <select
                value={withAiUnit}
                onChange={(e) => setWithAiUnit(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 font-ui text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {TIME_UNITS.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
            {errors.withAiTime && <p className="mt-1 text-xs text-destructive">{errors.withAiTime}</p>}
          </div>

          {/* Impact description */}
          <div>
            <label className="mb-1.5 block font-ui text-sm font-semibold text-foreground">
              Describe the Impact <span className="text-destructive">*</span>
            </label>
            <textarea
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
              placeholder="Describe the impact of this use case"
              rows={4}
              className="w-full rounded-md border border-input bg-background px-3 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            />
            {errors.impact && <p className="mt-1 text-xs text-destructive">{errors.impact}</p>}
          </div>
        </section>

        {/* Section 4: Artifacts */}
        <section className="rounded-lg border border-border bg-card p-6 space-y-4">
          <h2 className="text-lg font-bold tracking-tight text-foreground">Artifacts</h2>

          {/* Prompt */}
          <div>
            <label className="mb-1.5 block font-ui text-sm font-semibold text-foreground">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Paste the prompt you used"
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            />
          </div>

          {/* Microlearning Link */}
          <div>
            <label className="mb-1.5 block font-ui text-sm font-semibold text-foreground">Link to Microlearning Video</label>
            <input
              value={microlearningLink}
              onChange={(e) => setMicrolearningLink(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Attachments */}
          <div>
            <label className="mb-1.5 block font-ui text-sm font-semibold text-foreground">
              Attachments (scripts, .exe files, etc...)
            </label>
            <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-input bg-background px-4 py-3 text-sm text-muted-foreground hover:bg-secondary transition-colors">
              <Upload className="h-4 w-4" />
              <span>Click to upload files</span>
              <input type="file" multiple onChange={handleFileChange} className="hidden" />
            </label>
            {attachments.length > 0 && (
              <div className="mt-2 space-y-1">
                {attachments.map((file, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-md bg-secondary px-3 py-1.5 text-sm text-foreground">
                    <span className="flex-1 truncate">{file.name}</span>
                    <button onClick={() => removeAttachment(i)} className="text-muted-foreground hover:text-destructive">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-primary px-8 py-2.5 font-ui text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Submit
          </button>
        </div>
      </main>
    </div>
  );
};

export default AddUseCase;
