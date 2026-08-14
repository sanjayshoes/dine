import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/menuData';
import { GalleryItem } from '../types';
import { 
  Sparkles, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  UtensilsCrossed, 
  Calendar,
  ZoomIn
} from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (route: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<'all' | 'food' | 'ambiance' | 'drinks' | 'kitchen'>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const handleNext = () => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveItem(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveItem(filteredItems[prevIndex]);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#D4A72C]/15 border border-[#D4A72C]/40 text-xs font-sans-body text-[#F1C75B] uppercase tracking-widest font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#D4A72C]" />
          Visual Atmosphere & Craft
        </div>

        <h1 className="font-serif-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
          The Savanna <span className="text-[#F1C75B]">Gallery</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 font-light font-sans-body leading-relaxed">
          Glimpses of our vibrant culinary creations, golden ambient dining spaces, and the passion of our kitchen team.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap border-b border-white/10 pb-4">
        {[
          { id: 'all', label: 'All Photos' },
          { id: 'food', label: 'Dishes & Platters' },
          { id: 'ambiance', label: 'Dining Ambiance' },
          { id: 'drinks', label: 'Artisanal Drinks' },
          { id: 'kitchen', label: 'Kitchen Craft' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-4 py-2 rounded-full text-xs font-sans-body font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              filter === tab.id
                ? 'bg-[#D4A72C] text-black font-bold shadow-md'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group relative h-64 sm:h-80 rounded-3xl overflow-hidden border border-[#D4A72C]/20 hover:border-[#F1C75B] transition-all duration-500 cursor-pointer shadow-lg hover:-translate-y-1"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="flex justify-end">
                <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              <div>
                {item.highlightTag && (
                  <span className="text-[10px] uppercase font-sans-body font-bold text-[#D4A72C] tracking-wider block mb-1">
                    {item.highlightTag}
                  </span>
                )}
                <h3 className="font-serif-heading text-lg font-bold text-white leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setActiveItem(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
          />

          <div className="relative max-w-4xl w-full bg-[#0D0D0D] border border-[#D4A72C]/40 rounded-3xl overflow-hidden shadow-2xl z-10 animate-in zoom-in-95 duration-200">
            {/* Header controls */}
            <div className="p-4 bg-black/80 flex items-center justify-between border-b border-white/10">
              <span className="font-serif-heading text-base font-bold text-white">
                {activeItem.title}
              </span>
              <button
                onClick={() => setActiveItem(null)}
                className="p-2 rounded-full text-slate-400 hover:text-white bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Image */}
            <div className="relative h-[60vh] bg-black flex items-center justify-center">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="max-w-full max-h-full object-contain"
                referrerPolicy="no-referrer"
              />

              {/* Prev / Next Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 p-3 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 p-3 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom info & actions */}
            <div className="p-6 bg-[#0B0B0B] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-serif-heading text-lg font-bold text-[#F1C75B]">
                  {activeItem.title}
                </h4>
                <p className="text-xs text-slate-300 font-sans-body">
                  Savanna Bites Culinary Collection · Victoria Island, Lagos
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setActiveItem(null);
                    onNavigate('/menu');
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#D4A72C] text-black font-sans-body font-bold text-xs uppercase tracking-wider"
                >
                  Order Food
                </button>
                <button
                  onClick={() => {
                    setActiveItem(null);
                    onNavigate('/reservation');
                  }}
                  className="px-5 py-2.5 rounded-full border border-white/20 text-white font-sans-body font-semibold text-xs uppercase tracking-wider"
                >
                  Book Table
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
