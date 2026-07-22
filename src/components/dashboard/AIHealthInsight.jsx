import { BrainCircuit } from "lucide-react";

export default function AIHealthInsight({ insight, userName, onAction }) {
  return (
    <div className="rounded-2xl border border-teal-100 bg-teal-50/60 p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-white">
          <BrainCircuit size={16} />
        </span>
        <div>
          <p className="text-sm font-bold text-slate-900">AI health insight</p>
          <p className="text-xs text-teal-600">Personalized for {userName}</p>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-600">{insight.body}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {insight.actions.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => onAction?.(label)}
            className="rounded-full border border-teal-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-teal-700 hover:bg-teal-50"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
