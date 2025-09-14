import { Section } from '../ui/Section';

const images = Array.from({ length: 8 }).map((_, i) => ({
  src: `/src/assets/images/zoro${i + 1}.jpg`,
  alt: `Imagem ${i + 1} de Zoro` // Ajustar manualmente depois com descrições reais
}));

export function Gallery() {
  return (
    <Section id="gallery" title="Galeria" subtitle="Coleção visual temática.">
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {images.map(img => (
          <li
            key={img.src}
            className="group relative overflow-hidden rounded-xl aspect-square bg-zinc-900/40 border border-zinc-700/40 backdrop-blur-sm
            transition-all duration-500 hover:border-zoro-400/50 hover:shadow-[0_0_0_1px_rgba(39,208,125,0.25),0_0_18px_-4px_rgba(39,208,125,0.4)]"
          >
            <div className="absolute inset-px rounded-[0.7rem] bg-gradient-to-br from-zinc-800/40 via-zinc-900/20 to-zinc-900/50" />
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="relative z-10 w-full h-full object-cover object-center transform group-hover:scale-[1.06] transition-transform duration-700 ease-out"
            />
            <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_50%,rgba(39,208,125,0.28),transparent_68%)] mix-blend-overlay" />
            <span className="pointer-events-none absolute inset-0 rounded-xl ring-0 group-hover:ring-1 ring-inset ring-emerald-400/30 transition-all duration-500" />
            <span className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(130deg,rgba(39,208,125,0.4),transparent_30%,transparent_60%,rgba(39,208,125,0.35))] mix-blend-overlay" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
