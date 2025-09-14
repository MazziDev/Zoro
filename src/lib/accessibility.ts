// Helpers de acessibilidade e preferências
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function safeMotion<T>(value: T, fallback: T): T {
  return prefersReducedMotion() ? fallback : value;
}
