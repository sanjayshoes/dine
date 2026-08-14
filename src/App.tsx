import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ReservationSection } from './components/ReservationSection';
import { Footer } from './components/Footer';
import { Dish } from './types';

export default function App() {
  const [preOrderedDishes, setPreOrderedDishes] = useState<Dish[]>([]);

  const handlePreOrderDish = (dish: Dish) => {
    setPreOrderedDishes((prev) => {
      const exists = prev.some((d) => d.id === dish.id);
      if (exists) {
        return prev.filter((d) => d.id !== dish.id);
      }
      return [...prev, dish];
    });
  };

  const handleRemovePreOrderedDish = (dishId: string) => {
    setPreOrderedDishes((prev) => prev.filter((d) => d.id !== dishId));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0d15] text-slate-100 font-['Inter',sans-serif] selection:bg-cyan-500 selection:text-black relative overflow-x-hidden">
      
      {/* Top Navbar */}
      <Navbar onReserveClick={() => scrollToSection('reserve')} />

      {/* Main Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          onReserveClick={() => scrollToSection('reserve')}
          onExploreMenuClick={() => scrollToSection('menu')}
        />

        {/* 2. Menu Section */}
        <MenuSection
          onPreOrderDish={handlePreOrderDish}
          preOrderedDishIds={preOrderedDishes.map((d) => d.id)}
        />

        {/* 3. Experience & Pod Customizer Section */}
        <ExperienceSection />

        {/* 4. Contact / Reservation Split Section */}
        <ReservationSection
          preOrderedDishes={preOrderedDishes}
          onRemovePreOrderedDish={handleRemovePreOrderedDish}
        />
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}
