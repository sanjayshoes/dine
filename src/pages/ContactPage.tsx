import React, { useState } from 'react';
import { RESTAURANT_CONFIG } from '../config/restaurant';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Sparkles,
  Instagram,
  Facebook
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (route: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiries');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#D4A72C]/15 border border-[#D4A72C]/40 text-xs font-sans-body text-[#F1C75B] uppercase tracking-widest font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#D4A72C]" />
          Concierge & Guest Support
        </div>

        <h1 className="font-serif-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
          Contact <span className="text-[#F1C75B]">Savanna Bites</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 font-light font-sans-body leading-relaxed">
          Have a question about our menu, need custom event catering, or want to speak with our restaurant manager? We are at your service.
        </p>
      </div>

      {/* Grid: Contact Info Cards + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        
        {/* Left Column: Quick Contacts & Location (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0D0D] border border-white/10 space-y-6">
            <h3 className="font-serif-heading text-xl font-bold text-white border-b border-white/10 pb-4">
              Direct Channels
            </h3>

            <div className="space-y-5 text-xs font-sans-body">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Direct Phone Line</span>
                  <a href={`tel:${RESTAURANT_CONFIG.phone}`} className="text-white font-bold text-sm hover:text-[#F1C75B] transition-colors">
                    {RESTAURANT_CONFIG.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">WhatsApp Concierge</span>
                  <a
                    href={`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 font-bold text-sm hover:underline"
                  >
                    Chat with Savanna Bites
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Email Inquiries</span>
                  <a href={`mailto:${RESTAURANT_CONFIG.email}`} className="text-white font-semibold hover:text-[#F1C75B] transition-colors">
                    {RESTAURANT_CONFIG.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Restaurant Address</span>
                  <span className="text-white">
                    {RESTAURANT_CONFIG.address}, {RESTAURANT_CONFIG.city}, {RESTAURANT_CONFIG.country}
                  </span>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Service Hours</span>
                  <span className="text-white block">{RESTAURANT_CONFIG.openingHours.diningHours}</span>
                  <span className="text-slate-400 text-[10px]">{RESTAURANT_CONFIG.openingHours.deliveryHours}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Social Links */}
          <div className="p-6 rounded-3xl bg-[#0D0D0D] border border-white/10 flex items-center justify-between">
            <span className="font-serif-heading text-sm font-bold text-white">
              Connect on Social
            </span>
            <div className="flex items-center gap-3">
              <a
                href={RESTAURANT_CONFIG.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-[#D4A72C] text-slate-300 hover:text-[#F1C75B] flex items-center justify-center transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_CONFIG.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-[#D4A72C] text-slate-300 hover:text-[#F1C75B] flex items-center justify-center transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Contact Message Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-[#0D0D0D] border border-white/10 space-y-6">
          
          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif-heading text-2xl font-bold text-white">
                Message Received!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-sans-body">
                Thank you for reaching out, {name}. Our guest relations team will review your note and respond within 2-4 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="px-6 py-2.5 rounded-full bg-[#D4A72C] text-black font-bold text-xs uppercase tracking-wider"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif-heading text-xl font-bold text-white border-b border-white/10 pb-4">
                Send Us a Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-sans-body font-semibold uppercase tracking-wider text-slate-300 block">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Chief Adeola"
                    className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-sans-body font-semibold uppercase tracking-wider text-slate-300 block">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="adeola@example.com"
                    className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-sans-body font-semibold uppercase tracking-wider text-slate-300 block">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0803 123 4567"
                    className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-sans-body font-semibold uppercase tracking-wider text-slate-300 block">
                    Subject Topic
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white focus:outline-none cursor-pointer"
                  >
                    <option value="General Inquiries" className="bg-black text-white">General Inquiries</option>
                    <option value="Event Catering & Private Chef" className="bg-black text-white">Event Catering & Private Chef</option>
                    <option value="Corporate Orders" className="bg-black text-white">Corporate Food Orders</option>
                    <option value="Feedback / Compliments" className="bg-black text-white">Dining Feedback</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans-body font-semibold uppercase tracking-wider text-slate-300 block">
                  How can we assist you? *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your inquiry, event date, dietary requirements, or feedback..."
                  className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-8 rounded-full bg-[#D4A72C] hover:bg-[#F1C75B] text-black font-sans-body font-extrabold text-xs uppercase tracking-widest shadow-[0_4px_25px_rgba(212,167,44,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Note to Concierge</span>
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
