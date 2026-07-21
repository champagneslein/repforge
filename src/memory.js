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

export function buildMemoryBlock(mem) {
  const events = mem?.events || [];
  if (!mem || (!mem.summary && events.length === 0)) return '';
  const recent = events.slice(-15);
  const lines = recent.map(e => 'Day ' + e.day + ' — ' + (e.type || 'note').replace(/_/g, ' ') + ': ' + e.text);
  return '\n\n--- YOUR MEMORY OF THIS SALES REP ---\n'
    + 'These things actually happened to you, in order. They are part of your life at this company.\n'
    + (mem.summary ? 'Earlier history: ' + mem.summary + '\n' : '')
    + (events.length > recent.length ? '(…' + (events.length - recent.length) + ' earlier interactions omitted)\n' : '')
    + lines.join('\n')
    + '\nRefer to these memories naturally when relevant. If the rep claims something that contradicts them, you notice and react like a real person would.';
}
