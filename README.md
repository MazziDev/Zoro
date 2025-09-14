# Zoro Epic Site

Site estilizado, premium e atmosférico dedicado a **Roronoa Zoro** (One Piece).

## Stack
- Vite + React + TypeScript
- Tailwind CSS (tema dark + acentos verdes)
- Framer Motion (parallax / motion)

## Visão Atual
Partículas experimentais foram removidas em favor de um sistema estável de camadas CSS ("EpicBackground") focado em consistência visual e performance.

## Sistemas Visuais
### EpicBackground
Multi‑camada puramente CSS (sem canvas em loop):
- Gradiente radial + linear inclinado para profundidade
- Textura de ruído (data URI, zero requisições extras)
- Aura cônica girando lentamente
- Faixa de energia cruzando diagonalmente
- Anéis de Haki pulsantes escalonados
- Máscara inferior para legibilidade de texto

Respeita `prefers-reduced-motion`: desativa camadas animadas mantendo composição estática.

### Hero
- Título com glow pulsante
- Quotes rotativos (array em `theme/theme.ts`)
- Arcos de espada em SVG animados (stroke dash)
- Flash de Haki ao pressionar tecla `H` (efeito opcional, com cooldown)
- Parallax e leve movimento dependente de scroll

### Acessibilidade & Performance
- Preferência de movimento reduzido aplicada a: quotes, sweeps, pulses
- Camadas puramente decorativas marcadas com `aria-hidden`
- Baixo custo: animações CSS + poucas divs (sem loops canvas)

## Estrutura
```
src/
  components/
    layout/Layout.tsx
    sections/Hero.tsx
    visual/EpicBackground.tsx
  theme/theme.ts
  styles/globals.css
```

`theme/theme.ts` centraliza:
- `Z` (tokens de z-index)
- `DUR` (durações)
- `EASE` (easings)
- `QUOTES` (lista de frases)

## Customização Rápida
- Alterar frases: editar `QUOTES`.
- Desativar rotação: deixar apenas 1 item no array.
- Acelerar/desacelerar energia: ajustar classe `.animate-energy-sweep` em `globals.css` (ou `DUR.long`).
- Remover flash Haki: remover listener de tecla em `Hero.tsx`.

## Rodando
Instalar dependências:
```
npm install
```
Ambiente de desenvolvimento:
```
npm run dev
```
Build de produção:
```
npm run build
```
Pré-visualização do build:
```
npm run preview
```

## Roadmap Futuro
1. Seções detalhadas (biografia, técnicas, momentos)
2. Galeria com lazy load
3. Slashes / reveals em scroll
4. Áudio ambiente contextual (com consentimento)
5. Modo alto contraste opcional

## Fontes e Imagens
Substituir placeholders por artes com permissão. Respeitar direitos autorais.

## Aviso
Projeto fanmade sem fins comerciais.
