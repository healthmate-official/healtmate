import { Search, Bell, ChevronDown } from "lucide-react";

export default function Topbar({ user }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Good morning, {user?.name ?? "there"} <span className="align-middle">👋</span>
        </h1>
        <p className="text-sm text-slate-500">Let's make today a healthier day.</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search health data..."
            className="w-64 rounded-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          />
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
        >
          <Bell size={17} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        <button type="button" className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 hover:bg-slate-50">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-sm font-semibold text-white">
            {user?.name?.[0] ?? "U"}
          </span>
          <span className="text-sm font-medium text-slate-700">{user?.name ?? "User"}</span>
          <ChevronDown size={14} className="text-slate-400" />
        </button>
      </div>
    </div>
  );
}
