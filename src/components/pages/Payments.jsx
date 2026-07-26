import { ArrowLeft, Menu, CreditCard } from "lucide-react";
import useSupabaseTable from "../../hooks/useSupabaseTable";

const STATUS_STYLE = {
  Paid: "bg-teal-50 text-teal-600",
  Pending: "bg-amber-50 text-amber-600",
};

export default function Payments({ onOpenMenu, onNavigate, user }) {
  const { rows: payments, loading } = useSupabaseTable("payments", user, { ascending: false });

  const total = payments.filter((p) => p.status === "Paid").reduce((sum, p) => sum + (p.amount || 0), 0);

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
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Payments</h1>
            <p className="text-sm text-slate-500">View your billing history.</p>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-teal-600 to-teal-700 p-5 text-white">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-100">Total paid</p>
          <p className="text-3xl font-bold">₹{total}</p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <h2 className="mb-4 text-sm font-bold text-slate-900">Transaction history</h2>
          {loading ? (
            <p className="py-6 text-center text-sm text-slate-400">Loading...</p>
          ) : payments.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">
              No payments yet — this will fill in once consultations or subscriptions are billed.
            </p>
          ) : (
            <ul className="space-y-2">
              {payments.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50/60 px-3 py-2.5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-500">
                      <CreditCard size={16} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{p.type}</p>
                      <p className="text-xs text-slate-400">{new Date(p.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">₹{p.amount}</p>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLE[p.status] ?? "bg-slate-100 text-slate-500"}`}>{p.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
