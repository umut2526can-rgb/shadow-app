/**
 * FALLBACK VERİ KATMANI (artık ana veri kaynağı DEĞİL)
 * ---------------------------------------------------------------
 * Adım 3'ten itibaren asıl veri `useVideos()` hook'u üzerinden
 * Supabase'den geliyor. Bu dosya sadece iki durumda devreye giriyor:
 *   1) `.env` henüz doldurulmadıysa (ilk kurulum),
 *   2) Supabase'e ağ isteği başarısız olursa (offline PWA senaryosu).
 * İçeriği supabase/seed.sql ile birebir aynı tutuluyor ki iki kaynak
 * birbirinden sapmasın.
 * ---------------------------------------------------------------
 */

export const CATEGORIES = [
  { id: 'sokak', name: 'Günlük Sokak İngilizcesi', subtitle: 'Idioms & Slang', color: '#FF6B4A', icon: '💬' },
  { id: 'is', name: 'İş İngilizcesi', subtitle: 'Business English', color: '#4A90E2', icon: '💼' },
  { id: 'turizm', name: 'Turizm İngilizcesi', subtitle: 'Travel English', color: '#2DD4A8', icon: '🧭' },
  { id: 'mutfak', name: 'Mutfak ve A La Carte', subtitle: 'Kitchen & Service', color: '#F5A623', icon: '🍳' },
  { id: 'film', name: 'Film Alıntıları', subtitle: 'Movie Quotes', color: '#B18CFF', icon: '🎬' },
];

export const VIDEOS = [
  // ---------- SOKAK ----------
  { id: 'sokak-1', cat: 'sokak', en: "Break a leg!", tr: "Bol şans!", context: "Tiyatro dünyasından gelir; sahneye çıkmadan önce doğrudan 'good luck' demek uğursuz sayılır.", src: "https://assets.mixkit.co/videos/4231/4231-360.mp4" },
  { id: 'sokak-2', cat: 'sokak', en: "It's raining cats and dogs.", tr: "Bardaktan boşanırcasına yağmur yağıyor.", context: "Çok şiddetli yağmuru anlatan klasik bir argo deyim.", src: "https://assets.mixkit.co/videos/4401/4401-360.mp4" },
  { id: 'sokak-3', cat: 'sokak', en: "That's a piece of cake.", tr: "Bu çok kolay bir iş.", context: "Bir görevin ne kadar kolay olduğunu vurgular.", src: "https://assets.mixkit.co/videos/4348/4348-360.mp4" },
  { id: 'sokak-4', cat: 'sokak', en: "Let's hang out this weekend.", tr: "Bu hafta sonu takılalım.", context: "Arkadaşlar arasında vakit geçirme teklifinde bulunmanın en yaygın yoludur.", src: "https://assets.mixkit.co/videos/4661/4661-360.mp4" },
  { id: 'sokak-5', cat: 'sokak', en: "Long time no see!", tr: "Uzun zamandır görüşmüyoruz!", context: "Uzun süredir görmediğiniz birine rastladığınızda kullanılan samimi bir selamlama.", src: "https://assets.mixkit.co/videos/4000/4000-360.mp4" },
  { id: 'sokak-6', cat: 'sokak', en: "Catch you later!", tr: "Sonra görüşürüz!", context: "'Goodbye' yerine kullanılan gündelik ve rahat bir vedalaşma ifadesidir.", src: "https://assets.mixkit.co/videos/3428/3428-360.mp4" },

  // ---------- İŞ ----------
  { id: 'is-1', cat: 'is', en: "Let's touch base next week.", tr: "Gelecek hafta tekrar görüşüp durumu değerlendirelim.", context: "Ofis dilinde çok sık geçer; kısa bir görüşme yapıp güncel durumu paylaşmak anlamına gelir.", src: "https://assets.mixkit.co/videos/308/308-360.mp4" },
  { id: 'is-2', cat: 'is', en: "Can you send me the deck before the call?", tr: "Görüşmeden önce sunumu gönderebilir misin?", context: "'Deck', iş jargonunda PowerPoint sunumu anlamına gelir.", src: "https://assets.mixkit.co/videos/4809/4809-360.mp4" },
  { id: 'is-3', cat: 'is', en: "We need to touch base with the client.", tr: "Müşteriyle iletişime geçmemiz gerekiyor.", context: "Kısa bir güncelleme yapmak veya durumu teyit etmek için biriyle konuşmak anlamındadır.", src: "https://assets.mixkit.co/videos/914/914-360.mp4" },
  { id: 'is-4', cat: 'is', en: "Let's take this offline.", tr: "Bunu toplantı dışında konuşalım.", context: "Bir konunun herkesin önünde değil, ilgili kişilerle ayrıca görüşülmesi gerektiğini belirtir.", src: "https://assets.mixkit.co/videos/4547/4547-360.mp4" },
  { id: 'is-5', cat: 'is', en: "Great, we have a deal — let's shake on it.", tr: "Harika, anlaştık — el sıkışalım.", context: "Bir anlaşmanın sözlü olarak kabul edildiğini, resmiyet kazandığını belirtmek için kullanılır.", src: "https://assets.mixkit.co/videos/30012/30012-360.mp4" },
  { id: 'is-6', cat: 'is', en: "I'll follow up by email.", tr: "E-posta ile takibini yapacağım.", context: "Toplantı sonrası, konuşulanların yazılı olarak da iletileceğini belirtmek için kullanılır.", src: "https://assets.mixkit.co/videos/221/221-360.mp4" },

  // ---------- TURİZM ----------
  { id: 'turizm-1', cat: 'turizm', en: "Where is the boarding gate for this flight?", tr: "Bu uçuş için biniş kapısı nerede?", context: "Havalimanında sıkça sorulan, yönlendirme isteyen pratik bir sorudur.", src: "https://assets.mixkit.co/videos/4642/4642-360.mp4" },
  { id: 'turizm-2', cat: 'turizm', en: "Could you recommend a good local restaurant?", tr: "İyi bir yerel restoran önerebilir misiniz?", context: "Otel resepsiyonunda veya turist danışma noktasında sıkça sorulan bir cümle.", src: "https://assets.mixkit.co/videos/4646/4646-360.mp4" },
  { id: 'turizm-3', cat: 'turizm', en: "Do you have a room with a sea view?", tr: "Deniz manzaralı bir odanız var mı?", context: "Otel check-in sırasında oda tercihi belirtmek için kullanılır.", src: "https://assets.mixkit.co/videos/5371/5371-360.mp4" },
  { id: 'turizm-4', cat: 'turizm', en: "Is this included in the tour package?", tr: "Bu, tur paketine dahil mi?", context: "Bir aktivitenin ekstra ücretli olup olmadığını öğrenmek için kullanılır.", src: "https://assets.mixkit.co/videos/40102/40102-360.mp4" },
  { id: 'turizm-5', cat: 'turizm', en: "How far is it on foot?", tr: "Yürüyerek ne kadar uzaklıkta?", context: "Bir yere yürüyerek gidilip gidilemeyeceğini anlamak için sorulur.", src: "https://assets.mixkit.co/videos/4692/4692-360.mp4" },
  { id: 'turizm-6', cat: 'turizm', en: "What time does the last bus leave?", tr: "Son otobüs saat kaçta kalkıyor?", context: "Ulaşım planlarken sıkça sorulan pratik bir soru.", src: "https://assets.mixkit.co/videos/43150/43150-360.mp4" },

  // ---------- MUTFAK ----------
  { id: 'mutfak-1', cat: 'mutfak', en: "The dish is served with a side of grilled vegetables.", tr: "Yemek, ızgara sebze garnitürüyle servis edilir.", context: "A la carte menülerde bir tabağın nasıl sunulduğunu açıklarken kullanılır.", src: "https://assets.mixkit.co/videos/15875/15875-360.mp4" },
  { id: 'mutfak-2', cat: 'mutfak', en: "Could you let the chef know about the allergy?", tr: "Şefe alerji durumunu iletebilir misiniz?", context: "Bir müşterinin gıda alerjisini garsona bildirmesi için kullanılan kibar bir cümle.", src: "https://assets.mixkit.co/videos/4678/4678-360.mp4" },
  { id: 'mutfak-3', cat: 'mutfak', en: "We reduce the sauce until it thickens.", tr: "Sosu koyulaşana kadar kısıyoruz.", context: "'Reduce' mutfak terimi olarak bir sıvıyı kaynatarak koyulaştırmak anlamına gelir.", src: "https://assets.mixkit.co/videos/13258/13258-360.mp4" },
  { id: 'mutfak-4', cat: 'mutfak', en: "Table five would like the check, please.", tr: "Beşinci masa hesabı istiyor.", context: "Garsonların mutfağa veya kasaya ilettiği tipik bir servis cümlesi.", src: "https://assets.mixkit.co/videos/4672/4672-360.mp4" },
  { id: 'mutfak-5', cat: 'mutfak', en: "It needs to rest for five minutes before serving.", tr: "Servis etmeden önce beş dakika dinlenmesi gerekiyor.", context: "Pişirme sonrası etin dinlendirilmesi gerektiğini anlatmak için mutfak dilinde kullanılır.", src: "https://assets.mixkit.co/videos/2439/2439-360.mp4" },
  { id: 'mutfak-6', cat: 'mutfak', en: "Double-check the allergy notes on that order.", tr: "O siparişteki alerji notlarını tekrar kontrol edin.", context: "Müşteri güvenliği için mutfakta alerji bilgisinin dikkatle teyit edilmesi gerektiğini vurgular.", src: "https://assets.mixkit.co/videos/4385/4385-360.mp4" },

  // ---------- FİLM ALINTILARI ----------
  { id: 'film-1', cat: 'film', en: "How you doin'?", tr: "Naber?", context: "Friends dizisinden Joey Tribbiani'nin imza replikleri; flörtöz bir selamlama tarzıdır.", src: "https://assets.mixkit.co/videos/4332/4332-360.mp4" },
  { id: 'film-2', cat: 'film', en: "I am the one who knocks.", tr: "Kapıyı çalan benim.", context: "Breaking Bad'de Walter White'ın artık zayıf biri olmadığını vurguladığı unutulmaz replik.", src: "https://assets.mixkit.co/videos/49878/49878-360.mp4" },
  { id: 'film-3', cat: 'film', en: "By order of the Peaky Blinders.", tr: "Peaky Blinders'ın emriyle.", context: "Peaky Blinders dizisinde Tommy Shelby ve çetesinin otoritesini ilan ederken kullandığı replik.", src: "https://assets.mixkit.co/videos/3429/3429-360.mp4" },
  { id: 'film-4', cat: 'film', en: "I'll be back.", tr: "Geri döneceğim.", context: "Arnold Schwarzenegger'in Terminator'da sert ve kısa vurgusuyla söylediği ikonik replik.", src: "https://assets.mixkit.co/videos/49845/49845-360.mp4" },
  { id: 'film-5', cat: 'film', en: "Why so serious?", tr: "Neden bu kadar ciddisin?", context: "The Dark Knight'ta Joker karakterinin tehditkar ama oyunbaz tavrını yansıtan replik.", src: "https://assets.mixkit.co/videos/4451/4451-360.mp4" },
  { id: 'film-6', cat: 'film', en: "Here's looking at you, kid.", tr: "Sana bakıyorum, evlat.", context: "Casablanca filminden gelen, sinema tarihinin en romantik vedalaşma cümlelerinden biridir.", src: "https://assets.mixkit.co/videos/4600/4600-360.mp4" },
];

export function getVideosByCategory(catId) {
  return VIDEOS.filter((v) => v.cat === catId);
}
