import { ReactNode, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './Navbar';
import { AudioProvider } from '../../context/AudioContext';
import { AudioGate } from '../ui/AudioGate';
import { AudioPlayerFloating } from '../ui/AudioPlayerFloating';
import { EpicBackground } from '../visual/EpicBackground';

interface LayoutProps { children: ReactNode }

export function Layout({ children }: LayoutProps) {
  // Função de scroll suave com offset da navbar
  let scrolling = false;
  const smoothScrollTo = (hash: string) => {
    if (scrolling) return; // evita múltiplas filas de animação
    if (!hash.startsWith('#')) return;
    const el = document.querySelector(hash) as HTMLElement | null;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const NAV_OFFSET = 72; // altura aproximada do header
    const rect = el.getBoundingClientRect();
    const targetY = window.scrollY + rect.top - NAV_OFFSET;
    if (prefersReduced) {
      window.scrollTo(0, targetY);
      return;
    }
    scrolling = true;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
    // Estimar duração ~ baseado em distância (simplificado)
    const distance = Math.abs(window.scrollY - targetY);
    const est = Math.min(1200, 300 + distance * 0.4);
    setTimeout(() => { scrolling = false; }, est);
  };

  // Interceptar clicks em anchors internos
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const a = (e.target as HTMLElement).closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const urlPart = href.split('#')[1];
      if (!urlPart) return;
      e.preventDefault();
      smoothScrollTo(`#${urlPart}`);
      history.replaceState(null, '', `#${urlPart}`);
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Auto scroll inicial sempre para o hero (mesmo se já existia rolagem)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (location.hash && location.hash !== '#hero') return; // respeita navegação direta a outra âncora
    let raf = requestAnimationFrame(() => {
      const heroEl = document.querySelector('#hero');
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      const NAV_OFFSET = 72;
      const targetY = window.scrollY + rect.top - NAV_OFFSET;
      if (prefersReduced) {
        window.scrollTo(0, targetY);
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <AudioProvider>
  <div className="relative min-h-screen no-anchor">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[110] px-4 py-2 rounded bg-zoro-600/80 text-white text-sm shadow-glow-green">Pular para conteúdo</a>
  <EpicBackground />
        <header>
          <Navbar />
        </header>
        <main id="main-content" className="pt-20 relative z-10" role="main">
          {children}
        </main>
        <footer className="mt-20 pb-10 text-center text-[11px] text-zinc-600" aria-label="Rodapé">
          <p>Projeto temático não oficial. Sem fins comerciais.</p>
        </footer>
        <EasterEgg />
        <AudioGate scrollToHero={() => smoothScrollTo('#hero')} />
        <AudioPlayerFloating />
      </div>
    </AudioProvider>
  );
}

// CanvasParticles removidos; EpicBackground assume responsabilidade visual.

function EasterEgg() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handler() {
      previouslyFocused.current = document.activeElement as HTMLElement;
      setOpen(true);
      setCount(c => c + 1);
    }
    document.addEventListener('zoro:easter', handler as EventListener);
    return () => document.removeEventListener('zoro:easter', handler as EventListener);
  }, []);

  useEffect(() => {
    if (open && dialogRef.current) {
      const focusable = dialogRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
    } else if (!open && previouslyFocused.current) {
      previouslyFocused.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
      } else if (e.key === 'Tab' && dialogRef.current) {
        const nodes = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        ).filter((n: HTMLElement) => !n.hasAttribute('disabled')) as HTMLElement[];
        if (!nodes.length) return;
        const first: HTMLElement = nodes[0];
        const last: HTMLElement = nodes[nodes.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="easter-title"
          aria-describedby="easter-desc"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.div
            ref={dialogRef}
            initial={{ scale: 0.85, opacity: 0, rotate: -2 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.9, opacity: 0, rotate: 3 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="relative w-full max-w-md rounded-xl border border-zoro-500/30 bg-zinc-900/80 p-8 shadow-glow-green"
          >
            <button onClick={() => setOpen(false)} className="absolute top-2 right-2 text-zinc-500 hover:text-zoro-200 focus-ring" aria-label="Fechar">×</button>
            <h3 id="easter-title" className="font-display text-2xl text-gradient-zoro mb-4">Zoro se perdeu!</h3>
            <p id="easter-desc" className="text-sm text-zinc-300 leading-relaxed mb-4">
              Ele estava a um passo do destino... e virou para o lado errado. ({count})
            </p>
            <ul className="text-xs text-zinc-500 space-y-1 mb-6">
              <li>• Rumores dizem que um log pose chora ao ver o Zoro chegando.</li>
              <li>• Probabilidade de estar no lugar certo: 0.0001%.</li>
              <li>• Direção atual: <em className="not-italic text-zoro-300">"???"</em></li>
            </ul>
            <div className="flex justify-end gap-3">
              <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 hover:border-zoro-400/50 hover:text-zoro-200 text-xs transition-colors focus-ring">Voltar</button>
              <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-md bg-zoro-600/30 border border-zoro-500/60 text-zoro-100 hover:bg-zoro-600/40 text-xs transition-colors focus-ring">Continuar perdido</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

