export interface RestaurantConfig {
  name: string;
  tagline: string;
  logoUrl: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  city: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  openingHours: {
    days: string;
    diningHours: string;
    deliveryHours: string;
    weekendHours: string;
  };
  socialLinks: {
    instagram: string;
    facebook: string;
    tiktok: string;
    whatsapp: string;
    twitter?: string;
  };
  currency: {
    symbol: string;
    code: string;
  };
  delivery: {
    baseFee: number;
    freeDeliveryThreshold: number;
    estimatedMinutes: string;
    coverageAreas: string[];
  };
  paystackPublicKey: string;
  coupons: {
    code: string;
    discountPercent: number;
    description: string;
    minOrder?: number;
  }[];
}

export const WHATSAPP_NUMBER = "2349163357393";
export const RESTAURANT_PHONE = "09163357393";

export const RESTAURANT_CONFIG: RestaurantConfig = {
  name: "SAVANNA BITES",
  tagline: "TASTE THE HEART OF AFRICA",
  logoUrl: "https://i.ibb.co/xtfQMV9j/Chat-GPT-Image-Aug-14-2026-10-41-16-AM.png",
  phone: RESTAURANT_PHONE,
  whatsappNumber: WHATSAPP_NUMBER, // International format for wa.me URL
  email: "reservations@savannabites.com",
  address: "Plot 18A, Admirals Way, Lekki Phase 1 / Victoria Island",
  city: "Lagos",
  country: "Nigeria",
  coordinates: {
    lat: 6.4474,
    lng: 3.4723
  },
  openingHours: {
    days: "Monday – Sunday",
    diningHours: "11:00 AM – 11:00 PM",
    deliveryHours: "11:00 AM – 10:30 PM",
    weekendHours: "11:00 AM – 12:00 Midnight"
  },
  socialLinks: {
    instagram: "https://instagram.com/savannabites",
    facebook: "https://facebook.com/savannabites",
    tiktok: "https://tiktok.com/@savannabites",
    whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`
  },
  currency: {
    symbol: "₦",
    code: "NGN"
  },
  delivery: {
    baseFee: 1500,
    freeDeliveryThreshold: 35000,
    estimatedMinutes: "35 – 50 mins",
    coverageAreas: [
      "Victoria Island",
      "Lekki Phase 1 & 2",
      "Ikoyi",
      "Oniru",
      "Banana Island",
      "Ikeja GRA",
      "Maryland"
    ]
  },
  paystackPublicKey: (import.meta as any).env?.VITE_PAYSTACK_PUBLIC_KEY || "pk_test_savannabites_live_gateway",
  coupons: [
    {
      code: "SAVANNA10",
      discountPercent: 10,
      description: "10% off your entire order"
    },
    {
      code: "WELCOME20",
      discountPercent: 20,
      description: "20% off welcome tasting discount (orders above ₦20,000)",
      minOrder: 20000
    },
    {
      code: "FEAST15",
      discountPercent: 15,
      description: "15% off family & party platters",
      minOrder: 30000
    }
  ]
};

export const formatNaira = (amount: number): string => {
  return `${RESTAURANT_CONFIG.currency.symbol}${amount.toLocaleString('en-NG')}`;
};
