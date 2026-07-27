import { useState } from "react";
import { Loader2 } from "lucide-react";

const FIELDS = [
  { key: "steps", label: "Steps", placeholder: "e.g. 8234" },
  { key: "sleep_hours", label: "Sleep (hours)", placeholder: "e.g. 7.5" },
  { key: "heart_rate", label: "Heart rate (bpm)", placeholder: "e.g. 72" },
  { key: "hydration_liters", label: "Hydration (L)", placeholder: "e.g. 1.8" },
  { key: "activity_minutes", label: "Activity (min)", placeholder: "e.g. 42" },
  { key: "breathing_sessions", label: "Breathing sessions", placeholder: "e.g. 3" },
];

export default function LogMetricsForm({ today, onSave, onClose }) {
  const [form, setForm] = useState({
    steps: today?.steps ?? "",
    sleep_hours: today?.sleep_hours ?? "",
    heart_rate: today?.heart_rate ?? "",
    hydration_liters: today?.hydration_liters ?? "",
    activity_minutes: today?.activity_minutes ?? "",
    breathing_sessions: today?.breathing_sessions ?? "",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const numeric = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, v === "" ? null : Number(v)])
    );
    await onSave(numeric);
    setSaving(false);
    onClose();
  };

  return (
    <div className="rounded-xl border border-teal-100 bg-teal-50/50 p-4">
      <p className="mb-3 text-xs font-semibold text-slate-500">Log today's numbers manually below.</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {FIELDS.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="text-xs font-medium text-slate-500">{label}</label>
            <input
              type="number"
              step="any"
              placeholder={placeholder}
              value={form[key]}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1.5 rounded-full bg-teal-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
        >
          {saving && <Loader2 size={12} className="animate-spin" />} Save today's stats
        </button>
      </div>
    </div>
  );
}
