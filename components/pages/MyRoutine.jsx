import { useState } from "react";
import { ArrowLeft, Menu, Plus, Check, Clock, X as XIcon } from "lucide-react";
import { weeklyRoutine } from "../../data/mockData";
import useLocalStorage from "../../hooks/useLocalStorage";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const STATUS_STYLES = {
  done: { badge: "bg-teal-50 text-teal-600", dot: "bg-teal-500", label: "Done" },
  now: { badge: "bg-teal-600 text-white", dot: "bg-teal-500", label: "Now" },
  upcoming: { badge: "bg-slate-100 text-slate-400", dot: "bg-slate-300", label: "Upcoming" },
  missed: { badge: "bg-rose-50 text-rose-500", dot: "bg-rose-400", label: "Missed" },
};

function dayCompletionPct(items) {
  const relevant = items.filter((i) => i.status === "done" || i.status === "missed");
  if (relevant.length === 0) return 0;
  const done = items.filter((i) => i.status === "done").length;
  return Math.round((done / items.length) * 100);
}

export default function MyRoutine({ onOpenMenu, onNavigate }) {
  const [selectedDay, setSelectedDay] = useState("Sun");
  const [routineByDay, setRoutineByDay] = useLocalStorage("healthmate_routine", weeklyRoutine);
  const [addOpen, setAddOpen] = useState(false);
  const [newTask, setNewTask] = useState({ time: "", title: "", detail: "" });

  const items = routineByDay[selectedDay] ?? [];

  const markDone = (id) => {
    setRoutineByDay((prev) => ({
      ...prev,
      [selectedDay]: prev[selectedDay].map((i) => (i.id === id ? { ...i, status: "done" } : i)),
    }));
  };

  const addTask = () => {
    if (!newTask.title.trim() || !newTask.time.trim()) return;
    const id = `${selectedDay}-custom-${Date.now()}`;
    setRoutineByDay((prev) => ({
      ...prev,
      [selectedDay]: [...prev[selectedDay], { id, ...newTask, status: "upcoming" }],
    }));
    setNewTask({ time: "", title: "", detail: "" });
    setAddOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f9f8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate?.("dashboard")}
            aria-label="Back to dashboard"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 lg:hidden"
          >
            <Menu size={18} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">My Routine</h1>
            <p className="text-sm text-slate-500">Plan and track your daily schedule.</p>
          </div>
        </div>

        {/* Day selector */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {DAYS.map((day) => {
            const pct = dayCompletionPct(routineByDay[day] ?? []);
            const isActive = day === selectedDay;
            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`flex shrink-0 flex-col items-center gap-1 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-teal-600 bg-teal-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-teal-200"
                }`}
              >
                {day}
                <span className={`text-[11px] font-normal ${isActive ? "text-teal-50" : "text-slate-400"}`}>
                  {pct}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Routine list card */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">{selectedDay}'s schedule</h2>
              <p className="text-xs text-slate-500">
                {items.length} tasks · {items.filter((i) => i.status === "done").length} completed
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAddOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-full bg-teal-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-teal-700"
            >
              <Plus size={14} /> Add task
            </button>
          </div>

          {addOpen && (
            <div className="mb-4 rounded-xl border border-teal-100 bg-teal-50/50 p-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[110px_1fr]">
                <input
                  type="text"
                  placeholder="Time (e.g. 6:00 AM)"
                  value={newTask.time}
                  onChange={(e) => setNewTask((t) => ({ ...t, time: e.target.value }))}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                />
                <input
                  type="text"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask((t) => ({ ...t, title: e.target.value }))}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                />
              </div>
              <input
                type="text"
                placeholder="Detail (optional)"
                value={newTask.detail}
                onChange={(e) => setNewTask((t) => ({ ...t, detail: e.target.value }))}
                className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
              />
              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddOpen(false)}
                  className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100"
                >
                  <XIcon size={13} /> Cancel
                </button>
                <button
                  type="button"
                  onClick={addTask}
                  className="rounded-full bg-teal-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-teal-700"
                >
                  Save task
                </button>
              </div>
            </div>
          )}

          <ol className="space-y-0">
            {items.length === 0 && (
              <p className="py-6 text-center text-sm text-slate-400">No tasks scheduled for this day yet.</p>
            )}
            {items.map((item, idx) => {
              const style = STATUS_STYLES[item.status] ?? STATUS_STYLES.upcoming;
              return (
                <li key={item.id} className="relative flex gap-3 pb-5 last:pb-0">
                  {idx < items.length - 1 && (
                    <span className="absolute left-[13px] top-7 h-full w-px bg-slate-100" />
                  )}
                  <span className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${style.badge}`}>
                    {item.status === "done" ? <Check size={14} strokeWidth={3} /> : <Clock size={13} />}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                        {item.detail && <p className="text-xs text-slate-400">{item.detail}</p>}
                      </div>
                      <span className="whitespace-nowrap text-xs text-slate-400">{item.time}</span>
                    </div>

                    <div className="mt-1.5 flex items-center gap-2">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${style.badge}`}>
                        {style.label}
                      </span>
                      {(item.status === "upcoming" || item.status === "now") && (
                        <button
                          type="button"
                          onClick={() => markDone(item.id)}
                          className="text-xs font-semibold text-teal-600 hover:underline"
                        >
                          Mark done
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Weekly overview */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <h2 className="mb-4 text-sm font-bold text-slate-900">Weekly overview</h2>
          <div className="grid grid-cols-7 gap-2">
            {DAYS.map((day) => {
              const pct = dayCompletionPct(routineByDay[day] ?? []);
              return (
                <div key={day} className="flex flex-col items-center gap-1.5">
                  <div className="flex h-20 w-full items-end rounded-lg bg-slate-100 sm:h-24">
                    <div
                      className={`w-full rounded-lg ${day === selectedDay ? "bg-teal-600" : "bg-teal-300"}`}
                      style={{ height: `${Math.max(pct, 6)}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-slate-500">{day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
