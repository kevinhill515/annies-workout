import Sheet from './Sheet.jsx';
import { useStore } from '../store.jsx';
import { PHASES, phaseForWeek, SESSION_TYPES } from '../data/program.js';
import { getExercise } from '../data/exercises.js';
import { weekNumber } from '../utils/dates.js';
import { SUPA_CONFIGURED } from '../api/supabase.js';

export default function SettingsSheet({ open, onClose }) {
  const { data, actions } = useStore();
  if (!data) return null;

  const wkNum = weekNumber(data.startDate);
  const autoPhase = phaseForWeek(wkNum, null);
  const currentPhase = phaseForWeek(wkNum, data.phaseOverride);

  return (
    <Sheet open={open} onClose={onClose} title="Settings" fullHeight>
      <div className="px-5 py-4 space-y-6">
        <Section title="Sync">
          {SUPA_CONFIGURED ? (
            <div className="text-sm text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
              ✓ Connected. Your progress is saved to the cloud.
            </div>
          ) : (
            <div className="text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-xl p-3">
              ⚠ Cloud not configured. Progress is saved on this device only.
            </div>
          )}
          <button
            onClick={() => actions.pull()}
            className="mt-2 w-full bg-stone-100 hover:bg-stone-200 rounded-xl py-2.5 text-sm text-stone-700"
          >
            Refresh from cloud
          </button>
          <button
            onClick={async () => {
              if (!confirm('Bring back the cloud copy and overwrite this device? Use only if data has gone missing.')) return;
              const ok = await actions.forceRestoreFromCloud();
              alert(ok ? 'Restored.' : 'Could not reach the cloud — check your connection.');
            }}
            className="mt-2 w-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 rounded-xl py-2.5 text-sm"
          >
            Force restore from cloud
          </button>
        </Section>

        <Section title="Program start" sub="Week 1 begins on this date.">
          <input
            type="date"
            value={data.startDate}
            onChange={(e) => actions.setStartDate(e.target.value)}
            className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2.5 text-base text-stone-900"
          />
          <div className="text-xs text-stone-500 mt-2">Currently on week {wkNum}.</div>
        </Section>

        <Section title="Phase" sub={`Auto: Phase ${autoPhase.id} — ${autoPhase.name}`}>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => actions.setPhaseOverride(null)}
              className={`py-2.5 rounded-xl text-sm border ${
                data.phaseOverride == null
                  ? 'bg-violet-600 text-white border-violet-600'
                  : 'bg-white border-stone-300 text-stone-700'
              }`}
            >Auto</button>
            {PHASES.map((p) => (
              <button
                key={p.id}
                onClick={() => actions.setPhaseOverride(p.id)}
                className={`py-2.5 rounded-xl text-sm border ${
                  data.phaseOverride === p.id
                    ? 'bg-violet-600 text-white border-violet-600'
                    : 'bg-white border-stone-300 text-stone-700'
                }`}
              >P{p.id}</button>
            ))}
          </div>
        </Section>

        <Section title="Print this week" sub="A paper-friendly view of the current week's workouts.">
          <button
            onClick={() => window.print()}
            className="w-full bg-stone-100 hover:bg-stone-200 rounded-xl py-2.5 text-sm text-stone-700"
          >
            Print
          </button>
          <PrintableWeek phase={currentPhase} />
        </Section>

        <Section title="App">
          <button
            onClick={() => {
              if ('caches' in window) caches.keys().then((ks) => ks.forEach((k) => caches.delete(k)));
              location.reload();
            }}
            className="w-full bg-stone-100 hover:bg-stone-200 rounded-xl py-2.5 text-sm text-stone-700"
          >
            Reload app (clear cache)
          </button>
        </Section>
      </div>
    </Sheet>
  );
}

function Section({ title, sub, children }) {
  return (
    <div className="no-print">
      <div className="text-xs uppercase tracking-wide text-stone-500">{title}</div>
      {sub && <div className="text-[11px] text-stone-500 mb-2">{sub}</div>}
      <div className={sub ? '' : 'mt-2'}>{children}</div>
    </div>
  );
}

// Hidden until print — when the user prints, only this is visible (via @media print)
function PrintableWeek({ phase }) {
  return (
    <div className="hidden print:block">
      <h1 className="text-2xl font-bold mb-2">Annie's workout — Phase {phase.id}: {phase.name}</h1>
      {SESSION_TYPES.map((s) => {
        const sess = phase.sessions[s];
        if (!sess?.items?.length) return null;
        return (
          <div key={s} className="mt-4 page-break-inside-avoid">
            <h2 className="text-xl font-bold border-b border-stone-300 pb-1">{s}</h2>
            <ol className="mt-2 space-y-1">
              {sess.items.map((it, i) => {
                const ex = getExercise(it.ex);
                return (
                  <li key={i}>
                    <span className="font-bold">{i + 1}. {ex.name}</span>
                    <span className="text-stone-700"> — {it.dose}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })}
    </div>
  );
}
