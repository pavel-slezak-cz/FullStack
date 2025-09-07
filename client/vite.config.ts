import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  appType: 'spa',
  server: {
    host: '127.0.0.1',
    port: 5173,
    proxy: {
      // /api/* → http://localhost:4000/api/*
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
})
