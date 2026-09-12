# Shadow — İngilizce Shadowing Uygulaması

TikTok tarzı dikey kaydırmalı, video + çift dilli altyazı ile İngilizce
öğreten, mikrofonla telaffuz kıyaslaması yapabilen bir PWA.

---

## ⚡ Hızlı Başlangıç — SENİN YAPMAN GEREKENLER

Kod tarafı bitti. Geriye, benim yerine geçemeyeceğim (hesap/kimlik bilgisi
gerektiren) 4 adım kaldı:

1. **Supabase projesi aç:** [supabase.com](https://supabase.com) → New Project (ücretsiz).
2. **Şemayı kur:** Supabase Dashboard → SQL Editor → sırasıyla
   `supabase/migrations/0001_init.sql` ve `supabase/seed.sql` içeriklerini
   yapıştırıp çalıştır.
3. **Ortam değişkenlerini doldur:** `frontend/.env.example` dosyasını
   `frontend/.env` olarak kopyala, Supabase Dashboard → Project Settings →
   API sayfasındaki `Project URL` ve `anon public key` değerlerini içine
   yapıştır.
4. **Çalıştır:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Anonim kullanıcılar için Supabase Dashboard → Authentication →
   Providers → **Anonymous Sign-Ins**'i açman gerekiyor (varsayılan kapalı
   gelir) — yoksa ilerleme takibi çalışmaz, uygulama yine açılır ama
   ilerleme sadece o oturumda kalır.

Bunların hiçbiri olmasa bile uygulama **çökmez** — `.env` boşsa veya
Supabase'e erişilemiyorsa otomatik olarak örnek statik veriyle açılır ve
üstte turuncu bir uyarı şeridi gösterir (bkz. `useVideos.js`).

---

## Neler tamamlandı?

| Adım | Konu | Durum |
|---|---|---|
| 1 | Supabase şeması + RLS + seed verisi | ✅ |
| 2 | React + Vite + Tailwind frontend iskeleti | ✅ |
| 3 | Supabase bağlantısı (`useVideos`) | ✅ |
| 4 | Anonim oturum + `user_progress` senkronizasyonu | ✅ |
| 5 | PWA (manifest + service worker) | ✅ |
| — | Gerçek marka ikonu (192/512 PNG) | ⏳ senin işin |
| — | `.claude/agents/` alt-ajanları | ✅ (Claude Code'da otomatik yüklenir) |

## Klasör yapısı

```
shadow-app/
├── CLAUDE.md                    # Claude Code'un otomatik okuduğu proje bağlamı
├── .claude/agents/               # Bu projeye özel 5 alt-ajan (frontend, supabase, review, qa, release)
├── supabase/
│   ├── migrations/0001_init.sql  # şema + RLS
│   └── seed.sql                  # 5 kategori × 6 cümle
└── frontend/
    ├── .env.example
    ├── vite.config.js            # PWA yapılandırması burada
    └── src/
        ├── lib/supabaseClient.js
        ├── hooks/
        │   ├── useAuth.js         # anonim Supabase oturumu
        │   ├── useVideos.js       # kategoriler/videolar (Supabase, fallback'li)
        │   ├── useProgress.js     # ilerleme (Supabase + localStorage cache)
        │   ├── useMicRecorder.js
        │   └── useSpeech.js
        ├── components/            # VideoCard, ShadowingControls, ContextSheet
        ├── screens/                # CategoryScreen, FeedScreen
        └── data/videos.js          # SADECE fallback — ana veri kaynağı değil
```

## Claude Code alt-ajanları (`.claude/agents/`)

Bu projeyi Claude Code ile açtığında şu ajanlar otomatik tanınır ve ilgili
görevlerde kendiliğinden devreye girer:

Proje-özel 5 ajan:
- **frontend-reactor** — React/Tailwind component işleri
- **supabase-architect** — şema/RLS/migration işleri
- **code-reviewer** — her özellik bitiminde otomatik denetim
- **qa-tester** — manuel test senaryoları
- **release-manager** — build/PWA/deploy

[wshobson/agents](https://github.com/wshobson/agents) (MIT lisans) marketplace'inden
bu projeye özel seçilmiş 5 uzman ajan daha (+ 3 skill: `tailwind-design-system`,
`react-state-management`, `postgresql-table-design`):
- **performance-engineer** — Core Web Vitals, yükleme performansı
- **security-auditor** — RLS/auth güvenlik denetimi
- **ui-visual-validator** — görsel regresyon, erişilebilirlik doğrulama
- **database-optimizer** — Postgres/Supabase sorgu optimizasyonu
- **test-automator** — otomatik test stratejisi

Marketplace'in tamamını (92 plugin, 202 ajan) kurmak istersen, kendi
bilgisayarında Claude Code açıp şunu çalıştırabilirsin:
```
/plugin marketplace add wshobson/agents
/plugin install <paket-adı>
```
Bu proje-özel 10 ajanla çakışmaz, üzerine eklenir.

## Bilinen sınırlamalar (bilinçli MVP kararları)

- **Kimlik doğrulama:** Gerçek email/şifre girişi yok — Supabase'in
  "anonymous sign-in" özelliğiyle cihaza bağlı bir kimlik oluşturuluyor.
  Kullanıcı tarayıcı verisini silerse ilerleme kaybolur. Gerçek hesap
  sistemi ayrı bir adım olarak eklenebilir.
- **Video önbellekleme:** PWA sadece uygulama kabuğunu (arayüz) offline
  çalıştırır, videoları önbelleğe almaz — video izlemek için internet
  gerekir.
- **PWA ikonu:** Şu an SVG yer tutucu. Yayın öncesi `frontend/public/`
  altına gerçek 192x192 ve 512x512 PNG ikon ekleyip `vite.config.js`daki
  `manifest.icons`'ı güncelle.

## Video lisansı notu

Kullanılan tüm klipler [Mixkit Free License](https://mixkit.co/license/#videoFree)
kapsamında, ticari kullanıma açık ve atıf gerektirmiyor. Film Alıntıları
kategorisindeki videolar **gerçek film sahneleri değildir** (telif nedeniyle
kullanılamaz) — repliğin ruhuna uygun, sinematik/nötr stok klipler seçildi.
Ürünü satışa çıkarmadan önce lisans sayfasını bir kez de sen okumanı
öneririm — bu bir öneri, hukuki tavsiye değildir.

## Test edilemeyen kısım (dürüstlük payı)

Bu kod, Claude'un internet erişimi kapalı bir sandbox'ında elle yazıldı —
yani `npm install` / `npm run dev` / gerçek bir Supabase projesine bağlanma
benim tarafımdan uçtan uca çalıştırılıp doğrulanmadı. Mantığı satır satır
kontrol ettim ama ilk çalıştırmada küçük bir hata çıkarsa (import yolu,
paket sürümü vb.) şaşırma — bana hata mesajını yapıştır, hemen düzeltelim.
