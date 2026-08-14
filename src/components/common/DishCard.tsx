import React from 'react';
import { Dish } from '../../types';
import { formatNaira } from '../../config/restaurant';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Heart, Plus, Sparkles, Flame, Clock, Eye } from 'lucide-react';

interface DishCardProps {
  dish: Dish;
  onOpenDetails: (dish: Dish) => void;
}

export const DishCard: React.FC<DishCardProps> = ({ dish, onOpenDetails }) => {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(dish.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(dish, 1);
  };

  return (
    <div
      onClick={() => onOpenDetails(dish)}
      className="group relative rounded-2xl bg-[#0F0F0F] border border-[#D4A72C]/20 hover:border-[#F1C75B]/60 transition-all duration-500 overflow-hidden flex flex-col justify-between cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_15px_35px_-10px_rgba(212,167,44,0.25)]"
    >
      {/* Image Container */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-black/50">
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5">
            {dish.isSignature && (
              <span className="px-2.5 py-1 rounded-full bg-[#D4A72C] text-[#050505] font-semibold text-[10px] font-sans-body tracking-wider uppercase flex items-center gap-1 shadow-md">
                <Sparkles className="w-3 h-3" />
                Signature
              </span>
            )}
            {dish.featured && !dish.isSignature && (
              <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#D4A72C]/40 text-[#F1C75B] text-[10px] font-sans-body tracking-wider uppercase">
                Chef Choice
              </span>
            )}
          </div>

          {/* Favorite Heart Toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(dish.id);
            }}
            className="w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-[#D4A72C]/30 flex items-center justify-center text-white hover:text-[#D4A72C] transition-all hover:scale-110 pointer-events-auto cursor-pointer"
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                favorited ? "fill-[#D4A72C] text-[#D4A72C]" : "text-white"
              }`}
            />
          </button>
        </div>

        {/* Spice Level Indicator */}
        {dish.spicyLevel && dish.spicyLevel > 0 ? (
          <div className="absolute bottom-3 left-3 flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[10px] text-amber-400">
            {[...Array(dish.spicyLevel)].map((_, i) => (
              <Flame key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
            ))}
            <span className="ml-1 text-[9px] text-slate-300 font-sans-body">
              {dish.spicyLevel === 1 ? 'Mild' : dish.spicyLevel === 2 ? 'Medium' : 'Hot'}
            </span>
          </div>
        ) : null}

        {/* Prep Time */}
        {dish.prepTime && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[10px] text-slate-300">
            <Clock className="w-3 h-3 text-[#D4A72C]" />
            <span>{dish.prepTime}</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-serif-heading text-lg font-bold text-white group-hover:text-[#F1C75B] transition-colors leading-snug line-clamp-1">
              {dish.name}
            </h3>
          </div>

          <p className="text-xs text-slate-400 font-light line-clamp-2 leading-relaxed">
            {dish.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-sans-body tracking-wider text-slate-400 block">
              Price
            </span>
            <span className="font-serif-heading text-lg font-bold text-[#F1C75B]">
              {formatNaira(dish.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(dish);
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all border border-white/10"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleQuickAdd}
              className="px-3.5 py-2 rounded-xl bg-[#D4A72C] hover:bg-[#F1C75B] text-[#050505] font-semibold text-xs font-sans-body tracking-wide transition-all duration-300 shadow-[0_4px_15px_rgba(212,167,44,0.3)] hover:shadow-[0_4px_25px_rgba(241,199,91,0.5)] flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
