// GET/PUT /api/goldstandard: the reference product profile trainees are graded
// against. One per tenant; single-tenant for now.
import { configured, getUserId, selectOne, upsert, notConfigured } from './_lib/supabase';

const TENANT = 'repforge';

export default async function handler(req, res) {
  if (!configured()) return notConfigured(res);
  const userId = await getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Not signed in' });
  try {
    if (req.method === 'GET') {
      const row = await selectOne('gold_standard', { tenant_id: TENANT });
      return res.status(200).json({ data: row ? row.data : null });
    }
    if (req.method === 'PUT') {
      const data = req.body && req.body.data;
      if (!data || typeof data !== 'object' || Array.isArray(data)) return res.status(400).json({ error: 'data must be a JSON object' });
      await upsert('gold_standard', { tenant_id: TENANT, data, updated_at: new Date().toISOString() });
      return res.status(200).json({ ok: true });
    }
    return res.status(405).end();
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
