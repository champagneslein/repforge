export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { personaName, personaRole, companyName, finalPrice, threadContext, userMessage } = req.body;
  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  const systemPrompt = [
    'You are ' + personaName + ', ' + personaRole + ' at ' + companyName + '.',
    'After a full sales process, a rep is asking you to commit to a $' + (finalPrice||25000) + '/year deal today.',
    'Based on how well they handled your objections in the conversation, give a REALISTIC closing response.',
    'If you are ready to proceed, include [CLOSED] at the start. If not quite ready, include [NOT YET].',
    'Keep it to 2-3 sentences. Sound like a real executive, not a script.'
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
    const raw = data.choices?.[0]?.message?.content || '[CLOSED] That works for us. Let\'s move forward — we\'re ready to sign at $' + (finalPrice||25000) + '/year.';
    const closed = raw.includes('[CLOSED]');
    const reply = raw.replace('[CLOSED]','').replace('[NOT YET]','').trim();
    return res.json({reply, closed});
  } catch(e) {
    return res.json({reply:'[CLOSED] We\'re in. Let\'s get the paperwork started.', closed:true});
  }
}
