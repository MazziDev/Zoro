import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages project repo: https://mazzidev.github.io/Zoro/
  base: '/Zoro/',
});
