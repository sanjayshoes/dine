import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatNaira, RESTAURANT_CONFIG } from '../config/restaurant';
import { openWhatsAppOrder } from '../utils/whatsapp';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  Tag, 
  Sparkles, 
  MessageCircle,
  Utensils
} from 'lucide-react';

interface CartPageProps {
  onNavigate: (route: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryFee,
    discount,
    discountCode,
    applyCoupon,
    removeCoupon,
    total,
    totalItemsCount
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; error: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMsg({ text: res.message, error: !res.success });
  };

  const handleProceedToCheckout = () => {
    if (!cart || cart.length === 0) {
      return;
    }
    openWhatsAppOrder({
      items: cart,
      subtotal,
      deliveryFee,
      discount,
      total
    });
  };

  const remainingForFreeDelivery = Math.max(
    0,
    RESTAURANT_CONFIG.delivery.freeDeliveryThreshold - subtotal
  );

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D4A72C] font-sans-body font-bold block">
            Review Your Selection
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Your Food <span className="text-[#F1C75B]">Cart</span>
          </h1>
        </div>

        <button
          onClick={() => onNavigate('/menu')}
          className="inline-flex items-center gap-2 text-xs font-sans-body font-bold text-slate-300 hover:text-[#F1C75B] uppercase tracking-wider transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="py-24 text-center space-y-6 bg-[#0B0B0B] rounded-3xl border border-white/10 p-8 max-w-2xl mx-auto shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-500">
            <ShoppingBag className="w-10 h-10 text-[#D4A72C]" />
          </div>
          <div className="space-y-2">
            <span className="text-xs uppercase font-sans-body font-bold text-[#D4A72C] tracking-widest block">
              Savanna Bites Kitchen
            </span>
            <h2 className="font-serif-heading text-3xl font-extrabold text-white">
              Your cart is waiting
            </h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto font-light font-sans-body">
              Add something delicious from our menu before continuing.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/menu')}
            className="px-8 py-4 rounded-full bg-[#D4A72C] hover:bg-[#F1C75B] text-[#050505] font-sans-body font-extrabold text-xs uppercase tracking-widest transition-all shadow-[0_4px_25px_rgba(212,167,44,0.35)] cursor-pointer inline-flex items-center gap-2"
          >
            <Utensils className="w-4 h-4" />
            <span>EXPLORE MENU</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Cart Items Table (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Free Delivery Bar */}
            <div className="p-4 rounded-2xl bg-[#D4A72C]/10 border border-[#D4A72C]/30 text-xs font-sans-body">
              {remainingForFreeDelivery === 0 ? (
                <div className="flex items-center gap-2 text-[#F1C75B] font-semibold">
                  <Sparkles className="w-4 h-4 text-[#D4A72C]" />
                  <span>You've unlocked <strong>FREE Delivery</strong> across Lagos!</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Add <strong>{formatNaira(remainingForFreeDelivery)}</strong> more for <strong>FREE Delivery</strong></span>
                    <span>{Math.round((subtotal / RESTAURANT_CONFIG.delivery.freeDeliveryThreshold) * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-black rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#D4A72C] to-[#F1C75B] transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (subtotal / RESTAURANT_CONFIG.delivery.freeDeliveryThreshold) * 100)}%`
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* List of Cart Items */}
            <div className="space-y-4">
              {cart.map((item, index) => {
                const itemTotal = item.dish.price * item.quantity;
                return (
                  <div
                    key={`${item.dish.id}-${index}`}
                    className="p-4 sm:p-5 rounded-2xl bg-[#0D0D0D] border border-white/10 hover:border-[#D4A72C]/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <img
                        src={item.dish.image}
                        alt={item.dish.name}
                        className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-white/10"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <h3 className="font-serif-heading text-base sm:text-lg font-bold text-white truncate">
                          {item.dish.name}
                        </h3>
                        <span className="text-xs text-[#F1C75B] font-bold block mt-0.5 font-sans-body">
                          {formatNaira(item.dish.price)}
                        </span>
                        {item.selectedProtein && (
                          <span className="text-[11px] text-slate-400 block mt-0.5">
                            Protein: {item.selectedProtein}
                          </span>
                        )}
                        {item.spicePreference && (
                          <span className="text-[11px] text-amber-400/80 block">
                            Spice: {item.spicePreference}
                          </span>
                        )}
                        {item.specialInstructions && (
                          <span className="text-[10px] text-slate-400 italic block">
                            Note: "{item.specialInstructions}"
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-white/5">
                      {/* Quantity buttons */}
                      <div className="flex items-center gap-2 bg-black border border-white/15 rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-bold text-white text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.dish.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total */}
                      <div className="text-right">
                        <span className="font-serif-heading text-lg font-bold text-white block">
                          {formatNaira(itemTotal)}
                        </span>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removeFromCart(item.dish.id)}
                        className="text-slate-500 hover:text-rose-400 p-2 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={clearCart}
                className="text-xs font-sans-body text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear entire cart</span>
              </button>

              <span className="text-xs text-slate-400 font-sans-body">
                {totalItemsCount} dishes in your feast
              </span>
            </div>

          </div>

          {/* Order Summary Box (Right 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0D0D] border border-[#D4A72C]/40 space-y-6 shadow-2xl">
              
              <h2 className="font-serif-heading text-xl font-bold text-white border-b border-white/10 pb-4">
                Order Summary
              </h2>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-300 font-semibold block font-sans-body">
                  Discount Promo Code
                </label>
                {discountCode ? (
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-[#D4A72C]/15 border border-[#D4A72C]/40 text-xs font-sans-body">
                    <div className="flex items-center gap-2 text-[#F1C75B] font-bold">
                      <Tag className="w-4 h-4" />
                      <span>Code <strong>{discountCode}</strong> active</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-slate-400 hover:text-white underline text-xs cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Try SAVANNA10 or WELCOME20"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-xs text-white uppercase placeholder-slate-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#D4A72C] hover:bg-[#F1C75B] text-black text-xs font-bold font-sans-body transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {couponMsg && !discountCode && (
                  <p className={`text-xs ${couponMsg.error ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {couponMsg.text}
                  </p>
                )}
              </form>

              {/* Price Details */}
              <div className="space-y-3 pt-4 border-t border-white/10 text-xs font-sans-body">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">{formatNaira(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Estimated Delivery Fee</span>
                  <span className={deliveryFee === 0 ? 'text-emerald-400 font-bold' : 'text-white font-semibold'}>
                    {deliveryFee === 0 ? 'FREE' : formatNaira(deliveryFee)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount Savings</span>
                    <span>-{formatNaira(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between items-baseline pt-4 border-t border-white/15 text-white">
                  <span className="text-sm font-bold">Grand Total</span>
                  <span className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#F1C75B]">
                    {formatNaira(total)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="w-full py-4 px-6 rounded-2xl bg-[#D4A72C] hover:bg-[#F1C75B] text-[#050505] font-sans-body font-extrabold text-xs uppercase tracking-widest shadow-[0_4px_25px_rgba(212,167,44,0.35)] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-300 font-sans-body pt-1 text-center">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>You'll complete your order with Savanna Bites on WhatsApp.</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
};

