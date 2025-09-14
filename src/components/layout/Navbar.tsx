import { useState } from 'react';

const links = [
  { href: '#hero', label: 'Início' },
  { href: '#bio', label: 'Biografia' },
  { href: '#techniques', label: 'Técnicas' },
  { href: '#moments', label: 'Momentos' },
  { href: '#gallery', label: 'Galeria' }
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
  <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md/60 bg-gradient-to-b from-black/70 via-black/50 to-black/20 supports-[backdrop-filter]:bg-black/40 border-b border-transparent after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),transparent)]" aria-label="Navegação principal" role="navigation">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <a href="#hero" className="font-display text-xl text-zoro-300 hover:text-zoro-100 transition-colors">Zoro<span className="text-zoro-500">.</span></a>
        <button className="md:hidden text-zoro-200" onClick={() => setOpen(o => !o)} aria-label="Abrir Menu">≡</button>
        <ul className="hidden md:flex gap-8 text-sm">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="text-zinc-300 hover:text-zoro-300 transition-colors focus-ring rounded-sm px-1 py-0.5">{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="hidden md:block" />
      </div>
      {open && (
        <div className="md:hidden px-6 pb-4">
          <ul className="flex flex-col gap-4">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block py-1 text-zinc-300 hover:text-zoro-300 transition-colors focus-ring rounded px-2">{l.label}</a>
              </li>
            ))}
            <li className="h-0" />
          </ul>
        </div>
      )}
    </nav>
  );
}
