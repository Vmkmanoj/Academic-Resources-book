import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@kongu/quizz-app': '/path/to/your/quizz-app/dist/index.esm.js'
    },
  },
});
