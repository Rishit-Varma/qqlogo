import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

declare global {
  interface Window {
    __qqMarkReady?: () => void;
  }
}

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Missing #root element in index.html');

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Signal the inline boot loader that the React tree has mounted. The
// loader will fast-forward its progress to 100% and fade itself out.
requestAnimationFrame(() => {
  window.__qqMarkReady?.();
});
