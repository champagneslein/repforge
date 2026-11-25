// GET /api/calltoken: swaps the server-side ElevenLabs API key for a short-lived
// conversation token, so the key never reaches the browser.
import { guard } from './_lib/guard';

export default async function handler(req, res) {
  // Voice minutes cost money: signed-in users only, with daily limits.
  if (!(await guard(req, res, { method: 'GET', bucket: 'voice' }))) return;
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const agentId = process.env.ELEVENLABS_AGENT_ID;
  if (!apiKey || !agentId) return res.status(503).json({ error: 'Voice calls not configured: set ELEVENLABS_API_KEY and ELEVENLABS_AGENT_ID' });
  const r = await fetch('https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=' + encodeURIComponent(agentId), {
    headers: { 'xi-api-key': apiKey },
  });
  if (!r.ok) return res.status(r.status).json({ error: 'ElevenLabs token request failed' });
  return res.status(200).json(await r.json());
}
