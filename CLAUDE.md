# Shadow — Proje Bağlamı

Bu dosyayı Claude Code, klasörü açtığın anda otomatik okur ve tüm ajanlara
(ana ajan + alt-ajanlar) bağlam olarak verir.

## Proje nedir?
TikTok tarzı dikey kaydırmalı, video + çift dilli altyazı ile İngilizce
öğreten bir PWA. Kullanıcı videoyu izler, mikrofonla kendi telaffuzunu
kaydedip orijinaliyle kıyaslar ("shadowing" tekniği).

## Yığın (Stack)
- Frontend: React 18 + Vite + Tailwind CSS (`frontend/`)
- Backend/DB: Supabase (Postgres + Auth + Storage) (`supabase/`)
- PWA: vite-plugin-pwa

## Klasör yapısı
```
frontend/src/
  data/videos.js        # ARTIK KULLANILMIYOR — sadece referans/fallback
  lib/supabaseClient.js # Supabase bağlantısı
  hooks/useVideos.js    # kategorileri/videoları Supabase'den çeker
  hooks/useAuth.js      # anonim oturum
  hooks/useProgress.js  # kullanıcı ilerlemesi (Supabase user_progress)
  hooks/useMicRecorder.js / useSpeech.js
  components/VideoCard.jsx, ShadowingControls.jsx, ContextSheet.jsx
  screens/CategoryScreen.jsx, FeedScreen.jsx
supabase/migrations/0001_init.sql   # şema + RLS politikaları
supabase/seed.sql                    # örnek veri
```

## Alt-ajanlar (`.claude/agents/`)
Projeye özel 5 ajana ek olarak, [wshobson/agents](https://github.com/wshobson/agents)
marketplace'inden bu projeye uygun 5 uzman ajan daha eklendi:

- **performance-engineer** — Core Web Vitals, yükleme performansı, önbellekleme
- **security-auditor** — RLS/auth güvenlik denetimi, OWASP kontrolü
- **ui-visual-validator** — ekran görüntüsü/görsel regresyon, erişilebilirlik doğrulama
- **database-optimizer** — Postgres/Supabase sorgu ve indeks optimizasyonu
- **test-automator** — otomatik test stratejisi ve CI entegrasyonu

Ayrıca `.claude/skills/` altına `tailwind-design-system`, `react-state-management`
ve `postgresql-table-design` skill'leri eklendi — ilgili ajanlar bunlardan
otomatik faydalanır.

## Kurallar (tüm ajanlar için geçerli)
- Türkçe yorum satırları kullan, kod (değişken/fonksiyon adları) İngilizce kalsın.
- Yeni bir tablo/kolon eklerken mutlaka RLS politikası da ekle — hiçbir tablo
  politikasız bırakılmaz.
- Video kaynağı olarak gerçek film/dizi sahnesi veya izinsiz üçüncü taraf
  içerik ASLA eklenmez — sadece telifsiz/lisanslı stok video.
- Mevcut component arayüzlerini (prop isimleri) bozmadan önce neden
  değiştiğini kısaca açıkla.
