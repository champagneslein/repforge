import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConversationProvider } from '@elevenlabs/react';
import { handleRedirect, installApiAuth } from './auth';
import './style.css';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const s = document.createElement('script');
s.src = 'https://cdn.tailwindcss.com';
s.onload = function() {
  handleRedirect(); // picks up the session after an email confirmation link
  installApiAuth(); // signs every /api request with the user's session
  root.render(
    <StrictMode>
      <ConversationProvider>
        <App />
      </ConversationProvider>
    </StrictMode>
  );
};
document.head.appendChild(s);
