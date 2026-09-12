import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// ADIM 5 — PWA yapılandırması.
// vite-plugin-pwa hem manifest.webmanifest'i hem de service worker'ı
// build sırasında otomatik üretir; elle bir manifest dosyası yazmamıza
// gerek kalmaz.
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Shadow — İngilizce Gölgeleme',
        short_name: 'Shadow',
        description: 'Video ile İngilizce shadowing (gölgeleme) öğrenme uygulaması.',
        theme_color: '#05070A',
        background_color: '#05070A',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          // NOT: Bunlar SVG yer tutucu. Gerçek yayın öncesi bunları
          // 192x192 ve 512x512 boyutunda PNG ile değiştir — bazı
          // Android/iOS "ana ekrana ekle" akışları SVG ikonu doğru
          // göstermeyebilir.
          { src: '/icon.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: '/icon.svg', sizes: '512x512', type: 'image/svg+xml' },
          { src: '/icon.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Sadece uygulama kabuğunu (JS/CSS/HTML) önbelleğe alıyoruz.
        // Videolar kasıtlı olarak önbelleklenmiyor — hem çok yer kaplar
        // hem de Mixkit CDN'i cross-origin olduğu için ayrı bir
        // stratejiyi hak ediyor (ileride runtimeCaching ile eklenebilir).
        globPatterns: ['**/*.{js,css,html,svg}'],
      },
    }),
  ],
  server: {
    host: true, // yerel ağdan telefonla test edebilmek için
  },
});
