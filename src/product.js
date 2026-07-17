// Product knowledge schema — shared by the trainee's setup survey and the
// customer-provided gold standard. `m` = multiline, `lines` = parse as array.
export const PRODUCT_FIELDS = [
  { k:'name',           l:'Product Name',                        ph:'e.g. Acme CRM',                                                        m:false, sec:'Basics' },
  { k:'desc',           l:'Elevator Pitch (30 seconds)',         ph:'What is it, who is it for, why does it win — in 2-3 sentences',        m:true,  sec:'Basics' },
  { k:'problems',       l:'Problems & Pain Points Solved',       ph:'The concrete pains a prospect feels before buying',                    m:true,  sec:'Basics' },
  { k:'icp',            l:'Ideal Customer Profile',              ph:'e.g. B2B SaaS, 50-500 employees, VP Sales owns the budget',            m:false, sec:'Market' },
  { k:'personas',       l:'Buying Committee & Personas',         ph:'Who champions it, who signs, who evaluates, who blocks',               m:true,  sec:'Market' },
  { k:'competitors',    l:'Competitors & Why We Win',            ph:'Main alternatives (incl. spreadsheets/status quo) and our edge',       m:true,  sec:'Market' },
  { k:'vps',            l:'Value Props (one per line)',          ph:'Saves 5hrs/week\nReduces churn 20%',                                   m:true,  sec:'Pitch', lines:true },
  { k:'proof',          l:'Proof Points',                        ph:'Case studies, ROI numbers, marquee customers, awards',                 m:true,  sec:'Pitch' },
  { k:'pricing',        l:'Pricing & Packaging',                 ph:'Tiers, typical deal size, billing model, discount policy',             m:true,  sec:'Commercials' },
  { k:'implementation', l:'Implementation & Integrations',       ph:'Time to go live, onboarding effort, key integrations, who does what',  m:true,  sec:'Commercials' },
  { k:'objs',           l:'Objections & Rebuttals (one per line: objection | rebuttal)', ph:'Too expensive | ROI pays back in 4 months\nWe have a tool | Ask what it breaks at scale', m:true, sec:'Field Readiness', lines:true },
  { k:'discovery',      l:'Key Discovery Questions (one per line)', ph:'What does this problem cost you today?\nWho else feels this pain?', m:true,  sec:'Field Readiness', lines:true },
];

export function formToProduct(f) {
  return {
    product_name: f.name || '', product_description: f.desc || '', problems: f.problems || '',
    icp: f.icp || '', personas: f.personas || '', competitors: f.competitors || '',
    value_props: (f.vps || '').split('\n').filter(Boolean), proof: f.proof || '',
    pricing: f.pricing || '', implementation: f.implementation || '',
    objections: (f.objs || '').split('\n').filter(Boolean),
    discovery_questions: (f.discovery || '').split('\n').filter(Boolean),
  };
}
export function productToForm(p) {
  if (!p) return { name:'', desc:'', problems:'', icp:'', personas:'', competitors:'', vps:'', proof:'', pricing:'', implementation:'', objs:'', discovery:'' };
  return {
    name: p.product_name || '', desc: p.product_description || '', problems: p.problems || '',
    icp: p.icp || '', personas: p.personas || '', competitors: p.competitors || '',
    vps: (p.value_props || []).join('\n'), proof: p.proof || '',
    pricing: p.pricing || '', implementation: p.implementation || '',
    objs: (p.objections || []).join('\n'), discovery: (p.discovery_questions || []).join('\n'),
  };
}
// Serializes a product profile into prompt context for the AI personas.
export function productContext(p) {
  if (!p) return '';
  const parts = ['\n\n--- PRODUCT BEING PITCHED (ground truth) ---', 'Product: ' + p.product_name + '. ' + (p.product_description || '')];
  if (p.problems) parts.push('Problems it solves: ' + p.problems);
  if (p.icp) parts.push('Target customer: ' + p.icp);
  if (p.personas) parts.push('Buying committee: ' + p.personas);
  if (p.competitors) parts.push('Competitive landscape: ' + p.competitors);
  if ((p.value_props || []).length) parts.push('Value props: ' + p.value_props.join('; '));
  if (p.proof) parts.push('Proof points: ' + p.proof);
  if (p.pricing) parts.push('Pricing: ' + p.pricing);
  if (p.implementation) parts.push('Implementation: ' + p.implementation);
  if ((p.objections || []).length) parts.push('Known objections and strong rebuttals: ' + p.objections.join('; '));
  return parts.join('\n');
}
