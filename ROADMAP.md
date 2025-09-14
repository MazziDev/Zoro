## Roadmap Avançado (Zoro Epic Site)

### 1. Visual 3D / Espadas
- Integrar Three.js com cena leve: três modelos simples (fallback: extruded SVG) das katanas.
- Idle animation: leves oscilações independentes (seno) + brilho percorrendo o fio.
- Evento hover/click: pequeno slash particle usando instancing.

### 2. Animações Cinemáticas (GSAP / Framer Combo)
- Entrada sequencial de camadas no Hero com timeline GSAP (após first interaction para não bloquear LCP).
- Scroll-trigger em técnicas: cada bloco se revela com stroke-dasharray (SVG outlines das katanas).

### 3. Modo “Duel” Interativo
- Botão que alterna layout: fundo fica mais dramático, ativa loop de música alternativo.
- Contador de “cortes” ao clicar e desenhar linha rápida (pointer events) — gera slash overlay.

### 4. Otimização e Performance
- Substituir partículas DOM por canvas ou regl instancing.
- Pré-carregamento condicional do áudio (usar IntersectionObserver no Hero + user intent clique).
- Code-splitting das seções mais pesadas (gallery futura com lazy loading).

### 5. Acessibilidade Avançada
- Focus trap aprimorado no modal (já parcialmente pronto) com restore de foco.
- Preferências persistentes: reduced-motion, high-contrast toggle, áudio.

### 6. Conteúdo Dinâmico
- Sistema de internacionalização (pt-BR/en-US) com fallback.
- Carregamento de citações randômicas extras em tooltip ao passar sobre momentos.

### 7. Galeria Evoluída
- Grid masonry responsivo com animação de filtro (técnicas / momentos / fanart).
- Lightbox custom com atalho de teclado (← → Esc) e exibição de créditos/autor.

### 8. SEO / Metadados
- Open Graph images geradas dinamicamente (ex: título + textura katana).
- Manifest + PWA (offline hero + quotes básicas).

### 9. Microinterações
- Brilho sutil ao focar navegação via teclado (já tem, mas adicionar micro scale).
- Cursor custom (espada minimal) usando CSS var + fallback system pointer.

### 10. Testes e Qualidade
- Testes de snapshot de animações desabilitando motion.
- Lighthouse automation script.

---
Prioridade sugerida inicial: (1) Three.js minimal → (4) performance → (7) Galeria real.

Siga iterando de forma incremental para manter fluidez e evitar regressões.