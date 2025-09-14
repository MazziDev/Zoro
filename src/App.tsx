import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { Section } from './components/ui/Section';
import { bio } from './data/bio';
import { techniqueCategories } from './data/techniques';
import { iconicMoments } from './data/moments';
import { Hero } from './components/sections/Hero';
import { Gallery } from './components/sections/Gallery';

function App() {
  const [ready] = useState(true);
  return (
    <Layout>
      <Hero />
      {/* Seção Biografia */}
      <Section id="bio" title={bio.title} subtitle="Visão resumida da jornada.">
        <div className="relative pl-10 before:content-[''] before:absolute before:left-4 before:top-1 before:bottom-4 before:w-px before:bg-gradient-to-b before:from-zoro-500/70 before:via-zinc-700/60 before:to-transparent">
          <ul className="space-y-12">
            {bio.milestones.map((m, idx) => (
              <li key={m.year} className="relative group pl-2">
                <span className="absolute left-0 top-1.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-zinc-900 border border-zoro-400/70 shadow-[0_0_0_4px_rgba(5,8,7,0.95)] group-hover:scale-110 group-hover:border-zoro-300 transition-transform" />
                <div className="pb-1 pl-2">
                  <h3 className="font-display text-[13px] tracking-wide uppercase text-zoro-300 flex items-center gap-4">
                    <span className="text-[11px] font-mono text-zinc-500 bg-zinc-900/60 px-1.5 py-0.5 rounded border border-zinc-700/60">{String(idx+1).padStart(2,'0')}</span>
                    <span className="text-zinc-300/90">{m.year}</span>
                  </h3>
                </div>
                <p className="mt-1 pl-2 text-zinc-400/90 text-sm leading-relaxed max-w-prose">{m.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>
      {/* Técnicas */}
      <Section id="techniques" title="Técnicas" subtitle="Santoryu, Ittoryu, Ashura e além.">
        <div className="grid md:grid-cols-3 gap-8">
          {techniqueCategories.map(cat => (
            <div key={cat.name} className="relative group rounded-xl border border-zinc-700/50 bg-zinc-900/40 backdrop-blur-sm p-5 flex flex-col overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_20%,rgba(39,208,125,0.22),transparent_70%)]" aria-hidden />
              <h3 className="font-display text-lg text-zoro-300 mb-2 relative z-10 tracking-wide">{cat.name}</h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-4 relative z-10 flex-1">{cat.description}</p>
              <div className="flex flex-wrap gap-2 relative z-10">
                {cat.styles.map(s => (
                  <span key={s.name} className="text-[11px] px-2.5 py-1 rounded-full bg-zinc-800/60 border border-zinc-700/50 text-zoro-200/90 hover:border-zoro-400/50 hover:text-zoro-100 transition-colors">
                    {s.name}{s.note && <em className="text-zinc-500 not-italic ml-1">• {s.note}</em>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
      {/* Momentos Icônicos */}
      <Section id="moments" title="Momentos Icônicos" subtitle="Definições de honra, dor e lealdade.">
        <div className="grid md:grid-cols-2 gap-8">
          {iconicMoments.map(m => (
            <div
              key={m.id}
              className="group relative rounded-xl border border-zinc-700/50 bg-zinc-900/40 backdrop-blur-sm p-6 overflow-hidden transition-all duration-500 hover:border-zoro-400/50 hover:shadow-[0_0_0_1px_rgba(39,208,125,0.25),0_0_22px_-4px_rgba(39,208,125,0.4)]"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_75%_20%,rgba(39,208,125,0.18),transparent_70%)]" />
              <div className="absolute -inset-px pointer-events-none rounded-xl bg-[linear-gradient(130deg,rgba(39,208,125,0.25),transparent_35%,transparent_65%,rgba(39,208,125,0.2))] opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity" />
              <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_60%_35%,black,transparent_68%)] opacity-0 group-hover:opacity-60 transition-opacity bg-[conic-gradient(from_180deg_at_50%_50%,rgba(39,208,125,0.25),transparent_55%)]" />
              <h3 className="relative z-10 font-display text-lg text-zoro-300 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zoro-400/80 shadow-[0_0_0_3px_rgba(5,8,7,0.9),0_0_8px_2px_rgba(39,208,125,0.5)]" />
                {m.title}
              </h3>
              {m.quote && (
                <p className="relative z-10 text-zoro-200/90 text-xs italic mb-3 tracking-wide before:content-['“'] before:mr-0.5 after:content-['”']">
                  {m.quote}
                </p>
              )}
              <p className="relative z-10 text-[13px] leading-relaxed text-zinc-400/90">
                {m.description}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none bg-gradient-to-t from-zinc-900/70 to-transparent" />
            </div>
          ))}
        </div>
      </Section>
      <Gallery />
    </Layout>
  );
}

export default App;
