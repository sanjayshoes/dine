import React, { useState } from 'react';
import { CONTACT_INFO, SEATING_ZONES, TIME_SLOTS } from '../data/restaurantData';
import { ReservationData, Dish } from '../types';
import { MapPin, Clock, Mail, Phone, Calendar, Users, Send, CheckCircle2, Sparkles, Copy, X } from 'lucide-react';

interface ReservationSectionProps {
  preOrderedDishes: Dish[];
  onRemovePreOrderedDish: (dishId: string) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  preOrderedDishes,
  onRemovePreOrderedDish
}) => {
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    email: '',
    phone: '',
    date: '2026-08-15',
    time: '19:30',
    guests: 2,
    zone: 'pod-alpha',
    specialRequests: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<{
    code: string;
    details: ReservationData;
  } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.date) errs.date = 'Date is required';
    if (!formData.time) errs.time = 'Time is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const code = `NEB-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedBooking({
        code,
        details: { ...formData }
      });
      setIsSubmitting(false);
    }, 800);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="reserve" className="relative py-24 px-4 max-w-7xl mx-auto">
      {/* Background Orbs */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-xs font-space uppercase tracking-widest">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>Priority Table Dispatch</span>
        </div>

        <h2 className="font-orbitron text-3xl sm:text-5xl font-black text-white tracking-wide">
          RESERVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-200 neon-text-cyan">YOUR POD</span>
        </h2>

        <p className="max-w-xl mx-auto text-slate-300 text-sm sm:text-base font-light">
          Secure your culinary teleportation. Advance reservations are strongly advised due to limited private gravity pods.
        </p>
      </div>

      {/* Split Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Contact Info & Map (5 cols) */}
        <div id="contact" className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-2xl p-6 md:p-8 border border-cyan-500/30 space-y-6">
            <h3 className="font-orbitron text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Contact Coordinates</span>
            </h3>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-4 text-slate-200">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-space font-bold text-xs uppercase text-cyan-400 tracking-wider">Address</div>
                  <div className="text-slate-200 font-medium">{CONTACT_INFO.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-4 text-slate-200">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-space font-bold text-xs uppercase text-cyan-400 tracking-wider">Operating Hours</div>
                  <div className="text-slate-200 font-medium">{CONTACT_INFO.hours}</div>
                </div>
              </div>

              <div className="flex items-start gap-4 text-slate-200">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-space font-bold text-xs uppercase text-cyan-400 tracking-wider">Direct Email</div>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-slate-200 hover:text-cyan-300 transition-colors">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 text-slate-200">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-space font-bold text-xs uppercase text-cyan-400 tracking-wider">Quantum Line</div>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="text-slate-200 hover:text-cyan-300 transition-colors">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <span className="text-xs font-space uppercase tracking-widest text-slate-400 block">
                Connect On Holo-Net:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass-card hover:bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 hover:text-white transition-all shadow-md hover:scale-105"
                  aria-label="Instagram"
                >
                  <i className="fa-brands fa-instagram text-lg"></i>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass-card hover:bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 hover:text-white transition-all shadow-md hover:scale-105"
                  aria-label="Twitter"
                >
                  <i className="fa-brands fa-x-twitter text-lg"></i>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass-card hover:bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 hover:text-white transition-all shadow-md hover:scale-105"
                  aria-label="TikTok"
                >
                  <i className="fa-brands fa-tiktok text-lg"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Neo-Tokyo Location Widget */}
          <div className="glass-card rounded-2xl p-5 border border-cyan-500/20 space-y-3">
            <div className="flex items-center justify-between text-xs font-space">
              <span className="text-cyan-400 font-bold uppercase tracking-wider">Neo-Tokyo Transport Grid</span>
              <span className="text-slate-400">Sector 7-B</span>
            </div>
            <div className="h-32 rounded-xl bg-slate-950 border border-cyan-500/20 relative flex items-center justify-center overflow-hidden bg-cyber-grid">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
              <div className="relative z-10 text-center space-y-1">
                <div className="inline-block p-2 rounded-full bg-cyan-400/20 border border-cyan-400 text-cyan-300 animate-pulse">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="font-orbitron text-xs font-bold text-white">NEBULA SECTOR HEADQUARTERS</div>
                <div className="text-[10px] text-cyan-400 font-space">Latitude 35.6762° N · Longitude 139.6503° E</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Reservation Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-2xl p-6 md:p-8 border border-cyan-400/40 relative shadow-[0_0_30px_rgba(56,189,248,0.15)]">
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="font-orbitron text-2xl font-bold text-white pb-2 border-b border-slate-800">
                Reservation Dispatch
              </h3>

              {/* Pre-ordered items bar if any */}
              {preOrderedDishes.length > 0 && (
                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs font-space text-cyan-300">
                    <span className="font-bold uppercase tracking-wider">Pre-ordered Tasting Dishes ({preOrderedDishes.length}):</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {preOrderedDishes.map((dish) => (
                      <span
                        key={dish.id}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-400/40 text-xs font-space text-white flex items-center gap-2"
                      >
                        <span>{dish.name} (${dish.price})</span>
                        <button
                          type="button"
                          onClick={() => onRemovePreOrderedDish(dish.id)}
                          className="text-slate-400 hover:text-red-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-space font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Commander Shepard"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border ${
                      errors.name ? 'border-red-500' : 'border-cyan-500/30 focus:border-cyan-400'
                    } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-space font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="commander@alliance.net"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border ${
                      errors.email ? 'border-red-500' : 'border-cyan-500/30 focus:border-cyan-400'
                    } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Phone & Guests Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-space font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+81 90 1234 5678"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border ${
                      errors.phone ? 'border-red-500' : 'border-cyan-500/30 focus:border-cyan-400'
                    } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all`}
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-space font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Party Size (Guests)
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-white text-sm focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <option key={num} value={num} className="bg-slate-900 text-white">
                        {num} {num === 1 ? 'Guest (Solo Pod)' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-space font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Reservation Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-white text-sm focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-space font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Time Slot *
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-white text-sm focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot} className="bg-slate-900 text-white">
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seating Zone */}
              <div>
                <label className="block text-xs font-space font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Preferred Seating Zone
                </label>
                <select
                  value={formData.zone}
                  onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-white text-sm focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"
                >
                  {SEATING_ZONES.map((zone) => (
                    <option key={zone.id} value={zone.id} className="bg-slate-900 text-white">
                      {zone.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-space font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Special Requests / Dietary Protocol
                </label>
                <textarea
                  rows={2}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="Anniversary celebration, gluten-free, extra dry ice mist, etc."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-orbitron text-sm font-extrabold uppercase tracking-widest text-black bg-cyan-400 hover:bg-sky-300 transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.6)] hover:shadow-[0_0_40px_rgba(56,189,248,0.9)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin text-black" />
                    <span>Transmitting Dispatch Code...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Confirm Cyber Reservation</span>
                  </>
                )}
              </button>
            </form>

          </div>
        </div>

      </div>

      {/* Confirmation Success Modal */}
      {submittedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg glass-card rounded-3xl border border-cyan-400/50 p-6 md:p-8 text-center space-y-6 shadow-[0_0_60px_rgba(56,189,248,0.4)]">
            
            <div className="w-16 h-16 rounded-2xl bg-cyan-400/20 border border-cyan-400 flex items-center justify-center text-cyan-400 mx-auto shadow-[0_0_20px_#38bdf8]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-space uppercase tracking-widest text-cyan-400 font-bold block">
                Reservation Confirmed · Pod Reserved
              </span>
              <h3 className="font-orbitron text-2xl font-black text-white">
                WELCOME TO NEBULA
              </h3>
            </div>

            {/* Access Pass Card */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/30 space-y-3 text-left font-space text-xs text-slate-300">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400 uppercase tracking-wider">Access Pass Code:</span>
                <div className="flex items-center gap-2">
                  <span className="font-orbitron font-extrabold text-cyan-300 text-sm">{submittedBooking.code}</span>
                  <button
                    onClick={() => handleCopyCode(submittedBooking.code)}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400"
                    title="Copy Booking Code"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {copiedCode && (
                <div className="text-[10px] text-emerald-400 text-right">Pass code copied to clipboard!</div>
              )}

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 block">Guest Name:</span>
                  <span className="text-white font-medium">{submittedBooking.details.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Party Size:</span>
                  <span className="text-white font-medium">{submittedBooking.details.guests} Guests</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Date & Time:</span>
                  <span className="text-white font-medium">{submittedBooking.details.date} @ {submittedBooking.details.time}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Location:</span>
                  <span className="text-white font-medium">221B Neon Street, Neo-Tokyo</span>
                </div>
              </div>

              {preOrderedDishes.length > 0 && (
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-500 block mb-1">Pre-ordered Tasting:</span>
                  <div className="flex flex-wrap gap-1">
                    {preOrderedDishes.map((d) => (
                      <span key={d.id} className="text-[10px] bg-cyan-950 px-2 py-0.5 rounded text-cyan-300">
                        {d.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-400 font-light">
              A confirmation email has been dispatched to <span className="text-cyan-300">{submittedBooking.details.email}</span>. Please present this pass code upon arrival at Sector 7-B.
            </p>

            <button
              onClick={() => setSubmittedBooking(null)}
              className="w-full py-3 rounded-xl font-orbitron text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-sky-300 transition-all cursor-pointer"
            >
              Done & Return To Site
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
