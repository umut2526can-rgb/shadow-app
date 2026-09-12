import { useCallback } from 'react';

/**
 * Video sesi 'muted' olduğu için (arka plan görseli, gerçek anadili
 * konuşması içermiyor), "orijinal telaffuz" butonu tarayıcının yerleşik
 * seslendirme motorunu (Web Speech API) kullanıyor. Hız ayarı burada da
 * geçerli oluyor ki shadowing pratiği tutarlı kalsın.
 */
export function useSpeech() {
  const speak = useCallback((text, { rate = 1 } = {}) => {
    if (!('speechSynthesis' in window)) {
      alert('Bu tarayıcı sesli okumayı desteklemiyor.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate === 0.75 ? 0.72 : 1;
    window.speechSynthesis.speak(utterance);
  }, []);

  return { speak };
}
