import React, { useState } from 'react';
import { Dish } from '../../types';
import { formatNaira } from '../../config/restaurant';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { X, Heart, Plus, Minus, Flame, Sparkles, Check, Clock, Utensils, AlertCircle } from 'lucide-react';

interface DishModalProps {
  dish: Dish | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToCheckout?: () => void;
}

export const DishModal: React.FC<DishModalProps> = ({
  dish,
  isOpen,
  onClose,
  onNavigateToCheckout
}) => {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [quantity, setQuantity] = useState(1);
  const [selectedProtein, setSelectedProtein] = useState<string>('Standard / Chef Choice');
  const [spicePreference, setSpicePreference] = useState<string>('Savanna Medium');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!isOpen || !dish) return null;

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
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 900);
  };

  const handleOrderNow = () => {
    addToCart(dish, quantity, selectedProtein, spicePreference, specialInstructions);
    onClose();
    if (onNavigateToCheckout) {
      onNavigateToCheckout();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#0D0D0D] border border-[#D4A72C]/40 rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] z-10 animate-in zoom-in-95 duration-300 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/80 border border-white/20 text-white hover:text-[#D4A72C] flex items-center justify-center transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Image Banner */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-black/40" />

          {/* Tags */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div className="flex flex-wrap gap-2">
              {dish.isSignature && (
                <span className="px-3 py-1 rounded-full bg-[#D4A72C] text-[#050505] font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  Signature Masterpiece
                </span>
              )}
              {dish.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#D4A72C]/40 text-[#F1C75B] text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => toggleFavorite(dish.id)}
              className="w-10 h-10 rounded-full bg-black/80 backdrop-blur-md border border-[#D4A72C]/30 flex items-center justify-center text-white hover:text-[#D4A72C] transition-all cursor-pointer"
            >
              <Heart
                className={`w-5 h-5 ${
                  favorited ? "fill-[#D4A72C] text-[#D4A72C]" : "text-white"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          
          {/* Title & Description */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white">
                {dish.name}
              </h2>
              <span className="font-serif-heading text-2xl font-bold text-[#F1C75B]">
                {formatNaira(dish.price)}
              </span>
            </div>

            <p className="text-sm text-slate-300 font-light leading-relaxed">
              {dish.longDescription || dish.description}
            </p>
          </div>

          {/* Key Specs Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs font-sans-body">
            {dish.prepTime && (
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4A72C]" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Prep Time</span>
                  <span className="font-semibold text-white">{dish.prepTime}</span>
                </div>
              </div>
            )}
            {dish.servingSize && (
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#D4A72C]" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Serving</span>
                  <span className="font-semibold text-white">{dish.servingSize}</span>
                </div>
              </div>
            )}
            {dish.calories && (
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 col-span-2 sm:col-span-1">
                <Sparkles className="w-4 h-4 text-[#D4A72C]" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Energy</span>
                  <span className="font-semibold text-white">{dish.calories} kcal</span>
                </div>
              </div>
            )}
          </div>

          {/* Ingredients Breakdown */}
          {dish.ingredients && dish.ingredients.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
                Primary Ingredients
              </span>
              <div className="flex flex-wrap gap-1.5">
                {dish.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Protein Choice Selection */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <label className="text-xs uppercase tracking-wider text-[#F1C75B] font-bold block">
              Select Protein / Topping Addition
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {proteinOptions.map((opt) => (
                <button
                  key={opt.name}
                  type="button"
                  onClick={() => setSelectedProtein(opt.name)}
                  className={`p-3 rounded-xl border text-left text-xs font-sans-body transition-all flex items-center justify-between cursor-pointer ${
                    selectedProtein === opt.name
                      ? 'border-[#D4A72C] bg-[#D4A72C]/15 text-white font-bold'
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

          {/* Spice Preference */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <label className="text-xs uppercase tracking-wider text-[#F1C75B] font-bold block">
              Spice Heat Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Mild & Gentle', 'Savanna Medium', 'Fiery Lagos Hot'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSpicePreference(lvl)}
                  className={`py-2.5 px-3 rounded-xl border text-center text-xs font-sans-body transition-all cursor-pointer ${
                    spicePreference === lvl
                      ? 'border-[#D4A72C] bg-[#D4A72C]/15 text-white font-bold shadow-sm'
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
            <label className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
              Special Instructions for the Kitchen (Optional)
            </label>
            <textarea
              rows={2}
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra fried plantain crispy, no onions in garnish..."
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#D4A72C] transition-all"
            />
          </div>
        </div>

        {/* Bottom Bar: Quantity & Add to Cart / Order Now */}
        <div className="p-6 bg-[#080808] border-t border-[#D4A72C]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-black border border-white/15 rounded-xl p-1.5">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-bold text-white text-base">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Total & Action Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleAddToCart}
              className={`flex-1 sm:flex-initial px-5 py-3 rounded-xl font-sans-body font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                addedSuccess
                  ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                  : 'bg-[#D4A72C] hover:bg-[#F1C75B] text-[#050505] shadow-[0_0_20px_rgba(212,167,44,0.4)]'
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
                  <span>Add · {formatNaira(totalPrice)}</span>
                </>
              )}
            </button>

            <button
              onClick={handleOrderNow}
              className="px-5 py-3 rounded-xl border border-[#D4A72C] text-[#F1C75B] hover:bg-[#D4A72C]/15 font-sans-body font-bold text-xs tracking-wider uppercase transition-all cursor-pointer"
            >
              Order Now
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
