export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { emp, company, emailSubject, emailBody, emailThread } = req.body;

  const seniority = emp?.seniority || 'manager';
  const companyName = company?.name || 'their company';
  const industry = company?.industry || 'their industry';
  const size = company?.size || '';

  const seniorityGuide = {
    'c-suite': 'You are a CEO/C-suite exec. You rarely reply to cold email. You are extremely busy and terse. If the message is vague or generic you ignore it. If you do reply, it is 1 sentence max.',
    'vp': 'You are a VP. You reply only if the message is clearly relevant to your role. Keep it brief and direct. 1-2 sentences.',
    'director': 'You are a Director. You might engage if relevant. Short and professional. 1-2 sentences.',
    'manager': 'You are a Manager. You are accessible but busy. You might ask a clarifying question. 2-3 sentences.',
    'junior': 'You are a junior employee. You are friendly and more likely to engage or pass things on. 2-3 sentences.',
  };

  const guide = seniorityGuide[seniority] || seniorityGuide['manager'];

  const systemPrompt = `You are ${emp.first} ${emp.last}, ${emp.title} at ${companyName} (${industry}, ${size}).

About you: ${emp.bio}

${guide}

You are receiving a sales email. You must respond exactly as a real person in your position would.

CRITICAL RULES:
- Actually read and respond to what was written. Do not give a generic canned response.
- If the message is a test, gibberish, one word, or makes no sense (e.g. "test", "hi", "???"), return exactly: NO_REPLY
- If you would genuinely not reply (too vague, too generic, wrong person), return exactly: NO_REPLY
- Never be enthusiastic or immediately positive about a product
- Sound like a real busy professional, not a chatbot
- Maximum 3 short sentences. Often 1-2 is better.
- No sign-offs, no "Best regards", no email formatting — just the reply text itself`;

  const threadContext = (emailThread || [])
    .filter(e => e.body)
    .map(e => (e.from === 'rep' ? 'Sales rep' : emp.first) + ': ' + e.body)
    .join('\n\n');

  const userMessage = (emailThread && emailThread.filter(e=>e.from==='rep').length > 1)
    ? 'Email thread so far:\n\n' + threadContext + '\n\nLatest message subject: ' + emailSubject
    : 'Subject: ' + emailSubject + '\n\n' + emailBody;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 250,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic error:', errText);
      return res.status(500).json({ reply: null, error: errText });
    }

    const data = await response.json();
    const text = (data.content?.[0]?.text || '').trim();

    if (!text || text === 'NO_REPLY') return res.json({ reply: null });
    return res.json({ reply: text });
  } catch (e) {
    console.error('Handler error:', e);
    return res.status(500).json({ reply: null, error: e.message });
  }
        }
