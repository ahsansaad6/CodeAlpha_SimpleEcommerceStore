// frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000', // Explicitly use 127.0.0.1
        changeOrigin: true,
        secure: false, // Useful for local dev, prevents SSL certificate issues
        // No rewrite is needed because your backend's actual routes start with /api
        // The request /api/products will be sent to http://127.0.0.1:5000/api/products
      },
    },
  },
});