export default function WeeklyProgress({ data }) {
  const { current, days } = data;
  const width = 560;
  const height = 160;
  const padX = 8;
  const min = 60;
  const max = 100;

  const points = days.map((d, i) => {
    const x = padX + (i / (days.length - 1)) * (width - padX * 2);
    const y = height - ((d.score - min) / (max - min)) * height;
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5">
      <div className="mb-1 flex items-start justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Weekly health progress</h2>
          <p className="text-xs text-slate-400">Health score over the last 7 days</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-teal-600">{current}</p>
          <p className="text-xs text-slate-400">Current score</p>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height + 24}`} className="mt-3 w-full" preserveAspectRatio="none">
        {[100, 90, 80, 70, 60].map((tick) => {
          const y = height - ((tick - min) / (max - min)) * height;
          return (
            <g key={tick}>
              <line x1={padX} x2={width - padX} y1={y} y2={y} stroke="#f1f5f9" strokeDasharray="4 4" />
              <text x={0} y={y - 3} fontSize="9" fill="#94a3b8">
                {tick}
              </text>
            </g>
          );
        })}

        <path d={areaPath} fill="#0d9488" opacity="0.08" />
        <path d={linePath} fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="3.5" fill="#0d9488" />
            <text x={p.x} y={height + 16} fontSize="10" fill="#94a3b8" textAnchor="middle">
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
