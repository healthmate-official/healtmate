import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import Topbar from "./dashboard/Topbar";
import HealthScoreCard from "./dashboard/HealthScoreCard";
import MetricsGrid from "./dashboard/MetricsGrid";
import RoutineTimeline from "./dashboard/RoutineTimeline";
import AIHealthInsight from "./dashboard/AIHealthInsight";
import ConsultationCard from "./dashboard/ConsultationCard";
import WellnessStreak from "./dashboard/WellnessStreak";
import WeeklyProgress from "./dashboard/WeeklyProgress";
import MedicineReminders from "./dashboard/MedicineReminders";
import QuickActions from "./dashboard/QuickActions";

import useSupabaseTable from "../hooks/useSupabaseTable";
import useHealthMetrics from "../hooks/useHealthMetrics";
import { supabase } from "../lib/supabaseClient";
import { buildMetricsGrid, buildWeeklyProgressData, buildStreakData } from "../utils/metrics";
import { aiInsight, aiHealthInsight } from "../data/mockData";

const QUICK_ACTION_ROUTES = {
  "ask-ai": "ai-companion",
  "book-doctor": "find-doctor",
  "add-medicine": "medicines",
  "upload-report": "medical-reports",
  breathing: "wellness",
};

const TODAY_NAME = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date().getDay()];

export default function Dashboard({ onOpenMenu, onNavigate, profile, user }) {
  const { rows: allRoutines } = useSupabaseTable("routines", user, { orderBy: "time" });
  const { rows: medicines } = useSupabaseTable("medicines", user);
  const { today: todayMetricsRow, weekRows } = useHealthMetrics(user);
  const [consultation, setConsultation] = useState(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("consultations")
      .select("*, doctors(*)")
      .eq("user_id", user.id)
      .order("scheduled_time", { ascending: true })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => setConsultation(data));
  }, [user]);

  const todaysRoutine = allRoutines.filter((r) => r.day_of_week === TODAY_NAME);
  const doneCount = todaysRoutine.filter((r) => r.status === "done").length;
  const dailyCompletion = {
    done: doneCount,
    total: todaysRoutine.length,
    pct: todaysRoutine.length ? Math.round((doneCount / todaysRoutine.length) * 100) : 0,
  };

  const metrics = buildMetricsGrid(todayMetricsRow);
  const weeklyProgress = buildWeeklyProgressData(weekRows);
  const wellnessStreak = buildStreakData(weekRows);
  const isNewUser = allRoutines.length === 0 && medicines.length === 0 && weekRows.length === 0;

  const consultationForCard = consultation
    ? {
        doctor: {
          name: consultation.doctors?.name ?? "Doctor",
          specialization: consultation.doctors?.specialization,
          clinic: consultation.doctors?.clinic,
          rating: consultation.doctors?.rating,
          reviews: consultation.doctors?.reviews,
        },
        scheduledTime: consultation.scheduled_time
          ? new Date(consultation.scheduled_time).toLocaleString()
          : "Not scheduled yet",
        type: consultation.type,
        duration: "30 min",
        countdown: consultation.status,
      }
    : null;

  return (
    <div className="min-h-screen bg-[#f6f9f8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <Topbar user={profile} onOpenMenu={onOpenMenu} onNavigate={onNavigate} />

        {isNewUser && (
          <div className="rounded-2xl border border-teal-100 bg-teal-50/60 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white">
                <Sparkles size={16} />
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900">Welcome to HealthMate!</p>
                <p className="mt-0.5 text-sm text-slate-600">
                  Your dashboard is empty right now — add a few things to see it come to life.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigate?.("medicines")}
                    className="rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-teal-700 shadow-sm hover:bg-teal-50"
                  >
                    Add a medicine
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate?.("my-routine")}
                    className="rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-teal-700 shadow-sm hover:bg-teal-50"
                  >
                    Set up your routine
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate?.("health-overview")}
                    className="rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-teal-700 shadow-sm hover:bg-teal-50"
                  >
                    Log today's stats
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <HealthScoreCard
          score={weeklyProgress.current || dailyCompletion.pct}
          completion={dailyCompletion}
          insight={aiInsight}
          onAskAI={() => onNavigate?.("ai-companion")}
          onViewRoutine={() => onNavigate?.("my-routine")}
        />

        <MetricsGrid metrics={metrics} onViewAll={() => onNavigate?.("health-overview")} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <RoutineTimeline
              items={todaysRoutine}
              onMarkDone={() => onNavigate?.("my-routine")}
              onEdit={() => onNavigate?.("my-routine")}
            />
            <WeeklyProgress data={weeklyProgress} />
            <MedicineReminders
              medicines={medicines}
              onTake={() => onNavigate?.("medicines")}
              onAdd={() => onNavigate?.("medicines")}
            />
          </div>

          <div className="space-y-6">
            <AIHealthInsight
              insight={aiHealthInsight}
              userName={profile?.name}
              onAction={() => onNavigate?.("ai-companion")}
            />
            {consultationForCard ? (
              <ConsultationCard consultation={consultationForCard} onJoin={() => onNavigate?.("find-doctor")} />
            ) : (
              <div className="rounded-2xl border border-slate-100 bg-white p-5 text-center">
                <h2 className="mb-1 text-sm font-bold text-slate-900">Upcoming consultation</h2>
                <p className="mb-3 text-xs text-slate-400">No consultations booked yet.</p>
                <button
                  type="button"
                  onClick={() => onNavigate?.("find-doctor")}
                  className="rounded-full bg-teal-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-teal-700"
                >
                  Find a doctor
                </button>
              </div>
            )}
            <WellnessStreak streak={wellnessStreak} />
            <QuickActions onAction={(key) => onNavigate?.(QUICK_ACTION_ROUTES[key] ?? "dashboard")} />
          </div>
        </div>
      </div>
    </div>
  );
}
