import { motion } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';
import { prefersReducedMotion } from '../../lib/accessibility';
import { QUOTES, DUR } from '../../theme/theme';

/* Hero Section Parallax + Impact Quote */
export function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  // Refs para camadas de parallax
  const bgLayerRef = useRef<HTMLDivElement | null>(null);
  const midLayerRef = useRef<HTMLDivElement | null>(null);
  const frontLayerRef = useRef<HTMLDivElement | null>(null);
  const reduce = prefersReducedMotion();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [hakiFlash, setHakiFlash] = useState(false);

  // Rotação de citações
  useEffect(() => {
    if (reduce) return; // não rotaciona se reduced motion
    const id = setInterval(() => {
      setQuoteIndex(q => (q + 1) % QUOTES.length);
    }, DUR.quoteRotate);
    return () => clearInterval(id);
  }, [reduce]);


  // Tecla H dispara flash Haki
  const triggerHaki = useCallback(() => {
    if (hakiFlash) return; // cooldown simples
    setHakiFlash(true);
    setTimeout(() => setHakiFlash(false), DUR.hakiFlash);
  }, [hakiFlash]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key.toLowerCase() === 'h') triggerHaki(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [triggerHaki]);

  // Parallax custom leve
  useEffect(() => {
    if (!ref.current) return;
    if (reduce) return; // respeita preferência

    const section = ref.current;
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        // progress: 0 (top at vh) a 1 (top passou totalmente para cima)
        const progress = 1 - Math.min(Math.max((rect.top + rect.height) / (vh + rect.height), 0), 1);
        // offset baseado na posição do topo dentro da viewport
        // Simples: quanto mais scroll, mais desloca. Clamps suaves.
        const base = rect.top; // px relativo à viewport
        // Fatores diferentes para profundidade (negativo move mais lento pra cima)
        const bgY = base * 0.20;   // camada de fundo desloca menos
        const midY = base * 0.35;  // intermediária
        const frontY = base * 0.10; // frente quase fixa
        if (bgLayerRef.current) {
          bgLayerRef.current.style.transform = `translate3d(0, ${bgY}px, 0)`;
        }
        if (midLayerRef.current) {
          midLayerRef.current.style.transform = `translate3d(0, ${midY}px, 0)`;
        }
        if (frontLayerRef.current) {
          frontLayerRef.current.style.transform = `translate3d(0, ${frontY}px, 0)`;
        }
        ticking = false;
      });
    }

    // Inicializa na posição atual
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduce]);

  // Layering simplificado (ver theme.ts): background (0) -> heroBg (10) -> decor (12) -> fx (15) -> content (20)

  return (
  <section id="hero" ref={ref} className="relative h-screen min-h-[640px] w-full flex items-center justify-center overflow-hidden" aria-labelledby="hero-heading">
      {/* Background gradient + subtle video placeholder */}
  <motion.div ref={bgLayerRef} className="absolute inset-0 z-[10] will-change-transform" aria-hidden>
    {/* Ajuste: hotspot centralizado e linear menos agressivo para revelar partículas (canvas em z-[5]) */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(39,208,125,0.11),transparent_75%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#050607_4%,#050607_50%)]" />
    {/* Aura central suave */}
    <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[58vmin] h-[58vmin] rounded-full opacity-40 bg-[radial-gradient(circle_at_50%_50%,rgba(39,208,125,0.35),rgba(39,208,125,0.05)_55%,transparent_70%)] animate-[auraPulse_7s_ease-in-out_infinite] blur-[18px]" />
      </motion.div>

      {/* Mid layer: abstract swords silhouettes (placeholder shapes) + energy mesh */}
  <motion.div ref={midLayerRef} className="pointer-events-none absolute inset-0 z-[12] will-change-transform" aria-hidden>
        {/* Energy mesh (masked diagonal grid) */}
        {!reduce && (
          <div className="absolute inset-0 opacity-60 mix-blend-screen">
            <div className="absolute inset-0 animate-mesh-shimmer [background-image:repeating-linear-gradient(110deg,rgba(39,208,125,0.08)_0px,rgba(39,208,125,0.08)_2px,transparent_2px,transparent_8px)]" style={{maskImage:'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage:'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'}} />
          </div>
        )}
        {/* Caustic drift overlay */}
        {!reduce && (
          <div className="absolute inset-0 opacity-[0.15] mix-blend-plus-lighter animate-[driftDiag_26s_linear_infinite] bg-[radial-gradient(circle_at_30%_40%,rgba(39,208,125,0.18),transparent_60%),radial-gradient(circle_at_70%_60%,rgba(39,208,125,0.12),transparent_65%)]" />
        )}
        {/** Espadas com brilho pulsante */}
        <div className="absolute left-[12%] top-[15%] h-72 w-px bg-gradient-to-b from-zoro-500/50 via-zoro-400/10 to-transparent blur-[1px] animate-pulse-glow" />
        <div className="absolute right-[18%] top-[8%] h-96 w-px bg-gradient-to-b from-zoro-400/60 via-zoro-300/10 to-transparent blur-[1px] rotate-[6deg] animate-pulse-glow" />
        <div className="absolute left-[45%] top-[5%] h-[430px] w-px bg-gradient-to-b from-zoro-300/60 via-zoro-200/10 to-transparent blur-[1px] -rotate-[4deg] animate-pulse-glow" />
        {/* Sword arcs (SVG) */}
        {/* Sword arcs removidos; substituiremos por efeitos mais estáveis */}
      </motion.div>

      {/* Slash highlight primário (rápido corte diagonal) */}
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: 1.2 }}
        >
          <div className="absolute left-1/4 top-1/4 w-[140%] h-px -rotate-12 bg-gradient-to-r from-transparent via-zoro-400/70 to-transparent blur-[2px]" />
        </motion.div>
      )}

      {/* Slash secundário mais estreito e defasado */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 overflow-visible">
          <div className="absolute left-[-10%] top-1/2 w-[160%] h-[2px] -rotate-[18deg] bg-gradient-to-r from-transparent via-zoro-300/60 to-transparent blur-[1px] animate-slash-secondary" />
        </div>
      )}

      {/* Foreground: Title + Quote */}
  <motion.div
    ref={frontLayerRef}
    // front almost static, slight transform applied in effect
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
  className="relative z-[20] px-6 text-center max-w-4xl"
      >
  <h1 id="hero-heading" className="font-display text-5xl md:text-6xl lg:text-7xl leading-tight tracking-wide animate-glow-pulse relative">
          <span className="block text-gradient-zoro drop-shadow">Roronoa Zoro</span>
          <span className="block mt-4 text-xl md:text-2xl font-body text-zinc-300/90 relative">
            <span className="inline-block overflow-hidden">
              <span key={quoteIndex} className="block will-change-transform animate-[quoteFadeIn_.6s_var(--ease-out)]">O espadachim que corta o impossível.</span>
            </span>
          </span>
          {/* Haki flash overlay inside title */}
          {hakiFlash && !reduce && (
            <span className="pointer-events-none absolute inset-0 animate-haki-flash bg-[radial-gradient(circle_at_50%_50%,rgba(39,208,125,0.5),transparent_70%)]" />
          )}
          {/* Brilho passando sobre o título (shine pass) */}
          {!reduce && (
            <span className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
              <span className="block absolute top-0 left-0 h-full w-1/3 translate-x-[-120%] bg-gradient-to-r from-transparent via-zoro-200/25 to-transparent blur-[6px] animate-shine" />
            </span>
          )}
        </h1>
        <p className="mt-10 text-zinc-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed relative">
          <span className="block overflow-hidden">
            <span key={quoteIndex+ 'q'} className="block animate-[quoteFadeIn_.6s_var(--ease-out)]">{QUOTES[quoteIndex]}</span>
          </span>
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#bio" className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium rounded-md bg-zoro-500/20 border border-zoro-500/50 text-zoro-100 hover:bg-zoro-500/30 backdrop-blur-sm transition-colors focus-ring overflow-hidden">
            <span className="relative z-10">Ver trajetória</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-zoro-500/0 via-zoro-400/10 to-zoro-500/0 transition-opacity" />
          </a>
          <button
            className="relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium rounded-md bg-zinc-900/60 border border-zinc-700 text-zinc-300 hover:border-zoro-400/60 hover:text-zoro-100 transition-colors focus-ring"
            data-easter-trigger
            onClick={() => document.dispatchEvent(new CustomEvent('zoro:easter'))}
          >
            Perdi o caminho
          </button>
        </div>
      </motion.div>

      {/* Motes removidos temporariamente (diagnóstico) */}
      {/* Cluster de motes leves - sem canvas */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 z-[15]" aria-hidden>
          <div className="absolute left-[18%] top-[36%] w-40 h-40">
            {Array.from({ length: 14 }).map((_,i) => {
              const dx = (Math.random()*100).toFixed(2);
              const dy = (Math.random()*100).toFixed(2);
              const delay = (Math.random()*6).toFixed(2);
              const size = [2,3,4][Math.floor(Math.random()*3)];
              const opacity = (0.25 + Math.random()*0.5).toFixed(2);
              return (
                <span key={i} className="absolute rounded-full bg-zoro-300/70 animate-[moteFloat_9s_ease-in-out_infinite]" style={{ left:`${dx}%`, top:`${dy}%`, width:size, height:size, animationDelay:`${delay}s`, opacity }} />
              );
            })}
          </div>
          <div className="absolute right-[14%] top-[30%] w-48 h-48">
            {Array.from({ length: 18 }).map((_,i) => {
              const dx = (Math.random()*100).toFixed(2);
              const dy = (Math.random()*100).toFixed(2);
              const delay = (Math.random()*7).toFixed(2);
              const size = [2,2,3,4][Math.floor(Math.random()*4)];
              const opacity = (0.18 + Math.random()*0.45).toFixed(2);
              return (
                <span key={i} className="absolute rounded-full bg-zoro-200/60 animate-[moteFloat_11s_ease-in-out_infinite]" style={{ left:`${dx}%`, top:`${dy}%`, width:size, height:size, animationDelay:`${delay}s`, opacity }} />
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom fade for readability */}
  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050607]/85 to-transparent" aria-hidden />
    </section>
  );
}
