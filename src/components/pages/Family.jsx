import { useState } from "react";
import { ArrowLeft, Menu, Plus, Users, Trash2, X as XIcon, Loader2 } from "lucide-react";
import useSupabaseTable from "../../hooks/useSupabaseTable";
import ConfirmDialog from "../ConfirmDialog";
import { useToast } from "../../hooks/useToast";

export default function Family({ onOpenMenu, onNavigate, user }) {
  const { rows: members, loading, insertRow, deleteRow } = useSupabaseTable("family_members", user);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ name: "", relation: "", age: "" });
  const [saving, setSaving] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const { showToast, ToastElement } = useToast();

  const addMember = async () => {
    if (!form.name.trim() || !form.relation.trim()) return;
    setSaving(true);
    const { error } = await insertRow({ name: form.name, relation: form.relation, age: form.age ? Number(form.age) : null });
    setSaving(false);
    if (error) {
      showToast("Couldn't save family member. Try again.");
      return;
    }
    setForm({ name: "", relation: "", age: "" });
    setFormOpen(false);
    showToast(`${form.name} added.`, "success");
  };

  const confirmDelete = async () => {
    const target = confirmTarget;
    setConfirmTarget(null);
    const { error } = await deleteRow(target.id);
    showToast(error ? "Couldn't remove family member." : `${target.name} removed.`, error ? "error" : "success");
  };

  return (
    <div className="min-h-screen bg-[#f6f9f8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
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
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Family</h1>
            <p className="text-sm text-slate-500">Manage health profiles for your family.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Family members</h2>
            <button
              type="button"
              onClick={() => setFormOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-full bg-teal-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-teal-700"
            >
              <Plus size={14} /> Add member
            </button>
          </div>

          {formOpen && (
            <div className="mb-4 rounded-xl border border-teal-100 bg-teal-50/50 p-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30" />
                <input type="text" placeholder="Relation (e.g. Son)" value={form.relation} onChange={(e) => setForm((f) => ({ ...f, relation: e.target.value }))} className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30" />
                <input type="number" placeholder="Age" value={form.age} onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))} className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30" />
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setFormOpen(false)} className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100"><XIcon size={13} /> Cancel</button>
                <button type="button" onClick={addMember} disabled={saving} className="flex items-center gap-1.5 rounded-full bg-teal-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-teal-700 disabled:opacity-60">
                  {saving && <Loader2 size={12} className="animate-spin" />} Save member
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <p className="py-6 text-center text-sm text-slate-400">Loading...</p>
          ) : (
            <ul className="space-y-2">
              {members.length === 0 && <p className="py-6 text-center text-sm text-slate-400">No family members added yet.</p>}
              {members.map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50/60 px-3 py-2.5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-500">
                      <Users size={16} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{m.name}</p>
                      <p className="text-xs text-slate-400">{m.relation}{m.age ? ` · ${m.age} yrs` : ""}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setConfirmTarget(m)} aria-label={`Remove ${m.name}`} className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-500">
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={!!confirmTarget}
        title={`Remove ${confirmTarget?.name}?`}
        message="This can't be undone."
        confirmLabel="Remove"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmTarget(null)}
      />
      {ToastElement}
    </div>
  );
}
