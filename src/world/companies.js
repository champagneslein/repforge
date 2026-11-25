// The sales world: 80 fictional accounts across 8 industries, 10 per industry
// (4 SMB, 4 Mid-Market, 2 Enterprise). The original 20 accounts keep their
// hand-written people; the other 60 come from scripts/generate-world.mjs.
import { LEGACY_COMPANIES, LEGACY_EMPLOYEES } from './legacy';
import { LEGACY_OVERRIDES, GENERATED_COMPANIES, GENERATED_EMPLOYEES } from './generated';

export const INDUSTRY_NAMES = ['SaaS', 'AI', 'Cyber Security', 'FinTech', 'Manufacturing', 'Food & Beverage', 'Professional Services', 'Healthcare'];
export const SEGMENTS = ['SMB', 'Mid-Market', 'Enterprise'];

export const companies = [
  ...LEGACY_COMPANIES.map(c => ({ ...c, ...(LEGACY_OVERRIDES[c.id] || {}) })),
  ...GENERATED_COMPANIES,
];

export const allEmployees = { ...LEGACY_EMPLOYEES, ...GENERATED_EMPLOYEES };
