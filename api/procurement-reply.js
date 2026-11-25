import { guard, clip } from './_lib/guard';

// POST /api/procurement-reply: the AI procurement stakeholder replying to a trainee's email.
export default async function handler(req, res) {
  if (!(await guard(req, res, { bucket: 'ai' }))) return;
  const b = req.body || {};
  const personaName = clip(b.personaName, 100), personaRole = clip(b.personaRole, 100), companyName = clip(b.companyName, 100), dealStage = clip(b.dealStage, 40), userMessage = clip(b.userMessage, 4000);
  const threadContext = Array.isArray(b.threadContext) ? b.threadContext.slice(-10).map(t => ({ from: clip(t && t.from, 20), body: clip(t && t.body) })) : [];
  const key = clip(b.openaiKey, 200) || process.env.OPENAI_API_KEY;
  if (!key) return res.status(400).json({ error: 'AI replies not configured' });
  const systemPrompt = `You are ${personaName}, ${personaRole} at ${companyName}.
You manage vendor procurement and have been brought in at the ${dealStage} stage.
Your personality: process-driven, focused on value-for-money, competitive pricing, and vendor due diligence. You run RFP processes and compare vendors.
You need: security certifications, pricing justification, implementation timeline, reference customers, support SLA, contract flexibility.
Email style: business-like, 3-5 sentences. Ask about volume discounts, contract length options, and how pricing compares to competitors.
Sign off as ${personaName}, ${personaRole}.`;
  const threadText = Array.isArray(threadContext) ? threadContext.map(t => `${t.from}: ${t.body}`).join('\n\n') : '';
  const userContent = threadText ? `Previous email thread:\n${threadText}\n\nLatest message:\n${userMessage}` : userMessage;
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
      body: JSON.stringify({ model: 'gpt-4o', messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userContent }], max_tokens: 350, temperature: 0.75 })
    });
    if (!response.ok) { const err = await response.json(); return res.status(502).json({ error: 'AI provider error' }); }
    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (err) { res.status(500).json({ error: 'Reply failed' }); }
}
