// Persona voice selection and prompt building for ElevenLabs calls.

const FEMALE_NAMES = new Set(['aoife','fiona','siobhan','niamh','brigid','caoimhe','emer','grainne','muireann','nuala','roisin','saoirse','emma','sarah','sophie','claire','rachel','laura','kate','anne','mary','lisa','helen','jane','julia','alice','olivia','grace','emily','charlotte','amy','hannah','leah','ava']);

export function selectVoice(firstName, seniority) {
  const isFemale = FEMALE_NAMES.has((firstName || '').toLowerCase());
  if (seniority === 'c-suite') return isFemale ? 'XrExE9yKIg1WjnnlVkGX' : 'pNInz6obpgDQGcFmaJgB'; // Matilda / Adam
  if (seniority === 'vp')      return isFemale ? 'EXAVITQu4vr4xnSDxMaL' : 'nPczCjzI2devNBz1zQrb'; // Sarah / Brian
  if (seniority === 'manager') return isFemale ? 'cgSgspJ2msm6clMCkdW9' : 'cjVigY5qzO86Huf0OWal'; // Jessica / Eric
  return isFemale ? 'FGY2WhTYpPnrIDTdsKH5' : 'bIHbv24MWmeRgasZH58o'; // Laura / Will
}

const SENIORITY_GUIDES = {
  'c-suite': "You are a busy C-suite executive. You speak in short, direct sentences — never more than 2-3 at a time. You are deeply skeptical of cold outreach. You've heard hundreds of pitches and most waste your time. You only engage if something genuinely connects to a board-level priority. You ask sharp questions: What's the measurable ROI? Who else is using this? Why now? You push back hard on vague claims. You occasionally cut people off if they're rambling. You never get excited easily.",
  'vp': "You are a VP-level executive with a full team and an existing stack. You're open to new solutions but not desperate. You've been burned by vendors who overpromised. You care about: will my team actually use this, what's the implementation cost, and does this integrate with what we have. You're polite but direct. You don't small-talk.",
  'manager': "You are a manager with real day-to-day problems but limited budget authority. You're genuinely interested in solutions that make your team's life easier. But you're cautious because you've had ideas shot down by leadership. You ask things like 'how long does onboarding take' and 'would I need IT involved'. You warm up during the call if the pitch is relevant.",
  'ic': "You are an individual contributor — smart, curious, direct. You don't have budget authority but you're often the person who finds tools and champions them internally. You're willing to talk but you'll quickly say if something isn't relevant to you. You speak casually and honestly."
};

export function buildPersonaPrompt(emp, company, callLogs = [], productCtx = '', discoveryBlock = '', memoryBlock = '') {
  const sysPrompt = 'You are ' + emp.first + ' ' + emp.last + ', ' + emp.title + ' at ' + (company?.name || 'your company') + '. ' + (emp.bio || '') + (emp.personality ? ' Personality: ' + emp.personality + '.' : '') + ' ' + (SENIORITY_GUIDES[emp.seniority] || SENIORITY_GUIDES.manager) + ' IMPORTANT: You are a real human on a live phone call — not an assistant, not a chatbot. Speak the way a real professional talks: use contractions, occasional filler words like uh or look or honestly, show impatience or mild curiosity depending on context. Keep every response to 1-3 SHORT sentences. Never use formal phrases like "Certainly" or "Great question" or "Absolutely". Never be immediately enthusiastic about a product. You were in the middle of something when this call came in.';
  const dealHistory = callLogs && callLogs.length > 0
    ? '\n\n--- PREVIOUS INTERACTIONS ---\nYou have spoken with this rep before. Remember these naturally:\n'
      + callLogs.map((log, i) => {
          const daysAgo = Math.round((Date.now() - new Date(log.called_at).getTime()) / 86400000);
          return 'Call ' + (callLogs.length - i) + ' (' + daysAgo + ' days ago): ' + (log.ai_summary || log.rep_notes || 'No summary.')
            + (log.objections && log.objections.length ? ' Objections: ' + log.objections.join(', ') + '.' : '');
        }).join('\n')
      + '\nYour current interest: ' + (callLogs[0]?.interest_score_after || 5) + '/10.'
    : '';
  return sysPrompt + productCtx + dealHistory + memoryBlock + discoveryBlock;
}

export function personaFirstMessage(emp) {
  if (emp.seniority === 'c-suite') return emp.first + '.';
  if (emp.seniority === 'vp') return emp.first + ', yeah.';
  if (emp.seniority === 'junior') return 'Hi, this is ' + emp.first + '.';
  return emp.first + ', hi.';
}
