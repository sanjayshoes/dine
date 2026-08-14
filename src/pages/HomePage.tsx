import React from 'react';
import { DISHES, CATEGORIES, GALLERY_ITEMS, TESTIMONIALS } from '../data/menuData';
import { RESTAURANT_CONFIG, formatNaira } from '../config/restaurant';
import { Dish, DishCategory } from '../types';
import { DishCard } from '../components/common/DishCard';
import { 
  Sparkles, 
  Flame, 
  ArrowRight, 
  UtensilsCrossed, 
  Calendar, 
  Award, 
  ShieldCheck, 
  HeartHandshake, 
  Leaf, 
  Star, 
  ChevronDown,
  ShoppingBag,
  Clock
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: string) => void;
  onSelectCategory: (categoryId: DishCategory) => void;
  onOpenDishDetails: (dish: Dish) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectCategory,
  onOpenDishDetails
}) => {
  const featuredDishes = DISHES.filter((d) => d.featured).slice(0, 8);
  const signatureDish = DISHES.find((d) => d.isSignature) || DISHES[0];

  return (
    <div className="space-y-24 sm:space-y-32 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-20">
        
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85"
            alt="Savanna Bites Charcoal Grill Masterpiece"
            className="w-full h-full object-cover scale-105 animate-in fade-in zoom-in-105 duration-1000"
            referrerPolicy="no-referrer"
          />
          {/* Radial and Linear Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-[#050505]/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.4)_0%,#050505_90%)]" />
        </div>

        {/* Ambient Gold Halo */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4A72C]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-[#D4A72C]/40 backdrop-blur-md text-xs sm:text-sm font-sans-body text-[#F1C75B] shadow-lg animate-in fade-in slide-in-from-top-4 duration-700">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A72C]" />
            <span className="tracking-widest uppercase font-semibold">
              Modern African Culinary Elegance
            </span>
          </div>

          {/* Hero Typography */}
          <div className="space-y-4">
            <h1 className="font-serif-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.08] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              SAVANNA <span className="font-script text-[#D4A72C] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal lowercase tracking-normal -ml-2">bites</span>
            </h1>

            <p className="font-serif-cormorant italic text-2xl sm:text-3xl md:text-4xl text-[#F1C75B] tracking-wide font-normal max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
              "Taste the Heart of Africa"
            </p>

            <p className="text-sm sm:text-base md:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed font-sans-body animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
              Authentic flavors, beautifully prepared and served with a modern African touch. Savor our signature firewood smoky Jollof, prime flame-charred Suya, and indigenous delicacy bowls.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-400">
            <button
              onClick={() => onNavigate('/menu')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#D4A72C] hover:bg-[#F1C75B] text-[#050505] font-sans-body font-extrabold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_4px_30px_rgba(212,167,44,0.4)] hover:shadow-[0_4px_45px_rgba(241,199,91,0.6)] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Order Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('/menu')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-black/60 hover:bg-[#D4A72C]/15 border border-[#D4A72C]/60 text-white hover:text-[#F1C75B] font-sans-body font-bold text-xs sm:text-sm uppercase tracking-widest backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Menu</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-white/10 text-center font-sans-body text-xs text-slate-300">
            <div className="p-2">
              <span className="block font-serif-heading text-xl sm:text-2xl font-bold text-[#F1C75B]">
                100%
              </span>
              <span className="text-[11px] text-slate-400">Authentic Recipes</span>
            </div>
            <div className="p-2">
              <span className="block font-serif-heading text-xl sm:text-2xl font-bold text-[#F1C75B]">
                35-50m
              </span>
              <span className="text-[11px] text-slate-400">Doorstep Delivery</span>
            </div>
            <div className="p-2">
              <span className="block font-serif-heading text-xl sm:text-2xl font-bold text-[#F1C75B]">
                4.9 ★
              </span>
              <span className="text-[11px] text-slate-400">Guest Rating</span>
            </div>
            <div className="p-2">
              <span className="block font-serif-heading text-xl sm:text-2xl font-bold text-[#F1C75B]">
                Open Daily
              </span>
              <span className="text-[11px] text-slate-400">11:00 AM – 11:00 PM</span>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 text-xs font-sans-body animate-bounce pointer-events-none">
          <span className="text-[10px] uppercase tracking-widest">Scroll to Explore</span>
          <ChevronDown className="w-4 h-4 text-[#D4A72C]" />
        </div>

      </section>


      {/* 2. BRAND INTRODUCTION (A Taste Worth Remembering) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-sans-body uppercase tracking-widest text-[#D4A72C] font-semibold">
              <div className="w-8 h-px bg-[#D4A72C]" />
              <span>Our Culinary Heritage</span>
            </div>

            <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              A Taste Worth <span className="text-[#F1C75B]">Remembering</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-slate-300 font-light leading-relaxed font-sans-body">
              <p>
                At <strong>Savanna Bites</strong>, dining is not simply a meal; it is an immersive tribute to the vibrant soul, warmth, and astonishing biodiversity of African gastronomy. We honor age-old culinary techniques passed down through generations—from wood-fired reductions and open acacia coal smoking to fragrant heirloom spice pestle grinding.
              </p>
              <p>
                Our master chefs blend these deep-rooted heritage traditions with contemporary culinary presentation, serving dishes that evoke the nostalgia of celebratory home-cooked feasts while commanding the elegance of modern fine dining.
              </p>
              <p>
                Whether you join us under the golden chandeliers of our dining hall or enjoy our carefully packaged meals delivered piping hot to your doorstep, every single bite is seasoned with passion, pride, and authentic hospitality.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('/about')}
                className="px-6 py-3 rounded-full bg-[#D4A72C] hover:bg-[#F1C75B] text-[#050505] font-sans-body font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 group cursor-pointer"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('/reservation')}
                className="px-6 py-3 rounded-full border border-white/20 hover:border-[#D4A72C] text-white hover:text-[#F1C75B] font-sans-body font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Reserve a Table
              </button>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#D4A72C]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80"
                alt="Savanna Bites African Food Plating"
                className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-[#D4A72C]/30">
                <span className="text-[#F1C75B] font-serif-heading text-lg font-bold block">
                  Artisanal Tradition & Modern Craft
                </span>
                <span className="text-xs text-slate-300 font-sans-body">
                  Every broth, spice mix, and grill marinade is crafted from raw indigenous ingredients daily.
                </span>
              </div>
            </div>

            {/* Floating Gold Experience Badge */}
            <div className="absolute -bottom-6 -left-6 sm:-left-8 p-4 sm:p-5 rounded-2xl bg-[#D4A72C] text-[#050505] shadow-2xl flex items-center gap-3 border-2 border-black">
              <Award className="w-8 h-8 shrink-0 text-black" />
              <div>
                <span className="font-serif-heading text-lg font-extrabold block leading-tight">
                  Premier African
                </span>
                <span className="text-[10px] uppercase font-sans-body font-bold tracking-widest">
                  Dining Experience
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* 3. FOOD CATEGORIES VISUAL GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-sans-body uppercase tracking-widest text-[#D4A72C] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Collections</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Explore by <span className="text-[#F1C75B]">Category</span>
          </h2>
          <p className="text-sm text-slate-300 font-light">
            From smoky firewood rice and flaming charcoal grills to soothing therapeutic broths and sweet finishes.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                onNavigate(`/menu/${cat.id}`);
              }}
              className="group relative h-48 sm:h-60 rounded-2xl overflow-hidden border border-[#D4A72C]/20 hover:border-[#F1C75B] transition-all duration-500 cursor-pointer shadow-lg hover:-translate-y-1.5"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent group-hover:via-black/40 transition-colors" />

              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-widest text-[#D4A72C] font-sans-body font-bold block mb-1">
                  Explore
                </span>
                <h3 className="font-serif-heading text-lg sm:text-xl font-bold text-white group-hover:text-[#F1C75B] transition-colors leading-snug">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-300 line-clamp-1 font-light mt-1 hidden sm:block">
                  {cat.shortDesc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 4. FEATURED MENU SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-sans-body uppercase tracking-widest text-[#D4A72C] font-semibold">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Chef's Masterpieces</span>
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Featured <span className="text-[#F1C75B]">Specialties</span>
            </h2>
          </div>

          <button
            onClick={() => onNavigate('/menu')}
            className="self-start md:self-auto px-6 py-2.5 rounded-full border border-[#D4A72C] text-[#F1C75B] hover:bg-[#D4A72C] hover:text-black font-sans-body font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 group cursor-pointer"
          >
            <span>View Full Menu ({DISHES.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6-8 Featured Dishes Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onOpenDetails={onOpenDishDetails}
            />
          ))}
        </div>
      </section>


      {/* 5. EDITORIAL SIGNATURE DISH HERO (Signature Smoky Jollof Platter) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0C0C0C] via-[#141414] to-[#0A0A0A] border border-[#D4A72C]/40 p-8 sm:p-12 lg:p-16 shadow-[0_25px_60px_-15px_rgba(212,167,44,0.2)]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Story & Order */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A72C]/15 border border-[#D4A72C]/40 text-xs font-sans-body font-bold text-[#F1C75B] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A72C]" />
                Signature Dish of the House
              </div>

              <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                {signatureDish.name}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed font-sans-body">
                {signatureDish.longDescription || signatureDish.description}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Firewood Aroma</span>
                  <span className="text-xs font-semibold text-white">Natural Smoke Layer</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Accompaniment</span>
                  <span className="text-xs font-semibold text-white">Sweet Honey Dodo & Slaw</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Pairing</span>
                  <span className="text-xs font-semibold text-[#F1C75B]">Zobo Elixir</span>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 block">Price</span>
                  <span className="font-serif-heading text-3xl font-bold text-[#F1C75B]">
                    {formatNaira(signatureDish.price)}
                  </span>
                </div>

                <button
                  onClick={() => onOpenDishDetails(signatureDish)}
                  className="px-8 py-3.5 rounded-full bg-[#D4A72C] hover:bg-[#F1C75B] text-[#050505] font-sans-body font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(212,167,44,0.4)] cursor-pointer"
                >
                  Order Signature Dish
                </button>
              </div>
            </div>

            {/* Right Column: High-Res Editorial Photography */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#D4A72C]/40 shadow-2xl">
                <img
                  src={signatureDish.image}
                  alt={signatureDish.name}
                  className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* 6. WHY SAVANNA BITES (4 Feature Pillars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-sans-body uppercase tracking-widest text-[#D4A72C] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Our Commitment to Excellence</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Why <span className="text-[#F1C75B]">Savanna Bites</span>
          </h2>
          <p className="text-sm text-slate-300 font-light">
            Every plate tells a story of craftsmanship, respect for tradition, and modern culinary refinement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-[#0E0E0E] border border-[#D4A72C]/20 hover:border-[#F1C75B]/60 transition-all duration-300 space-y-4 hover:-translate-y-1.5 shadow-lg group">
            <div className="w-14 h-14 rounded-2xl bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C] group-hover:scale-110 transition-transform">
              <Flame className="w-7 h-7" />
            </div>
            <h3 className="font-serif-heading text-xl font-bold text-white group-hover:text-[#F1C75B] transition-colors">
              Authentic Flavors
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light font-sans-body">
              Celebrating the boundless richness of African culinary heritage without shortcuts. We preserve time-tested indigenous cooking methods.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-[#0E0E0E] border border-[#D4A72C]/20 hover:border-[#F1C75B]/60 transition-all duration-300 space-y-4 hover:-translate-y-1.5 shadow-lg group">
            <div className="w-14 h-14 rounded-2xl bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C] group-hover:scale-110 transition-transform">
              <Leaf className="w-7 h-7" />
            </div>
            <h3 className="font-serif-heading text-xl font-bold text-white group-hover:text-[#F1C75B] transition-colors">
              Fresh Ingredients
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light font-sans-body">
              Quality organic market produce, freshly milled herbs, prime meats, and coastal fresh seafood prepared daily with utmost care.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-[#0E0E0E] border border-[#D4A72C]/20 hover:border-[#F1C75B]/60 transition-all duration-300 space-y-4 hover:-translate-y-1.5 shadow-lg group">
            <div className="w-14 h-14 rounded-2xl bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C] group-hover:scale-110 transition-transform">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-serif-heading text-xl font-bold text-white group-hover:text-[#F1C75B] transition-colors">
              Made With Passion
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light font-sans-body">
              Every dish is individually crafted with meticulous attention to seasoning, balance, aroma, and elegant contemporary presentation.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-8 rounded-3xl bg-[#0E0E0E] border border-[#D4A72C]/20 hover:border-[#F1C75B]/60 transition-all duration-300 space-y-4 hover:-translate-y-1.5 shadow-lg group">
            <div className="w-14 h-14 rounded-2xl bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C] group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <h3 className="font-serif-heading text-xl font-bold text-white group-hover:text-[#F1C75B] transition-colors">
              Exceptional Experience
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light font-sans-body">
              A dining and delivery experience designed around memorable hospitality, seamless ordering, and the genuine warmth of Africa.
            </p>
          </div>

        </div>
      </section>


      {/* 7. GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-sans-body uppercase tracking-widest text-[#D4A72C] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Moments in the Savanna</span>
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Visual <span className="text-[#F1C75B]">Atmosphere</span>
            </h2>
          </div>

          <button
            onClick={() => onNavigate('/gallery')}
            className="self-start sm:self-auto px-6 py-2.5 rounded-full border border-[#D4A72C] text-[#F1C75B] hover:bg-[#D4A72C] hover:text-black font-sans-body font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 group cursor-pointer"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6-Item Masonry Preview */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_ITEMS.slice(0, 6).map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate('/gallery')}
              className="group relative h-56 sm:h-72 rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4A72C] transition-all cursor-pointer shadow-md"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                {item.highlightTag && (
                  <span className="text-[10px] uppercase font-sans-body font-bold text-[#D4A72C] tracking-wider mb-1">
                    {item.highlightTag}
                  </span>
                )}
                <h4 className="font-serif-heading text-sm sm:text-base font-bold text-white leading-snug">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 8. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-sans-body uppercase tracking-widest text-[#D4A72C] font-semibold">
            <Star className="w-3.5 h-3.5 fill-[#D4A72C] text-[#D4A72C]" />
            <span>Guest Impressions</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Words from Our <span className="text-[#F1C75B]">Guests</span>
          </h2>
          <p className="text-sm text-slate-300 font-light">
            Real feedback from diners who have tasted the heart of Africa with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((rev) => (
            <div
              key={rev.id}
              className="p-8 rounded-3xl bg-[#0D0D0D] border border-[#D4A72C]/25 space-y-4 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Stars */}
                <div className="flex items-center gap-1 text-[#F1C75B]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4A72C] text-[#D4A72C]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed italic">
                  {rev.text}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#D4A72C]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-serif-heading text-sm font-bold text-white">
                    {rev.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 block font-sans-body">
                    {rev.role} · Loved: <span className="text-[#F1C75B]">{rev.dishLoved}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 9. STRONG CTA SECTION (Your Table Is Waiting) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#141414] to-[#080808] border border-[#D4A72C]/50 p-8 sm:p-14 lg:p-20 text-center space-y-8 shadow-[0_25px_60px_-15px_rgba(212,167,44,0.3)]">
          
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#D4A72C]/15 border border-[#D4A72C]/40 text-xs font-sans-body text-[#F1C75B] uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A72C]" />
              Experience Savanna Bites
            </div>

            <h2 className="font-serif-heading text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Your Table Is <span className="text-[#F1C75B]">Waiting</span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed font-sans-body max-w-xl mx-auto">
              Good food brings people together. Come experience the heart of Africa at Savanna Bites — in our dining hall or in the comfort of your home.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('/menu')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#D4A72C] hover:bg-[#F1C75B] text-[#050505] font-sans-body font-extrabold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_4px_25px_rgba(212,167,44,0.4)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Order Food Now</span>
            </button>

            <button
              onClick={() => onNavigate('/reservation')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-black/60 hover:bg-[#D4A72C]/20 border border-[#D4A72C] text-white hover:text-[#F1C75B] font-sans-body font-bold text-xs sm:text-sm uppercase tracking-widest backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Make a Reservation</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
