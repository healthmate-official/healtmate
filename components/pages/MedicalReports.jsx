import { useRef, useState } from "react";
import { ArrowLeft, Menu, Upload, FileText, Trash2 } from "lucide-react";
import { medicalReportsList as initialReports } from "../../data/mockData";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function MedicalReports({ onOpenMenu, onNavigate }) {
  const [reports, setReports] = useLocalStorage("healthmate_reports", initialReports);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    // Mock upload — a real backend would send this file to storage and save the URL.
    setTimeout(() => {
      setReports((prev) => [
        { id: `rep-${Date.now()}`, name: file.name, type: "Uploaded Report", date: new Date().toISOString().slice(0, 10) },
        ...prev,
      ]);
      setUploading(false);
      e.target.value = "";
    }, 700);
  };

  const removeReport = (id) => setReports((prev) => prev.filter((r) => r.id !== id));

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
              <Upload size={14} /> {uploading ? "Uploading..." : "Upload report"}
            </button>
            <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
          </div>

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
                      {r.type} · {r.date}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeReport(r.id)}
                  aria-label={`Delete ${r.name}`}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                >
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
