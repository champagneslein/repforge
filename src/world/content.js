// Research content for the sales world: a website for every company and a
// LinkedIn-style profile and post history for every person. Generated at
// runtime from the company/person data, deterministically (same input, same
// output), so it costs nothing in bundle size and never drifts.
//
// Everything is cross-linked on purpose: a company's pains show up as job ads,
// blog posts, news and its people's posts, so a trainee who researches well
// can piece together what the account cares about.

// ---------- deterministic randomness ----------
function hash(s) { let h = 2166136261; for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function rng(seed) {
  let a = hash(seed);
  return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const pick = (r, a) => a[Math.floor(r() * a.length)];
const between = (r, lo, hi) => lo + Math.floor(r() * (hi - lo + 1));
const sample = (r, a, n) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b.slice(0, n); };
import { companyBrain, personNeeds } from './persona';

const lc = s => s.charAt(0).toLowerCase() + s.slice(1);
const an = s => (/^[AEIOU]|^(ML|SOC|HR|IT|SDR)\b/.test(s) ? 'an ' : 'a ') + s;

// ---------- dates ----------
const DAY = 86400000;
export function daysAgoDate(days) { return new Date(Date.now() - days * DAY); }
export function formatDate(d) { return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); }
export function timeAgo(days) {
  if (days < 1) return 'Today';
  if (days < 7) return days + 'd';
  if (days < 30) return Math.floor(days / 7) + 'w';
  if (days < 365) return Math.floor(days / 30) + 'mo';
  return Math.floor(days / 365) + 'y';
}

// ---------- shared fictional pools ----------
const CUSTOMERS = ['Brightline Retail', 'Orchard Logistics', 'Bluefin Insurance', 'Summit Energy', 'Halcyon Hotels', 'Westbridge Council', 'Corvus Telecom', 'Pinehurst Group', 'Lakeside University', 'Atlas Freight', 'Morrow Pharma', 'Elmstead Housing', 'Tidewater Ports', 'Granite Building Society', 'Juniper Travel', 'Oakfield Schools Trust', 'Redcliffe Media', 'Seabrook Utilities'];
const INVESTORS = ['Northlight Ventures', 'Harbour Capital', 'Granite Peak Partners', 'Beacon Seed Fund', 'Fjord Growth Equity', 'Kinsale Ventures', 'Ardent Capital', 'Redwood Lane Partners', 'Silverstrand Investments', 'Copperline Growth'];
const PRIOR_EMPLOYERS = ['a Big Four consultancy', 'a FTSE 250 company', 'a fast-growing startup', 'a global bank', 'a US tech company', 'a family-owned business', 'a public sector body', 'a private equity-backed group'];
const UNIS = ['Trinity College Dublin', 'University College Dublin', 'University of Manchester', 'University of Edinburgh', "Queen's University Belfast", 'University College Cork', 'University of Leeds', 'University of Bristol', 'University of Galway', 'King\'s College London'];
const TECH = ['SaaS', 'AI', 'Cyber Security', 'FinTech'];

const IND = {
  'SaaS': {
    offerings: ['Platform', 'Analytics', 'Automation Studio', 'Integrations Hub', 'Mobile App', 'Admin Console'],
    customersLabel: 'Trusted by teams at', event: 'CloudScale Summit', tags: ['#SaaS', '#B2B', '#CustomerSuccess', '#ProductLed'],
    skills: ['SaaS', 'Go-to-market', 'Customer Success', 'Product Management', 'Salesforce', 'Revenue Operations'],
    blogTopics: ['What we learned shipping {n} releases this year', 'How our customers measure ROI in the first 90 days', 'Why we rebuilt our onboarding from scratch', 'The integrations our customers ask for most'],
  },
  'AI': {
    offerings: ['Model API', 'Studio', 'Evaluation Suite', 'Enterprise Assistant', 'Data Connectors', 'On-prem Edition'],
    customersLabel: 'Deployed at', event: 'AI Builders Forum', tags: ['#AI', '#MachineLearning', '#GenAI', '#ResponsibleAI'],
    skills: ['Machine Learning', 'Python', 'LLMs', 'MLOps', 'Data Engineering', 'AI Governance'],
    blogTopics: ['From pilot to production: what actually blocks enterprise AI', 'How we evaluate model quality before every release', 'What the AI Act means for our customers', 'Cutting inference costs without cutting quality'],
  },
  'Cyber Security': {
    offerings: ['Managed Detection & Response', 'Threat Intelligence', 'Identity Protection', 'Cloud Posture', 'Compliance Automation', 'Incident Response Retainer'],
    customersLabel: 'Protecting', event: 'CyberDefence Europe', tags: ['#CyberSecurity', '#InfoSec', '#ZeroTrust', '#SOC'],
    skills: ['Threat Detection', 'SIEM', 'Incident Response', 'ISO 27001', 'Cloud Security', 'Risk Management'],
    blogTopics: ['The real cost of alert fatigue', 'Explaining cyber risk to your board in plain English', 'What we saw in incident response this quarter', 'Five things auditors ask for (and how to have them ready)'],
  },
  'FinTech': {
    offerings: ['Payments API', 'Business Accounts', 'Fraud Shield', 'Onboarding & KYC', 'Treasury Dashboard', 'Card Issuing'],
    customersLabel: 'Powering', event: 'FinFuture Conference', tags: ['#FinTech', '#Payments', '#OpenBanking', '#RegTech'],
    skills: ['Payments', 'Regulatory Compliance', 'KYC/AML', 'Risk', 'Open Banking', 'Financial Modelling'],
    blogTopics: ['How we cut onboarding drop-off', 'What new payments regulation means for you', 'Inside our fraud team: patterns from the last quarter', 'Why reconciliation is still so hard'],
  },
  'Manufacturing': {
    offerings: ['Precision Components', 'Custom Assemblies', 'Rapid Prototyping', 'Aftermarket Parts', 'Engineering Services', 'Contract Manufacturing'],
    customersLabel: 'Supplying', event: 'Smart Factory Expo', tags: ['#Manufacturing', '#Industry40', '#LeanManufacturing', '#SupplyChain'],
    skills: ['Lean Manufacturing', 'Six Sigma', 'Supply Chain', 'Quality Management', 'ERP', 'Health & Safety'],
    blogTopics: ['Inside our plant: how we run a production day', 'What customers now ask for on sustainability', 'Building a maintenance team for the next decade', 'Why we invested in new equipment this year'],
  },
  'Food & Beverage': {
    offerings: ['Retail Range', 'Food Service', 'Private Label', 'Seasonal Range', 'Export', 'New Product Development'],
    customersLabel: 'Stocked by', event: 'FoodTech Forum', tags: ['#FoodAndDrink', '#FMCG', '#FoodSafety', '#Sustainability'],
    skills: ['FMCG', 'Food Safety', 'Category Management', 'Supply Chain', 'BRC', 'New Product Development'],
    blogTopics: ['From farm to shelf: how our products are made', 'Cutting food waste: our progress so far', 'Behind the scenes of our busiest season', 'What it takes to land a supermarket listing'],
  },
  'Professional Services': {
    offerings: ['Advisory', 'Audit & Assurance', 'Tax', 'Transformation', 'Managed Services', 'Training'],
    customersLabel: 'Advising', event: 'Professional Services Leaders Summit', tags: ['#ProfessionalServices', '#Leadership', '#Consulting', '#Talent'],
    skills: ['Client Management', 'Business Development', 'Project Management', 'Stakeholder Management', 'Advisory', 'People Leadership'],
    blogTopics: ['What clients are asking us about this year', 'How we are changing the way we price our work', 'Growing our people: our approach to careers', 'Lessons from our largest engagement this year'],
  },
  'Healthcare': {
    offerings: ['Clinical Services', 'Diagnostics', 'Outpatient Care', 'Community Care', 'Online Booking', 'Corporate Health'],
    customersLabel: 'In partnership with', event: 'HealthTech Week', tags: ['#Healthcare', '#PatientCare', '#NHS', '#DigitalHealth'],
    skills: ['Patient Care', 'Clinical Governance', 'Healthcare Operations', 'GDPR', 'Workforce Planning', 'Service Improvement'],
    blogTopics: ['How we are working to cut waiting times', 'A day in the life of our clinical team', 'Making it easier to book with us', 'Investing in our people'],
  },
};
const ind = c => IND[c.industry] || IND.SaaS;

// ---------- company website ----------
const cache = new Map();

export function companySite(company, people = []) {
  const key = 'site:' + company.id;
  if (cache.has(key)) return cache.get(key);
  const r = rng(key), I = ind(company), size = company.size, tech = TECH.includes(company.industry);
  const pains = company.pains || [], goals = company.goals || [];
  const brain = companyBrain(company, people.length ? people : []);
  const byId = new Map(people.map(p => [p.id, p]));
  const ownerOf = pn => byId.get(brain.owners.get(pn.pain));
  const byLevel = s => people.filter(p => p.seniority === s);
  const ceo = people.find(p => /CEO|Managing Partner|Managing Director|Founder/.test(p.title)) || people[0];
  const founded = 2026 - (size === 'SMB' ? between(r, 2, 8) : size === 'Mid-Market' ? between(r, 7, 20) : between(r, 18, 60));

  const offerings = sample(r, I.offerings, 3).map(o => ({
    name: (size === 'SMB' && !tech ? '' : company.name.split(' ')[0] + ' ') + o,
    text: `${o} built for ${pick(r, ['growing teams', 'complex organisations', 'regulated businesses', 'businesses across the UK and Ireland'])}. ${pick(r, ['Fast to set up and easy to scale.', 'Backed by a dedicated team.', 'Designed with our customers, for our customers.', 'Proven at scale.'])}`,
  }));

  const stats = size === 'SMB'
    ? [[between(r, 40, 400) + '+', 'customers'], [company.employees, 'people'], [founded, 'founded']]
    : [[(size === 'Enterprise' ? between(r, 2, 40) * 100 : between(r, 3, 30) * 10) + '+', 'customers'], [company.employees.toLocaleString(), 'people'], [size === 'Enterprise' ? between(r, 4, 20) + ' countries' : between(r, 2, 6) + ' offices', 'and growing']];

  const leadership = [...byLevel('c-suite'), ...byLevel('vp')].slice(0, size === 'Enterprise' ? 8 : 4).map(p => ({ id: p.id, name: p.first + ' ' + p.last, title: p.title }));

  // Careers: open roles. Some are written around the company's real pains.
  const n = size === 'SMB' ? between(r, 2, 3) : size === 'Mid-Market' ? between(r, 4, 6) : between(r, 7, 10);
  // Backfill roles come from the company's own non-leadership titles, no repeats.
  const titlePool = sample(r, [...new Set(people.filter(p => ['manager', 'mid', 'junior'].includes(p.seniority)).map(p => p.title))], 20);
  const usedTitles = new Set();
  const careers = Array.from({ length: n }, (_, i) => {
    const painJobs = Math.min(pains.length, size === 'SMB' ? 1 : size === 'Mid-Market' ? 2 : 4);
    const pain = i < painJobs ? pains[i] : null;
    let title = pain ? hireFor(pain, company, r) : (titlePool.find(x => !usedTitles.has(x)) || 'Operations Associate');
    if (usedTitles.has(title)) title = 'Senior ' + title;
    usedTitles.add(title);
    const days = between(r, 2, 45);
    // Pain roles report to whoever owns the pain; backfills to the boss of the
    // person in that job today.
    const incumbent = people.find(q => q.title === title.replace(/^Senior /, ''));
    const hm = pain ? ownerOf(pain) : incumbent ? byId.get(brain.managerOf.get(incumbent.id)) : null;
    return {
      hiringManager: hm ? { id: hm.id, name: hm.first + ' ' + hm.last, title: hm.title } : null,
      id: company.id + '-job-' + i, title, location: pick(r, [company.location, company.location + ' (hybrid)', 'Remote (UK & Ireland)']),
      type: pick(r, ['Full-time', 'Full-time', 'Full-time', 'Contract']), postedDays: days, posted: timeAgo(days),
      summary: `We're looking for ${an(title)} to join ${company.name} as we ${goals[i % Math.max(goals.length, 1)] ? lc(goals[i % goals.length]) : 'grow'}.`,
      bullets: [
        pain ? `Own our work on a real challenge: ${lc(pain.pain)}` : `Work across teams to improve how we operate`,
        pick(r, ['Report to our leadership team and help shape the roadmap', 'Build processes that scale as we grow', 'Partner closely with customers and colleagues']),
        pick(r, ['Use data to make better decisions', 'Bring fresh ideas and challenge how things are done', 'Help us replace manual work with better tools']),
      ],
    };
  }).sort((a, b) => a.postedDays - b.postedDays);

  // News & press: funding or results, launches, partnerships, hires, expansion.
  const news = [];
  const add = (days, title, text, kind) => news.push({ days, date: formatDate(daysAgoDate(days)), title, text, kind });
  const inv = sample(r, INVESTORS, 2);
  if (tech || size === 'SMB') {
    const round = size === 'SMB' ? pick(r, ['Seed', 'Pre-Series A']) : size === 'Mid-Market' ? pick(r, ['Series A', 'Series B']) : pick(r, ['Series D', 'growth']);
    const amt = size === 'SMB' ? between(r, 1, 5) : size === 'Mid-Market' ? between(r, 8, 45) : between(r, 60, 180);
    add(between(r, 60, 300), `${company.name} raises €${amt}m ${round} round`, `${company.name} has raised €${amt}m led by ${inv[0]}, with participation from ${inv[1]}. ${ceo ? ceo.first + ' ' + ceo.last + ', ' + ceo.title + ', said the money will go towards ' : 'The money will go towards '}${goals[0] ? lc(goals[0]) : 'growth'} and hiring across the business.`, 'funding');
  } else {
    add(between(r, 60, 300), `${company.name} reports ${between(r, 6, 24)}% revenue growth`, `${company.name} grew revenue by double digits over the last financial year, driven by new customers and ${pick(r, ['investment in capacity', 'a strong order book', 'expansion into new markets'])}. The business expects to ${goals[0] ? lc(goals[0]) : 'keep growing'} over the coming year.`, 'results');
  }
  const po = pains[0] && ownerOf(pains[0]);
  if (pains[0]) add(between(r, 10, 90), `${company.name} ${pick(r, ['launches improvement programme', 'announces operational investment', 'sets out plan for the year ahead'])}`, `Leadership at ${company.name} says the focus is a challenge the business can no longer ignore: ${lc(pains[0].pain).replace(/\.$/, '')}.${po ? ' ' + po.first + ' ' + po.last + ', ' + po.title + ', is leading the work.' : ''} "${pick(r, ['It is the number one thing our customers and our people raise with us.', 'We know we need to do better here, and we are putting real resources behind it.', 'This is holding us back, and fixing it is a priority for the whole leadership team.'])}"`, 'priority');
  const hire = byLevel('vp')[0] || byLevel('director')[0];
  if (hire) add(between(r, 20, 160), `${company.name} appoints ${hire.first} ${hire.last} as ${hire.title}`, `${hire.first} joins from ${pick(r, PRIOR_EMPLOYERS)} and will lead the team as ${company.name} looks to ${goals[1] ? lc(goals[1]) : 'scale'}.`, 'hire');
  add(between(r, 5, 120), pick(r, [`${company.name} partners with ${pick(r, CUSTOMERS)}`, `${company.name} opens new office in ${pick(r, ['London', 'Manchester', 'Dublin', 'Amsterdam', 'Berlin', 'Boston'].filter(x => x !== company.location))}`, `${company.name} launches ${offerings[0].name}`]), `The move is part of ${company.name}'s plan to ${goals[0] ? lc(goals[0]) : 'grow'}.`, 'growth');
  if (size !== 'SMB') add(between(r, 100, 360), `${company.name} named in ${pick(r, ['Best Workplaces', 'Fast 50', 'Top 100 Companies to Watch'])} list`, `Recognition for the team's growth over the past year.`, 'award');
  news.sort((a, b) => a.days - b.days);

  // Blog: articles by the company's own people, several hinting at the pains.
  // General articles come from leadership, marketing or operations.
  const authors = people.filter(p => ['c-suite', 'vp', 'director'].includes(p.seniority) && ['exec', 'marketing', 'ops', 'eng', 'cs', 'clinical', 'delivery'].includes(brain.fnOf.get(p.id)));
  const topics = [
    ...pains.slice(0, size === 'SMB' ? 2 : 3).map(p => ({ title: p.pain.replace(/\.$/, '') + ': ' + pick(r, ["how we're tackling it", 'our honest take', "what we're doing about it"]), pain: p })),
    ...sample(r, I.blogTopics, size === 'SMB' ? 2 : 3).map(t => ({ title: t.replace('{n}', between(r, 12, 60)) })),
  ];
  const blog = topics.map((t, i) => {
    // Pain articles are written by whoever owns that pain; others by any leader.
    const a = (t.pain && ownerOf(t.pain)) || (authors.length ? authors[(i * 3 + between(r, 0, 5)) % authors.length] : null);
    const days = between(r, 7 + i * 20, 30 + i * 40);
    const body = t.pain ? [
      `Like a lot of ${company.industry === 'AI' ? 'AI' : company.industry.toLowerCase()} businesses, we have run into a problem we can no longer ignore: ${lc(t.pain.pain).replace(/\.$/, '')}.`,
      `${pick(r, ['Today, most of this is handled manually, with spreadsheets and a lot of goodwill.', 'The tools we have today were chosen when we were half the size.', 'We have tried a few quick fixes, and none of them have stuck.'])} ${pick(r, ['It costs us time, money and, sometimes, customers.', 'Our teams feel it every week.', 'It slows down everything else we want to do.'])}`,
      `Over the next ${pick(r, ['quarter', 'six months', 'year'])} we are ${pick(r, ['reviewing how we work end to end', 'looking at what other companies our size do', 'investing in better processes and tools'])}. ${goals[0] ? 'It is tied directly to our goal to ' + lc(goals[0]) + '.' : ''} We will share what we learn.`,
    ] : [
      `At ${company.name}, ${pick(r, ['we get asked about this a lot', 'this has been on our minds this year', 'we wanted to share how we think about this'])}.`,
      `${pick(r, ['The short version: focus on the customer and the rest follows.', 'We have made mistakes along the way, and learned from each one.', 'What works for us may not work for everyone, but here is our approach.'])} ${goals[1] ? 'This year our focus is to ' + lc(goals[1]) + '.' : ''}`,
      `If you have questions, our team is always happy to talk.`,
    ];
    return { id: company.id + '-post-' + i, title: t.title.charAt(0).toUpperCase() + t.title.slice(1), author: a ? { id: a.id, name: a.first + ' ' + a.last, title: a.title } : null, days, date: formatDate(daysAgoDate(days)), body, readMins: between(r, 3, 8) };
  }).sort((a, b) => a.days - b.days);

  const site = {
    domain: company.domain, founded, color: company.color || brandColor(company.id),
    tagline: pick(r, [`${company.description}.`, `The partner ${company.industry === 'Healthcare' ? 'patients' : 'customers'} rely on.`, `${company.description}, done properly.`]),
    about: `${company.name} was founded in ${founded} and is headquartered in ${company.location}. Today we are ${company.employees.toLocaleString()} people ${size === 'Enterprise' ? 'serving customers around the world' : 'serving customers across the UK and Ireland'}. ${company.description}.`,
    mission: pick(r, ['To make the complex simple for our customers.', 'To do the best work of our customers\' careers, with them.', 'To build something that lasts, the right way.', 'To raise the standard in our industry.']),
    values: sample(r, ['Customers first', 'Own the outcome', 'Be straightforward', 'Keep learning', 'Win as a team', 'Do the right thing', 'Move with pace'], 4),
    offerings, stats, customers: sample(r, CUSTOMERS, 6), customersLabel: I.customersLabel, leadership, careers, news, blog,
    priorities: goals,
  };
  cache.set(key, site);
  return site;
}

function hireFor(pain, company, r) {
  const p = pain.pain.toLowerCase();
  const m = [
    [/downtime|maintenance/, 'Reliability Engineer'], [/supply|forecast|lead time/, 'Demand Planner'], [/quality/, 'Quality Systems Lead'],
    [/energy|carbon|sustainab/, 'Sustainability Manager'], [/fraud/, 'Fraud Analyst'], [/kyc|identity|onboarding drop/, 'Onboarding Product Manager'],
    [/reconcil/, 'Finance Operations Analyst'], [/regulat|compliance|audit|evidence/, 'Compliance Analyst'], [/alert|soc|security analyst/, 'SOC Analyst'],
    [/support|ticket|where's my money/, 'Customer Support Lead'], [/onboarding/, 'Implementation Manager'], [/forecast|pipeline/, 'Revenue Operations Analyst'],
    [/ramp|new sales reps/, 'Sales Enablement Manager'], [/tools|integrat|systems/, 'Systems Integration Lead'], [/waiting list|phone|booking|appointments/, 'Patient Access Manager'],
    [/admin|paperwork/, 'Operations Coordinator'], [/staff|agency|hire|retain|losing good people/, 'Talent Acquisition Partner'], [/waste|spoil/, 'Continuous Improvement Manager'],
    [/food safety|traceab/, 'Food Safety Technologist'], [/order|distributor/, 'Order Management Coordinator'], [/utilisation|billable|unbilled/, 'Resource Manager'],
    [/proposal|referral/, 'Bid Manager'], [/know-how|knowledge/, 'Knowledge Manager'], [/gpu|inference|margin/, 'ML Infrastructure Engineer'],
    [/pilot/, 'Enterprise Solutions Architect'], [/roi/, 'Value Engineer'], [/data quality/, 'Data Engineer'], [/evaluation/, 'ML Evaluation Engineer'],
  ].find(([re]) => re.test(p));
  return m ? m[1] : pick(r, ['Operations Manager', 'Business Analyst', 'Project Manager']);
}

const BRAND = ['#1f6fb2', '#14a39a', '#6a4fd6', '#2f8a3e', '#d1495b', '#c7791c', '#0a7f6f', '#2b8fd1', '#b5485d', '#3d5a80', '#7b2cbf', '#e07a1f'];
export function brandColor(id) { return BRAND[hash('c' + id) % BRAND.length]; }

// ---------- people ----------
const LEVEL = { 'c-suite': 'exec', vp: 'exec', director: 'manager', manager: 'manager', mid: 'ic', junior: 'ic' };

export function personProfile(emp, company, colleagues = []) {
  const key = 'profile:' + emp.id;
  if (cache.has(key)) return cache.get(key);
  const r = rng(key), I = ind(company || {}), co = company ? company.name : 'their company';
  // Someone the website announced as a recent hire really is new.
  const isNewHire = company && colleagues.length > 0 && companySite(company, colleagues).news.some(n => n.kind === 'hire' && n.title.includes(emp.first + ' ' + emp.last));
  const years = emp.seniority === 'c-suite' ? between(r, 15, 28) : emp.seniority === 'vp' ? between(r, 12, 22) : emp.seniority === 'director' ? between(r, 9, 18) : emp.seniority === 'manager' ? between(r, 5, 12) : emp.seniority === 'mid' ? between(r, 2, 7) : between(r, 0, 2);
  const tenure = isNewHire ? 0 : Math.max(1, Math.min(years, between(r, 1, 7)));
  const needs = personNeeds(emp, company, colleagues);
  const pain = needs.top && needs.top.text;
  const goal = needs.goals[0];
  const headline = `${emp.title} at ${co}` + (pick(r, [true, false]) ? ' | ' + pick(r, I.skills) : '');
  const about = [
    `${emp.title} at ${co}, ${tenure === 0 ? 'joined recently' : tenure === 1 ? 'since last year' : 'for ' + tenure + ' years'}. ${years > 3 ? years + ' years in ' + (company ? company.industry === 'AI' ? 'AI and software' : company.industry.toLowerCase() : 'the industry') + '.' : 'Early in my career and learning fast.'}`,
    pain ? `${pick(r, ['The challenge on my desk right now', 'What I am working on this year', 'Current focus'])}: ${lc(pain).replace(/\.$/, '')}.${goal ? ' Goal for the year: ' + lc(goal) + '.' : ''}` : pick(r, ['I care about building great teams and doing good work.', 'Always happy to connect with people in the industry.', 'Interested in how other teams solve the same problems we do.']),
  ].join(' ');
  const experience = [{ title: emp.title, company: co, years: tenure, current: true }];
  if (years - tenure > 1 || isNewHire) { const prev = pick(r, PRIOR_EMPLOYERS); experience.push({ title: priorTitle(emp), company: prev.charAt(0).toUpperCase() + prev.slice(1), years: Math.max(1, years - tenure), current: false }); }
  const p = { headline, about, experience, skills: sample(r, I.skills, 4), education: pick(r, UNIS), connections: between(r, emp.seniority === 'junior' ? 80 : 300, emp.seniority === 'c-suite' ? 9000 : 3000) };
  cache.set(key, p);
  return p;
}
function priorTitle(emp) {
  return { 'c-suite': emp.title.replace(/^Chief /, 'VP ').replace(/^CEO.*$/, 'Managing Director').replace(/^CFO$/, 'Finance Director').replace(/^COO$/, 'VP Operations'), vp: emp.title.replace(/^VP /, 'Director of '), director: emp.title.replace(/^(Director of |Head of )/, 'Senior Manager, '), manager: 'Senior ' + emp.title.replace(/ Manager$/, ' Specialist'), mid: emp.title.replace(/^Senior /, ''), junior: 'Intern' }[emp.seniority] || emp.title;
}

// 3-6 dated posts per person: their own words about the company's pains, plus
// sharing company news, job ads and blog posts, events and milestones.
export function personPosts(emp, company, colleagues = []) {
  const key = 'posts:' + emp.id;
  if (cache.has(key)) return cache.get(key);
  const r = rng(key), I = ind(company || {});
  if (!company) return [];
  const site = companySite(company, colleagues);
  const lvl = LEVEL[emp.seniority];
  const out = [];
  const add = (days, text, type) => {
    const base = emp.seniority === 'c-suite' ? 260 : emp.seniority === 'vp' ? 130 : emp.seniority === 'director' ? 80 : emp.seniority === 'manager' ? 45 : 20;
    out.push({ days, timeAgo: timeAgo(days), date: formatDate(daysAgoDate(days)), text, type, likes: Math.floor(base * (0.5 + r())), comments: Math.floor(base / 12 * (0.4 + r())), tags: sample(r, I.tags, 2) });
  };
  // Hand-written posts (the original accounts) stay as they are.
  (emp.posts || []).forEach((t, i) => add(between(r, 2 + i * 10, 25 + i * 20), t, /\b(we need|looking|evaluat|has to|there has to be|there must be|has to change|fixing|plan)\b/i.test(t) ? 'signal' : 'insight'));
  // Their own challenges and goals, in their own words. Owners of a company
  // problem post about it; others post about the problem their job feels most.
  const needs = personNeeds(emp, company, colleagues);
  const brain = companyBrain(company, colleagues);
  const owned = (company.pains || []).find(pn => brain.owners.get(pn.pain) === emp.id);
  if (owned) add(between(r, 3, 40), owned.post, 'signal');
  else if (needs.top && r() < ({ exec: 0.7, manager: 0.8, ic: 0.55 })[lvl]) add(between(r, 5, 60), pick(r, [
    `Honest question for other ${emp.title.replace(/^(Senior|Junior) /, '')}s: how are you handling ${lc(needs.top.text).replace(/\.$/, '')}? Biggest thing on my plate at ${company.name} right now.`,
    `Another week fighting ${lc(needs.top.text).replace(/\.$/, '')}. ${needs.top.detail.impact.charAt(0).toUpperCase() + needs.top.detail.impact.slice(1)}. There has to be a better way.`,
    `We've tried ${needs.top.detail.tried.split(',')[0]}. Still dealing with ${lc(needs.top.text).replace(/\.$/, '')}. Would love to hear what's worked for others.`,
  ]), 'signal');
  if (needs.goals[0] && r() < (lvl === 'ic' ? 0.25 : 0.5)) add(between(r, 20, 110), `${pick(r, ['Focus for this year', 'Our big goal this year', 'What I am working towards'])}: ${lc(needs.goals[0])}. ${pick(r, ['Plenty to do.', 'Will share how it goes.', 'Ambitious, but doable.'])}`, 'insight');
  const news = site.news, jobs = site.careers, blog = site.blog;
  const funding = news.find(n => n.kind === 'funding' || n.kind === 'results');
  if (funding && (lvl === 'exec' || r() < 0.4)) add(funding.days + between(r, 0, 2), `${pick(r, ['Big news for', 'Proud moment for', 'Exciting day at'])} ${company.name}: ${lc(funding.title.replace(company.name + ' ', ''))}. ${pick(r, ['Huge thanks to the team.', 'This is just the start.', 'Now the real work begins.'])}${company.goals && company.goals[0] ? ' Next up: ' + lc(company.goals[0]) + '.' : ''}`, 'milestone');
  const myJob = jobs.find(j => j.title === emp.title) || (lvl !== 'ic' && jobs[between(r, 0, Math.max(0, jobs.length - 1))]);
  if (myJob && r() < (lvl === 'ic' ? 0.25 : 0.7)) add(myJob.postedDays, `We're hiring ${an(myJob.title)} at ${company.name} (${myJob.location}). ${myJob.bullets[0]}. DM me if you know someone great.`, myJob.title && /Own our work on a real challenge/.test(myJob.bullets[0]) ? 'signal' : 'hiring');
  const article = blog.find(b => b.author && b.author.id === emp.id) || (r() < 0.35 && blog[0]);
  if (article) add(article.days, article.author && article.author.id === emp.id ? `I wrote about something we've been wrestling with at ${company.name}: "${article.title}". Would love to hear how others handle it.` : `Worth a read from our team: "${article.title}".`, /tackling it|honest take|doing about it/i.test(article.title) ? 'signal' : 'insight');
  const hire = news.find(n => n.kind === 'hire');
  if (hire && hire.title.includes(emp.first + ' ' + emp.last)) add(hire.days, `Some personal news: I've joined ${company.name} as ${emp.title}. ${pick(r, ['First few weeks have been spent listening and learning.', 'Lots to do, starting with a review of how we work today.', 'Excited to get stuck in.'])}`, 'milestone');
  if (r() < 0.5) add(between(r, 15, 120), `Great few days at ${I.event}. ${pick(r, ['Every conversation came back to the same theme: doing more with less.', 'Lots of talk about AI, less about how to actually make it work.', 'Came away with a long list of ideas for the team.'])}`, 'insight');
  if (r() < 0.35) add(between(r, 20, 150), `${between(r, 1, 6)} year${'s'} at ${company.name} today. ${pick(r, ['Grateful for this team.', 'Time flies.', 'Still learning every week.'])}`.replace('1 years', '1 year'), 'milestone');
  const p = out.sort((a, b) => a.days - b.days).slice(0, 6);
  cache.set(key, p);
  return p;
}
