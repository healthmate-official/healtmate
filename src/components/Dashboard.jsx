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

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f6f9f8] p-6 lg:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <Topbar user={currentUser} />

        <HealthScoreCard
          score={82}
          completion={dailyCompletion}
          insight={aiInsight}
          onAskAI={() => {}}
          onViewRoutine={() => {}}
        />

        <MetricsGrid metrics={todayMetrics} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <RoutineTimeline items={todaysRoutine} onMarkDone={() => {}} onEdit={() => {}} />
            <WeeklyProgress data={weeklyProgress} />
            <MedicineReminders medicines={medicineReminders} onTake={() => {}} onAdd={() => {}} />
          </div>

          <div className="space-y-6">
            <AIHealthInsight insight={aiHealthInsight} userName={currentUser.name} onAction={() => {}} />
            <ConsultationCard consultation={upcomingConsultation} onJoin={() => {}} />
            <WellnessStreak streak={wellnessStreak} />
            <QuickActions onAction={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}
