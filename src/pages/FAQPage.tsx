import React, { useState } from 'react';
import { FAQS } from '../data/menuData';
import { RESTAURANT_CONFIG } from '../config/restaurant';
import { 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  MessageCircle, 
  HelpCircle,
  Phone
} from 'lucide-react';

interface FAQPageProps {
  onNavigate: (route: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'General', label: 'General & Hours' },
    { id: 'Ordering', label: 'Ordering & Delivery' },
    { id: 'Food', label: 'Food & Spice Levels' },
    { id: 'Payment', label: 'Payment & Paystack' },
    { id: 'Reservations', label: 'Reservations' }
  ];

  const filteredFaqs = FAQS.filter((faq) => {
    if (activeCategory !== 'all' && faq.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    }
    return true;
  });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#D4A72C]/15 border border-[#D4A72C]/40 text-xs font-sans-body text-[#F1C75B] uppercase tracking-widest font-bold">
          <HelpCircle className="w-3.5 h-3.5 text-[#D4A72C]" />
          Frequently Asked Questions
        </div>

        <h1 className="font-serif-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
          Got <span className="text-[#F1C75B]">Questions?</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 font-light font-sans-body leading-relaxed">
          Find answers about our African culinary recipes, delivery zones in Lagos, table bookings, and secure payment methods.
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-xl mx-auto relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for answers (e.g. delivery fee, spice, jollof)..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#0D0D0D] border border-white/15 focus:border-[#D4A72C] text-sm text-white placeholder-slate-500 focus:outline-none"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap border-b border-white/10 pb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-sans-body font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#D4A72C] text-black font-bold shadow-md'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="py-12 text-center text-slate-400 bg-[#0D0D0D] rounded-3xl border border-white/10 p-8">
            <p>No questions matched your search query.</p>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-[#0E0E0E] border-[#D4A72C]/40 shadow-lg'
                    : 'bg-[#080808] border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-serif-heading text-base sm:text-lg font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-[#D4A72C] text-black' : 'bg-white/5 text-slate-400'
                  }`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-sm text-slate-300 font-light leading-relaxed font-sans-body border-t border-white/5">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Direct Contact Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0E0E0E] via-[#141414] to-[#0A0A0A] border border-[#D4A72C]/30 text-center space-y-4">
        <h3 className="font-serif-heading text-2xl font-bold text-white">
          Still Have Questions?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-sans-body">
          Our customer concierge team is available 7 days a week to answer specific queries or accommodate custom event requests.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello Savanna Bites, I have a question regarding your restaurant/menu.')}`}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-sans-body font-bold text-xs uppercase tracking-wider flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          <button
            onClick={() => onNavigate('/contact')}
            className="px-6 py-3 rounded-full border border-white/20 text-white font-sans-body font-semibold text-xs uppercase tracking-wider hover:bg-white/5"
          >
            Contact Page
          </button>
        </div>
      </div>

    </div>
  );
};
