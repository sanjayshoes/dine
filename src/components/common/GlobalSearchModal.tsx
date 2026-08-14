import React, { useState, useMemo } from 'react';
import { DISHES, CATEGORIES } from '../../data/menuData';
import { Dish } from '../../types';
import { formatNaira } from '../../config/restaurant';
import { useCart } from '../../context/CartContext';
import { Search, X, Flame, Sparkles, ArrowRight, Utensils } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDish: (dish: Dish) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectDish
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addToCart } = useCart();

  const filteredDishes = useMemo(() => {
    return DISHES.filter((dish) => {
      const matchCategory = selectedCategory === 'all' || dish.category === selectedCategory;
      const q = query.toLowerCase().trim();
      if (!q) return matchCategory;

      const matchName = dish.name.toLowerCase().includes(q);
      const matchDesc = dish.description.toLowerCase().includes(q);
      const matchCategoryText = dish.category.toLowerCase().includes(q);
      const matchIngredients = dish.ingredients?.some((i) => i.toLowerCase().includes(q));
      const matchTags = dish.tags?.some((t) => t.toLowerCase().includes(q));

      return matchCategory && (matchName || matchDesc || matchCategoryText || matchIngredients || matchTags);
    });
  }, [query, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-[#0D0D0D] border border-[#D4A72C]/40 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-10">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#D4A72C] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Jollof, Suya, Egusi, Fisherman soup, Zobo, etc..."
            className="w-full bg-transparent text-white placeholder-slate-500 text-base sm:text-lg focus:outline-none font-sans-body"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-slate-300 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Quick Filter Tags */}
        <div className="px-4 sm:px-6 py-3 bg-black/40 border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-full text-xs font-sans-body whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#D4A72C] text-[#050505] font-bold'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            All Dishes ({DISHES.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-sans-body whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#D4A72C] text-[#050505] font-bold'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-3 custom-scrollbar">
          {filteredDishes.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <Utensils className="w-10 h-10 text-slate-600 mx-auto" />
              <h4 className="font-serif-heading text-lg text-white">
                No culinary matches found
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                We couldn't find any dishes matching "{query}". Try searching for popular favorites like "Jollof", "Suya", "Puff-Puff", or "Egusi".
              </p>
            </div>
          ) : (
            filteredDishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => {
                  onSelectDish(dish);
                  onClose();
                }}
                className="group flex items-center justify-between gap-4 p-3 sm:p-3.5 rounded-2xl bg-white/5 hover:bg-[#D4A72C]/10 border border-white/5 hover:border-[#D4A72C]/40 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif-heading text-sm sm:text-base font-bold text-white group-hover:text-[#F1C75B] transition-colors truncate">
                        {dish.name}
                      </h4>
                      {dish.isSignature && (
                        <span className="shrink-0 px-1.5 py-0.5 rounded bg-[#D4A72C] text-[#050505] text-[9px] font-bold uppercase">
                          Signature
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {dish.description}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-[#F1C75B] mt-1 font-bold">
                      <span>{formatNaira(dish.price)}</span>
                      {dish.spicyLevel && dish.spicyLevel > 0 ? (
                        <span className="text-amber-400/80 flex items-center gap-0.5 font-normal text-[10px]">
                          <Flame className="w-3 h-3 fill-amber-400" />
                          {dish.spicyLevel === 1 ? 'Mild' : dish.spicyLevel === 2 ? 'Medium' : 'Fiery'}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(dish, 1);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#D4A72C] hover:bg-[#F1C75B] text-[#050505] text-xs font-bold font-sans-body transition-all"
                  >
                    Add
                  </button>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#D4A72C] transition-colors" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Hint */}
        <div className="p-3 bg-black/60 border-t border-white/5 text-center text-[11px] text-slate-400">
          Showing {filteredDishes.length} dishes in our kitchen collection
        </div>

      </div>
    </div>
  );
};
