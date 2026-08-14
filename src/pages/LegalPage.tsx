import React, { useState } from 'react';
import { RESTAURANT_CONFIG } from '../config/restaurant';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  initialTab?: 'privacy' | 'terms';
  onNavigate: (route: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({
  initialTab = 'privacy',
  onNavigate
}) => {
  const [tab, setTab] = useState<'privacy' | 'terms'>(initialTab);

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D4A72C] font-sans-body font-bold block">
            Savanna Bites Compliance
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-white">
            {tab === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
          </h1>
        </div>

        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-xs font-sans-body font-bold text-slate-300 hover:text-[#F1C75B] uppercase tracking-wider transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 border-b border-white/10 pb-4">
        <button
          onClick={() => setTab('privacy')}
          className={`px-5 py-2.5 rounded-full text-xs font-sans-body font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
            tab === 'privacy'
              ? 'bg-[#D4A72C] text-black font-bold shadow-md'
              : 'bg-white/5 text-slate-300 hover:bg-white/10'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Privacy Policy</span>
        </button>
        <button
          onClick={() => setTab('terms')}
          className={`px-5 py-2.5 rounded-full text-xs font-sans-body font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
            tab === 'terms'
              ? 'bg-[#D4A72C] text-black font-bold shadow-md'
              : 'bg-white/5 text-slate-300 hover:bg-white/10'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Terms of Service</span>
        </button>
      </div>

      {/* Content Container */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#0D0D0D] border border-white/10 text-slate-300 text-sm font-sans-body font-light leading-relaxed space-y-6">
        
        {tab === 'privacy' ? (
          <div className="space-y-6">
            <h2 className="font-serif-heading text-xl font-bold text-white">
              1. Information We Collect
            </h2>
            <p>
              When you interact with <strong>{RESTAURANT_CONFIG.name}</strong>—whether ordering food for doorstep delivery, booking table reservations, or subscribing to our VIP newsletter—we collect essential contact details including your full name, telephone number, email address, delivery street address in Lagos, and dietary instructions.
            </p>

            <h2 className="font-serif-heading text-xl font-bold text-white">
              2. How We Use Your Data
            </h2>
            <p>
              Your personal data is used solely to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-400">
              <li>Process and fulfill your culinary orders accurately.</li>
              <li>Coordinate food dispatch routes with our designated drivers and couriers.</li>
              <li>Send transaction invoices and WhatsApp order status updates.</li>
              <li>Verify table availability and manage dining reservations.</li>
            </ul>

            <h2 className="font-serif-heading text-xl font-bold text-white">
              3. Payment Information Security
            </h2>
            <p>
              We do not store your credit/debit card numbers or bank credentials on our servers. All digital transactions are securely routed through PCI-DSS certified gateways (such as <strong>Paystack</strong>) using end-to-end 256-bit SSL encryption.
            </p>

            <h2 className="font-serif-heading text-xl font-bold text-white">
              4. Contact Us About Your Privacy
            </h2>
            <p>
              If you have any questions regarding your data privacy, please email us at <strong className="text-[#F1C75B]">{RESTAURANT_CONFIG.email}</strong> or call <strong className="text-[#F1C75B]">{RESTAURANT_CONFIG.phone}</strong>.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="font-serif-heading text-xl font-bold text-white">
              1. Food Ordering & Delivery Terms
            </h2>
            <p>
              All orders placed on the Savanna Bites platform are prepared fresh upon order confirmation. Estimated delivery durations (typically 35–50 minutes across Victoria Island, Lekki, Ikoyi, and surrounding districts) may vary based on Lagos traffic conditions and adverse weather.
            </p>

            <h2 className="font-serif-heading text-xl font-bold text-white">
              2. Pricing & Currency
            </h2>
            <p>
              All prices displayed on this website are in <strong>Nigerian Naira (NGN / ₦)</strong> and include all applicable state consumption taxes. Delivery charges are calculated dynamically based on your chosen district in Lagos. Orders meeting or exceeding ₦35,000 qualify for complimentary delivery.
            </p>

            <h2 className="font-serif-heading text-xl font-bold text-white">
              3. Table Reservations & Cancellation
            </h2>
            <p>
              Reservations are held for a maximum of 15 minutes past your scheduled arrival time. If you expect to be delayed, please contact our concierge desk directly at {RESTAURANT_CONFIG.phone}.
            </p>

            <h2 className="font-serif-heading text-xl font-bold text-white">
              4. Quality Guarantee & Refunds
            </h2>
            <p>
              In the rare event that an order arrives damaged or incorrect, please notify our team within 30 minutes of receipt via WhatsApp with a photo, and our kitchen manager will immediately dispatch a fresh replacement or process an instant refund.
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
