import React from 'react';

export default function ContextSheet({ isOpen, item, onClose }) {
  if (!item) return null;

  return (
    <>
      <div
        className={`sheet-backdrop fixed inset-0 bg-black/50 z-30 ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      <div
        className={`sheet fixed left-0 right-0 bottom-0 z-40 bg-[#0D0F14] border-t border-white/10 rounded-t-3xl px-5 pt-3 pb-8 safe-bottom ${isOpen ? 'open' : ''}`}
      >
        <div className="w-10 h-1.5 rounded-full bg-white/20 mx-auto mb-4" />
        <p className="font-display text-xs tracking-wide text-white/40">CÜMLENİN BAĞLAMI</p>
        <p className="font-display font-semibold text-lg mt-2">{item.en}</p>
        <p className="text-white/50 text-sm mt-1">{item.tr}</p>
        <p className="text-white/80 text-sm leading-relaxed mt-4">{item.context}</p>
      </div>
    </>
  );
}
