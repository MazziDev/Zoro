import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../lib/motion';

interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, title, subtitle, children, className = '' }: SectionProps) {
  const headingId = `${id || title.replace(/\s+/g, '-').toLowerCase()}-heading`;
  return (
    <section id={id} role="region" aria-labelledby={headingId} className={`relative py-24 md:py-32 px-6 max-w-7xl mx-auto ${className}`}>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mb-12"
      >
        <h2 id={headingId} className="text-3xl md:text-4xl font-display tracking-wide flex items-center gap-4">
          <span className="inline-block h-px w-10 bg-gradient-to-r from-zoro-500 to-transparent" />
          <span className="text-gradient-zoro drop-shadow">{title}</span>
        </h2>
        {subtitle && <p className="mt-4 text-zinc-400 max-w-2xl text-sm md:text-base leading-relaxed">{subtitle}</p>}
      </motion.div>
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
