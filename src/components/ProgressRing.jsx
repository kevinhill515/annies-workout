// SVG progress ring. value 0..1.
export default function ProgressRing({ value, size = 96, stroke = 8, label, sub, color = '#7c3aed' }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.max(0, Math.min(1, value)));
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r}
          stroke="#e7e5e4" strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r}
          stroke={color} strokeWidth={stroke} fill="none"
          className="transition-[stroke-dashoffset] duration-500"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-stone-900 leading-none">{label}</span>
        {sub ? <span className="text-[11px] text-stone-500 mt-0.5">{sub}</span> : null}
      </div>
    </div>
  );
}
