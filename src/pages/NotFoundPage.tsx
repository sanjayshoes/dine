import React from 'react';
import { ArrowLeft, UtensilsCrossed } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (route: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-32 pb-24 max-w-2xl mx-auto px-4 text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center mx-auto text-[#D4A72C]">
        <UtensilsCrossed className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase font-sans-body font-bold text-[#D4A72C] tracking-widest block">
          Error 404
        </span>
        <h1 className="font-serif-heading text-4xl sm:text-5xl font-extrabold text-white">
          Recipe Not Found
        </h1>
        <p className="text-sm text-slate-300 font-light font-sans-body max-w-md mx-auto">
          The page you are looking for might have been moved or does not exist in our savory menu.
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 pt-2">
        <button
          onClick={() => onNavigate('/')}
          className="px-6 py-3 rounded-full bg-[#D4A72C] text-black font-sans-body font-bold text-xs uppercase tracking-wider"
        >
          Return to Home
        </button>
        <button
          onClick={() => onNavigate('/menu')}
          className="px-6 py-3 rounded-full border border-white/20 text-white font-sans-body font-semibold text-xs uppercase tracking-wider hover:bg-white/5"
        >
          Explore Food Menu
        </button>
      </div>
    </div>
  );
};
