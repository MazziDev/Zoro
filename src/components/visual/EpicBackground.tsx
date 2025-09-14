import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../lib/accessibility';
import { Z } from '../../theme/theme';

/* EpicBackground
   Camadas décor performáticas (sem partículas isoladas):
   - base gradient
   - noise overlay (data URI)
   - linhas de energia
   - pulses circulares (haki)
   - aura cônica lenta
*/
export function EpicBackground(){
  const reduce = prefersReducedMotion();
  const energyRef = useRef<HTMLDivElement|null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(()=>{
    setMounted(true); // evita flash de elementos antes da hidratação / animação
  },[]);

  useEffect(()=>{
    if(reduce) return;
    // Espaço reservado para ajustes futuros com rAF.
  },[reduce]);

  const noise = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" preserveAspectRatio="none"><filter id="n"><feTurbulence baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter><rect width="200" height="200" filter="url(%23n)" opacity="0.18"/></svg>';

  return (
  <div className="pointer-events-none fixed inset-0 no-anchor" aria-hidden style={{ zIndex: Z.background }}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(39,208,125,0.16),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#020303_10%,#050607_75%)]" />
      {/* Noise */}
      <div className="absolute inset-0 mix-blend-soft-light opacity-40" style={{ backgroundImage:`url(${noise})`, backgroundSize:'180px 180px' }} />
      {/* Aura cônica lenta */}
  <div className="absolute inset-0 opacity-40 mix-blend-plus-lighter bg-[conic-gradient(from_140deg_at_60%_40%,rgba(40,255,180,0.12),rgba(0,0,0,0)_70%)] animate-[spin_60s_linear_infinite] no-anchor" />
      {/* Energy line sweeping */}
      {/* Energy sweep temporariamente desativado para diagnóstico de auto-scroll */}
      {/* {!reduce && (
        <div ref={energyRef} className="absolute top-1/3 left-0 w-full h-40 overflow-hidden">
          <div className="absolute inset-0 animate-energy-sweep bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent blur-[2px]" />
        </div>
      )} */}
      {/* Haki pulses */}
      {!reduce && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div
            className={
              `relative w-[110vmin] h-[110vmin] transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`
            }
          >
            <span className="absolute inset-0 rounded-full border border-emerald-400/25 animate-ring-pulse will-change-transform" />
            <span className="absolute inset-0 rounded-full border border-emerald-400/15 animate-[ringPulse_6.6s_ease-out_1.8s_infinite] will-change-transform" />
            <span className="absolute inset-0 rounded-full border border-emerald-400/10 animate-[ringPulse_7.4s_ease-out_3.2s_infinite] will-change-transform" />
          </div>
        </div>
      )}
      {/* Lower mask for readability */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050607] to-transparent" />
    </div>
  );
}
