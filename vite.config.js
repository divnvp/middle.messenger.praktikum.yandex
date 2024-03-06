import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [eslintPlugin()],

  server: {
    open: './index.html'
  },
  css: {
    devSourcemap: true
  },
  build: {
    outDir: 'dist'
  }
});
