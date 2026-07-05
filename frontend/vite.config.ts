import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'

  return {
    plugins: [react()],
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    
    server: {
      port: 3000,
      strictPort: true,
      host: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          secure: false
        }
      }
    },
    
    build: {
      target: 'es2022',
      sourcemap: !isProduction,
      minify: 'esbuild',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'ui-vendor': ['@crayonai/react-ui', '@thesysai/genui-sdk']
          }
        }
      }
    },
    
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : []
    }
  }
})
