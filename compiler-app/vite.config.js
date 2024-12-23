import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@kongu/compiler-app': '/path/to/your/compiler-app/dist/index.esm.js'
    },
  },
})
