// GET /api/calltoken: swaps the server-side ElevenLabs API key for a short-lived
// conversation token, so the key never reaches the browser.
import { configured, getUserId, notConfigured } from './_lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  if (!configured()) return notConfigured(res);
  const userId = await getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Not signed in' });
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const agentId = process.env.ELEVENLABS_AGENT_ID;
  if (!apiKey || !agentId) return res.status(503).json({ error: 'Voice calls not configured: set ELEVENLABS_API_KEY and ELEVENLABS_AGENT_ID' });
  const r = await fetch('https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=' + encodeURIComponent(agentId), {
    headers: { 'xi-api-key': apiKey },
  });
  if (!r.ok) return res.status(r.status).json({ error: 'ElevenLabs token request failed' });
  return res.status(200).json(await r.json());
}
