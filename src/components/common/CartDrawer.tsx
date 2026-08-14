import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { formatNaira, RESTAURANT_CONFIG } from '../../config/restaurant';
import { openWhatsAppOrder } from '../../utils/whatsapp';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Sparkles, MessageCircle } from 'lucide-react';

interface CartDrawerProps {
  onNavigateToCheckout: () => void;
  onNavigateToMenu: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onNavigateToCheckout,
  onNavigateToMenu
}) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryFee,
    discount,
    discountCode,
    applyCoupon,
    removeCoupon,
    total,
    totalItemsCount,
    isCartOpen,
    setIsCartOpen
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponMessage({
      text: res.message,
      isError: !res.success
    });
  };

  const handleProceedToCheckout = () => {
    if (!cart || cart.length === 0) return;
    setIsCartOpen(false);
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
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0A0A0A] border-l border-[#D4A72C]/30 text-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-heading text-xl font-bold text-white">
                  Your Savanna Feast
                </h3>
                <span className="text-xs text-slate-400 font-sans-body">
                  {totalItemsCount} {totalItemsCount === 1 ? 'dish' : 'dishes'} selected
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Tracker Bar */}
          <div className="px-6 py-3 bg-[#D4A72C]/10 border-b border-[#D4A72C]/20 text-xs font-sans-body">
            {remainingForFreeDelivery === 0 ? (
              <div className="flex items-center gap-2 text-[#F1C75B] font-semibold">
                <Sparkles className="w-4 h-4 text-[#D4A72C]" />
                <span>Congratulations! You have unlocked FREE Delivery across Lagos.</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-slate-300 text-[11px]">
                  <span>Add <strong className="text-[#F1C75B]">{formatNaira(remainingForFreeDelivery)}</strong> more for <strong>FREE Delivery</strong></span>
                  <span>{Math.round((subtotal / RESTAURANT_CONFIG.delivery.freeDeliveryThreshold) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
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

          {/* Cart Items List */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4 custom-scrollbar">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif-heading text-lg text-white">
                    Your cart is currently empty
                  </h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Explore our authentic African grills, hearty soups, and smoky Jollof delicacies.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigateToMenu();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#D4A72C] text-[#050505] font-bold text-xs uppercase tracking-wider font-sans-body shadow-md"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              cart.map((item, index) => {
                const itemTotal = item.dish.price * item.quantity;
                return (
                  <div
                    key={`${item.dish.id}-${index}`}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4A72C]/30 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <img
                        src={item.dish.image}
                        alt={item.dish.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif-heading text-sm font-bold text-white truncate">
                          {item.dish.name}
                        </h4>
                        <span className="text-xs text-[#F1C75B] font-bold block mt-0.5">
                          {formatNaira(item.dish.price)}
                        </span>
                        {item.selectedProtein && (
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            Protein: {item.selectedProtein}
                          </span>
                        )}
                        {item.spicePreference && (
                          <span className="text-[10px] text-amber-400/80 block">
                            Spice: {item.spicePreference}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.dish.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                        title="Remove dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity Selector & Item Subtotal */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                      <div className="flex items-center gap-2 bg-black/60 border border-white/10 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
                          className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.dish.id, item.quantity + 1)}
                          className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif-heading text-sm font-bold text-white">
                        {formatNaira(itemTotal)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-6 bg-black/80 border-t border-[#D4A72C]/30 space-y-4">
              
              {/* Coupon Code Input */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                {discountCode ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#D4A72C]/15 border border-[#D4A72C]/40 text-xs">
                    <div className="flex items-center gap-2 text-[#F1C75B] font-semibold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code <strong>{discountCode}</strong> applied (-{formatNaira(discount)})</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs text-slate-400 hover:text-white underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="Promo code (e.g. SAVANNA10)"
                      className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4A72C] text-xs text-white uppercase placeholder-slate-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-[#D4A72C] hover:text-black text-xs font-bold font-sans-body transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {couponMessage && !discountCode && (
                  <p className={`text-[11px] ${couponMessage.isError ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {couponMessage.text}
                  </p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs font-sans-body border-t border-white/10 pt-3">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white">{formatNaira(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Delivery Fee</span>
                  <span className={deliveryFee === 0 ? 'text-emerald-400 font-bold' : 'text-white'}>
                    {deliveryFee === 0 ? 'FREE' : formatNaira(deliveryFee)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-{formatNaira(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-white/10 text-white">
                  <span>Grand Total</span>
                  <span className="font-serif-heading text-lg text-[#F1C75B]">
                    {formatNaira(total)}
                  </span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#D4A72C] hover:bg-[#F1C75B] text-[#050505] font-sans-body font-bold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(212,167,44,0.35)] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-300 font-sans-body text-center">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>You'll complete your order on WhatsApp.</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onNavigateToMenu();
                }}
                className="w-full text-center text-xs text-slate-400 hover:text-[#F1C75B] transition-colors py-1 block"
              >
                Continue Browsing Menu
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
