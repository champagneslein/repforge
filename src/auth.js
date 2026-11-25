// Supabase email + password sign-in, talking to Supabase Auth over plain
// fetch (no SDK). The session lives in localStorage and is refreshed before it
// expires. Configure REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY.
import { useEffect, useState } from 'react';

const URL_ = (process.env.REACT_APP_SUPABASE_URL || '').replace(/\/$/, '');
const ANON = process.env.REACT_APP_SUPABASE_ANON_KEY || '';
const KEY = 'rf_session';
const listeners = new Set();

export const authConfigured = Boolean(URL_ && ANON);

function load() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } }
let session = load();

function setSession(s) {
  session = s;
  try { s ? localStorage.setItem(KEY, JSON.stringify(s)) : localStorage.removeItem(KEY); } catch (e) {}
  listeners.forEach(fn => fn(s));
}

function toSession(d) {
  if (!d || !d.access_token) return null;
  return { access_token: d.access_token, refresh_token: d.refresh_token, expires_at: d.expires_at || Math.floor(Date.now() / 1000) + (d.expires_in || 3600), user: d.user ? { id: d.user.id, email: d.user.email } : session?.user };
}

async function call(path, body, token) {
  const r = await fetch(URL_ + '/auth/v1' + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: ANON, ...(token ? { Authorization: 'Bearer ' + token } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d.error_description || d.msg || d.message || 'Something went wrong. Please try again.');
  return d;
}

export async function signIn(email, password) {
  const d = await call('/token?grant_type=password', { email, password });
  setSession(toSession(d));
}

// Returns 'signed_in', or 'confirm_email' when the project requires email confirmation.
export async function signUp(email, password) {
  const d = await call('/signup?redirect_to=' + encodeURIComponent(window.location.origin), { email, password });
  if (d.access_token) { setSession(toSession(d)); return 'signed_in'; }
  return 'confirm_email';
}

export async function signOut() {
  const t = session?.access_token;
  setSession(null);
  if (t) { try { await call('/logout', null, t); } catch (e) {} }
}

let refreshing = null;
async function refresh() {
  if (!session?.refresh_token) return null;
  if (!refreshing) {
    refreshing = call('/token?grant_type=refresh_token', { refresh_token: session.refresh_token })
      .then(d => { setSession(toSession(d)); return session; })
      .catch(() => { setSession(null); return null; })
      .finally(() => { refreshing = null; });
  }
  return refreshing;
}

// A valid access token for our /api functions, refreshed if it is about to expire.
export async function getApiToken() {
  if (!session) return null;
  if (session.expires_at - 60 < Date.now() / 1000) await refresh();
  return session?.access_token || null;
}

// After clicking the email confirmation link, Supabase sends the user back with
// the session in the URL hash. Store it and tidy the URL.
export function handleRedirect() {
  const h = window.location.hash;
  if (!h.includes('access_token=')) return;
  const p = new URLSearchParams(h.slice(1));
  setSession(toSession({ access_token: p.get('access_token'), refresh_token: p.get('refresh_token'), expires_in: Number(p.get('expires_in')) || 3600 }));
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
  // The hash carries no user details; fetch them.
  fetch(URL_ + '/auth/v1/user', { headers: { apikey: ANON, Authorization: 'Bearer ' + session.access_token } })
    .then(r => r.json()).then(u => { if (u?.id && session) setSession({ ...session, user: { id: u.id, email: u.email } }); }).catch(() => {});
}

export function useAuth() {
  const [s, setS] = useState(session);
  useEffect(() => { listeners.add(setS); return () => listeners.delete(setS); }, []);
  return s?.user ? s.user : null;
}

// Every call from the app to our own /api functions carries the signed-in
// user's token, so the server can refuse anonymous callers. Installed once
// at startup; calls to other sites are left untouched.
export function installApiAuth() {
  if (window.__rfApiAuth) return;
  window.__rfApiAuth = true;
  const orig = window.fetch.bind(window);
  window.fetch = async (input, init = {}) => {
    const url = typeof input === 'string' ? input : input && input.url;
    const sameOrigin = url && (url.startsWith('/api/') || url.startsWith(window.location.origin + '/api/'));
    if (!sameOrigin) return orig(input, init);
    const token = await getApiToken();
    const headers = new Headers(init.headers || (typeof input !== 'string' && input.headers) || {});
    if (token && !headers.has('Authorization')) headers.set('Authorization', 'Bearer ' + token);
    return orig(input, { ...init, headers });
  };
}
