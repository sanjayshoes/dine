import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { DISHES } from '../data/menuData';
import { Dish } from '../types';
import { DishCard } from '../components/common/DishCard';
import { Heart, ArrowLeft, Utensils } from 'lucide-react';

interface FavoritesPageProps {
  onNavigate: (route: string) => void;
  onOpenDishDetails: (dish: Dish) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  onNavigate,
  onOpenDishDetails
}) => {
  const { favorites } = useFavorites();

  const favoriteDishes = DISHES.filter((d) => favorites.includes(d.id));

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D4A72C] font-sans-body font-bold block">
            Saved Dishes
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Your <span className="text-[#F1C75B]">Favorites</span>
          </h1>
        </div>

        <button
          onClick={() => onNavigate('/menu')}
          className="inline-flex items-center gap-2 text-xs font-sans-body font-bold text-slate-300 hover:text-[#F1C75B] uppercase tracking-wider transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore More Dishes</span>
        </button>
      </div>

      {favoriteDishes.length === 0 ? (
        <div className="py-24 text-center space-y-6 bg-[#0B0B0B] rounded-3xl border border-white/10 p-8 max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-500">
            <Heart className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif-heading text-2xl font-bold text-white">
              No Saved Favorites Yet
            </h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto font-light font-sans-body">
              Click the heart icon on any dish on our menu to keep track of your favorite African meals for instant re-ordering.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/menu')}
            className="px-8 py-4 rounded-full bg-[#D4A72C] hover:bg-[#F1C75B] text-[#050505] font-sans-body font-extrabold text-xs uppercase tracking-widest transition-all shadow-[0_4px_25px_rgba(212,167,44,0.35)] cursor-pointer"
          >
            Explore Full Menu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onOpenDetails={onOpenDishDetails}
            />
          ))}
        </div>
      )}

    </div>
  );
};
