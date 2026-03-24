import { useState, useMemo } from "react";
import { Plus, Upload, Calendar } from "lucide-react";
import { getNewsletters, addNewsletter, type Newsletter as NL } from "@/data/newsletters";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SortOption = "Newest" | "Oldest" | "A-Z" | "Z-A";

const Newsletter = () => {
  const [newsletters, setNewsletters] = useState(getNewsletters());
  const [sort, setSort] = useState<SortOption>("Newest");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newFile, setNewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [viewImage, setViewImage] = useState<NL | null>(null);

  const sorted = useMemo(() => {
    const copy = [...newsletters];
    if (sort === "Newest") copy.sort((a, b) => b.date.localeCompare(a.date));
    if (sort === "Oldest") copy.sort((a, b) => a.date.localeCompare(b.date));
    if (sort === "A-Z") copy.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "Z-A") copy.sort((a, b) => b.title.localeCompare(a.title));
    return copy;
  }, [newsletters, sort]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    const errs: Record<string, string> = {};
    if (!newTitle.trim()) errs.title = "Title is required.";
    if (!newFile) errs.file = "Please select a PNG image.";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const nl: NL = {
      id: `nl-${Date.now()}`,
      title: newTitle.trim(),
      imageUrl: previewUrl, // In a real app this would be uploaded to storage
      date: new Date().toISOString().split("T")[0],
    };
    addNewsletter(nl);
    setNewsletters(getNewsletters());
    setNewTitle("");
    setNewFile(null);
    setPreviewUrl("");
    setErrors({});
    setDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-3 py-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Newsletters
            </h1>
            <p className="mt-1 text-sm text-muted-foreground font-body">
              Monthly newsletters from the AI team.
            </p>
          </div>
          <Button
            onClick={() => setDialogOpen(true)}
            className="rounded-lg px-5 py-2.5 font-ui text-sm font-semibold"
          >
            <Plus className="mr-1 h-4 w-4" />
            Upload Newsletter
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-3 py-5 space-y-4">
        {/* Sort */}
        <div className="flex items-center justify-between">
          <span className="font-ui text-xs text-muted-foreground">
            {sorted.length} newsletter{sorted.length !== 1 && "s"}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-ui text-xs font-semibold tracking-wider text-muted-foreground">
              SORT
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-md border border-input bg-card px-3 py-1.5 font-ui text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option>Newest</option>
              <option>Oldest</option>
              <option>A-Z</option>
              <option>Z-A</option>
            </select>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((nl) => (
            <div
              key={nl.id}
              onClick={() => setViewImage(nl)}
              className="group cursor-pointer rounded-lg border border-border bg-card overflow-hidden transition-shadow hover:shadow-md"
            >
              <div className="aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={nl.imageUrl}
                  alt={nl.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-bold text-foreground truncate">{nl.title}</h3>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground font-ui">
                  <Calendar className="h-3 w-3" />
                  {new Date(nl.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-16 text-muted-foreground font-body">
            No newsletters yet. Upload your first one!
          </div>
        )}
      </main>

      {/* Upload Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Upload Newsletter</DialogTitle>
            <DialogDescription>Upload a PNG image of the monthly newsletter.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <label className="mb-1.5 block font-ui text-xs font-semibold tracking-wider text-muted-foreground">
                TITLE <span className="text-destructive">*</span>
              </label>
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. April 2026 Newsletter"
              />
              {errors.title && <p className="mt-1 text-xs text-destructive">{errors.title}</p>}
            </div>
            <div>
              <label className="mb-1.5 block font-ui text-xs font-semibold tracking-wider text-muted-foreground">
                IMAGE (PNG) <span className="text-destructive">*</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-input bg-background px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground">
                <Upload className="h-4 w-4" />
                {newFile ? newFile.name : "Click to select a PNG image"}
                <input
                  type="file"
                  accept="image/png"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              {errors.file && <p className="mt-1 text-xs text-destructive">{errors.file}</p>}
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mt-2 max-h-48 rounded-md border border-border object-contain"
                />
              )}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpload}>Upload</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Image Dialog */}
      <Dialog open={!!viewImage} onOpenChange={() => setViewImage(null)}>
        <DialogContent className="sm:max-w-[700px]">
          {viewImage && (
            <>
              <DialogHeader>
                <DialogTitle>{viewImage.title}</DialogTitle>
              </DialogHeader>
              <div className="mt-2">
                <img
                  src={viewImage.imageUrl}
                  alt={viewImage.title}
                  className="w-full rounded-md"
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Newsletter;
