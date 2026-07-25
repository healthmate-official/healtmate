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

import {
  currentUser,
  todayMetrics,
  todaysRoutine,
  medicineReminders,
  upcomingConsultation,
  weeklyProgress,
  wellnessStreak,
  aiInsight,
  aiHealthInsight,
  dailyCompletion,
} from "../data/mockData";

const QUICK_ACTION_ROUTES = {
  "ask-ai": "ai-companion",
  "book-doctor": "find-doctor",
  "add-medicine": "medicines",
  "upload-report": "medical-reports",
  breathing: "wellness",
};

export default function Dashboard({ onOpenMenu, onNavigate }) {
  return (
    <div className="min-h-screen bg-[#f6f9f8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <Topbar user={currentUser} onOpenMenu={onOpenMenu} onNavigate={onNavigate} />

        <HealthScoreCard
          score={82}
          completion={dailyCompletion}
          insight={aiInsight}
          onAskAI={() => onNavigate?.("ai-companion")}
          onViewRoutine={() => onNavigate?.("my-routine")}
        />

        <MetricsGrid metrics={todayMetrics} onViewAll={() => onNavigate?.("health-overview")} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <RoutineTimeline
              items={todaysRoutine}
              onMarkDone={() => onNavigate?.("my-routine")}
              onEdit={() => onNavigate?.("my-routine")}
            />
            <WeeklyProgress data={weeklyProgress} />
            <MedicineReminders
              medicines={medicineReminders}
              onTake={() => onNavigate?.("medicines")}
              onAdd={() => onNavigate?.("medicines")}
            />
          </div>

          <div className="space-y-6">
            <AIHealthInsight
              insight={aiHealthInsight}
              userName={currentUser.name}
              onAction={() => onNavigate?.("ai-companion")}
            />
            <ConsultationCard consultation={upcomingConsultation} onJoin={() => onNavigate?.("find-doctor")} />
            <WellnessStreak streak={wellnessStreak} />
            <QuickActions onAction={(key) => onNavigate?.(QUICK_ACTION_ROUTES[key] ?? "dashboard")} />
          </div>
        </div>
      </div>
    </div>
  );
}
