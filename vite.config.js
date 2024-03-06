import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [eslintPlugin()],
  build: {
    rollupOptions: {
      input: {
        app: './index.html'
      }
    }
  },
  server: {
    open: './index.html'
  },
  css: {
    devSourcemap: true
  }
});
