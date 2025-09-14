import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './App';
import espada from './assets/images/espada.png';

// Injeta dinamicamente o favicon garantindo funcionamento com base path (/Zoro/)
function ensureFavicon() {
  const id = 'dynamic-favicon';
  let link = document.querySelector<HTMLLinkElement>(`link#${id}`);
  if (!link) {
    link = document.createElement('link');
    link.id = id;
    link.rel = 'icon';
    link.type = 'image/png';
    document.head.appendChild(link);
  }
  if (link.href !== espada) {
    link.href = espada;
  }
}
ensureFavicon();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
