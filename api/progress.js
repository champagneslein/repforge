// GET/PUT /api/progress: the signed-in trainee's saved simulation state.
import { selectOne, upsert } from './_lib/supabase';
import { guard } from './_lib/guard';

export default async function handler(req, res) {
  const user = await guard(req, res, { method: ['GET', 'PUT'] });
  if (!user) return;
  const userId = user.id;
  try {
    if (req.method === 'GET') {
      const row = await selectOne('progress', { user_id: userId });
      return res.status(200).json({ data: row ? row.data : null });
    }
    if (req.method === 'PUT') {
      const data = req.body && req.body.data;
      if (!data || typeof data !== 'object' || Array.isArray(data)) return res.status(400).json({ error: 'data must be a JSON object' });
      await upsert('progress', { user_id: userId, data, updated_at: new Date().toISOString() });
      return res.status(200).json({ ok: true });
    }
    return res.status(405).end();
  } catch (e) {
    return res.status(500).json({ error: 'Could not load or save progress' });
  }
}
