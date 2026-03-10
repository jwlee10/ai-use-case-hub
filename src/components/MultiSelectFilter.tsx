import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";

interface MultiSelectFilterProps {
  label: string;
  selected: string[];
  onChange: (values: string[]) => void;
  options: string[];
}

const MultiSelectFilter = ({ label, selected, onChange, options }: MultiSelectFilterProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const allSelected = selected.length === 0;

  const toggle = (option: string) => {
    if (option === "All") {
      onChange([]);
      return;
    }
    const next = selected.includes(option)
      ? selected.filter((s) => s !== option)
      : [...selected, option];
    onChange(next);
  };

  const displayText = allSelected
    ? "All"
    : selected.length === 1
      ? selected[0]
      : `${selected.length} selected`;

  return (
    <div className="min-w-[160px] relative" ref={ref}>
      <label className="mb-1.5 block font-ui text-xs font-semibold tracking-wider text-muted-foreground">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md border border-foreground/20 bg-card px-3 py-2 font-ui text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <span className="truncate">{displayText}</span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-card shadow-lg max-h-60 overflow-auto">
          <button
            type="button"
            onClick={() => toggle("All")}
            className={`flex w-full items-center gap-2 px-3 py-2 text-left font-ui text-sm transition-colors hover:bg-secondary ${allSelected ? "text-primary font-semibold" : "text-foreground"}`}
          >
            <span className={`flex h-4 w-4 items-center justify-center rounded border ${allSelected ? "border-primary bg-primary" : "border-muted-foreground/40"}`}>
              {allSelected && <Check className="h-3 w-3 text-primary-foreground" />}
            </span>
            All
          </button>
          {options.map((option) => {
            const checked = selected.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggle(option)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left font-ui text-sm transition-colors hover:bg-secondary ${checked ? "text-primary font-semibold" : "text-foreground"}`}
              >
                <span className={`flex h-4 w-4 items-center justify-center rounded border ${checked ? "border-primary bg-primary" : "border-muted-foreground/40"}`}>
                  {checked && <Check className="h-3 w-3 text-primary-foreground" />}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiSelectFilter;
