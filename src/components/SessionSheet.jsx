import Sheet from './Sheet.jsx';
import ExerciseSheet from './ExerciseSheet.jsx';
import { getExercise } from '../data/exercises.js';
import { SESSION_META } from '../data/program.js';
import { useStore } from '../store.jsx';
import { weekId } from '../utils/dates.js';
import { useMemo, useState } from 'react';

const TODAY = () => new Date().toISOString().slice(0, 10);

// Detail view for a session card (Legs, Upper, Core). Walks use WalkSheet.
export default function SessionSheet({ open, onClose, sessionType, phase }) {
  const { actions, data } = useStore();
  const [exerciseOpen, setExerciseOpen] = useState(null);

  const today = TODAY();
  const todayCounts = useMemo(() => {
    const m = {};
    for (const l of data?.logs || []) {
      if (l.date !== today) continue;
      if (l.sessionType !== sessionType) continue;
      m[l.exerciseId] = (m[l.exerciseId] || 0) + 1;
    }
    return m;
  }, [data?.logs, today, sessionType]);

  if (!sessionType || !phase) return null;
  const session = phase.sessions[sessionType];
  if (!session) return null;

  const wid = weekId();
  const isDone = !!data?.weeks?.[wid]?.[sessionType];
  const meta = SESSION_META[sessionType];

  return (
    <>
      <Sheet open={open} onClose={onClose} title={`${sessionType} — Phase ${phase.id}`} fullHeight>
        <div className="px-5 py-4 space-y-4">
          {isDone && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-sm text-emerald-900 flex items-start gap-2">
              <span className="text-emerald-600 leading-none">✓</span>
              <span>
                <span className="font-medium">Session complete.</span>{' '}
                Tap any exercise to log additional sets — it stays marked complete.
              </span>
            </div>
          )}

          <div>
            <div className="text-xs uppercase tracking-wide text-stone-500">Focus</div>
            <p className="text-sm text-stone-700 mt-1 leading-relaxed">{meta?.focus}</p>
          </div>

          {phase.note && (
            <div className="text-xs bg-amber-50 border border-amber-200 text-amber-900 rounded-lg px-3 py-2 leading-relaxed">
              {phase.note}
            </div>
          )}

          <div className="space-y-2">
            {session.items.map((item, i) => {
              const ex = getExercise(item.ex);
              const count = todayCounts[item.ex] || 0;
              return (
                <button
                  key={i}
                  onClick={() => setExerciseOpen({ id: item.ex, prescription: item.dose })}
                  className={`w-full text-left bg-white border rounded-2xl p-3.5 transition active:scale-[0.99] ${
                    count > 0 ? 'border-emerald-400' : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex w-7 h-7 rounded-full bg-stone-100 text-stone-700 text-xs items-center justify-center flex-shrink-0 font-bold">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-stone-900">{ex.name}</div>
                      <div className="text-sm text-violet-700 mt-0.5 font-medium">{item.dose}</div>
                    </div>
                    {count > 0 ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5 flex-shrink-0">
                        <span>✓</span>
                        <span className="tabular-nums">{count}×</span>
                      </span>
                    ) : (
                      <span className="text-stone-400 text-lg">›</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {!isDone ? (
            <button
              onClick={() => { actions.toggleSession(wid, sessionType); onClose(); }}
              className="w-full font-bold rounded-2xl py-4 text-lg bg-emerald-600 hover:bg-emerald-700 text-white transition"
            >
              Mark this session done
            </button>
          ) : (
            <div className="space-y-2">
              <button
                onClick={onClose}
                className="w-full font-bold rounded-2xl py-4 text-lg bg-stone-200 hover:bg-stone-300 text-stone-900 transition"
              >
                Done
              </button>
              <button
                onClick={() => actions.toggleSession(wid, sessionType)}
                className="w-full text-xs text-stone-500 hover:text-rose-600 py-1"
              >
                Undo complete
              </button>
            </div>
          )}
        </div>
      </Sheet>

      <ExerciseSheet
        open={!!exerciseOpen}
        exerciseId={exerciseOpen?.id}
        prescription={exerciseOpen?.prescription}
        sessionType={sessionType}
        closeOnLog={isDone}
        onClose={() => setExerciseOpen(null)}
      />
    </>
  );
}
