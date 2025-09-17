import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import unfonts from 'unplugin-fonts/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    unfonts({
      google: {
        families: [
          'Nunito Sans',
          'Nunito',
          'Roboto'
        ],
      },
    }),
    
    vue(), tailwindcss()
  ],
})
