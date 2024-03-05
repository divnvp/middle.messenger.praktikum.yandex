import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  base: '/',
  plugins: [handlebars(), eslintPlugin()],
  build: {
    rollupOptions: {
      input: {
        app: './src/index.html'
      }
    }
  },
  server: {
    open: './src/index.html'
  }
});
