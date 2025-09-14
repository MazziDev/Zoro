import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import themeTrack from '../assets/audio/zoro-theme.mp3';

// Estados possíveis do player
export type AudioStatus = 'stopped' | 'playing' | 'paused';

interface AudioContextValue {
  status: AudioStatus;
  consent: boolean; // usuário autorizou iniciar experiência
  volume: number;   // 0..1
  play: () => void;
  pause: () => void;
  stop: () => void;
  incVolume: () => void;
  decVolume: () => void;
  setVolume: (v: number) => void;
  setConsent: () => void;
}

const Ctx = createContext<AudioContextValue | null>(null);

interface ProviderProps { children: ReactNode; src?: string; initialVolume?: number }

export function AudioProvider({ children, src, initialVolume = 0.55 }: ProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<AudioStatus>('stopped');
  const [consent, setConsentState] = useState(false);
  const [volume, setVolumeState] = useState<number>(() => {
    const saved = localStorage.getItem('zoro:vol');
    return saved ? Math.min(1, Math.max(0, parseFloat(saved))) : initialVolume;
  });

  // Monta elemento apenas uma vez
  useEffect(() => {
    const el = new Audio(src || themeTrack);
    el.loop = true;
    el.preload = 'auto';
    el.volume = volume;
    audioRef.current = el;
    return () => { el.pause(); };
  }, [src]);

  // Persistir volume
  useEffect(() => { localStorage.setItem('zoro:vol', volume.toString()); if (audioRef.current) audioRef.current.volume = volume; }, [volume]);

  const safe = () => audioRef.current; // helper

  const play = useCallback(() => {
    const el = safe();
    if (!el) return;
    el.volume = volume; // garantir volume atual
    el.play().then(() => setStatus('playing')).catch(() => {});
  }, [volume]);

  const pause = useCallback(() => {
    const el = safe(); if (!el) return;
    el.pause();
    setStatus('paused');
  }, []);

  const stop = useCallback(() => {
    const el = safe(); if (!el) return;
    el.pause();
    el.currentTime = 0; // só aqui reinicia
    setStatus('stopped');
  }, []);

  const incVolume = () => setVolumeState(v => Math.min(1, +(v + 0.1).toFixed(2)));
  const decVolume = () => setVolumeState(v => Math.max(0, +(v - 0.1).toFixed(2)));

  const setConsent = () => {
    setConsentState(true);
    setStatus('playing');
    setTimeout(() => play(), 0);
  };

  const value: AudioContextValue = {
    status,
    consent,
    volume,
    play: () => { if (status !== 'playing') play(); },
    pause: () => { if (status === 'playing') pause(); },
    stop: () => { if (status !== 'stopped') stop(); },
    incVolume,
    decVolume,
    setVolume: setVolumeState,
    setConsent
  };

  // Atalhos globais (ignoram se consent ainda não dado)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!consent) return;
      if (e.key.toLowerCase() === 'm') {
        if (status === 'playing') pause(); else play();
      } else if (e.key === 'ArrowUp' && e.shiftKey) {
        e.preventDefault(); incVolume();
      } else if (e.key === 'ArrowDown' && e.shiftKey) {
        e.preventDefault(); decVolume();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [consent, status, play, pause]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAudio() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAudio deve ser usado dentro de <AudioProvider>');
  return ctx;
}
