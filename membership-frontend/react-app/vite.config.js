// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
//import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss('./tailwind.config.js'),
        autoprefixer,
      ],
    },
  },
});
