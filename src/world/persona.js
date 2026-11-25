// The "brain" behind every person in the world: their job function, their
// own pains and goals (and the detail behind each one), their personality,
// who they report to and work with, and how buying decisions get made at
// their company. Websites, LinkedIn profiles, posts and the AI personas on
// calls and emails all read from here, so everything stays consistent.
//
// Deterministic: the same person always gets the same answers.

function hash(s) { let h = 2166136261; for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function rng(seed) {
  let a = hash(seed);
  return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const pick = (r, a) => a[Math.floor(r() * a.length)];
const between = (r, lo, hi) => lo + Math.floor(r() * (hi - lo + 1));
const lc = s => s.charAt(0).toLowerCase() + s.slice(1);
const RANK = { 'c-suite': 5, vp: 4, director: 3, manager: 2, mid: 1, junior: 0 };
const LEVEL = { 'c-suite': 'exec', vp: 'exec', director: 'manager', manager: 'manager', mid: 'ic', junior: 'ic' };

// ---------- job functions ----------
const FN_RULES = [
  ['exec', /\b(CEO|Chief Executive|Founder|Managing Partner|Managing Director|MD)\b/i],
  ['security', /\b(CISO|Security|SOC|Threat|Penetration)\b/i],
  ['compliance', /\b(Compliance|Legal|Counsel|Risk|Regulatory|GRC|Privacy|KYC|Fraud)\b/i],
  ['finance', /\b(CFO|Finance|Financial|Accountant|Payments|Treasury)\b/i],
  ['people', /\b(People|HR|Talent|Recruit)/i],
  ['procurement', /\b(Procurement|Sourcing|Vendor|Purchasing|Supply Chain & Procurement)\b/i],
  ['it', /\b(CIO|IT\b|Information Technology|Systems)/i],
  ['clinical', /\b(Medical|Nurs|Clinical|GP|Dr\.|Patient Coordinator)/i],
  ['quality', /\b(Quality|QA|Food Safety|EHS)\b/i],
  ['sales', /\b(Sales|SDR|AE\b|Account Executive|Business Development|Revenue|Key Account|Partnerships|Bid)\b/i],
  ['marketing', /\b(Marketing|Brand|Content|Community|Demand)\b/i],
  ['cs', /\b(Customer|Support|Member|Player|Receptionist|Patient Services|Front Desk)\b/i],
  ['eng', /\b(CTO|Engineer|Engineering|Product|Developer|Data Scientist|Machine Learning|ML\b|Chief Scientist|Architect|Solutions)/i],
  ['ops', /\b(COO|Operations|Plant|Production|Process|Maintenance|Supply|Shift|Site|Category|Planner|Logistics|Project|Practice Manager)/i],
  ['admin', /\b(Assistant|Coordinator|Office)\b/i],
];
export function functionOf(title) { const m = FN_RULES.find(([, re]) => re.test(title)); return m ? m[0] : 'delivery'; }
const FN_LABEL = { exec: 'leadership', security: 'security', compliance: 'risk and compliance', finance: 'finance', people: 'people and HR', procurement: 'procurement', it: 'IT', clinical: 'clinical care', quality: 'quality', sales: 'sales', marketing: 'marketing', cs: 'customer service', eng: 'engineering and product', ops: 'operations', admin: 'administration', delivery: 'client delivery' };

// Function-level pains and goals everyone in that job recognises.
const FN_NEEDS = {
  exec: [['Growth is slowing while costs keep rising', 'Too little visibility of what is really happening across the business', 'Getting the leadership team aligned on a few priorities'], ['Hit the growth plan without adding headcount at the same rate', 'Get one reliable view of performance across the business']],
  finance: [['Month-end close takes too long', 'Forecasts are built in spreadsheets and often wrong', 'Spend is hard to track across teams'], ['Close the books in five working days', 'Give the board a forecast it can trust', 'Cut costs without slowing growth']],
  sales: [['Pipeline is too thin for next quarter', 'Reps spend too much time on admin instead of selling', 'Deals stall at the final approval stage'], ['Hit this year\'s revenue target', 'Shorten the sales cycle', 'Grow average deal size']],
  marketing: [['Hard to prove which campaigns drive revenue', 'Not enough qualified leads for the sales team', 'Content takes too long to produce'], ['Double marketing-sourced pipeline', 'Prove marketing ROI to the leadership team']],
  cs: [['The same customer questions come in all day', 'Response times are slipping as volume grows', 'Customers leave without any warning signs'], ['Improve customer satisfaction scores', 'Cut response times in half', 'Reduce churn']],
  eng: [['Technical debt slows every release', 'Too much time maintaining old systems', 'Hard to hire experienced engineers'], ['Ship faster with fewer bugs', 'Modernise the core platform']],
  it: [['Too many systems that do not talk to each other', 'Security and compliance requests eat the team\'s time', 'Legacy systems are expensive to keep running'], ['Consolidate the tech stack', 'Move key systems to the cloud', 'Cut IT costs']],
  security: [['Too many alerts and not enough people to triage them', 'Limited visibility across cloud and on-premise systems', 'Audits take weeks of manual evidence gathering'], ['Reduce time to detect incidents', 'Pass the next audit first time', 'Consolidate security tools']],
  compliance: [['Regulatory change is hard to keep up with', 'Audit evidence is spread across too many systems', 'Manual checks slow the business down'], ['Zero findings at the next audit', 'Automate routine checks']],
  people: [['Time to hire is too long', 'Losing good people to competitors', 'Onboarding new starters takes too long'], ['Cut time to hire', 'Improve staff retention']],
  ops: [['Too much manual work and paperwork', 'No real-time view of what is happening on the ground', 'Processes break as volume grows'], ['Improve efficiency by 15% this year', 'Standardise processes across sites']],
  quality: [['Quality data is scattered and reported late', 'Audits mean weeks of preparation', 'Issues are found too late to fix cheaply'], ['Pass every audit first time', 'Catch issues earlier']],
  procurement: [['Supplier costs keep rising', 'No single view of spend across suppliers', 'Buying processes are slow and manual'], ['Cut supplier costs', 'Consolidate the supplier base']],
  clinical: [['Too much time on paperwork instead of patients', 'Staff shortages on every shift', 'Patients waiting too long to be seen'], ['Spend more time with patients', 'Cut waiting times']],
  admin: [['Calendars and requests are hard to keep on top of', 'Information is scattered across emails and spreadsheets', 'Fielding the same questions every day'], ['Keep things running smoothly for the team', 'Grow into a bigger role']],
  delivery: [['Too much time on admin and reporting', 'Juggling too many projects at once', 'Hard to find the right information quickly'], ['Do great work for customers', 'Progress to the next level']],
};

// Which functions feel a company-level pain, read from its wording.
const PAIN_FNS = [
  [/downtime|maintenance|reactive/, ['ops']], [/supply|lead time|forecast.*guess|demand/, ['ops', 'procurement']], [/quality/, ['quality', 'ops']],
  [/energy|carbon|sustainab/, ['ops', 'finance']], [/hire|hiring|staff|agency|losing good people|retain|skilled/, ['people', 'ops', 'clinical']],
  [/ticket|support|where's my money|customer success|onboarding takes|onboarding$/, ['cs']], [/phone|booking|appointment|waiting list/, ['cs', 'clinical']],
  [/pipeline|forecasts keep missing|sales cycle|ramp|referral|proposal|security questionnaire/, ['sales']], [/revenue retention|churn/, ['cs', 'sales']],
  [/regulat|compliance|audit|evidence|privacy|data protection|ai regulation/, ['compliance', 'security', 'it']], [/fraud|identity check|kyc/, ['compliance', 'cs']],
  [/reconcil|unbilled|billing|utilisation|budget|fees|margin|costs/, ['finance']], [/tools|integrat|systems|legacy core|compliance tools/, ['it', 'eng']],
  [/alert|scanner|incident|false positive|tool sprawl|overlapping/, ['security']], [/data quality|model evaluation|gpu|inference|ml engineers/, ['eng']],
  [/pilot|roi/, ['sales', 'cs']], [/waste|spoil/, ['ops', 'quality']], [/food safety|traceab/, ['quality']], [/distributor orders|typing/, ['ops', 'cs']],
  [/know-how|admin|paperwork|clinicians/, ['ops', 'clinical', 'delivery']], [/supermarket|retailers|new markets|competitors undercutting/, ['sales', 'exec']],
  [/ingredient|packaging/, ['procurement', 'finance']], [/partner bank/, ['eng', 'exec']],
];
function painFns(text) { const t = text.toLowerCase(); const m = PAIN_FNS.find(([re]) => re.test(t)); return m ? m[1] : []; }

// ---------- detail behind a pain (what the person knows about it) ----------
function painDetail(pain, company, r, fn) {
  const big = company.size === 'Enterprise', small = company.size === 'SMB';
  const hours = between(r, small ? 4 : 10, small ? 15 : 60);
  const money = small ? between(r, 2, 9) * 10 + 'k' : big ? between(r, 4, 30) * 100 + 'k' : between(r, 15, 90) * 10 + 'k';
  return {
    impact: pick(r, [`roughly ${hours} hours a week of the team's time`, `an estimated €${money} a year`, `missed targets two quarters running`, `complaints reaching the leadership team`, `${between(r, 2, 6)} people doing work that should be automated`]),
    cause: pick(r, ['processes designed when the company was half the size', 'tools that were never connected properly', 'growth that outpaced the systems', 'a key person leaving and the knowledge going with them', 'workarounds that became permanent']),
    tried: pick(r, ['more spreadsheets and a weekly meeting, which helped briefly', 'hiring an extra person, which only moved the problem', 'a tool trialled last year that the team never adopted', 'nothing formal yet: it keeps getting pushed down the list', 'an internal project that stalled when priorities changed']),
    today: pick(r, ['Excel and shared drives', 'an older system everyone complains about', 'email and a lot of manual follow-up', 'a mix of three tools that do not talk to each other', fn === 'sales' || fn === 'cs' ? 'the CRM, used inconsistently' : 'a homegrown setup built years ago']),
    success: pick(r, ['cut the time spent on it in half', 'a clear weekly number leadership trusts', 'customers stop complaining about it', 'the team spends its time on real work again', 'it stops being raised at every leadership meeting']),
    timeline: pick(r, ['wants progress this quarter', 'needs it fixed before year end', 'it is in next year\'s plan, budget not yet confirmed', 'leadership asked for a plan within 60 days', 'no fixed deadline, but the pressure is growing']),
  };
}

// ---------- the whole company at once (cached) ----------
const cache = new Map();

export function companyBrain(company, people = []) {
  const key = 'brain:' + company.id + ':' + people.length;
  if (cache.has(key)) return cache.get(key);
  const r = rng(key);
  const fnOf = new Map(people.map(p => [p.id, functionOf(p.title)]));
  const ceo = people.find(p => fnOf.get(p.id) === 'exec') || [...people].sort((a, b) => RANK[b.seniority] - RANK[a.seniority])[0];

  // Reporting lines: the most senior person above you in your own function,
  // otherwise the most senior person above you in a related function, else the CEO.
  const managerOf = new Map(), reportsOf = new Map(people.map(p => [p.id, []]));
  for (const p of people) {
    if (p === ceo) continue;
    const above = people.filter(q => q !== p && RANK[q.seniority] > RANK[p.seniority]);
    const nearest = list => list.sort((a, b) => RANK[a.seniority] - RANK[b.seniority])[0];
    const m = nearest(above.filter(q => fnOf.get(q.id) === fnOf.get(p.id))) || (p.seniority === 'c-suite' ? ceo : nearest(above.filter(q => q.seniority === 'c-suite' || q.seniority === 'vp'))) || ceo;
    if (m && m !== p) { managerOf.set(p.id, m.id); reportsOf.get(m.id).push(p.id); }
  }

  // Each company pain gets an owner: matching function first, then level.
  const pains = company.pains || [];
  const owners = new Map(), ownedCount = new Map();
  for (const pn of pains) {
    const fns = pn.owner === 'exec' && !painFns(pn.pain).length ? ['exec'] : painFns(pn.pain);
    const want = { exec: ['c-suite', 'vp'], manager: ['director', 'manager', 'vp'], ic: ['mid', 'junior', 'manager'] }[pn.owner] || ['manager'];
    const fit = q => { const i = want.indexOf(q.seniority); return i < 0 ? 9 : i; };
    const order = (a, b) => (ownedCount.get(a.id) || 0) - (ownedCount.get(b.id) || 0) || fit(a) - fit(b) || RANK[b.seniority] - RANK[a.seniority];
    const best = people.filter(q => fns.includes(fnOf.get(q.id)) && fit(q) < 9).sort(order)[0]
      || people.filter(q => fns.includes(fnOf.get(q.id))).sort(order)[0]
      || people.filter(q => fit(q) < 9).sort(order)[0] || ceo;
    owners.set(pn.pain, best ? best.id : null);
    if (best) ownedCount.set(best.id, (ownedCount.get(best.id) || 0) + 1);
  }

  // Everyone's own pains and goals.
  const needs = new Map();
  for (const p of people) {
    const pr = rng('needs:' + p.id), fn = fnOf.get(p.id), lvl = LEVEL[p.seniority];
    const own = pains.filter(pn => owners.get(pn.pain) === p.id);
    const shared = pains.filter(pn => !own.includes(pn) && (painFns(pn.pain).includes(fn) || (fn === 'exec' && pn.owner === 'exec')) && (lvl !== 'ic' || pn.owner !== 'exec'));
    const fnPains = (FN_NEEDS[fn] || FN_NEEDS.delivery)[0];
    const list = [...own.map(x => ({ text: x.pain, company: true, owned: true })), ...shared.slice(0, 1).map(x => ({ text: x.pain, company: true, owned: false }))];
    for (const t of [...fnPains].sort(() => pr() - 0.5)) { if (list.length >= 3) break; list.push({ text: t, company: false, owned: false }); }
    list.forEach(x => { x.detail = painDetail(x.text, company, pr, fn); });
    const goals = [];
    if (lvl === 'exec' && company.goals) goals.push(...company.goals.slice(0, fn === 'exec' ? 3 : 1));
    if (own[0]) goals.push(pick(pr, ['Get on top of', 'Fix', 'Solve']) + ' ' + lc(own[0].pain).replace(/\.$/, '') + ' this year');
    for (const g of (FN_NEEDS[fn] || FN_NEEDS.delivery)[1]) { if (goals.length >= 3) break; if (!goals.includes(g)) goals.push(g); }
    needs.set(p.id, { fn, fnLabel: FN_LABEL[fn], pains: list, goals, top: list[0] });
  }

  // Who signs off on a purchase, by company size.
  const byFn = f => people.filter(p => fnOf.get(p.id) === f).sort((a, b) => RANK[b.seniority] - RANK[a.seniority])[0];
  const name = p => p ? `${p.first} ${p.last} (${p.title})` : null;
  const cfo = people.find(p => /\bCFO\b|Finance Director|VP Finance/.test(p.title));
  const decisions = company.size === 'SMB'
    ? [`${name(ceo)} signs off anything over a few thousand euro, usually after a short chat with whoever will use it.`, 'There is no procurement team; a decision can happen within a couple of weeks if the case is obvious.']
    : company.size === 'Mid-Market'
      ? [`The head of the team that owns the problem builds the case and owns the budget for mid-sized spend.`, `${name(cfo) || 'Finance'} has to approve anything over about €25k${cfo ? '' : ''}, and ${name(ceo)} gets involved for large or multi-year deals.`, 'Expect a 1 to 3 month process, a trial or reference call, and IT checking security.']
      : [`The function VP who owns the problem sponsors it and owns the budget.`, `${name(cfo) || 'The CFO'} approves anything over about €100k; ${name(byFn('procurement')) || 'procurement'} runs vendor selection, usually with 3 competing suppliers.`, `${name(byFn('compliance')) || 'Legal'} reviews the contract and ${name(byFn('it')) || name(byFn('security')) || 'IT security'} runs a security review.`, 'Expect 4 to 9 months from first meeting to signature.'];

  const brain = { fnOf, managerOf, reportsOf, owners, needs, decisions, ceo };
  cache.set(key, brain);
  return brain;
}

export function personNeeds(emp, company, people) {
  if (!company) return { fn: 'delivery', fnLabel: 'their work', pains: [], goals: [], top: null };
  const b = companyBrain(company, people && people.length ? people : [emp]);
  return b.needs.get(emp.id) || { fn: functionOf(emp.title), fnLabel: FN_LABEL[functionOf(emp.title)], pains: [], goals: [], top: null };
}

// ---------- personality ----------
const TEMPER = ['calm and measured', 'warm and chatty', 'direct to the point of blunt', 'thoughtful and slow to commit', 'energetic and impatient', 'dry and sceptical', 'friendly but guarded', 'analytical and precise'];
const STYLE = ['talks in numbers and wants yours', 'tells stories and likes a bit of rapport first', 'answers questions with questions', 'speaks in short sentences and hates waffle', 'thinks out loud', 'asks for things in writing'];
const SALES_ATTITUDE = ['has been burned by a vendor before and is wary', 'respects reps who have clearly done their homework', 'gets a dozen cold calls a week and is tired of them', 'is genuinely open to new ideas if they are relevant', 'will only engage if a colleague has recommended you', 'likes to be challenged and will push back to test you'];
const INTERESTS = ['running and the occasional half marathon', 'GAA and coaching an under-12s team', 'cooking for friends', 'hill walking', 'cycling to work whatever the weather', 'reading history', 'five-a-side football', 'their two young kids', 'live music', 'sea swimming', 'renovating an old house', 'golf, badly'];
const PEEVES = ['reps who pitch before asking anything', 'being called by their wrong name or title', 'long emails', 'fake urgency', 'jargon and buzzwords', 'meetings without an agenda', 'people who have not read their website'];
const WINS = ['a specific insight about their business', 'a short, honest answer to a hard question', 'a relevant example from a similar company', 'respect for their time', 'showing you understand their role', 'a clear next step with no pressure'];

export function personality(emp) {
  const r = rng('personality:' + emp.id);
  const p = { temperament: pick(r, TEMPER), style: pick(r, STYLE), salesAttitude: pick(r, SALES_ATTITUDE), interest: pick(r, INTERESTS), peeve: pick(r, PEEVES), wonOverBy: pick(r, WINS) };
  p.summary = `${cap(p.temperament)}; ${p.style}. ${cap(p.salesAttitude)}. Won over by ${p.wonOverBy}; put off by ${p.peeve}.`;
  return p;
}
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

// ---------- briefing for the AI persona ----------
// Everything this person knows about themselves, their job and their company,
// written as an instruction block for the persona prompt.
export function personaBriefing(emp, company, people = [], site = null) {
  if (!company) return '';
  const b = companyBrain(company, people.length ? people : [emp]);
  const n = b.needs.get(emp.id); if (!n) return '';
  const pers = personality(emp);
  const byId = new Map(people.map(p => [p.id, p]));
  const nm = id => { const p = byId.get(id); return p ? `${p.first} ${p.last} (${p.title})` : null; };
  const boss = nm(b.managerOf.get(emp.id));
  const reports = (b.reportsOf.get(emp.id) || []).map(nm).filter(Boolean);
  const peers = people.filter(p => p.id !== emp.id && b.managerOf.get(p.id) === b.managerOf.get(emp.id) && b.managerOf.get(emp.id)).map(p => nm(p.id)).slice(0, 6);
  const lines = ['\n\n--- WHO YOU ARE ---'];
  lines.push(`Personality: ${pers.summary} Outside work: ${pers.interest}. Stay in character: let this shape how you speak, what you ask, and how hard you are to win over.`);
  lines.push(`Your function: ${n.fnLabel}.` + (boss ? ` You report to ${boss}.` : ' You run the company.') + (reports.length ? ` Your direct reports: ${reports.slice(0, 8).join('; ')}.` : '') + (peers.length ? ` You work closely with ${peers.join('; ')}.` : ''));
  lines.push('Your challenges right now, in order of how much they matter to you:');
  n.pains.forEach((p, i) => lines.push(`${i + 1}. ${p.text}. Impact: ${p.detail.impact}. Root cause: ${p.detail.cause}. Already tried: ${p.detail.tried}. Today you use ${p.detail.today}. Success would look like: ${p.detail.success}. Timing: ${p.detail.timeline}.${p.owned ? ' You personally own fixing this at the company.' : ''}`));
  lines.push(`Your goals this year: ${n.goals.join('; ')}.`);
  lines.push('You only reveal these details gradually, to a caller who asks good, specific questions and has earned some trust. You never list them unprompted.');
  if (site) {
    lines.push(`Company history: founded in ${site.founded}. ` + site.news.slice().reverse().map(x => `${x.date}: ${x.title}`).join('. ') + '.');
    if (site.careers.length) lines.push(`Roles the company is hiring for: ${site.careers.map(j => j.title).join(', ')}.`);
  }
  lines.push('How buying decisions are made here: ' + b.decisions.join(' ') + (RANK[emp.seniority] <= 2 ? ' You know this roughly, not in detail.' : ''));
  const ownerLines = [...b.owners.entries()].filter(([, id]) => id && id !== emp.id).map(([pain, id]) => `${nm(id)} owns "${pain}"`);
  if (ownerLines.length && RANK[emp.seniority] >= 2) lines.push('Who owns which problems: ' + ownerLines.join('; ') + '. Point a caller to the right person if they ask about something that is not yours.');
  return lines.join('\n');
}
