import { personaBriefing } from '../world/persona';
import { companySite } from '../world/content';
// Builds the persona's understanding of their own world: the company they
// work at, the pressures it faces, what their specific job is accountable
// for, what they can personally authorize, and how much of the org chart
// someone at their level would plausibly know.

const INDUSTRY_PRESSURES = {
  'SaaS': ['net revenue retention is under board scrutiny', 'CAC has crept up while win rates flattened', 'customers demand faster time-to-value than the product currently delivers', 'AI-native competitors are undercutting on price'],
  'Cyber Security': ['alert fatigue is burning out the security team', 'audit and compliance evidence gathering eats weeks per quarter', 'board asks for risk posture in business terms nobody can produce', 'tool sprawl means overlapping licences nobody has rationalised'],
  'Manufacturing': ['unplanned machine downtime wrecks delivery schedules', 'supply chain volatility makes forecasting guesswork', 'skilled labour shortage on the floor', 'quality data lives in spreadsheets and gets reconciled late'],
  'FinTech': ['regulatory reporting burden grows every year', 'fraud losses are rising faster than transaction volume', 'legacy core system limits what product can ship', 'partner bank integrations are slow and brittle'],
  'Fintech': ['regulatory reporting burden grows every year', 'fraud losses are rising faster than transaction volume', 'legacy core system limits what product can ship', 'partner bank integrations are slow and brittle'],
  'CleanTech': ['project financing timelines slipped with interest rates', 'grid interconnection queues delay revenue', 'subsidy policy uncertainty complicates planning', 'field asset performance data is patchy'],
  'Energy': ['asset uptime directly moves revenue', 'regulatory reporting is manual and error-prone', 'field data arrives too late to act on', 'capital projects routinely overrun'],
  'HealthTech': ['procurement cycles in health systems run 9-18 months', 'patient data governance blocks fast iteration', 'clinician adoption is the real bottleneck', 'interoperability with incumbent EHRs is painful'],
  'Healthcare': ['procurement cycles run 9-18 months', 'patient data governance blocks fast iteration', 'clinician adoption is the real bottleneck', 'interoperability with incumbent systems is painful'],
  'RetailTech': ['margin pressure from marketplace giants', 'omnichannel inventory accuracy is poor', 'seasonal demand spikes strain infrastructure', 'customer acquisition costs keep climbing'],
  'Retail Tech': ['margin pressure from marketplace giants', 'omnichannel inventory accuracy is poor', 'seasonal demand spikes strain infrastructure', 'customer acquisition costs keep climbing'],
  'PropTech': ['construction cost inflation squeezes project margins', 'site data collection is still paper-based in places', 'long sales cycles with conservative buyers', 'fragmented subcontractor coordination'],
  'Construction': ['project margins squeezed by cost inflation', 'site progress reporting lags reality by days', 'subcontractor coordination is fragmented', 'rework from late-caught quality issues'],
  'AI': ['GPU and inference costs grow faster than revenue', 'enterprise pilots stall before production', 'customers and regulators ask hard questions about AI risk', 'ML talent is scarce and expensive'],
  'Food & Beverage': ['retailers squeeze supplier margins every year', 'ingredient and packaging costs keep rising', 'food safety audits and traceability demand constant work', 'waste and short shelf life eat profit'],
  'Professional Services': ['billable utilisation is under pressure', 'clients push for fixed fees and more value', 'senior people are hard to hire and keep', 'new business depends too much on referrals'],
};

const SIZE_LABEL = { 'Enterprise': 'An enterprise', 'Mid-Market': 'A mid-market', 'SMB': 'A small' };

const SIZE_PRESSURES = {
  'Enterprise': 'You are big enough that process, procurement and security review slow everything down. Any new vendor goes through legal, InfoSec and often a formal business case. Internal politics matter — several teams have opinions.',
  'Mid-Market': 'You are past scrappy but not resourced like an enterprise. Budget exists but is fought over quarterly. You feel the pain of outgrowing tools that worked at half your size.',
  'SMB': 'You are small and resource-constrained. Everyone wears several hats, there is no dedicated procurement, and a new tool has to pay for itself quickly and obviously. You are wary of long contracts.',
};

// What someone at this level is actually accountable for, and the limits of
// what they can personally decide.
const ROLE_SCOPE = {
  'c-suite': {
    accountable: 'company-level outcomes: growth, margin, risk, and what the board asks about each quarter',
    authority: 'You have final budget authority. You can greenlight a purchase in a single conversation if the business case is genuinely compelling — but you rarely do, and you would normally push the evaluation down to the relevant owner.',
    knows: 'the entire organisation: every function, the leadership team by name, headcount, the strategic plan, and roughly what each department costs',
  },
  'vp': {
    accountable: 'your function hitting its numbers and your leadership team not having to worry about your area',
    authority: 'You control a real budget within your function and can approve mid-sized spend yourself. Anything large, multi-year, or crossing into another function needs the CFO or CEO to sign off, and Security/Legal review if it touches data.',
    knows: 'your whole function in detail, the other VPs and the exec team, your org\'s headcount and budget, and the top company priorities for the year',
  },
  'director': {
    accountable: 'your department delivering, and translating leadership priorities into execution',
    authority: 'You have departmental budget for tooling within limits, but a new vendor of any size needs your VP\'s approval and usually a procurement process. You can absolutely kill an evaluation on your own.',
    knows: 'your department deeply, your VP and peer directors, adjacent teams you depend on, and the broad shape of company strategy',
  },
  'manager': {
    accountable: 'your team\'s day-to-day output and the problems that land on your desk every week',
    authority: 'You have a small discretionary budget at most. For anything meaningful you have to build a case and take it to your director or VP — which means you need ammunition: numbers, a clear problem statement, and a reason it must be now.',
    knows: 'your team and its work intimately, your manager and skip-level, the teams you interface with, and whatever leadership has communicated downward',
  },
  'mid': {
    accountable: 'your own deliverables and the quality of the work your team ships',
    authority: 'You have no budget authority. You can influence — you are often the one who finds a tool and champions it internally — but someone above you decides. You would need your manager bought in first.',
    knows: 'your immediate team and how the work actually gets done, your manager, and a general sense of the wider org without the details',
  },
  'junior': {
    accountable: 'the tasks assigned to you and learning your function',
    authority: 'You have no budget authority and limited influence. You would pass anything interesting to your manager rather than pursue it yourself.',
    knows: 'your immediate team, your manager, and only a vague picture of the wider organisation',
  },
};


function orgView(emp, colleagues, companyName) {
  const others = (colleagues || []).filter(c => c.id !== emp.id);
  if (others.length === 0) return '';
  const byLevel = l => others.filter(c => c.seniority === l).map(c => c.first + ' ' + c.last + ' (' + c.title + ')');
  const leaders = [...byLevel('c-suite'), ...byLevel('vp')];
  const middle = [...byLevel('director'), ...byLevel('manager')];
  const ics = [...byLevel('mid'), ...byLevel('junior')];

  // Seniority determines how much of the org this person plausibly knows.
  let visible;
  if (emp.seniority === 'c-suite' || emp.seniority === 'vp') {
    visible = others.map(c => c.first + ' ' + c.last + ' (' + c.title + ')');
  } else if (emp.seniority === 'director' || emp.seniority === 'manager') {
    visible = [...leaders, ...middle];
  } else {
    visible = [...leaders.slice(0, 3), ...middle.slice(0, 3)];
  }
  if (visible.length === 0) return '';
  return '\nColleagues you know at ' + (companyName || emp.cName || 'your company') + ': ' + visible.slice(0, 12).join('; ')
    + (ics.length && (emp.seniority === 'c-suite' || emp.seniority === 'vp') ? '' : '')
    + '. Only mention people if it is natural — for example, saying who else would need to be involved in a decision.';
}

export function buildWorldContext(emp, company, colleagues) {
  if (!company) return '';
  const people = colleagues || [];
  const scope = ROLE_SCOPE[emp.seniority] || ROLE_SCOPE.manager;
  const pressures = INDUSTRY_PRESSURES[company.industry] || [];
  const sizeNote = SIZE_PRESSURES[company.size] || '';

  const lines = [
    '\n\n--- YOUR WORLD (what you know because you work here) ---',
    'Company: ' + company.name + ' — ' + (company.description ? company.description.replace(/\.?$/, '. ') : '')
      + (SIZE_LABEL[company.size] || 'A') + ' company in ' + company.industry
      + ', roughly ' + (company.employees || 'a few dozen') + ' people, based in ' + (company.location || 'your city') + '.',
  ];
  if (sizeNote) lines.push('How decisions work here: ' + sizeNote);
  if (pressures.length) lines.push('Pressures on the business right now: ' + pressures.join('; ') + '.');
  lines.push('Your job: as ' + emp.title + ' you are accountable for ' + scope.accountable + '.');
  lines.push('What you can actually authorise: ' + scope.authority);
  lines.push('What you know about the company: ' + scope.knows + '.');

  const org = orgView(emp, colleagues, company.name);
  if (org) lines.push(org);

  // Personality, own challenges (with detail), goals, reporting line, company
  // history and how decisions get made: see src/world/persona.js.
  lines.push(personaBriefing(emp, company, people, companySite(company, people)));
  lines.push('Draw on all of this naturally when it is relevant. Do not recite it. If the caller asks about your business, your team, your priorities, or who makes decisions, answer from this as if it is simply your job. If the caller guesses wrong about your company or your role, correct them the way a real person would.');
  return lines.join('\n');
}
