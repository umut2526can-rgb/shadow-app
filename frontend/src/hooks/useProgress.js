import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';

const STORAGE_KEY = 'shadow_progress_v1';

function readLocalIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function writeLocalIds(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // localStorage kapalıysa (gizli sekme vb.) sessizce yok say.
  }
}

/**
 * ADIM 4 — Kullanıcı ilerlemesi artık Supabase `user_progress` tablosunda.
 *
 * Strateji: "optimistic local-first". Yani:
 * 1. Açılışta önce localStorage'daki hızlı kopyayı gösteriyoruz (ekran
 *    boş kalmasın diye), sonra Supabase'den gerçek listeyi çekip üzerine
 *    yazıyoruz.
 * 2. Kullanıcı bir cümleyi pratik ettiğinde, önce YEREL state'i anında
 *    güncelliyoruz (arayüz beklemesin), sonra arka planda Supabase'e
 *    yazıyoruz. Supabase yazması başarısız olursa (offline vb.) kullanıcı
 *    arayüzde bunu fark etmez — bir sonraki açılışta senkron tekrar dener.
 *
 * `userId` yoksa (henüz oturum açılmadı / Supabase yapılandırılmadı)
 * hook sessizce sadece-localStorage moduna düşer — uygulama yine çalışır.
 */
export function useProgress(userId) {
  const [practicedIds, setPracticedIds] = useState(readLocalIds);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    async function syncFromRemote() {
      const { data, error } = await supabase
        .from('user_progress')
        .select('video_id')
        .eq('user_id', userId);

      if (error) {
        console.warn('[useProgress] Uzak ilerleme çekilemedi, yerel veriyle devam:', error.message);
        return;
      }
      if (cancelled) return;

      const remoteIds = new Set(data.map((row) => row.video_id));
      // Yerelde olup uzakta olmayanları da koru (offline'ken pratik edilmiş olabilir)
      setPracticedIds((prev) => {
        const merged = new Set([...prev, ...remoteIds]);
        writeLocalIds(merged);
        return merged;
      });
    }

    syncFromRemote();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const markPracticed = useCallback(
    (videoId) => {
      setPracticedIds((prev) => {
        if (prev.has(videoId)) return prev;
        const next = new Set(prev);
        next.add(videoId);
        writeLocalIds(next);
        return next;
      });

      if (userId) {
        supabase
          .from('user_progress')
          .upsert({ user_id: userId, video_id: videoId }, { onConflict: 'user_id,video_id' })
          .then(({ error }) => {
            if (error) console.warn('[useProgress] Supabase\'e yazılamadı:', error.message);
          });
      }
    },
    [userId]
  );

  const isPracticed = useCallback((videoId) => practicedIds.has(videoId), [practicedIds]);

  return { isPracticed, markPracticed, practicedCount: practicedIds.size };
}
