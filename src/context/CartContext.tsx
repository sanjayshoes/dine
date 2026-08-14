import React, { createContext, useContext, useState, useEffect } from 'react';
import { Dish, CartItem } from '../types';
import { RESTAURANT_CONFIG } from '../config/restaurant';

interface CartContextType {
  cart: CartItem[];
  addToCart: (dish: Dish, quantity?: number, selectedProtein?: string, spicePreference?: string, specialInstructions?: string) => void;
  removeFromCart: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  discountCode: string;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  total: number;
  totalItemsCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'savanna_bites_cart_v1';
const COUPON_STORAGE_KEY = 'savanna_bites_coupon_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [discountCode, setDiscountCode] = useState<string>(() => {
    try {
      return localStorage.getItem(COUPON_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(COUPON_STORAGE_KEY, discountCode);
    } catch (e) {
      console.error('Failed to save coupon to localStorage', e);
    }
  }, [discountCode]);

  const addToCart = (
    dish: Dish,
    quantity = 1,
    selectedProtein?: string,
    spicePreference?: string,
    specialInstructions?: string
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.dish.id === dish.id &&
          item.selectedProtein === selectedProtein &&
          item.spicePreference === spicePreference
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (specialInstructions) {
          updated[existingIndex].specialInstructions = specialInstructions;
        }
        return updated;
      } else {
        return [
          ...prev,
          {
            dish,
            quantity,
            selectedProtein,
            spicePreference,
            specialInstructions
          }
        ];
      }
    });
  };

  const removeFromCart = (dishId: string) => {
    setCart((prev) => prev.filter((item) => item.dish.id !== dishId));
  };

  const updateQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.dish.id === dishId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setDiscountCode('');
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.dish.price * item.quantity,
    0
  );

  const deliveryFee =
    cart.length === 0
      ? 0
      : subtotal >= RESTAURANT_CONFIG.delivery.freeDeliveryThreshold
      ? 0
      : RESTAURANT_CONFIG.delivery.baseFee;

  let discount = 0;
  if (discountCode) {
    const coupon = RESTAURANT_CONFIG.coupons.find(
      (c) => c.code.toUpperCase() === discountCode.toUpperCase()
    );
    if (coupon) {
      if (!coupon.minOrder || subtotal >= coupon.minOrder) {
        discount = Math.round((subtotal * coupon.discountPercent) / 100);
      }
    }
  }

  const total = Math.max(0, subtotal - discount + deliveryFee);
  const totalItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = RESTAURANT_CONFIG.coupons.find(
      (c) => c.code.toUpperCase() === cleanCode
    );

    if (!coupon) {
      return { success: false, message: 'Invalid coupon code.' };
    }

    if (coupon.minOrder && subtotal < coupon.minOrder) {
      return {
        success: false,
        message: `This coupon requires a minimum order of ₦${coupon.minOrder.toLocaleString()}.`
      };
    }

    setDiscountCode(cleanCode);
    return {
      success: true,
      message: `Coupon applied! ${coupon.discountPercent}% discount activated.`
    };
  };

  const removeCoupon = () => {
    setDiscountCode('');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        deliveryFee,
        discount,
        discountCode,
        applyCoupon,
        removeCoupon,
        total,
        totalItemsCount,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
