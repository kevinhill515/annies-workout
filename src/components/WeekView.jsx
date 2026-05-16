import { useState } from 'react';
import ProgressRing from './ProgressRing.jsx';
import SessionSheet from './SessionSheet.jsx';
import WalkSheet from './WalkSheet.jsx';
import PhaseJourney from './PhaseJourney.jsx';
import ActivityHeatmap from './ActivityHeatmap.jsx';
import WeeklyRecap from './WeeklyRecap.jsx';
import DayDetailSheet from './DayDetailSheet.jsx';
import { SESSION_TYPES, SESSION_META, phaseForWeek, isResetWeek } from '../data/program.js';
import { useStore } from '../store.jsx';
import { weekId, weekNumber, fmtWeekRange } from '../utils/dates.js';

const COLORS = {
  rose:   { card: 'bg-rose-50 text-rose-700 border-rose-200',   ring: '#f43f5e' },
  violet: { card: 'bg-violet-50 text-violet-700 border-violet-200', ring: '#8b5cf6' },
  amber:  { card: 'bg-amber-50 text-amber-700 border-amber-200', ring: '#f59e0b' },
  sky:    { card: 'bg-sky-50 text-sky-700 border-sky-200',       ring: '#0ea5e9' },
};

export default function WeekView() {
  const { data } = useStore();
  const [openSession, setOpenSession] = useState(null);
  const [pickedDate, setPickedDate] = useState(null);

  if (!data) return null;
  const wid = weekId();
  const wkNum = weekNumber(data.startDate);
  const phase = phaseForWeek(wkNum, data.phaseOverride);
  const reset = isResetWeek(wkNum);
  const myWk = data.weeks?.[wid] || {};
  const doneCount = SESSION_TYPES.filter((s) => myWk[s]).length;

  return (
    <div className="px-4 pt-3 pb-24 max-w-xl mx-auto fade-in">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs text-stone-500">Week {wkNum} · {fmtWeekRange()}</div>
          <h1 className="text-xl font-bold text-stone-900 mt-0.5">
            Phase {phase.id} — {phase.name}
          </h1>
        </div>
        {reset && (
          <span className="text-[10px] uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200 rounded-full px-2 py-1">
            Reset week
          </span>
        )}
      </div>

      <PhaseJourney weekNum={wkNum} phaseOverride={data.phaseOverride} />

      {/* Hero ring + status */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 flex items-center gap-4 mb-4">
        <ProgressRing
          value={doneCount / SESSION_TYPES.length}
          label={`${doneCount}/${SESSION_TYPES.length}`}
          sub="this week"
          size={92}
          color="#8b5cf6"
        />
        <div className="flex-1 min-w-0">
          <div className="text-sm text-stone-800">
            {doneCount === 4 ? 'Full week done — beautiful work!' : `${4 - doneCount} ring${4 - doneCount === 1 ? '' : 's'} to fill`}
          </div>
          {reset && (
            <p className="text-xs text-amber-700 mt-1 leading-snug">
              This is a reset week — cut your sets in half so your body catches up.
            </p>
          )}
        </div>
      </div>

      {/* Session cards */}
      <div className="space-y-2.5">
        {SESSION_TYPES.map((s) => {
          const done = !!myWk[s];
          const meta = SESSION_META[s];
          const palette = COLORS[meta.color] || COLORS.violet;
          return (
            <button
              key={s}
              onClick={() => setOpenSession(s)}
              className={`w-full text-left bg-white border rounded-2xl p-4 flex items-center gap-3 transition active:scale-[0.99] ${
                done ? 'border-emerald-400' : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center text-lg flex-shrink-0 ${palette.card}`}>
                {meta.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-stone-900 text-base">{s}</div>
                <div className="text-xs text-stone-500 truncate">{meta.focus}</div>
              </div>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition ${
                done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-stone-300 text-transparent'
              }`}>✓</div>
            </button>
          );
        })}
      </div>

      <div className="mt-5 bg-white border border-stone-200 rounded-2xl p-4">
        <div className="text-xs uppercase tracking-wide text-stone-500 mb-1">Goal of this phase</div>
        <p className="text-sm text-stone-700 leading-relaxed">{phase.goal}</p>
      </div>

      {doneCount === SESSION_TYPES.length && <WeeklyRecap data={data} />}

      <div className="mt-4">
        <ActivityHeatmap
          logs={data.logs || []}
          walks={data.walks || []}
          onPickDate={(d) => setPickedDate(d)}
        />
      </div>

      {/* Routing: Walk uses WalkSheet, everything else uses SessionSheet */}
      {openSession === 'Walk' ? (
        <WalkSheet
          open={!!openSession}
          phase={phase}
          onClose={() => setOpenSession(null)}
        />
      ) : (
        <SessionSheet
          open={!!openSession}
          sessionType={openSession}
          phase={phase}
          onClose={() => setOpenSession(null)}
        />
      )}

      <DayDetailSheet
        open={!!pickedDate}
        date={pickedDate}
        onClose={() => setPickedDate(null)}
      />
    </div>
  );
}
