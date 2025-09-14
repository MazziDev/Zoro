// Centralização de constantes de tema (z-index, durações, easings)
export const Z = {
  background: 0,
  bgDecor: 5,
  heroBg: 10,
  heroDecor: 12,
  heroFX: 15,
  heroContent: 20,
  overlay: 90,
  modal: 100,
} as const;

export const DUR = {
  glow: 4500,
  quoteRotate: 9000,
  quoteFade: 600,
  hakiFlash: 900,
  swordArc: 1600,
} as const;

export const EASE = {
  standard: 'cubic-bezier(.4,.0,.2,1)',
  out: 'cubic-bezier(.0,.0,.2,1)',
  in: 'cubic-bezier(.4,0,1,1)',
} as const;

export const QUOTES = [
  'Se eu não posso proteger o sonho do meu capitão, então qual seria o sentido de minha ambição?',
  'Nada aconteceu.',
  'Dor? Eu a superarei para chegar ao topo.',
];
