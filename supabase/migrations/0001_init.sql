-- =====================================================================
-- SHADOW — İlk Şema Migrasyonu
-- Kapsam: kategoriler, video/cümle kartları, kullanıcı ilerlemesi
-- Not: Supabase Auth zaten "auth.users" tablosunu otomatik sağlar,
-- biz sadece ona referans veriyoruz.
-- =====================================================================

-- Gerekli uzantı: gen_random_uuid() için
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- 1) CATEGORIES — Uygulamadaki 5 sabit kategori (Sokak, İş, Turizm, Mutfak, Film)
-- ---------------------------------------------------------------------
create table if not exists categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,        -- 'sokak', 'is', 'turizm', 'mutfak', 'film'
  name        text not null,               -- "Günlük Sokak İngilizcesi"
  subtitle    text,                        -- "Idioms & Slang"
  icon        text,                        -- emoji, örn '💬'
  color_hex   text,                        -- UI vurgu rengi, örn '#FF6B4A'
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

comment on table categories is 'Uygulamadaki sabit öğrenme kategorileri.';

-- ---------------------------------------------------------------------
-- 2) VIDEOS — Her biri bir video + çift dilli cümle + bağlam açıklaması
-- ---------------------------------------------------------------------
create table if not exists videos (
  id              uuid primary key default gen_random_uuid(),
  category_id     uuid not null references categories(id) on delete cascade,
  en_text         text not null,
  tr_text         text not null,
  context_text    text,
  video_url       text not null,
  thumbnail_url   text,
  sort_order      int not null default 0,
  is_published    boolean not null default true,   -- admin panelinden taslak/yayın kontrolü için
  created_at      timestamptz not null default now()
);

comment on table videos is 'Her kart: arka plan videosu + İngilizce/Türkçe cümle + bağlam metni.';

create index if not exists idx_videos_category on videos(category_id);
create index if not exists idx_videos_published on videos(is_published) where is_published = true;

-- ---------------------------------------------------------------------
-- 3) USER_PROGRESS — Hangi kullanıcı hangi cümleyi "pratik etti" (shadowing yaptı)
-- ---------------------------------------------------------------------
create table if not exists user_progress (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  video_id        uuid not null references videos(id) on delete cascade,
  practiced_at    timestamptz not null default now(),
  unique (user_id, video_id)
);

comment on table user_progress is 'Bir kullanıcının pratik ettiği (mikrofon/tekrar) cümlelerin kaydı — "kaldığı yeri hatırlama" burada tutulur.';

create index if not exists idx_progress_user on user_progress(user_id);

-- =====================================================================
-- ROW LEVEL SECURITY (RLS) — Baştan güvenlik
-- =====================================================================

-- categories & videos: herkes (anon dahil) okuyabilir, sadece backend/admin yazabilir
alter table categories enable row level security;
alter table videos enable row level security;

create policy "categories_public_read"
  on categories for select
  using (true);

create policy "videos_public_read"
  on videos for select
  using (is_published = true);

-- user_progress: kullanıcı SADECE kendi verisini okuyabilir/yazabilir
alter table user_progress enable row level security;

create policy "progress_select_own"
  on user_progress for select
  using (auth.uid() = user_id);

create policy "progress_insert_own"
  on user_progress for insert
  with check (auth.uid() = user_id);

create policy "progress_delete_own"
  on user_progress for delete
  using (auth.uid() = user_id);

-- Not: categories/videos tablolarına INSERT/UPDATE/DELETE için henüz politika
-- eklenmedi — bu bilinçli bir tercih. İçerik yönetimi şimdilik sadece
-- Supabase Dashboard'dan (service_role yetkisiyle) yapılacak. İleride bir
-- admin paneli eklendiğinde, o paneli kullanacak rol için ayrı bir politika
-- tanımlanacak (örn. sadece 'admin' claim'ine sahip kullanıcılar yazabilsin).
