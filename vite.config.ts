
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Esto hace que las rutas de los archivos en el build sean ./assets en lugar de /assets
  base: './',
  define: {
    'process.env': process.env
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
});
