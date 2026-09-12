import React from 'react';

/**
 * Bir video kartının sağ kenarındaki dikey buton rayı.
 * Tüm mantık (kayıt, hız, seslendirme) üst component'ten (VideoCard)
 * prop olarak geliyor — bu component tamamen "aptal" (dumb), sadece
 * görünümden sorumlu.
 */
export default function ShadowingControls({
  speed,
  onToggleSpeed,
  isRecording,
  onToggleMic,
  onPlayOriginal,
  onLoop,
  onOpenContext,
}) {
  return (
    <div className="absolute right-3 bottom-28 z-20 flex flex-col items-center gap-3">
      <button
        aria-label="Bağlamı göster"
        onClick={onOpenContext}
        className="ctrl-btn"
      >
        ℹ️
      </button>

      <button
        aria-label="Başa sar"
        onClick={onLoop}
        className="ctrl-btn"
      >
        🔄
      </button>

      <button
        aria-label="Hızı değiştir"
        onClick={onToggleSpeed}
        className={`ctrl-btn flex-col text-[10px] leading-none ${speed !== 1 ? 'is-active' : ''}`}
      >
        <span className="text-lg">⚡</span>
        <span className="mt-0.5">{speed}x</span>
      </button>

      <div className="relative">
        <button
          aria-label={isRecording ? 'Kaydı durdur' : 'Mikrofonla kaydet'}
          onClick={onToggleMic}
          className={`ctrl-btn ${isRecording ? 'mic-recording' : ''}`}
        >
          🎙️
        </button>
        {isRecording && <span className="rec-timer">KAYITTA</span>}
      </div>

      <button
        aria-label="Orijinal telaffuzu dinle"
        onClick={onPlayOriginal}
        className="ctrl-btn"
      >
        🔊
      </button>
    </div>
  );
}
