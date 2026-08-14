import React from 'react';
import { X, Sparkles, Flame, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Dish } from '../types';

interface DishModalProps {
  dish: Dish | null;
  onClose: () => void;
  onPreOrder: (dish: Dish) => void;
}

export const DishModal: React.FC<DishModalProps> = ({ dish, onClose, onPreOrder }) => {
  if (!dish) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-card rounded-2xl border border-cyan-400/40 p-6 md:p-8 shadow-[0_0_50px_rgba(56,189,248,0.3)] overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 border border-cyan-500/30 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Dish Image */}
          <div className="relative rounded-xl overflow-hidden aspect-4/3 border border-cyan-500/30 group">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-cyan-400/30 font-orbitron text-xs font-bold text-cyan-300">
              ${dish.price}
            </div>
          </div>

          {/* Dish Details */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-space tracking-widest uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{dish.category} · Molecular Craft</span>
              </div>
              <h3 className="font-orbitron text-2xl font-bold text-white neon-text-white">
                {dish.name}
              </h3>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {dish.description}
            </p>

            {dish.sensoryNotes && (
              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200/90 font-space space-y-1">
                <span className="font-bold text-cyan-400 uppercase tracking-wider block">Sensory Profile:</span>
                <p>{dish.sensoryNotes}</p>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {dish.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-cyan-500/20 text-[11px] font-space text-cyan-300"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-3 flex items-center gap-3">
              <button
                onClick={() => {
                  onPreOrder(dish);
                  onClose();
                }}
                className="flex-1 py-3 px-4 rounded-xl font-orbitron text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-sky-300 transition-all shadow-[0_0_20px_rgba(56,189,248,0.5)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Add To Reservation Pre-order</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
