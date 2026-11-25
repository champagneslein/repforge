// GET/POST /api/memory/:personaId: long-term memory for an AI persona, an
// append-only event log per (trainee, persona) capped at the latest 100 events.
import { configured, getUserId, selectOne, upsert, notConfigured } from '../_lib/supabase';

const MAX_EVENTS = 100;

export default async function handler(req, res) {
  if (!configured()) return notConfigured(res);
  const userId = await getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Not signed in' });
  const personaId = parseInt(req.query.personaId, 10);
  if (!Number.isInteger(personaId)) return res.status(400).json({ error: 'bad persona id' });
  try {
    const row = await selectOne('persona_memory', { user_id: userId, persona_id: personaId });
    if (req.method === 'GET') {
      return res.status(200).json({ events: row ? row.events : [], summary: row ? row.summary : null });
    }
    if (req.method === 'POST') {
      const body = req.body || {};
      const incoming = Array.isArray(body.events) ? body.events : [];
      if (!incoming.length && body.summary == null) return res.status(400).json({ error: 'nothing to append' });
      const now = new Date().toISOString();
      const added = incoming.map(e => ({ type: e.type || 'note', day: Number(e.day) || 0, text: String(e.text || ''), at: now }));
      const events = [...(row ? row.events : []), ...added].slice(-MAX_EVENTS);
      await upsert('persona_memory', {
        user_id: userId, persona_id: personaId, events,
        summary: body.summary != null ? body.summary : (row ? row.summary : null),
        updated_at: now,
      });
      return res.status(200).json({ ok: true });
    }
    return res.status(405).end();
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
