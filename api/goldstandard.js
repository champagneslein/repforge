// GET/PUT /api/goldstandard: the reference product profile trainees are graded
// against. One per tenant; single-tenant for now.
import { selectOne, upsert, isAdmin } from './_lib/supabase';
import { guard } from './_lib/guard';

const TENANT = 'repforge';

export default async function handler(req, res) {
  const user = await guard(req, res, { method: ['GET', 'PUT'] });
  if (!user) return;
  try {
    if (req.method === 'GET') {
      const row = await selectOne('gold_standard', { tenant_id: TENANT });
      return res.status(200).json({ data: row ? row.data : null });
    }
    if (req.method === 'PUT') {
      // Everyone is graded against this, so only admins may change it.
      if (!isAdmin(user)) return res.status(403).json({ error: 'Only admins can change the gold standard' });
      const data = req.body && req.body.data;
      if (!data || typeof data !== 'object' || Array.isArray(data)) return res.status(400).json({ error: 'data must be a JSON object' });
      await upsert('gold_standard', { tenant_id: TENANT, data, updated_at: new Date().toISOString() });
      return res.status(200).json({ ok: true });
    }
    return res.status(405).end();
  } catch (e) {
    return res.status(500).json({ error: 'Could not load or save the gold standard' });
  }
}
