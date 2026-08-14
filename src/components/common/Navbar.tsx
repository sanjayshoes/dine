import React, { useState, useEffect } from 'react';
import { RESTAURANT_CONFIG } from '../../config/restaurant';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  Sparkles,
  Calendar,
  UtensilsCrossed,
  ArrowRight
} from 'lucide-react';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenSearch
}) => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { favoritesCount } = useFavorites();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', route: '/' },
    { label: 'Menu', route: '/menu' },
    { label: 'About', route: '/about' },
    { label: 'Gallery', route: '/gallery' },
    { label: 'Reservations', route: '/reservation' },
    { label: 'Contact', route: '/contact' },
    { label: 'FAQ', route: '/faq' },
  ];

  const handleNavClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#050505]/95 backdrop-blur-xl border-b border-[#D4A72C]/25 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3'
            : 'bg-gradient-to-b from-[#050505]/90 via-[#050505]/60 to-transparent py-4 sm:py-5'
        }`}
      >
        {/* Top Announcement Bar */}
        {!isScrolled && (
          <div className="hidden lg:block border-b border-white/5 pb-2 mb-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[11px] font-sans-body text-slate-300">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-[#F1C75B]">
                  <Sparkles className="w-3 h-3 text-[#D4A72C]" />
                  <span>Taste the Heart of Africa · Authentic Flavors in Lagos</span>
                </span>
                <span className="text-slate-500">|</span>
                <span>Open Daily: 11:00 AM – 11:00 PM</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={`tel:${RESTAURANT_CONFIG.phone}`}
                  className="hover:text-[#F1C75B] transition-colors flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-[#D4A72C]" />
                  <span>{RESTAURANT_CONFIG.phone}</span>
                </a>
                <span className="text-slate-500">|</span>
                <span className="text-[#D4A72C] font-semibold">Free Delivery Above ₦35,000</span>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo & Name */}
            <div
              onClick={() => handleNavClick('/')}
              className="flex items-center gap-3 cursor-pointer group shrink-0"
            >
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-[#D4A72C] p-0.5 bg-black shadow-[0_0_15px_rgba(212,167,44,0.35)] group-hover:scale-105 transition-transform duration-300">
                <img
                  src={RESTAURANT_CONFIG.logoUrl}
                  alt={RESTAURANT_CONFIG.name}
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex flex-col">
                <span className="font-serif-heading text-lg sm:text-xl font-extrabold tracking-wider text-white group-hover:text-[#F1C75B] transition-colors leading-none flex items-center gap-1.5">
                  SAVANNA <span className="font-script text-[#D4A72C] text-2xl font-normal lowercase tracking-normal">bites</span>
                </span>
                <span className="text-[9px] tracking-[0.25em] text-[#D4A72C] uppercase font-sans-body font-semibold mt-0.5">
                  Taste the Heart of Africa
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = currentRoute === link.route || (link.route !== '/' && currentRoute.startsWith(link.route));
                return (
                  <button
                    key={link.route}
                    onClick={() => handleNavClick(link.route)}
                    className={`px-3.5 py-2 rounded-full text-xs font-sans-body font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#D4A72C]/15 text-[#F1C75B] border border-[#D4A72C]/40 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Icons & ORDER NOW CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Search Trigger */}
              <button
                type="button"
                onClick={onOpenSearch}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Search food menu"
                title="Search Menu"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Favorites Link */}
              <button
                type="button"
                onClick={() => handleNavClick('/favorites')}
                className="relative w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-[#D4A72C] flex items-center justify-center transition-all cursor-pointer"
                aria-label="View Favorites"
                title="Saved Dishes"
              >
                <Heart className="w-4 h-4" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4A72C] text-[#050505] text-[9px] font-bold flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </button>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/5 hover:bg-[#D4A72C]/15 border border-[#D4A72C]/30 text-white hover:text-[#F1C75B] flex items-center justify-center transition-all cursor-pointer"
                aria-label="Open Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A72C]" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-[#F1C75B] to-[#D4A72C] text-[#050505] text-[10px] font-extrabold flex items-center justify-center shadow-md animate-pulse">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              {/* Primary ORDER NOW CTA */}
              <button
                type="button"
                onClick={() => handleNavClick('/menu')}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4A72C] hover:bg-[#F1C75B] text-[#050505] font-sans-body font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(212,167,44,0.35)] hover:shadow-[0_4px_30px_rgba(241,199,91,0.5)] active:scale-95 cursor-pointer"
              >
                <UtensilsCrossed className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Order Now</span>
              </button>

              {/* Mobile Hamburger Menu */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Mobile Animated Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-12">
            <div className="w-screen max-w-sm bg-[#0A0A0A] border-l border-[#D4A72C]/30 text-white shadow-2xl flex flex-col justify-between p-6">
              
              {/* Top Row in Drawer */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <img
                    src={RESTAURANT_CONFIG.logoUrl}
                    alt={RESTAURANT_CONFIG.name}
                    className="w-10 h-10 rounded-full border border-[#D4A72C] object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="font-serif-heading text-base font-bold text-white block">
                      SAVANNA BITES
                    </span>
                    <span className="text-[9px] text-[#D4A72C] tracking-widest uppercase">
                      Taste the Heart of Africa
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-6 space-y-2 flex-1 overflow-y-auto">
                {navLinks.map((link) => {
                  const isActive = currentRoute === link.route;
                  return (
                    <button
                      key={link.route}
                      onClick={() => handleNavClick(link.route)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-sm font-sans-body font-semibold uppercase tracking-wider transition-all text-left ${
                        isActive
                          ? 'bg-[#D4A72C] text-[#050505] shadow-md font-bold'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className={`w-4 h-4 ${isActive ? 'text-black' : 'text-slate-500'}`} />
                    </button>
                  );
                })}

                <button
                  onClick={() => handleNavClick('/favorites')}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl text-sm font-sans-body text-slate-300 hover:bg-white/5"
                >
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#D4A72C]" />
                    <span>Saved Favorites</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#D4A72C]/20 text-[#D4A72C] text-xs font-bold">
                    {favoritesCount}
                  </span>
                </button>
              </div>

              {/* Bottom Quick Contact & Order Button */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => handleNavClick('/menu')}
                  className="w-full py-3.5 rounded-xl bg-[#D4A72C] text-[#050505] font-sans-body font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>Order Online Now</span>
                </button>

                <button
                  onClick={() => handleNavClick('/reservation')}
                  className="w-full py-3 rounded-xl border border-[#D4A72C] text-[#F1C75B] font-sans-body font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Table</span>
                </button>

                <div className="text-center pt-2 text-[11px] text-slate-400 font-sans-body">
                  Call Concierge: <a href={`tel:${RESTAURANT_CONFIG.phone}`} className="text-[#F1C75B] underline">{RESTAURANT_CONFIG.phone}</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};
