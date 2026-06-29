import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConversationProvider } from '@elevenlabs/react';
import './style.css';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const s = document.createElement('script');
s.src = 'https://cdn.tailwindcss.com';
s.onload = function() {
  root.render(
    <StrictMode>
      <ConversationProvider>
        <App />
      </ConversationProvider>
    </StrictMode>
  );
};
document.head.appendChild(s);
