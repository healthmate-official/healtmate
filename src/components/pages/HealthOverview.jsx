import { useState } from "react";
import { ArrowLeft, Menu, Pencil } from "lucide-react";
import useHealthMetrics from "../../hooks/useHealthMetrics";
import { buildMetricsGrid, buildWeeklyProgressData } from "../../utils/metrics";
import WeeklyProgress from "../dashboard/WeeklyProgress";
import MetricsGrid from "../dashboard/MetricsGrid";
import LogMetricsForm from "../dashboard/LogMetricsForm";

export default function HealthOverview({ onOpenMenu, onNavigate, user }) {
  const { today, weekRows, loading, logToday } = useHealthMetrics(user);
  const [formOpen, setFormOpen] = useState(false);

  const metrics = buildMetricsGrid(today);
  const weekly = buildWeeklyProgressData(weekRows);
  const daysLogged = weekRows.length;

  return (
    <div className="min-h-screen bg-[#f6f9f8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
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
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Health Overview</h1>
            <p className="text-sm text-slate-500">Your real logged health trends.</p>
          </div>
          <button
            type="button"
            onClick={() => setFormOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-full bg-teal-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-teal-700"
          >
            <Pencil size={13} /> Log today
          </button>
        </div>

        {formOpen && (
          <LogMetricsForm today={today} onSave={logToday} onClose={() => setFormOpen(false)} />
        )}

        {loading ? (
          <p className="py-10 text-center text-sm text-slate-400">Loading...</p>
        ) : (
          <>
            <MetricsGrid metrics={metrics} title="Today's readings" />
            <WeeklyProgress data={weekly} />

            <div className="rounded-2xl border border-slate-100 bg-white p-5">
              <h2 className="mb-3 text-sm font-bold text-slate-900">Summary</h2>
              {daysLogged === 0 ? (
                <p className="text-sm leading-relaxed text-slate-600">
                  No metrics logged yet this week. Click "Log today" above to start tracking your steps, sleep,
                  heart rate, hydration, activity, and breathing sessions — your trend chart fills in as you go.
                </p>
              ) : (
                <p className="text-sm leading-relaxed text-slate-600">
                  You've logged data on <span className="font-semibold text-teal-600">{daysLogged} of the last 7 days</span>.
                  Today's score is <span className="font-semibold text-teal-600">{weekly.current}/100</span>, based on
                  how close you are to your daily goals. Log consistently to build a real weekly trend.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
