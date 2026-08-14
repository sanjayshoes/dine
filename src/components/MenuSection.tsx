import React, { useState } from 'react';
import { DISHES } from '../data/restaurantData';
import { Dish } from '../types';
import { DishModal } from './DishModal';
import { Sparkles, Star, Plus, Flame, UtensilsCrossed } from 'lucide-react';

interface MenuSectionProps {
  onPreOrderDish: (dish: Dish) => void;
  preOrderedDishIds: string[];
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onPreOrderDish, preOrderedDishIds }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  const categories = [
    { id: 'all', label: 'All Quantum Creations' },
    { id: 'starters', label: 'Starters' },
    { id: 'mains', label: 'Signature Mains' },
    { id: 'cocktails', label: 'Cyber Cocktails' },
    { id: 'desserts', label: 'Cosmic Desserts' },
  ];

  const filteredDishes = activeCategory === 'all'
    ? DISHES
    : DISHES.filter((dish) => dish.category === activeCategory);

  const getDishEmoji = (id: string) => {
    switch (id) {
      case 'nebula-eggs': return '🥚';
      case 'cyber-salmon': return '🐟';
      case 'stellar-steak': return '🥩';
      case 'zero-gravity-cocktail': return '🍸';
      case 'quantum-tartare': return '🍣';
      case 'plasma-gelato': return '🍨';
      default: return '✨';
    }
  };

  return (
    <section id="menu" className="relative py-24 px-4 max-w-7xl mx-auto">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-xs font-space uppercase tracking-widest">
          <i className="fa-solid fa-meteor text-cyan-400"></i>
          <span>Molecular Tasting Menu</span>
        </div>

        <h2 className="font-orbitron text-3xl sm:text-5xl font-black text-white tracking-wide">
          SIGNATURE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-200 neon-text-cyan">QUANTUM BITES</span>
        </h2>

        <p className="max-w-xl mx-auto text-slate-300 text-sm sm:text-base font-light">
          Each dish is engineered to awaken multi-sensory euphoria through molecular transformation, zero-gravity infusion, and rare interstellar ingredients.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-orbitron font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-cyan-400 text-black shadow-[0_0_20px_rgba(56,189,248,0.6)] font-bold scale-105'
                  : 'glass-card text-slate-300 hover:text-cyan-300 hover:border-cyan-400/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dishes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDishes.map((dish) => {
          const isPreordered = preOrderedDishIds.includes(dish.id);

          return (
            <div
              key={dish.id}
              onClick={() => setSelectedDish(dish)}
              className="group glass-card-interactive rounded-2xl p-5 flex flex-col justify-between relative cursor-pointer overflow-hidden"
            >
              {/* Popular Badge */}
              {dish.isPopular && (
                <div className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full bg-cyan-400 text-black font-orbitron text-[10px] font-black uppercase tracking-wider shadow-[0_0_10px_rgba(56,189,248,0.8)] flex items-center gap-1">
                  <Star className="w-3 h-3 fill-black" />
                  <span>Signature</span>
                </div>
              )}

              <div>
                {/* Dish Thumbnail */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 border border-cyan-500/20">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Dish Icon / Emoji Overlay */}
                  <div className="absolute bottom-2 left-3 w-10 h-10 rounded-lg bg-slate-900/80 backdrop-blur-md border border-cyan-400/30 flex items-center justify-center text-xl shadow-md">
                    {getDishEmoji(dish.id)}
                  </div>
                </div>

                {/* Title & Price Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-orbitron text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {dish.name}
                  </h3>
                  <span className="font-orbitron text-lg font-extrabold text-cyan-400 neon-text-cyan">
                    ${dish.price}
                  </span>
                </div>

                {/* Short Description */}
                <p className="text-xs text-slate-300 line-clamp-2 mb-4 font-light leading-relaxed">
                  {dish.description}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {dish.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-space text-cyan-300/80 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreOrderDish(dish);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-orbitron font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    isPreordered
                      ? 'bg-emerald-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                      : 'bg-cyan-500/20 hover:bg-cyan-400 hover:text-black text-cyan-300 border border-cyan-400/40'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isPreordered ? 'Added' : 'Pre-order'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dish Modal Detail Popup */}
      <DishModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onPreOrder={onPreOrderDish}
      />
    </section>
  );
};
