import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useOrderHistory } from '../context/OrderHistoryContext';
import { RESTAURANT_CONFIG, formatNaira } from '../config/restaurant';
import { openWhatsAppOrder } from '../utils/whatsapp';
import { PaystackModal } from '../components/common/PaystackModal';
import { Order } from '../types';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  CreditCard, 
  MessageCircle, 
  Lock, 
  ArrowLeft, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';

interface CheckoutPageProps {
  onNavigate: (route: string) => void;
  onOrderCompleted: (order: Order) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  onNavigate,
  onOrderCompleted
}) => {
  const {
    cart,
    subtotal,
    deliveryFee,
    discount,
    discountCode,
    total,
    clearCart
  } = useCart();
  const { saveOrder } = useOrderHistory();

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Victoria Island');
  const [landmark, setLandmark] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'whatsapp'>('paystack');

  // Paystack Modal State
  const [isPaystackOpen, setIsPaystackOpen] = useState(false);
  const [activeReference, setActiveReference] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="pt-28 pb-20 max-w-2xl mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif-heading text-2xl font-bold text-white">
          No items to checkout
        </h2>
        <p className="text-xs text-slate-400 font-sans-body">
          Please add some delicious dishes to your cart before proceeding to checkout.
        </p>
        <button
          onClick={() => onNavigate('/menu')}
          className="px-6 py-3 rounded-full bg-[#D4A72C] text-black font-bold text-xs uppercase tracking-wider"
        >
          Browse Culinary Menu
        </button>
      </div>
    );
  }

  const generateOrderReference = () => {
    return `SB-${Math.floor(100000 + Math.random() * 900000)}`;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    const orderRef = generateOrderReference();
    setActiveReference(orderRef);

    if (paymentMethod === 'paystack') {
      setIsPaystackOpen(true);
    } else {
      // WhatsApp Order Flow
      const newOrder: Order = {
        id: orderRef,
        orderNumber: orderRef,
        createdAt: new Date().toISOString(),
        items: [...cart],
        customer: {
          name,
          phone,
          email: email || 'N/A',
          address,
          city,
          landmark,
          notes
        },
        subtotal,
        deliveryFee,
        discount,
        discountCode,
        total,
        paymentMethod: 'whatsapp',
        paymentStatus: 'pending',
        status: 'received',
        estimatedDelivery: '35 - 50 mins'
      };

      // Open structured WhatsApp window
      openWhatsAppOrder({
        orderNumber: orderRef,
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        deliveryAddress: address,
        city,
        items: cart,
        subtotal,
        deliveryFee,
        discount,
        total,
        notes
      });

      saveOrder(newOrder);
      clearCart();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      onOrderCompleted(newOrder);
    }
  };

  const handlePaystackSuccess = (response: { reference: string; status: string }) => {
    setIsPaystackOpen(false);

    const newOrder: Order = {
      id: response.reference || activeReference,
      orderNumber: response.reference || activeReference,
      createdAt: new Date().toISOString(),
      items: [...cart],
      customer: {
        name,
        phone,
        email: email || 'customer@savannabites.com',
        address,
        city,
        landmark,
        notes
      },
      subtotal,
      deliveryFee,
      discount,
      discountCode,
      total,
      paymentMethod: 'paystack',
      paymentStatus: 'paid',
      status: 'received',
      estimatedDelivery: '35 - 50 mins'
    };

    saveOrder(newOrder);
    clearCart();

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 }
    });

    onOrderCompleted(newOrder);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D4A72C] font-sans-body font-bold block">
            Final Step
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Delivery & <span className="text-[#F1C75B]">Checkout</span>
          </h1>
        </div>

        <button
          onClick={() => onNavigate('/cart')}
          className="inline-flex items-center gap-2 text-xs font-sans-body font-bold text-slate-300 hover:text-[#F1C75B] uppercase tracking-wider transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </button>
      </div>

      <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        
        {/* Left Column: Customer and Delivery Details */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Section 1: Contact Details */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0D0D] border border-white/10 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-8 h-8 rounded-full bg-[#D4A72C]/20 border border-[#D4A72C]/40 flex items-center justify-center text-[#D4A72C] text-xs font-bold font-sans-body">
                1
              </div>
              <h2 className="font-serif-heading text-lg sm:text-xl font-bold text-white">
                Customer Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-sans-body font-semibold uppercase tracking-wider text-slate-300 block">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Chief Adeola Balogun"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans-body font-semibold uppercase tracking-wider text-slate-300 block">
                  Phone Number (Active for Call / WhatsApp) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0803 123 4567"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans-body font-semibold uppercase tracking-wider text-slate-300 block">
                  Email Address (For receipt & updates)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="adeola@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address in Lagos */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0D0D] border border-white/10 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-8 h-8 rounded-full bg-[#D4A72C]/20 border border-[#D4A72C]/40 flex items-center justify-center text-[#D4A72C] text-xs font-bold font-sans-body">
                2
              </div>
              <h2 className="font-serif-heading text-lg sm:text-xl font-bold text-white">
                Delivery Location
              </h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-sans-body font-semibold uppercase tracking-wider text-slate-300 block">
                  Delivery Area / District in Lagos *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white focus:outline-none cursor-pointer"
                >
                  {RESTAURANT_CONFIG.delivery.coverageAreas.map((area) => (
                    <option key={area} value={area} className="bg-black text-white">
                      {area} (Standard Delivery)
                    </option>
                  ))}
                  <option value="Other Lagos Location" className="bg-black text-white">
                    Other Lagos Location (Custom Courier)
                  </option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans-body font-semibold uppercase tracking-wider text-slate-300 block">
                  Street Address & House / Flat Number *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 14 Admirals Way, Block B, Flat 3"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-sans-body font-semibold uppercase tracking-wider text-slate-300 block">
                    Nearest Landmark / Gate
                  </label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="e.g. Opposite Ebeano Supermarket"
                    className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-sans-body font-semibold uppercase tracking-wider text-slate-300 block">
                    Special Delivery Instructions
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Ring bell, call when at the gate"
                    className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Select Payment Method */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0D0D] border border-white/10 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-8 h-8 rounded-full bg-[#D4A72C]/20 border border-[#D4A72C]/40 flex items-center justify-center text-[#D4A72C] text-xs font-bold font-sans-body">
                3
              </div>
              <h2 className="font-serif-heading text-lg sm:text-xl font-bold text-white">
                Payment Channel
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Option 1: Paystack */}
              <div
                onClick={() => setPaymentMethod('paystack')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-2 flex flex-col justify-between ${
                  paymentMethod === 'paystack'
                    ? 'bg-[#D4A72C]/15 border-[#D4A72C] shadow-lg'
                    : 'bg-white/5 border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <CreditCard className="w-4 h-4 text-[#D4A72C]" />
                    <span>Paystack Online</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    paymentMethod === 'paystack' ? 'border-[#D4A72C] bg-[#D4A72C]' : 'border-slate-500'
                  }`}>
                    {paymentMethod === 'paystack' && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-light font-sans-body">
                  Instant secure payment via Debit Cards (Mastercard, Visa, Verve), Bank Transfer, or USSD.
                </p>

                <div className="flex items-center gap-2 text-[10px] text-[#F1C75B] font-semibold pt-1">
                  <Lock className="w-3 h-3" />
                  <span>Instant Order Confirmation</span>
                </div>
              </div>

              {/* Option 2: WhatsApp Ordering */}
              <div
                onClick={() => setPaymentMethod('whatsapp')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-2 flex flex-col justify-between ${
                  paymentMethod === 'whatsapp'
                    ? 'bg-emerald-500/15 border-emerald-500 shadow-lg'
                    : 'bg-white/5 border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Order</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    paymentMethod === 'whatsapp' ? 'border-emerald-500 bg-emerald-500' : 'border-slate-500'
                  }`}>
                    {paymentMethod === 'whatsapp' && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-light font-sans-body">
                  Sends formatted order breakdown to Savanna Bites official WhatsApp concierge for fast direct confirmation.
                </p>

                <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-semibold pt-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Personal Concierge Service</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Order Review Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0D0D] border border-[#D4A72C]/40 space-y-6 shadow-2xl sticky top-28">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-serif-heading text-xl font-bold text-white">
                Order Items ({cart.length})
              </h2>
              <span className="text-xs text-[#F1C75B] font-bold">
                {RESTAURANT_CONFIG.delivery.estimatedMinutes}
              </span>
            </div>

            {/* List of Dishes */}
            <div className="max-h-60 overflow-y-auto space-y-3 custom-scrollbar pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs font-sans-body border-b border-white/5 pb-2">
                  <div className="min-w-0 pr-2">
                    <span className="text-white font-semibold block truncate">
                      {item.dish.name} <strong className="text-[#D4A72C]">×{item.quantity}</strong>
                    </span>
                    {item.selectedProtein && (
                      <span className="text-[10px] text-slate-400 block">
                        {item.selectedProtein}
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-white shrink-0">
                    {formatNaira(item.dish.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="space-y-2.5 text-xs font-sans-body border-t border-white/10 pt-4">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span className="text-white">{formatNaira(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Delivery Charge ({city})</span>
                <span className={deliveryFee === 0 ? 'text-emerald-400 font-bold' : 'text-white'}>
                  {deliveryFee === 0 ? 'FREE' : formatNaira(deliveryFee)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Discount Promo ({discountCode})</span>
                  <span>-{formatNaira(discount)}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-4 border-t border-white/15 text-white font-bold">
                <span className="text-sm">Grand Total Amount</span>
                <span className="font-serif-heading text-2xl sm:text-3xl text-[#F1C75B]">
                  {formatNaira(total)}
                </span>
              </div>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              className={`w-full py-4 px-6 rounded-2xl font-sans-body font-extrabold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                paymentMethod === 'paystack'
                  ? 'bg-[#D4A72C] hover:bg-[#F1C75B] text-[#050505] shadow-[0_4px_30px_rgba(212,167,44,0.4)]'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-[#050505] shadow-[0_4px_30px_rgba(16,185,129,0.35)]'
              }`}
            >
              {paymentMethod === 'paystack' ? (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay {formatNaira(total)} via Paystack</span>
                </>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4" />
                  <span>Complete Order via WhatsApp</span>
                </>
              )}
            </button>

            <div className="text-center text-[10px] text-slate-500 font-sans-body flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official Savanna Bites Food Delivery Guarantee</span>
            </div>

          </div>
        </div>

      </form>

      {/* Paystack Test/Live Modal */}
      <PaystackModal
        isOpen={isPaystackOpen}
        amount={total}
        customerName={name}
        email={email || 'customer@savannabites.com'}
        reference={activeReference}
        onClose={() => setIsPaystackOpen(false)}
        onSuccess={handlePaystackSuccess}
      />

    </div>
  );
};
