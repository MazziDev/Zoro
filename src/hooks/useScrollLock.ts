import { useLayoutEffect, useRef } from 'react';

/**
 * useScrollLock
 * Bloqueia rolagem do body enquanto "active" for true.
 * Restaura overflow anterior ao desmontar ou desativar.
 */
/**
 * Melhorado: trava html e body simultaneamente via classe.
 * Evita condição onde apenas body é bloqueado e html continua criando overflow.
 */
export function useScrollLock(active: boolean) {
  const prevBodyOverflow = useRef<string>('');
  const prevHtmlOverflow = useRef<string>('');

  useLayoutEffect(() => {
    if (active) {
      prevBodyOverflow.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = prevBodyOverflow.current;
    }
    return () => {
      document.body.style.overflow = prevBodyOverflow.current;
    };
  }, [active]);
}
