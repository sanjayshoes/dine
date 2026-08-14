import { Dish, ContactInfo } from '../types';

import heroBg from '../assets/images/hero_nebula_restaurant_1786617378054.jpg';
import nebulaEggsImg from '../assets/images/nebula_eggs_1786617388894.jpg';
import cyberSalmonImg from '../assets/images/cyber_salmon_1786617400211.jpg';
import stellarSteakImg from '../assets/images/stellar_steak_1786617411647.jpg';
import zeroGravityCocktailImg from '../assets/images/zero_gravity_cocktail_1786617423333.jpg';

export { heroBg };

export const BRAND_LOGO_URL = "https://i.ibb.co/xtfQMV9j/Chat-GPT-Image-Aug-14-2026-10-41-16-AM.png";

export const CONTACT_INFO: ContactInfo = {
  address: "221B Neon Street, Neo-Tokyo",
  hours: "Daily · 18:00 – 02:00",
  email: "stellar@nebula.rest",
  phone: "+0 800 555 0199"
};

export const DISHES: Dish[] = [
  {
    id: "nebula-eggs",
    name: "Nebula Eggs",
    category: "starters",
    description: "Sous-vide with black truffle crust & 24k gold leaf, resting on warm kelp-infused foam.",
    price: 38,
    image: nebulaEggsImg,
    tags: ["Sous-vide", "Black Truffle", "24k Gold Leaf"],
    calories: 320,
    sensoryNotes: "Umani explosion with velvety earthy undertones and crisp mineral finish.",
    isPopular: true
  },
  {
    id: "cyber-salmon",
    name: "Cyber Salmon",
    category: "mains",
    description: "Miso-glazed king salmon, sparkling yuzu pearls, and airy wasabi nitrogen foam.",
    price: 46,
    image: cyberSalmonImg,
    tags: ["Miso-Glazed", "Yuzu Caviar", "Wasabi Foam"],
    calories: 540,
    sensoryNotes: "Silky citrus sharpness perfectly balancing caramelised rich umami glaze.",
    isPopular: true
  },
  {
    id: "stellar-steak",
    name: "Stellar Steak",
    category: "mains",
    description: "Wagyu A5 charcoal-ash crusted medallion served with fermented black garlic reduction.",
    price: 72,
    image: stellarSteakImg,
    tags: ["Wagyu A5", "Charcoal Ash", "Black Garlic"],
    calories: 780,
    sensoryNotes: "Melt-in-mouth marbling paired with deep oak-smoked garlic complexity.",
    isPopular: true
  },
  {
    id: "zero-gravity-cocktail",
    name: "Zero-Gravity Cocktail",
    category: "cocktails",
    description: "Nitro-infused gin elixir with bioluminescent blue butterfly pea, edible flowers, and dry ice mist.",
    price: 24,
    image: zeroGravityCocktailImg,
    tags: ["Nitro-Infused", "Dry Ice Mist", "Botanical"],
    calories: 180,
    sensoryNotes: "Refreshing botanical lavender aroma with a crisp, electrifying effervescence.",
    isPopular: true
  },
  {
    id: "quantum-tartare",
    name: "Quantum Tartare",
    category: "starters",
    description: "Hand-cut bluefin tuna, pickled sea grapes, yuzu ponzu gel, and 3D-printed lotus crisp.",
    price: 42,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    tags: ["Raw Bar", "Yuzu Ponzu", "3D Crisp"],
    calories: 290,
    sensoryNotes: "Briny ocean crunch paired with citrusy floral acidity.",
    isPopular: false
  },
  {
    id: "plasma-gelato",
    name: "Plasma Infused Gelato",
    category: "desserts",
    description: "Liquid nitrogen dark chocolate sphere with flashing raspberry dust & matcha plasma core.",
    price: 28,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
    tags: ["Liquid Nitrogen", "Matcha Core", "Raspberry Dust"],
    calories: 410,
    sensoryNotes: "Decadent bittersweet cacao melting into chillingly smooth matcha cream.",
    isPopular: false
  }
];

export const SEATING_ZONES = [
  { id: "pod-alpha", name: "Pod Alpha (Private Gravity Chamber)", desc: "Isolated floating capsule with direct kitchen view" },
  { id: "holographic-hall", name: "Holographic Main Dining Hall", desc: "Surrounded by responsive 360° celestial light displays" },
  { id: "chef-counter", name: "Molecular Chef Counter", desc: "Interactive front seat with live nitrogen & flame plating" }
];

export const TIME_SLOTS = [
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"
];
