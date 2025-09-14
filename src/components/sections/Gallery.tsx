import { Section } from '../ui/Section';
// Import estático das imagens para que o bundler (Vite) gere URLs corretas com hash.
// Caminho absoluto "/src/..." quebra no build (GitHub Pages) porque esses arquivos
// são processados e movidos para /Zoro/assets/ com nomes com hash. Imports resolvem isso.
import z1 from '../../assets/images/zoro1.jpg';
import z2 from '../../assets/images/zoro2.jpg';
import z3 from '../../assets/images/zoro3.jpg';
import z4 from '../../assets/images/zoro4.jpg';
import z5 from '../../assets/images/zoro5.jpg';
import z6 from '../../assets/images/zoro6.jpg';
import z7 from '../../assets/images/zoro7.jpg';
import z8 from '../../assets/images/zoro8.jpg';

const images = [
  { src: z1, alt: 'Zoro em pose de batalha 1' },
  { src: z2, alt: 'Zoro concentrado 2' },
  { src: z3, alt: 'Zoro atacando 3' },
  { src: z4, alt: 'Zoro com três espadas 4' },
  { src: z5, alt: 'Zoro preparando técnica 5' },
  { src: z6, alt: 'Zoro após batalha 6' },
  { src: z7, alt: 'Zoro foco intenso 7' },
  { src: z8, alt: 'Zoro silhueta dramática 8' }
];

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
