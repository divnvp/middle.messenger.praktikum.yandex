import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [eslintPlugin()],
  build: {
    rollupOptions: {
      input: {
        app: './static/index.html'
      }
    }
  },
  server: {
    open: './static/index.html'
  },
  css: {
    devSourcemap: true
  }
});
