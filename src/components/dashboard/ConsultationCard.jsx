import { Star, Clock, Video } from "lucide-react";

export default function ConsultationCard({ consultation, onJoin }) {
  const { doctor } = consultation;
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-900">Upcoming consultation</h2>
        <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-600">Today</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white">
          {doctor.name.split(" ").map((n) => n[0]).slice(-2).join("")}
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-900">{doctor.name}</p>
          <p className="text-xs text-slate-400">
            {doctor.specialization} · {doctor.clinic}
          </p>
          <div className="mt-0.5 flex items-center gap-1 text-xs text-amber-500">
            <Star size={12} fill="currentColor" />
            <span className="font-medium text-slate-600">{doctor.rating}</span>
            <span className="text-slate-400">({doctor.reviews})</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Clock size={14} className="text-slate-400" />
          <span className="font-medium text-slate-900">{consultation.scheduledTime}</span>
          <span className="text-slate-400">
            · {consultation.type} · {consultation.duration}
          </span>
        </div>
        <span className="rounded-full bg-teal-100 px-2 py-0.5 text-xs font-semibold text-teal-700">
          {consultation.countdown}
        </span>
      </div>

      <button
        type="button"
        onClick={onJoin}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
      >
        <Video size={16} /> Join consultation
      </button>
    </div>
  );
}
