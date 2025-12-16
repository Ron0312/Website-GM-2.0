import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'logos/*.webp', 'images/*.webp'],
      manifest: {
        name: 'gasmöller',
        short_name: 'gasmöller',
        description: 'Ihr Partner für Flüssiggas im Norden',
        theme_color: '#005b9f',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'logos/Icon-01.webp',
            sizes: '192x192',
            type: 'image/webp'
          },
          {
            src: 'logos/Icon-01.webp',
            sizes: '512x512',
            type: 'image/webp'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],
        // Explicitly exclude sitemap.xml and robots.txt from navigation fallback
        // This ensures the SW does not serve index.html for these static files
        navigateFallbackDenylist: [/^\/sitemap\.xml$/, /^\/robots\.txt$/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.web3forms\.com\/.*/i,
            handler: 'NetworkOnly'
          }
        ]
      }
    })
  ],
})
