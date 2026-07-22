import { Bot, Stethoscope, Plus, Upload, Wind } from "lucide-react";

const ACTIONS = [
  { key: "ask-ai", label: "Ask AI", icon: Bot, cls: "bg-teal-600 hover:bg-teal-700" },
  { key: "book-doctor", label: "Book doctor", icon: Stethoscope, cls: "bg-blue-600 hover:bg-blue-700" },
  { key: "add-medicine", label: "Add medicine", icon: Plus, cls: "bg-emerald-600 hover:bg-emerald-700" },
  { key: "upload-report", label: "Upload report", icon: Upload, cls: "bg-violet-600 hover:bg-violet-700" },
  { key: "breathing", label: "Breathing", icon: Wind, cls: "bg-sky-500 hover:bg-sky-600" },
];

export default function QuickActions({ onAction }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5">
      <h2 className="mb-4 text-sm font-bold text-slate-900">Quick actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {ACTIONS.map(({ key, label, icon: Icon, cls }) => (
          <button
            key={key}
            type="button"
            onClick={() => onAction?.(key)}
            className={`flex flex-col items-center justify-center gap-2 rounded-xl py-6 text-sm font-semibold text-white ${cls}`}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
