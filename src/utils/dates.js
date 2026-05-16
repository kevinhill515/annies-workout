// Weeks run Monday → Sunday for Annie. (Different from the calisthenics
// tracker which runs Saturday → Friday.) Annie's program starts whenever
// she first opens the app — start date can be edited in Settings.

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
  // Most recent Monday. JS getDay: Sun=0..Sat=6. Monday is 1.
  // (day - 1 + 7) % 7 days back: Mon=0, Tue=1, ..., Sun=6.
  const day = d.getDay();
  const diff = (day - 1 + 7) % 7;
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
