import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import { useEffect, useState } from 'react';
import { useScrollLock } from '../../hooks/useScrollLock';

/* Overlay inicial: bloqueia interação visual total com blur e solicita clique. */
interface AudioGateProps { scrollToHero?: () => void }
export function AudioGate({ scrollToHero }: AudioGateProps) {
  const { consent, setConsent } = useAudio();
  const [show, setShow] = useState(!consent);

  // Scroll lock enquanto o gate está ativo (hook reutilizável)
  useScrollLock(show);

  useEffect(() => { if (consent) setShow(false); }, [consent]);
  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 backdrop-blur-xl bg-black/70" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 10 }}
            transition={{ type: 'spring', stiffness: 210, damping: 25 }}
            className="relative max-w-md w-full text-center p-10 rounded-2xl border border-zoro-600/40 bg-zinc-900/70 shadow-glow-green"
          >
            <h1 className="font-display text-3xl mb-4 text-gradient-zoro">Entrar na presença do Caçador</h1>
            <p className="text-zinc-300 text-sm leading-relaxed mb-8">Para entrar na experiência, clique em Continuar. A trilha começará em volume moderado.</p>
            <button onClick={() => { setConsent(); /* scroll automático removido para diagnosticar jitter */ }} className="px-6 py-3 rounded-md bg-zoro-600/30 border border-zoro-500/60 text-zoro-100 hover:bg-zoro-600/50 transition-colors focus-ring font-medium">Continuar</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
