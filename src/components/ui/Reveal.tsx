import { ReactNode, useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../lib/accessibility';

type TagName = 'div' | 'section' | 'article' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'span';
interface RevealProps {
  children: ReactNode;
  as?: TagName;
  className?: string;
  delay?: number;
  distance?: number;
  once?: boolean;
  id?: string;
  role?: string;
  tabIndex?: number;
  title?: string;
}

// Lightweight intersection-based reveal (fade + translate)
export function Reveal({ children, as='div', className='', delay=0, distance=24, once=true, id, role, tabIndex, title }: RevealProps){
  const reduce = prefersReducedMotion();
  const ref = useRef<HTMLElement | null>(null as any);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduce) { setShown(true); return; }
    const node = ref.current;
    if(!node) return;
    let active = true;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(!active) return;
        if(e.isIntersecting){
          setTimeout(() => { if(active) setShown(true); }, delay);
          if(once){ observer.disconnect(); }
        } else if(!once) {
          setShown(false);
        }
      });
    }, { threshold: 0.15 });
    observer.observe(node);
    return () => { active = false; observer.disconnect(); };
  }, [reduce, delay, once]);

  const style: React.CSSProperties = reduce ? {} : {
    '--reveal-distance': `${distance}px`
  } as any;

  const builtClass = (
    (className ? className + ' ' : '') +
    'transition-[opacity,transform] duration-700 ease-out will-change-transform ' +
    (shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[var(--reveal-distance)]')
  );

  const TagComp: any = as;
  return <TagComp ref={ref as any} id={id} role={role} tabIndex={tabIndex} title={title} className={builtClass} style={style}>{children}</TagComp>;
}
