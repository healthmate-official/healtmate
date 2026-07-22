import { Pill, Sun, Fish, Clock } from "lucide-react";

const ICONS = {
  metformin: Pill,
  "vitamin d3": Sun,
  lisinopril: Pill,
  "omega-3": Fish,
};

const STATUS = {
  taken: { label: "Taken", cls: "bg-teal-50 text-teal-600" },
  upcoming: { label: "Upcoming", cls: "bg-slate-100 text-slate-500" },
  missed: { label: "Missed", cls: "bg-rose-50 text-rose-500" },
};

export default function MedicineReminders({ medicines, onTake, onAdd }) {
  const taken = medicines.filter((m) => m.status === "taken").length;
  const upcoming = medicines.filter((m) => m.status === "upcoming").length;
  const missed = medicines.filter((m) => m.status === "missed").length;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Medicine reminders</h2>
          <p className="text-xs text-slate-400">
            {taken} taken · {upcoming} upcoming · {missed} missed
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-full border border-teal-200 px-3 py-1 text-xs font-semibold text-teal-600 hover:bg-teal-50"
        >
          + Add
        </button>
      </div>

      <ul className="space-y-2">
        {medicines.map((m) => {
          const Icon = ICONS[m.name.toLowerCase()] ?? Pill;
          const isMissed = m.status === "missed";
          const status = STATUS[m.status];
          return (
            <li
              key={m.id}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 ${
                isMissed ? "bg-rose-50/50" : "bg-slate-50/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-500">
                  <Icon size={16} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{m.name}</p>
                  <p className="text-xs text-slate-400">
                    {m.dosage} · {m.frequency}
                  </p>
                </div>
              </div>

              {m.status === "taken" ? (
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${status.cls}`}>{status.label}</span>
              ) : (
                <div className="flex items-center gap-2">
                  {m.status === "upcoming" && (
                    <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                      <Clock size={11} /> Upcoming
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => onTake?.(m.id)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                      isMissed ? "bg-rose-500 hover:bg-rose-600" : "bg-teal-600 hover:bg-teal-700"
                    }`}
                  >
                    {isMissed ? "Take now" : "Take"}
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
