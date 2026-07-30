import { useState } from "react";
import { ArrowLeft, Menu, Plus, Pill, Trash2, Check, Clock, X as XIcon, Loader2 } from "lucide-react";
import useSupabaseTable from "../../hooks/useSupabaseTable";
import ConfirmDialog from "../ConfirmDialog";
import { useToast } from "../../hooks/useToast";

const STATUS_STYLE = {
  taken: "bg-teal-50 text-teal-600",
  upcoming: "bg-slate-100 text-slate-500",
  missed: "bg-rose-50 text-rose-500",
};

export default function Medicines({ onOpenMenu, onNavigate, user }) {
  const { rows: medicines, loading, insertRow, updateRow, deleteRow } = useSupabaseTable("medicines", user);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ name: "", dosage: "", frequency: "" });
  const [saving, setSaving] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const { showToast, ToastElement } = useToast();

  const taken = medicines.filter((m) => m.status === "taken").length;
  const upcoming = medicines.filter((m) => m.status === "upcoming").length;
  const missed = medicines.filter((m) => m.status === "missed").length;

  const setStatus = (id, status) => updateRow(id, { status });

  const addMedicine = async () => {
    if (!form.name.trim() || !form.dosage.trim() || !form.frequency.trim()) return;
    setSaving(true);
    const { error } = await insertRow({ name: form.name, dosage: form.dosage, frequency: form.frequency, status: "upcoming" });
    setSaving(false);
    if (error) {
      showToast("Couldn't save medicine. Try again.");
      return;
    }
    setForm({ name: "", dosage: "", frequency: "" });
    setFormOpen(false);
    showToast(`${form.name} added.`, "success");
  };

  const confirmDelete = async () => {
    const target = confirmTarget;
    setConfirmTarget(null);
    const { error } = await deleteRow(target.id);
    showToast(error ? "Couldn't delete medicine." : `${target.name} removed.`, error ? "error" : "success");
  };

  return (
    <div className="min-h-screen bg-[#f6f9f8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
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
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Medicines</h1>
            <p className="text-sm text-slate-500">Track doses and never miss a reminder.</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center">
            <p className="text-2xl font-bold text-teal-600">{taken}</p>
            <p className="text-xs text-slate-500">Taken today</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center">
            <p className="text-2xl font-bold text-slate-500">{upcoming}</p>
            <p className="text-xs text-slate-500">Upcoming</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center">
            <p className="text-2xl font-bold text-rose-500">{missed}</p>
            <p className="text-xs text-slate-500">Missed</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">All medicines</h2>
            <button
              type="button"
              onClick={() => setFormOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-full bg-teal-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-teal-700"
            >
              <Plus size={14} /> Add medicine
            </button>
          </div>

          {formOpen && (
            <div className="mb-4 rounded-xl border border-teal-100 bg-teal-50/50 p-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <input
                  type="text"
                  placeholder="Name (e.g. Metformin)"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                />
                <input
                  type="text"
                  placeholder="Dosage (e.g. 500 mg)"
                  value={form.dosage}
                  onChange={(e) => setForm((f) => ({ ...f, dosage: e.target.value }))}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                />
                <input
                  type="text"
                  placeholder="Time (e.g. 8:00 AM)"
                  value={form.frequency}
                  onChange={(e) => setForm((f) => ({ ...f, frequency: e.target.value }))}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                />
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100"
                >
                  <XIcon size={13} /> Cancel
                </button>
                <button
                  type="button"
                  onClick={addMedicine}
                  disabled={saving}
                  className="flex items-center gap-1.5 rounded-full bg-teal-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
                >
                  {saving && <Loader2 size={12} className="animate-spin" />}
                  Save medicine
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <p className="py-6 text-center text-sm text-slate-400">Loading...</p>
          ) : (
            <ul className="space-y-2">
              {medicines.length === 0 && (
                <p className="py-6 text-center text-sm text-slate-400">No medicines added yet.</p>
              )}
              {medicines.map((m) => (
                <li
                  key={m.id}
                  className={`flex flex-wrap items-center justify-between gap-3 rounded-xl px-3 py-2.5 ${
                    m.status === "missed" ? "bg-rose-50/50" : "bg-slate-50/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-500">
                      <Pill size={16} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{m.name}</p>
                      <p className="text-xs text-slate-400">
                        {m.dosage} · {m.frequency}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[m.status]}`}>
                      {m.status === "taken" ? "Taken" : m.status === "missed" ? "Missed" : "Upcoming"}
                    </span>

                    {m.status !== "taken" && (
                      <button
                        type="button"
                        onClick={() => setStatus(m.id, "taken")}
                        className="flex items-center gap-1 rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white hover:bg-teal-700"
                      >
                        <Check size={12} /> Mark taken
                      </button>
                    )}
                    {m.status === "upcoming" && (
                      <button
                        type="button"
                        onClick={() => setStatus(m.id, "missed")}
                        className="flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100"
                      >
                        <Clock size={12} /> Missed
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setConfirmTarget(m)}
                      aria-label={`Delete ${m.name}`}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={!!confirmTarget}
        title={`Delete ${confirmTarget?.name}?`}
        message="This can't be undone."
        onConfirm={confirmDelete}
        onCancel={() => setConfirmTarget(null)}
      />
      {ToastElement}
    </div>
  );
}
