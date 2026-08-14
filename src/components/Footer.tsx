import React, { useState } from 'react';
import { Rocket, Heart, ArrowRight, Sparkles, Shield, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-[#07090f] border-t border-cyan-500/20 pt-16 pb-12 px-4 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <a href="#hero" className="flex items-center gap-3 group inline-flex">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-sky-300 p-[1px] shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                <div className="w-full h-full bg-[#0b0d15] rounded-[11px] flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="font-orbitron text-2xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 neon-text-cyan">
                NEBULA
              </span>
            </a>

            <p className="text-sm text-slate-400 font-light max-w-sm leading-relaxed">
              Dine in the future of flavor — where taste meets tomorrow. Crafted with molecular precision and starlit ambience in Neo-Tokyo.
            </p>

            <div className="flex items-center gap-2 text-xs text-cyan-400/80 font-space">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>100% Zero-Carbon Certified · 3 Cyber Michelin Stars</span>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-orbitron text-xs font-bold uppercase tracking-widest text-cyan-400">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-space text-slate-400">
              <li>
                <a href="#hero" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
                  <span className="text-cyan-500">›</span> Home
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
                  <span className="text-cyan-500">›</span> Quantum Menu
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
                  <span className="text-cyan-500">›</span> Pod Atmosphere
                </a>
              </li>
              <li>
                <a href="#reserve" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
                  <span className="text-cyan-500">›</span> Table Reservation
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
                  <span className="text-cyan-500">›</span> Neo-Tokyo Coordinates
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-orbitron text-xs font-bold uppercase tracking-widest text-cyan-400">
              Cyber Tasting Pass
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe for secret menu launches, private pod access codes, and invitations to molecular chef workshops.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter.your.email@net"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-sky-300 text-black font-orbitron font-bold text-xs transition-all shadow-[0_0_15px_rgba(56,189,248,0.5)] cursor-pointer shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <div className="text-[11px] text-emerald-400 font-space flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed! Access code sent to inbox.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-space text-slate-500">
          <div>
            NEBULA · where taste meets tomorrow © 2026. All rights reserved.
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span>Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400 inline" />
            <span>in Neo-Tokyo</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
