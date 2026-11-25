// Generates src/world/generated.js: 60 new accounts (so every industry has 10:
// 4 SMB, 4 Mid-Market, 2 Enterprise), their people, and company-specific pains,
// goals and buying-signal posts for all 80 accounts.
//
// Deterministic: the same seed always produces the same world, so employee ids
// and saved progress stay stable. Run: node scripts/generate-world.mjs
import { writeFileSync } from 'node:fs';

let seed = 20261125;
const rnd = () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const pick = a => a[Math.floor(rnd() * a.length)];
const between = (lo, hi) => lo + Math.floor(rnd() * (hi - lo + 1));
const shuffle = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

// owner: who feels the pain most. exec = c-suite/vp, manager = director/manager, ic = mid/junior
const INDUSTRIES = {
  'SaaS': {
    titles: { founder: 'CEO & Co-Founder', c: ['CEO', 'CFO', 'CTO'], vp: ['VP Sales', 'VP Engineering'], director: ['Head of Customer Success', 'Director of Product'], manager: ['RevOps Manager', 'Support Manager'], mid: ['Account Executive', 'Customer Success Manager'], junior: ['SDR'] },
    pains: [
      ['exec', 'Net revenue retention slipping below 100%', 'NRR dipped under 100% last quarter for the first time. Expansion is stalling and churn is creeping up. Back to basics on customer value.'],
      ['exec', 'Sales cycles getting longer as buyers add approval steps', 'Average sales cycle went from 45 to 80 days this year. Every deal now has a CFO in it. Anyone else seeing this?'],
      ['exec', 'AI-native competitors undercutting on price', "Three new AI-native competitors in our space this year, all cheaper. Our answer can't just be 'we're more mature'."],
      ['manager', 'Customer onboarding takes weeks before they see value', 'Our time-to-value is 6 weeks. Customers want it in 6 days. Rebuilding onboarding from scratch this quarter.'],
      ['manager', 'Forecasts keep missing because pipeline data is unreliable', 'Missed forecast by 18% again. The CRM says one thing, reps say another. Fixing this is my project for the quarter.'],
      ['manager', 'New sales reps take 6+ months to ramp', "New AEs take 6 months to ramp. That's half a year of salary before a single deal. Has to come down."],
      ['ic', 'Support tickets pile up after every release', 'Every release means 300 new tickets. Love our customers, but my queue is a monster this week.'],
      ['ic', "Too many tools that don't integrate", "Counted today: I log into 11 different tools to do my job. None of them talk to each other."],
    ],
    goals: ['Get net revenue retention back above 110%', 'Move upmarket into larger customers', 'Cut customer onboarding time in half', 'Reach profitability without slowing growth'],
  },
  'Cyber Security': {
    titles: { founder: 'Founder & CEO', c: ['CEO', 'CFO', 'CISO'], vp: ['VP Security Operations', 'VP Sales'], director: ['Director of Threat Intelligence', 'Head of Compliance'], manager: ['SOC Manager', 'GRC Manager'], mid: ['Security Engineer', 'Security Analyst'], junior: ['Junior SOC Analyst'] },
    pains: [
      ['exec', 'Board wants cyber risk explained in business terms', "Board asked me this week: 'how much risk are we carrying, in euros?' Still don't have a great answer."],
      ['exec', 'Too many overlapping security tools and licences', "We pay for 31 security tools. I'd bet a third overlap. Consolidation is top of my list for next year."],
      ['exec', 'Long security questionnaires slowing every deal', 'Enterprise prospects now send 300-question security questionnaires before a first meeting. It slows every deal down.'],
      ['manager', 'Alert fatigue in the security operations team', 'Our analysts closed 9,000 alerts last month. Maybe 40 mattered. Something has to give.'],
      ['manager', "Can't hire or keep experienced security analysts", 'Lost two senior analysts to bigger firms this quarter. Hiring in security right now is brutal.'],
      ['manager', 'Incident response plans are out of date', 'Ran a tabletop exercise. Half our runbooks referenced systems we retired last year. Humbling.'],
      ['ic', 'Compliance evidence gathering eats weeks every audit', 'SOC 2 audit prep season. Three weeks of screenshots and spreadsheets. There must be a better way.'],
      ['ic', 'Scanners flag huge numbers of false positives', "Scanner flagged 1,200 'critical' issues. 1,100 were false positives. My weekend is gone."],
    ],
    goals: ['Consolidate the security tool stack', 'Pass ISO 27001 certification this year', 'Cut time to detect and respond to incidents', 'Expand into larger regulated customers'],
  },
  'AI': {
    titles: { founder: 'Co-Founder & CEO', c: ['CEO', 'CFO', 'Chief Scientist'], vp: ['VP Engineering', 'VP Customer Success'], director: ['Head of Machine Learning', 'Director of Partnerships'], manager: ['ML Platform Manager', 'Solutions Engineering Manager'], mid: ['Machine Learning Engineer', 'Solutions Engineer'], junior: ['Junior Data Scientist'] },
    pains: [
      ['exec', 'GPU and inference costs eating into gross margin', 'Our inference bill grew faster than revenue last quarter. Gross margin is the conversation at every board meeting now.'],
      ['exec', 'Enterprise customers stuck in pilots that never go live', 'Six enterprise pilots, zero production rollouts. Everyone loves the demo. Nobody signs.'],
      ['exec', 'Customers worried about AI regulation and compliance', 'Every enterprise deal now includes AI Act questions. Legal reviews are adding 6 weeks to our sales cycle.'],
      ['manager', "Can't prove hard ROI to customers", 'Customers keep asking for hard ROI numbers. We have great anecdotes and not enough data. Fixing that this quarter.'],
      ['manager', 'Hiring ML engineers is slow and expensive', 'Four months to fill one ML engineer role. Big tech pays double. Startups need a different pitch.'],
      ['manager', 'Customer success overwhelmed by onboarding', "New customers need a lot of hand-holding to get value from AI. Our CS team can't keep up."],
      ['ic', 'Poor customer data quality breaks models', 'Spent the whole sprint cleaning customer data instead of improving the model. 80% of AI work is plumbing.'],
      ['ic', 'Model evaluation is manual and inconsistent', 'We still evaluate model releases with a spreadsheet and gut feel. Not scalable.'],
    ],
    goals: ['Turn pilots into paid production contracts', 'Improve gross margin by cutting inference costs', 'Land three enterprise logos this year', 'Get ahead of AI regulation as a selling point'],
  },
  'Manufacturing': {
    titles: { founder: 'Managing Director', c: ['CEO', 'CFO', 'COO'], vp: ['VP Operations', 'VP Supply Chain'], director: ['Plant Director', 'Head of Quality'], manager: ['Maintenance Manager', 'Production Manager'], mid: ['Quality Engineer', 'Production Planner'], junior: ['Process Technician'] },
    pains: [
      ['exec', 'Supply chain volatility wrecking forecasts', 'Lead times on key components went from 6 weeks to 20. Planning feels like guesswork.'],
      ['exec', 'Energy costs squeezing margins', 'Energy is now our second-biggest cost after people. Every efficiency project is back on the table.'],
      ['exec', 'Customers demanding carbon and sustainability data', "Two of our biggest customers now require carbon data per part. We're not set up for that."],
      ['manager', 'Unplanned downtime on production lines', "Line 3 went down for 14 hours on Tuesday. That's a week of margin gone because of one bearing."],
      ['manager', "Can't hire skilled operators and technicians", 'Three technician roles open since spring. The skills gap on the factory floor is real.'],
      ['manager', 'Maintenance is reactive instead of planned', 'We fix machines when they break. I want to fix them before they break. Building the business case now.'],
      ['ic', 'Quality data stuck in spreadsheets', 'Our quality report is 12 spreadsheets stitched together every Friday. Half my day, every week.'],
      ['ic', 'Paper-based processes on the shop floor', 'Still printing job sheets for every order. Lost one last week and remade a whole batch. Ouch.'],
    ],
    goals: ['Cut unplanned downtime by 30%', 'Hit customer carbon-reporting requirements', 'Automate quality reporting', 'Win a major new OEM contract'],
  },
  'Food & Beverage': {
    titles: { founder: 'Founder & Managing Director', c: ['CEO', 'CFO', 'COO'], vp: ['VP Sales & Retail', 'VP Operations'], director: ['Head of Food Safety', 'Supply Chain Director'], manager: ['Production Manager', 'Category Manager'], mid: ['QA Technician', 'Key Account Executive'], junior: ['Customer Service Coordinator'] },
    pains: [
      ['exec', 'Supermarkets squeezing supplier margins', "Supermarket wants another 4% off for next year's listing. Margins in food are razor thin already."],
      ['exec', 'Ingredient and packaging costs rising', 'Cocoa up again. Packaging up again. Pricing conversations with buyers are getting harder every month.'],
      ['exec', 'Expanding into new markets and channels', 'Launching in a new market next spring. New distributors, new labelling rules, new everything.'],
      ['manager', 'Food safety audits and traceability still half on paper', 'BRC audit in three weeks. Traceability is still half paper. Long nights ahead for the QA team.'],
      ['manager', 'Waste and spoilage eating profit', "We threw away 6% of production last month. That's money, and it's food. Has to change."],
      ['manager', 'Hiring seasonal staff for peak periods', "Christmas peak means 60 temporary staff to hire and train in 4 weeks. Every year it's a scramble."],
      ['ic', 'Typing distributor orders in by hand', 'Typed in 140 distributor orders from email today. One typo and a pallet goes to the wrong place.'],
      ['ic', 'Demand forecasting is guesswork', 'Sold out of the new flavour in a week, sat on 3 months of the old one. Forecasting is hard.'],
    ],
    goals: ['Win a national supermarket listing', 'Cut waste by a third', 'Launch in a new export market', 'Pass every food safety audit first time'],
  },
  'Professional Services': {
    titles: { founder: 'Managing Partner', c: ['Managing Partner', 'CFO', 'COO'], vp: ['Partner', 'Head of Practice'], director: ['Director of Operations', 'Head of Business Development'], manager: ['Practice Manager', 'Finance Manager'], mid: ['Senior Consultant', 'Associate'], junior: ['Analyst'] },
    pains: [
      ['exec', 'Billable utilisation dropping', 'Utilisation slipped to 68% this year. Every point is real money for a firm our size.'],
      ['exec', 'Clients pushing back on fees', 'Clients want fixed fees and more for less. The billable hour model is under real pressure.'],
      ['exec', 'Growth relies almost entirely on referrals', '90% of our new work comes from referrals. Great for quality, terrible for planning growth.'],
      ['manager', 'Unbilled time leaking out of the business', "Found €40k of unbilled time in one quarter. People forget to log hours. Billing leakage is real."],
      ['manager', 'Losing good people to competitors', 'Lost three senior people to a competitor this year. Retention is our biggest strategic risk.'],
      ['manager', "Know-how stuck in people's heads", 'When a partner leaves, half our know-how leaves with them. We need a proper knowledge base.'],
      ['ic', 'Too much admin, not enough client work', "Spent 11 hours this week on admin and reporting. That's 11 hours not helping clients."],
      ['ic', 'Proposals take days to write', 'Every proposal starts from a blank page. Three days per pitch. There has to be a better way.'],
    ],
    goals: ['Push utilisation back above 75%', 'Build a pipeline beyond referrals', 'Move more clients to fixed-fee work', 'Cut staff turnover'],
  },
  'FinTech': {
    titles: { founder: 'Co-Founder & CEO', c: ['CEO', 'CFO', 'Chief Risk Officer'], vp: ['VP Product', 'VP Compliance'], director: ['Head of Fraud', 'Director of Payments Operations'], manager: ['Compliance Manager', 'Customer Operations Manager'], mid: ['Payments Analyst', 'KYC Analyst'], junior: ['Customer Support Associate'] },
    pains: [
      ['exec', 'Regulatory reporting burden keeps growing', 'Another new reporting requirement from the regulator. Our compliance team grew 40% this year just to keep up.'],
      ['exec', 'Legacy core systems slow down new products', 'Our core system is older than some of our engineers. Every new product takes twice as long as it should.'],
      ['exec', 'Partner bank integrations take too long', "Took 9 months to go live with our last banking partner. Partnerships shouldn't take that long."],
      ['manager', 'Fraud losses rising', 'Fraud attempts up 3x since we launched instant payments. The fraudsters are fast learners.'],
      ['manager', 'Customers dropping out during identity checks', "38% of applicants abandon during ID checks. That's growth we paid for and lost at the last step."],
      ['manager', "Support flooded with 'where's my money?' questions", "Most of our support tickets are 'where's my money?'. Better self-serve would change everything."],
      ['ic', 'Reconciliation still done by hand', 'Reconciled 4,000 transactions by hand this month-end. Please tell me others still do this too.'],
      ['ic', "Compliance tools that don't share data", 'Five compliance tools, none of them share data. I copy and paste between them all day.'],
    ],
    goals: ['Launch two new products this year', 'Cut onboarding drop-off in half', 'Get a new banking licence or partner live', 'Reduce fraud losses without blocking good customers'],
  },
  'Healthcare': {
    titles: { founder: 'Founder & Clinical Director', c: ['CEO', 'CFO', 'Chief Medical Officer'], vp: ['VP Clinical Operations', 'Director of Nursing'], director: ['Head of Patient Services', 'Director of IT'], manager: ['Practice Manager', 'Operations Manager'], mid: ['Senior Nurse', 'Patient Coordinator'], junior: ['Receptionist'] },
    pains: [
      ['exec', 'Waiting lists at record highs', "Our waiting list is at a record high. Every week someone waits is a week they're in pain."],
      ['exec', 'Data privacy reviews slow every new tool', 'Every new tool means a 6-month data protection review. Necessary, but it slows everything down.'],
      ['exec', 'Flat budgets against rising demand', 'Budgets are flat and demand is up 15%. Every purchase needs a business case now.'],
      ['manager', 'Clinicians buried in admin', "Our clinicians spend 2 hours a day on paperwork. That's 2 hours not with patients."],
      ['manager', 'Staff shortages and rising agency costs', "Agency staff costs are up 30% this year. We can't hire nurses fast enough."],
      ['manager', 'Missed appointments', '12% of appointments missed last month. Each one is a slot another patient needed.'],
      ['ic', "Patient systems that don't talk to each other", 'I enter the same patient details into four different systems. Every single day.'],
      ['ic', 'Phone lines jammed with booking calls', 'Our phones open at 8am and the lines are full by 8:01. Patients deserve better.'],
    ],
    goals: ['Cut waiting times by a quarter', 'Reduce reliance on agency staff', 'Move more bookings online', 'Open new locations this year'],
  },
};

// [name, industry, size, domain, description, location, headcount]
const NEW_COMPANIES = [
  ['Tallybook', 'SaaS', 'SMB', 'tallybook.io', 'Invoicing and expense software for tradespeople', 'Galway', 18],
  ['Rotawise', 'SaaS', 'SMB', 'rotawise.com', 'Staff scheduling app for restaurants and cafés', 'Belfast', 24],
  ['Quillon', 'SaaS', 'SMB', 'quillon.app', 'Contract templates and e-signature for agencies', 'Bristol', 15],
  ['Bastionly', 'Cyber Security', 'Mid-Market', 'bastionly.com', 'Managed detection and response for mid-size firms', 'Manchester', 310],
  ['Keyward', 'Cyber Security', 'Mid-Market', 'keyward.io', 'Identity and access management for hybrid workforces', 'Dublin', 240],
  ['Sentrova', 'Cyber Security', 'Mid-Market', 'sentrova.com', 'Cloud security posture management', 'Edinburgh', 190],
  ['Lockpoint', 'Cyber Security', 'SMB', 'lockpoint.ie', 'Phishing simulation and security awareness training', 'Cork', 22],
  ['Patchwise', 'Cyber Security', 'SMB', 'patchwise.io', 'Automated patching for small IT teams', 'Leeds', 17],
  ['VaultHaven', 'Cyber Security', 'SMB', 'vaulthaven.ie', 'Backup and ransomware recovery for small businesses', 'Limerick', 29],
  ['Atlas Precision Group', 'Manufacturing', 'Enterprise', 'atlasprecision.com', 'Aerospace and medical device components across 6 plants', 'Belfast', 3800],
  ['Corrib Packaging', 'Manufacturing', 'Mid-Market', 'corribpackaging.ie', 'Corrugated and recyclable packaging for food brands', 'Galway', 420],
  ['Hartwell Plastics', 'Manufacturing', 'Mid-Market', 'hartwellplastics.co.uk', 'Injection-moulded parts for automotive suppliers', 'Leeds', 560],
  ['Brennan Steelworks', 'Manufacturing', 'SMB', 'brennansteel.ie', 'Structural steel fabrication for local builders', 'Limerick', 38],
  ['Kiln & Co', 'Manufacturing', 'SMB', 'kilnandco.co.uk', 'Handmade ceramic tiles for interior designers', 'Bristol', 21],
  ['Ferro Tools', 'Manufacturing', 'SMB', 'ferrotools.ie', 'Precision tooling and repairs for local factories', 'Cork', 27],
  ['Clearledger', 'FinTech', 'Mid-Market', 'clearledger.io', 'Automated accounts payable for mid-size companies', 'London', 280],
  ['Northbank Digital', 'FinTech', 'Mid-Market', 'northbank.digital', 'Digital-only business bank for small companies', 'Manchester', 450],
  ['Tessera Pay', 'FinTech', 'Mid-Market', 'tesserapay.com', 'Cross-border payroll and contractor payments', 'Dublin', 220],
  ['Fundbridge', 'FinTech', 'SMB', 'fundbridge.io', 'Invoice financing for small businesses', 'Belfast', 26],
  ['Coinpurse', 'FinTech', 'SMB', 'coinpurse.app', 'Company spend cards for small teams', 'Edinburgh', 19],
  ['Kinlo', 'FinTech', 'SMB', 'kinlo.ie', 'Savings and budgeting app for students', 'Cork', 14],
  ['Meridian Hospital Group', 'Healthcare', 'Enterprise', 'meridianhealth.ie', 'Private hospital network with 7 hospitals', 'Dublin', 6500],
  ['Albion Care Homes', 'Healthcare', 'Enterprise', 'albioncare.co.uk', 'Residential and nursing care across 64 homes', 'Manchester', 5200],
  ['Brightwell Dental Group', 'Healthcare', 'Mid-Market', 'brightwelldental.co.uk', 'Family dental clinics across 42 practices', 'Bristol', 780],
  ['Physiolink', 'Healthcare', 'Mid-Market', 'physiolink.ie', 'Physiotherapy and sports injury clinics in 28 locations', 'Dublin', 340],
  ['ClearSight Opticians', 'Healthcare', 'Mid-Market', 'clearsightopticians.co.uk', 'Optician chain with 35 stores', 'Leeds', 520],
  ['Carewell Home Health', 'Healthcare', 'Mid-Market', 'carewell.ie', 'Home care for older people', 'Cork', 690],
  ['Oak Lane Medical', 'Healthcare', 'SMB', 'oaklanemedical.ie', "Family doctors' practice with 9 GPs", 'Galway', 34],
  ['Lumen Skin Clinic', 'Healthcare', 'SMB', 'lumenskin.co.uk', 'Dermatology and skin clinic', 'Edinburgh', 16],
  ['MindRoom Therapy', 'Healthcare', 'SMB', 'mindroom.ie', 'Online and in-person counselling practice', 'Belfast', 23],
  ['Synthara AI', 'AI', 'Enterprise', 'synthara.ai', 'Enterprise AI assistants for banks and insurers', 'London', 2100],
  ['Cortexa', 'AI', 'Enterprise', 'cortexa.ai', 'Computer vision for retail and logistics', 'Dublin', 1800],
  ['Parsewell', 'AI', 'Mid-Market', 'parsewell.ai', 'AI document processing for insurers', 'Edinburgh', 260],
  ['Voxly', 'AI', 'Mid-Market', 'voxly.ai', 'AI voice agents for contact centres', 'Manchester', 330],
  ['Predictly', 'AI', 'Mid-Market', 'predictly.ai', 'Demand forecasting AI for retailers', 'Dublin', 210],
  ['Lexigraph', 'AI', 'Mid-Market', 'lexigraph.ai', 'AI legal research and contract review', 'London', 180],
  ['Labelbase', 'AI', 'SMB', 'labelbase.ai', 'Data labelling for computer vision teams', 'Cork', 31],
  ['Promptwise', 'AI', 'SMB', 'promptwise.ai', 'AI writing assistant for marketing teams', 'Galway', 19],
  ['Tutorlyn', 'AI', 'SMB', 'tutorlyn.ai', 'AI tutoring for secondary schools', 'Belfast', 24],
  ['Recruitly AI', 'AI', 'SMB', 'recruitly.ai', 'AI candidate screening for recruitment agencies', 'Leeds', 17],
  ['Kerrigan Foods', 'Food & Beverage', 'Enterprise', 'kerriganfoods.ie', 'Dairy and chilled foods supplier to supermarkets', 'Cork', 4200],
  ['Northgate Brewing Co', 'Food & Beverage', 'Enterprise', 'northgatebrewing.co.uk', 'Brewer and drinks distributor with 9 breweries', 'Manchester', 2600],
  ['Harvest Lane Bakery', 'Food & Beverage', 'Mid-Market', 'harvestlane.ie', 'Industrial bakery supplying supermarkets', 'Dublin', 480],
  ['Wildcoast Seafood', 'Food & Beverage', 'Mid-Market', 'wildcoastseafood.ie', 'Seafood processing and export', 'Galway', 260],
  ['Bramble & Oak Drinks', 'Food & Beverage', 'Mid-Market', 'brambleandoak.co.uk', 'Craft soft drinks and mixers', 'Bristol', 190],
  ['Greenfork Meal Co', 'Food & Beverage', 'Mid-Market', 'greenfork.co.uk', 'Ready meals for retail and food service', 'Leeds', 610],
  ['Copper Kettle Roasters', 'Food & Beverage', 'SMB', 'copperkettle.coffee', 'Specialty coffee roaster supplying cafés', 'Belfast', 22],
  ['Saltmarsh Distillery', 'Food & Beverage', 'SMB', 'saltmarshdistillery.com', 'Small-batch gin and whiskey distillery', 'Edinburgh', 18],
  ['Little Acre Dairy', 'Food & Beverage', 'SMB', 'littleacre.ie', 'Organic farmhouse yoghurt', 'Limerick', 26],
  ['Spice Route Kitchen', 'Food & Beverage', 'SMB', 'spiceroute.kitchen', 'Sauces and spice blends for grocers', 'London', 15],
  ['Hollis Grant LLP', 'Professional Services', 'Enterprise', 'hollisgrant.com', 'Corporate law firm with 9 offices', 'London', 2400],
  ['Calder Advisory', 'Professional Services', 'Enterprise', 'calderadvisory.ie', 'Accounting, audit and tax advisory', 'Dublin', 3100],
  ['Whitlock Engineering', 'Professional Services', 'Mid-Market', 'whitlockeng.co.uk', 'Civil and structural engineering consultancy', 'Manchester', 380],
  ['Bridgeview Recruitment', 'Professional Services', 'Mid-Market', 'bridgeviewrecruitment.ie', 'Specialist tech and finance recruitment', 'Dublin', 160],
  ['Fernhill Architects', 'Professional Services', 'Mid-Market', 'fernhillarchitects.co.uk', 'Architecture practice for public projects', 'Edinburgh', 170],
  ['Marlow & Reid', 'Professional Services', 'Mid-Market', 'marlowreid.co.uk', 'Accountants for owner-managed businesses', 'Leeds', 230],
  ['Quayside Legal', 'Professional Services', 'SMB', 'quaysidelegal.ie', 'Property and family law solicitors', 'Cork', 19],
  ['Northstar HR', 'Professional Services', 'SMB', 'northstarhr.co.uk', 'Outsourced HR for small businesses', 'Belfast', 14],
  ['Kite Marketing Studio', 'Professional Services', 'SMB', 'kitestudio.ie', 'B2B marketing agency', 'Galway', 21],
  ['Pennant IT Services', 'Professional Services', 'SMB', 'pennantit.co.uk', 'Managed IT support for small offices', 'Bristol', 28],
];

// The original 20 accounts: new industry where it changed, a realistic headcount
// (the AI personas say "roughly N people"), and company-specific pains/goals.
const LEGACY = {
  1: ['SaaS', 2400], 2: ['SaaS', 340], 3: ['SaaS'], 4: ['SaaS', 420], 5: ['Cyber Security', 1900], 6: ['Cyber Security', 280], 7: ['Cyber Security'], 8: ['Cyber Security', 3200],
  9: ['Manufacturing', 5400], 10: ['Manufacturing', 520], 11: ['Manufacturing'], 12: ['Manufacturing', 610], 13: ['FinTech', 2100], 14: ['FinTech', 260], 15: ['FinTech'], 16: ['FinTech', 2800],
  17: ['SaaS', 310], 18: ['Healthcare'], 19: ['SaaS', 1600], 20: ['SaaS', 380],
};

const FIRST = ['Aisling', 'Ben', 'Ciara', 'Declan', 'Eimear', 'Fionn', 'Grainne', 'Harry', 'Imogen', 'Jack', 'Keira', 'Luke', 'Maeve', 'Niall', 'Orla', 'Patrick', 'Ruth', 'Shane', 'Tara', 'Owen', 'Amira', 'Ravi', 'Chloe', 'Daniel', 'Freya', 'Gareth', 'Hannah', 'Isaac', 'Jade', 'Kwame', 'Leah', 'Marcus', 'Nadia', 'Oliver', 'Priya', 'Quinn', 'Rebecca', 'Samuel', 'Tomasz', 'Uma', 'Victor', 'Wendy', 'Yusuf', 'Zara', 'Adaeze', 'Bilal', 'Catriona', 'Diego', 'Elena', 'Femi', 'Gemma', 'Hugo', 'Ines', 'Joel', 'Katie', 'Lorcan', 'Mei', 'Nathan', 'Olivia', 'Piotr', 'Rosa', 'Sinead', 'Tom', 'Vanessa', 'Will', 'Aoife', 'Callum', 'Deirdre', 'Ewan', 'Fatima'];
const LAST = ['Byrne', 'Callaghan', 'Dempsey', 'Egan', 'Fitzgerald', 'Gallagher', 'Hughes', 'Kavanagh', 'Lynch', 'Maguire', 'Nolan', 'Quinn', 'Regan', 'Sweeney', 'Tierney', 'Walsh', 'Ahmed', 'Bennett', 'Chen', 'Davies', 'Evans', 'Foster', 'Grant', 'Hall', 'Iqbal', 'Jones', 'Khan', 'Lewis', 'Mitchell', 'Novak', 'Okafor', 'Patel', 'Reid', 'Shaw', 'Turner', 'Usman', 'Vaughan', 'Wright', 'Young', 'Kowalski', 'Moreno', 'Silva', 'Adeyemi', 'Brennan', 'Carroll', 'Doherty', 'Flanagan', 'Healy', 'Keane', 'McCarthy', "O'Neill", 'Power', 'Ryan', 'Stewart', 'Thompson', 'Ward'];

const PERSONALITY = {
  'c-suite': ['Dismissive of generic pitches. Only engages when you clearly understand their business', 'Time-poor and blunt. Gives you 30 seconds to be relevant', 'Thoughtful but sceptical. Wants evidence and peer references'],
  'vp': ['Seen every sales tactic. Needs 3-4 touches before engaging', 'Numbers-driven. Responds to clear ROI tied to their targets', "Open to new ideas if they solve this quarter's problem"],
  'director': ['Pragmatic. Will engage if you speak to their specific challenge', 'Protective of team time. Prefers email to calls', 'Curious and analytical. Asks a lot of questions'],
  'manager': ['Keen to fix team problems quickly. Usually picks up after 1-2 calls', 'Practical and busy. Responds to concrete examples', "Influential with their boss. Will champion something that makes the team's life easier"],
  'mid': ['Not a decision maker but helpful. Will point you to the right person if your pitch is relevant', 'Friendly and candid about day-to-day problems', 'Busy but approachable'],
  'junior': ['Eager and responsive. Will pass you up the chain', 'Friendly but has no buying power', 'Happy to chat and knows who does what'],
};
const SEGMENT_NOTE = { SMB: ' Small team, so they wear many hats and decide fast, but every euro counts.', 'Mid-Market': ' Budget exists but is fought over every quarter.', Enterprise: ' Big company: any purchase involves several people and a formal process.' };

// Org chart shape by segment: [seniority, title key, index]
const LADDER = {
  SMB: [['c-suite', 'founder'], ['c-suite', 'c', 2], ['director', 'director', 0], ['manager', 'manager', 0], ['mid', 'mid', 0], ['junior', 'junior', 0]],
  'Mid-Market': [['c-suite', 'c', 0], ['c-suite', 'c', 1], ['vp', 'vp', 0], ['director', 'director', 0], ['director', 'director', 1], ['manager', 'manager', 0], ['mid', 'mid', 0], ['junior', 'junior', 0]],
  Enterprise: [['c-suite', 'c', 0], ['c-suite', 'c', 1], ['c-suite', 'c', 2], ['vp', 'vp', 0], ['vp', 'vp', 1], ['director', 'director', 0], ['director', 'director', 1], ['manager', 'manager', 0], ['manager', 'manager', 1], ['mid', 'mid', 0], ['mid', 'mid', 1], ['junior', 'junior', 0]],
};
const LEVEL = { 'c-suite': 'exec', vp: 'exec', director: 'manager', manager: 'manager', mid: 'ic', junior: 'ic' };
const GENERIC_POSTS = {
  exec: ['Hiring across the team this year. If you know great people, send them my way.', 'Spent the week with customers. Best use of a leader\'s time, every time.'],
  manager: ['Proud of the team this month. Hard quarter, great attitude.', 'Looking for recommendations: how do you run a good weekly team meeting?'],
  ic: ['One year at {co} today. Learned more than I expected.', 'Great team day out on Friday. Back to it now.'],
};
const DEAL = { SMB: [12, 28], 'Mid-Market': [30, 65], Enterprise: [80, 160] };

function companyPains(ind) {
  const pool = INDUSTRIES[ind].pains;
  return ['exec', 'manager', 'ic'].map(lvl => { const [owner, pain, post] = pick(pool.filter(p => p[0] === lvl)); return { owner, pain, post }; });
}
function companyGoals(ind) { return shuffle(INDUSTRIES[ind].goals).slice(0, 2); }

const overrides = {};
for (const [id, [industry, employees]] of Object.entries(LEGACY)) {
  overrides[id] = { industry, ...(employees ? { employees } : {}), pains: companyPains(industry), goals: companyGoals(industry) };
}

const companies = [], employees = {};
NEW_COMPANIES.forEach(([name, industry, size, domain, description, location, headcount], i) => {
  const id = 21 + i, ind = INDUSTRIES[industry];
  const pains = companyPains(industry), goals = companyGoals(industry);
  const [lo, hi] = DEAL[size];
  companies.push({ id, name, industry, size, employees: headcount, domain, description, location, dealValue: between(lo, hi) * 1000, pains, goals });
  const used = new Set(), postedLvl = new Set();
  employees[id] = LADDER[size].map(([seniority, key, idx], n) => {
    let first, last;
    do { first = pick(FIRST); last = pick(LAST); } while (used.has(first) || used.has(last));
    used.add(first); used.add(last);
    const title = key === 'founder' ? ind.titles.founder : ind.titles[key][idx];
    const lvl = LEVEL[seniority];
    const mine = pains.find(p => p.owner === lvl);
    const posts = [];
    if (mine && !postedLvl.has(lvl)) { posts.push(mine.post); postedLvl.add(lvl); }
    if (rnd() < 0.5) posts.push(pick(GENERIC_POSTS[lvl]).replace('{co}', name));
    const years = between(3, 22);
    const bio = seniority === 'c-suite' || seniority === 'vp'
      ? `${title} at ${name}. ${years} years in ${industry === 'AI' ? 'AI and software' : industry.toLowerCase()}.`
      : `${title} at ${name}. ${pick(['Joined', 'Been here'])} ${between(1, 8)} years.`;
    const personality = pick(PERSONALITY[seniority]) + '.' + (['c-suite', 'vp', 'director'].includes(seniority) ? SEGMENT_NOTE[size] : '');
    return { id: id * 100 + n + 1, first, last, title, seniority, bio, personality, posts, ...(mine ? { pains: [mine.pain] } : {}) };
  });
});

const out = `// GENERATED by scripts/generate-world.mjs. Do not edit by hand: change the
// generator and re-run it (node scripts/generate-world.mjs).

export const LEGACY_OVERRIDES = ${JSON.stringify(overrides, null, 1)};

export const GENERATED_COMPANIES = ${JSON.stringify(companies, null, 1)};

export const GENERATED_EMPLOYEES = ${JSON.stringify(employees, null, 1)};
`;
writeFileSync(new URL('../src/world/generated.js', import.meta.url), out);
const people = Object.values(employees).reduce((n, e) => n + e.length, 0);
console.log(`Wrote ${companies.length} new companies, ${people} new people, overrides for ${Object.keys(overrides).length} legacy companies.`);
