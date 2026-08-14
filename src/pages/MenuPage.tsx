import React, { useState, useMemo } from 'react';
import { DISHES, CATEGORIES } from '../data/menuData';
import { Dish, DishCategory } from '../types';
import { DishCard } from '../components/common/DishCard';
import { 
  Search, 
  Flame, 
  Sparkles, 
  SlidersHorizontal, 
  X, 
  Utensils, 
  ArrowUpDown, 
  Filter
} from 'lucide-react';

interface MenuPageProps {
  initialCategory?: DishCategory | 'all';
  onOpenDishDetails: (dish: Dish) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  initialCategory = 'all',
  onOpenDishDetails
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');
  const [spicyFilter, setSpicyFilter] = useState<number | 'all'>('all');
  const [signaturesOnly, setSignaturesOnly] = useState(false);

  // Sync if initialCategory changes
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const filteredDishes = useMemo(() => {
    return DISHES.filter((dish) => {
      // Category check
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) {
        return false;
      }
      // Signature check
      if (signaturesOnly && !dish.isSignature) {
        return false;
      }
      // Spicy level check
      if (spicyFilter !== 'all' && dish.spicyLevel !== spicyFilter) {
        return false;
      }
      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = dish.name.toLowerCase().includes(q);
        const matchDesc = dish.description.toLowerCase().includes(q);
        const matchIngredients = dish.ingredients?.some((i) => i.toLowerCase().includes(q));
        const matchTags = dish.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchIngredients && !matchTags) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy, spicyFilter, signaturesOnly]);

  const currentCategoryInfo = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="pt-24 sm:pt-28 pb-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#D4A72C]/15 border border-[#D4A72C]/40 text-xs font-sans-body text-[#F1C75B] uppercase tracking-widest font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#D4A72C]" />
          Authentic Nigerian & Pan-African Delicacies
        </div>

        <h1 className="font-serif-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
          Our Culinary <span className="text-[#F1C75B]">Menu</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 font-light font-sans-body">
          From firewood-roasted party Jollof to charcoal Suya skewers and indigenous soup bowls, explore our handcrafted dishes prepared with passion and served fresh.
        </p>
      </div>

      {/* Category Navigation Pills (Scrollable on mobile) */}
      <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-white/10 pt-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2.5 rounded-full text-xs font-sans-body font-semibold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-[#D4A72C] text-[#050505] shadow-[0_0_15px_rgba(212,167,44,0.4)] font-bold'
              : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
          }`}
        >
          All Dishes ({DISHES.length})
        </button>

        {CATEGORIES.map((cat) => {
          const count = DISHES.filter((d) => d.category === cat.id).length;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-sans-body font-semibold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#D4A72C] text-[#050505] shadow-[0_0_15px_rgba(212,167,44,0.4)] font-bold'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Active Category Description (if selected) */}
      {currentCategoryInfo && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#D4A72C]/10 via-black/40 to-transparent border border-[#D4A72C]/20 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#D4A72C]/20 border border-[#D4A72C]/40 flex items-center justify-center text-[#D4A72C] shrink-0 font-serif-heading font-bold">
            SB
          </div>
          <div>
            <h3 className="font-serif-heading text-base font-bold text-[#F1C75B]">
              {currentCategoryInfo.name}
            </h3>
            <p className="text-xs text-slate-300 font-light">
              {currentCategoryInfo.shortDesc}
            </p>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-6 rounded-3xl bg-[#0D0D0D] border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Field */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by dish name, spice, ingredient..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white placeholder-slate-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filters: Sort & Spice Level */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Signature Filter */}
            <button
              onClick={() => setSignaturesOnly(!signaturesOnly)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-sans-body font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                signaturesOnly
                  ? 'bg-[#D4A72C] text-black font-bold'
                  : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signatures</span>
            </button>

            {/* Spicy Filter */}
            <select
              value={spicyFilter}
              onChange={(e) => setSpicyFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="px-3.5 py-2.5 rounded-xl bg-black/80 border border-white/15 text-xs text-slate-300 focus:border-[#D4A72C] focus:outline-none cursor-pointer"
            >
              <option value="all">All Spice Levels</option>
              <option value="0">Mild / Gentle (No pepper)</option>
              <option value="1">Light Pepper (1★)</option>
              <option value="2">Medium Heat (2★)</option>
              <option value="3">Fiery Hot (3★)</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3.5 py-2.5 rounded-xl bg-black/80 border border-white/15 text-xs text-slate-300 focus:border-[#D4A72C] focus:outline-none cursor-pointer"
            >
              <option value="featured">Sort: Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>

          </div>

        </div>

        {/* Search Info line */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-white/5 font-sans-body">
          <span>Showing <strong>{filteredDishes.length}</strong> delicious culinary options</span>
          {(searchQuery || selectedCategory !== 'all' || signaturesOnly || spicyFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSignaturesOnly(false);
                setSpicyFilter('all');
              }}
              className="text-[#D4A72C] hover:underline"
            >
              Reset All Filters
            </button>
          )}
        </div>
      </div>

      {/* Dishes Grid */}
      {filteredDishes.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-[#0A0A0A] rounded-3xl border border-white/10 p-8">
          <Utensils className="w-12 h-12 text-slate-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="font-serif-heading text-xl font-bold text-white">
              No Dishes Found
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We couldn't find any dishes matching your current filter criteria. Try adjusting your filters or search terms.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSignaturesOnly(false);
              setSpicyFilter('all');
            }}
            className="px-6 py-2.5 rounded-xl bg-[#D4A72C] text-black font-bold text-xs uppercase tracking-wider"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDishes.map((dish) => (
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
