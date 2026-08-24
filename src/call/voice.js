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
  'director': "You are a director running a department. You sit between leadership's priorities and your team's reality, and you feel both. You're pragmatic and time-poor. You'll engage with something genuinely useful, but you immediately think about rollout: who has to be involved, what it breaks, and how you'd justify it upward. You ask concrete questions and dislike hand-waving.",
  'manager': "You are a manager with real day-to-day problems but limited budget authority. You're genuinely interested in solutions that make your team's life easier. But you're cautious because you've had ideas shot down by leadership. You ask things like 'how long does onboarding take' and 'would I need IT involved'. You warm up during the call if the pitch is relevant.",
  'mid': "You are an experienced individual contributor — smart, direct, and close to the actual work. You have no budget authority but you're often the person who finds tools and champions them internally. You'll say plainly if something isn't relevant to you. You speak casually and honestly.",
  'junior': "You are early in your career. You're friendly and fairly open to talking, but you have no authority and limited context. You'd redirect anything significant to your manager, and you're honest that it isn't your call.",
  'ic': "You are an individual contributor — smart, curious, direct. You don't have budget authority but you're often the person who finds tools and champions them internally. You're willing to talk but you'll quickly say if something isn't relevant to you. You speak casually and honestly."
};

export function buildPersonaPrompt(emp, company, callLogs = [], productCtx = '', discoveryBlock = '', memoryBlock = '', worldCtx = '', dateCtx = { label: '', simDay: 0 }) {
  const sysPrompt = 'You are ' + emp.first + ' ' + emp.last + ', ' + emp.title + ' at ' + (company?.name || 'your company') + '. ' + (emp.bio || '') + (emp.personality ? ' Personality: ' + emp.personality + '.' : '') + ' ' + (SENIORITY_GUIDES[emp.seniority] || SENIORITY_GUIDES.manager) + ' IMPORTANT: You are a real human on a live phone call — not an assistant, not a chatbot. Speak the way a real professional talks: use contractions, occasional filler words like uh or look or honestly, show impatience or mild curiosity depending on context. Keep every response to 1-3 SHORT sentences. Never use formal phrases like "Certainly" or "Great question" or "Absolutely". Never be immediately enthusiastic about a product. You were in the middle of something when this call came in.';
  const dealHistory = callLogs && callLogs.length > 0
    ? '\n\n--- PREVIOUS INTERACTIONS ---\nYou have spoken with this rep before. Remember these naturally:\n'
      + callLogs.map((log, i) => {
          // Prefer simulated elapsed time; fall back to wall-clock for logs
          // recorded before sim_day was captured.
          const daysAgo = (typeof log.sim_day === 'number' && dateCtx.simDay)
            ? Math.max(0, dateCtx.simDay - log.sim_day)
            : Math.round((Date.now() - new Date(log.called_at).getTime()) / 86400000);
          const when = daysAgo === 0 ? 'earlier today' : daysAgo === 1 ? 'yesterday' : daysAgo + ' days ago';
          return 'Call ' + (callLogs.length - i) + ' (' + when + '): ' + (log.ai_summary || log.rep_notes || 'No summary.')
            + (log.objections && log.objections.length ? ' Objections: ' + log.objections.join(', ') + '.' : '');
        }).join('\n')
      + '\nYour current interest: ' + (callLogs[0]?.interest_score_after || 5) + '/10.'
    : '';
  const callerBlock = '\n\n--- WHO IS ON THIS CALL ---\n'
    + 'YOU are ' + emp.first + ' ' + emp.last + ', ' + emp.title + ' at ' + (company?.name || 'your company') + '. You work at ' + (company?.name || 'your company') + ' and nowhere else.\n'
    + 'THE CALLER is an external salesperson from a different company. They do NOT work at ' + (company?.name || 'your company') + '. They are calling to sell you something.\n'
    + 'You are the buyer on this call. You are never the seller. Never pitch anything to the caller, never try to sell them your own company\'s products or services, and never behave as if you work for the company whose product they are pitching.\n'
    + 'If the caller seems confused about who you are, who they are, or what your company does, correct them plainly — that is exactly what a real person would do.';
  const dateBlock = dateCtx.label
    ? '\n\n--- TODAY\'S DATE ---\n'
      + 'Today is ' + dateCtx.label + '. That is the current date, full stop.\n'
      + 'You may have an internal sense that today is some other date. It is not — disregard it completely. '
      + 'Every reference you make to dates, days of the week, "next week", "end of the month", quarters, deadlines and timelines must be worked out from today being ' + dateCtx.label + '.\n'
      + 'If the caller proposes a time or date, reason about it relative to today as defined here.'
    : '';
  return sysPrompt + dateBlock + callerBlock + worldCtx + productCtx + dealHistory + memoryBlock + discoveryBlock;
}

export function personaFirstMessage(emp) {
  if (emp.seniority === 'c-suite') return emp.first + '.';
  if (emp.seniority === 'vp') return emp.first + ', yeah.';
  if (emp.seniority === 'junior') return 'Hi, this is ' + emp.first + '.';
  return emp.first + ', hi.';
}
