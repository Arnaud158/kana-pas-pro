import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(() => {
  const basePath = process.env.BASE_URL || '/'
  return {
    base: basePath,
    plugins: [
      vue(),
      vueDevTools(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
        manifest: {
          name: 'Kana Pas Pro',
          short_name: 'Kana Pas Pro',
          description: 'Learn hiragana & katakana fast and easy',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
          start_url: basePath,
          icons: [
            {
              src: `${basePath}android-chrome-192x192.png`,
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: `${basePath}android-chrome-512x512.png`,
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
        workbox: {
          cleanupOutdatedCaches: true,
          globPatterns: ['**/*.{js,wasm,css,html,ico,png,svg,woff,woff2,ttf,eot}'],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
