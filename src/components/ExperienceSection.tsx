import React, { useState } from 'react';
import { Sparkles, Cpu, Eye, Radio, ShieldCheck, Palette } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const [selectedAmbience, setSelectedAmbience] = useState<'cyan' | 'violet' | 'amber' | 'emerald'>('cyan');

  const ambienceConfigs = {
    cyan: {
      name: 'Cyberpunk Neon Cyan',
      glow: 'shadow-[0_0_50px_rgba(56,189,248,0.4)]',
      border: 'border-cyan-400',
      textColor: 'text-cyan-400',
      bgGradient: 'from-cyan-950/40 via-slate-900 to-black',
      tagline: 'Standard high-voltage aquatic neon frequency tuned for seafood & Wagyu pairings.'
    },
    violet: {
      name: 'Plasma Violet Aura',
      glow: 'shadow-[0_0_50px_rgba(192,132,252,0.4)]',
      border: 'border-purple-400',
      textColor: 'text-purple-400',
      bgGradient: 'from-purple-950/40 via-slate-900 to-black',
      tagline: 'Deep synthetic velvet spectrum enhancing dry-ice mixology and rare botanicals.'
    },
    amber: {
      name: 'Solar Starlight Amber',
      glow: 'shadow-[0_0_50px_rgba(251,191,36,0.4)]',
      border: 'border-amber-400',
      textColor: 'text-amber-400',
      bgGradient: 'from-amber-950/40 via-slate-900 to-black',
      tagline: 'Warm interstellar solar flare setting tailored for romantic multi-course tastings.'
    },
    emerald: {
      name: 'Matrix Quantum Green',
      glow: 'shadow-[0_0_50px_rgba(52,211,153,0.4)]',
      border: 'border-emerald-400',
      textColor: 'text-emerald-400',
      bgGradient: 'from-emerald-950/40 via-slate-900 to-black',
      tagline: 'Bio-luminescent forest aura inducing relaxed parasympathetic digestion.'
    }
  };

  const active = ambienceConfigs[selectedAmbience];

  return (
    <section id="experience" className="relative py-24 px-4 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-xs font-space uppercase tracking-widest">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>Next-Gen Dining Architecture</span>
        </div>

        <h2 className="font-orbitron text-3xl sm:text-5xl font-black text-white tracking-wide">
          THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-200 neon-text-cyan">NEBULA EXPERIENCE</span>
        </h2>

        <p className="max-w-xl mx-auto text-slate-300 text-sm sm:text-base font-light">
          Step beyond traditional dining into an immersive sensory universe where gastronomy, acoustics, and interactive optics unite.
        </p>
      </div>

      {/* Interactive Atmosphere Customizer Box */}
      <div className={`glass-card rounded-3xl p-6 md:p-10 border ${active.border}/40 ${active.glow} bg-gradient-to-br ${active.bgGradient} transition-all duration-500 mb-16`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-slate-700 text-xs font-space text-slate-300">
              <Palette className="w-3.5 h-3.5 text-cyan-400" />
              <span>Interactive Table Environment Preview</span>
            </div>

            <h3 className={`font-orbitron text-2xl sm:text-3xl font-extrabold ${active.textColor} transition-colors`}>
              {active.name}
            </h3>

            <p className="text-sm text-slate-300 font-light leading-relaxed">
              {active.tagline} Guests can customize their dining pod's illumination, soundtrack, and ambient temperature through embedded table touch sensors.
            </p>

            {/* Atmosphere Selector Buttons */}
            <div className="space-y-2">
              <span className="text-xs font-space uppercase tracking-widest text-slate-400 block">
                Select Table Lighting Mode:
              </span>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedAmbience('cyan')}
                  className={`px-4 py-2 rounded-xl text-xs font-orbitron font-bold transition-all border cursor-pointer ${
                    selectedAmbience === 'cyan'
                      ? 'bg-cyan-400 text-black border-cyan-300 shadow-[0_0_15px_#38bdf8]'
                      : 'bg-slate-900/80 text-cyan-300 border-cyan-500/30'
                  }`}
                >
                  Cyan Neon
                </button>

                <button
                  onClick={() => setSelectedAmbience('violet')}
                  className={`px-4 py-2 rounded-xl text-xs font-orbitron font-bold transition-all border cursor-pointer ${
                    selectedAmbience === 'violet'
                      ? 'bg-purple-500 text-white border-purple-300 shadow-[0_0_15px_#c084fc]'
                      : 'bg-slate-900/80 text-purple-300 border-purple-500/30'
                  }`}
                >
                  Plasma Violet
                </button>

                <button
                  onClick={() => setSelectedAmbience('amber')}
                  className={`px-4 py-2 rounded-xl text-xs font-orbitron font-bold transition-all border cursor-pointer ${
                    selectedAmbience === 'amber'
                      ? 'bg-amber-400 text-black border-amber-300 shadow-[0_0_15px_#fbbf24]'
                      : 'bg-slate-900/80 text-amber-300 border-amber-500/30'
                  }`}
                >
                  Solar Amber
                </button>

                <button
                  onClick={() => setSelectedAmbience('emerald')}
                  className={`px-4 py-2 rounded-xl text-xs font-orbitron font-bold transition-all border cursor-pointer ${
                    selectedAmbience === 'emerald'
                      ? 'bg-emerald-400 text-black border-emerald-300 shadow-[0_0_15px_#34d399]'
                      : 'bg-slate-900/80 text-emerald-300 border-emerald-500/30'
                  }`}
                >
                  Matrix Green
                </button>
              </div>
            </div>
          </div>

          {/* Holographic Pod Mock Visual */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 p-6 bg-black/60 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="font-orbitron text-xs text-slate-300 tracking-wider">POD-ALPHA #04 · LIVE SENSORS</span>
              </div>
              <span className="text-[10px] font-space text-cyan-400 uppercase">Status: Optimal</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-space">
              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Aroma Diffusion</div>
                <div className="text-white font-bold">Smoked Cedar & Yuzu</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Acoustic Frequency</div>
                <div className="text-white font-bold">432Hz Binaural Beat</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Table Temperature</div>
                <div className="text-white font-bold">21.5°C Stabilized</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Holographic Sommelier</div>
                <div className="text-cyan-400 font-bold">Active Assistant</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3 Tech Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card-interactive p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
            <Radio className="w-6 h-6" />
          </div>
          <h4 className="font-orbitron text-lg font-bold text-white">
            Zero-Gravity Pod Dining
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed font-light">
            Private, sound-isolated acoustic capsules equipped with state-of-the-art climate, lighting, and air ionization control.
          </p>
        </div>

        <div className="glass-card-interactive p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
            <Eye className="w-6 h-6" />
          </div>
          <h4 className="font-orbitron text-lg font-bold text-white">
            Holographic Plating
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed font-light">
            Each dish is introduced via 3D interactive holographic projection displaying origin details, vintage pairings, and flavor profiles.
          </p>
        </div>

        <div className="glass-card-interactive p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="font-orbitron text-lg font-bold text-white">
            100% Zero-Carbon Lab
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed font-light">
            All ingredients are grown in vertical hydro-farms in Neo-Tokyo or ethically harvested with net-zero carbon impact.
          </p>
        </div>
      </div>
    </section>
  );
};
