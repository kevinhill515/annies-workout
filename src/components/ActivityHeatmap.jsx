import { fmtDate } from '../utils/dates.js';

export default function ActivityHeatmap({ logs, walks, onPickDate }) {
  const today = new Date();
  const todayDay = today.getDay();
  const daysBackToSat = (todayDay + 1) % 7;
  const startSat = new Date(today);
  startSat.setDate(today.getDate() - daysBackToSat - 21);

  const days = [];
  for (let i = 0; i < 28; i++) {
    const d = new Date(startSat);
    d.setDate(startSat.getDate() + i);
    const ds = fmtDate(d);
    const count = logs.filter((l) => l.date === ds).length + walks.filter((w) => w.date === ds).length;
    const isFuture = d > today;
    days.push({ date: ds, count, isFuture, isToday: ds === fmtDate(today) });
  }

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-3 mb-3">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[11px] uppercase tracking-wide text-stone-500">Last 4 weeks</div>
        <div className="flex items-center gap-1.5 text-[10px] text-stone-500">
          <span>less</span>
          <div className="w-2 h-2 rounded-sm bg-stone-100" />
          <div className="w-2 h-2 rounded-sm bg-violet-200" />
          <div className="w-2 h-2 rounded-sm bg-violet-400" />
          <div className="w-2 h-2 rounded-sm bg-violet-600" />
          <span>more</span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {['S','S','M','T','W','T','F'].map((d, i) => (
          <div key={i} className="text-[10px] text-stone-400 text-center">{d}</div>
        ))}
        {days.map((d) => (
          <button
            key={d.date}
            disabled={d.isFuture}
            onClick={() => !d.isFuture && onPickDate?.(d.date)}
            title={`${d.date} — ${d.count}`}
            className={`aspect-square rounded ${cellColor(d)} ${d.isToday ? 'ring-2 ring-violet-500' : ''} ${d.isFuture ? '' : 'hover:ring-1 hover:ring-stone-400 active:scale-95'}`}
          />
        ))}
      </div>
    </div>
  );
}

function cellColor({ count, isFuture }) {
  if (isFuture)    return 'bg-stone-50 border border-stone-100';
  if (count === 0) return 'bg-stone-100';
  if (count < 3)   return 'bg-violet-200';
  if (count < 6)   return 'bg-violet-400';
  return 'bg-violet-600';
}
