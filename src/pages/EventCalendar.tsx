import { useState, useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { getEvents, addEvent, type CalendarEvent } from "@/data/events";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const eventTypeColors: Record<string, string> = {
  "office-hour": "bg-primary/80 text-primary-foreground",
  workshop: "bg-accent text-accent-foreground",
  webinar: "bg-emerald-500 text-white",
  conference: "bg-amber-500 text-white",
  other: "bg-muted-foreground/60 text-white",
};

const EventCalendar = () => {
  const [events, setEvents] = useState(getEvents());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newType, setNewType] = useState<CalendarEvent["type"]>("other");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = useMemo(() => {
    const result: Date[] = [];
    let day = calStart;
    while (day <= calEnd) {
      result.push(day);
      day = addDays(day, 1);
    }
    return result;
  }, [currentMonth]);

  const eventsMap = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    events.forEach((e) => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    return map;
  }, [events]);

  const handleAddEvent = () => {
    const errs: Record<string, string> = {};
    if (!newTitle.trim()) errs.title = "Title is required.";
    if (!selectedDate) errs.date = "Date is required.";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const event: CalendarEvent = {
      id: `e-${Date.now()}`,
      title: newTitle.trim(),
      date: selectedDate,
      description: newDescription.trim() || undefined,
      type: newType,
    };
    addEvent(event);
    setEvents(getEvents());
    setNewTitle("");
    setNewDescription("");
    setNewType("other");
    setSelectedDate("");
    setErrors({});
    setDialogOpen(false);
  };

  const openAddDialog = (dateStr?: string) => {
    setSelectedDate(dateStr || "");
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-3 py-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Event Calendar
            </h1>
            <p className="mt-1 text-sm text-muted-foreground font-body">
              AI-related events, workshops, and office hours.
            </p>
          </div>
          <Button
            onClick={() => openAddDialog()}
            className="rounded-lg px-5 py-2.5 font-ui text-sm font-semibold"
          >
            <Plus className="mr-1 h-4 w-4" />
            New Event
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-3 py-5 space-y-4">
        {/* Month nav */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h2 className="text-xl font-bold text-foreground">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-xs font-ui">
          {Object.entries({ "office-hour": "Office Hour", workshop: "Workshop", webinar: "Webinar", conference: "Conference", other: "Other" }).map(
            ([key, label]) => (
              <span key={key} className="flex items-center gap-1.5">
                <span className={`inline-block h-2.5 w-2.5 rounded-full ${eventTypeColors[key]}`} />
                {label}
              </span>
            )
          )}
        </div>

        {/* Calendar Grid */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-border">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div
                key={d}
                className="px-2 py-2 text-center font-ui text-xs font-semibold tracking-wider text-muted-foreground"
              >
                {d}
              </div>
            ))}
          </div>
          {/* Day cells */}
          <div className="grid grid-cols-7">
            {days.map((day, i) => {
              const dateStr = format(day, "yyyy-MM-dd");
              const dayEvents = eventsMap[dateStr] || [];
              const isToday = isSameDay(day, new Date());
              const inMonth = isSameMonth(day, currentMonth);
              return (
                <div
                  key={i}
                  onClick={() => openAddDialog(dateStr)}
                  className={`min-h-[100px] border-b border-r border-border p-1.5 cursor-pointer transition-colors hover:bg-secondary/50 ${
                    !inMonth ? "bg-muted/30" : ""
                  }`}
                >
                  <div
                    className={`mb-1 text-right font-ui text-xs font-medium ${
                      isToday
                        ? "inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground float-right"
                        : inMonth
                        ? "text-foreground"
                        : "text-muted-foreground/50"
                    }`}
                  >
                    {format(day, "d")}
                  </div>
                  <div className="clear-both space-y-0.5">
                    {dayEvents.slice(0, 3).map((ev) => (
                      <div
                        key={ev.id}
                        className={`truncate rounded px-1.5 py-0.5 text-[10px] font-ui font-medium ${eventTypeColors[ev.type]}`}
                        title={ev.title}
                      >
                        {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="px-1.5 text-[10px] font-ui text-muted-foreground">
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Add Event Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Create an AI-related event on the calendar.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <label className="mb-1.5 block font-ui text-xs font-semibold tracking-wider text-muted-foreground">
                EVENT TITLE <span className="text-destructive">*</span>
              </label>
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Copilot Workshop"
              />
              {errors.title && <p className="mt-1 text-xs text-destructive">{errors.title}</p>}
            </div>
            <div>
              <label className="mb-1.5 block font-ui text-xs font-semibold tracking-wider text-muted-foreground">
                DATE <span className="text-destructive">*</span>
              </label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              {errors.date && <p className="mt-1 text-xs text-destructive">{errors.date}</p>}
            </div>
            <div>
              <label className="mb-1.5 block font-ui text-xs font-semibold tracking-wider text-muted-foreground">
                EVENT TYPE
              </label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as CalendarEvent["type"])}
                className="w-full rounded-md border border-input bg-background px-3 py-2 font-ui text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="office-hour">Office Hour</option>
                <option value="workshop">Workshop</option>
                <option value="webinar">Webinar</option>
                <option value="conference">Conference</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block font-ui text-xs font-semibold tracking-wider text-muted-foreground">
                DESCRIPTION
              </label>
              <Textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Optional description..."
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEvent}>Add Event</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventCalendar;
