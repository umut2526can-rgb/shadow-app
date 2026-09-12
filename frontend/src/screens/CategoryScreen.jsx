import React from 'react';

export default function CategoryScreen({ categories, getVideosByCategory, loading, onSelectCategory, practicedCount }) {
  return (
    <div className="min-h-screen safe-top safe-bottom px-5 pb-6 flex flex-col">
      <header className="pt-4 pb-2">
        <p className="font-display font-bold text-[26px] leading-tight">Ne çalışmak istersin?</p>
        <p className="text-white/50 text-sm mt-1">
          Bir kategori seç, video izleyerek ve tekrar ederek öğren.
          {practicedCount > 0 && ` Şimdiye kadar ${practicedCount} cümle pratik ettin.`}
        </p>
      </header>

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-white/40 text-sm">Yükleniyor...</div>
      ) : (
        <div className="flex-1 flex flex-col gap-3 mt-3">
          {categories.map((cat, i) => {
            const count = getVideosByCategory(cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="cat-row w-full rounded-2xl p-4 flex items-center gap-4 border border-white/10 text-left active:scale-[0.98] transition-transform"
                style={{
                  animationDelay: `${i * 60}ms`,
                  background: `linear-gradient(135deg, ${cat.color}22, ${cat.color}08)`,
                }}
              >
                <div
                  className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: `${cat.color}33` }}
                >
                  {cat.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-base">{cat.name}</p>
                  <p className="text-white/50 text-[12.5px] mt-0.5">
                    {cat.subtitle} · {count} video
                  </p>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 opacity-40">
                  <path d="M9 6l6 6-6 6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
