import { getApiToken } from './authConfig';

// Backend API helpers — tokens come from MSAL; the optional token parameter is
// kept only so legacy call sites don't need to change.
async function authHeader() {
  const t = await getApiToken();
  return t ? { Authorization: 'Bearer ' + t } : {};
}
export async function apiPost(path, body, _token) {
  const headers = { 'Content-Type': 'application/json', ...(await authHeader()) };
  const r = await fetch(path, { method: 'POST', headers, body: JSON.stringify(body) });
  if (!r.ok) { const d = await r.json().catch(() => ({})); throw new Error(d.error || r.statusText); }
  return r.json();
}
export async function apiGet(path, _token) {
  const r = await fetch(path, { headers: await authHeader() });
  if (!r.ok) return null;
  return r.json();
}
export async function apiPut(path, body, _token) {
  const headers = { 'Content-Type': 'application/json', ...(await authHeader()) };
  const r = await fetch(path, { method: 'PUT', headers, body: JSON.stringify(body) });
  if (!r.ok) { const d = await r.json().catch(() => ({})); throw new Error(d.error || r.statusText); }
  return r.json().catch(() => null);
}
export async function loadProgress(token) {
  const res = await apiGet('/api/progress', token);
  return res?.data ?? null;
}
export async function saveProgress(token, data) {
  await apiPut('/api/progress', { data }, token);
}
export async function loadGoldStandard() {
  const res = await apiGet('/api/goldstandard');
  return res?.data ?? null;
}
export async function saveGoldStandard(data) {
  await apiPut('/api/goldstandard', { data });
}

// One-shot OpenAI JSON completion using the user's own API key.
export async function gptJson(apiKey, prompt, maxTokens = 1000) {
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
    body: JSON.stringify({ model: 'gpt-4o', messages: [{ role: 'user', content: prompt }], max_tokens: maxTokens, temperature: 0.2, response_format: { type: 'json_object' } }),
  });
  const t = (await r.json()).choices?.[0]?.message?.content || '{}';
  return JSON.parse(t);
}

// Grading & coaching LLM — provider-agnostic via OpenAI-compatible endpoints.
// Google Gemini and Groq both have free tiers, ideal for testing.
export const LLM_PROVIDERS = {
  gemini: { label: 'Google Gemini (free tier)', base: 'https://generativelanguage.googleapis.com/v1beta/openai', model: 'gemini-2.5-flash', keyHint: 'AIza… — aistudio.google.com/apikey' },
  groq:   { label: 'Groq / Llama (free tier)',  base: 'https://api.groq.com/openai/v1',                          model: 'llama-3.3-70b-versatile', keyHint: 'gsk_… — console.groq.com/keys' },
  openai: { label: 'OpenAI (paid)',             base: 'https://api.openai.com/v1',                               model: 'gpt-4o', keyHint: 'sk-…' },
};

export function getLlmConfig() {
  const provider = localStorage.getItem('repforge_llm_provider') || 'openai';
  const preset = LLM_PROVIDERS[provider] || LLM_PROVIDERS.openai;
  // Fall back to the legacy OpenAI key so existing setups keep working.
  const key = localStorage.getItem('repforge_llm_key') || (provider === 'openai' ? localStorage.getItem('repforge_openai_key') || '' : '');
  return { provider, key, base: preset.base, model: preset.model };
}

export async function llmJson(prompt, maxTokens = 1000) {
  const { base, model, key } = getLlmConfig();
  if (!key) throw new Error('No grading AI key configured (Settings)');
  const r = await fetch(base + '/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
    body: JSON.stringify({ model, messages: [{ role: 'user', content: prompt }], max_tokens: maxTokens, temperature: 0.2, response_format: { type: 'json_object' } }),
  });
  const t = (await r.json()).choices?.[0]?.message?.content || '{}';
  // Some models wrap JSON in markdown fences despite response_format.
  const m = t.match(/\{[\s\S]*\}/);
  return JSON.parse(m ? m[0] : t);
}
