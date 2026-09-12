import React, { useEffect, useMemo, useRef, useState } from 'react';
import VideoCard from '../components/VideoCard.jsx';
import ContextSheet from '../components/ContextSheet.jsx';

export default function FeedScreen({ categoryId, categories, videos, onBack, markPracticed }) {
  const category = useMemo(() => categories.find((c) => c.id === categoryId), [categories, categoryId]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [speed, setSpeed] = useState(1); // kategori geneli tek hız — orijinal prototipteki davranışla aynı
  const [contextItem, setContextItem] = useState(null);
  const [toast, setToast] = useState('');

  const containerRef = useRef(null);
  const sectionRefs = useRef([]);

  // Ekranda hangi kartın göründüğünü takip eden IntersectionObserver.
  // Bu, "aktif" kartı belirler; VideoCard sadece aktifse videoyu oynatır.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const idx = Number(entry.target.dataset.idx);
            setActiveIndex(idx);
          }
        });
      },
      { root: container, threshold: [0, 0.6, 1] }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [videos]);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(''), 2500);
  };

  if (!category) return null;

  return (
    <div className="fixed inset-0 bg-black">
      {/* Üst bar: geri, kategori adı, ilerleme */}
      <div className="absolute top-0 left-0 right-0 z-30 safe-top px-4 pb-3 bg-gradient-to-b from-black/70 via-black/25 to-transparent">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            aria-label="Geri dön"
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center active:scale-90 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="text-center">
            <p className="font-display font-semibold text-[15px]">{category.name}</p>
            <p className="text-white/50 text-[11px] mt-0.5">{activeIndex + 1} / {videos.length}</p>
          </div>
          <div className="w-9 h-9" />
        </div>
        <div className="h-1 w-full bg-white/15 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${((activeIndex + 1) / videos.length) * 100}%`, background: category.color }}
          />
        </div>
      </div>

      {/* Kart akışı */}
      <div ref={containerRef} className="feed-scroll no-scrollbar w-full h-full overflow-y-scroll">
        {videos.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => (sectionRefs.current[idx] = el)}
            data-idx={idx}
            className="w-full h-full"
          >
            <VideoCard
              item={item}
              isActive={idx === activeIndex}
              speed={speed}
              onToggleSpeed={() => setSpeed((s) => (s === 1 ? 0.75 : 1))}
              onOpenContext={setContextItem}
              onPracticed={markPracticed}
              onError={showToast}
            />
          </div>
        ))}
      </div>

      <ContextSheet isOpen={!!contextItem} item={contextItem} onClose={() => setContextItem(null)} />

      <div className={`toast ${toast ? 'show' : ''}`}>{toast}</div>
    </div>
  );
}
