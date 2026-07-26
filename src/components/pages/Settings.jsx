import { ArrowLeft, Menu, Bell, Pill as PillIcon, FileBarChart, Moon, Ruler, LogOut } from "lucide-react";
import { defaultSettings } from "../../data/mockData";
import useLocalStorage from "../../hooks/useLocalStorage";

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-teal-600" : "bg-slate-200"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

const ROWS = [
  { key: "notifications", label: "Push notifications", desc: "General app alerts and updates", icon: Bell },
  { key: "medicineReminders", label: "Medicine reminders", desc: "Get notified when it's time to take a dose", icon: PillIcon },
  { key: "weeklyReport", label: "Weekly health report", desc: "Receive a summary every Sunday", icon: FileBarChart },
  { key: "darkMode", label: "Dark mode", desc: "Switch to a darker color theme", icon: Moon },
];

export default function Settings({ onOpenMenu, onNavigate, user, signOut }) {
  const [settings, setSettings] = useLocalStorage("healthmate_settings", defaultSettings);

  const setKey = (key, value) => setSettings((prev) => ({ ...prev, [key]: value }));

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
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Settings</h1>
            <p className="text-sm text-slate-500">Manage notifications and preferences.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <h2 className="mb-4 text-sm font-bold text-slate-900">Notifications</h2>
          <div className="divide-y divide-slate-100">
            {ROWS.map(({ key, label, desc, icon: Icon }) => (
              <div key={key} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                    <Icon size={16} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{label}</p>
                    <p className="text-xs text-slate-400">{desc}</p>
                  </div>
                </div>
                <Toggle checked={settings[key]} onChange={(v) => setKey(key, v)} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <h2 className="mb-4 text-sm font-bold text-slate-900">Preferences</h2>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                <Ruler size={16} />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">Units</p>
                <p className="text-xs text-slate-400">Metric (kg, cm, L) or Imperial (lb, ft, gal)</p>
              </div>
            </div>
            <select
              value={settings.units}
              onChange={(e) => setKey("units", e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            >
              <option>Metric</option>
              <option>Imperial</option>
            </select>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <h2 className="mb-4 text-sm font-bold text-slate-900">Account</h2>
          <p className="mb-3 text-sm text-slate-600">
            Logged in as <span className="font-semibold text-slate-900">{user?.email}</span>
          </p>
          <button
            type="button"
            onClick={() => signOut?.()}
            className="flex items-center gap-2 rounded-xl border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-500 hover:bg-rose-50"
          >
            <LogOut size={15} /> Log out
          </button>
        </div>
      </div>
    </div>
  );
}
