import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(rawUrl && rawKey);

if (!isSupabaseConfigured) {
  // Geliştirme sırasında .env dosyası unutulursa sessizce hata almak yerine
  // net bir uyarı basıyoruz — aksi halde hata mesajı çok belirsiz olur.
  // createClient'a undefined geçmek senkron olarak fırlar (bkz. validateSupabaseUrl),
  // bu yüzden geçerli görünen bir placeholder veriyoruz: ağ istekleri sonradan
  // başarısız olur ve çağıranlardaki try/catch'ler zaten statik veriye düşer.
  console.warn(
    '[supabaseClient] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY tanımlı değil. ' +
      '.env.example dosyasını .env olarak kopyalayıp kendi Supabase bilgilerinle doldur.'
  );
}

const supabaseUrl = rawUrl || 'https://placeholder.supabase.co';
const supabaseAnonKey = rawKey || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
