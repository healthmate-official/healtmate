import { Check, Utensils, Moon } from "lucide-react";

const STATUS_BADGE = {
  done: "bg-teal-50 text-teal-600",
  now: "bg-teal-600 text-white",
  upcoming: "bg-slate-100 text-slate-400",
  missed: "bg-rose-50 text-rose-500",
};

function StepIcon({ status, title }) {
  if (status === "done") {
    return (
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-100 text-teal-600">
        <Check size={14} strokeWidth={3} />
      </span>
    );
  }
  const isMeal = /breakfast|lunch|dinner/i.test(title);
  const isSleep = /sleep/i.test(title);
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-400">
      {isSleep ? <Moon size={14} /> : isMeal ? <Utensils size={14} /> : <span className="h-2 w-2 rounded-full bg-current" />}
    </span>
  );
}

export default function RoutineTimeline({ items, onMarkDone, onEdit }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">Today's routine</h2>
          <p className="text-xs text-slate-500">
            {items.length} tasks · {items.filter((i) => i.status === "done").length} completed ·{" "}
            {items.filter((i) => i.status === "now").length} in progress
          </p>
        </div>
        <button type="button" onClick={onEdit} className="text-sm font-medium text-teal-600 hover:underline">
          Edit →
        </button>
      </div>

      <ol className="relative space-y-0">
        {items.map((item, idx) => (
          <li key={item.id} className="relative flex gap-3 pb-5 last:pb-0">
            {idx < items.length - 1 && (
              <span className="absolute left-[13px] top-7 h-full w-px bg-slate-100" />
            )}
            <StepIcon status={item.status} title={item.title} />
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className={`text-sm font-semibold ${item.status === "upcoming" ? "text-slate-400" : "text-slate-900"}`}>
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-400">{item.detail}</p>
                </div>
                <span className="whitespace-nowrap text-xs text-slate-400">{item.time}</span>
              </div>

              {item.status === "now" ? (
                <button
                  type="button"
                  onClick={() => onMarkDone?.(item.id)}
                  className="mt-2 rounded-full bg-teal-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-teal-700"
                >
                  Mark done
                </button>
              ) : (
                <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_BADGE[item.status]}`}>
                  {item.status === "done" ? "Done" : "Upcoming"}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
