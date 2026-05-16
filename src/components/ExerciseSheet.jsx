import Sheet from './Sheet.jsx';
import { getExercise } from '../data/exercises.js';
import { useStore } from '../store.jsx';
import { useEffect, useRef, useState } from 'react';

const TODAY = () => new Date().toISOString().slice(0, 10);

// Simple log-a-set sheet for Annie. Fewer fields than the calisthenics
// version, more explanation, includes a Hold timer for time-based moves.
export default function ExerciseSheet({ exerciseId, prescription, sessionType, closeOnLog = false, open, onClose }) {
  const { actions, data } = useStore();
  const ex = getExercise(exerciseId);

  const [reps, setReps] = useState('');
  const [hold, setHold] = useState('');
  const [load, setLoad] = useState('');
  const [side, setSide] = useState('both'); // 'both' | 'left' | 'right'
  const [notes, setNotes] = useState('');

  // Hold timer
  const [holdRunning, setHoldRunning] = useState(false);
  const holdStartRef = useRef(0);
  useEffect(() => {
    if (!holdRunning) return;
    holdStartRef.current = Date.now();
    setHold('0');
    const id = setInterval(() => {
      setHold(String(Math.floor((Date.now() - holdStartRef.current) / 1000)));
    }, 200);
    return () => clearInterval(id);
  }, [holdRunning]);

  useEffect(() => {
    if (!open) { setHoldRunning(false); }
  }, [open]);

  const log = () => {
    if (!num(reps) && !num(hold) && !num(load) && !notes.trim()) return;
    actions.addLog({
      exerciseId,
      sessionType: sessionType || null,
      date: TODAY(),
      reps:  num(reps),
      hold:  num(hold),
      load:  num(load),
      notes: notes.trim(),
      ...(side === 'both' ? {} : { side }),
    });
    setReps(''); setHold(''); setLoad(''); setNotes('');
    setHoldRunning(false);
    if (closeOnLog) onClose();
  };

  const history = (data?.logs || [])
    .filter((l) => l.exerciseId === exerciseId)
    .slice().reverse();
  const last = history[0];

  return (
    <Sheet open={open} onClose={onClose} title={ex.name}>
      <div className="px-5 py-4 space-y-5">
        {prescription && (
          <div className="bg-violet-50 border border-violet-200 rounded-xl px-3 py-2 flex items-baseline gap-2">
            <span className="text-[11px] uppercase tracking-wide text-violet-600">Today</span>
            <span className="text-sm text-violet-900 font-medium">{prescription}</span>
          </div>
        )}

        {ex.cue && (
          <div>
            <div className="text-xs uppercase tracking-wide text-stone-500 mb-1">How to do this</div>
            <p className="text-base text-stone-800 leading-relaxed">{ex.cue}</p>
          </div>
        )}

        {ex.safety && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
            <div className="text-[11px] uppercase tracking-wide text-amber-700 mb-1">Safety</div>
            <p className="text-sm text-amber-900 leading-relaxed">{ex.safety}</p>
          </div>
        )}

        <div>
          <div className="flex items-baseline justify-between mb-2">
            <div className="text-xs uppercase tracking-wide text-stone-500">Log a set</div>
            <div className="text-[11px] flex bg-stone-100 rounded-md p-0.5">
              <button onClick={() => setSide('both')}
                className={`px-2 py-0.5 rounded ${side === 'both' ? 'bg-white text-stone-900 shadow' : 'text-stone-500'}`}
              >Both</button>
              <button onClick={() => setSide('left')}
                className={`px-2 py-0.5 rounded ${side === 'left' ? 'bg-white text-stone-900 shadow' : 'text-stone-500'}`}
              >L</button>
              <button onClick={() => setSide('right')}
                className={`px-2 py-0.5 rounded ${side === 'right' ? 'bg-white text-stone-900 shadow' : 'text-stone-500'}`}
              >R</button>
            </div>
          </div>

          {last && (
            <div className="mb-2 text-xs text-stone-500">
              <span className="text-violet-600 font-medium">Last:</span>{' '}
              <span className="text-stone-700">{summarizeLog(last)}</span>
              <span className="text-stone-400"> · {last.date}</span>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2">
            <Field label="Reps"     value={reps} onChange={setReps} />
            <label className="block">
              <span className="text-[11px] uppercase tracking-wide text-stone-500">Hold (sec)</span>
              <div className="relative mt-1">
                <input
                  type="number" inputMode="decimal"
                  value={hold}
                  onChange={(e) => { setHold(e.target.value); setHoldRunning(false); }}
                  placeholder="–"
                  className={`w-full pr-10 bg-white border rounded-lg px-2 py-2 text-base text-stone-900 placeholder:text-stone-400 ${holdRunning ? 'border-violet-500 text-violet-700' : 'border-stone-300'}`}
                />
                <button
                  onClick={() => setHoldRunning((r) => !r)}
                  className={`absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded flex items-center justify-center text-sm ${holdRunning ? 'text-violet-600 bg-violet-100' : 'text-stone-600 bg-stone-100 hover:bg-stone-200'}`}
                  type="button"
                >{holdRunning ? '■' : '▶'}</button>
              </div>
            </label>
            <Field label="Weight (lb)" value={load} onChange={setLoad} />
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes (optional — how it felt, what was hard, etc.)"
            className="mt-2 w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400"
            rows={2}
          />
          <button
            onClick={log}
            className="mt-3 w-full bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-2xl py-3.5 text-base"
          >
            Save this set
          </button>
        </div>

        {history.length > 0 && (
          <div>
            <div className="text-xs uppercase tracking-wide text-stone-500 mb-2">Recent</div>
            <ul className="space-y-1">
              {history.slice(0, 5).map((h) => (
                <li key={h.id} className="text-xs text-stone-600 flex items-center justify-between bg-stone-100 rounded-lg px-3 py-2">
                  <span>{h.date}</span>
                  <span className="text-stone-800">{summarizeLog(h)}</span>
                  <button onClick={() => actions.removeLog(h.id)} className="text-stone-400 hover:text-rose-600 ml-2">×</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Sheet>
  );
}

function Field({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wide text-stone-500">{label}</span>
      <input
        type="number" inputMode="decimal"
        value={value} onChange={(e) => onChange(e.target.value)}
        placeholder="–"
        className="mt-1 w-full bg-white border border-stone-300 rounded-lg px-2 py-2 text-base text-stone-900 placeholder:text-stone-400"
      />
    </label>
  );
}

function num(s) { const n = parseFloat(s); return isFinite(n) ? n : null; }

export function summarizeLog(l) {
  const parts = [
    l.reps != null && `${l.reps} reps`,
    l.hold != null && `${l.hold}s hold`,
    l.load != null && `${l.load} lb`,
    l.side === 'left' ? 'L' : l.side === 'right' ? 'R' : null,
  ].filter(Boolean);
  return parts.length ? parts.join(' · ') : '—';
}
