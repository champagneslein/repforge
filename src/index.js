import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const s = document.createElement('script');
s.src = 'https://cdn.tailwindcss.com';
s.onload = function() {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};
document.head.appendChild(s);
