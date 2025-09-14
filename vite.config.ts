import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Ajuste dinâmico: em desenvolvimento (npm run dev) use '/' para não quebrar assets.
// Em produção (build para GitHub Pages) use o nome do repositório.
// Se o repositório se chama "images", troque repoName para 'images'.
// Caso mude o nome depois, basta alterar aqui ou usar variável de ambiente.
const repoName = 'Zoro'; // <-- altere para 'images' se esse for o nome real do repositório no GitHub

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? `/${repoName}/` : '/',
}));
