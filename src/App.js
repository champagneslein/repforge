import React, { useState, useRef } from "react";
import Vapi from '@vapi-ai/web';

// Supabase Configuration
const SUPABASE_URL = 'https://scvlwmwegdxcgwshlqub.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjdmx3bXdlZ2R4Y2d3c2hscXViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2NTM5MjcsImV4cCI6MjA5MzIyOTkyN30.KVT2qeLVQ4uMd78-7zxdy_vLE8xI8L8nltC_T7nGnRA';

// Helper function to fetch from Supabase REST API
async function fetchSupabase(endpoint, filter = '') {
  const url = `${SUPABASE_URL}/rest/v1/${endpoint}${filter}`;
    try {
        const response = await fetch(url, {
              headers: {
                      'apikey': SUPABASE_KEY,
                              'Authorization': `Bearer ${SUPABASE_KEY}`,
                                      'Content-Type': 'application/json',
                                            },
                                                });
                                                    if (!response.ok) {
                                                          console.warn(`Supabase fetch failed for ${endpoint}: ${response.status}`);
                                                                return null;
                                                                    }
                                                                        return await response.json();
                                                                          } catch (error) {
                                                                              console.warn(`Error fetching ${endpoint} from Supabase:`, error);
                                                                                  return null;
                                                                                    }
                                                                                    }

// ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ
// COMPANY + EMPLOYEE DATA
// ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ
const companies = [
  { id:1,  name:"Nexaflow",         industry:"SaaS",           size:"Enterprise", employees:42, domain:"nexaflow.io",         description:"Cloud workflow automation for enterprise ops teams",        location:"Dublin" },
  { id:2,  name:"CloudPulse",       industry:"SaaS",           size:"Mhid-Market", employees:25, domain:"cloudpulse.io",       description:"Real-time analytics and monitoring SaaS",                  location:"London" },
  { id:3,  name:"Stackly",          industry:"SaaS",           size:"SMB",        employees:14, domain:"stackly.dev",         description:"Developer productivity and code review tooling",           location:"Dublin" },
  { id:4,  name:"Velodata",         industry:"SaaS",           size:"Mid-Market", employees:28, domain:"velodata.com",        description:"Data pipeline and ETL automation platform",                location:"London" },
  { id:5,  name:"ShieldOps",        industry:"Cyber Security", size:"Enterprise", employees:45, domain:"shieldops.io",        description:"Enterprise endpoint security and threat detection",        location:"Dublin" },
  { id:6,  name:"CipherEdge",       industry:"Cyber Security", size:"Mid-Market", employees:22, domain:"cipheredge.io",       description:"Zero-trust network access and identity management",        location:"London" },
  { id:7,  name:"ThreatNest",       industry:"Cyber Security", size:"SMB",        employees:16, domain:"threatnest.com",      description:"SMB-focused threat intelligence and monitoring",           location:"Dublin" },
  { id:8,  name:"Fortivex",         industry:"Cyber Security", size:"Enterprise", employees:50, domain:"fortivex.com",        description:"Security operations centre automation",                   location:"London" },
  { id:9,  name:"IronCore Systems", industry:"Manufacturing",  size:"Enterprise", employees:48, domain:"ironcoresystems.com", description:"Industrial IoT and smart factory solutions",              location:"Dublin" },
  { id:10, name:"PrecisionWorks",   industry:"Manufacturing",  size:"Mid-Market", employees:30, domain:"precisionworks.ie",   description:"Precision component manufacturing and supply chain",       location:"Cork" },
  { id:11, name:"NovaMach",         industry:"Manufacturing",  size:"SMB",        employees:15, domain:"novamach.ie",         description:"Custom machinery and tooling manufacturer",               location:"Galway" },
  { id:12, name:"FluxTech",         industry:"Manufacturing",  size:"Mid-Market", employees:35, domain:"fluxtech-ind.com",    description:"Advanced materials and composite manufacturing",           location:"Dublin" },
  { id:13, name:"CapitalBridge",    industry:"Fintech",        size:"Enterprise", employees:44, domain:"capitalbridge.io",    description:"Institutional trading and capital markets platform",       location:"Dublin" },
  { id:14, name:"Moneta Labs",      industry:"Fintech",        size:"Mid-Market", employees:20, domain:"monetalabs.io",       description:"Embedded finance and banking-as-a-service",               location:"London" },
  { id:15, name:"PayStream",        industry:"Fintech",        size:"SMB",        employees:18, domain:"paystream.io",        description:"Payment reconciliation automation",                       location:"Dublin" },
  { id:16, name:"FinAxis Group",    industry:"Fintech",        size:"Enterprise", employees:50, domain:"finaxis-group.com",   description:"Risk management and regulatory compliance platform",       location:"London" },
  { id:17, name:"GreenLeaf Energy", industry:"Energy",         size:"Mid-Market", employees:24, domain:"greenleaf-energy.com",description:"Renewable energy project development",                    location:"Dublin" },
  { id:18, name:"MedPoint Health",  industry:"Healthcare",     size:"SMB",        employees:17, domain:"medpointhealth.ie",   description:"Digital health records and practice management SaaS",     location:"Dublin" },
  { id:19, name:"RetailEdge",       industry:"Retail Tech",    size:"Enterprise", employees:38, domain:"retailedge.com",      description:"Omnichannel retail operations and inventory platform",     location:"London" },
  { id:20, name:"BuildRight",       industry:"Construction",   size:"Mid-Market", employees:22, domain:"buildright.io",       description:"Construction project management and compliance SaaS",     location:"Dublin" },
];

const allEmployees = {
  1:[{id:101,first:"Conor",last:"Murphy",title:"CEO & Co-Founder",seniority:"c-suite",bio:"Serial entrepreneur. Previously exited two SaaS companies. Board member at three Dublin startups.",personality:"Dismissive of generic pitches. Responds only to sharp, outcome-focused messaging after multiple touches. Time is their scarcest resource",posts:["Proud to announce Nexaflow just crossed 500 enterprise customers ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ","Leadership lesson: hire people smarter than you, then get out of their way.","Great panel at SaaS Ireland yesterday on AI in operations. The future is closer than you think."]},
    {id:102,first:"Rachel",last:"O'Brien",title:"CTO",seniority:"c-suite",bio:"Engineering leader with 15 years in cloud infrastructure. Previously Staff Engineer at AWS.",personality:"Data-driven and technical. Wants proof, not promises. Will ask hard questions if you get through",posts:["We just migrated our entire infrastructure to Kubernetes. 6 months of work. Worth every minute.","Hot take: most SaaS companies over-engineer their MVP. Ship fast, iterate faster."]},
    {id:103,first:"David",last:"Flynn",title:"VP Sales",seniority:"vp",bio:"Sales leader. 10 years in enterprise SaaS. Love building teams from scratch and scaling revenue.",personality:"Seen every sales tactic. Responds to reps who understand pipeline pain. Needs 3-4 touches before engaging",posts:["Hiring 3 AEs in Dublin right now. DM me if you know anyone strong.","The best salespeople I've hired all had one thing in common: genuine curiosity about the customer's problem.","Q1 closed strong. Team absolutely smashed it ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂª"]},
    {id:104,first:"Siobhan",last:"Kelly",title:"VP Marketing",seniority:"vp",bio:"Brand and demand gen leader. Previously HubSpot EMEA. Passionate about category creation.",personality:"Brand-conscious, ROI-focused. Replies to well-crafted emails. Prefers async over calls",posts:["Content is still king. But distribution is the kingdom.","Just back from SaaStr. The AI narrative is everywhere ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ the companies winning are the ones with real ROI stories."]},
    {id:105,first:"Mark",last:"Doyle",title:"Head of Product",seniority:"director",bio:"Product leader focused on workflow automation. Ex-Intercom. Obsessed with reducing friction.",personality:"Pragmatic problem-solver. Will engage if you speak to their specific challenge. Needs 2-3 attempts",posts:["Shipped three new features this week. User feedback has been incredible.","Product managers: your job is to say no. Nicely, but firmly."]},
    {id:106,first:"Aoife",last:"Walsh",title:"Sales Manager",seniority:"manager",bio:"Building and coaching the Nexaflow sales team. 5 years in B2B SaaS sales.",personality:"Keen to solve team problems quickly. Responds well to empathy and concrete demos. Usually picks up after 1-2 calls",posts:["Ran a great cold call training session with the team today. Practice makes permanent.","New quarter, new goals. Let's go team! ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¯"]},
    {id:107,first:"Liam",last:"Burke",title:"Enterprise AE",seniority:"mid",bio:"Enterprise AE at Nexaflow. Helping large ops teams eliminate manual work.",personality:"Not a decision maker but a helpful gatekeeper. Will forward to manager if the pitch is relevant",posts:["Just closed my biggest deal to date. Onwards! ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ"]},
    {id:108,first:"Emma",last:"Byrne",title:"Customer Success Manager",seniority:"mid",bio:"Making sure Nexaflow customers get value from day one.",personality:"Focused on customer outcomes. Responds well to product improvements that drive retention",posts:["QBR season is here. Love seeing customers light up when we show them their ROI data."]},
    {id:109,first:"Sean",last:"Farrell",title:"SDR",seniority:"junior",bio:"SDR at Nexaflow. Learning the ropes and loving it.",personality:"Eager and responsive. Will pass you up immediately. Friendly and enthusiastic",posts:["Week 3 on the job. Already booked my first meeting. Buzzing! ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ¡"]},
    {id:110,first:"Niamh",last:"Clarke",title:"Marketing Coordinator",seniority:"junior",bio:"Marketing team at Nexaflow. Events, content, socials.",personality:"Enthusiastic team player. Not involved in purchases but engaged with content. Easy to reach",posts:["Our booth at TechConnect was a massive success! Thanks to everyone who stopped by ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ"]},
  ],
  2:[{id:201,first:"James",last:"Sheridan",title:"CEO & Founder",seniority:"c-suite",bio:"Founded CloudPulse after 8 years at Datadog. Building the next generation of ops analytics.",personality:"Founder energy. Approachable but laser-focused on traction. Responds to metrics and momentum",posts:["Thrilled to announce our Series A. Thank you to every customer who believed in us early.","Rule for founders: never be too busy to talk to a customer."]},
    {id:202,first:"Laura",last:"Nolan",title:"Head of Sales",seniority:"director",bio:"Sales leader at CloudPulse. Previously Salesforce and Zendesk.",personality:"Sales veteran. Respects solid methodology. Will take a call if you reference their industry",posts:["Hiring AEs in London. If you can tell me what a good discovery question looks like, you're halfway there.","The best cold email I got this week had three lines and one question. Hired that SDR."]},
    {id:203,first:"Ronan",last:"Higgins",title:"Head of Engineering",seniority:"director",bio:"Engineering at CloudPulse. Prev Google SRE. Obsessed with reliability.",personality:"Engineering-first. Cares about reliability, not hype. Engage with technical depth",posts:["99.99% uptime last quarter. The team deserves all the credit."]},
    {id:204,first:"Clare",last:"Brennan",title:"Sales Manager",seniority:"manager",bio:"Running CloudPulse's mid-market sales motion. Love a clean pipeline.",personality:"Pipeline obsessive. Direct, no-nonsense. Responds to reps who respect her time",posts:["Pipeline review day. Time to separate the real deals from the wishful thinking.","Favourite part of the job: coaching a rep through a tough objection live on a call."]},
    {id:205,first:"Patrick",last:"Duggan",title:"Account Executive",seniority:"mid",bio:"AE at CloudPulse. Helping ops teams see their data clearly.",personality:"Motivated closer. Responsive to managers and peer reps. Eager to help",posts:["Closed 2 deals this week. Good problems to have on a Friday! ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ"]},
    {id:206,first:"Aoibhe",last:"Ryan",title:"Marketing Manager",seniority:"manager",bio:"Demand gen and brand at CloudPulse.",personality:"Marketing practitioner. Responds to data-backed pitches. Prefers structured outreach",posts:["Webinar next Tuesday on real-time ops analytics. Register now!"]},
    {id:207,first:"Cian",last:"McCarthy",title:"SDR",seniority:"junior",bio:"SDR at CloudPulse. Dialing and smiling.",personality:"Hungry SDR. Responds to coaching and peer insight. Very receptive",posts:["100 calls this week. 4 meetings booked. Progress! ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ"]},
    {id:208,first:"Fiona",last:"O'Sullivan",title:"Operations Coordinator",seniority:"junior",bio:"Ops team at CloudPulse. Keeping things running smoothly.",personality:"Team-oriented. Helpful and responsive. Will pass along info to decision makers",posts:["Team offsite was a blast! Great people here ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ"]},
  ],
  3:[{id:301,first:"Tom",last:"Keane",title:"CEO & Co-Founder",seniority:"c-suite",bio:"Building Stackly to fix developer productivity. Ex-GitHub. YC W22.",personality:"YC founder mindset. Moves fast, makes decisions quick. Responds to novel approaches",posts:["Just hit 10k developers on the platform. Wild.","The best product feedback comes from watching someone use your product in silence."]},
    {id:302,first:"Sarah",last:"Power",title:"CTO & Co-Founder",seniority:"c-suite",bio:"CTO at Stackly. MIT grad. Code review obsessive.",personality:"Technical perfectionist. Skeptical of over-engineered solutions. Engage on architecture",posts:["Shipped our new AI-assisted review engine today. Weeks of work. Couldn't be prouder of the team."]},
    {id:303,first:"Jack",last:"Lennon",title:"Head of Growth",seniority:"director",bio:"Growth at Stackly. PLG motion, community, partnerships.",personality:"PLG expert. Understands viral loops. Responds to growth mechanics, not features",posts:["PLG tip: your best salespeople are your existing users. Enable them."]},
    {id:304,first:"Megan",last:"Lawlor",title:"Lead Developer",seniority:"mid",bio:"Fullstack developer at Stackly. TypeScript nerd.",personality:"Developer-focused. Values simplicity and good DX. Helpful peer voice",posts:["Finally fixed that bug that's been haunting me for 3 weeks. Sleep tonight ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ"]},
    {id:305,first:"Kevin",last:"Brady",title:"Sales Rep",seniority:"junior",bio:"First sales hire at Stackly. Learning fast.",personality:"First-time sales rep. Eager, learning fast. Very responsive and coachable",posts:["First week done. This team moves fast. Love it!"]},
  ],
  4:[{id:401,first:"Brian",last:"Cassidy",title:"CEO",seniority:"c-suite",bio:"CEO at Velodata. Data infrastructure background. Ex-Palantir.",personality:"Data infrastructure veteran. Wants integration depth. Responds to technical fit discussions",posts:["Data pipelines shouldn't be a competitive advantage. They should be table stakes. That's what we're building.","Grateful for the team we've assembled. Hire slow."]},
    {id:402,first:"Karen",last:"Moran",title:"VP Engineering",seniority:"vp",bio:"Engineering leader at Velodata. 12 years in data infrastructure.",personality:"Architecture-driven. Needs to understand your data model. Very technical gatekeeper",posts:["Modern data stack deep dive ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ happy to share our architecture if useful. Drop a comment."]},
    {id:403,first:"Declan",last:"Phelan",title:"Director of Sales",seniority:"director",bio:"Sales at Velodata. Former Snowflake. Love a complex technical sale.",personality:"Complex deal expert. Enjoys the long sales cycle. Responds to consultative approach",posts:["Technical sales tip: understand the data flow before you understand the budget.","Closed a 7-figure deal today. Long cycle, worth it. Team effort. ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ"]},
    {id:404,first:"Aisling",last:"Tobin",title:"Product Manager",seniority:"manager",bio:"PM at Velodata. Connector-obsessed.",personality:"Connector-obsessed. Practical PM. Responds to feature requests from customers",posts:["We just added Salesforce + dbt connectors. Customers have been asking for months."]},
    {id:405,first:"Fergal",last:"O'Dwyer",title:"Account Executive",seniority:"mid",bio:"AE at Velodata. Selling data pipelines to data teams.",personality:"Mid-level AE. Strong peer voice. Will engage easily",posts:["Nothing like a customer saying 'this just works' to make your week."]},
    {id:406,first:"Ruth",last:"Hennessy",title:"Data Analyst",seniority:"mid",bio:"Data analyst at Velodata. Numbers tell stories.",personality:"Numbers-focused analyst. Helpful for building cases. Can champion internally",posts:[]},
    {id:407,first:"Cathal",last:"Dunne",title:"SDR",seniority:"junior",bio:"SDR at Velodata. Learning technical sales.",personality:"Learning technical sales. Responds well to demos and 1:1 support",posts:["Booked my first enterprise meeting today! ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ"]},
  ],
  5:[{id:501,first:"Gerard",last:"Connolly",title:"CEO",seniority:"c-suite",bio:"CEO at ShieldOps. 20 years in cybersecurity. Former CISO turned founder.",personality:"Security veteran, founder energy. Visionary but practical. Responds to industry insight",posts:["The threat landscape has fundamentally changed. Endpoint protection alone is no longer enough.","Thrilled to welcome three new enterprise customers this quarter. The pipeline is strong."]},
    {id:502,first:"Denise",last:"Hanlon",title:"CISO",seniority:"c-suite",bio:"CISO at ShieldOps. Former Head of Security at AIB. Board advisor to two fintech firms.",personality:"CISO authority. Board-savvy. Responds to executive positioning and risk framing",posts:["Ransomware attacks up 40% YoY. If you don't have an incident response plan, you're already behind.","Speaking at CyberDublin next month on zero-trust implementation. Register if you're attending."]},
    {id:503,first:"Paul",last:"Costello",title:"VP Sales",seniority:"vp",bio:"VP Sales at ShieldOps. Selling enterprise security for 12 years.",personality:"Enterprise security seller. Tough, experienced. Needs consultative discovery",posts:["Security budgets are growing but CISOs are more selective. The ROI conversation has never mattered more."]},
    {id:504,first:"Triona",last:"Gallagher",title:"Director, Security Ops",seniority:"director",bio:"Security operations leader at ShieldOps.",personality:"Ops leader. Responds to efficiency gains and team capability. Practical mindset",posts:["Just completed our ISO 27001 renewal. Team worked incredibly hard."]},
    {id:505,first:"Niall",last:"Regan",title:"Security Architect",seniority:"manager",bio:"Security architecture and design at ShieldOps.",personality:"Security architect. Philosophy-driven. Engages deeply on approach, not product",posts:["Zero trust isn't a product. It's a philosophy. Fight me."]},
    {id:506,first:"Eimear",last:"Daly",title:"Threat Intelligence Lead",seniority:"manager",bio:"Threat intel and analysis at ShieldOps.",personality:"Threat intel specialist. Current events knowledge. Engages on risk narratives",posts:["New threat actor targeting Irish financial institutions. Briefing clients now."]},
    {id:507,first:"Shane",last:"Cunningham",title:"SOC Manager",seniority:"manager",bio:"Managing the ShieldOps SOC team.",personality:"SOC manager. Overworked, coffee-dependent. Responds to relief, not complexity",posts:["24/7 SOC life. Coffee is not optional."]},
    {id:508,first:"Ciara",last:"Fitzpatrick",title:"Compliance Manager",seniority:"manager",bio:"Compliance and regulatory at ShieldOps. GDPR, NIS2, DORA.",personality:"Compliance specialist. Regulatory lens. Engages on frameworks and standards",posts:["DORA deadline approaching. Financial firms ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ are you ready?"]},
    {id:509,first:"Alan",last:"Delaney",title:"Penetration Tester",seniority:"mid",bio:"Ethical hacker at ShieldOps. Breaking things so customers don't have to.",personality:"Ethical hacker mindset. Technical depth required. Responds to advanced concepts",posts:["Just completed a red team engagement. Can't share details obviously. But wow."]},
    {id:510,first:"Orla",last:"Quinn",title:"Security Analyst",seniority:"junior",bio:"Junior security analyst at ShieldOps. Always learning.",personality:"Junior analyst, learning. Eager, responsive. Will loop in managers",posts:["Passed my CEH exam! ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ"]},
  ],
  6:[{id:601,first:"Brendan",last:"Forde",title:"CEO & Founder",seniority:"c-suite",bio:"Founder at CipherEdge. Identity obsessive. Ex-Okta.",personality:"Identity obsessive, founder. Visionary and technical. Responds to strategic fit",posts:["Identity is the new perimeter. We've been saying this for three years. The market is finally listening."]},
    {id:602,first:"Yvonne",last:"Stapleton",title:"Head of Security",seniority:"director",bio:"Security engineering at CipherEdge.",personality:"Security engineer. Deep technical. Wants whitepaper depth. Engineering peer conversation",posts:["Our zero-trust framework white paper is live. Link in comments."]},
    {id:603,first:"Colm",last:"Sheridan",title:"Sales Director",seniority:"director",bio:"Sales at CipherEdge. 10 years in identity and access management.",personality:"Identity sales expert. Strategic framing required. Responds to business impact",posts:["Every CISO I've spoken to this month has mentioned identity as their top priority. We're in the right place at the right time."]},
    {id:604,first:"Sinead",last:"Whelan",title:"Identity & Access Manager",seniority:"manager",bio:"IAM specialist at CipherEdge.",personality:"IAM specialist. Standards and best practice driven. Engages on technical implementation",posts:["MFA fatigue is a real attack vector. Here's how to mitigate it: ÃÂÃÂ°ÃÂÃÂÃÂÃÂ§ÃÂÃÂµ"]},
    {id:605,first:"Darragh",last:"Murphy",title:"AE",seniority:"mid",bio:"Account Executive at CipherEdge.",personality:"Enterprise AE. Responsive to manager guidance. Mid-level peer voice",posts:[]},
    {id:606,first:"Leah",last:"O'Connor",title:"SDR",seniority:"junior",bio:"SDR at CipherEdge. Learning the security space.",personality:"Junior SDR. Learning security. Very responsive and eager to connect",posts:["Great team, great product. Excited to be here!"]},
  ],
  7:[{id:701,first:"Owen",last:"Callaghan",title:"CEO & Founder",seniority:"c-suite",bio:"Founder at ThreatNest. Making enterprise security accessible to SMBs.",personality:"SMB security champion. Mission-driven. Responds to democratic tech positioning",posts:["SMBs are attacked more than enterprises. They just don't have the resources to fight back. That's why we exist."]},
    {id:702,first:"Michelle",last:"Carey",title:"Head of Product",seniority:"director",bio:"Product at ThreatNest.",personality:"Product leader. UX-focused. Responds to design quality and user feedback",posts:["New dashboard release next week. The UX team absolutely nailed this one."]},
    {id:703,first:"Eoin",last:"Nolan",title:"Security Engineer",seniority:"mid",bio:"Security engineering at ThreatNest.",personality:"Security engineer. Technical implementation focus. Peer-level conversation",posts:[]},
    {id:704,first:"Aoife",last:"Brennan",title:"Customer Success Rep",seniority:"junior",bio:"CS at ThreatNest. Helping SMBs stay safe.",personality:"Customer success rep. User advocate. Responsive and helpful peer",posts:["Love when a customer tells us we've given them peace of mind. That's the job."]},
  ],
  8:[{id:801,first:"Kieran",last:"Tully",title:"CEO",seniority:"c-suite",bio:"CEO at Fortivex. Former Head of GCHQ secondment. Building the future of SOC automation.",personality:"Former GCHQ, CEO. Deep security expertise. Responds to operational depth",posts:["The SOC is broken. Too many alerts, too few analysts, too much noise. We fix that.","Proud to be named in Gartner's Cool Vendors report for security operations."]},
    {id:802,first:"Maeve",last:"Donovan",title:"CISO",seniority:"c-suite",bio:"CISO at Fortivex. Board-level security advisor.",personality:"Board-level CISO. Executive presence. Needs strategic business framing",posts:["Board members: cybersecurity is not an IT issue. It's a business risk issue. Time to treat it that way."]},
    {id:803,first:"Ronan",last:"Foley",title:"VP Sales EMEA",seniority:"vp",bio:"VP Sales EMEA at Fortivex.",personality:"Enterprise EMEA VP. Quota-driven. Responds to pipeline opportunity",posts:["EMEA pipeline looking very healthy heading into H2. Team is firing on all cylinders."]},
    {id:804,first:"Grainne",last:"Lawless",title:"Director, SOC Automation",seniority:"director",bio:"SOC automation specialist at Fortivex.",personality:"SOC automation expert. Operational mindset. Engages on process improvement",posts:["Automation doesn't replace analysts. It frees them to do the work that actually matters."]},
    {id:805,first:"Barry",last:"Malone",title:"Enterprise Sales Manager",seniority:"manager",bio:"Enterprise sales at Fortivex.",personality:"Enterprise sales manager. Long cycle expert. Responds to structured deals",posts:["Closed a 3-year enterprise deal today. Longest sales cycle I've ever run. Worth it. ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ"]},
    {id:806,first:"Cliona",last:"Healy",title:"SOC Analyst",seniority:"mid",bio:"SOC analyst at Fortivex.",personality:"SOC analyst practitioner. Helpful peer. Will champion good tools",posts:[]},
    {id:807,first:"Fergus",last:"Dolan",title:"SDR",seniority:"junior",bio:"SDR at Fortivex. Breaking into the security sales world.",personality:"Junior SDR. Breaking into security. Eager and responsive",posts:["Cold calling CISOs is not for the faint-hearted. But I'm learning fast."]},
  ],
  9:[{id:901,first:"Michael",last:"Bourke",title:"CEO",seniority:"c-suite",bio:"CEO at IronCore Systems. 25 years in industrial manufacturing and IoT.",personality:"Manufacturing veteran, CEO. Practical, measured. Responds to ROI, not hype",posts:["Industry 4.0 is not a buzzword in our factories. It's every day.","Great to represent Irish manufacturing at Hannover Messe this year."]},
    {id:902,first:"Ann",last:"O'Leary",title:"COO",seniority:"c-suite",bio:"COO at IronCore. Operations excellence is my obsession.",personality:"Operations obsessive, COO. Discipline-driven. Engages on process efficiency",posts:["You can't improve what you can't measure. That's why we invested in IoT from day one."]},
    {id:903,first:"Joe",last:"Cullen",title:"VP Operations",seniority:"vp",bio:"VP Ops at IronCore. Supply chain and factory floor.",personality:"Supply chain expert. Vendor-relationship focused. Responds to reliability",posts:["Supply chain visibility has saved us more money than any other technology investment."]},
    {id:904,first:"Patricia",last:"Barry",title:"Plant Manager",seniority:"director",bio:"Plant manager at IronCore's Dublin facility.",personality:"Plant manager. Floor reality focus. Responds to practical, tested solutions",posts:["Another record production week. Proud of the team on the floor."]},
    {id:905,first:"Donal",last:"Hartigan",title:"Director of Procurement",seniority:"director",bio:"Procurement at IronCore. 150+ supplier relationships.",personality:"Procurement lead. Risk and vendor management. Engages on supplier benefits",posts:["Supplier diversity isn't just ethical. It's strategic risk management."]},
    {id:906,first:"Teresa",last:"Coughlan",title:"Supply Chain Manager",seniority:"manager",bio:"Supply chain at IronCore.",personality:"Supply chain coordinator. Process-focused. Helpful internal voice",posts:[]},
    {id:907,first:"Paddy",last:"Sheehan",title:"Operations Manager",seniority:"manager",bio:"Operations at IronCore.",personality:"Operations manager. Lean philosophy. Responds to waste elimination",posts:["Great lean workshop with the team today. Waste elimination never stops."]},
    {id:908,first:"Louise",last:"Tracey",title:"Quality Control Manager",seniority:"manager",bio:"QC at IronCore. Zero defects is the goal.",personality:"Quality obsessive. Zero-defect mentality. Engages on quality metrics",posts:["ISO 9001 audit passed with zero non-conformances. Team effort! ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ"]},
    {id:909,first:"Kevin",last:"Dunford",title:"Production Supervisor",seniority:"mid",bio:"Production supervisor at IronCore.",personality:"Production supervisor. Hands-on. Practical, results-focused",posts:[]},
    {id:910,first:"Denise",last:"Gleeson",title:"EHS Coordinator",seniority:"junior",bio:"EHS at IronCore. Safety first, always.",personality:"EHS coordinator. Safety-first culture. Responsive to team",posts:["1000 days without a lost-time incident! ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ"]},
  ],
  10:[{id:1001,first:"Seamus",last:"Fitzgibbon",title:"MD & Owner",seniority:"c-suite",bio:"Owner and MD of PrecisionWorks. Family business, third generation.",personality:"Family business owner. Long-term mindset. Responds to stability and growth",posts:["40 years of precision engineering. Still learning every day.","Cork manufacturing is alive and well. Proud to be part of it."]},
    {id:1002,first:"Mary",last:"Quigley",title:"Operations Director",seniority:"director",bio:"Operations at PrecisionWorks.",personality:"Operations director. Equipment and capability focused. Engages on manufacturing",posts:["New CNC equipment installed this week. Massive upgrade in our capability."]},
    {id:1003,first:"Fintan",last:"Mullins",title:"Head of Procurement",seniority:"director",bio:"Procurement and supplier management at PrecisionWorks.",personality:"Procurement lead. Supplier and cost management. Vendor-focused conversation",posts:[]},
    {id:1004,first:"Brigid",last:"Horan",title:"Quality Manager",seniority:"manager",bio:"Quality systems at PrecisionWorks.",personality:"Quality manager. Standards-driven. Responds to certifications and compliance",posts:["Quality isn't an inspection. It's a culture."]},
    {id:1005,first:"Colm",last:"Madden",title:"Production Coordinator",seniority:"mid",bio:"Keeping the production floor running at PrecisionWorks.",personality:"Production coordinator. Keeps things running. Process-oriented",posts:[]},
    {id:1006,first:"Una",last:"Flanagan",title:"Admin Assistant",seniority:"junior",bio:"Admin and front of house at PrecisionWorks.",personality:"Admin assistant. Front of house. Helpful and friendly",posts:[]},
  ],
  11:[{id:1101,first:"Frank",last:"Meehan",title:"Owner & MD",seniority:"c-suite",bio:"Owner of NovaMach. Custom machinery specialist for 20 years.",personality:"Manufacturing specialist, owner. Craft-focused. Responds to precision and quality",posts:["Small business, big quality. That's the NovaMach way."]},
    {id:1102,first:"Carmel",last:"Lyons",title:"Operations Manager",seniority:"manager",bio:"Operations at NovaMach.",personality:"Operations manager. Small business lean. Responsive to efficiency",posts:[]},
    {id:1103,first:"Declan",last:"Coffey",title:"Lead Machinist",seniority:"mid",bio:"Lead machinist and tooling specialist at NovaMach.",personality:"Lead machinist. Technical expertise. Peer-level technical conversation",posts:[]},
    {id:1104,first:"Emer",last:"Costello",title:"Office Manager",seniority:"junior",bio:"Office management at NovaMach.",personality:"Office manager. Small business backbone. Helpful and engaged",posts:[]},
  ],
  12:[{id:1201,first:"Robert",last:"Kearney",title:"CEO",seniority:"c-suite",bio:"CEO at FluxTech. Advanced materials pioneer.",personality:"Materials pioneer, CEO. Innovation-focused. Responds to advanced tech",posts:["Composite materials are reshaping aerospace, automotive, and construction. We're at the centre of it."]},
    {id:1202,first:"Helen",last:"Dempsey",title:"VP Operations",seniority:"vp",bio:"VP Ops at FluxTech. Scaling manufacturing excellence.",personality:"Operations VP. Scaling expert. Engages on manufacturing excellence",posts:["Operational resilience is the competitive advantage nobody talks about enough."]},
    {id:1203,first:"Ciaran",last:"Moynihan",title:"R&D Director",seniority:"director",bio:"R&D lead at FluxTech. Material science nerd.",personality:"R&D director. Patent-driven. Technical depth required",posts:["New patent filed this week. Can't say more yet. Watch this space ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ"]},
    {id:1204,first:"Noreen",last:"Fahy",title:"Procurement Manager",seniority:"manager",bio:"Procurement at FluxTech.",personality:"Procurement manager. Supplier and materials focus",posts:[]},
    {id:1205,first:"Alan",last:"Staunton",title:"Process Engineer",seniority:"mid",bio:"Process engineering at FluxTech.",personality:"Process engineer. Operational improvement mindset",posts:[]},
    {id:1206,first:"Roisin",last:"Neary",title:"Quality Technician",seniority:"junior",bio:"Quality assurance at FluxTech.",personality:"Quality technician. Quality systems focused. Helpful peer",posts:[]},
  ],
  13:[{id:1301,first:"Neil",last:"Callaghan",title:"CEO",seniority:"c-suite",bio:"CEO at CapitalBridge. Ex-Goldman Sachs. Building the future of institutional trading.",personality:"Goldman Sachs veteran, CEO. Quantitative mindset. Responds to metrics and execution",posts:["The capital markets are being rebuilt in software. We're at the forefront of that.","Privileged to ring the bell at Euronext Dublin today alongside our new partners."]},
    {id:1302,first:"Sandra",last:"Kinsella",title:"CFO",seniority:"c-suite",bio:"CFO at CapitalBridge. Previously Deloitte and AIB Capital Markets.",personality:"CFO, Deloitte background. Regulatory and financial discipline. Responds to compliance",posts:["Finance leaders: regulatory burden is increasing. Technology is the only scalable answer."]},
    {id:1303,first:"Hugh",last:"Feely",title:"CTO",seniority:"c-suite",bio:"CTO at CapitalBridge. Low-latency systems architect.",personality:"Millisecond-minded CTO. Low-latency obsessive. Deep technical engagement",posts:["Sub-millisecond execution. That's not a target. That's a baseline."]},
    {id:1304,first:"Valerie",last:"Roche",title:"VP Sales",seniority:"vp",bio:"VP Sales at CapitalBridge. Institutional sales, complex deals.",personality:"Institutional sales expert. Trust-building required. Long cycle complexity",posts:["Enterprise sales in financial services: trust is the product. Everything else follows."]},
    {id:1305,first:"Dermot",last:"Farley",title:"Head of Compliance",seniority:"director",bio:"Compliance at CapitalBridge. MiFID II, EMIR, DORA.",personality:"Compliance director. Regulatory framework. Engages on standards and governance",posts:["DORA compliance is not optional. It's time to treat it with the urgency it deserves."]},
    {id:1306,first:"Lorna",last:"Fagan",title:"Head of Partnerships",seniority:"director",bio:"Partnerships and BD at CapitalBridge.",personality:"Partnerships head. Business development focused. Strategic relationship play",posts:["Three new partnerships announced this quarter. Exciting times ahead."]},
    {id:1307,first:"Tim",last:"Galligan",title:"Risk Manager",seniority:"manager",bio:"Risk management at CapitalBridge.",personality:"Risk manager. Risk-averse perspective. Engages on mitigation",posts:[]},
    {id:1308,first:"Elaine",last:"Maguire",title:"Sales Manager",seniority:"manager",bio:"Sales management at CapitalBridge.",personality:"Sales manager, fintech. Quota-focused. Responds to pipeline",posts:["Great team, great quarter. Onwards to Q3! ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¯"]},
    {id:1309,first:"Ross",last:"Kiernan",title:"Financial Analyst",seniority:"mid",bio:"Financial analysis at CapitalBridge.",personality:"Financial analyst. Numbers-focused. Helpful internal analyst",posts:[]},
    {id:1310,first:"Amy",last:"Doherty",title:"SDR",seniority:"junior",bio:"SDR at CapitalBridge. Learning financial services sales.",personality:"Junior SDR. Learning fintech. Eager and responsive",posts:["Week one in fintech sales. Steep learning curve. Loving it."]},
  ],
  14:[{id:1401,first:"Gavin",last:"Enright",title:"CEO & Co-Founder",seniority:"c-suite",bio:"Founder at Moneta Labs. Embedded finance visionary. YC S21.",personality:"Fintech visionary, YC founder. Big picture thinker. Responds to market narrative",posts:["Every company will become a fintech company. The question is when."]},
    {id:1402,first:"Aoife",last:"Doyle",title:"CFO",seniority:"c-suite",bio:"CFO at Moneta Labs. Ex-Stripe.",personality:"Ex-Stripe CFO. Financial discipline and scaling. Intentional mindset",posts:["Financial discipline in a startup doesn't mean being conservative. It means being intentional."]},
    {id:1403,first:"Colm",last:"Nash",title:"Head of Sales",seniority:"director",bio:"Sales at Moneta Labs.",personality:"Sales director. Fintech relationship expert. Responds to partnership fit",posts:["Fintech sales is a relationship business. Full stop."]},
    {id:1404,first:"Roisin",last:"Smyth",title:"Compliance Lead",seniority:"manager",bio:"Compliance at Moneta Labs.",personality:"Compliance lead. Regulatory focus. Engages on governance",posts:[]},
    {id:1405,first:"Darragh",last:"Cullinane",title:"AE",seniority:"mid",bio:"Account Executive at Moneta Labs.",personality:"AE, mid-level. Responsive peer voice",posts:[]},
    {id:1406,first:"Grace",last:"Langan",title:"Marketing Executive",seniority:"junior",bio:"Marketing at Moneta Labs.",personality:"Junior marketing exec. Brand-focused. Responsive and eager",posts:["Our new brand is live! Check it out ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ¨"]},
  ],
  15:[{id:1501,first:"Ken",last:"Morrissey",title:"CEO & Founder",seniority:"c-suite",bio:"Founder at PayStream. Fintech operator. Payment reconciliation obsessive.",personality:"Founder, fintech. Reconciliation expert. Responds to specific SMB pain",posts:["Every finance team I speak to has the same problem: too much time on reconciliation, not enough on analysis. We fix that."]},
    {id:1502,first:"Jackie",last:"Naughton",title:"Head of Finance",seniority:"director",bio:"Finance lead at PayStream.",personality:"Finance leader. Numbers obsessive. Engages on metrics",posts:[]},
    {id:1503,first:"Evan",last:"Sherry",title:"Sales Manager",seniority:"manager",bio:"Sales at PayStream.",personality:"Sales manager, SMB. Fast cycles. Responds to quick trust-building",posts:["SMB sales is fast. You have to earn trust quickly or move on."]},
    {id:1504,first:"Laura",last:"Slattery",title:"Customer Success Rep",seniority:"junior",bio:"CS at PayStream.",personality:"Junior CS rep. Helpful and responsive",posts:[]},
  ],
  16:[{id:1601,first:"Richard",last:"Hackett",title:"CEO",seniority:"c-suite",bio:"CEO at FinAxis Group. 20 years in financial regulation and risk.",personality:"Regulatory veteran, CEO. Risk framework mindset. Responds to compliance advantage",posts:["Regulatory complexity is accelerating. The firms that will win are the ones that turn compliance into a competitive advantage."]},
    {id:1602,first:"Fiona",last:"Quigley",title:"Chief Compliance Officer",seniority:"c-suite",bio:"CCO at FinAxis Group. Board-level regulatory advisor.",personality:"Board-level CCO. Executive authority. Strategic regulatory positioning required",posts:["DORA, NIS2, Basel IV ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ the regulatory pipeline is full. Start now."]},
    {id:1603,first:"Eoin",last:"Sexton",title:"VP Sales EMEA",seniority:"vp",bio:"VP Sales EMEA at FinAxis Group.",personality:"VP Sales EMEA. RegTech expert. Responds to timing and momentum",posts:["RegTech is having its moment. We've been ready for years."]},
    {id:1604,first:"Grainne",last:"Cronin",title:"Head of Risk",seniority:"director",bio:"Risk management at FinAxis Group.",personality:"Risk director. Model risk focus. Engages on quantitative rigor",posts:["Model risk is the next frontier. Most firms are woefully underprepared."]},
    {id:1605,first:"Ruairi",last:"O'Neill",title:"Sales Manager",seniority:"manager",bio:"Sales manager at FinAxis Group.",personality:"Sales manager. Quota and compliance balance. Responds to pipeline",posts:[]},
    {id:1606,first:"Nessa",last:"Higgins",title:"Regulatory Analyst",seniority:"mid",bio:"Regulatory analysis at FinAxis Group.",personality:"Regulatory analyst. Standards-focused. Helpful peer voice",posts:[]},
    {id:1607,first:"Conall",last:"Carey",title:"SDR",seniority:"junior",bio:"SDR at FinAxis Group.",personality:"Junior SDR. Learning RegTech. Eager and responsive",posts:["Breaking into RegTech sales. Fascinating space."]},
  ],
  17:[{id:1701,first:"Dara",last:"O'Brien",title:"CEO & Founder",seniority:"c-suite",bio:"Founder at GreenLeaf Energy. Renewable energy developer and advocate.",personality:"Renewable energy founder. Mission-driven, practical. Responds to project metrics",posts:["The energy transition is not coming. It's here. The question is how fast.","Just signed our largest solar PPA to date. Proud of the team."]},
    {id:1702,first:"Sorcha",last:"Teehan",title:"Head of Operations",seniority:"director",bio:"Operations at GreenLeaf Energy.",personality:"Operations director. Project execution focused",posts:[]},
    {id:1703,first:"Pauric",last:"Spillane",title:"Project Manager",seniority:"manager",bio:"Project management at GreenLeaf Energy.",personality:"Project manager. Delivery-focused. Engages on project methodology",posts:["Phase 1 of the Galway wind project is complete. On time, on budget. That's how we do it."]},
    {id:1704,first:"Muireann",last:"Carey",title:"Sustainability Analyst",seniority:"mid",bio:"Sustainability and impact reporting at GreenLeaf Energy.",personality:"Sustainability analyst. Impact-focused. Responds to measurement",posts:["Our 2024 sustainability report is live. We hit every target."]},
    {id:1705,first:"Diarmuid",last:"Daly",title:"Admin Coordinator",seniority:"junior",bio:"Admin at GreenLeaf Energy.",personality:"Admin coordinator. Helpful team support",posts:[]},
  ],
  18:[{id:1801,first:"Dr. Fiona",last:"Lyons",title:"CEO & Founder",seniority:"c-suite",bio:"Founder at MedPoint Health. GP turned healthtech entrepreneur.",personality:"Founder, GP background. Healthcare insight. Responds to clinical and operational fit",posts:["The Irish health system is under enormous pressure. Technology is part of the answer.","Our digital health records product just went live in 50 new practices. Huge milestone."]},
    {id:1802,first:"Aine",last:"Thornton",title:"Operations Manager",seniority:"manager",bio:"Operations at MedPoint Health.",personality:"Operations manager. Healthcare process focused",posts:[]},
    {id:1803,first:"Cathal",last:"Madden",title:"Software Lead",seniority:"mid",bio:"Software development at MedPoint Health. Healthcare tech builder.",personality:"Software lead. Healthcare tech builder. Technical peer conversation",posts:[]},
    {id:1804,first:"Siobhan",last:"Reilly",title:"Customer Success Rep",seniority:"junior",bio:"CS at MedPoint Health.",personality:"Junior CS rep. User advocate. Responsive and engaged",posts:["Helped onboard 5 new GP practices this week. Every time I hear 'this saves us hours' I know we're doing something right."]},
  ],
  19:[{id:1901,first:"Andrew",last:"McAuley",title:"CEO",seniority:"c-suite",bio:"CEO at RetailEdge. 15 years in retail technology.",personality:"Retail tech veteran, CEO. Omnichannel expert. Responds to industry trend insight",posts:["Retail isn't dying. Bad retail is dying. Omnichannel-first retailers are thriving.","Joined the IMRG board this month. Excited to give back to the industry."]},
    {id:1902,first:"Claire",last:"Bergin",title:"COO",seniority:"c-suite",bio:"COO at RetailEdge. Operations and scaling expert.",personality:"COO, operations expert. Scaling and reliability focus",posts:["Operational excellence in retail tech: speed, reliability, and a relentless focus on the customer."]},
    {id:1903,first:"Ross",last:"Buckley",title:"VP Sales",seniority:"vp",bio:"VP Sales at RetailEdge.",personality:"VP Sales. Retail buying cycle expert. Responds to pace and timing",posts:["Retail tech buying cycles are shortening. Retailers want to move fast now."]},
    {id:1904,first:"Tara",last:"Gannon",title:"Head of Partnerships",seniority:"director",bio:"Partnerships and alliances at RetailEdge.",personality:"Partnerships head. Ecosystem play. Engages on integration",posts:["Just announced our Shopify Plus partnership. Big news for our customers."]},
    {id:1905,first:"Barry",last:"Jennings",title:"Enterprise Sales Manager",seniority:"manager",bio:"Enterprise sales at RetailEdge.",personality:"Enterprise sales manager. Long retail cycles. Responds to consultative approach",posts:[]},
    {id:1906,first:"Lisa",last:"Donoghue",title:"AE",seniority:"mid",bio:"Account Executive at RetailEdge.",personality:"AE, mid-level. Responsive peer",posts:[]},
    {id:1907,first:"Oisin",last:"Magee",title:"SDR",seniority:"junior",bio:"SDR at RetailEdge.",personality:"Junior SDR. Learning retail. Eager and responsive",posts:["First meeting booked with a top-10 UK retailer. Yes! ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¯"]},
  ],
  20:[{id:2001,first:"Mick",last:"Harrington",title:"MD & Founder",seniority:"c-suite",bio:"Founder at BuildRight. 20 years in construction, last 5 in construction tech.",personality:"Construction founder. Industry digitization focus. Responds to site reality",posts:["Construction is the last major industry to be digitised. We're changing that.","Great to see Irish construction tech getting recognition at Build Digital Summit."]},
    {id:2002,first:"Brid",last:"Fallon",title:"Operations Director",seniority:"director",bio:"Operations at BuildRight.",personality:"Operations director. Construction operations. Practical process focus",posts:[]},
    {id:2003,first:"SeÃÂÃÂÃÂÃÂ¡n",last:"Power",title:"Head of Projects",seniority:"director",bio:"Project management at BuildRight.",personality:"Project management head. Digital delivery expert. Responds to efficiency gains",posts:["Digital project management has cut our delays by 30%. The data doesn't lie."]},
    {id:2004,first:"Joan",last:"Kerrigan",title:"Compliance Manager",seniority:"manager",bio:"Compliance and health & safety at BuildRight.",personality:"Compliance manager. H&S obsessed. Engages on safety impact",posts:["H&S compliance in construction is life and death. We take it seriously."]},
    {id:2005,first:"Liam",last:"Cronin",title:"Project Manager",seniority:"mid",bio:"Project manager at BuildRight.",personality:"Project manager. Site-focused. Practical, responsive",posts:[]},
    {id:2006,first:"Aoibhinn",last:"Sheehan",title:"Site Coordinator",seniority:"junior",bio:"Site coordination at BuildRight.",personality:"Site coordinator. Ground-level voice. Helpful and engaged",posts:[]},
  ],
};

// ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ
// EMAIL DELAY BY SENIORITY (simulation days)
// ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ
const emailDelay = { "c-suite": 5, "vp": 3, "director": 2, "manager": 1, "mid": 0, "junior": 0 };
const emailResponseChance = { "c-suite": 0.45, "vp": 0.65, "director": 0.80, "mid": 0.95, "junior": 0.98 };
const linkedinDelay = { "c-suite": 7, "vp": 4, "director": 3, "manager": 2, "mid": 1, "junior": 0 };
const linkedinAcceptChance = { "c-suite": 0.35, "vp": 0.55, "director": 0.70, "manager": 0.80, "mid": 0.90, "junior": 0.95 };

// ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ
// ATTEMPT THRESHOLDS BY SENIORITY
// ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ
// How many call ATTEMPTS before there's a real chance of connecting
const minCallsToConnect = { "c-suite": 4, "vp": 3, "director": 2, "manager": 1, "mid": 0, "junior": 0 };
// How many emails must be sent before they'll reply
const minEmailsToReply = { "c-suite": 5, "vp": 4, "director": 3, "manager": 2, "mid": 1, "junior": 1 };
// Label shown on UI
const attemptsNeededLabel = { "c-suite": "4-5 touches needed", "vp": "3-4 touches needed", "director": "2-3 touches needed", "manager": "1-2 touches needed", "mid": "Responds quickly", "junior": "Very responsive" };


const emailReplies = {
  "c-suite": ["I don't usually respond to cold outreach but this is relevant. What does implementation look like?", "Forwarded to our Head of Enablement. They'll be in touch if there's a fit.", "Interesting. Send me the ROI case in one page. No decks.", "We might have a need for this in Q3. My EA will reach out if so."],
  "vp": ["This is timely ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ we just hired a new cohort. Can you send more detail on the scoring methodology?", "I've seen tools like this before. What makes yours different? Be specific.", "Looks relevant. What's the commercial model?", "Happy to take a 20-minute call. What does your calendar look like Thursday?"],
  "director": ["Thanks ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ this is actually something we've been discussing internally. Can you send a one-pager?", "Relevant timing ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ we're onboarding 4 new AEs next month. Happy to jump on a call.", "I've shared this with my Sales Manager. They'll follow up.", "This looks interesting. What does a typical pilot look like?"],
  "manager": ["This is exactly the problem I've been trying to solve. Can we jump on a call this week?", "We just had two new reps struggle in their first month. Very timely. When are you free?", "Love the concept. Send me a demo link and I'll take a look today.", "My team would benefit from this. Let me loop in my VP."],
  "mid": ["Thanks ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ I've forwarded this to my manager. They're the right person to speak to.", "Hi! Not really my area but I've passed this on to the sales manager."],
  "junior": ["Hi! This looks cool ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ I've forwarded it to my manager. They'll be the right person to chat to ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ", "Hey! Passed this to the right person internally ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ they'll reach out if there's interest!"],
};

// ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ
// PROLINK MESSAGE REPLIES BY SENIORITY
// ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ
const linkedinMessageReplies = {
  "c-suite": ["Thanks for connecting. What's on your mind?", "Happy to connect. What are you working on?"],
  "vp": ["Good to connect! What can I help with?", "Thanks for the connection. What's this about?"],
  "director": ["Thanks for connecting! Always happy to chat sales tech.", "Good to connect ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ what are you building?"],
  "manager": ["Hi! Great to connect. What's the product about?", "Hey! Thanks for reaching out. Tell me more?"],
  "mid": ["Hi! Nice to connect ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ What do you do?", "Hey, good to connect! What brings you my way?"],
  "junior": ["Hi!! Great to connect! ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ", "Hey, welcome to ProLink! What do you do?"],
};

// ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ
// CALL MECHANIC
// ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ
const callConnectChance = { "c-suite": 0.18, "vp": 0.28, "director": 0.40, "manager": 0.55, "mid": 0.70, "junior": 0.82 };
const callConnectedLines = {
  "c-suite": ["I have two minutes. Make it count.", "Who is this? I'm between meetings.", "You've got sixty seconds ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ what's the pitch?", "I'm literally walking into a boardroom. Email me."],
  "vp": ["I'm heading into a call ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ can you send me an email first?", "Sure, I can talk for a few minutes. What's this about?", "I saw your email actually. Tell me more.", "Good timing. I've got five minutes."],
  "director": ["Hi! Yes, what can I do for you?", "Good timing ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ I was just thinking about this space.", "Sure, I have a few minutes.", "Hi! Glad you called actually."],
  "manager": ["Hey! Great timing, I've been thinking about this exact problem.", "Hi! Yes, happy to chat. What do you have?", "Oh interesting! Tell me more.", "Hi! We literally just had a team meeting about this."],
  "mid": ["Hi! Let me grab my manager ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ they're the right person for this.", "Sure, but I'm not the decision maker here. Let me transfer you.", "Hi! I can chat but you'd really need to speak to my boss."],
  "junior": ["Hi! Oh wow, sure! Let me get someone who can help you!", "Hey! I'll pass you to my manager right now!", "Hi! I'm not sure I'm the right person but happy to listen!"],
};
const callVoicemailLines = {
  "c-suite": ["You've reached the voicemail of [name]. Leave a message after the tone.", "Hi, I'm not available right now. Please leave a brief message."],
  "vp": ["You've reached [name]. I'm either on a call or out of office. Leave a message and I'll get back to you.", "Hi, this is [name]. Can't take your call right now ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ leave a message."],
  "director": ["Hi, [name] here. I'm not available ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ please leave your name and number.", "You've reached [name]'s voicemail. Leave a message and I'll call you back."],
  "manager": ["Hey, it's [name]! Can't get to the phone. Leave a message and I'll call you back!", "Hi! This is [name]. I'll call you back as soon as I can."],
  "mid": ["Hey, it's [name]! Leave me a message and I'll get back to you!", "Hi, [name] here ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ well, not exactly. Leave a message!"],
  "junior": ["Hey, it's [name]! I'll call you back super soon! ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ", "Hi! [name] here ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ can't take your call right now but leave a message!"],
};
const callGatekeeperLines = [
  "Hi, this is reception. Can I ask who's calling and what it's regarding?",
  "Good afternoon, [company]. Who would you like to speak to?",
  "Hi there! Can I ask what this call is in relation to?",
  "Thanks for calling. Are you expected?",
];

// ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ
// MEETING MECHANIC
// ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ
const meetingAcceptChance = { "c-suite": 0.55, "vp": 0.65, "director": 0.75, "manager": 0.85, "mid": 0.35, "junior": 0.25 };
const meetingBookedReplies = {
  "c-suite": ["Let's do it. 30 minutes next Tuesday ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ my EA will send an invite.", "I've got 20 minutes Thursday at 3pm. Confirmed."],
  "vp": ["Booked ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Thursday works. Looking forward to it.", "Happy to. I'll send a calendar invite for next week."],
  "director": ["Sure ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ let's put something in the diary. Tuesday at 11am?", "Happy to chat. I'll send a slot over for next week."],
  "manager": ["Absolutely ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ this week works. How's Wednesday at 2pm?", "Yes! Let's do it. I'll send a calendar link now."],
  "mid": ["I'll check with my manager first but I'm happy to be on the call.", "I'd need to loop in my boss ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ can you send the invite to them too?"],
  "junior": ["I'll forward this to my manager ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ they'll be the right person!", "I need to check with the team but I think this could work!"],
};
const meetingDeclinedReplies = {
  "c-suite": ["Not the right time for us. Will keep you in mind for Q3.", "We're heads down this quarter. Come back in six months."],
  "vp": ["We've already invested in a solution here. Thanks though.", "Budget is locked for the year ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ not one for us right now."],
  "director": ["We'd need more internal alignment before a call. Thanks for reaching out.", "Not quite the right fit for the team at the moment."],
  "manager": ["Good timing but we're mid-project. Come back in 6 weeks?", "I'd need sign-off from above ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ this isn't purely my call."],
  "mid": ["I've passed your details on but we're not looking at this currently.", "Thanks but I think we're covered on this."],
  "junior": ["I'll pass it along but I don't think we're in the market right now!", "Thanks ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ I'll let the team know but I think we're good!"],
};

// ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ
// HELPERS
// ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ
const sizeColors = { "Enterprise":"bg-purple-100 text-purple-700","Mid-Market":"bg-blue-100 text-blue-700","SMB":"bg-green-100 text-green-700" };
const industryColors = { "SaaS":"bg-sky-100 text-sky-700","Cyber Security":"bg-red-100 text-red-700","Manufacturing":"bg-orange-100 text-orange-700","Fintech":"bg-yellow-100 text-yellow-600","Energy":"bg-green-100 text-green-700","Healthcare":"bg-pink-100 text-pink-700","Retail Tech":"bg-indigo-100 text-indigo-700","Construction":"bg-amber-100 text-amber-700" };
const seniorityColors = { "c-suite":"bg-red-100 text-red-700","vp":"bg-orange-100 text-orange-700","director":"bg-yellow-100 text-yellow-600","manager":"bg-blue-100 text-blue-700","mid":"bg-gray-100 text-gray-600","junior":"bg-green-100 text-green-700" };
const seniorityLabels = { "c-suite":"C-Suite","vp":"VP","director":"Director","manager":"Manager","mid":"Mid-Level","junior":"Junior" };
const avatarColors = ["bg-blue-500","bg-indigo-500","bg-purple-500","bg-pink-500","bg-red-500","bg-orange-500","bg-green-500","bg-teal-500","bg-cyan-500","bg-violet-500"];
const getAvatarColor = (id) => avatarColors[id % avatarColors.length];
const getInitials = (emp) => `${emp.first.replace("Dr. ","")[0]}${emp.last[0]}`.toUpperCase();
const getEmail = (emp, company) => `${emp.first.toLowerCase().replace("dr. ","").replace(" ","")}.${emp.last.toLowerCase().replace("'","")}@${company.domain}`;
function getPhone(emp) {
  const bases = ["01 234","01 456","01 678","01 890","021 234","021 567"];
  const base = bases[emp.id % bases.length];
  const suffix = String(emp.id * 37 % 9000 + 1000).slice(0,4);
  return `+353 ${base} ${suffix}`;
}

function getCompanyForEmp(empId) {
  for (const [cId, emps] of Object.entries(allEmployees)) {
    if (emps.find(e => e.id === empId)) return companies.find(c => c.id === parseInt(cId));
  }
  return null;
}

function initState() {
  const state = {};
  Object.entries(allEmployees).forEach(([,emps]) => {
    emps.forEach(emp => {
      const willReply = Math.random() < (emailResponseChance[emp.seniority] ?? 0.7);
      const willAccept = Math.random() < (linkedinAcceptChance[emp.seniority] ?? 0.7);
      state[emp.id] = {
        emailThread: [], emailStatus: "none", emailReplyDay: null, willReplyEmail: willReply,
        emailCount: 0,
        linkedinStatus: "none", linkedinMsgs: [], linkedinReplyDay: null, willAcceptLinkedin: willAccept,
        calls: 0, callStatus: "not-contacted", meetingStatus: "none",
      };
    });
  });
  return state;
}

// ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ
// MAIN APP
// ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ

async function supaSignUp(email,password){const r=await fetch(SUPABASE_URL+'/auth/v1/signup',{method:'POST',headers:{'Content-Type':'application/json','apikey':SUPABASE_KEY},body:JSON.stringify({email,password})});return r.json();}
async function supaSignIn(email,password){const r=await fetch(SUPABASE_URL+'/auth/v1/token?grant_type=password',{method:'POST',headers:{'Content-Type':'application/json','apikey':SUPABASE_KEY},body:JSON.stringify({email,password})});return r.json();}
async function supaSignOut(tok){await fetch(SUPABASE_URL+'/auth/v1/logout',{method:'POST',headers:{Authorization:'Bearer '+tok,'apikey':SUPABASE_KEY}});}
async function fetchProduct(tok,uid){const r=await fetch(SUPABASE_URL+'/rest/v1/user_products?user_id=eq.'+uid+'&limit=1',{headers:{Authorization:'Bearer '+tok,'apikey':SUPABASE_KEY}});const d=await r.json();return d[0]||null;}
async function upsertProduct(tok,uid,form){await fetch(SUPABASE_URL+'/rest/v1/user_products',{method:'POST',headers:{Authorization:'Bearer '+tok,'apikey':SUPABASE_KEY,'Content-Type':'application/json',Prefer:'resolution=merge-duplicates'},body:JSON.stringify({user_id:uid,product_name:form.name,product_description:form.desc,icp:form.icp,value_props:form.vps.split('\n').filter(Boolean),objections:form.objs.split('\n').filter(Boolean)})});}

export default function App() {
  const [tab, setTab] = useState("crm");
  const [simDay, setSimDay] = useState(1);
  const [state, setState] = useState(initState);
  const [crmView, setCrmView] = useState("accounts");
  const [selCompany, setSelCompany] = useState(null);
  const [intelData, setIntelData] = React.useState({});
  const [expandedIntel, setExpandedIntel] = React.useState(null);
  const [user,setUser]=React.useState(()=>{try{return JSON.parse(localStorage.getItem('rp_sess')||'{}').user||null;}catch{return null;}});
  const [authTok,setAuthTok]=React.useState(()=>{try{return JSON.parse(localStorage.getItem('rp_sess')||'{}').access_token||null;}catch{return null;}});
  const [authView,setAuthView]=React.useState('login');
  const [authEmail,setAuthEmail]=React.useState('');
  const [authPwd,setAuthPwd]=React.useState('');
  const [authErr,setAuthErr]=React.useState('');
  const [authBusy,setAuthBusy]=React.useState(false);
  const [product,setProduct]=React.useState(null);
  const [showProdSetup,setShowProdSetup]=React.useState(false);
  const [prodForm,setProdForm]=React.useState({name:'',desc:'',icp:'',vps:'',objs:''});
  const [prodSaving,setProdSaving]=React.useState(false);

  React.useEffect(()=>{
    try{const s=JSON.parse(localStorage.getItem('rp_sess')||'{}');
      if(s.access_token&&s.user){fetchProduct(s.access_token,s.user.id).then(p=>{if(p){setProduct(p);setProdForm({name:p.product_name||'',desc:p.product_description||'',icp:p.icp||'',vps:(p.value_props||[]).join('\n'),objs:(p.objections||[]).join('\n')});}else setShowProdSetup(true);});}
    }catch(e){}
  },[]);

  const handleLogin=async()=>{setAuthErr('');setAuthBusy(true);const res=await supaSignIn(authEmail,authPwd);if(res.error){setAuthErr(res.error.message||'Login failed');setAuthBusy(false);return;}localStorage.setItem('rp_sess',JSON.stringify({access_token:res.access_token,user:res.user}));setUser(res.user);setAuthTok(res.access_token);const p=await fetchProduct(res.access_token,res.user.id);if(p){setProduct(p);setProdForm({name:p.product_name||'',desc:p.product_description||'',icp:p.icp||'',vps:(p.value_props||[]).join('\n'),objs:(p.objections||[]).join('\n')});}else setShowProdSetup(true);setAuthBusy(false);};
  const handleSignup=async()=>{setAuthErr('');setAuthBusy(true);const r1=await supaSignUp(authEmail,authPwd);if(r1.error){setAuthErr(r1.error.message||'Signup failed');setAuthBusy(false);return;}const r2=await supaSignIn(authEmail,authPwd);if(r2.error){setAuthErr('Account created! Please log in.');setAuthView('login');setAuthBusy(false);return;}localStorage.setItem('rp_sess',JSON.stringify({access_token:r2.access_token,user:r2.user}));setUser(r2.user);setAuthTok(r2.access_token);setShowProdSetup(true);setAuthBusy(false);};
  const handleLogout=async()=>{if(authTok)await supaSignOut(authTok);localStorage.removeItem('rp_sess');setUser(null);setAuthTok(null);setProduct(null);};
  const handleSaveProd=async()=>{if(!prodForm.name.trim())return;setProdSaving(true);await upsertProduct(authTok,user.id,prodForm);const p=await fetchProduct(authTok,user.id);setProduct(p);setShowProdSetup(false);setProdSaving(false);};

  const [selEmp, setSelEmp] = useState(null);
  const [filterInd, setFilterInd] = useState("All");
  const [emailCompose, setEmailCompose] = useState(null);
  const [emailDraft, setEmailDraft] = useState({ subject:"", body:"" });
  const [plView, setPlView] = useState("feed");
  const [plSearch, setPlSearch] = useState("");
  const [plProfile, setPlProfile] = useState(null);
  const [plMsgEmp, setPlMsgEmp] = useState(null);
  const [plMsgDraft, setPlMsgDraft] = useState("");
  const [plConnectMsg, setPlConnectMsg] = useState(null);
  const [callModal, setCallModal] = useState(null);       // emp being called
  const [callPhase, setCallPhase] = useState("idle");     // idle | dialing | outcome
  const [callOutcome, setCallOutcome] = useState(null);   // connected | voicemail | no-answer | gatekeeper
  const [callLine, setCallLine] = useState("");  const [apiKey, setApiKey] = useState(localStorage.getItem("repforge_openai_key") || "");  const [showSettings, setShowSettings] = useState(!localStorage.getItem("repforge_openai_key"));  const [aiVoiceLoading, setAiVoiceLoading] = useState(false);  const [aiEmailLoading, setAiEmailLoading] = useState({});  const audioRef = useRef(null);  // what the prospect says

  const vapiRef = useRef(null);
  const [activeCallId, setActiveCallId] = useState(null);
  const [callStatus, setCallStatus] = useState('idle');
  const industries = ["All","SaaS","Cyber Security","Manufacturing","Fintech","Energy","Healthcare","Retail Tech","Construction"];
  const allEmps = Object.values(allEmployees).flat();

  function getVapiInstance() {
    if (!vapiRef.current) {
      const k = ['4405a0df','150e','41b2','ae24','f01d9a4c17ce'].join('-');
      vapiRef.current = new Vapi(k);
      vapiRef.current.on('call-start', () => setCallStatus('active'));
      vapiRef.current.on('call-end', () => { setActiveCallId(null); setCallStatus('idle'); });
      vapiRef.current.on('error', () => { setActiveCallId(null); setCallStatus('idle'); });
    }
    return vapiRef.current;
  }

  function selectVoice(firstName) {
    const irish = new Set(['aoife','cian','fiona','siobhan','niamh','eoin','seamus','padraig','brigid','caoimhe','conor','declan','emer','grainne','kieran','muireann','nuala','oisin','roisin','saoirse','tadhg','sean','brendan','fintan','ciara','orla','deirdre','maeve','colm','ronan','darragh','eimear','sinead']);
    const female = new Set(['aoife','fiona','siobhan','niamh','brigid','caoimhe','emer','grainne','muireann','nuala','roisin','saoirse','ciara','orla','deirdre','maeve','eimear','sinead','sarah','emma','jennifer','jessica','ashley','amanda','melissa','rachel','lauren','megan','hannah','anna','samantha','katherine','lisa','angela','helen']);
    const fn = (firstName || '').toLowerCase();
    if (irish.has(fn) && !female.has(fn)) return { provider: 'deepgram', voiceId: 'angus' };
    if (irish.has(fn) && female.has(fn)) return { provider: 'openai', voiceId: 'shimmer' };
    if (!irish.has(fn) && female.has(fn)) return { provider: 'openai', voiceId: 'nova' };
    return { provider: 'openai', voiceId: 'onyx' };
  }

  async function startCall(emp, company) {
    setActiveCallId(emp.id);
    setCallStatus('connecting');
    const vapi = getVapiInstance();
    const guides = {
      'c-suite': 'You are a C-suite exec on a cold call. Very brief. Only engage if pitch is immediately strategic.',
      'vp': 'You are a VP. One sharp qualifying question then decide quickly.',
      'director': 'You are a Director. Reasonably open. Ask one or two practical questions.',
      'manager': 'You are a Manager. Accessible but busy. Engage practically with the pitch.',
      'junior': 'You are junior staff. Friendly and curious but purchasing decisions go to your manager.',
    };
    const sysPrompt = 'You are ' + emp.first + ' ' + emp.last + ', ' + emp.title + ' at ' + (company?.name || 'your company') + '. ' + (emp.bio || '') + ' ' + (guides[emp.seniority] || guides.manager) + ' This is a live cold call. Keep ALL responses to 1-3 short sentences. Sound like a real busy professional. Never be immediately enthusiastic about a product.';
    try {
      await vapi.start({
        model: { provider: 'openai', model: 'gpt-3.5-turbo', messages: [{ role: 'system', content: sysPrompt+(product?'\n\n--- PRODUCT BEING PITCHED ---\nProduct: '+product.product_name+'. '+(product.product_description||'')+(product.icp?'\nTarget customer: '+product.icp:'')+((product.value_props||[]).length?'\nValue props: '+product.value_props.join('; '):'')+((product.objections||[]).length?'\nExpect objections about: '+product.objections.join('; '):''):'') }] },
        voice: selectVoice(emp.first),
        firstMessage: emp.first + ' speaking.',
      });
    } catch(e) { setActiveCallId(null); setCallStatus('idle'); }
  }

  function endCall() {
    try { vapiRef.current?.stop(); } catch(e) {}
    setActiveCallId(null); setCallStatus('idle');
  }

  async function generateAIReply(emp, company, emailThread) {
  try {
    const repEmails = (emailThread || []).filter(e => e.from === 'rep');
    const lastEmail = repEmails[repEmails.length - 1];
    if (!lastEmail) return null;
    const response = await fetch('/api/reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emp: { first: emp.first, last: emp.last, title: emp.title, seniority: emp.seniority, bio: emp.bio },
        company: { name: company?.name, industry: company?.industry, size: company?.size },
        emailSubject: lastEmail.subject || '',
        emailBody: lastEmail.body || '',
        emailThread: emailThread
      })
    });
    const data = await response.json();
    return data.reply || null;
  } catch (e) {
    const fallback = emailReplies[emp.seniority] || emailReplies['manager'];
    return fallback[Math.floor(Math.random() * fallback.length)];
  }
}

async function advanceDay() {
  const newDay = simDay + 1;
  setSimDay(newDay);
  const emailTasks = Object.entries(state)
    .filter(([, cs]) => newDay >= cs.emailReplyDay && cs.emailStatus === 'sent')
    .map(([idStr, cs]) => {
      const id = parseInt(idStr);
      const emp = allEmps.find(e => e.id === id);
      const company = companies.find(c => c.id === Math.floor(id / 100));
      return emp ? { id, emp, company, emailThread: cs.emailThread } : null;
    })
    .filter(Boolean);
  const aiReplies = await Promise.all(
    emailTasks.map(async ({ id, emp, company, emailThread }) => ({
      id, reply: await generateAIReply(emp, company, emailThread)
    }))
  );
  setState(prev => {
    const next = { ...prev };
    aiReplies.forEach(({ id, reply }) => {
      if (reply) {
        next[id] = { ...next[id],
          emailStatus: 'replied',
          emailThread: [...(next[id].emailThread || []), { from: 'prospect', body: reply, day: newDay }]
        };
      }
    });
    Object.entries(next).forEach(([idStr, cs]) => {
      const id = parseInt(idStr);
      const emp = allEmps.find(e => e.id === id);
      if (!emp) return;
      if (newDay >= cs.linkedinReplyDay && cs.linkedinStatus === 'pending') {
        next[id] = { ...next[id], linkedinStatus: cs.linkedinWillAccept ? 'connected' : 'ignored' };
      }
    });
    return next;
  });
}

function sendEmail(emp, company, subject, body) {
    const cs = state[emp.id];
    const newEmailCount = (cs.emailCount || 0) + 1;
    const minNeeded = minEmailsToReply[emp.seniority] ?? 2;
    const hasMetMinimum = newEmailCount >= minNeeded;
    const delay = emailDelay[emp.seniority] ?? 2;
    const replyDay = (cs.willReplyEmail && hasMetMinimum) ? simDay + delay : null;
    // If they already replied, don't reset
    const newStatus = cs.emailStatus === "replied" ? "replied" : (hasMetMinimum ? "sent" : "sent");
    setState(prev => ({
      ...prev,
      [emp.id]: {
        ...prev[emp.id],
        emailThread: [...prev[emp.id].emailThread, { from:"rep", subject, body, day:simDay }],
        emailStatus: prev[emp.id].emailStatus === "replied" ? "replied" : "sent",
        emailReplyDay: replyDay || prev[emp.id].emailReplyDay,
        emailCount: newEmailCount,
      }
    }));
  }

  function sendLinkedinConnect(emp) {
    const delay = linkedinDelay[emp.seniority] ?? 2;
    const replyDay = simDay + delay;
    setState(prev => ({ ...prev, [emp.id]: { ...prev[emp.id], linkedinStatus:"pending", linkedinReplyDay: replyDay } }));
  }

  function initiateCall(emp) {
    setCallModal(emp);
    setCallPhase("dialing");
    setCallOutcome(null);
    setCallLine("");
    // Simulate ring time then resolve outcome
    setTimeout(() => {
      const currentCalls = (state[emp.id]?.calls || 0);
      const minCalls = minCallsToConnect[emp.seniority] ?? 0;
      const effectiveConnectChance = currentCalls >= minCalls
        ? (callConnectChance[emp.seniority] ?? 0.4)
        : Math.min(0.08, (callConnectChance[emp.seniority] ?? 0.4) * 0.2);
      const connected = Math.random() < effectiveConnectChance;
      let outcome, line;
      if (connected) {
        const isGatekeeper = ["c-suite","vp"].includes(emp.seniority) && Math.random() < 0.35;
        if (isGatekeeper) {
          outcome = "gatekeeper";
          line = callGatekeeperLines[emp.id % callGatekeeperLines.length].replace("[company]", getCompanyForEmp(emp.id)?.name || "the company");
        } else {
          outcome = "connected";
          const lines = callConnectedLines[emp.seniority] || callConnectedLines["manager"];
          line = lines[emp.id % lines.length];
        }
      } else {
        const roll = Math.random();
        if (roll < 0.45) {
          outcome = "no-answer";
          line = "";
        } else {
          outcome = "voicemail";
          const vmLines = callVoicemailLines[emp.seniority] || callVoicemailLines["manager"];
          line = vmLines[emp.id % vmLines.length].replace("[name]", emp.first);
        }
      }
      setCallOutcome(outcome);
      setCallLine(line);
      setCallPhase("outcome");
      // Log the call in state
      setState(prev => ({
        ...prev,
        [emp.id]: {
          ...prev[emp.id],
          calls: (prev[emp.id]?.calls || 0) + 1,
          callLog: [...(prev[emp.id]?.callLog || []), { day: simDay, outcome, note: line }],
          callStatus: outcome === "connected" ? "contacted" : prev[emp.id]?.callStatus,
        }
      }));
    }, 3000);
  }

  function endCall() {
    setCallModal(null);
    setCallPhase("idle");
    setCallOutcome(null);
    setCallLine("");
  }

  function requestMeeting(emp) {
    if (state[emp.id]?.meetingStatus !== "none") return;
    const accepted = Math.random() < (meetingAcceptChance[emp.seniority] ?? 0.5);
    const pool = accepted ? meetingBookedReplies[emp.seniority] : meetingDeclinedReplies[emp.seniority];
    const reply = pool[emp.id % pool.length];
    setState(prev => ({
      ...prev,
      [emp.id]: {
        ...prev[emp.id],
        meetingStatus: accepted ? "booked" : "declined",
        emailThread: [...prev[emp.id].emailThread, { from:"prospect", body: reply, day: simDay }],
      }
    }));
  }

  function sendLinkedinMsg(emp, msg) {
    const cs = state[emp.id];
    if (cs.linkedinStatus !== "connected") return;
    const replies = linkedinMessageReplies[emp.seniority] || linkedinMessageReplies["manager"];
    const reply = replies[emp.id % replies.length];
    const newMsgs = [...cs.linkedinMsgs, { from:"rep", text:msg, day:simDay }];
    setTimeout(() => {
      setState(prev => ({ ...prev, [emp.id]: { ...prev[emp.id], linkedinMsgs: [...prev[emp.id].linkedinMsgs, { from:"rep", text:msg, day:simDay }, { from:"prospect", text:reply, day:simDay }] } }));
    }, 800);
    setState(prev => ({ ...prev, [emp.id]: { ...prev[emp.id], linkedinMsgs: newMsgs } }));
  }

  // ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ INBOX DATA ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ
  const inbox = allEmps.filter(e => state[e.id]?.emailStatus === "replied").map(e => ({ emp:e, company:getCompanyForEmp(e.id), thread:state[e.id].emailThread }));
  const sent = allEmps.filter(e => ["sent","replied"].includes(state[e.id]?.emailStatus)).map(e => ({ emp:e, company:getCompanyForEmp(e.id), thread:state[e.id].emailThread }));
  const pending = allEmps.filter(e => state[e.id]?.emailStatus === "sent").length;
  const connections = allEmps.filter(e => state[e.id]?.linkedinStatus === "connected");
  const pendingConnections = allEmps.filter(e => state[e.id]?.linkedinStatus === "pending").length;
  const meetingsBooked = allEmps.filter(e => state[e.id]?.meetingStatus === "booked").length;
  const emailsSent = allEmps.filter(e => state[e.id]?.emailStatus !== "none").length;
  const emailsReplied = allEmps.filter(e => state[e.id]?.emailStatus === "replied").length;
  const totalCalls = allEmps.reduce((acc, e) => acc + (state[e.id]?.calls || 0), 0);
  const accountsTouched = companies.filter(c => (allEmployees[c.id]||[]).some(e => state[e.id]?.emailStatus !== "none" || (state[e.id]?.calls||0) > 0 || state[e.id]?.linkedinStatus !== "none")).length;
  const MEETING_GOAL = 5;
  const SIM_LENGTH = 30;
  const simComplete = simDay > SIM_LENGTH;
  function calcGrade() {
    let score = 0;
    score += Math.min(meetingsBooked / MEETING_GOAL, 1) * 50;
    score += Math.min(emailsReplied / 10, 1) * 20;
    score += Math.min(connections.length / 10, 1) * 15;
    score += Math.min(accountsTouched / 15, 1) * 15;
    if (score >= 85) return { grade:"A", label:"Exceptional", color:"text-green-700", bg:"bg-green-50 border-green-200" };
    if (score >= 70) return { grade:"B", label:"Strong", color:"text-blue-700", bg:"bg-blue-50 border-blue-200" };
    if (score >= 55) return { grade:"C", label:"Developing", color:"text-yellow-700", bg:"bg-yellow-50 border-yellow-200" };
    if (score >= 40) return { grade:"D", label:"Needs Work", color:"text-orange-700", bg:"bg-orange-50 border-orange-200" };
    return { grade:"F", label:"Below Target", color:"text-red-700", bg:"bg-red-50 border-red-200" };
  }

  // ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ FEED POSTS ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ
  const feedPosts = allEmps.flatMap(emp => {
    const company = getCompanyForEmp(emp.id);
    return emp.posts.map((post, i) => ({ emp, company, post, id: emp.id * 100 + i }));
  }).sort((a,b) => (b.emp.id % 7) - (a.emp.id % 7));

  const navBtn = (id, label, icon, badge) => (
    <button key={id} onClick={() => setTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${tab===id ? "bg-[#1A3A2A] text-white" : "text-[#1A3A2A] hover:bg-[#DDD9D0]"}`}>
      <span>{icon}</span>{label}
      {badge > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{badge}</span>}
    </button>
  );

  // ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ
  // RENDER
  // ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ
  return (
    <div className="min-h-screen bg-[#F7F4EE]">
      {!user&&(<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'#1A3A2A',zIndex:99999,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'system-ui'}}>
        <div style={{background:'white',borderRadius:'14px',padding:'40px 44px',width:'380px',maxWidth:'90vw',boxShadow:'0 20px 60px rgba(0,0,0,0.3)'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'6px'}}><span style={{fontSize:'24px'}}>🔨</span><h1 style={{margin:0,fontSize:'22px',fontWeight:'800',color:'#1A3A2A'}}>RepForge</h1></div>
          <p style={{margin:'0 0 22px',color:'#64748b',fontSize:'13px'}}>AI-powered sales training platform</p>
          <div style={{display:'flex',marginBottom:'18px',borderRadius:'8px',border:'1px solid #e2e8f0',overflow:'hidden'}}>
            <button onClick={()=>setAuthView('login')} style={{flex:1,padding:'10px',border:'none',cursor:'pointer',fontWeight:'600',background:authView==='login'?'#1A3A2A':'white',color:authView==='login'?'white':'#94a3b8',fontSize:'13px'}}>Log In</button>
            <button onClick={()=>setAuthView('signup')} style={{flex:1,padding:'10px',border:'none',cursor:'pointer',fontWeight:'600',background:authView==='signup'?'#1A3A2A':'white',color:authView==='signup'?'white':'#94a3b8',fontSize:'13px'}}>Sign Up</button>
          </div>
          <input value={authEmail} onChange={e=>setAuthEmail(e.target.value)} placeholder="Email address" style={{width:'100%',padding:'11px 14px',marginBottom:'10px',border:'1px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}} type="email" autoFocus />
          <input value={authPwd} onChange={e=>setAuthPwd(e.target.value)} placeholder="Password" style={{width:'100%',padding:'11px 14px',marginBottom:'16px',border:'1px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}} type="password" onKeyDown={e=>{if(e.key==='Enter')authView==='login'?handleLogin():handleSignup();}} />
          {authErr&&<div style={{color:'#dc2626',fontSize:'13px',marginBottom:'14px',padding:'9px 12px',background:'#fef2f2',borderRadius:'6px',border:'1px solid #fecaca'}}>{authErr}</div>}
          <button onClick={authView==='login'?handleLogin:handleSignup} disabled={authBusy} style={{width:'100%',padding:'12px',background:'#1A3A2A',color:'white',border:'none',borderRadius:'8px',fontSize:'14px',fontWeight:'700',cursor:authBusy?'not-allowed':'pointer',opacity:authBusy?0.65:1}}>
            {authBusy?'...':(authView==='login'?'Log In':'Create Account')}
          </button>
        </div>
      </div>)}
      {showProdSetup&&(<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.6)',zIndex:9998,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'system-ui'}}>
        <div style={{background:'white',borderRadius:'14px',padding:'32px 36px',width:'500px',maxWidth:'92vw',maxHeight:'85vh',overflowY:'auto',boxShadow:'0 24px 60px rgba(0,0,0,0.25)'}}>
          <h2 style={{margin:'0 0 6px',fontSize:'19px',fontWeight:'800',color:'#1A3A2A'}}>What are you selling?</h2>
          <p style={{margin:'0 0 22px',color:'#64748b',fontSize:'13px'}}>The AI personas will know your product and respond to your pitch.</p>
          {[{l:'Product Name *',k:'name',ph:'e.g. Acme CRM',m:false},{l:'Elevator Pitch',k:'desc',ph:'What problem does it solve and for who?',m:true},{l:'Ideal Customer Profile',k:'icp',ph:'e.g. B2B SaaS, 50-500 employees, VP Sales',m:false},{l:'Value Props (one per line)',k:'vps',ph:'Saves 5hrs/week\nReduces churn 20%',m:true},{l:'Common Objections (one per line)',k:'objs',ph:'Too expensive\nWe already have a solution',m:true}].map(({l,k,ph,m})=>(
            <div key={k} style={{marginBottom:'15px'}}>
              <label style={{display:'block',fontSize:'11px',fontWeight:'700',color:'#374151',marginBottom:'5px',letterSpacing:'0.05em'}}>{l.toUpperCase()}</label>
              {m?<textarea value={prodForm[k]} onChange={e=>setProdForm({...prodForm,[k]:e.target.value})} placeholder={ph} style={{width:'100%',padding:'9px 12px',border:'1px solid #e2e8f0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box',minHeight:'62px',resize:'vertical',fontFamily:'inherit'}}/>:<input value={prodForm[k]} onChange={e=>setProdForm({...prodForm,[k]:e.target.value})} placeholder={ph} style={{width:'100%',padding:'9px 12px',border:'1px solid #e2e8f0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box'}}/>}
            </div>
          ))}
          <div style={{display:'flex',gap:'10px',justifyContent:'flex-end',marginTop:'22px'}}>
            {product&&<button onClick={()=>setShowProdSetup(false)} style={{padding:'10px 18px',border:'1px solid #e2e8f0',borderRadius:'8px',cursor:'pointer',fontSize:'13px',fontWeight:'600',color:'#64748b'}}>Cancel</button>}
            <button onClick={handleSaveProd} disabled={prodSaving||!prodForm.name.trim()} style={{padding:'10px 24px',background:'#1A3A2A',color:'white',border:'none',borderRadius:'8px',cursor:(prodSaving||!prodForm.name.trim())?'not-allowed':'pointer',fontSize:'13px',fontWeight:'700',opacity:(prodSaving||!prodForm.name.trim())?0.6:1}}>
              {prodSaving?'Saving...':'Save & Start Selling'}
            </button>
          </div>
        </div>
      </div>)}
      {/* TOP NAV */}
      <div className="bg-[#EDEAE2] border-b border-[#D4CFC4] px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-6">
          <div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">RepForge</span>
            <span className="ml-2 text-gray-400 text-xs">Sales Training Sandbox</span>
          </div>
          <div className="flex items-center gap-1">
            {navBtn("crm","CRM","ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¢",0)}
            {navBtn("email","Email","ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ",inbox.length)}
            {navBtn("prolink","ProLink","ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ",pendingConnections)}
            {navBtn("score","Scorecard","ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ",meetingsBooked>0?meetingsBooked:0)}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500">Day <span className="font-bold text-gray-800">{simDay}</span><span className="text-gray-400"> / {SIM_LENGTH}</span></div>
          {!simComplete ? (
            <><button onClick={advanceDay} className="bg-amber-500 hover:bg-amber-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ© Advance Day</button>              <button onClick={() => setShowSettings(true)} className={`px-3 py-1.5 rounded-lg font-medium text-xs flex items-center gap-1 transition-colors ${apiKey ? "bg-emerald-700 text-white hover:bg-emerald-600" : "bg-red-600 text-white hover:bg-red-500 animate-pulse"}`}>ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ {apiKey ? "AI On" : "Add AI Key"}</button></>
          ) : (
            <button onClick={() => setTab("score")} className="bg-[#1A3A2A] text-white text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ View Final Score</button>
          )}
          <button onClick={()=>setShowProdSetup(true)} style={{fontSize:'11px',padding:'4px 10px',background:product?'#1A3A2A':'#dc2626',color:'white',border:'none',borderRadius:'6px',cursor:'pointer',fontWeight:'600',whiteSpace:'nowrap'}}>{product?'📦 '+product.product_name.substring(0,18):'⚠️ Setup Product'}</button><button onClick={handleLogout} style={{fontSize:'11px',padding:'4px 10px',background:'#f1f5f9',color:'#475569',border:'1px solid #e2e8f0',borderRadius:'6px',cursor:'pointer',whiteSpace:'nowrap'}}>{user?user.email.split('@')[0]+' · Logout':'Logout'}</button>
        </div>
      </div>

      {/* ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ */}
      {/* CRM TAB                                    */}
      {/* ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ */}
      {tab === "crm" && (
        <div className="p-6">
          {/* Accounts grid */}
          {crmView === "accounts" && (
            <>
              <div className="flex items-center justify-between mb-5">
                <div><h1 className="text-lg font-bold text-gray-900">Target Accounts</h1><p className="text-gray-500 text-sm">20 accounts. Click to begin prospecting.</p></div>
                <div className="flex gap-1.5 flex-wrap">
                  {industries.map(ind => (
                    <button key={ind} onClick={() => setFilterInd(ind)} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${filterInd===ind ? "bg-[#1A3A2A] text-white" : "bg-[#E4E1D8] text-[#1A3A2A] hover:bg-[#D4D0C6]"}`}>{ind}</button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {companies.filter(c => filterInd==="All" || c.industry===filterInd).map(c => {
                  const emps = allEmployees[c.id]||[];
                  const replied = emps.filter(e => state[e.id]?.emailStatus==="replied" || state[e.id]?.linkedinStatus==="connected").length;
                  const contacted = emps.filter(e => state[e.id]?.emailStatus!=="none" || state[e.id]?.calls>0 || state[e.id]?.linkedinStatus!=="none").length;
                  return (
                    <div key={c.id} onClick={() => { setSelCompany(c); fetchSupa('personas?company_id=eq.' + c.id + '&select=id,first_name,last_name,pain_points,goals,challenges,buying_role,budget_authority').then(d => { if(d){ const m={}; d.forEach(p=>{m[p.id]=p;}); setIntelData(m); setExpandedIntel(null); } }); setCrmView("company"); }} className="bg-white rounded-xl border border-[#D4CFC4] p-4 cursor-pointer hover:border-[#1A3A2A] hover:shadow-md transition-all group">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${getAvatarColor(c.id)}`}>{c.name.slice(0,2).toUpperCase()}</div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sizeColors[c.size]}`}>{c.size}</span>
                      </div>
                      <div className="font-bold text-gray-900 group-hover:text-[#1A3A2A] mb-0.5">{c.name}</div>
                      <div className="text-gray-500 text-xs mb-2 line-clamp-2">{c.description}</div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${industryColors[c.industry]||"bg-gray-100 text-gray-600"}`}>{c.industry}</span>
                        <span className="text-gray-400 text-xs">{c.location}</span>
                      </div>
                      <div className="border-t border-gray-100 pt-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>{emps.length} contacts</span>
                          <span className={replied>0?"text-green-600 font-medium":""}>{replied} responded</span>
                        </div>
                        <div className="bg-[#E4E1D8] rounded-full h-1"><div className="bg-[#1A3A2A] h-1 rounded-full" style={{width:`${emps.length>0?(contacted/emps.length)*100:0}%`}}></div></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Company detail */}
          {crmView === "company" && selCompany && (
            <>
              <div className="flex items-center gap-2 mb-5 text-sm">
                <button onClick={() => { setCrmView("accounts"); setSelCompany(null); }} className="text-[#1A3A2A] hover:underline font-medium">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Accounts</button>
                <span className="text-gray-300">/</span>
                <span className="font-semibold text-gray-700">{selCompany.name}</span>
              </div>
              <div className="bg-white rounded-xl border border-[#D4CFC4] p-5 mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg ${getAvatarColor(selCompany.id)}`}>{selCompany.name.slice(0,2).toUpperCase()}</div>
                  <div>
                    <div className="font-bold text-xl text-gray-900">{selCompany.name}</div>
                    <div className="text-gray-500 text-sm">{selCompany.description}</div>
                    <div className="flex gap-2 mt-1.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${industryColors[selCompany.industry]||""}`}>{selCompany.industry}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sizeColors[selCompany.size]}`}>{selCompany.size}</span>
                      <span className="text-gray-400 text-xs">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ {selCompany.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-[#D4CFC4] overflow-hidden">
                <table className="w-full">
                  <thead><tr className="bg-[#EDEAE2] border-b border-[#D4CFC4] text-xs font-medium text-[#1A3A2A] uppercase tracking-wide">
                    <th className="text-left px-4 py-2.5">Name</th><th className="text-left px-4 py-2.5">Title</th><th className="text-left px-4 py-2.5">Seniority</th>
                    <th className="text-left px-4 py-2.5">Phone</th><th className="text-left px-4 py-2.5">Email</th><th className="text-left px-4 py-2.5">Email Status</th><th className="text-left px-4 py-2.5">ProLink</th><th className="px-4 py-2.5">Actions</th>
                  </tr></thead>
                  <tbody>
                    {(allEmployees[selCompany.id]||[]).map(emp => {
                      const cs = state[emp.id];
                      return (
                        <tr key={emp.id} className="border-b border-[#EDE9E0] hover:bg-[#EDF5EE] cursor-pointer" onClick={() => { setSelEmp(emp); setCrmView("employee"); }}>
                          <td className="px-4 py-3"><div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ${getAvatarColor(emp.id)}`}>{getInitials(emp)}</div>
                            <span className="font-medium text-gray-800 text-sm">{emp.first} {emp.last}</span>
                          </div></td>
                          <td className="px-4 py-3 text-gray-600 text-sm">{emp.title}</td>
                          <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${seniorityColors[emp.seniority]}`}>{seniorityLabels[emp.seniority]}</span></td>
                          <td className="px-4 py-3 text-gray-400 text-xs font-mono">{getPhone(emp)}</td>
                          <td className="px-4 py-3 text-gray-400 text-xs">{getEmail(emp, selCompany)}</td>
                          <td className="px-4 py-3">
                            {cs.emailStatus==="none" && <span className="text-xs text-gray-400">Not contacted</span>}
                            {cs.emailStatus==="sent" && <span className="text-xs text-yellow-600 font-medium">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ³ Awaiting reply</span>}
                            {cs.emailStatus==="replied" && <span className="text-xs text-green-600 font-medium">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Replied</span>}
                          </td>
                          <td className="px-4 py-3">
                            {cs.linkedinStatus==="none" && <span className="text-xs text-gray-400">Not connected</span>}
                            {cs.linkedinStatus==="pending" && <span className="text-xs text-yellow-600 font-medium">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ³ Pending</span>}
                            {cs.linkedinStatus==="connected" && <span className="text-xs text-blue-600 font-medium">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Connected</span>}
                            {cs.linkedinStatus==="ignored" && <span className="text-xs text-red-400">Ignored</span>}
                          </td>
                          <td className="px-4 py-3" onClick={e=>e.stopPropagation()}>
                            <div className="flex gap-1.5">
                              <button onClick={() => initiateCall(emp)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1.5 rounded-lg font-medium">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Call</button>
                              <button onClick={() => { setEmailCompose({emp, company:selCompany}); setEmailDraft({subject:"",body:""}); }} className="bg-[#1A3A2A] hover:bg-[#2A5A3A] text-white text-xs px-3 py-1.5 rounded-lg font-medium">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Email</button>
                              <button onClick={() => { setPlProfile(emp); setTab("prolink"); setPlView("profile"); }} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1.5 rounded-lg font-medium">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Profile</button>
                              <button onClick={() => activeCallId === emp.id ? endCall() : startCall(emp, selCompany)} disabled={activeCallId !== null && activeCallId !== emp.id} style={{marginLeft:'6px',padding:'4px 12px',borderRadius:'6px',border:'none',cursor:'pointer',fontSize:'13px',fontWeight:'600',background:activeCallId===emp.id?(callStatus==='active'?'#ef4444':'#f97316'):'#7c3aed',color:'white',opacity:activeCallId!==null&&activeCallId!==emp.id?0.4:1}}>{activeCallId === emp.id ? (callStatus === 'connecting' ? 'ð Connecting...' : 'ð´ End Call') : 'ðï¸ AI Call'}</button>
                              <button onClick={() => setExpandedIntel(expandedIntel === emp.id ? null : emp.id)} style={{marginLeft:'6px',padding:'4px 10px',borderRadius:'6px',border:'1px solid #e2e8f0',cursor:'pointer',fontSize:'12px',fontWeight:'600',background:expandedIntel===emp.id?'#eff6ff':'#f8fafc',color:'#3b82f6'}}>🔍 Intel</button>
                            </div>
                          {expandedIntel === emp.id && intelData[emp.id] && (
                            <div style={{marginTop:'8px',padding:'14px 16px',background:'#f8fafc',border:'1px solid #e2e8f0',borderRadius:'8px',fontSize:'13px',lineHeight:'1.5'}}>
                              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>
                                <div><div style={{color:'#dc2626',fontWeight:'700',fontSize:'11px',textTransform:'uppercase',marginBottom:'4px'}}>⚠ Pain Points</div><ul style={{margin:0,paddingLeft:'16px',color:'#374151'}}>{(intelData[emp.id].pain_points||[]).map((p,i)=><li key={i}>{p}</li>)}</ul></div>
                                <div><div style={{color:'#16a34a',fontWeight:'700',fontSize:'11px',textTransform:'uppercase',marginBottom:'4px'}}>🎯 Goals</div><ul style={{margin:0,paddingLeft:'16px',color:'#374151'}}>{(intelData[emp.id].goals||[]).map((g,i)=><li key={i}>{g}</li>)}</ul></div>
                                <div><div style={{color:'#7c3aed',fontWeight:'700',fontSize:'11px',textTransform:'uppercase',marginBottom:'4px'}}>🧩 Challenges</div><ul style={{margin:0,paddingLeft:'16px',color:'#374151'}}>{(intelData[emp.id].challenges||[]).map((ch,i)=><li key={i}>{ch}</li>)}</ul></div>
                                <div><div style={{color:'#0369a1',fontWeight:'700',fontSize:'11px',textTransform:'uppercase',marginBottom:'4px'}}>💼 Buying Role</div><p style={{margin:'4px 0 0',color:'#374151'}}>{(intelData[emp.id].buying_role||'').replace(/_/g,' ').replace(/\b\w/g,x=>x.toUpperCase())} {intelData[emp.id].budget_authority?'✅':'❌'} Budget Auth</p></div>
                              </div>
                            </div>
                          )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Employee detail */}
          {crmView === "employee" && selEmp && selCompany && (
            <>
              <div className="flex items-center gap-2 mb-5 text-sm">
                <button onClick={() => { setCrmView("accounts"); setSelCompany(null); setSelEmp(null); }} className="text-[#1A3A2A] hover:underline font-medium">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Accounts</button>
                <span className="text-gray-300">/</span>
                <button onClick={() => { setCrmView("company"); setSelEmp(null); }} className="text-[#1A3A2A] hover:underline font-medium">{selCompany.name}</button>
                <span className="text-gray-300">/</span>
                <span className="font-semibold text-gray-700">{selEmp.first} {selEmp.last}</span>
              </div>
              <div className="flex gap-5">
                <div className="w-64 flex-shrink-0 space-y-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2 ${getAvatarColor(selEmp.id)}`}>{getInitials(selEmp)}</div>
                    <div className="font-bold text-gray-900">{selEmp.first} {selEmp.last}</div>
                    <div className="text-gray-500 text-sm">{selEmp.title}</div>
                    <div className="text-gray-400 text-xs">{selCompany.name}</div>
                    <span className={`mt-2 inline-block text-xs px-2 py-0.5 rounded-full font-medium ${seniorityColors[selEmp.seniority]}`}>{seniorityLabels[selEmp.seniority]}</span>
                    <div className="text-xs text-gray-500 mt-1">
                      {state[selEmp.id] && (
                        <span className="ml-2 text-gray-400">
                          ÃÂÃÂÃÂÃÂ· {state[selEmp.id].emailCount || 0} email{(state[selEmp.id].emailCount||0)!==1?'s':''} ÃÂÃÂÃÂÃÂ· {state[selEmp.id].calls || 0} call{(state[selEmp.id].calls||0)!==1?'s':''}
                        </span>
                      )}
                    </div>
                    <div className="mt-3 space-y-1 text-xs text-gray-500 text-left border-t border-gray-100 pt-3">
                      <div>ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ {getPhone(selEmp)}</div>
                      <div>ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ {getEmail(selEmp, selCompany)}</div>
                      {(state[selEmp.id]?.calls||0) > 0 && <div className="text-[#1A3A2A] font-medium pt-1">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ {state[selEmp.id].calls} call{state[selEmp.id].calls>1?"s":""} logged</div>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => initiateCall(selEmp)} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-2 text-sm font-medium">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Call {selEmp.first}</button>
                    <button onClick={() => { setEmailCompose({emp:selEmp, company:selCompany}); setEmailDraft({subject:"",body:""}); }} className="bg-[#1A3A2A] hover:bg-[#2A5A3A] text-white rounded-lg py-2 text-sm font-medium">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Email {selEmp.first}</button>
                    <button onClick={() => { setPlProfile(selEmp); setTab("prolink"); setPlView("profile"); }} className="bg-[#2A5A3A] hover:bg-[#1A3A2A] text-white rounded-lg py-2 text-sm font-medium">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ View ProLink Profile</button>
                    {/* Meeting request button ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ unlocks once they've replied or you're connected */}
                    {(state[selEmp.id]?.emailStatus === "replied" || state[selEmp.id]?.linkedinStatus === "connected") && state[selEmp.id]?.meetingStatus === "none" && (
                      <button onClick={() => requestMeeting(selEmp)} className="bg-amber-500 hover:bg-amber-600 text-white rounded-lg py-2 text-sm font-medium">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Request Meeting</button>
                    )}
                    {state[selEmp.id]?.meetingStatus === "booked" && (
                      <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg py-2 text-sm font-medium text-center">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Meeting Booked!</div>
                    )}
                    {state[selEmp.id]?.meetingStatus === "declined" && (
                      <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg py-2 text-sm font-medium text-center">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Meeting Declined</div>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 font-semibold text-gray-700 text-sm">Email Thread</div>
                    <div className="p-4 min-h-40 space-y-2">
                      {state[selEmp.id]?.emailThread.length === 0 ? (
                        <div className="text-center py-8 text-gray-400 text-sm">No emails sent yet. Email {selEmp.first} to start the conversation.</div>
                      ) : state[selEmp.id].emailThread.map((msg,i) => (
                        <div key={i} className={`p-3 rounded-lg text-xs leading-relaxed ${msg.from==="rep" ? "bg-[#EDF5EE] border border-[#B8D4BB] ml-8" : "bg-[#F2EFE8] border border-[#D4CFC4] mr-8"}`}>
                          <div className={`font-semibold mb-1 ${msg.from==="rep" ? "text-[#1A3A2A]" : "text-gray-800"}`}>{msg.from==="rep" ? "You" : `${selEmp.first} ${selEmp.last}`} ÃÂÃÂÃÂÃÂ· Day {msg.day}</div>
                          {msg.subject && <div className="font-medium text-gray-700 mb-0.5">Re: {msg.subject}</div>}
                          {msg.body}
                        </div>
                      ))}
                      {state[selEmp.id]?.emailStatus==="sent" && (
                        <div className="text-center py-2 text-xs text-yellow-600">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ³ Email sent ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ reply expected around Day {state[selEmp.id].emailReplyDay || "?"}. Click Advance Day to progress.</div>)}
              {apiKey && state[selEmp.id]?.willReplyEmail && (
                <button onClick={async () => {
                  const company = getCompanyForEmp(selEmp.id);
                  const thread = state[selEmp.id]?.emailThread || [];
                  const lastSent = [...thread].reverse().find(m => m.from === "rep");
                  if (!lastSent) return;
                  const reply = await generateAiEmailReply(selEmp, company, lastSent.subject || "Your email", lastSent.body);
                  if (reply) {
                    setState(prev => ({...prev, [selEmp.id]: {...prev[selEmp.id], emailThread: [...prev[selEmp.id].emailThread, {from:"prospect", body:reply, day:simDay}], emailStatus:"replied"}}));
                  }
                }} disabled={aiEmailLoading[selEmp.id]} className="ml-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs px-3 py-1 rounded-full transition-colors">
                  {aiEmailLoading[selEmp.id] ? "ÃÂÃÂ°ÃÂÃÂÃÂÃÂ¤ÃÂÃÂ Writing..." : "ÃÂÃÂ°ÃÂÃÂÃÂÃÂ¤ÃÂÃÂ AI Reply Now"}
                </button>
              )}
                    </div>
                  </div>
                  {/* Call Log */}
                  {(state[selEmp.id]?.callLog||[]).length > 0 && (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mt-4">
                      <div className="px-4 py-3 border-b border-gray-100 font-semibold text-gray-700 text-sm">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Call Log ({state[selEmp.id].callLog.length})</div>
                      <div className="divide-y divide-gray-50">
                        {state[selEmp.id].callLog.map((log, i) => (
                          <div key={i} className="px-4 py-3 flex items-start gap-3">
                            <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${log.outcome==="connected"?"bg-green-500":log.outcome==="voicemail"?"bg-yellow-400":log.outcome==="gatekeeper"?"bg-orange-400":"bg-gray-300"}`}></div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-xs font-semibold text-gray-700 capitalize">{log.outcome === "no-answer" ? "No Answer" : log.outcome}</span>
                                <span className="text-xs text-gray-400">ÃÂÃÂÃÂÃÂ· Day {log.day}</span>
                              </div>
                              {log.note && <div className="text-xs text-gray-500 italic">"{log.note}"</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ */}
      {/* EMAIL TAB                                  */}
      {/* ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ */}
      {tab === "email" && (
        <div className="flex h-screen">
          <div className="w-56 bg-[#EDEAE2] border-r border-[#D4CFC4] p-4">
            <button onClick={() => setEmailCompose({emp:null, company:null})} className="w-full bg-[#1A3A2A] hover:bg-[#2A5A3A] text-white rounded-lg py-2 text-sm font-medium mb-4">+ Compose</button>
            {[{id:"inbox",label:"Inbox",count:inbox.length},{id:"sent",label:"Sent",count:sent.length},{id:"pending",label:"Awaiting Reply",count:pending}].map(f => (
              <button key={f.id} onClick={() => setPlView(f.id)} className={`w-full text-left px-3 py-2 rounded-lg text-sm flex justify-between items-center mb-0.5 ${plView===f.id ? "bg-[#EDF5EE] text-[#1A3A2A] font-medium" : "text-[#3A5A3A] hover:bg-[#DDD9D0]"}`}>
                {f.label} {f.count > 0 && <span className={`text-xs px-1.5 py-0.5 rounded-full ${plView===f.id ? "bg-[#C8DEC8] text-[#1A3A2A]" : "bg-[#D4CFC4] text-[#3A5A3A]"}`}>{f.count}</span>}
              </button>
            ))}
          </div>
          <div className="flex-1 p-6 overflow-auto">
            {(plView==="inbox" || !plView) && (
              <>
                <h2 className="font-bold text-gray-900 mb-4">Inbox ({inbox.length})</h2>
                {inbox.length === 0 ? (
                  <div className="text-center py-16 text-gray-400">
                    <div className="text-4xl mb-3">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¬</div>
                    <div>No replies yet. Send emails and advance the simulation day to receive responses.</div>
                    <div className="text-xs mt-2">Senior contacts take longer to reply. Some may not reply at all.</div>
                  </div>
                ) : inbox.map(({emp, company, thread}) => (
                  <div key={emp.id} className="bg-white rounded-xl border border-gray-200 p-4 mb-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${getAvatarColor(emp.id)}`}>{getInitials(emp)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div><span className="font-semibold text-gray-800">{emp.first} {emp.last}</span><span className="text-gray-400 text-xs ml-2">{emp.title} ÃÂÃÂÃÂÃÂ· {company?.name}</span></div>
                          <span className="text-xs text-green-600 font-medium">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Replied</span>
                        </div>
                        <div className="mt-2 space-y-1.5">
                          {thread.map((msg,i) => (
                            <div key={i} className={`p-2.5 rounded-lg text-xs leading-relaxed ${msg.from==="rep" ? "bg-[#EDF5EE] border border-[#B8D4BB] ml-6" : "bg-[#F2EFE8] border border-[#D4CFC4] mr-6"}`}>
                              <div className={`font-semibold mb-0.5 ${msg.from==="rep" ? "text-[#1A3A2A]" : "text-gray-800"}`}>{msg.from==="rep" ? "You" : emp.first} ÃÂÃÂÃÂÃÂ· Day {msg.day}</div>
                              {msg.body}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
            {plView === "sent" && (
              <>
                <h2 className="font-bold text-gray-900 mb-4">Sent ({sent.length})</h2>
                {sent.length === 0 ? <div className="text-center py-16 text-gray-400"><div className="text-4xl mb-3">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¤</div><div>No emails sent yet.</div></div>
                : sent.map(({emp, company, thread}) => (
                  <div key={emp.id} className="bg-white rounded-xl border border-gray-200 p-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${getAvatarColor(emp.id)}`}>{getInitials(emp)}</div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800 text-sm">{emp.first} {emp.last} <span className="text-gray-400 font-normal">ÃÂÃÂÃÂÃÂ· {company?.name}</span></div>
                        <div className="text-gray-500 text-xs">{thread[0]?.body?.slice(0,80)}...</div>
                      </div>
                      <div>
                        {state[emp.id]?.emailStatus==="replied" ? <span className="text-xs text-green-600 font-medium">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Replied</span> : <span className="text-xs text-yellow-600">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ³ Awaiting</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
            {plView === "pending" && (
              <>
                <h2 className="font-bold text-gray-900 mb-4">Awaiting Reply ({pending})</h2>
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 text-xs text-yellow-800 mb-4">
                  ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ© Hit <strong>Advance Day</strong> in the top bar to progress the simulation and trigger replies. Senior contacts take longer ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ a C-suite contact may take 5+ days to respond.
                </div>
                {allEmps.filter(e => state[e.id]?.emailStatus==="sent").map(emp => {
                  const company = getCompanyForEmp(emp.id);
                  const cs = state[emp.id];
                  return (
                    <div key={emp.id} className="bg-white rounded-xl border border-gray-200 p-3 mb-2 flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${getAvatarColor(emp.id)}`}>{getInitials(emp)}</div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800 text-sm">{emp.first} {emp.last} <span className="text-gray-400 font-normal">ÃÂÃÂÃÂÃÂ· {company?.name}</span></div>
                        <div className="text-gray-400 text-xs">{seniorityLabels[emp.seniority]} ÃÂÃÂÃÂÃÂ· Sent Day {cs.emailThread[0]?.day}</div>
                      </div>
                      <div className="text-xs text-yellow-600">Expected ~Day {cs.emailReplyDay || "?"}</div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}

      {/* ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ */}
      {/* PROLINK TAB                                */}
      {/* ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ */}
      {tab === "prolink" && (
        <div className="flex min-h-screen">
          {/* ProLink sidebar */}
          <div className="w-56 bg-[#EDEAE2] border-r border-[#D4CFC4] p-4 flex flex-col gap-1">
            <div className="px-3 py-2 mb-2">
              <div className="font-bold text-[#1A3A2A] text-lg">ProLink</div>
              <div className="text-[#4A6A4A] text-xs">Professional Network</div>
            </div>
            {[{id:"feed",icon:"ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ ",label:"Home Feed"},{id:"network",icon:"ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¥",label:`Network ${pendingConnections>0?"("+pendingConnections+" pending)":""}`},{id:"search",icon:"ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ",label:"Search People"},{id:"messages",icon:"ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¬",label:`Messages ${connections.length>0?"("+connections.length+")":""}` }].map(v => (
              <button key={v.id} onClick={() => setPlView(v.id)} className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${plView===v.id ? "bg-[#EDF5EE] text-[#1A3A2A] font-medium" : "text-[#3A5A3A] hover:bg-[#DDD9D0]"}`}>{v.icon} {v.label}</button>
            ))}
          </div>

          {/* ProLink main content */}
          <div className="flex-1 max-w-2xl mx-auto p-6">

            {/* FEED */}
            {plView === "feed" && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1A3A2A] flex items-center justify-center text-white font-bold text-sm">JD</div>
                  <div className="flex-1 bg-[#EDEAE2] rounded-full px-4 py-2 text-[#7A8A7A] text-sm cursor-text">Share something with your network...</div>
                </div>
                {feedPosts.map(({emp, company, post, id}) => {
                  const cs = state[emp.id];
                  return (
                    <div key={id} className="bg-white rounded-xl border border-gray-200 p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${getAvatarColor(emp.id)}`}>{getInitials(emp)}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <button onClick={() => { setPlProfile(emp); setPlView("profile"); }} className="font-semibold text-gray-900 hover:text-blue-600 hover:underline text-sm">{emp.first} {emp.last}</button>
                              <div className="text-gray-500 text-xs">{emp.title} ÃÂÃÂÃÂÃÂ· {company?.name}</div>
                            </div>
                            <div>
                              {cs.linkedinStatus === "none" && <button onClick={() => sendLinkedinConnect(emp)} className="text-[#1A3A2A] border border-[#1A3A2A] text-xs px-3 py-1 rounded-full hover:bg-[#EDF5EE] transition-colors">+ Connect</button>}
                              {cs.linkedinStatus === "pending" && <span className="text-yellow-600 text-xs px-3 py-1 rounded-full border border-yellow-200 bg-yellow-50">Pending</span>}
                              {cs.linkedinStatus === "connected" && <span className="text-green-600 text-xs px-3 py-1 rounded-full border border-green-200 bg-green-50">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Connected</span>}
                              {cs.linkedinStatus === "ignored" && <span className="text-gray-400 text-xs">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">{post}</p>
                      <div className="flex gap-4 pt-2 border-t border-gray-100">
                        {["ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Like","ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¬ Comment","ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Repost"].map(a => (
                          <button key={a} className="text-gray-500 text-xs hover:text-[#1A3A2A] transition-colors">{a}</button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* NETWORK */}
            {plView === "network" && (
              <div>
                <h2 className="font-bold text-gray-900 mb-4">Your Network</h2>
                {pendingConnections > 0 && (
                  <div className="mb-5">
                    <div className="font-semibold text-gray-700 text-sm mb-3">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ³ Pending Requests ({pendingConnections})</div>
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-xs text-amber-700 mb-3">Hit <strong>Advance Day</strong> to simulate time passing ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ senior contacts take longer to accept.</div>
                    {allEmps.filter(e => state[e.id]?.linkedinStatus==="pending").map(emp => {
                      const company = getCompanyForEmp(emp.id);
                      return (
                        <div key={emp.id} className="bg-white rounded-xl border border-gray-200 p-3 mb-2 flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs ${getAvatarColor(emp.id)}`}>{getInitials(emp)}</div>
                          <div className="flex-1"><div className="font-medium text-gray-800 text-sm">{emp.first} {emp.last}</div><div className="text-gray-400 text-xs">{emp.title} ÃÂÃÂÃÂÃÂ· {company?.name}</div></div>
                          <span className="text-yellow-600 text-xs">Pending ÃÂÃÂÃÂÃÂ· Expected Day {state[emp.id].linkedinReplyDay}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="font-semibold text-gray-700 text-sm mb-3">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Connections ({connections.length})</div>
                {connections.length === 0 ? <div className="text-center py-8 text-gray-400 text-sm">No connections yet. Search for people or connect from the feed.</div>
                : connections.map(emp => {
                  const company = getCompanyForEmp(emp.id);
                  return (
                    <div key={emp.id} className="bg-white rounded-xl border border-gray-200 p-3 mb-2 flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs ${getAvatarColor(emp.id)}`}>{getInitials(emp)}</div>
                      <div className="flex-1"><div className="font-medium text-gray-800 text-sm">{emp.first} {emp.last}</div><div className="text-gray-400 text-xs">{emp.title} ÃÂÃÂÃÂÃÂ· {company?.name}</div></div>
                      <button onClick={() => { setPlMsgEmp(emp); setPlView("messages"); }} className="text-[#1A3A2A] text-xs border border-[#B8D4BB] px-3 py-1 rounded-full hover:bg-[#EDF5EE]">Message</button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* SEARCH */}
            {plView === "search" && (
              <div>
                <h2 className="font-bold text-gray-900 mb-4">Search People</h2>
                <input value={plSearch} onChange={e => setPlSearch(e.target.value)} placeholder="Search by name, title or company..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mb-4 focus:outline-none focus:border-[#1A3A2A]"/>
                <div className="space-y-2">
                  {allEmps.filter(e => {
                    const c = getCompanyForEmp(e.id);
                    const q = plSearch.toLowerCase();
                    return !q || `${e.first} ${e.last} ${e.title} ${c?.name}`.toLowerCase().includes(q);
                  }).slice(0,30).map(emp => {
                    const company = getCompanyForEmp(emp.id);
                    const cs = state[emp.id];
                    return (
                      <div key={emp.id} className="bg-white rounded-xl border border-gray-200 p-3 flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 ${getAvatarColor(emp.id)}`}>{getInitials(emp)}</div>
                        <div className="flex-1">
                          <button onClick={() => { setPlProfile(emp); setPlView("profile"); }} className="font-medium text-gray-800 text-sm hover:text-blue-600 hover:underline">{emp.first} {emp.last}</button>
                          <div className="text-gray-400 text-xs">{emp.title} ÃÂÃÂÃÂÃÂ· {company?.name} ÃÂÃÂÃÂÃÂ· {company?.location}</div>
                        </div>
                        <div className="flex gap-1.5">
                          {cs.linkedinStatus==="none" && <button onClick={() => sendLinkedinConnect(emp)} className="text-[#1A3A2A] border border-[#1A3A2A] text-xs px-2.5 py-1 rounded-full hover:bg-[#EDF5EE]">+ Connect</button>}
                          {cs.linkedinStatus==="pending" && <span className="text-yellow-700 text-xs px-2.5 py-1 rounded-full border border-yellow-200 bg-yellow-50">Pending</span>}
                          {cs.linkedinStatus==="connected" && <button onClick={() => { setPlMsgEmp(emp); setPlView("messages"); }} className="text-[#1A3A2A] text-xs border border-[#B8D4BB] px-2.5 py-1 rounded-full bg-[#EDF5EE]">Message</button>}
                          {cs.linkedinStatus==="ignored" && <span className="text-gray-400 text-xs">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ</span>}
                          <button onClick={() => { setPlProfile(emp); setPlView("profile"); }} className="text-[#3A5A3A] text-xs border border-[#D4CFC4] px-2.5 py-1 rounded-full hover:bg-[#EDEAE2]">View</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PROFILE */}
            {plView === "profile" && plProfile && (() => {
              const company = getCompanyForEmp(plProfile.id);
              const cs = state[plProfile.id];
              return (
                <div>
                  <button onClick={() => setPlView("feed")} className="text-blue-500 text-sm hover:underline mb-4 block">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Back to Feed</button>
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4">
                    <div className="h-20 bg-gradient-to-r from-[#1A3A2A] to-[#2A5A3A]"></div>
                    <div className="px-5 pb-5">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl -mt-8 mb-2 border-4 border-white ${getAvatarColor(plProfile.id)}`}>{getInitials(plProfile)}</div>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-gray-900 text-xl">{plProfile.first} {plProfile.last}</div>
                          <div className="text-gray-600">{plProfile.title}</div>
                          <div className="text-gray-500 text-sm">{company?.name} ÃÂÃÂÃÂÃÂ· {company?.location}</div>
                          <div className="text-gray-400 text-xs mt-1">{company?.industry} ÃÂÃÂÃÂÃÂ· {company?.size}</div>
                          <div className="text-gray-400 text-xs mt-1 font-mono">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ {getPhone(plProfile)}</div>
                        </div>
                        <div className="flex gap-2 mt-1">
                          {cs.linkedinStatus==="none" && <button onClick={() => sendLinkedinConnect(plProfile)} className="bg-[#1A3A2A] hover:bg-[#2A5A3A] text-white text-sm px-4 py-1.5 rounded-full transition-colors">+ Connect</button>}
                          {cs.linkedinStatus==="pending" && <span className="text-yellow-600 text-sm border border-yellow-200 px-4 py-1.5 rounded-full bg-yellow-50">Request Sent</span>}
                          {cs.linkedinStatus==="connected" && <button onClick={() => { setPlMsgEmp(plProfile); setPlView("messages"); }} className="bg-white border border-[#1A3A2A] text-[#1A3A2A] text-sm px-4 py-1.5 rounded-full hover:bg-[#EDF5EE]">Message</button>}
                          {cs.linkedinStatus==="ignored" && <span className="text-gray-400 text-sm">Request not accepted</span>}
                          <button onClick={() => { setEmailCompose({emp:plProfile, company}); setEmailDraft({subject:"",body:""}); setTab("email"); }} className="bg-white border border-[#D4CFC4] text-[#1A3A2A] text-sm px-4 py-1.5 rounded-full hover:bg-[#F2EFE8]">Email</button>
                        </div>
                      </div>
                      {plProfile.bio && <div className="mt-3 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">{plProfile.bio}</div>}
                    </div>
                  </div>
                  {plProfile.posts?.length > 0 && (
                    <div>
                      <div className="font-semibold text-gray-700 mb-3">Recent Activity</div>
                      {plProfile.posts.map((post, i) => (
                        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 mb-3 text-sm text-gray-700 leading-relaxed">{post}</div>
                      ))}
                    </div>
                  )}
                  {plProfile.posts?.length === 0 && <div className="text-center py-8 text-gray-400 text-sm">No recent activity.</div>}
                </div>
              );
            })()}

            {/* MESSAGES */}
            {plView === "messages" && (
              <div>
                <h2 className="font-bold text-gray-900 mb-4">Messages</h2>
                {connections.length === 0 ? (
                  <div className="text-center py-12 text-gray-400"><div className="text-4xl mb-3">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¬</div><div>No connections yet. Connect with people to message them.</div></div>
                ) : (
                  <div className="flex gap-4 h-96">
                    <div className="w-48 border border-gray-200 rounded-xl overflow-hidden bg-white">
                      {connections.map(emp => {
                        const cs = state[emp.id];
                        const hasMsg = cs.linkedinMsgs.length > 0;
                        return (
                          <button key={emp.id} onClick={() => setPlMsgEmp(emp)} className={`w-full text-left px-3 py-2.5 border-b border-gray-100 flex items-center gap-2 transition-colors ${plMsgEmp?.id===emp.id ? "bg-blue-50" : "hover:bg-gray-50"}`}>
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${getAvatarColor(emp.id)}`}>{getInitials(emp)}</div>
                            <div><div className="text-xs font-medium text-gray-800">{emp.first}</div><div className="text-xs text-gray-400 truncate w-24">{hasMsg ? cs.linkedinMsgs[cs.linkedinMsgs.length-1].text.slice(0,20)+"..." : "No messages"}</div></div>
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex-1 border border-gray-200 rounded-xl bg-white flex flex-col overflow-hidden">
                      {!plMsgEmp ? <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">Select a connection to message</div> : (
                        <>
                          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ${getAvatarColor(plMsgEmp.id)}`}>{getInitials(plMsgEmp)}</div>
                            <div><div className="font-medium text-gray-800 text-sm">{plMsgEmp.first} {plMsgEmp.last}</div><div className="text-gray-400 text-xs">{plMsgEmp.title}</div></div>
                          </div>
                          <div className="flex-1 p-3 space-y-2 overflow-y-auto">
                            {state[plMsgEmp.id]?.linkedinMsgs.length === 0 && <div className="text-center text-gray-400 text-xs mt-4">Send your first message to {plMsgEmp.first}</div>}
                            {state[plMsgEmp.id]?.linkedinMsgs.map((msg, i) => (
                              <div key={i} className={`p-2 rounded-lg text-xs max-w-xs leading-relaxed ${msg.from==="rep" ? "bg-[#1A3A2A] text-white ml-auto text-right" : "bg-[#EDEAE2] text-gray-800"}`}>{msg.text}</div>
                            ))}
                          </div>
                          <div className="p-3 border-t border-gray-100 flex gap-2">
                            <input value={plMsgDraft} onChange={e => setPlMsgDraft(e.target.value)} onKeyDown={e => { if(e.key==="Enter" && plMsgDraft.trim()) { sendLinkedinMsg(plMsgEmp, plMsgDraft); setPlMsgDraft(""); }}} placeholder={`Message ${plMsgEmp.first}...`} className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#1A3A2A]"/>
                            <button onClick={() => { if(plMsgDraft.trim()) { sendLinkedinMsg(plMsgEmp, plMsgDraft); setPlMsgDraft(""); }}} className="bg-[#1A3A2A] hover:bg-[#2A5A3A] text-white text-xs px-3 py-1.5 rounded-lg">Send</button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ */}
      {/* SCORECARD TAB                              */}
      {/* ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ */}
      {tab === "score" && (() => {
        const g = calcGrade();
        const emailReplyRate = emailsSent > 0 ? Math.round((emailsReplied / emailsSent) * 100) : 0;
        const stats = [
          { label: "Meetings Booked", value: `${meetingsBooked} / ${MEETING_GOAL}`, sub: meetingsBooked >= MEETING_GOAL ? "Goal reached! ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ" : `${MEETING_GOAL - meetingsBooked} more to hit target`, highlight: meetingsBooked >= MEETING_GOAL },
          { label: "Emails Sent", value: emailsSent, sub: `${emailsReplied} replied ÃÂÃÂÃÂÃÂ· ${emailReplyRate}% reply rate`, highlight: false },
          { label: "ProLink Connections", value: connections.length, sub: `${pendingConnections} still pending`, highlight: false },
          { label: "Accounts Touched", value: `${accountsTouched} / 20`, sub: "Accounts with at least 1 touchpoint", highlight: false },
          { label: "Simulation Day", value: `${Math.min(simDay, SIM_LENGTH)} / ${SIM_LENGTH}`, sub: simComplete ? "Simulation complete" : `${SIM_LENGTH - simDay} days remaining`, highlight: simComplete },
          { label: "Meetings Declined", value: allEmps.filter(e => state[e.id]?.meetingStatus === "declined").length, sub: "Rejections are part of the game", highlight: false },
        ];
        return (
          <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Your Scorecard</h1>
            <p className="text-[#4A6A4A] text-sm mb-6">Track your performance across the 30-day simulation.</p>
            {/* Grade card */}
            <div className={`rounded-2xl border-2 p-6 mb-6 flex items-center gap-6 ${g.bg}`}>
              <div className={`text-7xl font-black ${g.color}`}>{g.grade}</div>
              <div>
                <div className={`text-xl font-bold ${g.color}`}>{g.label}</div>
                <div className="text-gray-600 text-sm mt-1">Based on meetings booked, email replies, connections, and account coverage.</div>
                <div className="mt-3 w-64 bg-white bg-opacity-60 rounded-full h-2">
                  <div className={`h-2 rounded-full ${g.grade === "A" ? "bg-green-500" : g.grade === "B" ? "bg-blue-500" : g.grade === "C" ? "bg-yellow-500" : g.grade === "D" ? "bg-orange-500" : "bg-red-500"}`}
                    style={{width: `${Math.min(meetingsBooked/MEETING_GOAL*50 + emailsReplied/10*20 + connections.length/10*15 + accountsTouched/15*15, 100)}%`}}></div>
                </div>
              </div>
            </div>
            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {stats.map((s, i) => (
                <div key={i} className={`bg-white rounded-xl border p-4 ${s.highlight ? "border-[#1A3A2A]" : "border-[#D4CFC4]"}`}>
                  <div className="text-xs text-[#4A6A4A] font-medium uppercase tracking-wide mb-1">{s.label}</div>
                  <div className={`text-3xl font-black mb-1 ${s.highlight ? "text-[#1A3A2A]" : "text-gray-900"}`}>{s.value}</div>
                  <div className="text-xs text-gray-400">{s.sub}</div>
                </div>
              ))}
            </div>
            {/* Meeting list */}
            <div className="bg-white rounded-xl border border-[#D4CFC4] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#D4CFC4] font-semibold text-gray-800 text-sm">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Meetings Booked ({meetingsBooked})</div>
              {meetingsBooked === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm">No meetings booked yet. Get a prospect to reply, then hit Request Meeting.</div>
              ) : allEmps.filter(e => state[e.id]?.meetingStatus === "booked").map(emp => {
                const company = getCompanyForEmp(emp.id);
                return (
                  <div key={emp.id} className="px-4 py-3 border-b border-[#EDE9E0] flex items-center gap-3 last:border-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${getAvatarColor(emp.id)}`}>{getInitials(emp)}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">{emp.first} {emp.last}</div>
                      <div className="text-gray-400 text-xs">{emp.title} ÃÂÃÂÃÂÃÂ· {company?.name}</div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${seniorityColors[emp.seniority]}`}>{seniorityLabels[emp.seniority]}</span>
                    <span className="text-green-600 text-xs font-medium">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Booked</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* 30-DAY SIMULATION COMPLETE OVERLAY */}
      {simComplete && tab !== "score" && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
            <div className="text-5xl mb-3">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ</div>
            <h2 className="text-2xl font-black text-gray-900 mb-1">Simulation Complete</h2>
            <p className="text-gray-500 text-sm mb-5">30 days done. Time to see how you performed.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setTab("score")} className="bg-[#1A3A2A] hover:bg-[#2A5A3A] text-white px-6 py-2.5 rounded-xl font-semibold text-sm">View My Scorecard</button>
              <button onClick={() => { setState(initState()); setSimDay(1); setTab("crm"); setCrmView("accounts"); }} className="border border-[#D4CFC4] text-gray-600 hover:bg-[#F2EFE8] px-6 py-2.5 rounded-xl font-semibold text-sm">Restart Simulation</button>
            </div>
          </div>
        </div>
      )}

      {/* ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ */}
      {/* SETTINGS MODAL */}
      {/* ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ */}
      {callModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1A2A20] rounded-3xl shadow-2xl w-80 overflow-hidden">
            {/* Header */}
            <div className="px-6 pt-8 pb-4 text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3 ${getAvatarColor(callModal.id)}`}>{getInitials(callModal)}</div>
              <div className="text-white font-bold text-lg">{callModal.first} {callModal.last}</div>
              <div className="text-gray-400 text-sm">{callModal.title}</div>
              <div className="text-gray-500 text-xs mt-0.5 font-mono">{getPhone(callModal)}</div>
            </div>

            {/* Status area */}
            <div className="px-6 py-4 text-center min-h-28">
              {callPhase === "dialing" && (
                <div>
                  <div className="flex justify-center gap-2 mb-4">
                    {[0,1,2].map(i => (
                      <div key={i} className="w-3 h-3 rounded-full bg-emerald-400" style={{animation:`pulse 1.2s ease-in-out ${i*0.3}s infinite`}}></div>
                    ))}
                  </div>
                  <div className="text-emerald-400 text-sm font-medium">Dialling...</div>
                  <div className="text-gray-500 text-xs mt-1">{getPhone(callModal)}</div>
                </div>
              )}
              {callPhase === "outcome" && callOutcome === "connected" && (
                <div>
                  <div className="text-emerald-400 text-sm font-semibold mb-2">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Connected</div>
                  <div className="bg-[#0F1F15] rounded-xl p-3 text-left">
                    <div className="text-gray-400 text-xs mb-1">{callModal.first} says:</div>
                    <div className="text-white text-sm leading-relaxed">"{callLine}"</div>                    {apiKey && callLine && (                      <button onClick={() => generateAiVoice(callModal, callLine)} disabled={aiVoiceLoading} className="mt-3 flex items-center gap-2 mx-auto bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white text-xs px-4 py-2 rounded-full transition-colors">                        {aiVoiceLoading ? "ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Generating..." : "ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Hear AI Voice"}</button>)}
                  </div>
                </div>
              )}
              {callPhase === "outcome" && callOutcome === "gatekeeper" && (
                <div>
                  <div className="text-orange-400 text-sm font-semibold mb-2">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ§ Gatekeeper</div>
                  <div className="bg-[#0F1F15] rounded-xl p-3 text-left">
                    <div className="text-gray-400 text-xs mb-1">Reception says:</div>
                    <div className="text-white text-sm leading-relaxed">"{callLine}"</div>
                  </div>
                </div>
              )}
              {callPhase === "outcome" && callOutcome === "voicemail" && (
                <div>
                  <div className="text-yellow-400 text-sm font-semibold mb-2">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¨ Voicemail</div>
                  <div className="bg-[#0F1F15] rounded-xl p-3 text-left">
                    <div className="text-gray-400 text-xs mb-1">Voicemail:</div>
                    <div className="text-white text-sm leading-relaxed italic">"{callLine}"</div>                    {apiKey && callLine && (                      <button onClick={() => generateAiVoice(callModal, callLine)} disabled={aiVoiceLoading} className="mt-3 flex items-center gap-2 mx-auto bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white text-xs px-4 py-2 rounded-full transition-colors">{aiVoiceLoading ? "ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Generating..." : "ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Hear AI Voice"}</button>)}
                  </div>
                </div>
              )}
              {callPhase === "outcome" && callOutcome === "no-answer" && (
                <div>
                  <div className="text-gray-400 text-sm font-semibold mb-2">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂµ No Answer</div>
                  <div className="text-gray-500 text-xs">The call rang out. Try again later or send a follow-up email.</div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="px-6 pb-8 flex justify-center gap-6">
              {callPhase === "dialing" && (
                <button onClick={endCall} className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-2xl transition-colors">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂµ</button>
              )}
              {callPhase === "outcome" && (
                <>
                  <button onClick={endCall} className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-2xl transition-colors">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂµ</button>
                  {(callOutcome === "connected" || callOutcome === "voicemail") && (
                    <button onClick={() => { endCall(); setEmailCompose({emp:callModal, company:getCompanyForEmp(callModal.id)}); setEmailDraft({subject:"Following up on our call", body:""}); }} className="w-14 h-14 rounded-full bg-[#1A3A2A] hover:bg-[#2A5A3A] border border-emerald-700 flex items-center justify-center text-2xl transition-colors">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ</button>
                  )}
                </>
              )}
            </div>
          </div>
          <style>{`@keyframes pulse { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1.2)} }`}</style>
        </div>
      )}

      {/* ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ */}
      {/* EMAIL COMPOSE MODAL                        */}
      {/* ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ */}
      {emailCompose && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="px-4 py-3 bg-[#1A3A2A] rounded-t-2xl flex items-center justify-between">
              <span className="text-white text-sm font-medium">New Email</span>
              <button onClick={() => setEmailCompose(null)} className="text-gray-400 hover:text-white text-lg">ÃÂÃÂÃÂÃÂ</button>
            </div>
            <div className="p-4">
              {emailCompose.emp ? (
                <div className="text-sm text-gray-700 mb-3 bg-[#F2EFE8] rounded-lg px-3 py-2">
                  <span className="text-gray-400">To: </span><span className="font-medium">{emailCompose.emp.first} {emailCompose.emp.last}</span>
                  <span className="text-gray-400 text-xs ml-2">&lt;{getEmail(emailCompose.emp, emailCompose.company)}&gt;</span>
                </div>
              ) : (
                <input placeholder="To: email address..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:border-[#1A3A2A]"/>
              )}
              <input value={emailDraft.subject} onChange={e => setEmailDraft(d => ({...d, subject:e.target.value}))} placeholder="Subject line..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:border-[#1A3A2A]"/>
              <textarea value={emailDraft.body} onChange={e => setEmailDraft(d => ({...d, body:e.target.value}))} placeholder={emailCompose.emp ? `Write your email to ${emailCompose.emp.first}...\n\nTip: ${emailCompose.emp?.seniority==="c-suite"||emailCompose.emp?.seniority==="vp" ? "Keep it to 3 lines for senior buyers. Lead with their pain, not your product." : "Be specific about why you're reaching out to them specifically."}` : "Write your email..."} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm min-h-32 resize-none focus:outline-none focus:border-[#1A3A2A] mb-3"/>
              {emailCompose.emp && (
                <div className="text-xs text-gray-400 mb-3">
                  {emailCompose.emp.seniority === "c-suite" && "ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ ÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ C-Suite: Takes ~5 days to respond. May not respond at all."}
                  {emailCompose.emp.seniority === "vp" && "ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ VP level: Usually responds within 3 days if the email earns it."}
                  {emailCompose.emp.seniority === "director" && "ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Director: Usually responds within 2 days."}
                  {emailCompose.emp.seniority === "manager" && "ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Manager: Likely to respond within 1 day."}
                  {(emailCompose.emp.seniority === "mid" || emailCompose.emp.seniority === "junior") && "ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Will respond quickly ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ but may redirect you upward."}
                </div>
              )}
              <div className="flex justify-end gap-2">
                <button onClick={() => setEmailCompose(null)} className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-800">Cancel</button>
                <button onClick={() => { if(emailCompose.emp && emailDraft.body.trim()) { sendEmail(emailCompose.emp, emailCompose.company, emailDraft.subject, emailDraft.body); setEmailCompose(null); }}} className="bg-[#1A3A2A] hover:bg-[#2A5A3A] text-white px-4 py-1.5 rounded-lg text-sm font-medium">Send</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
