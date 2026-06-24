import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'app'),
      '@pages': path.resolve(__dirname, 'pages'),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        // Vite 8 / rolldown requires a function for manualChunks.
        // Split heavy vendor libs into their own cacheable chunks so the
        // initial route stays small for low-bandwidth users.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('lucide-react')) return 'icons'
          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('react-router')
          ) return 'react-vendor'
          return undefined
        },
      },
    },
  },
  server: {
    proxy: {
      // KwesBot → Express proxy → Gemini
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
