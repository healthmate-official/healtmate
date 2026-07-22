import { Bot, CalendarCheck, BrainCircuit } from "lucide-react";

function CircularScore({ score, max = 100 }) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / max) * circumference;

  return (
    <div className="relative flex h-32 w-32 items-center justify-center">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold text-white">{score}</span>
        <span className="text-xs text-teal-50">/ {max}</span>
      </div>
    </div>
  );
}

export default function HealthScoreCard({ score, completion, insight, onAskAI, onViewRoutine }) {
  return (
    <div className="grid grid-cols-1 gap-6 rounded-2xl bg-gradient-to-br from-teal-600 to-teal-700 p-6 text-white sm:grid-cols-[auto_1fr] sm:items-center">
      <div className="flex items-center gap-6">
        <CircularScore score={score} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-100">
            Your health plan for today
          </p>
          <p className="text-xl font-bold">Health Score</p>
          <p className="mt-0.5 text-sm text-teal-50">↑ 8% better than last week</p>

          <div className="mt-3 w-48">
            <div className="mb-1 flex items-center justify-between text-xs text-teal-50">
              <span>Daily completion</span>
              <span>{completion.pct}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/25">
              <div className="h-full rounded-full bg-white" style={{ width: `${completion.pct}%` }} />
            </div>
            <p className="mt-1 text-xs text-teal-100">
              {completion.done} of {completion.total} tasks completed
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white/10 p-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-teal-50">
          <BrainCircuit size={14} />
          AI insight
        </div>
        <p className="mt-2 text-sm leading-relaxed text-white">
          <span className="font-semibold">{insight.title}</span> {insight.body}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onAskAI}
            className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-teal-700 hover:bg-teal-50"
          >
            <Bot size={15} /> Ask AI
          </button>
          <button
            type="button"
            onClick={onViewRoutine}
            className="flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white hover:bg-white/25"
          >
            <CalendarCheck size={15} /> View routine
          </button>
        </div>
      </div>
    </div>
  );
}
