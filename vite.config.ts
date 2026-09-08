import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/android/**', '**/backend/**'],
    },
    proxy: {
      '/api': 'https://angie-t42s.onrender.com',
    },
  },
});
