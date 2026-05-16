import { useStore } from '../store.jsx';
import { useMemo, useState } from 'react';
import { getExercise } from '../data/exercises.js';
import { summarizeLog } from './ExerciseSheet.jsx';
import DayDetailSheet from './DayDetailSheet.jsx';

// Simple, scrollable list of everything Annie has logged, newest first.
// Grouped by date. Tap any date header to open the full Day Detail.
export default function HistoryView() {
  const { data } = useStore();
  const [pickedDate, setPickedDate] = useState(null);

  const grouped = useMemo(() => {
    if (!data) return [];
    const all = [
      ...(data.logs || []).map((l) => ({ kind: 'log', ...l })),
      ...(data.walks || []).map((w) => ({ kind: 'walk', ...w })),
    ];
    all.sort((a, b) => b.date.localeCompare(a.date));
    const byDate = {};
    for (const item of all) {
      (byDate[item.date] ||= []).push(item);
    }
    return Object.entries(byDate).sort(([a], [b]) => b.localeCompare(a));
  }, [data]);

  if (!data) return null;

  return (
    <div className="px-4 pt-3 pb-24 max-w-xl mx-auto fade-in">
      <h1 className="text-2xl font-bold text-stone-900 mb-1">History</h1>
      <p className="text-sm text-stone-600 mb-4">
        Everything you've done, day by day. Tap a date to see the whole workout.
      </p>

      {grouped.length === 0 && (
        <div className="bg-white border border-stone-200 rounded-2xl p-8 text-center text-stone-500">
          No activity yet. Log your first exercise from the Week tab and it'll show up here.
        </div>
      )}

      <div className="space-y-4">
        {grouped.map(([date, items]) => (
          <div key={date}>
            <button
              onClick={() => setPickedDate(date)}
              className="w-full text-left mb-1.5 flex items-baseline justify-between"
            >
              <div className="text-sm font-semibold text-stone-700">{fmtPretty(date)}</div>
              <div className="text-[11px] text-stone-500">{items.length} item{items.length === 1 ? '' : 's'} ›</div>
            </button>
            <ul className="bg-white border border-stone-200 rounded-2xl divide-y divide-stone-100 overflow-hidden">
              {items.slice(0, 5).map((item) => (
                <li key={item.id} className="px-4 py-2.5 text-sm flex items-center justify-between gap-3">
                  {item.kind === 'walk' ? (
                    <>
                      <span className="text-sky-700 font-medium truncate">↗ Walk</span>
                      <span className="text-stone-700 tabular-nums flex-shrink-0">
                        {item.miles?.toFixed(2)} mi {item.minutes ? `· ${item.minutes} min` : ''}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-stone-800 truncate">{getExercise(item.exerciseId).name}</span>
                      <span className="text-stone-600 tabular-nums flex-shrink-0">{summarizeLog(item)}</span>
                    </>
                  )}
                </li>
              ))}
              {items.length > 5 && (
                <li className="px-4 py-2 text-xs text-stone-500 text-center bg-stone-50">
                  …and {items.length - 5} more — tap above
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>

      <DayDetailSheet
        open={!!pickedDate}
        date={pickedDate}
        onClose={() => setPickedDate(null)}
      />
    </div>
  );
}

function fmtPretty(d) {
  const [y, m, day] = d.split('-').map(Number);
  const dt = new Date(y, m - 1, day, 12);
  return dt.toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric' });
}
