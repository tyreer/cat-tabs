import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Tabs/', // GitHub Pages base path - replace 'Tabs' with your repository name
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
