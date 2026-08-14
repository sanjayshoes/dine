import React, { useState } from 'react';
import { RESTAURANT_CONFIG } from '../config/restaurant';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Phone, 
  Mail, 
  CheckCircle2, 
  MessageCircle, 
  User, 
  Utensils,
  PartyPopper
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReservationPageProps {
  onNavigate: (route: string) => void;
}

export const ReservationPage: React.FC<ReservationPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('19:00 (7:00 PM)');
  const [seatingArea, setSeatingArea] = useState('Main Dining Hall (Golden Chandeliers)');
  const [occasion, setOccasion] = useState('Casual Dining');
  const [specialRequests, setSpecialRequests] = useState('');

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const timeSlots = [
    '12:00 PM (Lunch)',
    '13:00 (1:00 PM)',
    '14:00 (2:00 PM)',
    '15:00 (3:00 PM)',
    '18:00 (6:00 PM)',
    '19:00 (7:00 PM)',
    '20:00 (8:00 PM)',
    '21:00 (9:00 PM)',
    '21:30 (9:30 PM)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date) {
      alert('Please fill in your name, phone number, and reservation date.');
      return;
    }

    const ref = `SB-RES-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setBookingConfirmed(true);

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#D4A72C]/15 border border-[#D4A72C]/40 text-xs font-sans-body text-[#F1C75B] uppercase tracking-widest font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#D4A72C]" />
          Table Reservations & Private Dining
        </div>

        <h1 className="font-serif-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
          Book Your <span className="text-[#F1C75B]">Table</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 font-light font-sans-body leading-relaxed">
          Join us for an unforgettable African dining journey. Secure your table in our main dining hall, private VIP lounge, or garden terrace.
        </p>
      </div>

      {bookingConfirmed ? (
        /* Confirmation State Card */
        <div className="max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#0D0D0D] border border-[#D4A72C] text-center space-y-6 shadow-[0_20px_60px_rgba(212,167,44,0.25)] animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-sans-body font-bold text-[#D4A72C] tracking-widest block">
              Reservation Confirmed
            </span>
            <h2 className="font-serif-heading text-3xl font-extrabold text-white">
              We Look Forward to Welcoming You!
            </h2>
            <p className="text-sm text-slate-300 font-sans-body">
              Reservation Code: <strong className="text-[#F1C75B] font-mono text-base">{bookingRef}</strong>
            </p>
          </div>

          {/* Ticket Summary Box */}
          <div className="p-5 rounded-2xl bg-black/60 border border-white/10 text-left text-xs font-sans-body space-y-2.5 text-slate-300">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-slate-400">Guest Name</span>
              <span className="text-white font-bold">{name}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-slate-400">Date & Time</span>
              <span className="text-[#F1C75B] font-bold">{date} at {timeSlot}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-slate-400">Party Size</span>
              <span className="text-white font-bold">{guests} Guests</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-slate-400">Seating Area</span>
              <span className="text-white">{seatingArea}</span>
            </div>
            {occasion && (
              <div className="flex justify-between">
                <span className="text-slate-400">Occasion</span>
                <span className="text-white">{occasion}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Hello Savanna Bites, I just booked a table (#${bookingRef}) for ${name} on ${date} for ${guests} guests.`)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-sans-body font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirm on WhatsApp</span>
            </a>

            <button
              onClick={() => onNavigate('/menu')}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#D4A72C] text-black font-sans-body font-bold text-xs uppercase tracking-wider"
            >
              Preview Full Menu
            </button>
          </div>
        </div>
      ) : (
        /* Reservation Form Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Form Left 8 cols */}
          <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl bg-[#0D0D0D] border border-white/10 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Guest Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-sans-body font-semibold uppercase tracking-wider text-slate-300 block">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tunde Williams"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-sans-body font-semibold uppercase tracking-wider text-slate-300 block">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0802 345 6789"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-sans-body font-semibold uppercase tracking-wider text-slate-300 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tunde@email.com"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Date, Time, Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-sans-body font-semibold uppercase tracking-wider text-slate-300 block">
                    Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-sans-body font-semibold uppercase tracking-wider text-slate-300 block">
                    Time Slot *
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white focus:outline-none cursor-pointer"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts} className="bg-black text-white">
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-sans-body font-semibold uppercase tracking-wider text-slate-300 block">
                    Number of Guests *
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white focus:outline-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16, 20].map((n) => (
                      <option key={n} value={n} className="bg-black text-white">
                        {n} {n === 1 ? 'Guest (Solo)' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Seating & Occasion */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-sans-body font-semibold uppercase tracking-wider text-slate-300 block">
                    Preferred Seating Area
                  </label>
                  <select
                    value={seatingArea}
                    onChange={(e) => setSeatingArea(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Main Dining Hall (Golden Chandeliers)" className="bg-black text-white">
                      Main Dining Hall (Golden Chandeliers)
                    </option>
                    <option value="VIP Private Dining Lounge" className="bg-black text-white">
                      VIP Private Dining Lounge (Intimate)
                    </option>
                    <option value="Outdoor Savanna Terrace" className="bg-black text-white">
                      Outdoor Savanna Terrace (Open Air)
                    </option>
                    <option value="Bar & High Top Seating" className="bg-black text-white">
                      Bar & High Top Seating
                    </option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-sans-body font-semibold uppercase tracking-wider text-slate-300 block">
                    Special Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Casual Dining" className="bg-black text-white">Casual Dining</option>
                    <option value="Birthday Celebration" className="bg-black text-white">Birthday Celebration</option>
                    <option value="Romantic Date" className="bg-black text-white">Romantic Date / Proposal</option>
                    <option value="Business / Executive Dinner" className="bg-black text-white">Business / Executive Dinner</option>
                    <option value="Wedding Anniversary" className="bg-black text-white">Wedding Anniversary</option>
                    <option value="Family Gathering" className="bg-black text-white">Family Gathering</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Special notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-sans-body font-semibold uppercase tracking-wider text-slate-300 block">
                  Dietary Restrictions or Special Requests (Optional)
                </label>
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. We require a high chair, celebrating a 40th birthday, low sodium preference..."
                  className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-[#D4A72C] text-sm text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-8 rounded-full bg-[#D4A72C] hover:bg-[#F1C75B] text-black font-sans-body font-extrabold text-xs uppercase tracking-widest shadow-[0_4px_25px_rgba(212,167,44,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <CalendarIcon className="w-4 h-4" />
                <span>Confirm Table Reservation</span>
              </button>

            </form>
          </div>

          {/* Right 4 cols: Info Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0D0D] border border-[#D4A72C]/40 space-y-6">
              <h3 className="font-serif-heading text-xl font-bold text-white border-b border-white/10 pb-4">
                Reservation Policy
              </h3>

              <div className="space-y-4 text-xs font-sans-body text-slate-300">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">15-Minute Grace Period</strong>
                    <span>Tables are held for 15 minutes past reservation time before being released.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Large Parties (8+ Guests)</strong>
                    <span>For large group banquets and private event hall rentals, our concierge will call you directly.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Complimentary Valet</strong>
                    <span>Secure parking and complimentary valet service available at the entrance.</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
                <span className="text-[11px] text-slate-400 block font-sans-body">
                  Prefer direct phone booking?
                </span>
                <a
                  href={`tel:${RESTAURANT_CONFIG.phone}`}
                  className="font-serif-heading text-lg font-bold text-[#F1C75B] block hover:underline"
                >
                  {RESTAURANT_CONFIG.phone}
                </a>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
};
