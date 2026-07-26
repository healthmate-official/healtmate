import {
  LayoutGrid,
  Bot,
  CalendarClock,
  Activity,
  Pill,
  FileText,
  Stethoscope,
  Sparkles,
  Users,
  CreditCard,
  Settings,
  HeartPulse,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { key: "ai-companion", label: "AI Companion", icon: Bot },
  { key: "my-routine", label: "My Routine", icon: CalendarClock },
  { key: "health-overview", label: "Health Overview", icon: Activity },
  { key: "medicines", label: "Medicines", icon: Pill },
  { key: "medical-reports", label: "Medical Reports", icon: FileText },
  { key: "find-doctor", label: "Find a Doctor", icon: Stethoscope },
  { key: "wellness", label: "Wellness", icon: Sparkles },
  { key: "family", label: "Family", icon: Users },
  { key: "payments", label: "Payments", icon: CreditCard },
  { key: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ active = "dashboard", onNavigate, profile, open, onClose }) {
  const handleNavigate = (key) => {
    onNavigate?.(key);
    onClose?.(); // auto-close drawer on mobile after picking a page
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col border-r border-slate-100 bg-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white">
              <HeartPulse size={18} />
            </span>
            <div>
              <p className="text-lg font-bold leading-tight text-slate-900">HealthMate</p>
              <p className="text-xs font-medium text-teal-600">AI Companion</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
            const isActive = key === active;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleNavigate(key)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-teal-50 text-teal-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                <Icon size={18} strokeWidth={2} />
                {label}
                {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-teal-500" />}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 px-4 py-4">
          <button
            type="button"
            onClick={() => handleNavigate("profile")}
            className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left hover:bg-slate-50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-sm font-semibold text-white">
              {profile?.fullName?.[0] ?? "U"}
            </span>
            <span className="flex-1">
              <p className="text-sm font-semibold text-slate-900">
                {profile?.fullName ?? "Your Name"}
              </p>
              <p className="text-xs text-teal-600">{profile?.plan ?? "Free plan"}</p>
            </span>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                handleNavigate("settings");
              }}
              aria-label="Settings"
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <Settings size={16} />
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
