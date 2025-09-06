import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'three-stdlib',
      'lil-gui'
    ]
  },
  server: {
    port: 5173,
    open: true,
    strictPort: true
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
})
