import React, { useState, useRef } from "react";
import Vapi from '@vapi-ai/web';
import { getLegalStakeholder, getProcurementStakeholder } from './stakeholders';

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
  { id:1,  name:"Nexaflow",         industry:"SaaS",           size:"Enterprise", employees:42, domain:"nexaflow.io",         description:"Cloud workflow automation for enterprise ops teams",        location:"Dublin",         dealValue:75000  },
  { id:2,  name:"CloudPulse",       industry:"SaaS",           size:"Mid-Market", employees:25, domain:"cloudpulse.io",       description:"Real-time analytics and monitoring SaaS",                  location:"London",         dealValue:35000  },
  { id:3,  name:"Stackly",          industry:"SaaS",           size:"SMB",        employees:14, domain:"stackly.dev",         description:"Developer productivity and code review tooling",           location:"Dublin",         dealValue:20000  },
  { id:4,  name:"Velodata",         industry:"SaaS",           size:"Mid-Market", employees:28, domain:"velodata.com",        description:"Data pipeline and ETL automation platform",                location:"London",         dealValue:40000  },
  { id:5,  name:"ShieldOps",        industry:"Cyber Security", size:"Enterprise", employees:45, domain:"shieldops.io",        description:"Next-gen endpoint security and threat response",           location:"Dublin",         dealValue:80000  },
  { id:6,  name:"CipherEdge",       industry:"Cyber Security", size:"Mid-Market", employees:22, domain:"cipheredge.com",      description:"Zero-trust network access and SASE platform",             location:"London",         dealValue:30000  },
  { id:7,  name:"ThreatNest",       industry:"Cyber Security", size:"SMB",        employees:16, domain:"threatnest.io",       description:"SMB-focused vulnerability scanning and alerts",            location:"Dublin",         dealValue:25000  },
  { id:8,  name:"Fortivex",         industry:"Cyber Security", size:"Enterprise", employees:50, domain:"fortivex.com",        description:"Enterprise SOC-as-a-service and SIEM platform",           location:"London",         dealValue:100000 },
  { id:9,  name:"IronCore Systems", industry:"Manufacturing",  size:"Enterprise", employees:48, domain:"ironcore.systems",    description:"Industrial IoT and smart factory automation",              location:"Dublin",         dealValue:90000  },
  { id:10, name:"PrecisionWorks",   industry:"Manufacturing",  size:"Mid-Market", employees:30, domain:"precisionworks.ie",   description:"CNC machining and precision components for aerospace",     location:"Cork",           dealValue:45000  },
  { id:11, name:"NovaMach",         industry:"Manufacturing",  size:"SMB",        employees:15, domain:"novamach.ie",         description:"Custom fabrication and tooling for local industry",        location:"Limerick",       dealValue:22000  },
  { id:12, name:"FluxTech",         industry:"Manufacturing",  size:"Mid-Market", employees:35, domain:"fluxtech.ie",         description:"Electronics manufacturing and PCB assembly",               location:"Galway",         dealValue:55000  },
  { id:13, name:"CapitalBridge",    industry:"FinTech",        size:"Enterprise", employees:44, domain:"capitalbridge.io",    description:"Institutional trading and capital markets infrastructure",  location:"Dublin",         dealValue:85000  },
  { id:14, name:"Moneta Labs",      industry:"FinTech",        size:"Mid-Market", employees:20, domain:"monetalabs.io",       description:"Embedded finance and BaaS APIs for fintechs",             location:"London",         dealValue:28000  },
  { id:15, name:"PayStream",        industry:"FinTech",        size:"SMB",        employees:18, domain:"paystream.io",        description:"Payment orchestration for SMB e-commerce",                location:"Dublin",         dealValue:28000  },
  { id:16, name:"FinAxis Group",    industry:"FinTech",        size:"Enterprise", employees:50, domain:"finaxis.io",          description:"Risk analytics and regulatory reporting for banks",        location:"London",         dealValue:95000  },
  { id:17, name:"GreenLeaf Energy", industry:"CleanTech",      size:"Mid-Market", employees:24, domain:"greenleaf.energy",    description:"Renewable energy management and carbon tracking SaaS",     location:"Cork",           dealValue:32000  },
  { id:18, name:"MedPoint Health",  industry:"HealthTech",     size:"SMB",        employees:17, domain:"medpoint.health",     description:"Digital health records and patient engagement platform",   location:"Dublin",         dealValue:20000  },
  { id:19, name:"RetailEdge",       industry:"RetailTech",     size:"Enterprise", employees:38, domain:"retailedge.io",       description:"Omnichannel retail operations and inventory intelligence",  location:"London",         dealValue:65000  },
  { id:20, name:"BuildRight",       industry:"PropTech",       size:"Mid-Market", employees:22, domain:"buildright.ie",       description:"Construction project management and compliance SaaS",      location:"Dublin",         dealValue:30000  },
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
const industryColors = { "SaaS":"bg-sky-100 text-sky-700","Cyber Security":"bg-red-100 text-red-700","Manufacturing":"bg-orange-100 text-orange-700","Fintech":"bg-yellow-100 text-[#FBBF24]","Energy":"bg-green-100 text-green-700","Healthcare":"bg-pink-100 text-pink-700","Retail Tech":"bg-indigo-100 text-indigo-700","Construction":"bg-amber-100 text-amber-700" };
const seniorityColors = { "c-suite":"bg-red-100 text-red-700","vp":"bg-orange-100 text-orange-700","director":"bg-yellow-100 text-[#FBBF24]","manager":"bg-blue-100 text-blue-700","mid":"bg-gray-100 text-[#7A9CC4]","junior":"bg-green-100 text-green-700" };
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
async function supaSignIn(email,password){const r=await fetch(SUPABASE_URL+'/auth/v1/authTok?grant_type=password',{method:'POST',headers:{'Content-Type':'application/json','apikey':SUPABASE_KEY},body:JSON.stringify({email,password})});return r.json();}
async function supaSignOut(tok){await fetch(SUPABASE_URL+'/auth/v1/logout',{method:'POST',headers:{Authorization:'Bearer '+tok,'apikey':SUPABASE_KEY}});}
async function fetchProduct(tok,uid){const r=await fetch(SUPABASE_URL+'/rest/v1/user_products?user_id=eq.'+uid+'&limit=1',{headers:{Authorization:'Bearer '+tok,'apikey':SUPABASE_KEY}});const d=await r.json();return d[0]||null;}
async function upsertProduct(tok,uid,form){await fetch(SUPABASE_URL+'/rest/v1/user_products',{method:'POST',headers:{Authorization:'Bearer '+tok,'apikey':SUPABASE_KEY,'Content-Type':'application/json',Prefer:'resolution=merge-duplicates'},body:JSON.stringify({user_id:uid,product_name:form.name,product_description:form.desc,icp:form.icp,value_props:form.vps.split('\n').filter(Boolean),objections:form.objs.split('\n').filter(Boolean)})});}
async function upsertDeal(tok,uid,personaId,personaName,companyId,companyName){const r=await fetch(SUPABASE_URL+'/rest/v1/deals',{method:'POST',headers:{Authorization:'Bearer '+tok,apikey:SUPABASE_KEY,'Content-Type':'application/json',Prefer:'resolution=merge-duplicates,return=representation'},body:JSON.stringify({user_id:uid,persona_id:personaId,persona_name:personaName,company_id:companyId,company_name:companyName,updated_at:new Date().toISOString()})});const d=await r.json();return Array.isArray(d)?d[0]:d;}
async function fetchCallLogs(tok,dealId){const r=await fetch(SUPABASE_URL+'/rest/v1/call_logs?deal_id=eq.'+dealId+'&order=called_at.desc&limit=5',{headers:{Authorization:'Bearer '+tok,apikey:SUPABASE_KEY}});return r.json();}
async function saveCallLog(tok,uid,dealId,personaId,log){await fetch(SUPABASE_URL+'/rest/v1/call_logs',{method:'POST',headers:{Authorization:'Bearer '+tok,apikey:SUPABASE_KEY,'Content-Type':'application/json'},body:JSON.stringify({deal_id:dealId,user_id:uid,persona_id:personaId,...log})});await fetch(SUPABASE_URL+'/rest/v1/deals?id=eq.'+dealId,{method:'PATCH',headers:{Authorization:'Bearer '+tok,apikey:SUPABASE_KEY,'Content-Type':'application/json'},body:JSON.stringify({interest_score:log.interest_score_after,updated_at:new Date().toISOString()})});}
async function fetchAllDeals(tok,uid){const r=await fetch(SUPABASE_URL+'/rest/v1/deals?user_id=eq.'+uid+'&order=updated_at.desc',{headers:{Authorization:'Bearer '+tok,apikey:SUPABASE_KEY}});return r.json();}
async function moveDealStage(tok,dealId,stage){await fetch(SUPABASE_URL+'/rest/v1/deals?id=eq.'+dealId,{method:'PATCH',headers:{Authorization:'Bearer '+tok,apikey:SUPABASE_KEY,'Content-Type':'application/json'},body:JSON.stringify({stage,updated_at:new Date().toISOString()})});}
function scoreColor(s){return s>=8?'#16a34a':s>=5?'#d97706':'#dc2626';}

async function bookCall(tok,uid,pId,pName,cId,cName,scheduledAt,callType,discoveryData,dealId){const r=await fetch(SUPABASE_URL+'/rest/v1/scheduled_calls',{method:'POST',headers:{Authorization:'Bearer '+tok,apikey:SUPABASE_KEY,'Content-Type':'application/json',Prefer:'return=representation'},body:JSON.stringify({user_id:uid,persona_id:pId,persona_name:pName,company_id:cId,company_name:cName,scheduled_at:scheduledAt,call_type:callType,discovery_data:discoveryData,deal_id:dealId||null,booked_by:'rep'})});const d=await r.json();return Array.isArray(d)?d[0]:d;}
async function fetchScheduledCalls(tok,uid){const r=await fetch(SUPABASE_URL+'/rest/v1/scheduled_calls?user_id=eq.'+uid+'&order=scheduled_at.asc',{headers:{Authorization:'Bearer '+tok,apikey:SUPABASE_KEY}});return r.json();}
async function updateCallStatus(tok,callId,status){await fetch(SUPABASE_URL+'/rest/v1/scheduled_calls?id=eq.'+callId,{method:'PATCH',headers:{Authorization:'Bearer '+tok,apikey:SUPABASE_KEY,'Content-Type':'application/json'},body:JSON.stringify({status})});}
async function fetchPersonaMessages(tok,uid){const r=await fetch(SUPABASE_URL+'/rest/v1/persona_messages?user_id=eq.'+uid+'&order=created_at.desc',{headers:{Authorization:'Bearer '+tok,apikey:SUPABASE_KEY}});return r.json();}
async function markMsgRead(tok,msgId){await fetch(SUPABASE_URL+'/rest/v1/persona_messages?id=eq.'+msgId,{method:'PATCH',headers:{Authorization:'Bearer '+tok,apikey:SUPABASE_KEY,'Content-Type':'application/json'},body:JSON.stringify({is_read:true})});}
async function savePersonaMsg(tok,uid,pId,pName,cName,subj,bdy,msgType,wantsCall,callType){await fetch(SUPABASE_URL+'/rest/v1/persona_messages',{method:'POST',headers:{Authorization:'Bearer '+tok,apikey:SUPABASE_KEY,'Content-Type':'application/json'},body:JSON.stringify({user_id:uid,persona_id:pId,persona_name:pName,company_name:cName,subject:subj,body:bdy,msg_type:msgType,wants_call:wantsCall,call_type:callType})});}
function generateDiscoveryData(){const p=a=>a[Math.floor(Math.random()*a.length)];return{budget:p(['$25K-$50K','$50K-$100K','$100K-$250K','$250K-$500K','Over $500K']),authority:p(['Economic Buyer','Champion','Technical Evaluator','Gatekeeper','End User']),timeline:p(['End of Q2','End of Q3','End of Q4','H1 next year','No fixed deadline']),decision_process:p(['Sole decision maker','Needs VP sign-off','3-vendor shortlist + IT review','Committee decision','Board approval required']),pain:p(['Manual reporting costs the team 10+ hrs a week','Our current tool breaks at critical moments','Outgrew legacy system and it cannot scale','We lose deals because our process is too slow','No single source of truth across teams']),competition:p(['Unhappy with current vendor on pricing','Running everything in spreadsheets','Using an outdated on-prem system','Evaluating two other vendors alongside you','No current solution - building from scratch']),interest:Math.floor(Math.random()*4)+5};}
function genPersonaMsg(pName,cName,product,idx){const msgs=[{subject:'Quick question about '+product,bdy:'Hi,\n\nI came across '+product+' and it looks interesting for what we are solving at '+cName+'. Could you send more detail on pricing and what onboarding looks like?\n\nLooking forward to hearing from you,\n'+pName,msg_type:'info_request',wants_call:false,call_type:'discovery'},{subject:'Interested in a demo of '+product,bdy:'Hi,\n\nI have been evaluating solutions and '+product+' keeps coming up. I would love to see a 30-minute demo - specifically how it handles our core use case.\n\nAre you available this week or next?\n\nBest,\n'+pName,msg_type:'demo_request',wants_call:true,call_type:'demo'},{subject:'Can we set up a discovery call?',bdy:'Hi,\n\nWe are evaluating vendors at '+cName+' and I want to understand if '+product+' could be a fit before we go deeper. Could we find 30 minutes for a discovery call?\n\nThanks,\n'+pName,msg_type:'call_request',wants_call:true,call_type:'discovery'},{subject:product+' evaluation - a few questions',bdy:'Hi,\n\nMy team flagged '+product+' as worth exploring. I am the technical evaluator at '+cName+'. What does your integration story look like and do you have case studies from similar companies?\n\n'+pName,msg_type:'info_request',wants_call:false,call_type:'discovery'},{subject:'Revisiting '+product,bdy:'Hi,\n\nWe looked at '+product+' a while back but timing was not right. We are in a better position now and wanted to reconnect. Would you be open to a quick discovery call?\n\nBest,\n'+pName,msg_type:'call_request',wants_call:true,call_type:'discovery'}];const m=msgs[idx%msgs.length];return{...m,body:m.bdy,persona_name:pName,company_name:cName};}


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
  const [deals,setDeals]=React.useState([{id:'demo-001',persona_name:'Conor Murphy',company_name:'Nexaflow',stage:'Proposal',updated_at:new Date().toISOString()},{id:'demo-002',persona_name:'David Flynn',company_name:'Nexaflow',stage:'Discovery',updated_at:new Date().toISOString()}]);
  const [showPipeline,setShowPipeline]=React.useState(false);
  const [showPostCall,setShowPostCall]=React.useState(false);
  const [postCallSummary,setPostCallSummary]=React.useState('');
  const [postCallNotes,setPostCallNotes]=React.useState('');
  const [postCallScore,setPostCallScore]=React.useState(5);
  const [postCallObjs,setPostCallObjs]=React.useState('');

  const [scheduledCalls,setScheduledCalls]=React.useState([]);
  const [personaMessages,setPersonaMessages]=React.useState([]);
  const [showBookingModal,setShowBookingModal]=React.useState(false);
  const [bookingPersona,setBookingPersona]=React.useState(null);
  const [bookingCallType,setBookingCallType]=React.useState('discovery');
  const [bookingDateTime,setBookingDateTime]=React.useState('');
  const [showCallSession,setShowCallSession]=React.useState(false);
  const [activeSession,setActiveSession]=React.useState(null);
  const [sessionTimer,setSessionTimer]=React.useState(1800);
  const [sessionActive,setSessionActive]=React.useState(false);
  const [isPersonaSpeaking,setIsPersonaSpeaking] = React.useState(false);
  const [midCallBooking,setMidCallBooking]=React.useState(null);
  const [expandedMsg,setExpandedMsg]=React.useState(null);
const [demoObjections,setDemoObjections]=React.useState([]);
const [handledObjections,setHandledObjections]=React.useState(new Set());

  React.useEffect(()=>{
    try{const s=JSON.parse(localStorage.getItem('rp_sess')||'{}');
      if(s.access_token&&s.user){fetchProduct(s.access_token,s.user.id).then(p=>{if(p){setProduct(p);setProdForm({name:p.product_name||'',desc:p.product_description||'',icp:p.icp||'',vps:(p.value_props||[]).join('\n'),objs:(p.objections||[]).join('\n')});}else setShowProdSetup(true);});}
    }catch(e){}
  },[]);

  const handleLogin=async()=>{setAuthErr('');setAuthBusy(true);const res=await supaSignIn(authEmail,authPwd);if(res.error){setAuthErr(res.error.message||'Login failed');setAuthBusy(false);return;}localStorage.setItem('rp_sess',JSON.stringify({access_token:res.access_token,user:res.user}));setUser(res.user);setAuthTok(res.access_token);const p=await fetchProduct(res.access_token,res.user.id);if(p){setProduct(p);setProdForm({name:p.product_name||'',desc:p.product_description||'',icp:p.icp||'',vps:(p.value_props||[]).join('\n'),objs:(p.objections||[]).join('\n')});}else setShowProdSetup(true);setAuthBusy(false);};
  const handleSignup=async()=>{setAuthErr('');setAuthBusy(true);const r1=await supaSignUp(authEmail,authPwd);if(r1.error){setAuthErr(r1.error.message||'Signup failed');setAuthBusy(false);return;}const r2=await supaSignIn(authEmail,authPwd);if(r2.error){setAuthErr('Account created! Please log in.');setAuthView('login');setAuthBusy(false);return;}localStorage.setItem('rp_sess',JSON.stringify({access_token:r2.access_token,user:r2.user}));setUser(r2.user);setAuthTok(r2.access_token);setShowProdSetup(true);setAuthBusy(false);};
  const handleLogout=async()=>{if(authTok)await supaSignOut(authTok);localStorage.removeItem('rp_sess');setUser(null);setAuthTok(null);setProduct(null);};
  const handleSaveProd=async()=>{if(!prodForm.name.trim())return;setProdSaving(true);await upsertProduct(authTok,user.id,prodForm);const p=await fetchProduct(authTok,user.id);setProduct(p);setShowProdSetup(false);setProdSaving(false);}
  React.useEffect(()=>{if(authTok&&user){fetchAllDeals(authTok,user.id).then(d=>setDeals(Array.isArray(d)?d:[])).catch(()=>{});}},[authTok,user?.id]);
  React.useEffect(()=>{if(tab==='pipeline'){setShowPipeline(true);}},[tab]);
  React.useEffect(()=>{try{const vi=getVapiInstance();vi.on('message',(msg)=>{if(msg.type==='transcript'&&msg.transcriptType==='final'){if(!window._callTranscript)window._callTranscript=[];window._callTranscript.push({role:msg.role,text:msg.transcript});}});vi.on('call-end',()=>{if(window._activeDealId){const t=window._callTranscript||[];if(window._activeDealId){saveCallLog(authTok,user&&user.id,window._activeDealId,window._activePersonaId||'',window._callTranscript).catch(()=>{});}const objKw=['expensive','price','cost','budget','already have','not the right time','not interested','competitor'];const found=objKw.filter(kw=>t.some(m=>m.text&&m.text.toLowerCase().includes(kw)));const rep=t.filter(m=>m.role==='user').length;const pros=t.filter(m=>m.role==='assistant').length;const nm=window._activePersonaName||'prospect';const co=window._activeCompanyName||'';const summary=rep+'-turn call with '+nm+(co?' at '+co:'')+'. Rep '+rep+' turns, prospect '+pros+' turns.'+(found.length?' Discussed: '+found.join(', '):' No major objections.');setPostCallSummary(summary);setPostCallObjs(found.join('\n'));setShowPostCall(true);}});}catch(e){}},[]);
  const handleStartCallWithDeal=async(emp,company)=>{if(!authTok||!user){startCall(emp,company,[]);return;}try{window._callTranscript=[];window._activePersonaName=(emp.first||'')+' '+(emp.last||'');window._activeCompanyName=company.name||'';window._activePersonaId=emp.id||'';const deal=await upsertDeal(authTok,user.id,emp.id,(emp.first||'')+' '+(emp.last||''),company.id||'',company.name||'');window._activeDealId=deal?.id||null;const logs=deal?await fetchCallLogs(authTok,deal.id):[];startCall(emp,company,Array.isArray(logs)?logs:[]);}catch(e){startCall(emp,company,[]);}};
  const handlePostCallSave=async()=>{if(!window._activeDealId||!authTok||!user)return;try{await saveCallLog(authTok,user.id,window._activeDealId,window._activePersonaId||'',{transcript:window._callTranscript||[],ai_summary:postCallSummary,rep_notes:postCallNotes,objections:postCallObjs.split('\n').filter(Boolean),interest_score_before:5,interest_score_after:postCallScore});const updated=await fetchAllDeals(authTok,user.id);setDeals(Array.isArray(updated)?updated:[]);}catch(e){}setShowPostCall(false);setPostCallSummary('');setPostCallNotes('');setPostCallScore(5);setPostCallObjs('');window._activeDealId=null;};
  const handleMoveDeal=async(dealId,newStage)=>{if(!authTok)return;await moveDealStage(authTok,dealId,newStage);setDeals(prev=>prev.map(d=>d.id===dealId?{...d,stage:newStage,updated_at:new Date().toISOString()}:d));};

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
  const [agentName,setAgentName] = React.useState('');
  const [agentPrompt,setAgentPrompt] = React.useState('');
  const [labRunning,setLabRunning] = React.useState(false);
  const [labConversation,setLabConversation] = React.useState([]);
  const [labScore,setLabScore] = React.useState(null);
  const [labTarget,setLabTarget] = React.useState(null);
  const [labTurns,setLabTurns] = React.useState(8);
  const [labResults,setLabResults] = React.useState([]);
  const [labMode,setLabMode] = React.useState('pipeline');
  const [pipelineLog,setPipelineLog] = React.useState([]);
  const [pipelineStage,setPipelineStage] = React.useState(null);
  const [pipelineScore,setPipelineScore] = React.useState(null);
  const [pipelineRunning,setPipelineRunning] = React.useState(false);

  const vapiRef = useRef(null);
  const [activeCallId, setActiveCallId] = useState(null);
  const [callStatus, setCallStatus] = useState('idle');
  const [proposalState, setProposalState] = React.useState({});
  const [closeLoading, setCloseLoading] = React.useState(false);
  const industries = ["All","SaaS","Cyber Security","Manufacturing","Fintech","Energy","Healthcare","Retail Tech","Construction"];
  const allEmps = Object.entries(allEmployees).flatMap(([cId,emps])=>emps.map(e=>({...e,cId:parseInt(cId),cName:(companies.find(c=>c.id===parseInt(cId))||{name:''}).name})));

  function getVapiInstance() {
    if (!vapiRef.current) {
      const k = ['4405a0df','150e','41b2','ae24','f01d9a4c17ce'].join('-');
      vapiRef.current = new Vapi(k);
      vapiRef.current.on('call-start', () => setCallStatus('active'));
      vapiRef.current.on('call-end', () => { setActiveCallId(null); setCallStatus('idle'); });
      vapiRef.current.on('speech-start', () => setIsPersonaSpeaking(true));
      vapiRef.current.on('speech-end', () => setIsPersonaSpeaking(false));
      vapiRef.current.on('error', () => { setActiveCallId(null); setCallStatus('idle'); });
    }
    return vapiRef.current;
  }

  function selectVoice(firstName, seniority) {
    const fn = firstName.toLowerCase();
    const irish = new Set(['aoife','cian','fiona','siobhan','niamh','eoin','seamus','padraig','brigid','caoimhe','conor','declan','emer','grainne','kieran','muireann','nuala','oisin','roisin','saoirse','tadhg','sean','brendan','fintan','colm','liam','ciaran','rory','cathal','lorcan']);
    const female = new Set(['aoife','fiona','siobhan','niamh','brigid','caoimhe','emer','grainne','muireann','nuala','roisin','saoirse','emma','sarah','sophie','claire','rachel','laura','kate','anne','mary','lisa','helen','jane','julia','alice','olivia','grace','emily','charlotte','amy','hannah','leah','ava']);
    const isIrish = irish.has(fn);
    const isFemale = female.has(fn);
    // ElevenLabs voices ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ confirmed IDs from account
    if (seniority === 'c-suite') {
      if (isFemale) return { provider: '11labs', voiceId: 'XrExE9yKIg1WjnnlVkGX' }; // Matilda ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ professional, authoritative
      return { provider: '11labs', voiceId: 'pNInz6obpgDQGcFmaJgB' }; // Adam ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ dominant, firm
    }
    if (seniority === 'vp') {
      if (isFemale) return { provider: '11labs', voiceId: 'EXAVITQu4vr4xnSDxMaL' }; // Sarah ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ mature, confident
      return { provider: '11labs', voiceId: 'nPczCjzI2devNBz1zQrb' }; // Brian ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ deep, resonant
    }
    if (seniority === 'manager') {
      if (isFemale) return { provider: '11labs', voiceId: 'cgSgspJ2msm6clMCkdW9' }; // Jessica ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ warm, engaging
      return { provider: '11labs', voiceId: 'cjVigY5qzO86Huf0OWal' }; // Eric ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ smooth, trustworthy
    }
    // IC / default
    if (isFemale) return { provider: '11labs', voiceId: 'FGY2WhTYpPnrIDTdsKH5' }; // Laura ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ enthusiastic
    return { provider: '11labs', voiceId: 'bIHbv24MWmeRgasZH58o' }; // Will ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ relaxed, friendly
  }

    async function startCall(emp, company, callLogs=[]) {
    setActiveCallId(emp.id);
    setCallStatus('connecting');
    const vapi = getVapiInstance();
    const guides = {
      'c-suite': "You are a busy C-suite executive. You speak in short, direct sentences ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ never more than 2-3 at a time. You are deeply skeptical of cold outreach. You've heard hundreds of pitches and most waste your time. You only engage if something genuinely connects to a board-level priority. You don't ask polite questions ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ you ask sharp ones: What's the measurable ROI? Who else is using this? Why now? You push back hard on vague claims. If they say 'saves time' you say 'how much exactly, and how do you know?' You occasionally cut people off if they're rambling. You never get excited easily. If something interests you, you show it with a specific follow-up question, not enthusiasm.",
      'vp': "You are a VP-level executive with a full team and an existing stack you've invested in. You're open to new solutions but you're not desperate. You've been burned by vendors who overpromised before. You care about: will my team actually use this, what's the implementation cost, and does this integrate with what we already have. You ask practical questions and you push back on pricing ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ you'll say things like 'that seems steep for what it does' or 'we'd need to see this validated before committing budget'. You're polite but direct. You don't small-talk.",
      'manager': "You are a manager with real day-to-day problems but limited budget authority. You're genuinely interested in solutions that make your team's life easier ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ you're the one dealing with the mess every day. But you're cautious because you've had ideas shot down by leadership before. You ask things like 'how long does onboarding take' and 'would I need IT involved'. You want to look smart when you bring this upstairs. You warm up during the call if the pitch is relevant. You share specific pain points if asked the right questions.",
      'ic': "You are an individual contributor ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ smart, curious, direct. You don't have budget authority but you're often the person who finds tools and champions them internally. You're willing to talk but you'll quickly say if something isn't relevant to you. You speak casually. You ask honest questions. You sometimes say 'I'd have to run this by my manager' or 'honestly I'm not sure we'd get budget for this'. You're not hostile, just real."
    };
    const sysPrompt = 'You are ' + emp.first + ' ' + emp.last + ', ' + emp.title + ' at ' + (company?.name || 'your company') + '. ' + (emp.bio || '') + (emp.personality ? ' Personality: ' + emp.personality + '.' : '') + ' ' + (guides[emp.seniority] || guides.manager) + ' IMPORTANT: You are a real human on a live phone call ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ not an assistant, not a chatbot. Speak the way a real professional talks: use contractions, occasional filler words like uh or look or honestly, show impatience or mild curiosity depending on context. Keep every response to 1-3 SHORT sentences. Never use formal phrases like Certainly or Great question or Absolutely. Never be immediately enthusiastic or positive about a product. You were in the middle of something when this call came in. Sound like it.';
    
  const dealHistory=callLogs&&callLogs.length>0?'\n\n--- PREVIOUS INTERACTIONS ---\nYou have spoken with this rep before. Remember these naturally:\n'+callLogs.map((log,i)=>{const daysAgo=Math.round((Date.now()-new Date(log.called_at).getTime())/86400000);return 'Call '+(callLogs.length-i)+' ('+daysAgo+' days ago): '+(log.ai_summary||log.rep_notes||'No summary.')+(log.objections&&log.objections.length?' Objections: '+log.objections.join(', ')+'.':'');}).join('\n')+'\nYour current interest: '+(callLogs[0]?.interest_score_after||5)+'/10.':'';
  try {
      await vapi.start({ maxDuration: 1800,
        model: { provider: 'openai', model: 'gpt-4o', temperature: 0.9, maxTokens: 150, messages: [{ role: 'system', content: sysPrompt+(product?'\n\n--- PRODUCT BEING PITCHED ---\nProduct: '+product.product_name+'. '+(product.product_description||'')+(product.icp?'\nTarget customer: '+product.icp:'')+((product.value_props||[]).length?'\nValue props: '+product.value_props.join('; '):'')+((product.objections||[]).length?'\nExpect objections about: '+product.objections.join('; '):''):'') + dealHistory + (window._discoveryBlock||'') }] },
        voice: selectVoice(emp.first, emp.seniority),
        silenceTimeoutSeconds: 10,
        firstMessage: emp.seniority === 'c-suite' ? emp.first + '.' : emp.seniority === 'vp' ? emp.first + ', yeah.' : emp.seniority === 'junior' ? 'Hi, this is ' + emp.first + '.' : emp.first + ', hi.',
      });
    } catch(e) { console.error('[RepForge] Call failed:', e); setActiveCallId(null); setCallStatus('idle'); }
  }

  function endCall() {
    try { vapiRef.current?.stop(); } catch(e) {}
    setActiveCallId(null); setCallStatus('idle');
  }

  async function runAgentTest() {
    if (!apiKey || !agentPrompt.trim() || allEmps.length === 0) return;
    setLabRunning(true); setLabConversation([]); setLabScore(null);
    const target = allEmps[Math.floor(Math.random() * allEmps.length)];
    const co = companies.find(c => c.id === target.cId) || {name:'their company',industry:'tech'};
    setLabTarget(target);
    const guides = {'c-suite':'You are a busy C-suite exec. Be skeptical. Short sentences.','vp':'VP. Open to solutions, ask tough ROI questions.','manager':'Manager, real problems, limited budget.','ic':'IC Ã¢ÂÂ smart, direct, no budget.'};
    const prospectSys = `You are ${target.first} ${target.last}, ${target.title} at ${co.name}. ${guides[target.seniority]||guides['ic']} Industry: ${co.industry}. Have real challenges but don't reveal easily. 2-4 sentences per response. Answer good qualifying questions. Push back on pitches without discovery.`;
    const agentSys = agentPrompt.trim() + `\n\nProspect: ${target.first} ${target.last}, ${target.title} at ${co.name} (${co.industry}).`;
    const pH=[{role:'system',content:prospectSys}]; const aH=[{role:'system',content:agentSys}]; const cv=[];
    const gpt=async(msgs,tok=150)=>{const r=await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+apiKey},body:JSON.stringify({model:'gpt-4o',messages:msgs,max_tokens:tok,temperature:0.85})});return(await r.json()).choices?.[0]?.message?.content||'';};
    try{
      const op=await gpt(aH); cv.push({role:'agent',text:op}); setLabConversation([...cv]);
      aH.push({role:'assistant',content:op}); pH.push({role:'user',content:op});
      for(let t=0;t<labTurns-1;t++){
        const pr=await gpt(pH); cv.push({role:'prospect',text:pr,name:target.first}); setLabConversation([...cv]);
        pH.push({role:'assistant',content:pr}); aH.push({role:'user',content:pr});
        const ar=await gpt(aH); cv.push({role:'agent',text:ar}); setLabConversation([...cv]);
        aH.push({role:'assistant',content:ar}); pH.push({role:'user',content:ar});
      }
      const fp=await gpt(pH); cv.push({role:'prospect',text:fp,name:target.first}); setLabConversation([...cv]);
      const tx=cv.map(m=>(m.role==='agent'?'AGENT':target.first.toUpperCase())+': '+m.text).join('\n\n');
      const sp=`Score this AI sales agent cold call vs ${target.first} ${target.last}, ${target.title} at ${co.name}.\nTRANSCRIPT:\n${tx}\nJSON only (no markdown): {"meddic":0-10,"objections":0-10,"rapport":0-10,"nextStep":0-10,"overall":0-10,"summary":"1 sentence","strength":"1 sentence","weakness":"1 sentence","grade":"A/B/C/D/F"}`;
      const sr=await gpt([{role:'user',content:sp}],500);
      try{const m=sr.match(/\{[\s\S]*\}/);const sc=JSON.parse(m?m[0]:sr.replace(/```json|```/g,'').trim());setLabScore(sc);setLabResults(p=>[{agentName:agentName||'Unnamed',target:target.first+' '+target.last,company:co.name,grade:sc.grade,ts:new Date().toLocaleTimeString()},...p.slice(0,9)]);}
      catch(e){setLabScore({grade:'?',overall:0,meddic:0,objections:0,rapport:0,nextStep:0,summary:'Scoring failed',strength:'-',weakness:'-'});}
    }catch(e){console.error('Lab error',e);}
    setLabRunning(false);
  }
  async function runFullPipeline() {
    if (!apiKey || !agentPrompt.trim() || allEmps.length === 0) return;
    setPipelineRunning(true); setPipelineLog([]); setPipelineScore(null); setPipelineStage('email');
    const target = allEmps[Math.floor(Math.random() * allEmps.length)];
    const co = companies.find(c => c.id === target.cId) || {name:'Acme Corp',industry:'tech'};
    setLabTarget(target);
    const guides = {'c-suite':'Busy C-suite exec. Very skeptical, protective of time.','vp':'VP level. Open if ROI is clear. Asks tough ROI questions.','manager':'Manager with real pains, limited budget authority.','ic':'Smart IC. Direct. No budget influence.'};
    const prospectSys = "You are "+target.first+" "+target.last+", "+target.title+" at "+co.name+". "+(guides[target.seniority]||guides['ic'])+" Industry: "+co.industry+". You have real operational challenges but don't reveal them easily. React authentically. Keep responses 2-3 sentences.";
    const log = [];
    const addLog = (stage, role, content) => { log.push({stage,role,content}); setPipelineLog([...log]); };
    const gpt = async (msgs, tok) => {
      tok = tok||250;
      try {
        const r = await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+apiKey},body:JSON.stringify({model:'gpt-4o',messages:msgs,max_tokens:tok,temperature:0.8})});
        const d = await r.json(); return d.choices?.[0]?.message?.content||'';
      } catch(e) { return ''; }
    };
    try {
      setPipelineStage('email');
      const emailMsg = await gpt([{role:'system',content:agentPrompt.trim()+" You are reaching out to "+target.first+" "+target.last+", "+target.title+" at "+co.name+" ("+co.industry+"). Write a cold outreach email with subject line. Max 150 words. Be specific and personalized."},{role:'user',content:'Write the cold email now.'}],300);
      addLog('email','agent',emailMsg);
      setPipelineStage('reply');
      const prospectReply = await gpt([{role:'system',content:prospectSys},{role:'user',content:"You received this cold email:\n\n"+emailMsg+"\n\nReply authentically. You are somewhat interested but skeptical. 2-3 sentences."}],150);
      addLog('reply','prospect',prospectReply);
      setPipelineStage('followup');
      const followUp = await gpt([{role:'system',content:agentPrompt.trim()},{role:'user',content:"You sent a cold email and got this reply:\n\n"+prospectReply+"\n\nFollow up to move toward booking a 15-min discovery call. Be brief and direct."}],200);
      addLog('followup','agent',followUp);
      const objection = await gpt([{role:'system',content:prospectSys},{role:'user',content:"Sales rep said:\n\n"+followUp+"\n\nRaise a real objection (timing, budget, have a solution, not a priority). Be direct. 2 sentences."}],100);
      addLog('followup','prospect',objection);
      setPipelineStage('booking');
      const booking = await gpt([{role:'system',content:agentPrompt.trim()},{role:'user',content:"Prospect said:\n\n"+objection+"\n\nHandle the objection and try to book a 15-min call. Empathetic and compelling. 2-3 sentences."}],200);
      addLog('booking','agent',booking);
      const bookConfirm = await gpt([{role:'system',content:prospectSys},{role:'user',content:"Sales rep said:\n\n"+booking+"\n\nYou agree to a short call. Confirm a time. 1-2 sentences."}],80);
      addLog('booking','prospect',bookConfirm);
      setPipelineStage('discovery');
      const discPH = [{role:'system',content:prospectSys}];
      const discAH = [{role:'system',content:agentPrompt.trim()+" You are on a live 15-min discovery call with "+target.first+" "+target.last+", "+target.title+" at "+co.name+". Run structured discovery using MEDDIC. Uncover pain. Build rapport. Keep turns to 2-3 sentences."}];
      for(let t=0;t<4;t++){
        const agentTurn = await gpt(discAH,180);
        addLog('discovery','agent',agentTurn);
        discAH.push({role:'assistant',content:agentTurn});
        discPH.push({role:'user',content:agentTurn});
        const prospectTurn = await gpt(discPH,150);
        addLog('discovery','prospect',prospectTurn);
        discPH.push({role:'assistant',content:prospectTurn});
        discAH.push({role:'user',content:prospectTurn});
      }
      setPipelineStage('scoring');
      const transcript = log.map(e=>'['+e.stage.toUpperCase()+'] '+(e.role==='agent'?'AGENT':'PROSPECT')+': '+e.content).join('\n\n');
      const scoreRes = await gpt([{role:'user',content:'You are an expert sales coach. Score this full sales pipeline simulation:\n\n'+transcript+'\n\nReturn ONLY valid JSON (no markdown):\n{"emailQuality":0,"objectionHandling":0,"discoverySkill":0,"meddic":0,"overall":0,"grade":"A","bookedCall":true,"summary":"summary","strength":"strength","weakness":"weakness"} fill in real numbers 0-100 and real text.'}],400);
      try {
        const sc = JSON.parse(scoreRes.replace(/```json|```/g,'').trim());
        setPipelineScore(sc);
        setLabResults(p=>[{agentName:agentName||'Agent',grade:sc.grade,overall:sc.overall,mode:'pipeline',target:target.first+' '+target.last,company:co.name,ts:new Date().toLocaleTimeString()},...p.slice(0,9)]);
      } catch(e) { setPipelineScore({grade:'?',overall:0,emailQuality:0,objectionHandling:0,discoverySkill:0,meddic:0,summary:'Scoring failed.',strength:'-',weakness:'-'}); }
    } catch(e) { console.error('Pipeline error',e); }
    setPipelineStage('done');
    setPipelineRunning(false);
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
    if (score >= 55) return { grade:"C", label:"Developing", color:"text-yellow-700", bg:"bg-[#1A1200] border-yellow-200" };
    if (score >= 40) return { grade:"D", label:"Needs Work", color:"text-orange-700", bg:"bg-orange-50 border-orange-200" };
    return { grade:"F", label:"Below Target", color:"text-red-700", bg:"bg-red-50 border-red-200" };
  }

  // ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ FEED POSTS ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ
  // ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ EXTRA BUYING SIGNAL / CHALLENGE POSTS ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ
  const EXTRA_FEED_POSTS = [
    { empId:101, type:'signal', text:"We're actively evaluating workflow automation platforms for Q3. Our current stack can't handle the volume since we crossed 500 customers. Open to recommendations from anyone who's gone through a similar eval.", time:'2h', likes:34, comments:8 },
    { empId:201, type:'signal', text:"Honest question: how are other SaaS companies handling data pipeline complexity at scale? We're starting to hit serious limits with our current tooling. DMs welcome.", time:'4h', likes:27, comments:11 },
    { empId:301, type:'challenge', text:"Biggest challenge right now: we've doubled headcount in 6 months but our internal tooling hasn't kept up. Starting to look at what enterprises use to manage this kind of growth.", time:'5h', likes:41, comments:15 },
    { empId:104, type:'signal', text:"Quarter review coming up and I'm building a shortlist of analytics platforms. ROI visibility is #1 criteria. What's everyone using in 2025?", time:'6h', likes:19, comments:7 },
    { empId:202, type:'signal', text:"Our sales team is growing fast and we're outgrowing our current CRM. Looking at alternatives ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ needs to integrate with our stack and scale to 30+ reps.", time:'8h', likes:22, comments:9 },
    { empId:102, type:'signal', text:"Making a decision on infra tooling next month. If you've deployed at Series B scale in the last 18 months I'd love to chat. What did you go with and why?", time:'12h', likes:31, comments:14 },
    { empId:302, type:'challenge', text:"Nobody talks about the hidden cost of switching vendors: it's not just the software, it's the 6-week migration. We're in the middle of one now. Painful doesn't cover it.", time:'14h', likes:55, comments:22 },
    { empId:501, type:'signal', text:"Kicking off a vendor review for automated threat detection. Any security leaders who've evaluated this space recently? Would appreciate a candid conversation.", time:'16h', likes:29, comments:10 },
    { empId:105, type:'insight', text:"Unpopular opinion: most B2B demos show you the happy path. Push for a live session with your own messy data. You'll learn 10x more in 20 minutes.", time:'18h', likes:87, comments:31 },
    { empId:203, type:'milestone', text:"Just closed our Series A. Incredible team effort. Now the real work begins ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ rebuilding our engineering org from scratch. We're hiring across the board.", time:'1d', likes:124, comments:47 },
    { empId:303, type:'challenge', text:"Sales motion breaks when your ICP shifts. We built our playbook for SMB but 40% of pipeline is now mid-market. Rebuilding everything in real time while still hitting quota.", time:'1d', likes:63, comments:24 },
    { empId:401, type:'challenge', text:"Compliance is becoming a bottleneck. GDPR + SOC2 is eating 20% of engineering bandwidth. Actively looking at tools that automate more of this without sacrificing coverage.", time:'1d', likes:38, comments:13 },
    { empId:502, type:'challenge', text:"Hardest part of security leadership: convincing the board to invest before an incident. By then it's too late. Any CISOs who've cracked this communication problem?", time:'2d', likes:74, comments:28 },
    { empId:106, type:'insight', text:"The best cold email I got this quarter had zero fluff. Just: 'We help [company type] do [specific thing] in [timeframe]. Worth 20 min?' That's it. Booked the meeting.", time:'2d', likes:146, comments:52 },
    { empId:601, type:'signal', text:"Starting to think seriously about intelligent ops tooling for manufacturing. A category that barely existed 2 years ago. Anyone deep in this space? Would love to connect.", time:'2d', likes:18, comments:6 },
  ];

  const feedPosts = [
    ...allEmps.flatMap(emp => {
      const company = getCompanyForEmp(emp.id);
      return emp.posts.map((post, i) => {
        const lc = post.toLowerCase();
        const type = ['evaluat','looking for','struggling','challenge','recommend','need a','replac','vendor','consider','explore','switch','outgrow','manual','bottleneck','budget'].some(k=>lc.includes(k)) ? 'signal'
          : ['proud','excited','thrilled','announce','crossed','achieved','launched','celebrated','milestone'].some(k=>lc.includes(k)) ? 'milestone'
          : 'insight';
        return { emp, company, post: { text: post, type, time: `${(emp.id*3+i*7)%47+1}h`, likes: (emp.id*7+i*11)%87+3, comments: (emp.id+i*5)%18+1 }, id: emp.id * 100 + i };
      });
    }),
    ...EXTRA_FEED_POSTS.map((ep,i) => {
      const emp = allEmps.find(e => e.id === ep.empId);
      const company = emp ? getCompanyForEmp(ep.empId) : null;
      return emp ? { emp, company, post: { text: ep.text, type: ep.type, time: ep.time, likes: ep.likes, comments: ep.comments }, id: ep.empId * 100 + 90 + i } : null;
    }).filter(Boolean)
  ].sort((a,b) => (b.emp.id % 7) - (a.emp.id % 7));

  const navBtn = (id, label, icon, badge) => (
    <button key={id} onClick={() => setTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${tab===id ? "bg-[#0EA5E9] text-white" : "text-[#374151] hover:bg-[#EEF0FF]"}`}>
      <span>{icon}</span>{label}
      {badge > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{badge}</span>}
    </button>
  );

  // ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ
  // RENDER
  // ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ

  // Fetch scheduled calls
  React.useEffect(()=>{
    if(!authTok||!user?.id)return;
    fetchScheduledCalls(authTok,user?.id).then(d=>{if(Array.isArray(d))setScheduledCalls(d);}).catch(()=>{});
  },[authTok,user?.id]);

  // Generate persona messages randomly
  React.useEffect(()=>{
    if(!authTok||!user?.id||!allEmps.length)return;
    fetchPersonaMessages(authTok,user?.id).then(d=>{if(Array.isArray(d))setPersonaMessages(d);}).catch(()=>{});
    const iv=setInterval(async()=>{
      const emp=allEmps[Math.floor(Math.random()*allEmps.length)];
      if(!emp)return;
      const co=companies.find(c=>c.id===emp.cId)||{name:'Acme Corp'};
      const idx=Math.floor(Math.random()*5);
      const msg=genPersonaMsg(emp.first+' '+emp.last,co.name,(product?.name||'RepForge')||'your product',idx);
      try{
        const saved=await savePersonaMsg(authTok,user?.id,emp.id,emp.first+' '+emp.last,co.name,msg.subject,msg.body,msg.type,msg.wantsCall,msg.callType);
        if(saved&&saved.id)setPersonaMessages(prev=>[saved,...prev]);
      }catch(e){}
    },45000+Math.floor(Math.random()*75000));
    return()=>clearInterval(iv);
  },[authTok,user?.id,allEmps.length,(product?.name||'RepForge')]);

  // Session countdown timer
  React.useEffect(()=>{
    if(!sessionActive)return;
    const iv=setInterval(()=>{
      setSessionTimer(t=>{
        if(t<=1){clearInterval(iv);setSessionActive(false);setShowCallSession(false);setActiveSession(null);setSessionTimer(1800);if(vi){try{vi.stop();}catch(e){}}return 0;}
        return t-1;
      });
    },1000);
    return()=>clearInterval(iv);
  },[sessionActive]);

  const handleOpenBooking=(persona,callType)=>{
    setBookingPersona(persona);
    setBookingCallType(callType||'discovery');
    const dt=new Date(Date.now()+86400000);
    dt.setHours(10,0,0,0);
    setBookingDateTime(dt.toISOString().slice(0,16));
    setShowBookingModal(true);
  };

  const handleBookCall=async()=>{
    if(!bookingPersona||!bookingDateTime)return;
    const co=companies.find(c=>c.id===bookingPersona.cId)||{id:'',name:'Unknown'};
    const dd=generateDiscoveryData();
    try{
      const saved=await bookCall(authTok,user?.id,bookingPersona.id,bookingPersona.first+' '+bookingPersona.last,co.id,co.name,new Date(bookingDateTime).toISOString(),bookingCallType,dd,null);
      if(saved&&saved.id)setScheduledCalls(prev=>[...prev,saved]);
    }catch(e){}
    setShowBookingModal(false);
  };

  const handleJoinCall=async(sc)=>{
    const dd=sc.discovery_data||generateDiscoveryData();
    window._discoveryBlock=sc.call_type==='demo'
      ?`\n\n## Demo Call Context (Hidden from Prospect)\nYou already had a discovery call. You understand the problem. You are now watching a product demo. Stay in character as ${sc.persona_name} from ${sc.company_name}.\n\nMEDDIC Summary:\nBudget: ${dd.budget}\nAuthority: ${dd.authority}\nTimeline: ${dd.timeline}\nPain: ${dd.pain}\nCompetition: ${dd.competition}\nInterest Score: ${dd.interest}/8\n\n## Your Demo Behavior\nYou are a skeptical but genuinely interested prospect. During the demo MUST:\n- Raise 3-4 pointed objections (pricing, implementation time, comparison to ${dd.competition})\n- Ask at least one feature question tied to your pain: ${dd.pain}\n- If impressed follow with "but what about..."\n- Towards the end ask about next steps only if convinced\n- Do NOT ask basic discovery questions`
      :`\n\n## MEDDIC Context (Hidden from Prospect)\nBudget: ${dd.budget}\nAuthority: ${dd.authority}\nTimeline: ${dd.timeline}\nDecision Process: ${dd.decision_process}\nPain: ${dd.pain}\nCompetition: ${dd.competition}\nInterest Score: ${dd.interest}/8\n`;
    setActiveSession({...sc,discovery_data:dd});
    setSessionTimer(1800);
    setSessionActive(true);
    setShowCallSession(true);
    if(sc&&sc.id)await updateCallStatus(authTok,sc.id,'active');
    setScheduledCalls(prev=>prev.map(c=>c.id===sc.id?{...c,status:'active'}:c));
  };

  const handleCloseSession=async()=>{
    setSessionActive(false);
    setShowCallSession(false);
    if(activeSession&&activeSession.id)await updateCallStatus(authTok,activeSession.id,'completed');
    setScheduledCalls(prev=>prev.map(c=>c.id===activeSession?.id?{...c,status:'completed'}:c));
    setActiveSession(null);
    setSessionTimer(1800);
    if(vi){try{vi.stop();}catch(e){}}
  };

  const handleMsgBooking=(msg)=>{
    const emp=allEmps.find(p=>p.id===msg.persona_id);
    if(emp)handleOpenBooking(emp,msg.call_type||'discovery');
    setExpandedMsg(null);
  };
function generateDemoObjections(dd,pName,cName){
  const comp=dd&&dd.competition?dd.competition:'your current solution';
  const pain=dd&&dd.pain?dd.pain:'your main challenge';
  const budget=dd&&dd.budget?dd.budget:'your budget';
  const timeline=dd&&dd.timeline?dd.timeline:'your timeline';
  return[
    {id:1,cat:'Competitor',icon:'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ',text:`How does this compare to ${comp}? We've used them for years.`},
    {id:2,cat:'Pricing',icon:'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ°',text:`This seems expensive. How does it fit ${budget}?`},
    {id:3,cat:'Feature',icon:'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ',text:`Walk me through how this solves ${pain}.`},
    {id:4,cat:'Timeline',icon:'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ±ÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ',text:`How long is implementation? We need this in ${timeline}.`},
    {id:5,cat:'Risk',icon:'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ ÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ',text:`What if we start and it doesn't work? What's the exit clause?`},
  ];
}
React.useEffect(()=>{
  if(!sessionActive||!activeSession||activeSession.call_type!=='demo'){setDemoObjections([]);setHandledObjections(new Set());return;}
  const objs=generateDemoObjections(activeSession.discovery_data,activeSession.persona_name,activeSession.company_name);
  const timers=objs.map((obj,i)=>setTimeout(()=>setDemoObjections(prev=>prev.find(o=>o.id===obj.id)?prev:[...prev,obj]),(90+i*120+Math.random()*60)*1000));
  return()=>timers.forEach(clearTimeout);
},[sessionActive,activeSession&&activeSession.id]);

// ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ ProLink enrichment helpers ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ
function getPersonaPhoto(id){return 'https://i.pravatar.cc/150?u=rpf'+id;}
function getPersonaConnections(id){const b=[412,867,1203,543,2100,789,1567,334,901,1456];return b[id%b.length]+(id*7)%200;}
function getPersonaPainPoints(emp,company){
  const byRole={
    'c-suite':['Scaling '+company.name+' profitably while protecting culture','Board pressure on ARR growth without over-hiring','Competitive differentiation in a saturated '+company.industry+' market','Finding the right enterprise GTM motion'],
    'vp':['Hitting '+( emp.title.includes('Sales')?'quota':'OKRs')+' with a lean team','Justifying new tool spend against tight budgets','Aligning cross-functional teams on priorities','Replacing legacy workflows with modern tooling'],
    'manager':['Managing team performance with limited visibility','Reducing manual reporting overhead','Getting leadership buy-in for process changes','Ramping new hires faster'],
    'ic':['Too much time on admin vs. actual work','Lack of clear direction from senior leadership',"Tools that don't integrate with existing stack",'Too many context switches between platforms']
  };
  return (byRole[emp.seniority]||byRole['ic']).slice(0,3);
}
function getPersonaGoals(emp,company){
  const s=emp.seniority;
  return s==='c-suite'
    ?['Position '+company.name+' as category leader in '+company.industry,'Reach next funding milestone or profitability target','Expand into two new verticals this year']
    :s==='vp'
    ?['Hit '+( emp.title.includes('Sales')?'revenue':'delivery')+' targets for the fiscal year','Build a repeatable, scalable team process','Reduce dependency on manual tooling by Q3']
    :['Ship key deliverables on time with quality','Improve cross-team communication','Grow into a senior '+emp.title.replace('Junior ','').replace('Associate ','')];
}
function getPersonaPosts(emp,company){
  const sen=emp.seniority,ind=company.industry,cn=company.name,title=emp.title,id=emp.id;
  const rng=(n)=>((id*7+n*13)%100)/100;
  const likeBase=sen==='c-suite'?350:sen==='vp'?160:sen==='manager'?70:35;
  const comBase=sen==='c-suite'?32:sen==='vp'?16:sen==='manager'?8:4;
  const tags={'SaaS':['#SaaS','#B2BSales','#ProductLed','#GrowthHacking'],'Cyber Security':['#CyberSecurity','#ZeroTrust','#InfoSec','#ThreatIntel'],'Manufacturing':['#Industry40','#SmartFactory','#IoT','#Automation'],'FinTech':['#FinTech','#OpenBanking','#RegTech','#Payments'],'CleanTech':['#CleanTech','#Sustainability','#NetZero','#GreenEnergy'],'HealthTech':['#HealthTech','#DigitalHealth','#PatientFirst','#MedTech'],'RetailTech':['#RetailTech','#Omnichannel','#CommerceAI','#CX'],'PropTech':['#PropTech','#ConTech','#SmartBuilding','#Construction']};
  const t=tags[ind]||['#Tech','#Innovation','#Leadership'];
  const timings=['1d','2d','3d','5d','1w','2w'];
  return [
    {text:sen==='c-suite'?'Three years ago '+cn+' had 12 customers. Today we serve over '+(Math.floor(rng(1)*400)+100)+' enterprise teams across Europe.\n\nThe thing nobody tells you about scaling a '+ind+' company: the hardest part isn\'t product. It\'s people and process. Every time.\n\nWe\'re hiring senior ICs. DM me if you know someone.':sen==='vp'?'Spent Q2 rebuilding how our team approaches '+(title.includes('Sales')?'pipeline management and forecasting':'cross-functional delivery and prioritisation')+'..\nBiggest lesson: slow down to speed up. Teams that skip alignment always pay for it in rework and morale.\n'+cn+' is in a really strong position heading into H2.':'Just wrapped a very productive sprint at '+cn+'.\nThe team is shipping faster than ever ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ and the quality bar keeps rising. Proud to be part of this one.',






     likes:Math.floor(likeBase*(0.8+rng(2)*0.5)),comments:Math.floor(comBase*(0.8+rng(3)*0.5)),timeAgo:timings[id%3],tags:[t[0],t[1]],hasImage:false},
    {text:sen==='c-suite'?'Hot take: most '+ind+' companies are solving the wrong problem.\n\nEveryone is chasing feature parity. The winners are obsessing over workflow and time-to-value.\n\nWe saw this pattern two years ago at '+cn+' and made a hard pivot. Best decision we ever made.\n\nWhat\'s your take?':sen==='vp'?'Controversial opinion: the biggest bottleneck in most '+ind+' orgs isn\'t headcount.\n\nIt\'s tooling debt.\n\nWe spent 6 months at '+cn+' ripping out systems that were slowing us down. The ROI showed up in 90 days flat.':'If you\'re in '+ind+' and not paying attention to how AI is changing '+(title.includes('Sales')||title.includes('Marketing')?'go-to-market':'operations')+', you\'re already behind.\n\nSome notes from a workshop I attended this week ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ thread below.',
     likes:Math.floor(likeBase*(0.6+rng(4)*0.8)),comments:Math.floor(comBase*(0.6+rng(5)*0.7)),timeAgo:timings[(id+1)%4+1],tags:[t[2]],hasImage:id%5===0},
    {text:sen==='c-suite'||sen==='vp'?'We just made a call that made us uncomfortable.\n\nWe said no to a ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ¬'+(Math.floor(rng(6)*400)+150)+'k deal because the customer wasn\'t the right fit for where '+cn+' is going.\n\nEarly stage you take every deal. Later stage you realise bad-fit customers cost more than they\'re worth. Churn, support load, culture damage.\n\nBuilding for the long game.':'Looking for recommendations ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ what tools is your team using for '+(title.includes('Eng')||title.includes('CTO')?'CI/CD and code quality monitoring':title.includes('Sales')?'sales engagement and pipeline visibility':'project management and async communication')+' in 2025?\n\nWe\'re evaluating options at '+cn+' right now. Drop a comment ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ',
     likes:Math.floor(likeBase*(0.9+rng(7)*0.4)),comments:Math.floor(comBase*(1.2+rng(8)*0.8)),timeAgo:timings[(id+2)%5],tags:[t[id%t.length]],hasImage:false},
    {text:'Reflecting on what\'s actually hard about working in '+ind+' right now:\n\n1. '+(sen==='c-suite'?'Finding people who think commercially AND technically':'Getting visibility into what leadership actually cares about')+'\n2. '+(title.includes('Sales')?'Keeping pipeline quality high under quota pressure':'Shipping fast without accumulating tech/process debt')+'\n3. '+(company.employees>30?'Maintaining culture as the team grows':'Doing more with less')+'\n\nNone of this is new. All of it is harder in '+new Date().getFullYear()+'.',
     likes:Math.floor(likeBase*(1.0+rng(9)*0.4)),comments:Math.floor(comBase*(0.9+rng(10)*0.5)),timeAgo:timings[(id+3)%timings.length],tags:[t[0],t[t.length-1]],hasImage:false},
    {text:sen==='c-suite'?'I still interview every senior hire personally.\n\nNot to check qualifications ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ the team handles that.\n\nI\'m looking for one thing: do they make the people around them better?\n\nThe best people I\'ve ever worked with always do. The ones who didn\'t make the team stronger didn\'t last.\n\n#Leadership':'End of quarter reflection at '+cn+':\n\nWins: '+(title.includes('Sales')?'pipeline coverage strong, team at 94% of target':'shipped 3 major features, zero Sev-1s in production')+'\nNeeds work: documentation, async comms, onboarding speed\n\nEvery quarter we get a bit better. That\'s the job.',
     likes:Math.floor(likeBase*(1.1+rng(11)*0.3)),comments:Math.floor(comBase*(0.8+rng(12)*0.4)),timeAgo:timings[(id+4)%timings.length],tags:[],hasImage:id%7===0},
  ];
}

  return (
    <div className="min-h-screen bg-[#070C18]">
      {showProdSetup&&(<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.6)',zIndex:9998,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'system-ui'}}>
        <div style={{background:'#0D1525',borderRadius:'14px',padding:'32px 36px',width:'500px',maxWidth:'92vw',maxHeight:'85vh',overflowY:'auto',boxShadow:'0 24px 60px rgba(0,0,0,0.25)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:6}}><h2 style={{margin:0,fontSize:'19px',fontWeight:'800',color:'#0EA5E9'}}>What are you selling?</h2><button onClick={()=>setShowProdSetup(false)} style={{background:'none',border:'none',fontSize:22,cursor:'pointer',color:'#9ca3af',lineHeight:1,padding:0,marginTop:-2}}>&times;</button></div>
          <p style={{margin:'0 0 22px',color:'#7A9CC4',fontSize:'13px'}}>The AI allEmps will know your product and respond to your pitch.</p>
          {[{l:'Product Name *',k:'name',ph:'e.g. Acme CRM',m:false},{l:'Elevator Pitch',k:'desc',ph:'What problem does it solve and for who?',m:true},{l:'Ideal Customer Profile',k:'icp',ph:'e.g. B2B SaaS, 50-500 employees, VP Sales',m:false},{l:'Value Props (one per line)',k:'vps',ph:'Saves 5hrs/week\nReduces churn 20%',m:true},{l:'Common Objections (one per line)',k:'objs',ph:'Too expensive\nWe already have a solution',m:true}].map(({l,k,ph,m})=>(
            <div key={k} style={{marginBottom:'15px'}}>
              <label style={{display:'block',fontSize:'11px',fontWeight:'700',color:'#D4E5FF',marginBottom:'5px',letterSpacing:'0.05em'}}>{l.toUpperCase()}</label>
              {m?<textarea value={prodForm[k]} onChange={e=>setProdForm({...prodForm,[k]:e.target.value})} placeholder={ph} style={{width:'100%',padding:'9px 12px',border:'1px solid #1B3154',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box',minHeight:'62px',resize:'vertical',fontFamily:'inherit'}}/>:<input value={prodForm[k]} onChange={e=>setProdForm({...prodForm,[k]:e.target.value})} placeholder={ph} style={{width:'100%',padding:'9px 12px',border:'1px solid #1B3154',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box'}}/>}
            </div>
          ))}
          <div style={{display:'flex',gap:'10px',justifyContent:'flex-end',marginTop:'22px'}}>
            {product&&<button onClick={()=>setShowProdSetup(false)} style={{padding:'10px 18px',border:'1px solid #1B3154',borderRadius:'8px',cursor:'pointer',fontSize:'13px',fontWeight:'600',color:'#7A9CC4'}}>Cancel</button>}
            <button onClick={handleSaveProd} disabled={prodSaving||!prodForm.name.trim()} style={{padding:'10px 24px',background:'#0EA5E9',color:'white',border:'none',borderRadius:'8px',cursor:(prodSaving||!prodForm.name.trim())?'not-allowed':'pointer',fontSize:'13px',fontWeight:'700',opacity:(prodSaving||!prodForm.name.trim())?0.6:1}}>
              {prodSaving?'Saving...':'Save & Start Selling'}
            </button>
          </div>
        </div>
      </div>)}
      
      {showPostCall&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',zIndex:9996,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:'#0D1525',borderRadius:12,padding:28,width:500,maxWidth:'95vw',maxHeight:'90vh',overflowY:'auto'}}>
            <div style={{fontSize:17,fontWeight:700,color:'#0EA5E9',marginBottom:4}}>ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Call Summary</div>
            <div style={{fontSize:12,color:'#4A6B8A',marginBottom:16}}>Auto-generated ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ edit and save to pipeline</div>
            <div style={{marginBottom:12}}><div style={{fontSize:12,fontWeight:600,color:'#D4E5FF',marginBottom:4}}>Summary</div><textarea value={postCallSummary} onChange={e=>setPostCallSummary(e.target.value)} rows={3} style={{width:'100%',border:'1px solid #d1d5db',borderRadius:6,padding:'8px',fontSize:13,resize:'vertical',boxSizing:'border-box'}}/></div>
            <div style={{marginBottom:12}}><div style={{fontSize:12,fontWeight:600,color:'#D4E5FF',marginBottom:4}}>Your Notes</div><textarea value={postCallNotes} onChange={e=>setPostCallNotes(e.target.value)} rows={2} placeholder="What went well? Follow-ups?" style={{width:'100%',border:'1px solid #d1d5db',borderRadius:6,padding:'8px',fontSize:13,resize:'vertical',boxSizing:'border-box'}}/></div>
            <div style={{marginBottom:12}}><div style={{fontSize:12,fontWeight:600,color:'#D4E5FF',marginBottom:4}}>Objections (one per line)</div><textarea value={postCallObjs} onChange={e=>setPostCallObjs(e.target.value)} rows={2} style={{width:'100%',border:'1px solid #d1d5db',borderRadius:6,padding:'8px',fontSize:13,resize:'vertical',boxSizing:'border-box'}}/></div>
            <div style={{marginBottom:18}}><div style={{fontSize:12,fontWeight:600,color:'#D4E5FF',marginBottom:6}}>Prospect Interest: <span style={{color:scoreColor(postCallScore),fontWeight:700}}>{postCallScore}/10</span></div><input type="range" min={1} max={10} value={postCallScore} onChange={e=>setPostCallScore(Number(e.target.value))} style={{width:'100%'}}/></div>
            <div style={{display:'flex',gap:10}}><button onClick={handlePostCallSave} style={{flex:1,background:'linear-gradient(135deg,#0EA5E9,#7C3AED)',color:'#fff',border:'none',borderRadius:8,padding:'10px 0',fontWeight:700,fontSize:14,cursor:'pointer',letterSpacing:'0.02em'}}>ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¾ Save to Pipeline</button><button onClick={()=>setShowPostCall(false)} style={{flex:1,background:'#111F36',color:'#D4E5FF',border:'none',borderRadius:8,padding:'10px 0',fontSize:14,cursor:'pointer'}}>Skip</button></div>
          </div>
        </div>
      )}
      {showPipeline&&(
        <div style={{position:'fixed',inset:0,background:'#070C18',zIndex:9990,overflowY:'auto'}}>
          <div style={{padding:'20px 28px',maxWidth:1300,margin:'0 auto'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
              <div><div style={{fontSize:22,fontWeight:800,letterSpacing:"-0.02em",color:'#0EA5E9'}}>ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Deal Pipeline</div><div style={{fontSize:13,color:'#7A9CC4',marginTop:2}}>{deals.length} deal{deals.length!==1?'s':''} tracked</div></div>
              <button onClick={()=>{setShowPipeline(false);setTab('crm');}} style={{background:'#0EA5E9',color:'#fff',border:'none',borderRadius:8,padding:'8px 20px',fontWeight:600,fontSize:14,cursor:'pointer'}}>ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Close</button>
            </div>
            <div style={{marginBottom:12,background:'#0A1F1A',borderRadius:8,padding:'12px 16px',border:'1px solid #065F46'}}>
              {(()=>{
                const closedDeals=deals.filter(d=>d.stage==='Closed Won');
                const closedVal=closedDeals.reduce((sum,d)=>{const co=companies.find(c=>c.name===d.company_name);return sum+(co?co.dealValue:0);},0);
                const pct=Math.min(100,Math.round(closedVal/10000));
                return(<>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                    <span style={{fontSize:13,fontWeight:700,color:'#0EA5E9'}}>ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ° Quota Attainment</span>
                    <span style={{fontSize:13,fontWeight:700,color:'#10B981'}}>${closedVal.toLocaleString()} <span style={{fontWeight:400,color:'#6b7280'}}>/ $1,000,000</span></span>
                  </div>
                  <div style={{height:8,background:'#F0FDF4',borderRadius:4,overflow:'hidden'}}>
                    <div style={{height:'100%',width:pct+'%',background:'linear-gradient(90deg,#16a34a,#22c55e)',borderRadius:4,transition:'width 0.5s'}}></div>
                  </div>
                  <div style={{fontSize:11,color:'#6b7280',marginTop:4}}>{closedDeals.length} deals closed ÃÂÃÂÃÂÃÂ· {100-pct}% remaining to target</div>
                </>);
              })()}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12}}>
              {['Prospecting','Discovery','Demo','Proposal','Legal Review','Procurement','Closed Won'].map(stage=>{
                const sd=deals.filter(d=>d.stage===stage);
                const col={'Prospecting':'#F0FDF4','Discovery':'#F5F3FF','Demo':'#fef3c7','Proposal':'#ECFDF5','Closed Won':'#EEF2FF'};
                const brd={'Prospecting':'#16a34a','Discovery':'#2563eb','Demo':'#d97706','Proposal':'#7c3aed','Closed Won':'#065f46'};
                const all=['Prospecting','Discovery','Demo','Proposal','Legal Review','Procurement','Closed Won'];
                return(
                  <div key={stage} style={{background:col[stage],borderRadius:10,padding:12,border:'2px solid '+brd[stage],minHeight:180}}>
                    <div style={{fontSize:11,fontWeight:700,color:brd[stage],marginBottom:10,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <span style={{textTransform:'uppercase',letterSpacing:'0.04em'}}>{stage}</span>
                      <span style={{background:brd[stage],color:'#fff',borderRadius:99,padding:'1px 7px',fontSize:11}}>{sd.length}</span>
                    </div>
                    {sd.map(deal=>{
                      const ci=all.indexOf(deal.stage);const sc=deal.interest_score||5;
                      return(
                        <div key={deal.id} style={{background:'#0D1525',borderRadius:8,padding:'10px 12px',marginBottom:8,boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
                          <div style={{fontSize:13,fontWeight:700,color:'#0EA5E9'}}>{deal.persona_name}</div>
                          <div style={{fontSize:11,color:'#6b7280',marginBottom:3}}>{deal.company_name}</div>
                          <div style={{fontSize:11,fontWeight:700,color:'#10B981',marginBottom:6,letterSpacing:'-0.2px'}}>ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ° ${(companies.find(c=>c.name===deal.company_name)||{dealValue:0}).dealValue.toLocaleString()}</div>
                          <div style={{display:'flex',alignItems:'center',gap:4,marginBottom:8}}>
                            <div style={{width:7,height:7,borderRadius:'50%',background:scoreColor(sc),flexShrink:0}}/>
                            <span style={{fontSize:11,color:scoreColor(sc),fontWeight:600}}>{sc}/10 interest</span>
                          </div>
                          <div style={{display:'flex',gap:4}}>
                            {ci>0&&<button onClick={()=>handleMoveDeal(deal.id,all[ci-1])} style={{fontSize:10,padding:'3px 7px',background:'#f9fafb',border:'1px solid #e5e7eb',borderRadius:4,cursor:'pointer',color:'#6b7280'}}>ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Back</button>}
                            {ci<4&&<button onClick={()=>handleMoveDeal(deal.id,all[ci+1])} style={{fontSize:10,padding:'3px 8px',background:brd[stage],border:'none',borderRadius:4,cursor:'pointer',color:'#fff',fontWeight:600}}>Advance ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ</button>}
                          </div>
                        </div>
                      );
                    })}
                    {sd.length===0&&<div style={{fontSize:12,color:'#9ca3af',textAlign:'center',marginTop:24,fontStyle:'italic'}}>No deals</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
  {showBookingModal&&bookingPersona&&(
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'#1e293b',borderRadius:12,padding:28,width:400,border:'1px solid #334155'}}>
        <h3 style={{color:'#f1f5f9',margin:'0 0 16px',fontSize:18}}>Book {bookingCallType==='demo'?'Demo':'Discovery'} Call</h3>
        <p style={{color:'#4A6B8A',margin:'0 0 16px',fontSize:14}}>with <strong style={{color:'#e2e8f0'}}>{bookingPersona.first} {bookingPersona.last}</strong></p>
        <div style={{marginBottom:14}}>
          <label style={{display:'block',color:'#4A6B8A',fontSize:12,marginBottom:6}}>CALL TYPE</label>
          <div style={{display:'flex',gap:8}}>
            {['discovery','demo'].map(t=>(
              <button key={t} onClick={()=>setBookingCallType(t)} style={{flex:1,padding:'8px 0',borderRadius:8,border:'none',cursor:'pointer',fontWeight:600,fontSize:13,background:bookingCallType===t?'#6366f1':'#334155',color:bookingCallType===t?'#fff':'#94a3b8'}}>{t==='demo'?'Demo Call':'Discovery Call'}</button>
            ))}
          </div>
        </div>
        <div style={{marginBottom:20}}>
          <label style={{display:'block',color:'#4A6B8A',fontSize:12,marginBottom:6}}>DATE & TIME</label>
          <input type="datetime-local" value={bookingDateTime} onChange={e=>setBookingDateTime(e.target.value)} style={{width:'100%',padding:'8px 10px',borderRadius:8,border:'1px solid #475569',background:'#0f172a',color:'#f1f5f9',fontSize:14,boxSizing:'border-box'}}/>
        </div>
        <div style={{display:'flex',gap:10}}>
          <button onClick={()=>setShowBookingModal(false)} style={{flex:1,padding:'10px 0',borderRadius:8,border:'1px solid #475569',background:'transparent',color:'#4A6B8A',cursor:'pointer',fontWeight:600}}>Cancel</button>
          <button onClick={handleBookCall} style={{flex:1,padding:'10px 0',borderRadius:8,border:'none',background:'#6366f1',color:'#fff',cursor:'pointer',fontWeight:700,fontSize:14}}>Confirm Booking</button>
        </div>
      </div>
    </div>
  )}
      
  {showCallSession&&activeSession&&(
    <div style={{position:'fixed',inset:0,background:'#0F172A',zIndex:999,display:'flex',flexDirection:'column'}}>
      {/* Header */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 24px',borderBottom:'1px solid #1e293b',background:'#0f172a'}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:10,height:10,borderRadius:'50%',background:'#16a34a',boxShadow:'0 0 8px #22c55e'}}/>
          <span style={{color:'#f1f5f9',fontWeight:700,fontSize:16}}>{activeSession.call_type==='demo'?'Demo':'Discovery'} Call ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ {activeSession.persona_name}</span>
          <span style={{background:'#1e293b',color:'#4A6B8A',padding:'2px 10px',borderRadius:20,fontSize:12}}>{activeSession.company_name}</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:16}}>
          <span style={{fontFamily:'monospace',fontSize:20,fontWeight:700,color:sessionTimer<300?'#ef4444':sessionTimer<600?'#F97316':'#16a34a'}}>
            {String(Math.floor(sessionTimer/60)).padStart(2,'0')}:{String(sessionTimer%60).padStart(2,'0')}
          </span>
          <button onClick={handleCloseSession} style={{padding:'6px 16px',borderRadius:8,border:'1px solid #ef4444',background:'rgba(239,68,68,0.1)',color:'#ef4444',cursor:'pointer',fontWeight:600,fontSize:13}}>End Call</button>
        </div>
      </div>
      {activeSession.call_type==='demo'?(
        /* DEMO: fake video UI */
        <div style={{flex:1,display:'flex',gap:0,overflow:'hidden'}}>
          <div style={{flex:1,display:'flex',flexDirection:'column',background:'#0F172A',padding:20,gap:12,overflow:'hidden'}}>
            <div style={{flex:1,background:'#111827',borderRadius:12,border:'1px solid #1e293b',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden'}}>
              <div style={{textAlign:'center'}}><div style={{fontSize:48,marginBottom:12}}>ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ</div><div style={{color:'#475569',fontSize:14}}>Screen share area</div><div style={{color:'#334155',fontSize:12,marginTop:4}}>Present your demo here</div></div>
              <div style={{position:'absolute',bottom:12,left:12,background:'rgba(0,0,0,0.7)',padding:'4px 10px',borderRadius:6,color:'#4A6B8A',fontSize:11}}>Your Screen</div>
            </div>
            <div style={{display:'flex',gap:12,height:120}}>
              <div style={{flex:1,background:'#1a2236',borderRadius:10,border:'1px solid #1e293b',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:6,position:'relative'}}>
                <div style={{width:44,height:44,borderRadius:'50%',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:18}}>{activeSession.persona_name?activeSession.persona_name.split(' ').map(n=>n[0]).join('').slice(0,2):'?'}</div>
                <span style={{color:'#4A6B8A',fontSize:11}}>{activeSession.persona_name}</span>
                <div style={{position:'absolute',bottom:6,right:6,background:'#16a34a',width:8,height:8,borderRadius:'50%'}}/>
              </div>
              <div style={{flex:1,background:'#0f1929',borderRadius:10,border:'1px solid #1e293b',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:6}}>
                <div style={{fontSize:28}}>ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¤</div><span style={{color:'#4A6B8A',fontSize:11}}>You</span>
              </div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <button onClick={handleCloseSession} style={{width:44,height:44,borderRadius:'50%',border:'none',background:'#ef4444',color:'#fff',fontSize:18,cursor:'pointer'}}>ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂµ</button>
              </div>
            </div>
          </div>
          <div style={{width:280,background:'#0d1526',borderLeft:'1px solid #1e293b',display:'flex',flexDirection:'column',overflow:'hidden'}}>
            <div style={{padding:'14px 16px',borderBottom:'1px solid #1e293b',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{color:'#f1f5f9',fontWeight:700,fontSize:13}}>ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ Objection Tracker</span>
              <span style={{background:handledObjections.size===demoObjections.length&&demoObjections.length>0?'#16a34a':'#334155',color:'#fff',fontSize:11,padding:'2px 8px',borderRadius:10,fontWeight:600}}>{handledObjections.size}/{demoObjections.length} handled</span>
            </div>
            <div style={{flex:1,overflowY:'auto',padding:12,display:'flex',flexDirection:'column',gap:8}}>
              {demoObjections.length===0?(<div style={{textAlign:'center',color:'#475569',fontSize:12,marginTop:40}}><div style={{fontSize:28,marginBottom:8}}>ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ³</div><div>Objections will surface</div><div>as the demo progressesÃÂÃÂ¢ÃÂÃÂÃÂÃÂ¦</div></div>):demoObjections.map(obj=>(<div key={obj.id} style={{background:handledObjections.has(obj.id)?'rgba(34,197,94,0.08)':'rgba(239,68,68,0.08)',border:`1px solid ${handledObjections.has(obj.id)?'#166534':'#7f1d1d'}`,borderRadius:8,padding:'8px 10px'}}><div style={{display:'flex',alignItems:'flex-start',gap:6,marginBottom:6}}><span style={{fontSize:14}}>{obj.icon}</span><div style={{flex:1}}><span style={{background:handledObjections.has(obj.id)?'#166534':'#7f1d1d',color:'#fff',fontSize:9,padding:'1px 5px',borderRadius:3,fontWeight:700}}>{obj.cat}</span><p style={{color:'#cbd5e1',fontSize:12,margin:'4px 0 0',lineHeight:1.4}}>{obj.text}</p></div></div>{!handledObjections.has(obj.id)?(<button onClick={()=>setHandledObjections(prev=>{const s=new Set(prev);s.add(obj.id);return s;})} style={{width:'100%',padding:'4px',borderRadius:5,border:'1px solid #22c55e',background:'rgba(34,197,94,0.1)',color:'#10B981',fontSize:11,cursor:'pointer',fontWeight:600}}>ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Mark Handled</button>):(<div style={{textAlign:'center',color:'#10B981',fontSize:11,fontWeight:600}}>ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Handled</div>)}</div>))}
            </div>
            {demoObjections.length>0&&(<div style={{padding:'10px 16px',borderTop:'1px solid #1e293b',background:'#0F172A'}}><div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}><span style={{color:'#4A6B8A',fontSize:11}}>Demo Score</span><span style={{color:handledObjections.size/Math.max(demoObjections.length,1)>=0.8?'#16a34a':handledObjections.size/Math.max(demoObjections.length,1)>=0.5?'#F97316':'#ef4444',fontSize:11,fontWeight:700}}>{Math.round(handledObjections.size/Math.max(demoObjections.length,1)*100)}%</span></div><div style={{height:4,background:'#1e293b',borderRadius:2,overflow:'hidden'}}><div style={{height:'100%',width:`${Math.round(handledObjections.size/Math.max(demoObjections.length,1)*100)}%`,background:handledObjections.size/Math.max(demoObjections.length,1)>=0.8?'#16a34a':handledObjections.size/Math.max(demoObjections.length,1)>=0.5?'#F97316':'#ef4444',borderRadius:2,transition:'width 0.4s'}}/></div></div>)}
          </div>
        </div>):(
        /* DISCOVERY: fake video call */
        <div style={{flex:1,display:'flex',flexDirection:'column',background:'#0a0f1a',position:'relative',overflow:'hidden'}}>
          <style>{`
            @keyframes pingRing{0%{transform:scale(1);opacity:0.8}100%{transform:scale(1.6);opacity:0}}
            @keyframes soundBar{from{transform:scaleY(0.3)}to{transform:scaleY(1)}}
            @keyframes avatarGlow{0%,100%{box-shadow:0 0 20px rgba(99,102,241,0.3)}50%{box-shadow:0 0 55px rgba(99,102,241,0.75)}}
          `}</style>
          <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',position:'relative',background:'linear-gradient(160deg,#0d1a2e 0%,#0a0f1a 60%,#111827 100%)'}}>
            {isPersonaSpeaking&&(<>
              <div style={{position:'absolute',width:215,height:215,borderRadius:'50%',border:'2px solid rgba(99,102,241,0.5)',animation:'pingRing 1.3s ease-out infinite',pointerEvents:'none'}}/>
              <div style={{position:'absolute',width:195,height:195,borderRadius:'50%',border:'2px solid rgba(99,102,241,0.3)',animation:'pingRing 1.3s ease-out 0.22s infinite',pointerEvents:'none'}}/>
            </>)}
            <div style={{width:140,height:140,borderRadius:'50%',userSelect:'none',background:isPersonaSpeaking?'linear-gradient(135deg,#6366f1,#8b5cf6)':'linear-gradient(135deg,#334155,#475569)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:50,fontWeight:800,color:'#fff',transition:'all 0.3s ease',transform:isPersonaSpeaking?'scale(1.07)':'scale(1)',animation:isPersonaSpeaking?'avatarGlow 1.6s ease-in-out infinite':'none',boxShadow:isPersonaSpeaking?'0 0 40px rgba(99,102,241,0.5)':'0 4px 24px rgba(0,0,0,0.5)'}}>
              <img src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${activeSession.persona_id||activeSession.persona_name||'x'}`} style={{width:'100%',height:'100%',borderRadius:'50%',objectFit:'cover'}} alt="" onError={e=>{e.target.style.display='none'}}/>
            </div>
            {isPersonaSpeaking&&(
              <div style={{position:'absolute',bottom:96,left:'50%',transform:'translateX(-50%)',background:'rgba(0,0,0,0.75)',backdropFilter:'blur(8px)',padding:'8px 18px',borderRadius:20,display:'flex',alignItems:'center',gap:8}}>
                <div style={{display:'flex',gap:3,alignItems:'center',height:24}}>
                  {[0,1,2,3,4].map(b=>(<div key={b} style={{width:3,borderRadius:3,background:'linear-gradient(180deg,#a5b4fc,#6366f1)',animation:`soundBar 0.6s ease-in-out ${b*0.1}s infinite alternate`,height:[14,22,18,26,12][b]}}/>))}
                </div>
                <span style={{color:'#c7d2fe',fontSize:13,fontWeight:500}}>Speaking</span>
              </div>
            )}
            <div style={{position:'absolute',bottom:20,left:20,background:'rgba(0,0,0,0.65)',backdropFilter:'blur(6px)',padding:'8px 14px',borderRadius:10}}>
              <div style={{color:'#f1f5f9',fontWeight:700,fontSize:15,display:'flex',alignItems:'center',gap:8}}>
                {activeSession.persona_name}
                {isPersonaSpeaking&&<div style={{width:8,height:8,borderRadius:'50%',background:'#6366f1',boxShadow:'0 0 6px #6366f1'}}/>}
              </div>
              <div style={{color:'#94a3b8',fontSize:12,marginTop:2}}>{activeSession.company_name}</div>
            </div>
            <div style={{position:'absolute',bottom:20,right:20,width:168,height:100,background:'#111827',borderRadius:12,border:'2px solid #1e293b',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:4,boxShadow:'0 4px 20px rgba(0,0,0,0.6)'}}>
              <div style={{fontSize:26}}>ÃÂ°ÃÂÃÂ¤ÃÂ«</div>
              <span style={{color:'#475569',fontSize:11}}>Camera off ÃÂÃÂ· You</span>
            </div>
          </div>
          <div style={{background:'rgba(10,15,26,0.96)',backdropFilter:'blur(16px)',padding:'16px 0 20px',display:'flex',alignItems:'center',justifyContent:'center',gap:20,borderTop:'1px solid rgba(30,41,59,0.6)'}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
              <button style={{width:52,height:52,borderRadius:'50%',border:'none',background:'#1e293b',color:'#94a3b8',fontSize:20,cursor:'default',display:'flex',alignItems:'center',justifyContent:'center'}}>ÃÂ°ÃÂÃÂÃÂÃÂ¯ÃÂ¸ÃÂ</button>
              <span style={{color:'#475569',fontSize:10}}>Mute</span>
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
              <button style={{width:52,height:52,borderRadius:'50%',border:'none',background:'#1e293b',color:'#94a3b8',fontSize:20,cursor:'default',display:'flex',alignItems:'center',justifyContent:'center'}}>ÃÂ°ÃÂÃÂÃÂ·</button>
              <span style={{color:'#475569',fontSize:10}}>Camera</span>
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
              <button onClick={handleCloseSession} style={{width:64,height:52,borderRadius:28,border:'none',background:'#dc2626',color:'#fff',fontSize:20,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>ÃÂ°ÃÂÃÂÃÂµ</button>
              <span style={{color:'#ef4444',fontSize:10}}>End Call</span>
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
              <button style={{width:52,height:52,borderRadius:'50%',border:'none',background:'#1e293b',color:'#94a3b8',fontSize:20,cursor:'default',display:'flex',alignItems:'center',justifyContent:'center'}}>ÃÂ¢ÃÂÃÂ®</button>
              <span style={{color:'#475569',fontSize:10}}>More</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )}
      
  {midCallBooking&&(
    <div style={{position:'fixed',bottom:24,right:24,zIndex:1001,background:'#1e293b',border:'1px solid #6366f1',borderRadius:12,padding:'16px 20px',maxWidth:320,boxShadow:'0 8px 32px rgba(0,0,0,0.5)'}}>
      <div style={{color:'#f1f5f9',fontWeight:700,marginBottom:6,fontSize:14}}>ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Prospect wants to schedule</div>
      <div style={{color:'#4A6B8A',fontSize:13,marginBottom:12}}>{midCallBooking.persona_name} mentioned booking a follow-up.</div>
      <div style={{display:'flex',gap:8}}>
        <button onClick={()=>{handleOpenBooking(allEmps.find(p=>p.id===midCallBooking.persona_id),midCallBooking.call_type);setMidCallBooking(null);}} style={{flex:1,padding:'7px 0',borderRadius:8,border:'none',background:'#6366f1',color:'#fff',cursor:'pointer',fontWeight:600,fontSize:13}}>Book Now</button>
        <button onClick={()=>setMidCallBooking(null)} style={{padding:'7px 12px',borderRadius:8,border:'1px solid #334155',background:'transparent',color:'#7A9CC4',cursor:'pointer',fontSize:13}}>Dismiss</button>
      </div>
    </div>
  )}
      {/* TOP NAV */}
      <div className="bg-[#070C18]/95 border-b border-[#1B3154] px-6 py-2.5 flex items-center justify-between sticky top-0 z-40 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-6">
          <div>
            <span className="font-bold text-[#F8FAFC] text-xl tracking-tight">RepForge</span>
            <span className="ml-2 px-2 py-0.5 bg-[#0EA5E9]/10 text-[#38BDF8] text-xs font-medium rounded-full border border-[#0EA5E9]/20 tracking-wide">Sales Training Platform</span>
          </div>
          <div className="flex items-center gap-1">
            {navBtn("crm","CRM","ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¢",0)}
            {navBtn("email","Email","ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ",inbox.length)}
            {navBtn("prolink","ProLink","ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ",pendingConnections)}
            {navBtn("score","Scorecard","ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ",meetingsBooked>0?meetingsBooked:0)}
{navBtn("pipeline","Pipeline","ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ",deals.length)}
            {navBtn("scheduled","Calls","ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ",scheduledCalls.filter(c=>c.status==='upcoming').length)}
            {navBtn("inbox","Inbox","ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¬",personaMessages.filter(m=>!m.is_read).length)}
            {navBtn("agentlab","Agent Lab","Ã°ÂÂ¤Â",0)}
                    </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-[#7A9CC4] hover:text-[#38BDF8]">Day <span className="font-bold text-[#D4E5FF]">{simDay}</span><span className="text-[#4A6B8A]"> / {SIM_LENGTH}</span></div>
          {!simComplete ? (
            <><button onClick={advanceDay} className="bg-amber-500 hover:bg-amber-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ© Advance Day</button>              <button onClick={() => setShowSettings(true)} className={`px-3 py-1.5 rounded-lg font-medium text-xs flex items-center gap-1 transition-colors ${apiKey ? "bg-emerald-700 text-white hover:bg-emerald-600" : "bg-red-600 text-white hover:bg-red-500 animate-pulse"}`}>ÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ {apiKey ? "AI On" : "Add AI Key"}</button></>
          ) : (
            <button onClick={() => setTab("score")} className="bg-[#0EA5E9] text-white text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ View Final Score</button>
          )}
          <button onClick={()=>setShowProdSetup(true)} style={{fontSize:'11px',padding:'4px 10px',background:product?'#4F46E5':'#dc2626',color:'white',border:'none',borderRadius:'6px',cursor:'pointer',fontWeight:'600',whiteSpace:'nowrap'}}>{product?'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¦ '+product.product_name.substring(0,18):'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ ÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ Setup Product'}</button><button onClick={handleLogout} style={{fontSize:'11px',padding:'4px 10px',background:'#f1f5f9',color:'#475569',border:'1px solid #1B3154',borderRadius:'6px',cursor:'pointer',whiteSpace:'nowrap'}}>{user?user.email.split('@')[0]+' ÃÂÃÂÃÂÃÂ· Logout':'Logout'}</button>
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
                <div><h1 className="text-lg font-bold text-[#F8FAFC]">Target Accounts</h1><p className="text-[#7A9CC4] text-sm">20 accounts. Click to begin prospecting.</p></div>
                <div className="flex gap-1.5 flex-wrap">
                  {industries.map(ind => (
                    <button key={ind} onClick={() => setFilterInd(ind)} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${filterInd===ind ? "bg-[#0EA5E9] text-white" : "bg-[#E4E1D8] text-[#38BDF8] hover:bg-[#D4D0C6]"}`}>{ind}</button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {companies.filter(c => filterInd==="All" || c.industry===filterInd).map(c => {
                  const emps = allEmployees[c.id]||[];
                  const replied = emps.filter(e => state[e.id]?.emailStatus==="replied" || state[e.id]?.linkedinStatus==="connected").length;
                  const contacted = emps.filter(e => state[e.id]?.emailStatus!=="none" || state[e.id]?.calls>0 || state[e.id]?.linkedinStatus!=="none").length;
                  return (
                    <div key={c.id} onClick={() => { setSelCompany(c); fetchSupabase('allEmps?company_id=eq.' + c.id + '&select=id,first_name,last_name,pain_points,goals,challenges,buying_role,budget_authority').then(d => { if(d){ const m={}; d.forEach(p=>{m[p.id]=p;}); setIntelData(m); setExpandedIntel(null); } }); setCrmView("company"); }} className="bg-[#0D1525] rounded-xl border border-[#1B3154] p-4 cursor-pointer hover:border-[#0EA5E9] hover:shadow-md transition-all group">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${getAvatarColor(c.id)}`}>{c.name.slice(0,2).toUpperCase()}</div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sizeColors[c.size]}`}>{c.size}</span>
                      </div>
                      <div className="font-bold text-[#F8FAFC] group-hover:text-[#38BDF8] mb-0.5">{c.name}</div>
                      <div className="text-[#7A9CC4] text-xs mb-2 line-clamp-2">{c.description}</div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${industryColors[c.industry]||"bg-gray-100 text-[#7A9CC4]"}`}>{c.industry}</span>
                        <span className="text-[#4A6B8A] text-xs">{c.location}</span>
                      </div>
                                            <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ° ${(c.dealValue||0).toLocaleString()}</span>
                        <span className="text-xs text-[#4A6B8A]">{c.size} target</span>
                      </div>
                      <div className="border-t border-[#152840] pt-2">
                        <div className="flex justify-between text-xs text-[#7A9CC4] mb-1">
                          <span>{emps.length} contacts</span>
                          <span className={replied>0?"text-green-600 font-medium":""}>{replied} responded</span>
                        </div>
                        <div className="bg-[#E4E1D8] rounded-full h-1"><div className="bg-[#0EA5E9] h-1 rounded-full" style={{width:`${emps.length>0?(contacted/emps.length)*100:0}%`}}></div></div>
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
                <button onClick={() => { setCrmView("accounts"); setSelCompany(null); }} className="text-[#38BDF8] hover:underline font-medium">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Accounts</button>
                <span className="text-gray-300">/</span>
                <span className="font-semibold text-[#A8BFDB]">{selCompany.name}</span>
              </div>
              <div className="bg-[#0D1525] rounded-xl border border-[#1B3154] p-5 mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg ${getAvatarColor(selCompany.id)}`}>{selCompany.name.slice(0,2).toUpperCase()}</div>
                  <div>
                    <div className="font-bold text-xl text-[#F8FAFC]">{selCompany.name}</div>
                    <div className="text-[#7A9CC4] text-sm">{selCompany.description}</div>
                    <div className="flex gap-2 mt-1.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${industryColors[selCompany.industry]||""}`}>{selCompany.industry}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sizeColors[selCompany.size]}`}>{selCompany.size}</span>
                      <span className="text-[#4A6B8A] text-xs">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ {selCompany.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#0D1525] rounded-xl border border-[#1B3154] overflow-hidden">
                <table className="w-full">
                  <thead><tr className="bg-[#FFFFFF] border-b border-[#1B3154] text-xs font-medium text-[#38BDF8] uppercase tracking-wide">
                    <th className="text-left px-4 py-2.5">Name</th><th className="text-left px-4 py-2.5">Title</th><th className="text-left px-4 py-2.5">Seniority</th>
                    <th className="text-left px-4 py-2.5">Phone</th><th className="text-left px-4 py-2.5">Email</th><th className="text-left px-4 py-2.5">Email Status</th><th className="text-left px-4 py-2.5">ProLink</th><th className="px-4 py-2.5">Actions</th>
                  </tr></thead>
                  <tbody>
                    {(allEmployees[selCompany.id]||[]).map(emp => {
                      const cs = state[emp.id];
                      return (
                        <tr key={emp.id} className="border-b border-[#EEEEF4] hover:bg-[#EDF5EE] cursor-pointer" onClick={() => { setSelEmp(emp); setCrmView("employee"); }}>
                          <td className="px-4 py-3"><div className="flex items-center gap-2">
                            <div className="relative w-8 h-8 flex-shrink-0"><img src={getPersonaPhoto(emp.id)} alt="" className="w-8 h-8 rounded-full object-cover absolute inset-0" onError={e=>{e.target.style.display="none";}} /><div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${getAvatarColor(emp.id)}`}>{getInitials(emp)}</div></div>
                            <span className="font-medium text-[#D4E5FF] text-sm">{emp.first} {emp.last}</span>
                          </div></td>
                          <td className="px-4 py-3 text-[#7A9CC4] text-sm">{emp.title}</td>
                          <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${seniorityColors[emp.seniority]}`}>{seniorityLabels[emp.seniority]}</span></td>
                          <td className="px-4 py-3 text-[#4A6B8A] text-xs font-mono">{getPhone(emp)}</td>
                          <td className="px-4 py-3 text-[#4A6B8A] text-xs">{getEmail(emp, selCompany)}</td>
                          <td className="px-4 py-3">
                            {cs.emailStatus==="none" && <span className="text-xs text-[#4A6B8A]">Not contacted</span>}
                            {cs.emailStatus==="sent" && <span className="text-xs text-[#FBBF24] font-medium">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ³ Awaiting reply</span>}
                            {cs.emailStatus==="replied" && <span className="text-xs text-green-600 font-medium">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Replied</span>}
                          </td>
                          <td className="px-4 py-3">
                            {cs.linkedinStatus==="none" && <span className="text-xs text-[#4A6B8A]">Not connected</span>}
                            {cs.linkedinStatus==="pending" && <span className="text-xs text-[#FBBF24] font-medium">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ³ Pending</span>}
                            {cs.linkedinStatus==="connected" && <span className="text-xs text-blue-600 font-medium">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Connected</span>}
                            {cs.linkedinStatus==="ignored" && <span className="text-xs text-red-400">Ignored</span>}
                          </td>
                          <td className="px-4 py-3" onClick={e=>e.stopPropagation()}>
                            <div className="flex gap-1.5">
                              <button onClick={() => initiateCall(emp)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1.5 rounded-lg font-medium">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Call</button>
                              <button onClick={() => { setEmailCompose({emp, company:selCompany}); setEmailDraft({subject:"",body:""}); }} className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-xs px-3 py-1.5 rounded-lg font-medium">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Email</button>
                              <button onClick={() => { setPlProfile(emp); setTab("prolink"); setPlView("profile"); }} className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-xs px-3 py-1.5 rounded-lg font-medium">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Profile</button>
                              <button onClick={() => activeCallId === emp.id ? endCall() : handleStartCallWithDeal(emp, selCompany)} disabled={activeCallId !== null && activeCallId !== emp.id} style={{marginLeft:'6px',padding:'4px 12px',borderRadius:'6px',border:'none',cursor:'pointer',fontSize:'13px',fontWeight:'600',background:activeCallId===emp.id?(callStatus==='active'?'#ef4444':'#f97316'):'#7c3aed',color:'white',opacity:activeCallId!==null&&activeCallId!==emp.id?0.4:1}}>{activeCallId === emp.id ? (callStatus === 'connecting' ? 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Connecting...' : 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ´ End Call') : 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ AI Call'}</button><button onClick={()=>handleOpenBooking(allEmps.find(p=>p.id===emp.id),'discovery')} style={{marginLeft:6,padding:'4px 10px',borderRadius:6,border:'none',background:'#334155',color:'#818cf8',cursor:'pointer',fontSize:11,fontWeight:600}}>ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Book</button>
                              <button onClick={() => setExpandedIntel(expandedIntel === emp.id ? null : emp.id)} style={{marginLeft:'6px',padding:'4px 10px',borderRadius:'6px',border:'1px solid #1B3154',cursor:'pointer',fontSize:'12px',fontWeight:'600',background:expandedIntel===emp.id?'#eff6ff':'#f8fafc',color:'#7C3AED'}}>ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Intel</button>
                            </div>
                          {expandedIntel === emp.id && intelData[emp.id] && (
                            <div style={{marginTop:'8px',padding:'14px 16px',background:'#0A1020',border:'1px solid #1B3154',borderRadius:'8px',fontSize:'13px',lineHeight:'1.5'}}>
                              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>
                                <div><div style={{color:'#dc2626',fontWeight:'700',fontSize:'11px',textTransform:'uppercase',marginBottom:'4px'}}>ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ  Pain Points</div><ul style={{margin:0,paddingLeft:'16px',color:'#D4E5FF'}}>{(intelData[emp.id].pain_points||[]).map((p,i)=><li key={i}>{p}</li>)}</ul></div>
                                <div><div style={{color:'#10B981',fontWeight:'700',fontSize:'11px',textTransform:'uppercase',marginBottom:'4px'}}>ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¯ Goals</div><ul style={{margin:0,paddingLeft:'16px',color:'#D4E5FF'}}>{(intelData[emp.id].goals||[]).map((g,i)=><li key={i}>{g}</li>)}</ul></div>
                                <div><div style={{color:'#7c3aed',fontWeight:'700',fontSize:'11px',textTransform:'uppercase',marginBottom:'4px'}}>ÃÂÃÂ°ÃÂÃÂÃÂÃÂ§ÃÂÃÂ© Challenges</div><ul style={{margin:0,paddingLeft:'16px',color:'#D4E5FF'}}>{(intelData[emp.id].challenges||[]).map((ch,i)=><li key={i}>{ch}</li>)}</ul></div>
                                <div><div style={{color:'#0369a1',fontWeight:'700',fontSize:'11px',textTransform:'uppercase',marginBottom:'4px'}}>ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¼ Buying Role</div><p style={{margin:'4px 0 0',color:'#D4E5FF'}}>{(intelData[emp.id].buying_role||'').replace(/_/g,' ').replace(/\b\w/g,x=>x.toUpperCase())} {intelData[emp.id].budget_authority?'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ':'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ'} Budget Auth</p></div>
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
                <button onClick={() => { setCrmView("accounts"); setSelCompany(null); setSelEmp(null); }} className="text-[#38BDF8] hover:underline font-medium">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Accounts</button>
                <span className="text-gray-300">/</span>
                <button onClick={() => { setCrmView("company"); setSelEmp(null); }} className="text-[#38BDF8] hover:underline font-medium">{selCompany.name}</button>
                <span className="text-gray-300">/</span>
                <span className="font-semibold text-[#A8BFDB]">{selEmp.first} {selEmp.last}</span>
              </div>
              <div className="flex gap-5">
                <div className="w-64 flex-shrink-0 space-y-4">
                  <div className="bg-[#0D1525] rounded-xl border border-[#1B3154] p-4 text-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2 ${getAvatarColor(selEmp.id)}`}>{getInitials(selEmp)}</div>
                    <div className="font-bold text-[#F8FAFC]">{selEmp.first} {selEmp.last}</div>
                    <div className="text-[#7A9CC4] text-sm">{selEmp.title}</div>
                    <div className="text-[#4A6B8A] text-xs">{selCompany.name}</div>
                    <span className={`mt-2 inline-block text-xs px-2 py-0.5 rounded-full font-medium ${seniorityColors[selEmp.seniority]}`}>{seniorityLabels[selEmp.seniority]}</span>
                    <div className="text-xs text-[#7A9CC4] mt-1">
                      {state[selEmp.id] && (
                        <span className="ml-2 text-[#4A6B8A]">
                          ÃÂÃÂÃÂÃÂ· {state[selEmp.id].emailCount || 0} email{(state[selEmp.id].emailCount||0)!==1?'s':''} ÃÂÃÂÃÂÃÂ· {state[selEmp.id].calls || 0} call{(state[selEmp.id].calls||0)!==1?'s':''}
                        </span>
                      )}
                    </div>
                    <div className="mt-3 space-y-1 text-xs text-[#7A9CC4] text-left border-t border-[#152840] pt-3">
                      <div>ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ {getPhone(selEmp)}</div>
                      <div>ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ {getEmail(selEmp, selCompany)}</div>
                      {(state[selEmp.id]?.calls||0) > 0 && <div className="text-[#38BDF8] font-medium pt-1">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ {state[selEmp.id].calls} call{state[selEmp.id].calls>1?"s":""} logged</div>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => initiateCall(selEmp)} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-2 text-sm font-medium">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Call {selEmp.first}</button>
                    <button onClick={() => { setEmailCompose({emp:selEmp, company:selCompany}); setEmailDraft({subject:"",body:""}); }} className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white rounded-lg py-2 text-sm font-medium">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Email {selEmp.first}</button>
                    <button onClick={() => { setPlProfile(selEmp); setTab("prolink"); setPlView("profile"); }} className="bg-[#2A5A3A] hover:bg-[#0EA5E9] text-white rounded-lg py-2 text-sm font-medium">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ View ProLink Profile</button>
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
                  <div className="bg-[#0D1525] rounded-xl border border-[#1B3154] overflow-hidden">
                    
{/* Buying Committee Panel */}
{selEmp&&state[selEmp.id]&&['Legal Review','Procurement'].includes(state[selEmp.id].stage)&&(()=>{
              const acct=selEmp.accountId;const stage=state[selEmp.id].stage;const contacts=[];
              if(getLegalStakeholder){const l=getLegalStakeholder(acct);if(l)contacts.push(l);}
              if(getProcurementStakeholder&&stage==='Procurement'){const p=getProcurementStakeholder(acct);if(p)contacts.push(p);}
              if(!contacts.length)return null;
              return(<div style={{margin:'0 0 16px',padding:'12px 16px',background:'#0a1628',borderRadius:8,border:'1px solid #1B3154'}}>
                <div style={{fontSize:11,fontWeight:700,color:'#8B9CBB',letterSpacing:'0.08em',marginBottom:10,textTransform:'uppercase'}}>Buying Committee</div>
                {contacts.map(c=>(<div key={c.id} style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                  <div style={{width:36,height:36,borderRadius:'50%',background:'#1B3154',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:700,color:'#A8BFDB',flexShrink:0}}>{c.name?(c.name.split(' ').map(n=>n[0]).join('').slice(0,2)):'?'}</div>
                  <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:600,color:'#e2e8f0'}}>{c.name}</div><div style={{fontSize:11,color:'#6b7280'}}>{c.role}</div></div>
                  <div style={{display:'flex',gap:6,alignItems:'center'}}><span style={{fontSize:10,padding:'2px 7px',borderRadius:4,background:'#1B3154',color:'#8B9CBB'}}>{c.department||'Legal'}</span><button onClick={()=>setEmailCompose(c)} style={{fontSize:11,padding:'4px 10px',borderRadius:6,background:'#2563eb',color:'white',cursor:'pointer',fontWeight:500}}>Email</button></div>
                </div>))}
                {emailCompose&&(<div style={{marginTop:12,padding:'12px',background:'#0D1525',borderRadius:8,border:'1px solid #1B3154'}}>
                  <div style={{fontSize:11,color:'#6b7280',marginBottom:6}}>{emailCompose.name} · {emailCompose.role}</div>
                  <textarea value={emailDraft&&emailDraft.body||''} onChange={e=>setEmailDraft({subject:emailDraft&&emailDraft.subject||'',body:e.target.value})} style={{width:'100%',minHeight:80,background:'#0a1628',border:'1px solid #1B3154',borderRadius:6,color:'#e2e8f0',fontSize:13,padding:8,resize:'vertical',boxSizing:'border-box'}} placeholder="Write your email..."/>
                  <div style={{display:'flex',gap:8,marginTop:8,justifyContent:'flex-end'}}>
                    <button onClick={()=>{setEmailCompose(null);setEmailDraft({subject:'',body:''});}} style={{fontSize:12,padding:'5px 12px',borderRadius:6,background:'#1B3154',color:'#A8BFDB',cursor:'pointer'}}>Cancel</button>
                    <button onClick={()=>{const st=emailCompose;const body=emailDraft&&emailDraft.body||'';const stg=state[selEmp.id]&&state[selEmp.id].stage;const url=stg==='Procurement'?'/api/procurement-reply':'/api/legal-reply';fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({personaName:st.name,personaRole:st.role,companyName:(selEmp&&selEmp.account)||'',dealStage:stg||'',threadContext:[],userMessage:body})}).then(r=>r.json()).then(d=>{setState(prev=>({...prev,[selEmp.id]:{...prev[selEmp.id],emailThread:[...(prev[selEmp.id]?.emailThread||[]),{from:'rep',subject:emailDraft&&emailDraft.subject||'',body,day:simDay},{from:st.name,body:d.reply||d.message||'',day:simDay}]}}));setEmailDraft({subject:'',body:''});setEmailCompose(null);}).catch(e=>console.error('stakeholder err',e));}} style={{fontSize:12,padding:'5px 14px',borderRadius:6,background:'#2563eb',color:'white',cursor:'pointer',fontWeight:600}}>Send</button>
                  </div>
                </div>)}
              </div>);
            })()}
                    {selEmp && (()=>{
                      const empDeal = deals.find(d => d.persona_name === selEmp.first + ' ' + selEmp.last)|| {id:'demo-'+Date.now(),persona_name:selEmp.first+' '+selEmp.last,company_name:selCompany?.name||'',stage:'Proposal',updated_at:new Date().toISOString()};
                      if (!empDeal) return null;
                      const co = companies.find(c => c.name === empDeal.company_name);
                      const dv = co ? co.dealValue : 25000;
                      const ps = proposalState[empDeal.id] || {};
                      if (empDeal.stage === 'Closed Won') return (
                        <div style={{background:'#052e16',border:'1px solid #16a34a',borderRadius:10,padding:'12px 16px',marginTop:8,display:'flex',alignItems:'center',gap:10}}>
                          <span style={{fontSize:22}}>&#127942;</span>
                          <div>
                            <div style={{color:'#22c55e',fontWeight:700,fontSize:14}}>CLOSED WON</div>
                            <div style={{color:'#4ade80',fontSize:12}}>${(Math.round(dv*(1-(ps.discount||0)/100))).toLocaleString()} ARR/yr</div>
                          </div>
                        </div>
                      );
                      return (
                        <div style={{background:'#0D1525',border:'1px solid #1B3154',borderRadius:10,padding:12,marginTop:8}}>
                          <div style={{fontSize:11,fontWeight:700,color:'#4A6B8A',textTransform:'uppercase',letterSpacing:1,marginBottom:10}}>Close This Deal</div>
                          {!ps.proposalSent ? (
                            <button disabled={closeLoading} onClick={async ()=>{
                              setCloseLoading(true);
                              try {
                                const r = await fetch('/api/proposal-reply',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({personaName:selEmp.first+' '+selEmp.last,personaRole:selEmp.seniority||'Executive',companyName:empDeal.company_name||'',dealValue:dv,discount:0,userMessage:'Sending proposal for '+empDeal.company_name})});
                                const dat = await r.json();
                                setProposalState(p=>({...p,[empDeal.id]:{proposalSent:true,reply:dat.reply||'Thanks, will review.',discount:0}}));
                              } catch(e) {
                                setProposalState(p=>({...p,[empDeal.id]:{proposalSent:true,reply:'Thanks, will review.',discount:0}}));
                              }
                              setCloseLoading(false);
                            }} style={{width:'100%',padding:'8px 0',background:closeLoading?'#374151':'#1e40af',color:'#fff',border:'none',borderRadius:6,cursor:'pointer',fontWeight:700,fontSize:13}}>
                              {closeLoading ? 'Sending...' : 'Send Proposal - $'+dv.toLocaleString()+'/yr'}
                            </button>
                          ) : (
                            <div>
                              <div style={{background:'#060e1e',borderRadius:6,padding:'8px 10px',fontSize:11,color:'#94a3b8',marginBottom:10,lineHeight:1.5,border:'1px solid #1B3154'}}>{ps.reply}</div>
                              <div style={{display:'flex',gap:6,marginBottom:10,flexWrap:'wrap',alignItems:'center'}}>
                                <span style={{fontSize:11,color:'#4A6B8A'}}>Discount:</span>
                                {[0,10,15,20].map(pct=>(
                                  <button key={pct} onClick={()=>setProposalState(p=>({...p,[empDeal.id]:{...p[empDeal.id],discount:pct}}))} style={{fontSize:11,padding:'3px 7px',background:ps.discount===pct?'#1e40af':'#1B3154',color:ps.discount===pct?'#fff':'#8BA5C2',border:'none',borderRadius:4,cursor:'pointer'}}>
                                    {pct===0?'List':pct+'%'}
                                  </button>
                                ))}
                                <span style={{fontSize:11,color:'#F8FAFC',marginLeft:4}}>${Math.round(dv*(1-(ps.discount||0)/100)).toLocaleString()}/yr</span>
                              </div>
                              {!ps.closeReply ? (
                                <button disabled={closeLoading} onClick={async ()=>{
                                  setCloseLoading(true);
                                  const price = Math.round(dv*(1-(ps.discount||0)/100));
                                  try {
                                    const r = await fetch('/api/close-reply',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({personaName:selEmp.first+' '+selEmp.last,personaRole:selEmp.seniority||'Executive',companyName:empDeal.company_name||'',finalPrice:price,userMessage:'Ready to sign at $'+price+'/year?'})});
                                    const dat = await r.json();
                                    setProposalState(p=>({...p,[empDeal.id]:{...p[empDeal.id],closeReply:dat.reply,closed:dat.closed}}));
                                    if(dat.closed) await handleMoveDeal(empDeal.id,'Closed Won');
                                  } catch(e) {
                                    setProposalState(p=>({...p,[empDeal.id]:{...p[empDeal.id],closeReply:'Need more time internally.',closed:false}}));
                                  }
                                  setCloseLoading(false);
                                }} style={{width:'100%',padding:'9px 0',background:closeLoading?'#374151':'#15803d',color:'#fff',border:'none',borderRadius:6,cursor:'pointer',fontWeight:700,fontSize:13}}>
                                  {closeLoading ? 'Closing...' : 'Ask for the Business'}
                                </button>
                              ) : (
                                <div>
                                  <div style={{background:ps.closed?'#052e16':'#1a0a0a',border:'1px solid '+(ps.closed?'#16a34a':'#7f1d1d'),borderRadius:6,padding:'8px 10px',fontSize:12,color:ps.closed?'#4ade80':'#f87171',lineHeight:1.5,marginBottom:6}}>{ps.closeReply}</div>
                                  {!ps.closed && <button onClick={()=>handleMoveDeal(empDeal.id,'Closed Lost')} style={{fontSize:11,padding:'4px 10px',background:'transparent',color:'#ef4444',border:'1px solid #7f1d1d',borderRadius:4,cursor:'pointer'}}>Mark Closed Lost</button>}
                                  {ps.closed && <button onClick={()=>setProposalState(p=>({...p,[empDeal.id]:{...p[empDeal.id],closeReply:null,closed:false}}))} style={{fontSize:11,padding:'4px 10px',background:'transparent',color:'#60a5fa',border:'1px solid #1e3a5f',borderRadius:4,cursor:'pointer'}}>Try Again</button>}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })()}
                    <div className="p-4 min-h-40 space-y-2">
                      {state[selEmp.id]?.emailThread.length === 0 ? (
                        <div className="text-center py-8 text-[#4A6B8A] text-sm">No emails sent yet. Email {selEmp.first} to start the conversation.</div>
                      ) : state[selEmp.id].emailThread.map((msg,i) => (
                        <div key={i} className={`p-3 rounded-lg text-xs leading-relaxed ${msg.from==="rep" ? "bg-[#EDF5EE] border border-[#B8D4BB] ml-8" : "bg-[#F2EFE8] border border-[#1B3154] mr-8"}`}>
                          <div className={`font-semibold mb-1 ${msg.from==="rep" ? "text-[#38BDF8]" : "text-[#D4E5FF]"}`}>{msg.from==="rep" ? "You" : `${selEmp.first} ${selEmp.last}`} ÃÂÃÂÃÂÃÂ· Day {msg.day}</div>
                          {msg.subject && <div className="font-medium text-[#A8BFDB] mb-0.5">Re: {msg.subject}</div>}
                          {msg.body}
                        </div>
                      ))}
                      {state[selEmp.id]?.emailStatus==="sent" && (
                        <div className="text-center py-2 text-xs text-[#FBBF24]">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ³ Email sent ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ reply expected around Day {state[selEmp.id].emailReplyDay || "?"}. Click Advance Day to progress.</div>)}
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
                }} disabled={aiEmailLoading[selEmp.id]} className="ml-2 bg-[#0EA5E9] hover:bg-[#0284C7] disabled:opacity-50 text-white text-xs px-3 py-1 rounded-full transition-colors">
                  {aiEmailLoading[selEmp.id] ? "ÃÂÃÂ°ÃÂÃÂÃÂÃÂ¤ÃÂÃÂ Writing..." : "ÃÂÃÂ°ÃÂÃÂÃÂÃÂ¤ÃÂÃÂ AI Reply Now"}
                </button>
              )}
                    </div>
                  </div>
                  {/* Call Log */}
                  {(state[selEmp.id]?.callLog||[]).length > 0 && (
                    <div className="bg-[#0D1525] rounded-xl border border-[#1B3154] overflow-hidden mt-4">
                      <div className="px-4 py-3 border-b border-[#152840] font-semibold text-[#A8BFDB] text-sm">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Call Log ({state[selEmp.id].callLog.length})</div>
                      <div className="divide-y divide-gray-50">
                        {state[selEmp.id].callLog.map((log, i) => (
                          <div key={i} className="px-4 py-3 flex items-start gap-3">
                            <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${log.outcome==="connected"?"bg-green-500":log.outcome==="voicemail"?"bg-yellow-400":log.outcome==="gatekeeper"?"bg-orange-400":"bg-gray-300"}`}></div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-xs font-semibold text-[#A8BFDB] capitalize">{log.outcome === "no-answer" ? "No Answer" : log.outcome}</span>
                                <span className="text-xs text-[#4A6B8A]">ÃÂÃÂÃÂÃÂ· Day {log.day}</span>
                              </div>
                              {log.note && <div className="text-xs text-[#7A9CC4] italic">"{log.note}"</div>}
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
          <div className="w-56 bg-[#0A1020] border-r border-[#1B3154] p-4">
            <button onClick={() => setEmailCompose({emp:null, company:null})} className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white rounded-lg py-2 text-sm font-medium mb-4">+ Compose</button>
            {[{id:"inbox",label:"Inbox",count:inbox.length},{id:"sent",label:"Sent",count:sent.length},{id:"pending",label:"Awaiting Reply",count:pending}].map(f => (
              <button key={f.id} onClick={() => setPlView(f.id)} className={`w-full text-left px-3 py-2 rounded-lg text-sm flex justify-between items-center mb-0.5 ${plView===f.id ? "bg-[#EDF5EE] text-[#38BDF8] font-medium" : "text-[#3A5A3A] hover:bg-[#EEF0FF]"}`}>
                {f.label} {f.count > 0 && <span className={`text-xs px-1.5 py-0.5 rounded-full ${plView===f.id ? "bg-[#C8DEC8] text-[#38BDF8]" : "bg-[#E2E5EA] text-[#3A5A3A]"}`}>{f.count}</span>}
              </button>
            ))}
          </div>
          <div className="flex-1 p-6 overflow-auto">
            {(plView==="inbox" || !plView) && (
              <>
                <h2 className="font-bold text-[#F8FAFC] mb-4">Inbox ({inbox.length})</h2>
                {inbox.length === 0 ? (
                  <div className="text-center py-16 text-[#4A6B8A]">
                    <div className="text-4xl mb-3">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¬</div>
                    <div>No replies yet. Send emails and advance the simulation day to receive responses.</div>
                    <div className="text-xs mt-2">Senior contacts take longer to reply. Some may not reply at all.</div>
                  </div>
                ) : inbox.map(({emp, company, thread}) => (
                  <div key={emp.id} className="bg-[#0D1525] rounded-xl border border-[#1B3154] p-4 mb-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${getAvatarColor(emp.id)}`}>{getInitials(emp)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div><span className="font-semibold text-[#D4E5FF]">{emp.first} {emp.last}</span><span className="text-[#4A6B8A] text-xs ml-2">{emp.title} ÃÂÃÂÃÂÃÂ· {company?.name}</span></div>
                          <span className="text-xs text-green-600 font-medium">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Replied</span>
                        </div>
                        <div className="mt-2 space-y-1.5">
                          {thread.map((msg,i) => (
                            <div key={i} className={`p-2.5 rounded-lg text-xs leading-relaxed ${msg.from==="rep" ? "bg-[#EDF5EE] border border-[#B8D4BB] ml-6" : "bg-[#F2EFE8] border border-[#1B3154] mr-6"}`}>
                              <div className={`font-semibold mb-0.5 ${msg.from==="rep" ? "text-[#38BDF8]" : "text-[#D4E5FF]"}`}>{msg.from==="rep" ? "You" : emp.first} ÃÂÃÂÃÂÃÂ· Day {msg.day}</div>
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
                <h2 className="font-bold text-[#F8FAFC] mb-4">Sent ({sent.length})</h2>
                {sent.length === 0 ? <div className="text-center py-16 text-[#4A6B8A]"><div className="text-4xl mb-3">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¤</div><div>No emails sent yet.</div></div>
                : sent.map(({emp, company, thread}) => (
                  <div key={emp.id} className="bg-[#0D1525] rounded-xl border border-[#1B3154] p-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${getAvatarColor(emp.id)}`}>{getInitials(emp)}</div>
                      <div className="flex-1">
                        <div className="font-medium text-[#D4E5FF] text-sm">{emp.first} {emp.last} <span className="text-[#4A6B8A] font-normal">ÃÂÃÂÃÂÃÂ· {company?.name}</span></div>
                        <div className="text-[#7A9CC4] text-xs">{thread[0]?.body?.slice(0,80)}...</div>
                      </div>
                      <div>
                        {state[emp.id]?.emailStatus==="replied" ? <span className="text-xs text-green-600 font-medium">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Replied</span> : <span className="text-xs text-[#FBBF24]">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ³ Awaiting</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
            {plView === "pending" && (
              <>
                <h2 className="font-bold text-[#F8FAFC] mb-4">Awaiting Reply ({pending})</h2>
                <div className="bg-[#1A1200] border border-[#3D2D00] rounded-lg p-3 text-xs text-[#FDE68A] mb-4">
                  ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ© Hit <strong>Advance Day</strong> in the top bar to progress the simulation and trigger replies. Senior contacts take longer ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ a C-suite contact may take 5+ days to respond.
                </div>
                {allEmps.filter(e => state[e.id]?.emailStatus==="sent").map(emp => {
                  const company = getCompanyForEmp(emp.id);
                  const cs = state[emp.id];
                  return (
                    <div key={emp.id} className="bg-[#0D1525] rounded-xl border border-[#1B3154] p-3 mb-2 flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${getAvatarColor(emp.id)}`}>{getInitials(emp)}</div>
                      <div className="flex-1">
                        <div className="font-medium text-[#D4E5FF] text-sm">{emp.first} {emp.last} <span className="text-[#4A6B8A] font-normal">ÃÂÃÂÃÂÃÂ· {company?.name}</span></div>
                        <div className="text-[#4A6B8A] text-xs">{seniorityLabels[emp.seniority]} ÃÂÃÂÃÂÃÂ· Sent Day {cs.emailThread[0]?.day}</div>
                      </div>
                      <div className="text-xs text-[#FBBF24]">Expected ~Day {cs.emailReplyDay || "?"}</div>
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
          <div className="w-56 bg-[#0A1020] border-r border-[#1B3154] p-4 flex flex-col gap-1">
            <div className="px-3 py-2 mb-2">
              <div className="font-bold text-[#38BDF8] text-lg">ProLink</div>
              <div className="text-[#4A6A4A] text-xs">Professional Network</div>
            </div>
            {[{id:"feed",icon:"ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ ",label:"Home Feed"},{id:"network",icon:"ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¥",label:`Network ${pendingConnections>0?"("+pendingConnections+" pending)":""}`},{id:"search",icon:"ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ",label:"Search People"},{id:"messages",icon:"ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¬",label:`Messages ${connections.length>0?"("+connections.length+")":""}` }].map(v => (
              <button key={v.id} onClick={() => setPlView(v.id)} className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${plView===v.id ? "bg-[#EDF5EE] text-[#38BDF8] font-medium" : "text-[#3A5A3A] hover:bg-[#EEF0FF]"}`}>{v.icon} {v.label}</button>
            ))}
          </div>

          {/* ProLink main content */}
          <div className="flex-1 max-w-2xl mx-auto p-6">

            {/* FEED */}
            {plView === "feed" && (
              <div className="space-y-4">
                <div className="bg-[#0D1525] rounded-xl border border-[#1B3154] p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0EA5E9] flex items-center justify-center text-white font-bold text-sm">JD</div>
                  <div className="flex-1 bg-[#FFFFFF] rounded-full px-4 py-2 text-[#7A8A7A] text-sm cursor-text">Share something with your network...</div>
                </div>
                {feedPosts.map(({emp, company, post, id}) => {
                  const cs = state[emp.id];
                  return (
                    <div key={id} className="bg-[#0D1525] rounded-xl border border-[#1B3154] p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(emp.first+emp.last)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&radius=50`} alt={`${emp.first} ${emp.last}`} className="w-10 h-10 rounded-full flex-shrink-0 ring-2 ring-white shadow-sm" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <button onClick={() => { setPlProfile(emp); setPlView("profile"); }} className="font-semibold text-[#F8FAFC] hover:text-blue-600 hover:underline text-sm">{emp.first} {emp.last}</button>
                              <div className="text-[#7A9CC4] text-xs">{emp.title} ÃÂÃÂÃÂÃÂ· {company?.name} <span className="text-[#4A6B8A]">ÃÂÃÂÃÂÃÂ· {post.time}</span></div>
                            </div>
                            <div>
                              {cs.linkedinStatus === "none" && <button onClick={() => sendLinkedinConnect(emp)} className="text-[#38BDF8] border border-[#0EA5E9] text-xs px-3 py-1 rounded-full hover:bg-[#EDF5EE] transition-colors">+ Connect</button>}
                              {cs.linkedinStatus === "pending" && <span className="text-[#FBBF24] text-xs px-3 py-1 rounded-full border border-yellow-200 bg-[#1A1200]">Pending</span>}
                              {cs.linkedinStatus === "connected" && <span className="text-green-600 text-xs px-3 py-1 rounded-full border border-green-200 bg-green-50">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Connected</span>}
                              {cs.linkedinStatus === "ignored" && <span className="text-[#4A6B8A] text-xs">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        {post.type === 'signal' && <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full font-semibold mb-2 bg-amber-50 text-amber-700 border border-amber-200">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Buying Signal</span>}
                        {post.type === 'challenge' && <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full font-semibold mb-2 bg-rose-50 text-rose-700 border border-rose-200">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ ÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ Challenge</span>}
                        {post.type === 'milestone' && <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full font-semibold mb-2 bg-emerald-50 text-emerald-700 border border-emerald-200">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Milestone</span>}
                        <p className="text-[#A8BFDB] text-sm leading-relaxed mb-2">{post.text}</p>
                        <p className="text-[#4A6B8A] text-xs mb-3">{post.likes} likes ÃÂÃÂÃÂÃÂ· {post.comments} comments</p>
                      </div>
                      <div className="flex gap-4 pt-2 border-t border-[#152840]">
                        {["ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Like","ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¬ Comment","ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Repost"].map(a => (
                          <button key={a} className="text-[#7A9CC4] text-xs hover:text-[#38BDF8] transition-colors">{a}</button>
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
                <h2 className="font-bold text-[#F8FAFC] mb-4">Your Network</h2>
                {pendingConnections > 0 && (
                  <div className="mb-5">
                    <div className="font-semibold text-[#A8BFDB] text-sm mb-3">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ³ Pending Requests ({pendingConnections})</div>
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-xs text-amber-700 mb-3">Hit <strong>Advance Day</strong> to simulate time passing ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ senior contacts take longer to accept.</div>
                    {allEmps.filter(e => state[e.id]?.linkedinStatus==="pending").map(emp => {
                      const company = getCompanyForEmp(emp.id);
                      return (
                        <div key={emp.id} className="bg-[#0D1525] rounded-xl border border-[#1B3154] p-3 mb-2 flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs ${getAvatarColor(emp.id)}`}>{getInitials(emp)}</div>
                          <div className="flex-1"><div className="font-medium text-[#D4E5FF] text-sm">{emp.first} {emp.last}</div><div className="text-[#4A6B8A] text-xs">{emp.title} ÃÂÃÂÃÂÃÂ· {company?.name}</div></div>
                          <span className="text-[#FBBF24] text-xs">Pending ÃÂÃÂÃÂÃÂ· Expected Day {state[emp.id].linkedinReplyDay}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="font-semibold text-[#A8BFDB] text-sm mb-3">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Connections ({connections.length})</div>
                {connections.length === 0 ? <div className="text-center py-8 text-[#4A6B8A] text-sm">No connections yet. Search for people or connect from the feed.</div>
                : connections.map(emp => {
                  const company = getCompanyForEmp(emp.id);
                  return (
                    <div key={emp.id} className="bg-[#0D1525] rounded-xl border border-[#1B3154] p-3 mb-2 flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs ${getAvatarColor(emp.id)}`}>{getInitials(emp)}</div>
                      <div className="flex-1"><div className="font-medium text-[#D4E5FF] text-sm">{emp.first} {emp.last}</div><div className="text-[#4A6B8A] text-xs">{emp.title} ÃÂÃÂÃÂÃÂ· {company?.name}</div></div>
                      <button onClick={() => { setPlMsgEmp(emp); setPlView("messages"); }} className="text-[#38BDF8] text-xs border border-[#B8D4BB] px-3 py-1 rounded-full hover:bg-[#EDF5EE]">Message</button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* SEARCH */}
            {plView === "search" && (
              <div>
                <h2 className="font-bold text-[#F8FAFC] mb-4">Search People</h2>
                <input value={plSearch} onChange={e => setPlSearch(e.target.value)} placeholder="Search by name, title or company..." className="w-full border border-[#1B3154] rounded-xl px-4 py-2.5 text-sm mb-4 focus:outline-none focus:border-[#0EA5E9]"/>
                <div className="space-y-2">
                  {allEmps.filter(e => {
                    const c = getCompanyForEmp(e.id);
                    const q = plSearch.toLowerCase();
                    return !q || `${e.first} ${e.last} ${e.title} ${c?.name}`.toLowerCase().includes(q);
                  }).slice(0,30).map(emp => {
                    const company = getCompanyForEmp(emp.id);
                    const cs = state[emp.id];
                    return (
                      <div key={emp.id} className="bg-[#0D1525] rounded-xl border border-[#1B3154] p-3 flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 ${getAvatarColor(emp.id)}`}>{getInitials(emp)}</div>
                        <div className="flex-1">
                          <button onClick={() => { setPlProfile(emp); setPlView("profile"); }} className="font-medium text-[#D4E5FF] text-sm hover:text-blue-600 hover:underline">{emp.first} {emp.last}</button>
                          <div className="text-[#4A6B8A] text-xs">{emp.title} ÃÂÃÂÃÂÃÂ· {company?.name} ÃÂÃÂÃÂÃÂ· {company?.location}</div>
                        </div>
                        <div className="flex gap-1.5">
                          {cs.linkedinStatus==="none" && <button onClick={() => sendLinkedinConnect(emp)} className="text-[#38BDF8] border border-[#0EA5E9] text-xs px-2.5 py-1 rounded-full hover:bg-[#EDF5EE]">+ Connect</button>}
                          {cs.linkedinStatus==="pending" && <span className="text-yellow-700 text-xs px-2.5 py-1 rounded-full border border-yellow-200 bg-[#1A1200]">Pending</span>}
                          {cs.linkedinStatus==="connected" && <button onClick={() => { setPlMsgEmp(emp); setPlView("messages"); }} className="text-[#38BDF8] text-xs border border-[#B8D4BB] px-2.5 py-1 rounded-full bg-[#EDF5EE]">Message</button>}
                          {cs.linkedinStatus==="ignored" && <span className="text-[#4A6B8A] text-xs">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ</span>}
                          <button onClick={() => { setPlProfile(emp); setPlView("profile"); }} className="text-[#3A5A3A] text-xs border border-[#1B3154] px-2.5 py-1 rounded-full hover:bg-[#FFFFFF]">View</button>
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
                  <button onClick={()=>setPlView("feed")} className="flex items-center gap-1.5 text-sm font-semibold mb-4 transition-colors" style={{color:'#0A66C2'}}>
                    <span>ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Back to Feed</span>
                  </button>

                  <div className="bg-[#0D1525] rounded-2xl overflow-hidden mb-3" style={{boxShadow:'0 0 0 1px rgba(0,0,0,0.08),0 4px 16px rgba(0,0,0,0.08)'}}>
                    <div className="h-24" style={{background:'linear-gradient(135deg,#0A66C2 0%,#004182 50%,#6B46C1 100%)'}}></div>
                    <div className="px-5 pb-5">
                      <div className="flex justify-between items-end -mt-10 mb-3">
                        <div className="relative">
                          <img src={getPersonaPhoto(plProfile.id)} alt="" className="w-20 h-20 rounded-full object-cover border-4 border-white" style={{boxShadow:'0 2px 8px rgba(0,0,0,0.15)'}} onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='flex';}}/>
                          <div className={'w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-xl border-4 border-white '+getAvatarColor(plProfile.id)} style={{display:'none'}}>{getInitials(plProfile)}</div>
                        </div>
                        <div className="flex gap-2 pb-1">
                          <button className="px-4 py-1.5 rounded-full text-sm font-semibold" style={{background:'#0A66C2',color:'#fff',border:'none',cursor:'pointer'}}>+ Connect</button>
                          <button onClick={()=>{setPlMsgEmp(plProfile);setPlView('messages');}} className="px-4 py-1.5 rounded-full text-sm font-semibold" style={{color:'#0A66C2',border:'1.5px solid #0A66C2',background:'transparent',cursor:'pointer'}}>Message</button>
                        </div>
                      </div>
                      <h2 className="text-lg font-bold text-[#F8FAFC] leading-tight mb-0.5">{plProfile.first} {plProfile.last}</h2>
                      <p className="text-sm text-[#7A9CC4] hover:text-[#38BDF8] leading-snug mb-1">{plProfile.title}</p>
                      <p className="text-sm text-[#D4E5FF] font-medium mb-2">{company?company.name:''}{company&&<span className="text-[#4A6B8A] font-normal"> ÃÂÃÂÃÂÃÂ· {company.industry}</span>}</p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#7A9CC4] mb-3">
                        <span className="font-semibold" style={{color:'#0A66C2'}}>{getPersonaConnections(plProfile.id).toLocaleString()} connections</span>
                        <span>ÃÂÃÂÃÂÃÂ·</span>
                        <span>ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ {(companies.find(c=>c.id===getCompanyForEmp(plProfile.id))||{location:'Dublin'}).location}</span>
                        {company&&<><span>ÃÂÃÂÃÂÃÂ·</span><span>{company.size}</span></>}
                      </div>
                      {company&&<span className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{background:'#EBF5FB',color:'#0A66C2',border:'1px solid #BFDBFE'}}>{company.industry}</span>}
                    </div>
                  </div>

                  {(()=>{const _pp=getPersonaPainPoints(plProfile,company);const _goals=getPersonaGoals(plProfile,company);return(
                  <div className="bg-[#0D1525] rounded-2xl p-4 mb-3" style={{boxShadow:'0 0 0 1px rgba(0,0,0,0.08),0 2px 8px rgba(0,0,0,0.06)'}}>
                    <h3 className="text-sm font-bold text-[#F8FAFC] mb-2">About</h3>
                    <p className="text-xs text-[#7A9CC4] leading-relaxed mb-4">{plProfile.first} is a {plProfile.title} at {company?company.name:'this company'}, focused on driving measurable {company?company.industry:'tech'} outcomes through cross-functional leadership and execution.</p>
                    <div className="h-px bg-gray-100 mb-3"></div>
                    <p className="text-xs font-bold text-[#7A9CC4] uppercase tracking-wider mb-2">Goals</p>
                    <div className="flex flex-col gap-2 mb-4">
                      {_goals.map((g,gi)=>(
                        <div key={gi} className="flex items-start gap-2.5">
                          <span className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5" style={{background:'#16a34a',minWidth:'16px'}}>
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </span>
                          <span className="text-xs text-[#A8BFDB] leading-relaxed">{g}</span>
                        </div>
                      ))}
                    </div>
                    <div className="h-px bg-gray-100 mb-3"></div>
                    <p className="text-xs font-bold text-[#7A9CC4] uppercase tracking-wider mb-2">Challenges</p>
                    <div className="flex flex-col gap-2">
                      {_pp.map((p,pi)=>(
                        <div key={pi} className="flex items-start gap-2.5">
                          <span className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5" style={{background:'#d97706',minWidth:'16px'}}>
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M4 2V5M4 6V6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                          </span>
                          <span className="text-xs text-[#7A9CC4] leading-relaxed">{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  );})()}

                  {(()=>{const _posts=getPersonaPosts(plProfile,company);return(
                  <div>
                    <p className="text-sm font-bold text-[#F8FAFC] mb-3">Activity</p>
                    {_posts.length===0&&<div className="bg-[#0D1525] rounded-2xl p-8 text-center text-[#4A6B8A] text-sm" style={{boxShadow:'0 0 0 1px rgba(0,0,0,0.08)'}}>No recent activity yet.</div>}
                    {_posts.map((post,pi)=>(
                      <div key={pi} className="bg-[#0D1525] rounded-2xl mb-3 overflow-hidden" style={{boxShadow:'0 0 0 1px rgba(0,0,0,0.08),0 4px 16px rgba(0,0,0,0.06)'}}>
                        <div className="p-4">
                          <div className="flex items-start gap-3 mb-3">
                            <img src={getPersonaPhoto(plProfile.id)} className="w-9 h-9 rounded-full object-cover flex-shrink-0" style={{border:'1px solid rgba(0,0,0,0.08)'}} onError={e=>{e.target.style.display='none';}} alt=""/>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-[#F8FAFC] leading-tight">{plProfile.first} {plProfile.last}</p>
                              <p className="text-xs text-[#7A9CC4] leading-tight truncate">{plProfile.title} ÃÂÃÂÃÂÃÂ· {company?company.name:''}</p>
                              <p className="text-xs text-[#4A6B8A] leading-tight">{post.timeAgo} ÃÂÃÂÃÂÃÂ· ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ</p>
                            </div>
                            <button className="flex-shrink-0 text-xs font-bold px-3 py-1 rounded-full" style={{color:'#0A66C2',border:'1.5px solid #0A66C2',background:'transparent',cursor:'pointer',whiteSpace:'nowrap'}}>+ Follow</button>
                          </div>
                          <p className="text-sm text-[#D4E5FF] leading-relaxed mb-3">{post.text}</p>
                          {post.hasImage&&<div className="rounded-xl mb-3 flex items-center justify-center text-4xl" style={{height:'120px',background:'linear-gradient(135deg,#EFF6FF,#EDE9FE)'}}>{['ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ','ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ','ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ','ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¡','ÃÂÃÂ°ÃÂÃÂÃÂÃÂ¤ÃÂÃÂ'][pi%5]}</div>}
                          {post.tags&&post.tags.length>0&&<div className="flex flex-wrap gap-2 mb-3">{post.tags.map((t,ti)=><span key={ti} className="text-xs font-semibold" style={{color:'#0A66C2'}}>{t}</span>)}</div>}
                          <div className="flex items-center text-xs text-[#7A9CC4] pt-2.5 border-t border-[#152840]">
                            <span className="flex items-center gap-1.5"><span className="inline-flex items-center justify-center w-4 h-4 rounded-full text-white" style={{background:'#0A66C2',fontSize:'9px'}}>ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ</span><span>{post.likes.toLocaleString()} likes</span></span>
                            <span className="ml-auto">{post.comments} comments</span>
                          </div>
                        </div>
                        <div className="flex border-t border-[#152840]">
                          {[['ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ','Like'],['ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¬','Comment'],['ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ','Repost'],['ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¤','Send']].map(([icon,label],ai)=>(
                            <button key={ai} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-[#7A9CC4] hover:bg-[#152840] transition-colors">{icon} {label}</button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  );})()}
                </div>
              );
            })()}

            {/* MESSAGES */}
            {plView === "messages" && (
              <div>
                <h2 className="font-bold text-[#F8FAFC] mb-4">Messages</h2>
                {connections.length === 0 ? (
                  <div className="text-center py-12 text-[#4A6B8A]"><div className="text-4xl mb-3">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¬</div><div>No connections yet. Connect with people to message them.</div></div>
                ) : (
                  <div className="flex gap-4 h-96">
                    <div className="w-48 border border-[#1B3154] rounded-xl overflow-hidden bg-[#0D1525]">
                      {connections.map(emp => {
                        const cs = state[emp.id];
                        const hasMsg = cs.linkedinMsgs.length > 0;
                        return (
                          <button key={emp.id} onClick={() => setPlMsgEmp(emp)} className={`w-full text-left px-3 py-2.5 border-b border-[#152840] flex items-center gap-2 transition-colors ${plMsgEmp?.id===emp.id ? "bg-blue-50" : "hover:bg-[#152840]"}`}>
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${getAvatarColor(emp.id)}`}>{getInitials(emp)}</div>
                            <div><div className="text-xs font-medium text-[#D4E5FF]">{emp.first}</div><div className="text-xs text-[#4A6B8A] truncate w-24">{hasMsg ? cs.linkedinMsgs[cs.linkedinMsgs.length-1].text.slice(0,20)+"..." : "No messages"}</div></div>
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex-1 border border-[#1B3154] rounded-xl bg-[#0D1525] flex flex-col overflow-hidden">
                      {!plMsgEmp ? <div className="flex-1 flex items-center justify-center text-[#4A6B8A] text-sm">Select a connection to message</div> : (
                        <>
                          <div className="px-4 py-3 border-b border-[#152840] flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ${getAvatarColor(plMsgEmp.id)}`}>{getInitials(plMsgEmp)}</div>
                            <div><div className="font-medium text-[#D4E5FF] text-sm">{plMsgEmp.first} {plMsgEmp.last}</div><div className="text-[#4A6B8A] text-xs">{plMsgEmp.title}</div></div>
                          </div>
                          <div className="flex-1 p-3 space-y-2 overflow-y-auto">
                            {state[plMsgEmp.id]?.linkedinMsgs.length === 0 && <div className="text-center text-[#4A6B8A] text-xs mt-4">Send your first message to {plMsgEmp.first}</div>}
                            {state[plMsgEmp.id]?.linkedinMsgs.map((msg, i) => (
                              <div key={i} className={`p-2 rounded-lg text-xs max-w-xs leading-relaxed ${msg.from==="rep" ? "bg-[#0EA5E9] text-white ml-auto text-right" : "bg-[#FFFFFF] text-[#D4E5FF]"}`}>{msg.text}</div>
                            ))}
                          </div>
                          <div className="p-3 border-t border-[#152840] flex gap-2">
                            <input value={plMsgDraft} onChange={e => setPlMsgDraft(e.target.value)} onKeyDown={e => { if(e.key==="Enter" && plMsgDraft.trim()) { sendLinkedinMsg(plMsgEmp, plMsgDraft); setPlMsgDraft(""); }}} placeholder={`Message ${plMsgEmp.first}...`} className="flex-1 border border-[#1B3154] rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#0EA5E9]"/>
                            <button onClick={() => { if(plMsgDraft.trim()) { sendLinkedinMsg(plMsgEmp, plMsgDraft); setPlMsgDraft(""); }}} className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-xs px-3 py-1.5 rounded-lg">Send</button>
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
            <h1 className="text-2xl font-bold text-[#F8FAFC] mb-1">Your Scorecard</h1>
            <p className="text-[#4A6A4A] text-sm mb-6">Track your performance across the 30-day simulation.</p>
            {/* Grade card */}
            <div className={`rounded-2xl border-2 p-6 mb-6 flex items-center gap-6 ${g.bg}`}>
              <div className={`text-7xl font-black ${g.color}`}>{g.grade}</div>
              <div>
                <div className={`text-xl font-bold ${g.color}`}>{g.label}</div>
                <div className="text-[#7A9CC4] text-sm mt-1">Based on meetings booked, email replies, connections, and account coverage.</div>
                <div className="mt-3 w-64 bg-[#0D1525] bg-opacity-60 rounded-full h-2">
                  <div className={`h-2 rounded-full ${g.grade === "A" ? "bg-green-500" : g.grade === "B" ? "bg-blue-500" : g.grade === "C" ? "bg-[#1A1200]0" : g.grade === "D" ? "bg-orange-500" : "bg-red-500"}`}
                    style={{width: `${Math.min(meetingsBooked/MEETING_GOAL*50 + emailsReplied/10*20 + connections.length/10*15 + accountsTouched/15*15, 100)}%`}}></div>
                </div>
              </div>
            </div>
            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {stats.map((s, i) => (
                <div key={i} className={`bg-[#0D1525] rounded-xl border p-4 ${s.highlight ? "border-[#0EA5E9]" : "border-[#1B3154]"}`}>
                  <div className="text-xs text-[#4A6A4A] font-medium uppercase tracking-wide mb-1">{s.label}</div>
                  <div className={`text-3xl font-black mb-1 ${s.highlight ? "text-[#38BDF8]" : "text-[#F8FAFC]"}`}>{s.value}</div>
                  <div className="text-xs text-[#4A6B8A]">{s.sub}</div>
                </div>
              ))}
            </div>
            {/* Meeting list */}
            <div className="bg-[#0D1525] rounded-xl border border-[#1B3154] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#1B3154] font-semibold text-[#D4E5FF] text-sm">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Meetings Booked ({meetingsBooked})</div>
              {meetingsBooked === 0 ? (
                <div className="text-center py-8 text-[#4A6B8A] text-sm">No meetings booked yet. Get a prospect to reply, then hit Request Meeting.</div>
              ) : allEmps.filter(e => state[e.id]?.meetingStatus === "booked").map(emp => {
                const company = getCompanyForEmp(emp.id);
                return (
                  <div key={emp.id} className="px-4 py-3 border-b border-[#EEEEF4] flex items-center gap-3 last:border-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${getAvatarColor(emp.id)}`}>{getInitials(emp)}</div>
                    <div className="flex-1">
                      <div className="font-medium text-[#F8FAFC] text-sm">{emp.first} {emp.last}</div>
                      <div className="text-[#4A6B8A] text-xs">{emp.title} ÃÂÃÂÃÂÃÂ· {company?.name}</div>
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
          <div className="bg-[#0D1525] rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
            <div className="text-5xl mb-3">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ</div>
            <h2 className="text-2xl font-black text-[#F8FAFC] mb-1">Simulation Complete</h2>
            <p className="text-[#7A9CC4] text-sm mb-5">30 days done. Time to see how you performed.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setTab("score")} className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-6 py-2.5 rounded-xl font-semibold text-sm">View My Scorecard</button>
              <button onClick={() => { setState(initState()); setSimDay(1); setTab("crm"); setCrmView("accounts"); }} className="border border-[#1B3154] text-[#7A9CC4] hover:bg-[#F2EFE8] px-6 py-2.5 rounded-xl font-semibold text-sm">Restart Simulation</button>
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
              <div className="relative mx-auto mb-3 flex items-center justify-center" style={{width:88,height:88}}><div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping" style={{opacity:0.5}}/><div className="absolute rounded-full border border-blue-300 animate-ping" style={{inset:-7,opacity:0.25,animationDelay:'0.8s'}}/><img src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${callModal&&callModal.id}`} className={`w-20 h-20 rounded-full object-cover border-2 border-blue-500 ${getAvatarColor(callModal&&callModal.id)}`} alt="" onError={e=>{e.target.style.display='none'}}/></div>
              <div className="text-white font-bold text-lg">{callModal.first} {callModal.last}</div>
              <div className="text-[#4A6B8A] text-sm">{callModal.title}</div>
              <div className="text-[#7A9CC4] text-xs mt-0.5 font-mono">{getPhone(callModal)}</div>
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
                  <div className="text-[#7A9CC4] text-xs mt-1">{getPhone(callModal)}</div>
                </div>
              )}
              {callPhase === "outcome" && callOutcome === "connected" && (
                <div>
                  <div className="text-emerald-400 text-sm font-semibold mb-2">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Connected</div>
                  <div className="bg-[#0F1F15] rounded-xl p-3 text-left">
                    <div className="text-[#4A6B8A] text-xs mb-1">{callModal.first} says:</div>
                    <div className="text-white text-sm leading-relaxed">"{callLine}"</div>                    {apiKey && callLine && (                      <button onClick={() => generateAiVoice(callModal, callLine)} disabled={aiVoiceLoading} className="mt-3 flex items-center gap-2 mx-auto bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white text-xs px-4 py-2 rounded-full transition-colors">                        {aiVoiceLoading ? "ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Generating..." : "ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Hear AI Voice"}</button>)}
                  </div>
                </div>
              )}
              {callPhase === "outcome" && callOutcome === "gatekeeper" && (
                <div>
                  <div className="text-orange-400 text-sm font-semibold mb-2">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ§ Gatekeeper</div>
                  <div className="bg-[#0F1F15] rounded-xl p-3 text-left">
                    <div className="text-[#4A6B8A] text-xs mb-1">Reception says:</div>
                    <div className="text-white text-sm leading-relaxed">"{callLine}"</div>
                  </div>
                </div>
              )}
              {callPhase === "outcome" && callOutcome === "voicemail" && (
                <div>
                  <div className="text-yellow-400 text-sm font-semibold mb-2">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¨ Voicemail</div>
                  <div className="bg-[#0F1F15] rounded-xl p-3 text-left">
                    <div className="text-[#4A6B8A] text-xs mb-1">Voicemail:</div>
                    <div className="text-white text-sm leading-relaxed italic">"{callLine}"</div>                    {apiKey && callLine && (                      <button onClick={() => generateAiVoice(callModal, callLine)} disabled={aiVoiceLoading} className="mt-3 flex items-center gap-2 mx-auto bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white text-xs px-4 py-2 rounded-full transition-colors">{aiVoiceLoading ? "ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Generating..." : "ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Hear AI Voice"}</button>)}
                  </div>
                </div>
              )}
              {callPhase === "outcome" && callOutcome === "no-answer" && (
                <div>
                  <div className="text-[#4A6B8A] text-sm font-semibold mb-2">ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂµ No Answer</div>
                  <div className="text-[#7A9CC4] text-xs">The call rang out. Try again later or send a follow-up email.</div>
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
                    <button onClick={() => { endCall(); setEmailCompose({emp:callModal, company:getCompanyForEmp(callModal.id)}); setEmailDraft({subject:"Following up on our call", body:""}); }} className="w-14 h-14 rounded-full bg-[#0EA5E9] hover:bg-[#0284C7] border border-emerald-700 flex items-center justify-center text-2xl transition-colors">ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ</button>
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
          <div className="bg-[#0D1525] rounded-2xl shadow-2xl w-full max-w-md">
            <div className="px-4 py-3 bg-[#0EA5E9] rounded-t-2xl flex items-center justify-between">
              <span className="text-white text-sm font-medium">New Email</span>
              <button onClick={() => setEmailCompose(null)} className="text-[#4A6B8A] hover:text-white text-lg">ÃÂÃÂÃÂÃÂ</button>
            </div>
            <div className="p-4">
              {emailCompose.emp ? (
                <div className="text-sm text-[#A8BFDB] mb-3 bg-[#F2EFE8] rounded-lg px-3 py-2">
                  <span className="text-[#4A6B8A]">To: </span><span className="font-medium">{emailCompose.emp.first} {emailCompose.emp.last}</span>
                  <span className="text-[#4A6B8A] text-xs ml-2">&lt;{getEmail(emailCompose.emp, emailCompose.company)}&gt;</span>
                </div>
              ) : (
                <input placeholder="To: email address..." className="w-full border border-[#1B3154] rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:border-[#0EA5E9]"/>
              )}
              <input value={emailDraft.subject} onChange={e => setEmailDraft(d => ({...d, subject:e.target.value}))} placeholder="Subject line..." className="w-full border border-[#1B3154] rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:border-[#0EA5E9]"/>
              <textarea value={emailDraft.body} onChange={e => setEmailDraft(d => ({...d, body:e.target.value}))} placeholder={emailCompose.emp ? `Write your email to ${emailCompose.emp.first}...\n\nTip: ${emailCompose.emp?.seniority==="c-suite"||emailCompose.emp?.seniority==="vp" ? "Keep it to 3 lines for senior buyers. Lead with their pain, not your product." : "Be specific about why you're reaching out to them specifically."}` : "Write your email..."} className="w-full border border-[#1B3154] rounded-lg px-3 py-2 text-sm min-h-32 resize-none focus:outline-none focus:border-[#0EA5E9] mb-3"/>
              {emailCompose.emp && (
                <div className="text-xs text-[#4A6B8A] mb-3">
                  {emailCompose.emp.seniority === "c-suite" && "ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ ÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ C-Suite: Takes ~5 days to respond. May not respond at all."}
                  {emailCompose.emp.seniority === "vp" && "ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ VP level: Usually responds within 3 days if the email earns it."}
                  {emailCompose.emp.seniority === "director" && "ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Director: Usually responds within 2 days."}
                  {emailCompose.emp.seniority === "manager" && "ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Manager: Likely to respond within 1 day."}
                  {(emailCompose.emp.seniority === "mid" || emailCompose.emp.seniority === "junior") && "ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Will respond quickly ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ but may redirect you upward."}
                </div>
              )}
              <div className="flex justify-end gap-2">
                <button onClick={() => setEmailCompose(null)} className="px-4 py-1.5 text-sm text-[#7A9CC4] hover:text-[#38BDF8] hover:text-[#D4E5FF]">Cancel</button>
                <button onClick={() => { if(emailCompose.emp && emailDraft.body.trim()) { sendEmail(emailCompose.emp, emailCompose.company, emailDraft.subject, emailDraft.body); setEmailCompose(null); }}} className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-4 py-1.5 rounded-lg text-sm font-medium">Send</button>
              </div>
            </div>
          </div>
        </div>
      )}
    
      
  {tab==='scheduled'&&(
    <div style={{padding:32,maxWidth:900,margin:'0 auto'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
        <h2 style={{color:'#f1f5f9',margin:0,fontSize:22,fontWeight:700}}>ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Scheduled Calls</h2>
        {allEmps.length>0&&(
          <button onClick={()=>{const emp=allEmps[0];handleOpenBooking(emp,'discovery');}} style={{padding:'9px 18px',borderRadius:9,border:'none',background:'#6366f1',color:'#fff',fontWeight:700,cursor:'pointer',fontSize:14}}>+ Book Call</button>
        )}
      </div>
      {scheduledCalls.length===0?(
        <div style={{textAlign:'center',padding:'60px 0',color:'#475569'}}>
          <div style={{fontSize:48,marginBottom:12}}>ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ</div>
          <div style={{fontSize:16,fontWeight:600,marginBottom:8,color:'#7A9CC4'}}>No calls scheduled yet</div>
          <div style={{fontSize:13}}>Book a discovery or demo call with a prospect to get started.</div>
        </div>
      ):(
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {scheduledCalls.map(sc=>{
            const d=new Date(sc.scheduled_at);
            const past=d<new Date();
            return(
              <div key={sc.id} style={{background:'#1e293b',borderRadius:12,padding:'18px 22px',border:'1px solid #334155',display:'flex',alignItems:'center',justifyContent:'space-between',opacity:sc.status==='completed'?0.6:1}}>
                <div style={{display:'flex',alignItems:'center',gap:16}}>
                  <div style={{width:44,height:44,borderRadius:'50%',background:sc.call_type==='demo'?'linear-gradient(135deg,#0ea5e9,#6366f1)':'linear-gradient(135deg,#6366f1,#8b5cf6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>
                    {sc.call_type==='demo'?'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ':'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¸ÃÂÃÂ'}
                  </div>
                  <div>
                    <div style={{color:'#f1f5f9',fontWeight:700,fontSize:15}}>{sc.persona_name}</div>
                    <div style={{color:'#7A9CC4',fontSize:13}}>{sc.company_name} ÃÂÃÂÃÂÃÂ· {sc.call_type==='demo'?'Demo':'Discovery'}</div>
                  </div>
                </div>
                <div style={{textAlign:'right',display:'flex',alignItems:'center',gap:16}}>
                  <div>
                    <div style={{color:'#e2e8f0',fontSize:14,fontWeight:600}}>{d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</div>
                    <div style={{color:'#7A9CC4',fontSize:13}}>{d.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})}</div>
                  </div>
                  <span style={{padding:'3px 10px',borderRadius:20,fontSize:11,fontWeight:700,background:sc.status==='completed'?'#1e293b':sc.status==='active'?'rgba(34,197,94,0.15)':'rgba(99,102,241,0.15)',color:sc.status==='completed'?'#475569':sc.status==='active'?'#16a34a':'#818cf8',border:'1px solid '+(sc.status==='completed'?'#334155':sc.status==='active'?'#16a34a':'#6366f1')}}>{sc.status}</span>
                  {sc.status==='upcoming'&&(
                    <button onClick={()=>handleJoinCall(sc)} style={{padding:'8px 16px',borderRadius:8,border:'none',background:'#16a34a',color:'#fff',fontWeight:700,cursor:'pointer',fontSize:13}}>Join</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )}
      
  {tab==='inbox'&&(
    <div style={{padding:32,maxWidth:900,margin:'0 auto'}}>
      <h2 style={{color:'#f1f5f9',margin:'0 0 24px',fontSize:22,fontWeight:700}}>ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¬ Prospect Inbox</h2>
      {personaMessages.length===0?(
        <div style={{textAlign:'center',padding:'60px 0',color:'#475569'}}>
          <div style={{fontSize:48,marginBottom:12}}>ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¬</div>
          <div style={{fontSize:16,fontWeight:600,marginBottom:8,color:'#7A9CC4'}}>No messages yet</div>
          <div style={{fontSize:13}}>Prospects will reach out soon with questions and call requests.</div>
        </div>
      ):(
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {personaMessages.map(msg=>(
            <div key={msg.id}>
              <div onClick={async()=>{
                if(!msg.is_read){
                  await markMsgRead(authTok,msg.id);
                  setPersonaMessages(prev=>prev.map(m=>m.id===msg.id?{...m,is_read:true}:m));
                }
                setExpandedMsg(expandedMsg===msg.id?null:msg.id);
              }} style={{background:'#1e293b',borderRadius:expandedMsg===msg.id?'12px 12px 0 0':'12px',padding:'14px 18px',border:'1px solid '+(msg.is_read?'#334155':'#6366f1'),cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'space-between',transition:'all 0.15s'}}>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  {!msg.is_read&&<div style={{width:8,height:8,borderRadius:'50%',background:'#6366f1',flexShrink:0}}/>}
                  <div style={{width:36,height:36,borderRadius:'50%',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,color:'#fff',fontWeight:700,flexShrink:0}}>
                    {(msg.persona_name||'?').split(' ').map(n=>n[0]).join('').slice(0,2)}
                  </div>
                  <div>
                    <div style={{color:msg.is_read?'#94a3b8':'#f1f5f9',fontWeight:msg.is_read?400:700,fontSize:14}}>{msg.persona_name} <span style={{color:'#475569',fontWeight:400}}>ÃÂÃÂÃÂÃÂ· {msg.company_name}</span></div>
                    <div style={{color:'#7A9CC4',fontSize:12,marginTop:2}}>{msg.subject}</div>
                  </div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <span style={{padding:'2px 8px',borderRadius:20,fontSize:11,background:msg.msg_type==='call_request'?'rgba(34,197,94,0.15)':msg.msg_type==='demo_request'?'rgba(14,165,233,0.15)':'rgba(99,102,241,0.15)',color:msg.msg_type==='call_request'?'#16a34a':msg.msg_type==='demo_request'?'#38bdf8':'#818cf8',border:'1px solid '+(msg.msg_type==='call_request'?'#16a34a':msg.msg_type==='demo_request'?'#0ea5e9':'#6366f1')}}>{msg.msg_type.replace('_',' ')}</span>
                  <span style={{color:'#475569',fontSize:11}}>{new Date(msg.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric'})}</span>
                  <span style={{color:'#475569',fontSize:16}}>{expandedMsg===msg.id?'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ²':'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ¼'}</span>
                </div>
              </div>
              {expandedMsg===msg.id&&(
                <div style={{background:'#162032',border:'1px solid #334155',borderTop:'none',borderRadius:'0 0 12px 12px',padding:'16px 18px'}}>
                  <p style={{color:'#4A6B8A',fontSize:14,lineHeight:1.7,margin:'0 0 16px',whiteSpace:'pre-wrap'}}>{msg.body}</p>
                  {msg.wants_call&&(
                    <button onClick={()=>handleMsgBooking(msg)} style={{padding:'9px 20px',borderRadius:9,border:'none',background:'#6366f1',color:'#fff',fontWeight:700,cursor:'pointer',fontSize:14}}>ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Book {msg.call_type==='demo'?'Demo':'Discovery'} Call</button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={() => setShowSettings(false)}>
          <div className="bg-[#0D1B2E] border border-[#1E3A5F] rounded-xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#D4E5FF]">Settings</h2>
              <button onClick={() => setShowSettings(false)} className="text-[#4A6B8A] hover:text-[#D4E5FF] text-xl leading-none">x</button>
            </div>
            <p className="text-xs text-[#4A6B8A] mb-4">Your OpenAI key is used to power the AI personas. It is stored locally in your browser only.</p>
            <div className="mb-5">
              <label className="block text-xs font-semibold text-[#7A9CC4] uppercase tracking-wider mb-2">OpenAI API Key</label>
              <input
                type="password"
                className="w-full bg-[#0A1628] border border-[#1E3A5F] rounded-lg px-3 py-2 text-sm text-[#D4E5FF] placeholder-[#4A6B8A] focus:outline-none focus:border-[#0EA5E9]"
                placeholder="sk-..."
                defaultValue={apiKey}
                id="settings-api-key-input"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowSettings(false)} className="px-4 py-2 rounded-lg text-sm text-[#7A9CC4] hover:text-[#D4E5FF] transition-colors">Cancel</button>
              <button onClick={() => {
                const val = document.getElementById('settings-api-key-input').value.trim();
                localStorage.setItem('repforge_openai_key', val);
                setApiKey(val);
                setShowSettings(false);
              }} className="px-4 py-2 rounded-lg text-sm bg-[#0EA5E9] text-white hover:bg-[#0284C7] font-medium transition-colors">Save</button>
            </div>
          </div>
        </div>
      )}

  {tab==='agentlab'&&(
  <div style={{padding:32,maxWidth:1100,margin:'0 auto'}}>
    <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes labPulse{0%,100%{opacity:1}50%{opacity:0.4}} @keyframes stageFade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    <div style={{marginBottom:24,display:'flex',alignItems:'flex-start',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
      <div><h2 style={{color:'#f1f5f9',margin:'0 0 6px',fontSize:22,fontWeight:700}}>ð¤ AI Agent Lab</h2><p style={{color:'#4A6B8A',margin:0,fontSize:14}}>Run your agent through the full sales pipeline â cold email, objection handling, booking, and discovery call. All scored end to end.</p></div>
      <div style={{display:'flex',background:'#0d1526',border:'1px solid #1e293b',borderRadius:8,overflow:'hidden'}}>
        {['pipeline','call'].map(m=>(<button key={m} onClick={()=>setLabMode(m)} style={{padding:'8px 18px',background:labMode===m?'#6366f1':'transparent',color:labMode===m?'#fff':'#4A6B8A',border:'none',cursor:'pointer',fontSize:13,fontWeight:600,transition:'all 0.2s'}}>{m==='pipeline'?'ð¥ Full Pipeline':'ð Cold Call'}</button>))}
      </div>
    </div>
    {!apiKey&&(<div style={{background:'rgba(245,158,11,0.08)',border:'1px solid #f59e0b',borderRadius:10,padding:'12px 16px',marginBottom:20,display:'flex',alignItems:'center',gap:10}}><span>â ï¸</span><span style={{color:'#fbbf24',fontSize:13}}>Add your OpenAI API key in <button onClick={()=>setShowSettings(true)} style={{background:'none',border:'none',color:'#6366f1',cursor:'pointer',fontWeight:600,textDecoration:'underline',fontSize:13}}>Settings</button> to run simulations.</span></div>)}
    <div style={{display:'grid',gridTemplateColumns:'340px 1fr',gap:20}}>
      <div style={{background:'#0d1526',borderRadius:12,border:'1px solid #1e293b',padding:20,display:'flex',flexDirection:'column',gap:16}}>
        <div style={{color:'#f1f5f9',fontWeight:700,fontSize:15}}>âï¸ Configuration</div>
        <div><label style={{display:'block',color:'#7A9CC4',fontSize:11,fontWeight:700,letterSpacing:0.5,marginBottom:6,textTransform:'uppercase'}}>Name</label><input value={agentName} onChange={e=>setAgentName(e.target.value)} placeholder='e.g. SDR-Bot v1, or rep name...' style={{width:'100%',background:'#111827',border:'1px solid #334155',borderRadius:8,padding:'8px 12px',color:'#f1f5f9',fontSize:13,boxSizing:'border-box'}}/></div>
        <div><label style={{display:'block',color:'#7A9CC4',fontSize:11,fontWeight:700,letterSpacing:0.5,marginBottom:6,textTransform:'uppercase'}}>System Prompt or Sales Playbook</label><textarea value={agentPrompt} onChange={e=>setAgentPrompt(e.target.value)} rows={9} placeholder={'AI agent: paste system prompt here.\nHuman rep: describe your sales approach...'} style={{width:'100%',background:'#111827',border:'1px solid #334155',borderRadius:8,padding:'8px 12px',color:'#f1f5f9',fontSize:12,boxSizing:'border-box',resize:'vertical',fontFamily:'inherit'}}/></div>
        {labMode==='call'&&(<div><label style={{display:'block',color:'#7A9CC4',fontSize:11,fontWeight:700,letterSpacing:0.5,marginBottom:6,textTransform:'uppercase'}}>Turns: {labTurns}</label><div style={{display:'flex',alignItems:'center',gap:8}}><span style={{color:'#4A6B8A',fontSize:11}}>4</span><input type='range' min={4} max={12} value={labTurns} onChange={e=>setLabTurns(parseInt(e.target.value))} style={{flex:1}}/><span style={{color:'#4A6B8A',fontSize:11}}>12</span></div></div>)}
        <button onClick={labMode==='pipeline'?runFullPipeline:runAgentTest} disabled={!apiKey||!agentPrompt.trim()||(labMode==='pipeline'?pipelineRunning:labRunning)} style={{padding:'10px 0',background:(!apiKey||!agentPrompt.trim())?'#1e293b':'linear-gradient(135deg,#6366f1,#8b5cf6)',color:(!apiKey||!agentPrompt.trim())?'#4A6B8A':'#fff',border:'none',borderRadius:8,fontWeight:700,fontSize:14,cursor:(!apiKey||!agentPrompt.trim())?'not-allowed':'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
          {(labMode==='pipeline'?pipelineRunning:labRunning)?(<><span style={{display:'inline-block',width:14,height:14,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',borderRadius:'50%',animation:'spin 0.8s linear infinite'}}/>Running...</>):'â¶ Run Test'}
        </button>
        {labResults.length>0&&(<div><div style={{color:'#7A9CC4',fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:'uppercase',marginBottom:8}}>Past Runs</div>{labResults.map((r,i)=>(<div key={i} style={{background:'#111827',borderRadius:6,padding:'8px 10px',marginBottom:6,display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><div style={{color:'#f1f5f9',fontSize:12,fontWeight:600}}>{r.agentName}</div><div style={{color:'#4A6B8A',fontSize:10}}>{r.target} @ {r.company} Â· {r.ts}</div></div><span style={{background:r.grade==='A'?'#10b981':r.grade==='B'?'#6366f1':r.grade==='C'?'#f59e0b':'#ef4444',color:'#fff',borderRadius:4,padding:'2px 7px',fontWeight:700,fontSize:13}}>{r.grade}</span></div>))}</div>)}
      </div>
      <div style={{background:'#0d1526',borderRadius:12,border:'1px solid #1e293b',padding:20,minHeight:400,display:'flex',flexDirection:'column',overflowY:'auto'}}>
        {labMode==='pipeline'&&!pipelineRunning&&pipelineLog.length===0&&!pipelineScore&&(<div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12,color:'#4A6B8A'}}><div style={{fontSize:48}}>ð¥</div><div style={{fontSize:16,fontWeight:600,color:'#94a3b8'}}>Full Pipeline Simulation</div><div style={{fontSize:13,textAlign:'center',maxWidth:400}}>Your agent will cold email a real prospect, handle objections, book a call, and run a discovery conversation â all scored end to end.</div></div>)}
        {labMode==='call'&&!labRunning&&labConversation.length===0&&!labScore&&(<div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12,color:'#4A6B8A'}}><div style={{fontSize:48}}>ð</div><div style={{fontSize:16,fontWeight:600,color:'#94a3b8'}}>Cold Call Simulation</div><div style={{fontSize:13,textAlign:'center',maxWidth:400}}>Your agent cold calls a random prospect and is scored on MEDDIC coverage, objection handling, rapport, and booking.</div></div>)}
        {labMode==='pipeline'&&(pipelineRunning||pipelineLog.length>0)&&(<div style={{display:'flex',flexDirection:'column',gap:0,flex:1}}>
          {labTarget&&(<div style={{background:'#111827',borderRadius:8,padding:'10px 14px',marginBottom:14,display:'flex',alignItems:'center',gap:10,flexShrink:0}}><div style={{width:32,height:32,borderRadius:'50%',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:13,flexShrink:0}}>{labTarget.first[0]}</div><div><div style={{color:'#f1f5f9',fontSize:13,fontWeight:600}}>{labTarget.first} {labTarget.last}</div><div style={{color:'#4A6B8A',fontSize:11}}>{labTarget.title}</div></div></div>)}
          <div style={{display:'flex',gap:4,marginBottom:14,flexWrap:'wrap',flexShrink:0}}>
            {['email','reply','followup','booking','discovery','scoring'].map(s=>{
              const order=['email','reply','followup','booking','discovery','scoring','done'];
              const done=order.indexOf(pipelineStage)>order.indexOf(s)||(pipelineStage==='done');
              const active=pipelineStage===s;
              const labels={email:'ð§ Email',reply:'â©ï¸ Reply',followup:'ð Follow-up',booking:'ð Book',discovery:'ðï¸ Discovery',scoring:'ð Score'};
              return(<div key={s} style={{padding:'4px 10px',borderRadius:20,fontSize:11,fontWeight:600,background:done?'rgba(99,102,241,0.2)':active?'rgba(99,102,241,0.1)':'transparent',border:active?'1px solid #6366f1':done?'1px solid rgba(99,102,241,0.4)':'1px solid #1e293b',color:active?'#a5b4fc':done?'#6366f1':'#4A6B8A',animation:active?'labPulse 1.5s infinite':''}}>{labels[s]}</div>);
            })}
          </div>
          <div style={{flex:1,overflowY:'auto',display:'flex',flexDirection:'column',gap:10}}>
            {pipelineLog.map((entry,i)=>(<div key={i} style={{animation:'stageFade 0.3s ease',display:'flex',flexDirection:'column',alignItems:entry.role==='agent'?'flex-end':'flex-start'}}><div style={{fontSize:10,color:'#4A6B8A',marginBottom:3,textTransform:'uppercase',letterSpacing:0.5}}>{entry.role==='agent'?(agentName||'Agent'):(labTarget?labTarget.first+' '+labTarget.last:'Prospect')} Â· {entry.stage}</div><div style={{maxWidth:'85%',background:entry.role==='agent'?'rgba(99,102,241,0.15)':'#111827',border:entry.role==='agent'?'1px solid rgba(99,102,241,0.3)':'1px solid #1e293b',borderRadius:10,padding:'10px 14px',color:'#e2e8f0',fontSize:13,lineHeight:1.5,whiteSpace:'pre-wrap'}}>{entry.content}</div></div>))}
            {pipelineRunning&&pipelineStage!=='done'&&(<div style={{display:'flex',gap:4,padding:8}}>{[0,1,2].map(i=>(<div key={i} style={{width:6,height:6,borderRadius:'50%',background:'#6366f1',animation:'labPulse 1.2s '+(i*0.2)+'s infinite'}}/>))}</div>)}
          </div>
        </div>)}
        {labMode==='pipeline'&&pipelineScore&&(<div style={{borderTop:'1px solid #1e293b',marginTop:16,paddingTop:16,flexShrink:0}}>
          <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:14}}><div style={{width:56,height:56,borderRadius:'50%',background:pipelineScore.grade==='A'?'linear-gradient(135deg,#10b981,#059669)':pipelineScore.grade==='B'?'linear-gradient(135deg,#6366f1,#8b5cf6)':pipelineScore.grade==='C'?'linear-gradient(135deg,#f59e0b,#d97706)':'linear-gradient(135deg,#ef4444,#dc2626)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:800,fontSize:24,flexShrink:0}}>{pipelineScore.grade}</div><div><div style={{color:'#f1f5f9',fontWeight:700,fontSize:15}}>Pipeline Score: {pipelineScore.overall}/100</div><div style={{color:'#64748b',fontSize:12,marginTop:3}}>{pipelineScore.summary}</div></div></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:10}}>
            {[['ð§ Email Quality',pipelineScore.emailQuality],['ð¡ï¸ Objection Handling',pipelineScore.objectionHandling],['ðï¸ Discovery Skill',pipelineScore.discoverySkill],['ð¯ MEDDIC',pipelineScore.meddic]].map(([label,score])=>(<div key={label} style={{background:'#111827',borderRadius:8,padding:'10px 12px'}}><div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}><span style={{color:'#94a3b8',fontSize:11}}>{label}</span><span style={{color:'#f1f5f9',fontWeight:700,fontSize:12}}>{score}</span></div><div style={{background:'#1e293b',borderRadius:4,height:4}}><div style={{height:4,borderRadius:4,background:'linear-gradient(90deg,#6366f1,#8b5cf6)',width:score+'%',transition:'width 0.8s ease'}}/></div></div>))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            <div style={{background:'rgba(16,185,129,0.08)',border:'1px solid rgba(16,185,129,0.2)',borderRadius:8,padding:'10px 12px'}}><div style={{color:'#10b981',fontSize:11,fontWeight:700,marginBottom:4}}>â STRENGTH</div><div style={{color:'#94a3b8',fontSize:12}}>{pipelineScore.strength}</div></div>
            <div style={{background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:8,padding:'10px 12px'}}><div style={{color:'#ef4444',fontSize:11,fontWeight:700,marginBottom:4}}>â ï¸ WEAKNESS</div><div style={{color:'#94a3b8',fontSize:12}}>{pipelineScore.weakness}</div></div>
          </div>
        </div>)}
        {labMode==='call'&&(labRunning||labConversation.length>0)&&(<div style={{display:'flex',flexDirection:'column',gap:10,flex:1}}>
          {labTarget&&(<div style={{background:'#111827',borderRadius:8,padding:'10px 14px',marginBottom:8,display:'flex',alignItems:'center',gap:10,flexShrink:0}}><div style={{width:32,height:32,borderRadius:'50%',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:13}}>{labTarget.first[0]}</div><div><div style={{color:'#f1f5f9',fontSize:13,fontWeight:600}}>{labTarget.first} {labTarget.last}</div><div style={{color:'#4A6B8A',fontSize:11}}>{labTarget.title}</div></div></div>)}
          <div style={{flex:1,overflowY:'auto',display:'flex',flexDirection:'column',gap:8}}>
            {labConversation.map((m,i)=>(<div key={i} style={{display:'flex',flexDirection:'column',alignItems:m.role==='agent'?'flex-end':'flex-start'}}><div style={{fontSize:10,color:'#4A6B8A',marginBottom:2,textTransform:'uppercase'}}>{m.role==='agent'?(agentName||'Agent'):(labTarget?labTarget.first:'Prospect')}</div><div style={{maxWidth:'80%',background:m.role==='agent'?'rgba(99,102,241,0.15)':'#111827',border:m.role==='agent'?'1px solid rgba(99,102,241,0.3)':'1px solid #1e293b',borderRadius:8,padding:'8px 12px',color:'#e2e8f0',fontSize:13}}>{m.content}</div></div>))}
            {labRunning&&(<div style={{display:'flex',gap:4,padding:8}}>{[0,1,2].map(i=>(<div key={i} style={{width:6,height:6,borderRadius:'50%',background:'#6366f1',animation:'labPulse 1.2s '+(i*0.2)+'s infinite'}}/>))}</div>)}
          </div>
          {labScore&&(<div style={{borderTop:'1px solid #1e293b',paddingTop:12,marginTop:4,flexShrink:0}}><div style={{display:'flex',alignItems:'center',gap:12,marginBottom:10}}><div style={{width:44,height:44,borderRadius:'50%',background:labScore.grade==='A'?'linear-gradient(135deg,#10b981,#059669)':labScore.grade==='B'?'linear-gradient(135deg,#6366f1,#8b5cf6)':labScore.grade==='C'?'linear-gradient(135deg,#f59e0b,#d97706)':'linear-gradient(135deg,#ef4444,#dc2626)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:800,fontSize:18}}>{labScore.grade}</div><div><div style={{color:'#f1f5f9',fontWeight:700}}>Overall: {labScore.overall}/100</div><div style={{color:'#64748b',fontSize:11}}>{labScore.summary}</div></div></div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>{[['MEDDIC',labScore.meddic],['Objections',labScore.objections],['Rapport',labScore.rapport],['Next Step',labScore.nextStep]].map(([l,s])=>(<div key={l} style={{background:'#111827',borderRadius:6,padding:'8px 10px'}}><div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}><span style={{color:'#64748b',fontSize:10}}>{l}</span><span style={{color:'#f1f5f9',fontWeight:700,fontSize:11}}>{s}</span></div><div style={{background:'#1e293b',borderRadius:3,height:3}}><div style={{height:3,borderRadius:3,background:'linear-gradient(90deg,#6366f1,#8b5cf6)',width:s+'%'}}/></div></div>))}</div></div>)}
        </div>)}
      </div>
    </div>
  </div>
)}
  </div>
  );
}
