import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
    headers: {
      'X-Frame-Options': 'DENY',
      'Content-Security-Policy': "frame-ancestors 'none'",
    },
    cors: {
      origin: 'http://localhost:5173', // Only allow requests from frontend
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
    strictPort: true,
    fs: {
      strict: true,
    },
    build: {
      minify: 'esbuild', // Ensure production-like minification
    },
    define: {
      'process.env': {}, // Prevents leaking env variables
    },
    hmr: {
      overlay: false, // Disable error overlay to prevent IP exposure
    },
  },
});
