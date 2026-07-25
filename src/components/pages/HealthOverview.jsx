import { Menu } from "lucide-react";
import { todayMetrics, weeklyProgress } from "../../data/mockData";
import WeeklyProgress from "../dashboard/WeeklyProgress";
import MetricsGrid from "../dashboard/MetricsGrid";

export default function HealthOverview({ onOpenMenu }) {
  return (
    <div className="min-h-screen bg-[#f6f9f8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 lg:hidden"
          >
            <Menu size={18} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Health Overview</h1>
            <p className="text-sm text-slate-500">Your full health trends at a glance.</p>
          </div>
        </div>

        <MetricsGrid metrics={todayMetrics} title="Today's readings" />
        <WeeklyProgress data={weeklyProgress} />

        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <h2 className="mb-3 text-sm font-bold text-slate-900">Summary</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Your overall health score is <span className="font-semibold text-teal-600">82/100</span>, up 8% from
            last week. Steps and hydration trended upward, sleep quality stayed consistent, and heart rate stayed
            within normal range all week. Keep prioritizing your morning walk and consistent sleep schedule.
          </p>
        </div>
      </div>
    </div>
  );
}
