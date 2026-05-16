import Sheet from './Sheet.jsx';
import { useStore } from '../store.jsx';
import { getExercise } from '../data/exercises.js';
import { summarizeLog } from './ExerciseSheet.jsx';
import { parseDate } from '../utils/dates.js';
import { SESSION_TYPES } from '../data/program.js';

export default function DayDetailSheet({ open, date, onClose }) {
  const { data } = useStore();
  if (!open || !date) return null;

  const dayLogs = (data?.logs || []).filter((l) => l.date === date);
  const dayWalks = (data?.walks || []).filter((w) => w.date === date);
  const byType = {};
  for (const l of dayLogs) {
    const k = l.sessionType || 'Other';
    (byType[k] ||= []).push(l);
  }
  const total = dayLogs.length + dayWalks.length;

  return (
    <Sheet open={open} onClose={onClose} title={fmtPretty(date)} fullHeight>
      <div className="px-5 py-4 space-y-4">
        {total === 0 ? (
          <div className="text-sm text-stone-500 bg-stone-100 rounded-2xl px-4 py-8 text-center">
            Nothing logged on this day.
          </div>
        ) : (
          <>
            <div className="text-sm text-stone-600">
              {total} log{total === 1 ? '' : 's'} · {dayLogs.length} exercise, {dayWalks.length} walk{dayWalks.length === 1 ? '' : 's'}
            </div>

            {SESSION_TYPES.concat(['Other']).map((type) => {
              const group = byType[type];
              if (!group || !group.length) return null;
              const byEx = {};
              for (const l of group) (byEx[l.exerciseId] ||= []).push(l);
              return (
                <div key={type}>
                  <div className="text-[11px] uppercase tracking-wide text-stone-500 mb-1.5">{type}</div>
                  <ul className="bg-white border border-stone-200 rounded-2xl divide-y divide-stone-100">
                    {Object.entries(byEx).map(([exId, entries]) => (
                      <li key={exId} className="px-4 py-3">
                        <div className="text-sm font-semibold text-stone-900">{getExercise(exId).name}</div>
                        <ul className="mt-1 space-y-0.5">
                          {entries.map((e) => (
                            <li key={e.id} className="text-xs text-stone-600 flex items-center gap-2">
                              <span className="text-stone-800">{summarizeLog(e)}</span>
                              {e.notes && <span className="text-stone-500 truncate">· {e.notes}</span>}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            {dayWalks.length > 0 && (
              <div>
                <div className="text-[11px] uppercase tracking-wide text-stone-500 mb-1.5">Walks</div>
                <ul className="bg-white border border-stone-200 rounded-2xl divide-y divide-stone-100">
                  {dayWalks.map((w) => (
                    <li key={w.id} className="px-4 py-3 flex items-center justify-between">
                      <span className="text-sm text-stone-800">↗ Walk</span>
                      <span className="text-sm font-bold tabular-nums text-sky-700">
                        {w.miles?.toFixed(2)} mi {w.minutes ? `· ${w.minutes} min` : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </Sheet>
  );
}

function fmtPretty(d) {
  const dt = parseDate(d);
  return dt.toLocaleDateString(undefined, {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });
}
