import { PublicClientApplication } from '@azure/msal-browser';

export const API_SCOPES = ['api://3cb03558-710b-4a35-a82c-8936f112ac25/access_as_user'];

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: '3cb03558-710b-4a35-a82c-8936f112ac25',
    authority: 'https://repforgecustomers.ciamlogin.com/144ce918-4124-41e9-9cce-8d2204fd1cde/v2.0',
    knownAuthorities: ['repforgecustomers.ciamlogin.com'],
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: { cacheLocation: 'localStorage' },
});

// Returns a valid access token for the RepForge API, refreshing silently if needed.
export async function getApiToken() {
  const account = msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0];
  if (!account) return null;
  try {
    const res = await msalInstance.acquireTokenSilent({ scopes: API_SCOPES, account });
    return res.accessToken;
  } catch (e) {
    // Silent refresh failed (expired session) — force a full sign-in
    try { await msalInstance.acquireTokenRedirect({ scopes: API_SCOPES }); } catch {}
    return null;
  }
}
