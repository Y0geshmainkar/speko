import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'Speako',
        short_name: 'Speako',
        description: 'Speak your thoughts. We\'ll turn them into notes.',
        theme_color: '#6c63ff',
        background_color: '#0f0f13',
        display: 'standalone',
        start_url: '/speko/',
        scope: '/speko/',
        icons: [
          {
            src: '/speko/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/speko/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
    }),
  ],
  base: '/speko/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
