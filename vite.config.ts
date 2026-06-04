import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist"
  }
  ,
  server: {
    proxy: {
      '/api': {
        target: 'https://transguideapi.runasp.net',
        changeOrigin: true,
        secure: false,
      },
      '/signHub': {
        target: 'https://transguideapi.runasp.net',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
})

