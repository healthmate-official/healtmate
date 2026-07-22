import { Footprints, Moon, Heart, Droplet, Activity, Wind } from "lucide-react";

const ICONS = {
  footprints: { Icon: Footprints, bg: "bg-orange-50", fg: "text-orange-500", bar: "bg-orange-400" },
  moon: { Icon: Moon, bg: "bg-indigo-50", fg: "text-indigo-500", bar: "bg-indigo-400" },
  heart: { Icon: Heart, bg: "bg-rose-50", fg: "text-rose-500", bar: "bg-rose-400" },
  droplet: { Icon: Droplet, bg: "bg-sky-50", fg: "text-sky-500", bar: "bg-sky-400" },
  activity: { Icon: Activity, bg: "bg-emerald-50", fg: "text-emerald-500", bar: "bg-emerald-400" },
  wind: { Icon: Wind, bg: "bg-teal-50", fg: "text-teal-500", bar: "bg-teal-400" },
};

const NOTE_COLOR = {
  up: "text-emerald-600",
  down: "text-rose-500",
  neutral: "text-slate-400",
};

export default function MetricsGrid({ metrics, title = "Today's metrics", onViewAll }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        <button type="button" onClick={onViewAll} className="text-sm font-medium text-teal-600 hover:underline">
          View all →
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {metrics.map((m) => {
          const cfg = ICONS[m.icon] ?? ICONS.activity;
          const { Icon } = cfg;
          return (
            <div key={m.key} className="rounded-2xl border border-slate-100 bg-white p-4">
              <span className={`flex h-8 w-8 items-center justify-center rounded-full ${cfg.bg} ${cfg.fg}`}>
                <Icon size={16} />
              </span>
              <p className="mt-3 text-xs text-slate-500">{m.label}</p>
              <p className="text-lg font-bold text-slate-900">
                {m.value} <span className="text-xs font-normal text-slate-400">{m.goal}</span>
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full rounded-full ${cfg.bar}`} style={{ width: `${m.pct}%` }} />
              </div>
              <p className={`mt-1.5 text-xs font-medium ${NOTE_COLOR[m.noteType] ?? "text-slate-400"}`}>{m.note}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
