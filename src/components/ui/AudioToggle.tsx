import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import themeTrack from '../../assets/audio/zoro-theme.mp3';

interface AudioToggleProps {
  src?: string; // permite override futuro
  initialVolume?: number; // 0..1
}

/*
 * AudioToggle: reproduz tema após interação do usuário.
 * - Respeita autoplay policies: só inicia quando clicado.
 * - Persiste preferência em localStorage.
 * - Suporta fallback (silêncio se sem arquivo ainda).
 */
export function AudioToggle({ src, initialVolume = 0.6 }: AudioToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [volume, setVolume] = useState(initialVolume);
  const [hover, setHover] = useState(false);
  const [fading, setFading] = useState(false);

  // Ajusta volume no elemento
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const stored = localStorage.getItem('zoro:audio');
    if (stored === 'on') setEnabled(true);
  }, []);

  const fadeOut = useCallback(async () => {
    if (!audioRef.current) return;
    setFading(true);
    const start = audioRef.current.volume;
    const steps = 12;
    for (let i = 1; i <= steps; i++) {
      audioRef.current.volume = start * (1 - i / steps);
      await new Promise(r => setTimeout(r, 40));
    }
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.volume = volume; // restaura volume base
    setFading(false);
  }, [volume]);

  // Efeito apenas quando liga/desliga (não reinicia ao mudar volume)
  useEffect(() => {
    if (!audioRef.current) return;
    if (enabled) {
      const target = volume; // captura volume atual na ativação
      const play = async () => {
        try {
          audioRef.current!.currentTime = 0;
            audioRef.current!.volume = 0;
          await audioRef.current!.play();
          const steps = 12;
          for (let i = 1; i <= steps; i++) {
            audioRef.current!.volume = target * (i / steps);
            await new Promise(r => setTimeout(r, 45));
          }
          audioRef.current!.volume = target;
        } catch { /* ignore */ }
      };
      play();
      localStorage.setItem('zoro:audio', 'on');
    } else {
      fadeOut();
      localStorage.setItem('zoro:audio', 'off');
    }
  }, [enabled, fadeOut]);

  const toggle = () => setEnabled(e => !e);
  const incVolume = () => setVolume(v => Math.min(1, +(v + 0.1).toFixed(2)));
  const decVolume = () => setVolume(v => Math.max(0, +(v - 0.1).toFixed(2)));

  return (
    <div className="relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="flex items-center gap-2">
        <button
          onClick={toggle}
          className="group relative inline-flex items-center justify-center w-11 h-11 rounded-full border border-zinc-700/70 bg-zinc-900/70 backdrop-blur-md text-zoro-300 hover:text-zoro-100 hover:border-zoro-400/60 transition-colors focus-ring"
          aria-pressed={enabled}
          aria-label={enabled ? 'Desligar trilha de fundo' : 'Ligar trilha de fundo'}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" className={`transition-transform duration-300 ${enabled ? 'rotate-0' : '-rotate-45'}`} aria-hidden="true">
            <path d="M4 20L20 4" stroke="url(#grad1)" strokeWidth="2" strokeLinecap="round" />
            <path d="M9 4l6 16" stroke="url(#grad2)" strokeWidth="2" strokeLinecap="round" />
            {enabled && <path d="M3 12h18" stroke="url(#grad3)" strokeWidth="1.2" strokeLinecap="round" className="animate-pulse" />}
            <defs>
              <linearGradient id="grad1" x1="4" y1="20" x2="20" y2="4" gradientUnits="userSpaceOnUse">
                <stop stopColor="#27d07d" />
                <stop offset="1" stopColor="#0fa865" />
              </linearGradient>
              <linearGradient id="grad2" x1="9" y1="4" x2="15" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#27d07d" />
                <stop offset="1" stopColor="#068453" />
              </linearGradient>
              <linearGradient id="grad3" x1="3" y1="12" x2="21" y2="12" gradientUnits="userSpaceOnUse">
                <stop stopColor="#27d07d" stopOpacity="0" />
                <stop offset="0.5" stopColor="#27d07d" />
                <stop offset="1" stopColor="#27d07d" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <span className="sr-only">{enabled ? 'Trilha ligada' : 'Trilha desligada'}</span>
          <span className={`absolute inset-0 rounded-full ${enabled ? 'shadow-glow-green' : ''} pointer-events-none transition-opacity`} />
        </button>
        {/* Espaço reservado invisível para evitar empurrar layout */}
        <div className="w-0 h-0 relative">
          <AnimatePresence>
            {enabled && hover && !fading && (
              <motion.div
                initial={{ opacity: 0, x: 6, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 6, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="absolute left-full top-1/2 -translate-y-1/2 ml-2 flex items-center gap-1 pl-2 pr-2 py-1 rounded-full bg-zinc-900/85 border border-zinc-700/70 backdrop-blur-md shadow-glow-green"
                role="group"
                aria-label="Controle de volume"
              >
                <button onClick={decVolume} aria-label="Diminuir volume" className="w-6 h-6 text-xs rounded bg-zinc-800/70 hover:bg-zinc-700 text-zoro-200 focus-ring leading-none">-</button>
                <div className="h-1.5 w-24 bg-zinc-700/50 rounded overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-zoro-500 to-zoro-300 transition-[width] duration-150" style={{ width: `${Math.round(volume * 100)}%` }} />
                </div>
                <button onClick={incVolume} aria-label="Aumentar volume" className="w-6 h-6 text-xs rounded bg-zinc-800/70 hover:bg-zinc-700 text-zoro-200 focus-ring leading-none">+</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <audio
        ref={audioRef}
        onCanPlay={() => setReady(true)}
        loop
        preload="auto"
        src={src || themeTrack}
      />
      <div aria-live="polite" className="sr-only">
        {enabled ? 'Trilha de Zoro ativa' : 'Trilha desativada'}
      </div>
      <AnimatePresence>
        {!ready && enabled && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 -top-7 text-[10px] px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-300"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            carregando...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
