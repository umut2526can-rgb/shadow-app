import React, { useEffect, useRef } from 'react';
import ShadowingControls from './ShadowingControls.jsx';
import { useMicRecorder } from '../hooks/useMicRecorder.js';
import { useSpeech } from '../hooks/useSpeech.js';

/**
 * Tek bir kart: 100vh yüksekliğinde, arka planda döngüde oynayan video +
 * üzerinde çift dilli altyazı + sağda shadowing kontrol rayı.
 *
 * `isActive` prop'u, bu kartın şu an ekranda (kaydırma akışında görünür)
 * olup olmadığını söyler — video oynatma/durdurma kararını FeedScreen'deki
 * IntersectionObserver veriyor, bu component sadece söyleneni uyguluyor.
 */
export default function VideoCard({ item, isActive, speed, onToggleSpeed, onOpenContext, onPracticed, onError }) {
  const videoRef = useRef(null);
  const { isRecording, toggleRecording, cancelIfActive } = useMicRecorder({ onError });
  const { speak } = useSpeech();

  // Aktif/pasif duruma göre videoyu oynat/durdur
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      video.playbackRate = speed;
      video.play().catch(() => {});
    } else {
      video.pause();
      cancelIfActive(); // kart ekrandan çıkarken açık mikrofon varsa durdur
    }
  }, [isActive, speed, cancelIfActive]);

  // Hız değiştiğinde, kart aktifse videoya da yansıt
  useEffect(() => {
    if (videoRef.current && isActive) {
      videoRef.current.playbackRate = speed;
    }
  }, [speed, isActive]);

  const handleLoop = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleToggleMic = () => {
    toggleRecording();
    onPracticed?.(item.id); // pratik etme girişimini ilerleme takibine işle
  };

  const handlePlayOriginal = () => {
    speak(item.en, { rate: speed });
  };

  return (
    <section className="slide relative w-full h-full flex-shrink-0 bg-black overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={item.src}
        loop
        muted
        playsInline
        preload="metadata"
      />

      {/* Okunabilirlik için alttan üste karartma */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30 pointer-events-none" />

      {/* Çift dilli altyazı */}
      <div className="absolute left-4 right-20 bottom-16 z-10">
        <p className="subtitle-en font-display font-bold text-2xl leading-snug">{item.en}</p>
        <p className="text-white/70 text-[15px] mt-1.5">{item.tr}</p>
      </div>

      <ShadowingControls
        speed={speed}
        onToggleSpeed={onToggleSpeed}
        isRecording={isRecording}
        onToggleMic={handleToggleMic}
        onPlayOriginal={handlePlayOriginal}
        onLoop={handleLoop}
        onOpenContext={() => onOpenContext(item)}
      />
    </section>
  );
}
