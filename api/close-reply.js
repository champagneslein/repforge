export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { personaName, personaRole, companyName, finalPrice, threadContext, userMessage } = req.body;
  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  const systemPrompt = [
    'You are ' + personaName + ', ' + personaRole + ' at ' + companyName + '.',
    'After a full sales process, a rep is asking you to commit to a $' + (finalPrice||25000) + '/year deal today.',
    'Based on how well they handled your objections in the conversation, give a REALISTIC closing response.',
    'If they did well: say yes, express genuine excitement, give a clear verbal commit.',
    'If they left objections unresolved: say you need more time or approval.',
    'End your reply with exactly one of these tags on its own line: [CLOSED] or [NOT YET].',
    'Keep response under 100 words.',
  ].join(' ');
  try {
    const msgs = [{role:'system', content:systemPrompt}];
    if (Array.isArray(threadContext)) threadContext.slice(-4).forEach(m => msgs.push({role:'user',content:m}));
    msgs.push({role:'user', content:userMessage});
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {'Content-Type':'application/json','Authorization':'Bearer ' + OPENAI_KEY},
      body: JSON.stringify({model:'gpt-4o-mini', messages:msgs, max_tokens:160})
    });
    const data = await resp.json();
    const raw = data.choices?.[0]?.message?.content || '';
    const closed = raw.includes('[CLOSED]');
    const reply = raw.replace('[CLOSED]','').replace('[NOT YET]','').trim();
    return res.json({reply, closed});
  } catch(e) {
    return res.json({reply:'We need a bit more time to finalize internally.', closed:false});
  }
}
