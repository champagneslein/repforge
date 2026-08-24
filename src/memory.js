import { apiGet, apiPost } from './api';

// Persona memory: every meaningful thing that happens between the rep and a
// persona is recorded server-side, then replayed into the persona's prompt on
// the next call so agents remember their world across sessions and channels.

export async function fetchPersonaMemory(personaId) {
  const res = await apiGet('/api/memory/' + personaId);
  return res || { events: [], summary: null };
}

// Fire-and-forget append; memory must never block or break the UX.
export function remember(personaId, type, day, text) {
  if (!personaId || !text) return;
  apiPost('/api/memory/' + personaId, { events: [{ type, day, text }] }).catch(() => {});
}

export function buildMemoryBlock(mem, currentSimDay) {
  const events = mem?.events || [];
  if (!mem || (!mem.summary && events.length === 0)) return '';
  const recent = events.slice(-15);
  // Express timing the way a person would, relative to today in the sim.
  const when = (day) => {
    if (!currentSimDay || typeof day !== 'number') return '';
    const diff = currentSimDay - day;
    if (diff <= 0) return 'Earlier today';
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return diff + ' days ago';
    if (diff < 14) return 'About a week ago';
    if (diff < 31) return Math.round(diff / 7) + ' weeks ago';
    return 'Over a month ago';
  };
  const lines = recent.map(e => {
    const w = when(e.day);
    return (w ? w + ' — ' : '') + (e.type || 'note').replace(/_/g, ' ') + ': ' + e.text;
  });
  return '\n\n--- YOUR MEMORY OF THIS SALES REP ---\n'
    + 'These things actually happened to you, in order. They are part of your life at this company.\n'
    + (mem.summary ? 'Earlier history: ' + mem.summary + '\n' : '')
    + (events.length > recent.length ? '(…' + (events.length - recent.length) + ' earlier interactions omitted)\n' : '')
    + lines.join('\n')
    + '\nRefer to these memories naturally when relevant. If the rep claims something that contradicts them, you notice and react like a real person would.';
}
