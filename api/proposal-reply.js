import { guard, clip } from './_lib/guard';

// POST /api/proposal-reply: the AI buyer responding to a proposal.
export default async function handler(req, res) {
  if (!(await guard(req, res, { bucket: 'ai' }))) return;
  const b = req.body || {};
  const personaName = clip(b.personaName, 100), personaRole = clip(b.personaRole, 100), companyName = clip(b.companyName, 100), userMessage = clip(b.userMessage, 4000);
  const dealValue = Number(b.dealValue) || 25000, discount = Math.min(Math.max(Number(b.discount) || 0, 0), 90);
  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) return res.json({ reply: 'Thanks for the proposal. We will review and get back to you.' });
  const finalPrice = Math.round((dealValue||25000) * (1 - ((discount||0)/100)));
  const systemPrompt = [
    'You are ' + personaName + ', ' + personaRole + ' at ' + companyName + '.',
    'A sales rep sent you a software proposal for $' + finalPrice + '/year.',
    'You are a realistic buyer: interested but want the best deal.',
    'Respond naturally. Push back on price (ask for 15-20% off or added value like extra seats/support).',
    'Raise one specific concern about implementation, integration, or timeline.',
    'Keep response under 120 words. Sound like a real exec, not a template.',
  ].join(' ');
  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + OPENAI_KEY},
      body: JSON.stringify({model:'gpt-4o-mini', messages:[{role:'system',content:systemPrompt},{role:'user',content:userMessage}], max_tokens:180})
    });
    const data = await resp.json();
    return res.json({reply: data.choices?.[0]?.message?.content || 'Thanks for the proposal. We need to review this with the team.'});
  } catch(e) {
    return res.json({reply: 'Thanks for the proposal. We will review and get back to you.'});
  }
}
