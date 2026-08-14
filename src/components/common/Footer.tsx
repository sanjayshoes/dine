import React, { useState } from 'react';
import { RESTAURANT_CONFIG } from '../../config/restaurant';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  Send, 
  Check, 
  Sparkles,
  Heart,
  MessageCircle
} from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const handleNavClick = (route: string) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#040404] text-white border-t border-[#D4A72C]/20 overflow-hidden">
      
      {/* Decorative Savanna Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#D4A72C] to-transparent opacity-50" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#D4A72C]/5 blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Col (2 cols span on large) */}
          <div className="lg:col-span-2 space-y-6">
            <div
              onClick={() => handleNavClick('/')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#D4A72C] p-0.5 bg-black shadow-[0_0_15px_rgba(212,167,44,0.3)]">
                <img
                  src={RESTAURANT_CONFIG.logoUrl}
                  alt={RESTAURANT_CONFIG.name}
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-serif-heading text-2xl font-extrabold tracking-wider text-white group-hover:text-[#F1C75B] transition-colors leading-none flex items-center gap-1.5">
                  SAVANNA <span className="font-script text-[#D4A72C] text-3xl font-normal lowercase tracking-normal">bites</span>
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#D4A72C] uppercase font-sans-body font-semibold block mt-0.5">
                  Taste the Heart of Africa
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-sm">
              Savanna Bites is a modern African culinary destination celebrating the richness, vibrant heritage, and irresistible depth of authentic African food culture through elegant contemporary dining and swift doorstep delivery.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={RESTAURANT_CONFIG.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#D4A72C] hover:bg-[#D4A72C]/10 text-slate-300 hover:text-[#F1C75B] flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_CONFIG.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#D4A72C] hover:bg-[#D4A72C]/10 text-slate-300 hover:text-[#F1C75B] flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_CONFIG.socialLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-emerald-500 hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-400 flex items-center justify-center transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-4">
            <h4 className="font-serif-heading text-base font-bold text-[#F1C75B] tracking-wide">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs font-sans-body text-slate-300">
              <li>
                <button
                  onClick={() => handleNavClick('/')}
                  className="hover:text-[#F1C75B] transition-colors"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/menu')}
                  className="hover:text-[#F1C75B] transition-colors"
                >
                  Culinary Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/about')}
                  className="hover:text-[#F1C75B] transition-colors"
                >
                  Our Story & Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/gallery')}
                  className="hover:text-[#F1C75B] transition-colors"
                >
                  Photo Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/reservation')}
                  className="hover:text-[#F1C75B] transition-colors"
                >
                  Table Reservations
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/faq')}
                  className="hover:text-[#F1C75B] transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Legal */}
          <div className="space-y-4">
            <h4 className="font-serif-heading text-base font-bold text-[#F1C75B] tracking-wide">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs font-sans-body text-slate-300">
              <li>
                <button
                  onClick={() => handleNavClick('/cart')}
                  className="hover:text-[#F1C75B] transition-colors"
                >
                  View Food Cart
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/checkout')}
                  className="hover:text-[#F1C75B] transition-colors"
                >
                  Checkout & Payment
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/favorites')}
                  className="hover:text-[#F1C75B] transition-colors"
                >
                  Favorite Dishes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/contact')}
                  className="hover:text-[#F1C75B] transition-colors"
                >
                  Concierge & Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/privacy')}
                  className="hover:text-[#F1C75B] transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/terms')}
                  className="hover:text-[#F1C75B] transition-colors"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup & Contact Summary */}
          <div className="space-y-4">
            <h4 className="font-serif-heading text-base font-bold text-[#F1C75B] tracking-wide">
              Stay in the Savanna
            </h4>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Subscribe for secret chef specials, weekend tasting invitations, and exclusive dining discounts.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#D4A72C] text-xs text-white placeholder-slate-500 focus:outline-none pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 rounded-lg bg-[#D4A72C] hover:bg-[#F1C75B] text-black transition-colors flex items-center justify-center cursor-pointer"
                  aria-label="Subscribe to newsletter"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 font-sans-body">
                  Welcome to the Savanna Circle!
                </p>
              )}
            </form>

            {/* Direct Contact Snapshot */}
            <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-slate-300 font-sans-body">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4A72C] shrink-0 mt-0.5" />
                <span>{RESTAURANT_CONFIG.address}, {RESTAURANT_CONFIG.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#D4A72C] shrink-0" />
                <span>{RESTAURANT_CONFIG.openingHours.diningHours}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Copyright & Tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-sans-body">
          <div className="flex items-center gap-2">
            <span>© 2026 {RESTAURANT_CONFIG.name}. All rights reserved.</span>
            <span className="text-slate-600">·</span>
            <span className="text-[#D4A72C]">Taste the Heart of Africa</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => handleNavClick('/privacy')} className="hover:text-white transition-colors">
              Privacy
            </button>
            <button onClick={() => handleNavClick('/terms')} className="hover:text-white transition-colors">
              Terms
            </button>
            <button onClick={() => handleNavClick('/contact')} className="hover:text-white transition-colors">
              Support
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
