// src/stakeholders.js
// Legal and Procurement personas for all 20 accounts
// Pulled into deals at Legal Review and Procurement stages

export const STAKEHOLDERS = [
  // NexaFlow
  { id: 'nexaflow-legal', accountId: 'nexaflow', firstName: 'Patricia', lastName: 'Okonkwo', name: 'Patricia Okonkwo', role: 'General Counsel', department: 'Legal', type: 'legal', email: 'p.okonkwo@nexaflow.io', avatar: 'PO', focus: 'GDPR/CCPA data processing agreements, liability caps, audit rights' },
  { id: 'nexaflow-procurement', accountId: 'nexaflow', firstName: 'Derek', lastName: 'Vasquez', name: 'Derek Vasquez', role: 'Head of Vendor Management', department: 'Procurement', type: 'procurement', email: 'd.vasquez@nexaflow.io', avatar: 'DV', focus: 'Competitive RFP process, net-60 payment terms, volume discounts' },
  // CloudPulse
  { id: 'cloudpulse-legal', accountId: 'cloudpulse', firstName: 'Sandra', lastName: 'Thornton', name: 'Sandra Thornton', role: 'VP Legal Affairs', department: 'Legal', type: 'legal', email: 's.thornton@cloudpulse.com', avatar: 'ST', focus: 'IP protection, liability caps max 3x contract value, GDPR' },
  { id: 'cloudpulse-procurement', accountId: 'cloudpulse', firstName: 'Marcus', lastName: 'Reid', name: 'Marcus Reid', role: 'Procurement Director', department: 'Procurement', type: 'procurement', email: 'm.reid@cloudpulse.com', avatar: 'MR', focus: '3 reference customers required, ROI justification, SOC2 Type II' },
  // Stackly
  { id: 'stackly-legal', accountId: 'stackly', firstName: 'Jonathan', lastName: 'Park', name: 'Jonathan Park', role: 'Associate General Counsel', department: 'Legal', type: 'legal', email: 'j.park@stackly.dev', avatar: 'JP', focus: 'IP ownership clauses, audit rights, startup-friendly MSA' },
  { id: 'stackly-procurement', accountId: 'stackly', firstName: 'Amara', lastName: 'Nwosu', name: 'Amara Nwosu', role: 'Vendor Operations Manager', department: 'Procurement', type: 'procurement', email: 'a.nwosu@stackly.dev', avatar: 'AN', focus: 'Startup discount, monthly billing option, implementation timeline' },
  // VeloData
  { id: 'velodata-legal', accountId: 'velodata', firstName: 'Rachel', lastName: 'Zimmerman', name: 'Rachel Zimmerman', role: 'Chief Legal Officer', department: 'Legal', type: 'legal', email: 'r.zimmerman@velodata.ai', avatar: 'RZ', focus: 'Data processing agreements, CCPA compliance, data residency requirements' },
  { id: 'velodata-procurement', accountId: 'velodata', firstName: 'Carlos', lastName: 'Medina', name: 'Carlos Medina', role: 'Strategic Sourcing Lead', department: 'Procurement', type: 'procurement', email: 'c.medina@velodata.ai', avatar: 'CM', focus: 'Competitor benchmarking, SOC2 Type II, volume pricing tiers' },
  // ShieldOps
  { id: 'shieldops-legal', accountId: 'shieldops', firstName: 'Thomas', lastName: 'Brennan', name: 'Thomas Brennan', role: 'General Counsel', department: 'Legal', type: 'legal', email: 't.brennan@shieldops.com', avatar: 'TB', focus: 'Security certifications, penetration test reports, incident response SLA' },
  { id: 'shieldops-procurement', accountId: 'shieldops', firstName: 'Yuki', lastName: 'Hashimoto', name: 'Yuki Hashimoto', role: 'Procurement Manager', department: 'Procurement', type: 'procurement', email: 'y.hashimoto@shieldops.com', avatar: 'YH', focus: 'Vendor risk assessment form, 90-day implementation plan, dedicated support' },
  // CipherEdge
  { id: 'cipheredge-legal', accountId: 'cipheredge', firstName: 'Monica', lastName: 'Strauss', name: 'Monica Strauss', role: 'Legal Director', department: 'Legal', type: 'legal', email: 'm.strauss@cipheredge.io', avatar: 'MS', focus: 'Source code escrow, strict exit clauses, encryption standards documentation' },
  { id: 'cipheredge-procurement', accountId: 'cipheredge', firstName: 'James', lastName: 'Okafor', name: 'James Okafor', role: 'Head of Procurement', department: 'Procurement', type: 'procurement', email: 'j.okafor@cipheredge.io', avatar: 'JO', focus: 'Multi-year discount negotiation, comparing 3 alternatives, price justification' },
  // ThreatNest
  { id: 'threatnest-legal', accountId: 'threatnest', firstName: 'Adriana', lastName: 'Kovacs', name: 'Adriana Kovacs', role: 'Senior Legal Counsel', department: 'Legal', type: 'legal', email: 'a.kovacs@threatnest.com', avatar: 'AK', focus: 'Incident response in contract, SLA penalties for breaches, indemnification' },
  { id: 'threatnest-procurement', accountId: 'threatnest', firstName: 'Brian', lastName: 'Sousa', name: 'Brian Sousa', role: 'Vendor Relations Director', department: 'Procurement', type: 'procurement', email: 'b.sousa@threatnest.com', avatar: 'BS', focus: 'Dedicated success manager, implementation support package, SLA tiers' },
  // Fortivex
  { id: 'fortivex-legal', accountId: 'fortivex', firstName: 'Lawrence', lastName: 'Mbeki', name: 'Lawrence Mbeki', role: 'VP & General Counsel', department: 'Legal', type: 'legal', email: 'l.mbeki@fortivex.com', avatar: 'LM', focus: 'IP infringement indemnification, mutual NDA, cross-border data transfer' },
  { id: 'fortivex-procurement', accountId: 'fortivex', firstName: 'Stephanie', lastName: 'Larsson', name: 'Stephanie Larsson', role: 'Global Procurement Lead', department: 'Procurement', type: 'procurement', email: 's.larsson@fortivex.com', avatar: 'SL', focus: 'Multi-region deployment, GDPR compliance certs, global support coverage' },
  // IronCore
  { id: 'ironcore-legal', accountId: 'ironcore', firstName: 'Diana', lastName: 'Petrov', name: 'Diana Petrov', role: 'Corporate Counsel', department: 'Legal', type: 'legal', email: 'd.petrov@ironcore.io', avatar: 'DP', focus: 'Product liability, safety compliance certifications, manufacturing data handling' },
  { id: 'ironcore-procurement', accountId: 'ironcore', firstName: 'Aaron', lastName: 'Whitfield', name: 'Aaron Whitfield', role: 'Supply Chain & Procurement Manager', department: 'Procurement', type: 'procurement', email: 'a.whitfield@ironcore.io', avatar: 'AW', focus: 'Vendor financial stability proof, support hours SLA, implementation timeline' },
  // PrecisionWorks
  { id: 'precisionworks-legal', accountId: 'precisionworks', firstName: 'Helen', lastName: 'Nakamura', name: 'Helen Nakamura', role: 'Legal Counsel', department: 'Legal', type: 'legal', email: 'h.nakamura@precisionworks.com', avatar: 'HN', focus: 'ITAR/EAR export controls, data handling procedures, compliance documentation' },
  { id: 'precisionworks-procurement', accountId: 'precisionworks', firstName: 'Victor', lastName: 'Osei', name: 'Victor Osei', role: 'Procurement Specialist', department: 'Procurement', type: 'procurement', email: 'v.osei@precisionworks.com', avatar: 'VO', focus: 'Formal RFP process required, 3-vendor price comparison policy, net-45 terms' },
  // NovaMach
  { id: 'novamach-legal', accountId: 'novamach', firstName: 'Gregory', lastName: 'Fontaine', name: 'Gregory Fontaine', role: 'Head of Legal', department: 'Legal', type: 'legal', email: 'g.fontaine@novamach.ai', avatar: 'GF', focus: 'AI output IP ownership, model training data usage rights, algorithmic audit rights' },
  { id: 'novamach-procurement', accountId: 'novamach', firstName: 'Priya', lastName: 'Chandrasekaran', name: 'Priya Chandrasekaran', role: 'Operations & Procurement Lead', department: 'Procurement', type: 'procurement', email: 'p.chandrasekaran@novamach.ai', avatar: 'PC', focus: 'Startup budget constraints, flexible payment terms, free trial extension request' },
  // FluxTech
  { id: 'fluxtech-legal', accountId: 'fluxtech', firstName: 'Natalie', lastName: 'Johansson', name: 'Natalie Johansson', role: 'Associate General Counsel', department: 'Legal', type: 'legal', email: 'n.johansson@fluxtech.io', avatar: 'NJ', focus: 'GDPR DPA mandatory before proceeding, SCCs for data transfer, EU data residency' },
  { id: 'fluxtech-procurement', accountId: 'fluxtech', firstName: 'Oliver', lastName: 'Mensah', name: 'Oliver Mensah', role: 'Category Manager', department: 'Procurement', type: 'procurement', email: 'o.mensah@fluxtech.io', avatar: 'OM', focus: 'Multi-currency invoicing, EU VAT handling, local support availability' },
  // Orbient
  { id: 'orbient-legal', accountId: 'orbient', firstName: 'Claudia', lastName: 'Herrera', name: 'Claudia Herrera', role: 'Legal Director', department: 'Legal', type: 'legal', email: 'c.herrera@orbient.com', avatar: 'CH', focus: 'MSA redlines, SCCs for cross-border transfer, clean exit rights, DPA' },
  { id: 'orbient-procurement', accountId: 'orbient', firstName: 'Samuel', lastName: 'Adeyemi', name: 'Samuel Adeyemi', role: 'Procurement & Vendor Manager', department: 'Procurement', type: 'procurement', email: 's.adeyemi@orbient.com', avatar: 'SA', focus: 'Implementation plan details, case studies from similar companies, references' },
  // QuantaAI
  { id: 'quantaai-legal', accountId: 'quantaai', firstName: 'Richard', lastName: 'Tan', name: 'Richard Tan', role: 'Chief Compliance Officer', department: 'Legal', type: 'legal', email: 'r.tan@quantaai.com', avatar: 'RT', focus: 'AI ethics compliance, model bias testing documentation, algorithmic audit rights' },
  { id: 'quantaai-procurement', accountId: 'quantaai', firstName: 'Fatima', lastName: 'Al-Rashid', name: 'Fatima Al-Rashid', role: 'Strategic Procurement Manager', department: 'Procurement', type: 'procurement', email: 'f.alrashid@quantaai.com', avatar: 'FA', focus: 'Rigorous price benchmarking, performance guarantees with SLA credits' },
  // PeakScale
  { id: 'peakscale-legal', accountId: 'peakscale', firstName: 'Catherine', lastName: 'Blum', name: 'Catherine Blum', role: 'General Counsel', department: 'Legal', type: 'legal', email: 'c.blum@peakscale.io', avatar: 'CB', focus: 'Flexible MSA for rapid scaling, standard DPA acceptable, IP ownership' },
  { id: 'peakscale-procurement', accountId: 'peakscale', firstName: 'Kwame', lastName: 'Asante', name: 'Kwame Asante', role: 'Head of Finance & Procurement', department: 'Procurement', type: 'procurement', email: 'k.asante@peakscale.io', avatar: 'KA', focus: 'Usage-based pricing preference, needs to scale quickly, minimal procurement friction' },
  // SwiftLogic
  { id: 'swiftlogic-legal', accountId: 'swiftlogic', firstName: 'Andrew', lastName: 'Kiptoo', name: 'Andrew Kiptoo', role: 'VP Legal', department: 'Legal', type: 'legal', email: 'a.kiptoo@swiftlogic.com', avatar: 'AK', focus: '99.9% uptime SLA with downtime credits, disaster recovery procedures, MSA' },
  { id: 'swiftlogic-procurement', accountId: 'swiftlogic', firstName: 'Ingrid', lastName: 'Sorensen', name: 'Ingrid Sorensen', role: 'Procurement Manager', department: 'Procurement', type: 'procurement', email: 'i.sorensen@swiftlogic.com', avatar: 'IS', focus: '24/7 support option, dedicated integration support during rollout, SLA tiers' },
  // BrightPath
  { id: 'brightpath-legal', accountId: 'brightpath', firstName: 'Yvonne', lastName: 'Dube', name: 'Yvonne Dube', role: 'Legal Counsel', department: 'Legal', type: 'legal', email: 'y.dube@brightpath.co', avatar: 'YD', focus: 'FERPA and COPPA compliance, data minimization, student data protection' },
  { id: 'brightpath-procurement', accountId: 'brightpath', firstName: 'Michael', lastName: 'Ferencz', name: 'Michael Ferencz', role: 'Operations Lead', department: 'Procurement', type: 'procurement', email: 'm.ferencz@brightpath.co', avatar: 'MF', focus: 'Education nonprofit pricing, multi-year deal with locked pricing, budget approval cycle' },
  // Medicore
  { id: 'medicore-legal', accountId: 'medicore', firstName: 'Vivian', lastName: 'Espinoza', name: 'Vivian Espinoza', role: 'Chief Privacy Officer', department: 'Legal', type: 'legal', email: 'v.espinoza@medicore.health', avatar: 'VE', focus: 'HIPAA BAA mandatory, PHI handling audit rights, US-only data residency' },
  { id: 'medicore-procurement', accountId: 'medicore', firstName: 'Nathan', lastName: 'Obi', name: 'Nathan Obi', role: 'IT Procurement Lead', department: 'Procurement', type: 'procurement', email: 'n.obi@medicore.health', avatar: 'NO', focus: 'Security questionnaire required, HITRUST certification, healthcare compliance' },
  // FinSight
  { id: 'finsight-legal', accountId: 'finsight', firstName: 'Eleanor', lastName: 'Castillo', name: 'Eleanor Castillo', role: 'Deputy General Counsel', department: 'Legal', type: 'legal', email: 'e.castillo@finsight.com', avatar: 'EC', focus: 'SOX compliance, right-to-audit clause, financial data handling procedures' },
  { id: 'finsight-procurement', accountId: 'finsight', firstName: 'Robert', lastName: 'Yamamoto', name: 'Robert Yamamoto', role: 'IT Sourcing Director', department: 'Procurement', type: 'procurement', email: 'r.yamamoto@finsight.com', avatar: 'RY', focus: 'Vendor risk assessment, insurance certificates, multi-year contract preferred' },
  // GreenAxis
  { id: 'greenaxis-legal', accountId: 'greenaxis', firstName: 'Sophie', lastName: 'Leblanc', name: 'Sophie Leblanc', role: 'Legal Counsel', department: 'Legal', type: 'legal', email: 's.leblanc@greenaxis.io', avatar: 'SL', focus: 'ESG vendor compliance criteria, sustainability reporting, carbon footprint disclosure' },
  { id: 'greenaxis-procurement', accountId: 'greenaxis', firstName: 'Emmanuel', lastName: 'Adjei', name: 'Emmanuel Adjei', role: 'Procurement & Sustainability Lead', department: 'Procurement', type: 'procurement', email: 'e.adjei@greenaxis.io', avatar: 'EA', focus: 'Carbon-neutral vendor certification, ESG compliance report, cost-conscious' }
];

export const getLegalStakeholder = (accountId) =>
  STAKEHOLDERS.find(s => s.accountId === accountId && s.type === 'legal');

export const getProcurementStakeholder = (accountId) =>
  STAKEHOLDERS.find(s => s.accountId === accountId && s.type === 'procurement');

export const getStakeholdersForAccount = (accountId) =>
  STAKEHOLDERS.filter(s => s.accountId === accountId);
