// The simulation runs on a real calendar. `simDay` stays an integer index
// (day 1, 2, 3…) because every mechanic keys off it — email reply delays,
// memory timestamps, call logs — but it is anchored to a real start date so
// the UI shows actual dates and scheduled calls can be matched to a day.

export const MS_PER_DAY = 86400000;

export function todayIso() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

export function dateForDay(simStart, day) {
  const start = new Date(simStart || todayIso());
  start.setHours(0, 0, 0, 0);
  return new Date(start.getTime() + (Math.max(1, day) - 1) * MS_PER_DAY);
}

// Which sim day does this real date fall on? Can return < 1 (past) or a day
// beyond the current one (future).
export function dayForDate(simStart, date) {
  const start = new Date(simStart || todayIso());
  start.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - start.getTime()) / MS_PER_DAY) + 1;
}

export function formatSimDate(date, opts = {}) {
  return new Date(date).toLocaleDateString(undefined, {
    weekday: opts.weekday === false ? undefined : 'short',
    day: 'numeric',
    month: 'short',
    year: opts.year === false ? undefined : 'numeric',
  });
}

// Human-friendly gap between the current sim day and a target day.
export function relativeDayLabel(diff) {
  if (diff === 0) return 'today';
  if (diff === 1) return 'tomorrow';
  if (diff === -1) return 'yesterday';
  if (diff > 1) return 'in ' + diff + ' days';
  return Math.abs(diff) + ' days ago';
}
