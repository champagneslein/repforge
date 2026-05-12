const fetch = require('node-fetch');
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { personaName, personaRole, companyName, dealStage, threadContext, userMessage, openaiKey } = req.body;
  const key = openaiKey || process.env.OPENAI_API_KEY;
  if (!key) return res.status(400).json({ error: 'No OpenAI key provided' });
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
    if (!response.ok) { const err = await response.json(); return res.status(response.status).json({ error: err.error?.message || 'OpenAI error' }); }
    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
