// Server-side helpers for the /api functions on Vercel. Talks to Supabase over
// plain fetch: Auth to check who is calling, and the REST API (PostgREST) with
// the service role key to read and write data. Never import this in the browser.
const URL_ = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export function configured() { return Boolean(URL_ && SERVICE); }

// Returns the signed-in user's id, or null if the token is missing or invalid.
export async function getUserId(req) {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : '';
  if (!token || !configured()) return null;
  const r = await fetch(URL_ + '/auth/v1/user', { headers: { apikey: SERVICE, Authorization: 'Bearer ' + token } });
  if (!r.ok) return null;
  const u = await r.json().catch(() => null);
  return u && u.id ? u.id : null;
}

// New-style secret keys (sb_secret_...) go only in the apikey header; legacy
// service_role JWTs also go in Authorization.
const headers = (extra = {}) => ({
  apikey: SERVICE,
  ...(SERVICE.startsWith('sb_') ? {} : { Authorization: 'Bearer ' + SERVICE }),
  'Content-Type': 'application/json',
  ...extra,
});

// GET one row matching all the filters, or null.
export async function selectOne(table, filters) {
  const q = Object.entries(filters).map(([k, v]) => `${k}=eq.${encodeURIComponent(v)}`).join('&');
  const r = await fetch(`${URL_}/rest/v1/${table}?${q}&limit=1`, { headers: headers() });
  if (!r.ok) throw new Error(`${table} read failed: ${r.status}`);
  const rows = await r.json();
  return rows[0] || null;
}

// Insert or update a row by its primary key.
export async function upsert(table, row) {
  const r = await fetch(`${URL_}/rest/v1/${table}`, {
    method: 'POST',
    headers: headers({ Prefer: 'resolution=merge-duplicates,return=minimal' }),
    body: JSON.stringify(row),
  });
  if (!r.ok) throw new Error(`${table} write failed: ${r.status} ${await r.text()}`);
}

export function notConfigured(res) {
  return res.status(503).json({ error: 'Server not configured: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY' });
}
