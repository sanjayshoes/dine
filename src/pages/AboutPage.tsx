import React from 'react';
import { RESTAURANT_CONFIG } from '../config/restaurant';
import { 
  Sparkles, 
  Flame, 
  Award, 
  Leaf, 
  HeartHandshake, 
  Check, 
  ArrowRight, 
  Calendar, 
  UtensilsCrossed 
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      
      {/* 1. Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#D4A72C]/15 border border-[#D4A72C]/40 text-xs font-sans-body text-[#F1C75B] uppercase tracking-widest font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#D4A72C]" />
          Our Story & Culinary Soul
        </div>

        <h1 className="font-serif-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
          Taste the <span className="text-[#F1C75B]">Heart of Africa</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 font-light font-sans-body leading-relaxed">
          Savanna Bites was founded on a simple yet profound belief: that authentic African cuisine is among the richest, most evocative culinary traditions in the world and deserves to be presented with uncompromising craftsmanship and contemporary luxury.
        </p>
      </div>

      {/* 2. Visual Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-sans-body uppercase tracking-widest text-[#D4A72C] font-semibold">
            <div className="w-8 h-px bg-[#D4A72C]" />
            <span>The Savanna Philosophy</span>
          </div>

          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-white leading-tight">
            Rooted in Soil, Honored in Fire, Served with Elegance
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-slate-300 font-light leading-relaxed font-sans-body">
            <p>
              In traditional African communities, food is the bedrock of celebration, storytelling, and communion. From Sunday family stews to harvest feasts and vibrant street-side night grills, meals carry memory and emotion.
            </p>
            <p>
              At Savanna Bites, we treat these traditions with reverence. We never cut corners with artificial flavor enhancers or rushed methods. Our party Jollof is infused with real wood smoke; our Suya is crusted in handcrafted Yaji made with toasted peanut butter cookies and indigenous spices; our Egusi and Fisherman Soups simmer for hours over low heat until rich, velvet, and deep.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="font-serif-heading text-2xl font-bold text-[#F1C75B] block">100%</span>
              <span className="text-xs text-slate-400">Authentic Indigenous Spices</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="font-serif-heading text-2xl font-bold text-[#F1C75B] block">Daily Fresh</span>
              <span className="text-xs text-slate-400">Locally Sourced Farm Produce</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden border border-[#D4A72C]/40 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
              alt="Savanna Bites Interior and Atmosphere"
              className="w-full h-[450px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10">
              <span className="text-[#F1C75B] font-serif-heading text-base font-bold block">
                Warm African Hospitality
              </span>
              <span className="text-xs text-slate-300 font-sans-body">
                An inviting ambiance illuminated by warm amber hues and contemporary African patterns.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. The 3 Kitchen Virtues */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-white">
            Our Kitchen <span className="text-[#F1C75B]">Pillars</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans-body">
            How we protect the purity of African flavor in every plate we serve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-[#0D0D0D] border border-[#D4A72C]/20 space-y-4 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C]">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-serif-heading text-xl font-bold text-white">
              Fire & Smoke Mastery
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light font-sans-body">
              True African flavor is born from the hearth. We utilize natural acacia firewood and red charcoal ember grilling to capture unmistakable earthy aromatics.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#0D0D0D] border border-[#D4A72C]/20 space-y-4 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C]">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif-heading text-xl font-bold text-white">
              Ethical Local Sourcing
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light font-sans-body">
              We partner directly with family farms in Oyo, Ogun, and coastal fishermen in Epe to bring unadulterated, pesticide-free indigenous ingredients straight to our prep stations.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#0D0D0D] border border-[#D4A72C]/20 space-y-4 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C]">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif-heading text-xl font-bold text-white">
              Unrivaled Hospitality
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light font-sans-body">
              Every guest is family. Whether visiting for an anniversary dinner or receiving a hot lunch at the office, you receive royalty-grade African service.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Experience CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#0F0F0F] border border-[#D4A72C]/40 text-center space-y-6">
        <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-white">
          Come Savor the Journey With Us
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-sans-body">
          We invite you to taste the heart of Africa today. Order online for swift delivery or reserve your table in our dining room.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('/menu')}
            className="px-8 py-3.5 rounded-full bg-[#D4A72C] hover:bg-[#F1C75B] text-black font-sans-body font-bold text-xs uppercase tracking-wider transition-all"
          >
            Order Food Online
          </button>
          <button
            onClick={() => onNavigate('/reservation')}
            className="px-8 py-3.5 rounded-full border border-[#D4A72C] text-[#F1C75B] hover:bg-white/5 font-sans-body font-bold text-xs uppercase tracking-wider transition-all"
          >
            Book Table Reservation
          </button>
        </div>
      </div>

    </div>
  );
};
