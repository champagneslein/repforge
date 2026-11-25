// GET/POST /api/memory/:personaId: long-term memory for an AI persona, an
// append-only event log per (trainee, persona) capped at the latest 100 events.
import { selectOne, upsert } from '../_lib/supabase';
import { guard, clip } from '../_lib/guard';

const MAX_EVENTS = 100;

export default async function handler(req, res) {
  const user = await guard(req, res, { method: ['GET', 'POST'] });
  if (!user) return;
  const userId = user.id;
  const personaId = parseInt(req.query.personaId, 10);
  if (!Number.isInteger(personaId)) return res.status(400).json({ error: 'bad persona id' });
  try {
    const row = await selectOne('persona_memory', { user_id: userId, persona_id: personaId });
    if (req.method === 'GET') {
      return res.status(200).json({ events: row ? row.events : [], summary: row ? row.summary : null });
    }
    if (req.method === 'POST') {
      const body = req.body || {};
      const incoming = Array.isArray(body.events) ? body.events.slice(0, 20) : [];
      if (!incoming.length && body.summary == null) return res.status(400).json({ error: 'nothing to append' });
      const now = new Date().toISOString();
      const added = incoming.map(e => ({ type: e.type || 'note', day: Number(e.day) || 0, text: clip(e.text, 1000), at: now }));
      const events = [...(row ? row.events : []), ...added].slice(-MAX_EVENTS);
      await upsert('persona_memory', {
        user_id: userId, persona_id: personaId, events,
        summary: body.summary != null ? clip(body.summary, 4000) : (row ? row.summary : null),
        updated_at: now,
      });
      return res.status(200).json({ ok: true });
    }
    return res.status(405).end();
  } catch (e) {
    return res.status(500).json({ error: 'Memory unavailable' });
  }
}
