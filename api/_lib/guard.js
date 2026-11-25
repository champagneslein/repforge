// Shared protection for every /api function:
// - only signed-in users (Supabase session), never anonymous callers
// - a daily usage limit per user AND a daily cap across all users, so costs
//   (AI tokens, voice minutes) can never run away, even with mass sign-ups
// - a cap on request size, so nobody can send huge, expensive prompts
// Limits can be tuned with environment variables on Vercel.
import { configured, getUser, rpc, notConfigured } from './supabase';

const LIMITS = {
  ai: { user: Number(process.env.AI_DAILY_LIMIT_PER_USER) || 150, total: Number(process.env.AI_DAILY_LIMIT_TOTAL) || 2000 },
  voice: { user: Number(process.env.VOICE_DAILY_LIMIT_PER_USER) || 15, total: Number(process.env.VOICE_DAILY_LIMIT_TOTAL) || 150 },
};
const MAX_BODY = 40000; // characters of JSON

// Returns the signed-in user ({ id, email }) or null after sending an error.
export async function guard(req, res, { method = 'POST', bucket = null } = {}) {
  const methods = Array.isArray(method) ? method : [method];
  if (!methods.includes(req.method)) { res.status(405).json({ error: 'Method not allowed' }); return null; }
  if (!configured()) { notConfigured(res); return null; }
  if (req.body && JSON.stringify(req.body).length > MAX_BODY) { res.status(413).json({ error: 'Request too large' }); return null; }
  const user = await getUser(req);
  if (!user) { res.status(401).json({ error: 'Not signed in' }); return null; }
  if (bucket) {
    const l = LIMITS[bucket];
    let ok = false;
    try { ok = await rpc('use_quota', { p_user: user.id, p_bucket: bucket, p_user_limit: l.user, p_total_limit: l.total }); } catch (e) { ok = false; }
    if (ok !== true) { res.status(429).json({ error: 'Daily limit reached. Try again tomorrow.' }); return null; }
  }
  return user;
}

// Trim untrusted text before it goes into a prompt.
export const clip = (s, n = 2000) => String(s == null ? '' : s).slice(0, n);
