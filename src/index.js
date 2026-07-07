import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConversationProvider } from '@elevenlabs/react';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from './authConfig';
import './style.css';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const s = document.createElement('script');
s.src = 'https://cdn.tailwindcss.com';
s.onload = async function() {
  await msalInstance.initialize();
  await msalInstance.handleRedirectPromise().catch(() => {});
  root.render(
    <StrictMode>
      <ConversationProvider>
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
      </ConversationProvider>
    </StrictMode>
  );
};
document.head.appendChild(s);
