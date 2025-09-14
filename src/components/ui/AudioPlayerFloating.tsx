import { useAudio } from '../../context/AudioContext';
import { motion, AnimatePresence } from 'framer-motion';

export function AudioPlayerFloating() {
  const { status, play, pause, stop, incVolume, decVolume, volume } = useAudio();

  return (
    <div className="fixed bottom-4 right-4 z-50 select-none">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="group relative flex items-center gap-3 px-4 py-3 rounded-xl border border-zinc-700/60 bg-zinc-900/70 backdrop-blur-md shadow-glow-green"
      >
        <div className="flex items-center gap-2">
          {status !== 'playing' && (
            <button aria-label="Play" onClick={play} className="w-8 h-8 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zoro-300 hover:text-zoro-100 focus-ring flex items-center justify-center">▶</button>
          )}
          {status === 'playing' && (
            <button aria-label="Pausar" onClick={pause} className="w-8 h-8 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zoro-300 hover:text-zoro-100 focus-ring flex items-center justify-center">❚❚</button>
          )}
          <button aria-label="Parar" onClick={stop} disabled={status==='stopped'} className="w-8 h-8 rounded-md bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-zoro-300 hover:text-zoro-100 focus-ring flex items-center justify-center">■</button>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-zinc-400 tracking-wide">
          <span className="uppercase">{status}</span>
        </div>
        <div className="flex items-center gap-1 ml-2">
          <button aria-label="Diminuir volume" onClick={decVolume} className="w-6 h-6 text-xs rounded bg-zinc-800 hover:bg-zinc-700 text-zoro-200 focus-ring leading-none">-</button>
          <div className="h-1.5 w-24 bg-zinc-700/40 rounded overflow-hidden">
            <div className="h-full bg-gradient-to-r from-zoro-500 to-zoro-300 transition-[width] duration-150" style={{ width: `${Math.round(volume * 100)}%` }} />
          </div>
          <button aria-label="Aumentar volume" onClick={incVolume} className="w-6 h-6 text-xs rounded bg-zinc-800 hover:bg-zinc-700 text-zoro-200 focus-ring leading-none">+</button>
        </div>
      </motion.div>
    </div>
  );
}
