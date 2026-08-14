import React from 'react';
import { Order } from '../types';
import { formatNaira, RESTAURANT_CONFIG } from '../config/restaurant';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  ShoppingBag, 
  MessageCircle, 
  ArrowRight, 
  Sparkles, 
  ChefHat, 
  Truck, 
  PackageCheck
} from 'lucide-react';

interface OrderSuccessPageProps {
  order: Order | null;
  onNavigate: (route: string) => void;
}

export const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({
  order,
  onNavigate
}) => {
  if (!order) {
    return (
      <div className="pt-32 pb-20 max-w-2xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-serif-heading text-2xl font-bold text-white">
          No Recent Order Found
        </h2>
        <p className="text-xs text-slate-400 font-sans-body">
          You haven't placed an order yet in this session. Explore our culinary menu to place an order.
        </p>
        <button
          onClick={() => onNavigate('/menu')}
          className="px-6 py-3 rounded-full bg-[#D4A72C] text-black font-bold text-xs uppercase tracking-wider"
        >
          Explore Food Menu
        </button>
      </div>
    );
  }

  const steps = [
    { title: 'Order Received', icon: CheckCircle2, desc: 'Logged & queued', active: true },
    { title: 'In the Kitchen', icon: ChefHat, desc: 'Flame grilling & packing', active: true },
    { title: 'Out for Delivery', icon: Truck, desc: 'Courier on dispatch', active: false },
    { title: 'Delivered', icon: PackageCheck, desc: 'Feast at your door', active: false },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Top Banner Celebration */}
      <div className="text-center space-y-4 pt-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-in zoom-in duration-500">
          <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-sans-body uppercase tracking-widest text-[#D4A72C] font-bold block">
            Thank You For Ordering
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Your Feast Is Being <span className="text-[#F1C75B]">Prepared</span>
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 font-light max-w-lg mx-auto font-sans-body">
          Order Reference: <strong className="text-[#F1C75B] font-mono text-base">{order.orderNumber}</strong>. We're seasoning your dishes to perfection.
        </p>
      </div>

      {/* Progress Timeline Stepper */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0D0D] border border-[#D4A72C]/30 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#D4A72C]" />
            <span className="text-xs font-sans-body uppercase tracking-wider text-slate-300 font-semibold">
              Estimated Arrival:
            </span>
          </div>
          <span className="font-serif-heading text-lg font-bold text-[#F1C75B]">
            {order.estimatedDelivery || '35 - 50 minutes'}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border text-center space-y-2 ${
                  step.active
                    ? 'bg-[#D4A72C]/10 border-[#D4A72C]/50 text-white'
                    : 'bg-white/5 border-white/5 text-slate-500'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${
                  step.active ? 'bg-[#D4A72C] text-black' : 'bg-white/10 text-slate-500'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-sans-body font-bold block">{step.title}</h4>
                <p className="text-[10px] text-slate-400 font-sans-body">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order & Delivery Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Customer & Location */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0D0D] border border-white/10 space-y-4">
          <h3 className="font-serif-heading text-lg font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#D4A72C]" />
            <span>Delivery Destination</span>
          </h3>

          <div className="space-y-2 text-xs font-sans-body text-slate-300">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Recipient</span>
              <span className="text-white font-semibold">{order.customer.name}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Phone Number</span>
              <span className="text-white font-semibold">{order.customer.phone}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Delivery Address</span>
              <span className="text-white">{order.customer.address}, {order.customer.city}</span>
            </div>
            {order.customer.landmark && (
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Landmark</span>
                <span className="text-slate-300">{order.customer.landmark}</span>
              </div>
            )}
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Payment Method</span>
              <span className="text-[#F1C75B] uppercase font-bold">
                {order.paymentMethod === 'paystack' ? 'Paystack (Paid Online)' : 'WhatsApp Order Concierge'}
              </span>
            </div>
          </div>
        </div>

        {/* Itemized Order Breakdown */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0D0D] border border-white/10 space-y-4">
          <h3 className="font-serif-heading text-lg font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#D4A72C]" />
            <span>Dishes Ordered</span>
          </h3>

          <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs font-sans-body border-b border-white/5 pb-2">
                <div>
                  <span className="text-white font-semibold block">
                    {item.dish.name} <strong className="text-[#D4A72C]">×{item.quantity}</strong>
                  </span>
                  {item.selectedProtein && (
                    <span className="text-[10px] text-slate-400 block">{item.selectedProtein}</span>
                  )}
                </div>
                <span className="text-white font-bold">
                  {formatNaira(item.dish.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs font-sans-body">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="text-white">{formatNaira(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Delivery Fee</span>
              <span className="text-white">{order.deliveryFee === 0 ? 'FREE' : formatNaira(order.deliveryFee)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Savings Discount</span>
                <span>-{formatNaira(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between items-baseline pt-2 border-t border-white/10 text-white font-bold">
              <span>Total Paid</span>
              <span className="font-serif-heading text-xl text-[#F1C75B]">{formatNaira(order.total)}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Direct WhatsApp Concierge Help Button */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <a
          href={`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Hello Savanna Bites, I would like to check on my Order #${order.orderNumber}.`)}`}
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-sans-body font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat with Kitchen via WhatsApp</span>
        </a>

        <button
          onClick={() => onNavigate('/menu')}
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-sans-body font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Order More Dishes</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
