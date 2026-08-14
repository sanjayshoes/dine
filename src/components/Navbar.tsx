import React, { useState, useEffect } from 'react';
import { Rocket, Sparkles, Menu as MenuIcon, X, Calendar, Utensils } from 'lucide-react';

interface NavbarProps {
  onReserveClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReserveClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Menu', href: '#menu' },
    { name: 'Experience', href: '#experience' },
    { name: 'Reserve', href: '#reserve' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0b0d15]/85 backdrop-blur-xl border-b border-cyan-500/20 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-sky-300 p-[1px] shadow-[0_0_15px_rgba(56,189,248,0.5)] group-hover:shadow-[0_0_25px_rgba(56,189,248,0.8)] transition-all">
            <div className="w-full h-full bg-[#0b0d15] rounded-[11px] flex items-center justify-center">
              <Rocket className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <span className="font-orbitron text-2xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 neon-text-cyan">
              NEBULA
            </span>
            <span className="block text-[9px] font-space tracking-[0.25em] text-cyan-400/80 uppercase">
              Neo-Tokyo Fine Dining
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-slate-300 hover:text-cyan-300 transition-colors py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#38bdf8]" />
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onReserveClick}
            className="relative group px-5 py-2.5 rounded-lg font-orbitron text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-sky-300 transition-all shadow-[0_0_15px_rgba(56,189,248,0.5)] hover:shadow-[0_0_25px_rgba(56,189,248,0.8)] active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve Now</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-900/80 border border-cyan-500/30 text-cyan-400 hover:text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-b border-cyan-500/30 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-cyan-400 py-2 border-b border-slate-800/80 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <Sparkles className="w-4 h-4 text-cyan-400/50" />
              </a>
            ))}
          </nav>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onReserveClick();
            }}
            className="w-full py-3 rounded-lg font-orbitron text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-sky-300 transition-all shadow-[0_0_20px_rgba(56,189,248,0.6)] flex items-center justify-center gap-2"
          >
            <Utensils className="w-4 h-4" />
            <span>Book A Experience</span>
          </button>
        </div>
      )}
    </header>
  );
};
