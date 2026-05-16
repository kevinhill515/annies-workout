import { PHASES, phaseForWeek } from '../data/program.js';

export default function PhaseJourney({ weekNum, phaseOverride }) {
  const phase = phaseForWeek(weekNum, phaseOverride);
  const phaseStart = phase.weekRange[0];
  const phaseEnd = phase.weekRange[1];
  const weeksInPhase = phaseEnd === 999 ? 12 : phaseEnd - phaseStart + 1;
  const weeksDone = Math.max(1, Math.min(weekNum - phaseStart + 1, weeksInPhase));

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-3 mb-3">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[11px] uppercase tracking-wide text-stone-500">Your year</div>
        <div className="text-[11px] text-stone-600">
          Phase {phase.id} · week {weeksDone}/{weeksInPhase === 12 && phaseEnd === 999 ? '∞' : weeksInPhase}
        </div>
      </div>
      <div className="flex gap-1">
        {PHASES.map((p) => {
          const fill =
            p.id < phase.id ? 100 :
            p.id > phase.id ? 0 :
            (weeksDone / weeksInPhase) * 100;
          const active = p.id === phase.id;
          return (
            <div key={p.id} className="flex-1 min-w-0">
              <div className="h-2 bg-stone-100 rounded overflow-hidden">
                <div className={`h-full ${active ? 'bg-violet-500' : 'bg-violet-300'}`}
                  style={{ width: `${fill}%` }} />
              </div>
              <div className={`text-[10px] mt-1 text-center truncate ${active ? 'text-violet-700 font-medium' : 'text-stone-400'}`}>
                P{p.id}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
