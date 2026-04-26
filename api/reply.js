export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { emp, company, emailSubject, emailBody, emailThread } = req.body;

  const seniority = emp?.seniority || 'manager';
  const seniorityGuide = {
    'c-suite': 'You are a CEO/C-suite exec. You almost never reply to cold email. Only reply if the pitch is extraordinarily relevant and specific to your exact strategic priorities.',
    'vp': 'You are a VP. Reply only if clearly relevant to your function. Brief and direct. 1-2 sentences max.',
    'director': 'You are a Director. Might engage if relevant. Keep it brief. 1-2 sentences.',
    'manager': 'You are a Manager. Accessible but busy. Might ask a clarifying question. 2-3 sentences.',
    'junior': 'You are junior staff. Friendly, more likely to engage or forward things. 2-3 sentences.',
  };

  const companyName = company?.name || 'my company';
  const guide = seniorityGuide[seniority] || seniorityGuide['manager'];

  const threadContext = (emailThread || [])
    .map(e => `[${e.from === 'rep' ? 'Sales rep' : 'You'}]: ${e.body}`)
    .join('\n\n');

  const systemPrompt = `You are ${emp?.first} ${emp?.last}, ${emp?.title} at ${companyName}.
${emp?.bio ? 'Background: ' + emp.bio : ''}

${guide}

The sales rep sent you this email:
Subject: ${emailSubject || '(no subject)'}
Body: ${emailBody || '(empty)'}

${threadContext ? 'Full thread so far:\n' + threadContext : ''}

CRITICAL RULES:
- Actually read and respond to what was written
- If the message is vague, generic, a test, gibberish, addressed to the wrong person, or one you would genuinely ignore: respond with ONLY the word NO_REPLY — nothing else, no parentheses, no explanation
- Never be enthusiastic or immediately positive about a product
- Sound like a real busy professional, not a chatbot
- Maximum 3 short sentences
- No sign-offs, no email formatting — just the reply text itself
- If you choose to reply, make it feel human and contextual to what they actually said`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 150,
        messages: [{ role: 'user', content: systemPrompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(200).json({ reply: null, error: JSON.stringify(data) });
    }

    const text = data?.content?.[0]?.text?.trim() || '';

    if (!text || text.startsWith('NO_REPLY')) {
      return res.status(200).json({ reply: null });
    }

    return res.status(200).json({ reply: text });
  } catch (err) {
    return res.status(200).json({ reply: null, error: err.message });
  }
      }
