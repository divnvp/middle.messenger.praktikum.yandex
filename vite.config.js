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
        index: '/index.html',
        registration: '/pages/registration/registration.html',
        chats: '/pages/chats/chat.html',
        'error-4xx': '/pages/error-4xx/error-4xx.html',
        'error-500': '/pages/error-500/error-500.html',
        profile: '/pages/profile/profile.html',
        'profile-data': '/pages/profile-data/profile-data.html',
        'change-password': '/pages/change-password/change-password.html'
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
