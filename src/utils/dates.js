// Weeks run Saturday → Friday to match the calisthenics-tracker convention
// (lets you keep the same mental model across both apps). Annie's program
// starts whenever she first opens the app — but the start date can be
// edited in Settings.

const MS_PER_DAY = 86_400_000;

export function parseDate(s) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d, 12, 0, 0, 0);
}

export function fmtDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function weekStartOf(d) {
  const day = d.getDay();
  const diff = (day - 6 + 7) % 7;
  const m = new Date(d);
  m.setHours(12, 0, 0, 0);
  m.setDate(m.getDate() - diff);
  return m;
}

export function weekEndOf(d) {
  const start = weekStartOf(d);
  const e = new Date(start);
  e.setDate(e.getDate() + 6);
  return e;
}

export function weekId(asOf = new Date()) {
  return fmtDate(weekStartOf(asOf));
}

export function weekNumber(startDate, asOf = new Date()) {
  const start = weekStartOf(parseDate(startDate));
  const now = weekStartOf(asOf);
  const diff = Math.floor((now - start) / (MS_PER_DAY * 7));
  return diff + 1;
}

export function fmtWeekRange(asOf = new Date()) {
  const s = weekStartOf(asOf);
  const e = weekEndOf(asOf);
  const fmt = (d) => d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  return `${fmt(s)} – ${fmt(e)}`;
}
