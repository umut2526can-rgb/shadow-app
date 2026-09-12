import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Geliştirme sırasında .env dosyası unutulursa sessizce hata almak yerine
  // net bir uyarı basıyoruz — aksi halde hata mesajı çok belirsiz olur.
  console.warn(
    '[supabaseClient] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY tanımlı değil. ' +
      '.env.example dosyasını .env olarak kopyalayıp kendi Supabase bilgilerinle doldur.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
