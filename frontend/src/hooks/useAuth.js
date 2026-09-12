import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';

/**
 * ADIM 4 — KİMLİK DOĞRULAMA (basitleştirilmiş)
 * ---------------------------------------------------------------
 * Şimdilik bir giriş ekranı (email/şifre) YOK. Bunun yerine Supabase'in
 * "anonymous sign-in" özelliğini kullanıyoruz: kullanıcı uygulamayı ilk
 * açtığında arka planda kimliksiz bir hesap oluşuyor ve tarayıcıda
 * saklanıyor. Bu sayede:
 *   - localStorage'a göre çok daha güvenilir bir "kaldığı yeri hatırlama"
 *     elde ediyoruz (Supabase session'ı kendi kendine yeniliyor),
 *   - ama hâlâ gerçek bir hesap/şifre YOK — kullanıcı tarayıcı verisini
 *     silerse ilerleme kaybolur.
 * İleride gerçek email/şifre veya sosyal girişe geçilirse, Supabase
 * `linkIdentity` ile anonim hesabı kalıcı bir hesaba yükseltmeyi
 * destekliyor — o zaman ilerleme kaybolmaz. Bu, bilinçli olarak MVP
 * kapsamı dışında bırakıldı.
 * ---------------------------------------------------------------
 */
export function useAuth() {
  const [userId, setUserId] = useState(null);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function ensureSession() {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        if (!cancelled) setUserId(session.user.id);
        return;
      }

      const { data, error } = await supabase.auth.signInAnonymously();
      if (error) {
        console.warn('[useAuth] Anonim oturum açılamadı:', error.message);
        if (!cancelled) setAuthError(error.message);
        return;
      }
      if (!cancelled) setUserId(data.user?.id ?? null);
    }

    ensureSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
    });

    return () => {
      cancelled = true;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  return { userId, authError };
}
