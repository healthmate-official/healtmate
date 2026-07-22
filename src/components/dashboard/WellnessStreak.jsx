import { Flame, Check } from "lucide-react";

export default function WellnessStreak({ streak }) {
  const allDone = streak.week.every((d) => d.done);
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-900">Wellness streak</h2>
        <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-600">
          <Flame size={12} fill="currentColor" /> {streak.days} days
        </span>
      </div>

      <div className="flex justify-between gap-1.5">
        {streak.week.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold ${
                d.done ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-400"
              }`}
            >
              {d.done ? <Check size={14} strokeWidth={3} /> : d.label}
            </span>
            <span className="text-[11px] text-slate-400">{d.label}</span>
          </div>
        ))}
      </div>

      {allDone && (
        <div className="mt-4 rounded-xl bg-amber-50 px-4 py-2.5 text-center">
          <p className="text-sm font-semibold text-amber-700">Perfect week!</p>
          <p className="text-xs text-amber-600">You completed all 7 days. Keep it up!</p>
        </div>
      )}
    </div>
  );
}
