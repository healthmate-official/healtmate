import { ArrowLeft, Menu, Wind, Play, Check } from "lucide-react";
import { wellnessActivities, wellnessStreak } from "../../data/mockData";
import useLocalStorage from "../../hooks/useLocalStorage";
import WellnessStreak from "../dashboard/WellnessStreak";

export default function Wellness({ onOpenMenu, onNavigate }) {
  const [completed, setCompleted] = useLocalStorage("healthmate_wellness_completed", []);

  const toggleComplete = (id) => {
    setCompleted((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  return (
    <div className="min-h-screen bg-[#f6f9f8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
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
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Wellness</h1>
            <p className="text-sm text-slate-500">Short activities for mind and body.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-2">
            {wellnessActivities.map((a) => {
              const isDone = completed.includes(a.id);
              return (
                <div key={a.id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                      <Wind size={17} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{a.title}</p>
                      <p className="text-xs text-slate-400">{a.duration} · {a.description}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleComplete(a.id)}
                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                      isDone ? "bg-teal-50 text-teal-600" : "bg-teal-600 text-white hover:bg-teal-700"
                    }`}
                  >
                    {isDone ? <Check size={13} /> : <Play size={13} />}
                    {isDone ? "Done" : "Start"}
                  </button>
                </div>
              );
            })}
          </div>

          <WellnessStreak streak={wellnessStreak} />
        </div>
      </div>
    </div>
  );
}
