import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import { resolve } from 'path';

export default defineConfig({
  plugins: [eslintPlugin()],
  root: './src',
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        index: '/index.html'
      }
    }
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
