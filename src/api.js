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
