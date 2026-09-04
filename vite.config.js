import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, isPreview }) => {
  const useLiveBase = command === 'build' || isPreview

  return {
    plugins: [react()],
    base: useLiveBase ? '/dev/arwainacademy/' : '/',
    server: {
      host: true,
      port: 5173,
      strictPort: false,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
        },
      },
    },
    preview: {
      host: true,
      port: 4173,
      strictPort: false,
    },
  }
})