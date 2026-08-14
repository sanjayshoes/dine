import React, { useState } from 'react';
import { DISHES } from '../data/menuData';
import { Dish } from '../types';
import { formatNaira, RESTAURANT_CONFIG } from '../config/restaurant';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../../src/context/FavoritesContext';
import { DishCard } from '../components/common/DishCard';
import { 
  Heart, 
  Plus, 
  Minus, 
  Sparkles, 
  Flame, 
  Clock, 
  Utensils, 
  ArrowLeft, 
  Check, 
  ShieldCheck,
  Share2,
  AlertCircle
} from 'lucide-react';

interface DishDetailPageProps {
  dishSlug: string;
  onNavigate: (route: string) => void;
  onOpenDishDetails: (dish: Dish) => void;
}

export const DishDetailPage: React.FC<DishDetailPageProps> = ({
  dishSlug,
  onNavigate,
  onOpenDishDetails
}) => {
  const dish = DISHES.find((d) => d.slug === dishSlug || d.id === dishSlug) || DISHES[0];
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [quantity, setQuantity] = useState(1);
  const [selectedProtein, setSelectedProtein] = useState<string>('Standard / Chef Choice');
  const [spicePreference, setSpicePreference] = useState<string>('Savanna Medium');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const favorited = isFavorite(dish.id);

  const proteinOptions = [
    { name: 'Standard / Chef Choice', extra: 0 },
    { name: 'Braised Goat Meat', extra: 1500 },
    { name: 'Crispy Fried Beef', extra: 1000 },
    { name: 'Char-Grilled Chicken', extra: 1000 },
    { name: 'Jumbo Tiger Prawns (2pcs)', extra: 3000 },
    { name: 'Smoked Catfish', extra: 2000 }
  ];

  const currentExtra = proteinOptions.find((p) => p.name === selectedProtein)?.extra || 0;
  const unitPrice = dish.price + currentExtra;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(dish, quantity, selectedProtein, spicePreference, specialInstructions);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleOrderNow = () => {
    addToCart(dish, quantity, selectedProtein, spicePreference, specialInstructions);
    onNavigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${dish.name} | Savanna Bites`,
        text: dish.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const relatedDishes = DISHES.filter(
    (d) => d.id !== dish.id && (d.category === dish.category || d.isSignature)
  ).slice(0, 4);

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('/menu')}
          className="inline-flex items-center gap-2 text-xs font-sans-body font-bold text-slate-300 hover:text-[#F1C75B] uppercase tracking-wider transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">{copiedLink ? 'Link Copied!' : 'Share Dish'}</span>
          </button>

          <button
            onClick={() => toggleFavorite(dish.id)}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-[#D4A72C] border border-white/10 transition-colors cursor-pointer"
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-[#D4A72C] text-[#D4A72C]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        
        {/* Left Column: Large Image Showcase */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-3xl overflow-hidden border border-[#D4A72C]/30 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-80 sm:h-[450px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Badges Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="flex flex-wrap gap-2">
                {dish.isSignature && (
                  <span className="px-3 py-1 rounded-full bg-[#D4A72C] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Signature Dish
                  </span>
                )}
                {dish.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#D4A72C]/40 text-[#F1C75B] text-xs font-sans-body"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs font-sans-body">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <Clock className="w-4 h-4 text-[#D4A72C] mx-auto mb-1" />
              <span className="text-slate-400 block text-[10px]">Prep Time</span>
              <span className="font-semibold text-white">{dish.prepTime || '20-25 mins'}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <Utensils className="w-4 h-4 text-[#D4A72C] mx-auto mb-1" />
              <span className="text-slate-400 block text-[10px]">Portion</span>
              <span className="font-semibold text-white">{dish.servingSize || 'Generous Platter'}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#D4A72C] mx-auto mb-1" />
              <span className="text-slate-400 block text-[10px]">Quality</span>
              <span className="font-semibold text-white">Cooked Fresh</span>
            </div>
          </div>
        </div>

        {/* Right Column: Culinary Details, Options & Actions */}
        <div className="lg:col-span-6 space-y-8">
          
          <div className="space-y-3">
            <span className="text-xs uppercase font-sans-body font-bold text-[#D4A72C] tracking-widest block">
              Savanna Bites Collection
            </span>
            <h1 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              {dish.name}
            </h1>
            <div className="flex items-baseline gap-4 pt-1">
              <span className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#F1C75B]">
                {formatNaira(unitPrice)}
              </span>
              {currentExtra > 0 && (
                <span className="text-xs text-slate-400">
                  (Includes {formatNaira(currentExtra)} protein add-on)
                </span>
              )}
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed font-sans-body">
            {dish.longDescription || dish.description}
          </p>

          {/* Ingredients & Allergens */}
          {dish.ingredients && dish.ingredients.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block">
                Primary Ingredients & Aromatics
              </span>
              <div className="flex flex-wrap gap-1.5">
                {dish.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Protein Options Selection */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <label className="text-xs uppercase font-bold text-[#F1C75B] tracking-wider block">
              Choose Protein Addition
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {proteinOptions.map((opt) => (
                <button
                  key={opt.name}
                  type="button"
                  onClick={() => setSelectedProtein(opt.name)}
                  className={`p-3.5 rounded-2xl border text-left text-xs font-sans-body transition-all flex items-center justify-between cursor-pointer ${
                    selectedProtein === opt.name
                      ? 'border-[#D4A72C] bg-[#D4A72C]/15 text-white font-bold shadow-md'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/30'
                  }`}
                >
                  <span>{opt.name}</span>
                  <span className="text-[#D4A72C]">
                    {opt.extra === 0 ? 'Included' : `+${formatNaira(opt.extra)}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Spice Level Adjustment */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <label className="text-xs uppercase font-bold text-[#F1C75B] tracking-wider block">
              Spice Heat Level
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {['Mild & Gentle', 'Savanna Medium', 'Fiery Lagos Hot'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSpicePreference(lvl)}
                  className={`py-3 px-3 rounded-2xl border text-center text-xs font-sans-body transition-all cursor-pointer ${
                    spicePreference === lvl
                      ? 'border-[#D4A72C] bg-[#D4A72C]/15 text-white font-bold'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/30'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Special Cooking Note */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <label className="text-xs uppercase font-bold text-slate-400 tracking-wider block">
              Kitchen Instructions (Optional)
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra pepper sauce on the side, well done..."
              className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          {/* Action Row: Quantity + Add to Cart + Order Now */}
          <div className="p-6 rounded-3xl bg-[#0D0D0D] border border-[#D4A72C]/40 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Quantity Counter */}
              <div className="flex items-center gap-3 bg-black border border-white/20 rounded-2xl p-1.5 w-full sm:w-auto justify-center">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-white text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Total Summary */}
              <div className="text-center sm:text-right">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-sans-body">
                  Total Dish Amount
                </span>
                <span className="font-serif-heading text-2xl font-bold text-[#F1C75B]">
                  {formatNaira(totalPrice)}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className={`py-4 px-6 rounded-2xl font-sans-body font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  addedSuccess
                    ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                    : 'bg-[#D4A72C] hover:bg-[#F1C75B] text-[#050505] shadow-[0_4px_25px_rgba(212,167,44,0.35)]'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={handleOrderNow}
                className="py-4 px-6 rounded-2xl border border-[#D4A72C] text-[#F1C75B] hover:bg-[#D4A72C]/15 font-sans-body font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Instant Checkout</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Related Dishes Section */}
      {relatedDishes.length > 0 && (
        <div className="space-y-8 pt-12 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white">
              You Might Also <span className="text-[#F1C75B]">Savor</span>
            </h3>
            <button
              onClick={() => onNavigate('/menu')}
              className="text-xs font-sans-body font-bold text-[#D4A72C] hover:underline"
            >
              View Full Menu
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedDishes.map((relDish) => (
              <DishCard
                key={relDish.id}
                dish={relDish}
                onOpenDetails={onOpenDishDetails}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
