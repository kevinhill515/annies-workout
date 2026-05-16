import { weekId } from '../utils/dates.js';

export default function WeeklyRecap({ data }) {
  const wid = weekId();
  const setsLogged = (data.logs || []).filter((l) => l.weekId === wid).length;
  const weekWalks  = (data.walks || []).filter((w) => w.weekId === wid);
  const walkMiles = weekWalks.reduce((s, w) => s + (w.miles || 0), 0);

  return (
    <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 mt-4">
      <div className="flex items-center gap-2 text-emerald-800 font-bold mb-2">
        <span className="text-lg">🌿</span>
        <span>Wonderful — full week done</span>
      </div>
      <p className="text-sm text-emerald-900 mb-3">
        All four rings filled. Here's what you did this week:
      </p>
      <div className="grid grid-cols-3 gap-2">
        <Stat n={setsLogged} label="sets" />
        <Stat n={weekWalks.length} label={weekWalks.length === 1 ? 'walk' : 'walks'} />
        <Stat n={walkMiles.toFixed(1)} label="miles walked" accent />
      </div>
    </div>
  );
}

function Stat({ n, label, accent }) {
  return (
    <div className={`rounded-xl p-2 text-center ${accent ? 'bg-emerald-200' : 'bg-white border border-emerald-200'}`}>
      <div className="text-xl font-bold tabular-nums text-emerald-900">{n}</div>
      <div className="text-[10px] uppercase tracking-wide text-emerald-700">{label}</div>
    </div>
  );
}
