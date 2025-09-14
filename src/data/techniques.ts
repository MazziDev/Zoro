export interface TechniqueCategory {
  name: string;
  description: string;
  styles: { name: string; note?: string }[];
}

export const techniqueCategories: Readonly<TechniqueCategory[]> = Object.freeze([
  {
    name: 'Santoryu',
    description: 'Estilo de Três Espadas — assinatura absoluta de Zoro, combina força, precisão e postura.',
    styles: [
      { name: 'Oni Giri' },
      { name: 'Tatsumaki', note: 'Corte giratório em espiral.' },
      { name: 'Tora Gari' },
      { name: 'Sanzen Sekai', note: 'Golpe usado contra Mihawk e Hody.' }
    ]
  },
  {
    name: 'Nitoryu / Ittoryu',
    description: 'Adaptação quando perde ou guarda uma espada; concentração de poder em menos lâminas.',
    styles: [
      { name: 'Shishi Sonson', note: 'Corte preciso e veloz.' },
      { name: 'Iai Rashomon' }
    ]
  },
  {
    name: 'Asura',
    description: 'Manifestação espiritual que cria a ilusão de três cabeças e seis braços — intensifica a presença cortante.',
    styles: [
      { name: 'Asura: Ichibugin' },
      { name: 'Asura: Bakkei' }
    ]
  }
]);
