import { useStore } from '../store.jsx';
import { MILESTONES } from '../data/milestones.js';

const RING = {
  rose: '#f43f5e', violet: '#8b5cf6', amber: '#f59e0b',
  sky: '#0ea5e9', emerald: '#10b981', orange: '#f97316',
};

// Annie's strength milestones — simpler than skill ladders.
// For each milestone family, show 3-5 levels with the user's best-ever value.
// Levels she has hit show a green ✓.
export default function MilestonesView() {
  const { data } = useStore();
  if (!data) return null;
  const logs = data.logs || [];

  return (
    <div className="px-4 pt-3 pb-24 max-w-xl mx-auto fade-in">
      <h1 className="text-2xl font-bold text-stone-900 mb-1">Milestones</h1>
      <p className="text-sm text-stone-600 mb-4 leading-relaxed">
        Your growing strength, in plain numbers. These are the things that matter most for staying steady, strong, and independent.
      </p>

      <div className="space-y-4">
        {MILESTONES.map((m) => {
          const earnedCount = m.levels.filter((lv) => bestForExercise(logs, lv.exerciseId, lv.unit) >= lv.target).length;
          return (
            <div key={m.id} className="bg-white border border-stone-200 rounded-2xl p-4">
              <div className="flex items-baseline justify-between mb-1">
                <h2 className="font-bold text-stone-900 text-base">{m.name}</h2>
                <div className="text-xs text-stone-500">{earnedCount}/{m.levels.length}</div>
              </div>
              <p className="text-xs text-stone-500 mb-3 leading-snug">{m.why}</p>
              <ul className="space-y-1.5">
                {m.levels.map((lv, i) => {
                  const best = bestForExercise(logs, lv.exerciseId, lv.unit);
                  const hit = best != null && best >= lv.target;
                  return (
                    <li
                      key={i}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                        hit ? 'bg-emerald-50 border border-emerald-200' : 'bg-stone-50 border border-stone-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${hit ? 'bg-emerald-500 text-white' : 'bg-white border border-stone-300 text-stone-400'}`}>
                          {hit ? '✓' : i + 1}
                        </span>
                        <span className={`text-sm ${hit ? 'text-emerald-900 font-medium' : 'text-stone-700'} truncate`}>
                          {lv.label}
                        </span>
                      </div>
                      <span className={`text-sm tabular-nums font-bold ${hit ? 'text-emerald-700' : 'text-stone-400'}`}>
                        {best != null ? `${best}${lv.unit === 'sec' ? 's' : ''}` : '—'}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function bestForExercise(logs, exerciseId, unit) {
  let m = null;
  for (const l of logs) {
    if (l.exerciseId !== exerciseId) continue;
    const v = unit === 'sec' ? l.hold : l.reps;
    if (v == null) continue;
    if (m == null || v > m) m = v;
  }
  return m;
}
