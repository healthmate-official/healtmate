import { useRef, useState } from "react";
import { ArrowLeft, Menu, Upload, FileText, Trash2, Eye, Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import useSupabaseTable from "../../hooks/useSupabaseTable";
import ConfirmDialog from "../ConfirmDialog";
import { useToast } from "../../hooks/useToast";

const BUCKET = "medical-reports";

export default function MedicalReports({ onOpenMenu, onNavigate, user }) {
  const { rows: reports, loading, insertRow, deleteRow } = useSupabaseTable("medical_reports", user, {
    orderBy: "uploaded_at",
    ascending: false,
  });
  const [uploading, setUploading] = useState(false);
  const [openingId, setOpeningId] = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const { showToast, ToastElement } = useToast();
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const path = `${user.id}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file);

    if (!uploadError) {
      await insertRow({ name: file.name, report_type: "Uploaded Report", file_url: path });
      showToast(`${file.name} uploaded.`, "success");
    } else {
      showToast("Upload failed: " + uploadError.message);
    }

    setUploading(false);
    e.target.value = "";
  };

  const viewReport = async (report) => {
    if (!report.file_url) return;
    setOpeningId(report.id);
    const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(report.file_url, 60);
    setOpeningId(null);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
    else showToast("Could not open file: " + error?.message);
  };

  const confirmDelete = async () => {
    const report = confirmTarget;
    setConfirmTarget(null);
    if (report.file_url) {
      await supabase.storage.from(BUCKET).remove([report.file_url]);
    }
    const { error } = await deleteRow(report.id);
    showToast(error ? "Couldn't delete report." : `${report.name} deleted.`, error ? "error" : "success");
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
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Medical Reports</h1>
            <p className="text-sm text-slate-500">Keep all your health documents in one place.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Your reports</h2>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-1.5 rounded-full bg-teal-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
            >
              {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
              {uploading ? "Uploading..." : "Upload report"}
            </button>
            <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
          </div>

          {loading ? (
            <p className="py-6 text-center text-sm text-slate-400">Loading...</p>
          ) : (
            <ul className="space-y-2">
              {reports.length === 0 && (
                <p className="py-6 text-center text-sm text-slate-400">No reports uploaded yet.</p>
              )}
              {reports.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50/60 px-3 py-2.5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-500">
                      <FileText size={16} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{r.name}</p>
                      <p className="text-xs text-slate-400">
                        {r.report_type} · {new Date(r.uploaded_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => viewReport(r)}
                      disabled={openingId === r.id}
                      aria-label={`View ${r.name}`}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-teal-50 hover:text-teal-600"
                    >
                      {openingId === r.id ? <Loader2 size={14} className="animate-spin" /> : <Eye size={14} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmTarget(r)}
                      aria-label={`Delete ${r.name}`}
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
