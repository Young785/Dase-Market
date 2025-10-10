import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      'lottie-web': 'lottie-web/build/player/lottie.min.js',
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'public/assets')
    }
  },
  build: {
    rollupOptions: {
      external: [
        'bootstrap',
        'simplebar',
        'node-waves',
        'jsvectormap',
        'aos',
        'dragula',
        'dropzone',
        'filepond',
        'glightbox',
        'gridjs',
        'leaflet',
        'nouislider',
        'quill',
        '@simonwep/pickr'
      ],
      output: {
        manualChunks: {
          vendor: [
            'react',
            'react-dom',
            'react-router-dom'
          ],
          icons: [
            '@fortawesome/react-fontawesome'
          ],
          utils: [
            'sweetalert2',
            'lottie-web'
          ]
        },
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            extType = 'fonts';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    chunkSizeWarningLimit: 2000,
    assetsDir: 'assets',
    emptyOutDir: true,
    assetsInlineLimit: 4096
  },
  publicDir: 'public',
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import "@/assets/css/variables.css";`
      }
    },
    devSourcemap: false
  },
  optimizeDeps: {
    include: ['sweetalert2']
  },
  server: {
    https: false,
    host: 'localhost',
    port: 3000,
    strictPort: true,
    open: true,
    proxy: {
      '/api/v1/dase': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      }
    }
  }
})
