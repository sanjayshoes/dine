import React, { useState, useEffect } from 'react';
import { Calendar, Utensils, Star, Sparkles, ChevronDown, Award, Flame } from 'lucide-react';
import { heroBg } from '../data/restaurantData';

interface HeroProps {
  onReserveClick: () => void;
  onExploreMenuClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onReserveClick, onExploreMenuClick }) => {
  const line1 = 'DINE IN THE';
  const line2 = 'FUTURE OF FLAVOR';
  const totalChars = line1.length + line2.length;

  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && charCount < totalChars) {
      // Type next character
      timer = setTimeout(() => {
        setCharCount((prev) => prev + 1);
      }, 85);
    } else if (!isDeleting && charCount === totalChars) {
      // Pause at full text
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && charCount > 0) {
      // Delete characters
      timer = setTimeout(() => {
        setCharCount((prev) => prev - 1);
      }, 40);
    } else if (isDeleting && charCount === 0) {
      // Pause at empty before restarting loop
      timer = setTimeout(() => {
        setIsDeleting(false);
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [charCount, isDeleting, totalChars]);

  const text1 = line1.slice(0, Math.min(charCount, line1.length));
  const text2 = charCount > line1.length ? line2.slice(0, charCount - line1.length) : '';
  const isCursorOnLine1 = charCount <= line1.length;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden bg-cyber-grid"
    >
      {/* Background Hero Image with Cyber Dark Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroBg}
          alt="NEBULA Futuristic Restaurant Interior"
          className="w-full h-full object-cover object-center scale-105 filter brightness-50 contrast-125 opacity-40 animate-pulse-glow"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d15] via-[#0b0d15]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d15] via-transparent to-[#0b0d15]" />
        
        {/* Neon Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/15 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-sky-400/10 rounded-full filter blur-[100px] pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-cyan-400/30 text-cyan-300 text-xs font-space tracking-widest uppercase shadow-[0_0_15px_rgba(56,189,248,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Molecular Precision · Neo-Tokyo</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        </div>

        {/* Hero Title with Infinite Typewriter Effect */}
        <h1 className="font-orbitron text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none text-white min-h-[2.4em] sm:min-h-[2.1em] flex flex-col items-center justify-center">
          <span className="inline-block">
            {text1}
            {isCursorOnLine1 && (
              <span className="inline-block w-[3px] sm:w-[5px] md:w-[7px] h-[0.75em] align-middle bg-cyan-400 ml-1.5 shadow-[0_0_12px_#38bdf8] animate-pulse" />
            )}
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-200 neon-text-cyan inline-block">
            {text2}
            {!isCursorOnLine1 && (
              <span className="inline-block w-[3px] sm:w-[5px] md:w-[7px] h-[0.75em] align-middle bg-cyan-400 ml-1.5 shadow-[0_0_12px_#38bdf8] animate-pulse" />
            )}
          </span>
        </h1>

        {/* Subtitle / Tagline */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed">
          Immerse in a culinary journey where neon meets nature — crafted with molecular precision and starlit ambience.
        </p>

        {/* CTA Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={onReserveClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-orbitron text-sm font-extrabold uppercase tracking-widest text-black bg-cyan-400 hover:bg-sky-300 transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.6)] hover:shadow-[0_0_40px_rgba(56,189,248,0.9)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-3"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve Now</span>
          </button>

          <button
            onClick={onExploreMenuClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-orbitron text-sm font-extrabold uppercase tracking-widest text-cyan-300 glass-card hover:bg-cyan-500/10 border border-cyan-400/40 hover:border-cyan-300 transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-3"
          >
            <Utensils className="w-4 h-4" />
            <span>Explore Menu</span>
          </button>
        </div>

        {/* Highlight Stats Banner */}
        <div className="pt-12 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="glass-card p-4 rounded-xl text-center border-t border-cyan-400/30">
            <div className="flex justify-center items-center gap-1 text-cyan-400 mb-1">
              <Star className="w-4 h-4 fill-cyan-400" />
              <Star className="w-4 h-4 fill-cyan-400" />
              <Star className="w-4 h-4 fill-cyan-400" />
            </div>
            <div className="font-orbitron text-xl font-bold text-white">3 Stars</div>
            <div className="text-xs text-slate-400 font-space">Cyber Michelin Rated</div>
          </div>

          <div className="glass-card p-4 rounded-xl text-center border-t border-cyan-400/30">
            <div className="flex justify-center items-center gap-1 text-cyan-400 mb-1">
              <Award className="w-4 h-4" />
            </div>
            <div className="font-orbitron text-xl font-bold text-white">#1 Fine Dining</div>
            <div className="text-xs text-slate-400 font-space">Neo-Tokyo 2026</div>
          </div>

          <div className="glass-card p-4 rounded-xl text-center col-span-2 sm:col-span-1 border-t border-cyan-400/30">
            <div className="flex justify-center items-center gap-1 text-cyan-400 mb-1">
              <Flame className="w-4 h-4" />
            </div>
            <div className="font-orbitron text-xl font-bold text-white">-196°C Liquid Nitro</div>
            <div className="text-xs text-slate-400 font-space">Molecular Gastronomy</div>
          </div>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#menu"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-cyan-400/70 hover:text-cyan-300 transition-colors"
        aria-label="Scroll to menu"
      >
        <span className="text-[10px] font-space tracking-widest uppercase">Scroll Down</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  );
};
