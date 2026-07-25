import { useState } from "react";
import { Menu, Search, Star, CalendarCheck } from "lucide-react";
import { doctorsList } from "../../data/mockData";

export default function FindDoctor({ onOpenMenu }) {
  const [query, setQuery] = useState("");
  const [booked, setBooked] = useState({});

  const filtered = doctorsList.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.specialization.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f6f9f8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
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
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Find a Doctor</h1>
            <p className="text-sm text-slate-500">Search and book a consultation.</p>
          </div>
        </div>

        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or specialization..."
            className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtered.map((d) => (
            <div key={d.id} className="rounded-2xl border border-slate-100 bg-white p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white">
                  {d.name.split(" ").map((n) => n[0]).slice(-2).join("")}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{d.name}</p>
                  <p className="text-xs text-slate-400">
                    {d.specialization} · {d.clinic}
                  </p>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-amber-500">
                    <Star size={12} fill="currentColor" />
                    <span className="font-medium text-slate-600">{d.rating}</span>
                    <span className="text-slate-400">({d.reviews})</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span>{d.experience} yrs experience</span>
                <span className="font-semibold text-slate-900">₹{d.fee} / consult</span>
              </div>

              <button
                type="button"
                onClick={() => setBooked((prev) => ({ ...prev, [d.id]: true }))}
                disabled={booked[d.id]}
                className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2 text-sm font-semibold ${
                  booked[d.id]
                    ? "bg-teal-50 text-teal-600"
                    : "bg-teal-600 text-white hover:bg-teal-700"
                }`}
              >
                <CalendarCheck size={15} /> {booked[d.id] ? "Requested" : "Book consultation"}
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full py-10 text-center text-sm text-slate-400">No doctors match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}
