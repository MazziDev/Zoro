export interface IconicMoment {
  id: string;
  title: string;
  quote?: string;
  description: string;
}

export const iconicMoments: Readonly<IconicMoment[]> = Object.freeze([
  {
    id: 'mihawk-duel',
    title: 'Primeiro duelo com Mihawk',
    quote: 'Feridas nas costas são vergonha para um espadachim.',
    description: 'Humilhado mas determinado. Nasce a promessa renovada de superação.'
  },
  {
    id: 'nothing-happened',
    title: 'Nada aconteceu',
    quote: '...',
    description: 'Zoro absorve a dor e fadiga de Luffy diante de Kuma. Lealdade absoluta.'
  },
  {
    id: 'mr1',
    title: 'Derrota de Mr.1',
    quote: 'Eu consigo cortar aço.',
    description: 'Desperta nova sensibilidade no corte — domínio refinado.'
  },
  {
    id: 'king-fight',
    title: 'Batalha contra King',
    description: 'Combina novas técnicas e Haki avançado contra o braço direito de Kaido.'
  }
]);
