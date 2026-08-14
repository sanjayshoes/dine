import React, { useState } from 'react';
import { formatNaira, RESTAURANT_CONFIG } from '../../config/restaurant';
import { X, ShieldCheck, Lock, CreditCard, Building2, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

interface PaystackModalProps {
  isOpen: boolean;
  amount: number;
  customerName: string;
  email: string;
  reference: string;
  onClose: () => void;
  onSuccess: (response: { reference: string; status: string }) => void;
}

export const PaystackModal: React.FC<PaystackModalProps> = ({
  isOpen,
  amount,
  customerName,
  email,
  reference,
  onClose,
  onSuccess
}) => {
  const [tab, setTab] = useState<'card' | 'transfer'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('4084 0800 1234 5678');
  const [expiry, setExpiry] = useState('08/28');
  const [cvv, setCvv] = useState('888');

  if (!isOpen) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onSuccess({
        reference,
        status: 'success'
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Paystack Styled Modal */}
      <div className="relative w-full max-w-md bg-[#0F1115] border border-[#D4A72C]/40 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-10 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#050505] p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D4A72C]/20 border border-[#D4A72C]/40 flex items-center justify-center text-[#D4A72C] font-bold text-xs">
              SB
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-sans-body text-xs font-bold uppercase tracking-wider text-white">
                  Paystack Secure Gateway
                </h3>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="text-[11px] text-slate-400 font-sans-body">
                {RESTAURANT_CONFIG.name} · {email}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Amount Banner */}
        <div className="p-6 text-center bg-gradient-to-b from-[#050505] to-[#0F1115] border-b border-white/5 space-y-1">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-sans-body">
            Amount to Pay
          </span>
          <div className="font-serif-heading text-3xl font-bold text-[#F1C75B]">
            {formatNaira(amount)}
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            Ref: {reference}
          </span>
        </div>

        {/* Tabs: Card vs Bank Transfer */}
        <div className="flex border-b border-white/10 text-xs font-sans-body">
          <button
            type="button"
            onClick={() => setTab('card')}
            className={`flex-1 py-3 font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              tab === 'card'
                ? 'border-b-2 border-[#D4A72C] text-[#F1C75B] bg-white/5'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay with Card</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('transfer')}
            className={`flex-1 py-3 font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              tab === 'transfer'
                ? 'border-b-2 border-[#D4A72C] text-[#F1C75B] bg-white/5'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Bank Transfer</span>
          </button>
        </div>

        {/* Modal Form Content */}
        <div className="p-6">
          {tab === 'card' ? (
            <form onSubmit={handlePay} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold block">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white font-mono focus:outline-none"
                  />
                  <Lock className="w-4 h-4 text-emerald-400 absolute right-3 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold block">
                    Card Expiry
                  </label>
                  <input
                    type="text"
                    required
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white font-mono focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold block">
                    CVV
                  </label>
                  <input
                    type="password"
                    required
                    maxLength={3}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white font-mono focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-6 rounded-xl bg-[#D4A72C] hover:bg-[#F1C75B] text-[#050505] font-sans-body font-bold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(212,167,44,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying with Bank...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay {formatNaira(amount)}</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2 text-left text-xs font-sans-body">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Bank Name</span>
                  <span className="text-white font-bold">Wema Bank / Paystack Titan</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Account Number</span>
                  <span className="text-[#F1C75B] font-mono font-bold text-sm tracking-wider">
                    9920 847 219
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Beneficiary</span>
                  <span className="text-white">Savanna Bites / Paystack</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                Transfer exactly <strong>{formatNaira(amount)}</strong> to the account details above. It confirms automatically within 30 seconds.
              </p>

              <button
                onClick={() => {
                  setIsProcessing(true);
                  setTimeout(() => {
                    setIsProcessing(false);
                    onSuccess({ reference, status: 'success' });
                  }, 1200);
                }}
                disabled={isProcessing}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-sans-body font-bold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Confirming Bank Transfer...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>I Have Sent the Money</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Security Guarantee */}
          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-500 font-sans-body">
            <Lock className="w-3 h-3 text-slate-400" />
            <span>256-Bit SSL Encrypted & PCI-DSS Certified</span>
          </div>

        </div>

      </div>
    </div>
  );
};
