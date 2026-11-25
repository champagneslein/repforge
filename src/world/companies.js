// The sales world: 88 fictional accounts across 8 industries, 11 per industry
// (4 SMB, 4 Mid-Market, 3 Enterprise). Enterprise accounts have 30+ people.
// The original 20 accounts keep their hand-written people (enterprise ones are
// topped up); everything else comes from scripts/generate-world.mjs.
import { LEGACY_COMPANIES, LEGACY_EMPLOYEES } from './legacy';
import { LEGACY_OVERRIDES, GENERATED_COMPANIES, GENERATED_EMPLOYEES, LEGACY_EXTRA_EMPLOYEES } from './generated';

export const INDUSTRY_NAMES = ['SaaS', 'AI', 'Cyber Security', 'FinTech', 'Manufacturing', 'Food & Beverage', 'Professional Services', 'Healthcare'];
export const SEGMENTS = ['SMB', 'Mid-Market', 'Enterprise'];

export const companies = [
  ...LEGACY_COMPANIES.map(c => ({ ...c, ...(LEGACY_OVERRIDES[c.id] || {}) })),
  ...GENERATED_COMPANIES,
];

const legacy = {};
for (const [id, people] of Object.entries(LEGACY_EMPLOYEES)) legacy[id] = [...people, ...(LEGACY_EXTRA_EMPLOYEES[id] || [])];

export const allEmployees = { ...legacy, ...GENERATED_EMPLOYEES };
