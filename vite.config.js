import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import { resolve } from 'path';

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
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src')
      }
    ]
  }
});
