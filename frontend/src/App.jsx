import React, { useState } from 'react';
import CategoryScreen from './screens/CategoryScreen.jsx';
import FeedScreen from './screens/FeedScreen.jsx';
import { useAuth } from './hooks/useAuth.js';
import { useProgress } from './hooks/useProgress.js';
import { useVideos } from './hooks/useVideos.js';

export default function App() {
  const [activeCategory, setActiveCategory] = useState(null); // null => kategori ekranı

  const { userId } = useAuth();
  const { isPracticed, markPracticed, practicedCount } = useProgress(userId);
  const { categories, getVideosByCategory, loading, usingFallback } = useVideos();

  return (
    <div className="font-body">
      {usingFallback && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500/90 text-black text-[11px] text-center py-1">
          Supabase'e bağlanılamadı — örnek veriyle gösteriliyor. .env dosyanı kontrol et.
        </div>
      )}

      {activeCategory ? (
        <FeedScreen
          categoryId={activeCategory}
          categories={categories}
          videos={getVideosByCategory(activeCategory)}
          onBack={() => setActiveCategory(null)}
          markPracticed={markPracticed}
        />
      ) : (
        <CategoryScreen
          categories={categories}
          getVideosByCategory={getVideosByCategory}
          loading={loading}
          onSelectCategory={setActiveCategory}
          practicedCount={practicedCount}
        />
      )}
    </div>
  );
}
