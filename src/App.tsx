import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { OrderHistoryProvider } from './context/OrderHistoryContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { DishModal } from './components/common/DishModal';
import { CartDrawer } from './components/common/CartDrawer';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

// Pages
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { DishDetailPage } from './pages/DishDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReservationPage } from './pages/ReservationPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { Dish, DishCategory, Order } from './types';

export function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [selectedDishForModal, setSelectedDishForModal] = useState<Dish | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<DishCategory | 'all'>('all');
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Sync route with browser hash / history if needed
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.hash ? window.location.hash.replace('#', '') : '/';
      setCurrentRoute(path || '/');
    };

    window.addEventListener('popstate', handlePopState);
    if (window.location.hash) {
      handlePopState();
    }
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: string) => {
    setCurrentRoute(route);
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDishDetails = (dish: Dish) => {
    setSelectedDishForModal(dish);
  };

  const handleSelectCategory = (categoryId: DishCategory) => {
    setActiveCategory(categoryId);
  };

  const handleOrderCompleted = (order: Order) => {
    setLastPlacedOrder(order);
    navigate(`/order-success/${order.orderNumber}`);
  };

  // Router renderer
  const renderCurrentPage = () => {
    if (currentRoute === '/') {
      return (
        <HomePage
          onNavigate={navigate}
          onSelectCategory={handleSelectCategory}
          onOpenDishDetails={handleOpenDishDetails}
        />
      );
    }

    if (currentRoute === '/menu' || currentRoute.startsWith('/menu/category/')) {
      const categoryFromUrl = currentRoute.startsWith('/menu/category/')
        ? (currentRoute.replace('/menu/category/', '') as DishCategory)
        : activeCategory;
      return (
        <MenuPage
          initialCategory={categoryFromUrl}
          onOpenDishDetails={handleOpenDishDetails}
        />
      );
    }

    if (currentRoute.startsWith('/menu/') && !currentRoute.startsWith('/menu/category/')) {
      const segment = currentRoute.replace('/menu/', '');
      // Check if it's a category like /menu/rice-meals or a dish
      const knownCategories: string[] = [
        'rice-meals', 'african-specials', 'grills-bbq', 'soups-swallow', 
        'small-chops', 'pastries-bakes', 'drinks-elixirs', 'sweet-desserts'
      ];
      if (knownCategories.includes(segment)) {
        return (
          <MenuPage
            initialCategory={segment as DishCategory}
            onOpenDishDetails={handleOpenDishDetails}
          />
        );
      } else {
        // Individual item detail route
        return (
          <DishDetailPage
            dishSlug={segment}
            onNavigate={navigate}
            onOpenDishDetails={handleOpenDishDetails}
          />
        );
      }
    }

    if (currentRoute === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    if (currentRoute === '/gallery') {
      return <GalleryPage onNavigate={navigate} />;
    }

    if (currentRoute === '/reservation') {
      return <ReservationPage onNavigate={navigate} />;
    }

    if (currentRoute === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }

    if (currentRoute === '/faq') {
      return <FAQPage onNavigate={navigate} />;
    }

    if (currentRoute === '/cart') {
      return <CartPage onNavigate={navigate} />;
    }

    if (currentRoute === '/checkout') {
      return (
        <CheckoutPage
          onNavigate={navigate}
          onOrderCompleted={handleOrderCompleted}
        />
      );
    }

    if (currentRoute.startsWith('/order-success')) {
      return (
        <OrderSuccessPage
          order={lastPlacedOrder}
          onNavigate={navigate}
        />
      );
    }

    if (currentRoute === '/favorites') {
      return (
        <FavoritesPage
          onNavigate={navigate}
          onOpenDishDetails={handleOpenDishDetails}
        />
      );
    }

    if (currentRoute === '/privacy') {
      return <LegalPage initialTab="privacy" onNavigate={navigate} />;
    }

    if (currentRoute === '/terms') {
      return <LegalPage initialTab="terms" onNavigate={navigate} />;
    }

    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <CartProvider>
      <FavoritesProvider>
        <OrderHistoryProvider>
          <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans-body selection:bg-[#D4A72C] selection:text-black">
            
            {/* Global Navbar */}
            <Navbar
              currentRoute={currentRoute}
              onNavigate={navigate}
              onOpenSearch={() => setIsSearchOpen(true)}
            />

            {/* Main Content Area */}
            <main className="flex-1">
              {renderCurrentPage()}
            </main>

            {/* Global Footer */}
            <Footer onNavigate={navigate} />

            {/* Dish Quick-View & Customization Modal */}
            <DishModal
              dish={selectedDishForModal}
              onClose={() => setSelectedDishForModal(null)}
              onNavigate={navigate}
            />

            {/* Global Slide-Over Cart Drawer */}
            <CartDrawer onNavigate={navigate} />

            {/* Global Instant Search Modal */}
            <GlobalSearchModal
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              onSelectDish={(dish) => {
                setSelectedDishForModal(dish);
              }}
            />

          </div>
        </OrderHistoryProvider>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
