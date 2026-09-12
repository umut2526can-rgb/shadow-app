import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { CATEGORIES as FALLBACK_CATEGORIES, VIDEOS as FALLBACK_VIDEOS } from '../data/videos.js';

/**
 * Kategorileri ve videoları Supabase'den çeker.
 *
 * Neden hâlâ statik veriye (data/videos.js) referans veriyoruz?
 * - `.env` henüz doldurulmadıysa (ilk kurulum anı) uygulama boş ekranla
 *   kalmasın diye.
 * - Supabase'e ağ isteği başarısız olursa (offline PWA senaryosu) kullanıcı
 *   yine de bilinen bir veri setiyle uygulamayı kullanabilsin.
 * Bu "sessiz fallback", kalıcı çözüm değil — Adım 6'da gerçek bir
 * service-worker cache stratejisiyle değiştirilecek.
 */
export function useVideos() {
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [videos, setVideos] = useState(FALLBACK_VIDEOS);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [{ data: catData, error: catError }, { data: vidData, error: vidError }] = await Promise.all([
          supabase.from('categories').select('id, slug, name, subtitle, icon, color_hex, sort_order').order('sort_order'),
          supabase
            .from('videos')
            .select('id, category_id, en_text, tr_text, context_text, video_url, sort_order')
            .eq('is_published', true)
            .order('sort_order'),
        ]);

        if (catError || vidError) throw catError || vidError;
        if (cancelled) return;

        // Supabase şemasındaki alan adlarını (slug, en_text...) component'lerin
        // beklediği şekle (id, en, tr...) çeviriyoruz — böylece component'ler
        // verinin nereden geldiğinden habersiz kalmaya devam ediyor.
        const mappedCategories = catData.map((c) => ({
          id: c.slug,
          name: c.name,
          subtitle: c.subtitle,
          color: c.color_hex,
          icon: c.icon,
        }));

        const categoryIdBySlug = new Map(catData.map((c) => [c.id, c.slug]));
        const mappedVideos = vidData.map((v) => ({
          id: v.id,
          cat: categoryIdBySlug.get(v.category_id),
          en: v.en_text,
          tr: v.tr_text,
          context: v.context_text,
          src: v.video_url,
        }));

        if (mappedCategories.length > 0) {
          setCategories(mappedCategories);
          setVideos(mappedVideos);
          setUsingFallback(false);
        }
      } catch (err) {
        console.warn('[useVideos] Supabase\'den veri çekilemedi, statik veri kullanılıyor:', err?.message);
        setUsingFallback(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const getVideosByCategory = (catId) => videos.filter((v) => v.cat === catId);

  return { categories, videos, getVideosByCategory, loading, usingFallback };
}
