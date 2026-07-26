import { useState } from "react";
import { ArrowLeft, Menu, Pencil, Check, Loader2 } from "lucide-react";

const FIELDS = [
  { key: "fullName", label: "Full name", editable: true },
  { key: "age", label: "Age", editable: true },
  { key: "gender", label: "Gender", editable: true },
  { key: "phone", label: "Phone", editable: true },
  { key: "email", label: "Email", editable: false },
  { key: "allergies", label: "Allergies", editable: true },
  { key: "existingConditions", label: "Existing conditions", editable: true },
];

export default function Profile({ onOpenMenu, onNavigate, profile, onUpdateProfile }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [saving, setSaving] = useState(false);

  const startEdit = () => {
    setDraft(profile);
    setEditing(true);
  };

  const save = async () => {
    setSaving(true);
    await onUpdateProfile(draft);
    setSaving(false);
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f9f8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
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
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Profile</h1>
            <p className="text-sm text-slate-500">Your personal health information.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-500 text-lg font-semibold text-white">
                {profile.fullName?.[0] ?? "U"}
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">{profile.fullName || "Add your name"}</p>
                <p className="text-xs text-teal-600">{profile.plan}</p>
              </div>
            </div>
            {editing ? (
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="flex items-center gap-1.5 rounded-full bg-teal-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                {saving ? "Saving..." : "Save"}
              </button>
            ) : (
              <button
                type="button"
                onClick={startEdit}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                <Pencil size={13} /> Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FIELDS.map(({ key, label, editable }) => (
              <div key={key}>
                <label className="text-xs font-medium text-slate-400">{label}</label>
                {editing && editable ? (
                  <input
                    type="text"
                    value={draft[key] ?? ""}
                    onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                  />
                ) : (
                  <p className="mt-1 text-sm font-medium text-slate-800">{profile[key] || "—"}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
