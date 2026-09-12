-- =====================================================================
-- SHADOW — Seed Verisi
-- Video kaynağı: Mixkit (ücretsiz, ticari kullanıma açık, atıf gerektirmez —
-- bkz. https://mixkit.co/license/#videoFree). Her klip, ait olduğu
-- kategorinin temasıyla eşleşecek şekilde tek tek seçildi.
--
-- NOT: Bu 30 cümle bir başlangıç seti içindir (kategori başına 6). Mevcut
-- prototipteki tüm 100 cümle, Adım 2/3'te admin paneli veya toplu bir
-- import script'iyle buraya taşınabilir — şema buna hazır.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1) KATEGORİLER
-- ---------------------------------------------------------------------
insert into categories (slug, name, subtitle, icon, color_hex, sort_order) values
  ('sokak',  'Günlük Sokak İngilizcesi', 'Idioms & Slang',   '💬', '#FF6B4A', 1),
  ('is',     'İş İngilizcesi',            'Business English',  '💼', '#4A90E2', 2),
  ('turizm', 'Turizm İngilizcesi',        'Travel English',    '🧭', '#2DD4A8', 3),
  ('mutfak', 'Mutfak ve A La Carte',      'Kitchen & Service',  '🍳', '#F5A623', 4),
  ('film',   'Film Alıntıları',           'Movie Quotes',       '🎬', '#B18CFF', 5)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------
-- 2) VİDEOLAR — SOKAK (şehir/yaya sahneleri)
-- ---------------------------------------------------------------------
insert into videos (category_id, en_text, tr_text, context_text, video_url, sort_order)
select id, v.en, v.tr, v.ctx, v.url, v.ord
from categories, (values
  ('Break a leg!', 'Bol şans!',
   'Tiyatro dünyasından gelir; sahneye çıkmadan önce doğrudan ''good luck'' demek uğursuz sayılır.',
   'https://assets.mixkit.co/videos/4231/4231-360.mp4', 1),
  ('It''s raining cats and dogs.', 'Bardaktan boşanırcasına yağmur yağıyor.',
   'Çok şiddetli yağmuru anlatan klasik bir argo deyim.',
   'https://assets.mixkit.co/videos/4401/4401-360.mp4', 2),
  ('That''s a piece of cake.', 'Bu çok kolay bir iş.',
   'Bir görevin ne kadar kolay olduğunu vurgular.',
   'https://assets.mixkit.co/videos/4348/4348-360.mp4', 3),
  ('Let''s hang out this weekend.', 'Bu hafta sonu takılalım.',
   'Arkadaşlar arasında vakit geçirme teklifinde bulunmanın en yaygın yoludur.',
   'https://assets.mixkit.co/videos/4661/4661-360.mp4', 4),
  ('Long time no see!', 'Uzun zamandır görüşmüyoruz!',
   'Uzun süredir görmediğiniz birine rastladığınızda kullanılan samimi bir selamlama.',
   'https://assets.mixkit.co/videos/4000/4000-360.mp4', 5),
  ('Catch you later!', 'Sonra görüşürüz!',
   '''Goodbye'' yerine kullanılan gündelik ve rahat bir vedalaşma ifadesidir.',
   'https://assets.mixkit.co/videos/3428/3428-360.mp4', 6)
) as v(en, tr, ctx, url, ord)
where categories.slug = 'sokak';

-- ---------------------------------------------------------------------
-- 3) VİDEOLAR — İŞ (ofis/toplantı sahneleri)
-- ---------------------------------------------------------------------
insert into videos (category_id, en_text, tr_text, context_text, video_url, sort_order)
select id, v.en, v.tr, v.ctx, v.url, v.ord
from categories, (values
  ('Let''s touch base next week.', 'Gelecek hafta tekrar görüşüp durumu değerlendirelim.',
   'Ofis dilinde çok sık geçer; kısa bir görüşme yapıp güncel durumu paylaşmak anlamına gelir.',
   'https://assets.mixkit.co/videos/308/308-360.mp4', 1),
  ('Can you send me the deck before the call?', 'Görüşmeden önce sunumu gönderebilir misin?',
   '''Deck'', iş jargonunda PowerPoint sunumu anlamına gelir.',
   'https://assets.mixkit.co/videos/4809/4809-360.mp4', 2),
  ('We need to touch base with the client.', 'Müşteriyle iletişime geçmemiz gerekiyor.',
   'Kısa bir güncelleme yapmak veya durumu teyit etmek için biriyle konuşmak anlamındadır.',
   'https://assets.mixkit.co/videos/914/914-360.mp4', 3),
  ('Let''s take this offline.', 'Bunu toplantı dışında konuşalım.',
   'Bir konunun herkesin önünde değil, ilgili kişilerle ayrıca görüşülmesi gerektiğini belirtir.',
   'https://assets.mixkit.co/videos/4547/4547-360.mp4', 4),
  ('Great, we have a deal — let''s shake on it.', 'Harika, anlaştık — el sıkışalım.',
   'Bir anlaşmanın sözlü olarak kabul edildiğini, resmiyet kazandığını belirtmek için kullanılır.',
   'https://assets.mixkit.co/videos/30012/30012-360.mp4', 5),
  ('I''ll follow up by email.', 'E-posta ile takibini yapacağım.',
   'Toplantı sonrası, konuşulanların yazılı olarak da iletileceğini belirtmek için kullanılır.',
   'https://assets.mixkit.co/videos/221/221-360.mp4', 6)
) as v(en, tr, ctx, url, ord)
where categories.slug = 'is';

-- ---------------------------------------------------------------------
-- 4) VİDEOLAR — TURİZM (havalimanı/plaj/gezi sahneleri)
-- ---------------------------------------------------------------------
insert into videos (category_id, en_text, tr_text, context_text, video_url, sort_order)
select id, v.en, v.tr, v.ctx, v.url, v.ord
from categories, (values
  ('Where is the boarding gate for this flight?', 'Bu uçuş için biniş kapısı nerede?',
   'Havalimanında sıkça sorulan, yönlendirme isteyen pratik bir sorudur.',
   'https://assets.mixkit.co/videos/4642/4642-360.mp4', 1),
  ('Could you recommend a good local restaurant?', 'İyi bir yerel restoran önerebilir misiniz?',
   'Otel resepsiyonunda veya turist danışma noktasında sıkça sorulan bir cümle.',
   'https://assets.mixkit.co/videos/4646/4646-360.mp4', 2),
  ('Do you have a room with a sea view?', 'Deniz manzaralı bir odanız var mı?',
   'Otel check-in sırasında oda tercihi belirtmek için kullanılır.',
   'https://assets.mixkit.co/videos/5371/5371-360.mp4', 3),
  ('Is this included in the tour package?', 'Bu, tur paketine dahil mi?',
   'Bir aktivitenin ekstra ücretli olup olmadığını öğrenmek için kullanılır.',
   'https://assets.mixkit.co/videos/40102/40102-360.mp4', 4),
  ('How far is it on foot?', 'Yürüyerek ne kadar uzaklıkta?',
   'Bir yere yürüyerek gidilip gidilemeyeceğini anlamak için sorulur.',
   'https://assets.mixkit.co/videos/4692/4692-360.mp4', 5),
  ('What time does the last bus leave?', 'Son otobüs saat kaçta kalkıyor?',
   'Ulaşım planlarken sıkça sorulan pratik bir soru.',
   'https://assets.mixkit.co/videos/43150/43150-360.mp4', 6)
) as v(en, tr, ctx, url, ord)
where categories.slug = 'turizm';

-- ---------------------------------------------------------------------
-- 5) VİDEOLAR — MUTFAK (şef/restoran mutfağı sahneleri)
-- ---------------------------------------------------------------------
insert into videos (category_id, en_text, tr_text, context_text, video_url, sort_order)
select id, v.en, v.tr, v.ctx, v.url, v.ord
from categories, (values
  ('The dish is served with a side of grilled vegetables.', 'Yemek, ızgara sebze garnitürüyle servis edilir.',
   'A la carte menülerde bir tabağın nasıl sunulduğunu açıklarken kullanılır.',
   'https://assets.mixkit.co/videos/15875/15875-360.mp4', 1),
  ('Could you let the chef know about the allergy?', 'Şefe alerji durumunu iletebilir misiniz?',
   'Bir müşterinin gıda alerjisini garsona bildirmesi için kullanılan kibar bir cümle.',
   'https://assets.mixkit.co/videos/4678/4678-360.mp4', 2),
  ('We reduce the sauce until it thickens.', 'Sosu koyulaşana kadar kısıyoruz.',
   '''Reduce'' mutfak terimi olarak bir sıvıyı kaynatarak koyulaştırmak anlamına gelir.',
   'https://assets.mixkit.co/videos/13258/13258-360.mp4', 3),
  ('Table five would like the check, please.', 'Beşinci masa hesabı istiyor.',
   'Garsonların mutfağa veya kasaya ilettiği tipik bir servis cümlesi.',
   'https://assets.mixkit.co/videos/4672/4672-360.mp4', 4),
  ('It needs to rest for five minutes before serving.', 'Servis etmeden önce beş dakika dinlenmesi gerekiyor.',
   'Pişirme sonrası etin dinlendirilmesi gerektiğini anlatmak için mutfak dilinde kullanılır.',
   'https://assets.mixkit.co/videos/2439/2439-360.mp4', 5),
  ('Double-check the allergy notes on that order.', 'O siparişteki alerji notlarını tekrar kontrol edin.',
   'Müşteri güvenliği için mutfakta alerji bilgisinin dikkatle teyit edilmesi gerektiğini vurgular.',
   'https://assets.mixkit.co/videos/4385/4385-360.mp4', 6)
) as v(en, tr, ctx, url, ord)
where categories.slug = 'mutfak';

-- ---------------------------------------------------------------------
-- 6) VİDEOLAR — FİLM ALINTILARI (sinematik gece/şehir atmosferi — gerçek
-- film sahnesi DEĞİL; telif nedeniyle asıl sahneler kullanılamaz, bunun
-- yerine repliğin ruhuna uygun dramatik bir arka plan seçildi)
-- ---------------------------------------------------------------------
insert into videos (category_id, en_text, tr_text, context_text, video_url, sort_order)
select id, v.en, v.tr, v.ctx, v.url, v.ord
from categories, (values
  ('How you doin''?', 'Naber?',
   'Friends dizisinden Joey Tribbiani''nin imza replikleri; flörtöz bir selamlama tarzıdır.',
   'https://assets.mixkit.co/videos/4332/4332-360.mp4', 1),
  ('I am the one who knocks.', 'Kapıyı çalan benim.',
   'Breaking Bad''de Walter White''ın artık zayıf biri olmadığını vurguladığı unutulmaz replik.',
   'https://assets.mixkit.co/videos/49878/49878-360.mp4', 2),
  ('By order of the Peaky Blinders.', 'Peaky Blinders''ın emriyle.',
   'Peaky Blinders dizisinde Tommy Shelby ve çetesinin otoritesini ilan ederken kullandığı replik.',
   'https://assets.mixkit.co/videos/3429/3429-360.mp4', 3),
  ('I''ll be back.', 'Geri döneceğim.',
   'Arnold Schwarzenegger''in Terminator''da sert ve kısa vurgusuyla söylediği ikonik replik.',
   'https://assets.mixkit.co/videos/49845/49845-360.mp4', 4),
  ('Why so serious?', 'Neden bu kadar ciddisin?',
   'The Dark Knight''ta Joker karakterinin tehditkar ama oyunbaz tavrını yansıtan replik.',
   'https://assets.mixkit.co/videos/4451/4451-360.mp4', 5),
  ('Here''s looking at you, kid.', 'Sana bakıyorum, evlat.',
   'Casablanca filminden gelen, sinema tarihinin en romantik vedalaşma cümlelerinden biridir.',
   'https://assets.mixkit.co/videos/4600/4600-360.mp4', 6)
) as v(en, tr, ctx, url, ord)
where categories.slug = 'film';
