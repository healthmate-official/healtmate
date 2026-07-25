import { Search, Bell, ChevronDown, Menu } from "lucide-react";

export default function Topbar({ user, onOpenMenu, onNavigate }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open menu"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 lg:hidden"
        >
          <Menu size={18} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Good morning, {user?.name ?? "there"} <span className="align-middle">👋</span>
          </h1>
          <p className="text-sm text-slate-500">Let's make today a healthier day.</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden flex-1 sm:block">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search health data..."
            className="w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 md:w-64"
          />
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
        >
          <Bell size={17} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate?.("profile")}
          className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-2 hover:bg-slate-50 sm:pr-3"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-sm font-semibold text-white">
            {user?.name?.[0] ?? "U"}
          </span>
          <span className="hidden text-sm font-medium text-slate-700 sm:inline">{user?.name ?? "User"}</span>
          <ChevronDown size={14} className="hidden text-slate-400 sm:inline" />
        </button>
      </div>
    </div>
  );
}
