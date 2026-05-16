import Sheet from './Sheet.jsx';
import { useStore } from '../store.jsx';
import { useState } from 'react';
import { weekId } from '../utils/dates.js';

const TODAY = () => new Date().toISOString().slice(0, 10);

// Walk session — special: no exercise list, just distance + time.
// Logging a walk auto-fills the Walk ring for that week.
export default function WalkSheet({ open, onClose, phase }) {
  const { data, actions } = useStore();
  const [miles, setMiles] = useState('');
  const [minutes, setMinutes] = useState('');
  const [date, setDate] = useState(TODAY());
  const [notes, setNotes] = useState('');

  if (!open) return null;
  const session = phase.sessions.Walk;
  const item = session?.items?.[0];
  const dose = item?.dose;

  const wid = weekId();
  const weekWalks = (data?.walks || []).filter((w) => w.weekId === wid);

  const log = () => {
    const m = parseFloat(miles);
    const t = parseFloat(minutes);
    if (!isFinite(m) || m <= 0) return;
    actions.addWalk({
      miles: m,
      minutes: isFinite(t) ? t : null,
      date,
      notes: notes.trim() || undefined,
    });
    setMiles(''); setMinutes(''); setNotes(''); setDate(TODAY());
  };

  return (
    <Sheet open={open} onClose={onClose} title="Walk" fullHeight>
      <div className="px-5 py-4 space-y-5">
        {dose && (
          <div className="bg-sky-50 border border-sky-200 rounded-xl px-3 py-2">
            <div className="text-[11px] uppercase tracking-wide text-sky-700">This week's goal</div>
            <div className="text-sm text-sky-900 mt-0.5">{dose}</div>
          </div>
        )}

        <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-3">
          <div className="text-[11px] uppercase tracking-wide text-amber-700 mb-1">Why this matters</div>
          <p className="text-sm text-amber-900 leading-relaxed">
            Walking is the single best thing you can do for your hip, your bones, your heart, and your mood.
            Aim for a flat path, comfortable shoes, water in hand. Just one walk a week fills this ring — but more is welcome.
          </p>
        </div>

        {/* Log new walk */}
        <div>
          <div className="text-xs uppercase tracking-wide text-stone-500 mb-2">Log a walk</div>
          <div className="grid grid-cols-2 gap-2">
            <label className="block">
              <span className="text-[11px] uppercase tracking-wide text-stone-500">Distance (mi)</span>
              <input
                type="number" inputMode="decimal" step="0.01"
                value={miles} onChange={(e) => setMiles(e.target.value)}
                placeholder="0.50"
                className="mt-1 w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-base text-stone-900 placeholder:text-stone-400"
              />
            </label>
            <label className="block">
              <span className="text-[11px] uppercase tracking-wide text-stone-500">Time (min)</span>
              <input
                type="number" inputMode="decimal"
                value={minutes} onChange={(e) => setMinutes(e.target.value)}
                placeholder="15"
                className="mt-1 w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-base text-stone-900 placeholder:text-stone-400"
              />
            </label>
          </div>
          <label className="block mt-2">
            <span className="text-[11px] uppercase tracking-wide text-stone-500">Date</span>
            <input
              type="date" value={date} onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-base text-stone-900"
            />
          </label>
          <textarea
            value={notes} onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Notes (optional — weather, who you walked with, how it felt)"
            className="mt-2 w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400"
          />
          <button
            onClick={log}
            disabled={!parseFloat(miles)}
            className="mt-3 w-full bg-sky-600 hover:bg-sky-700 disabled:bg-stone-300 disabled:text-stone-500 text-white font-bold rounded-2xl py-3.5 text-base"
          >
            Save this walk
          </button>
        </div>

        {/* This week's walks */}
        {weekWalks.length > 0 && (
          <div>
            <div className="text-xs uppercase tracking-wide text-stone-500 mb-2">
              This week — {weekWalks.length} walk{weekWalks.length === 1 ? '' : 's'}
            </div>
            <ul className="space-y-1">
              {[...weekWalks].reverse().map((w) => (
                <li key={w.id} className="flex items-center justify-between bg-stone-100 rounded-lg px-3 py-2 text-sm">
                  <span className="text-stone-600">{w.date}</span>
                  <span className="text-stone-900 font-medium tabular-nums">
                    {w.miles.toFixed(2)} mi {w.minutes ? `· ${w.minutes} min` : ''}
                  </span>
                  <button onClick={() => actions.removeWalk(w.id)} className="text-stone-400 hover:text-rose-600 ml-2">×</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* All-time walks summary */}
        {(data?.walks || []).length > 0 && (
          <div className="bg-stone-100 rounded-2xl p-4">
            <div className="text-xs uppercase tracking-wide text-stone-500 mb-1">All time</div>
            <div className="text-sm text-stone-700">
              {data.walks.length} walks · {totalMiles(data.walks).toFixed(1)} miles · {totalMinutes(data.walks)} minutes
            </div>
          </div>
        )}
      </div>
    </Sheet>
  );
}

function totalMiles(walks) {
  return walks.reduce((s, w) => s + (w.miles || 0), 0);
}
function totalMinutes(walks) {
  return walks.reduce((s, w) => s + (w.minutes || 0), 0);
}
