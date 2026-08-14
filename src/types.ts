export type DishCategory = 
  | 'rice-meals'
  | 'african-specials'
  | 'grills'
  | 'soups'
  | 'small-chops'
  | 'pastries'
  | 'drinks'
  | 'desserts';

export interface CategoryInfo {
  id: DishCategory;
  name: string;
  shortDesc: string;
  iconName: string;
  image: string;
}

export interface Dish {
  id: string;
  slug: string;
  name: string;
  category: DishCategory;
  price: number;
  description: string;
  longDescription?: string;
  image: string;
  ingredients: string[];
  tags: string[];
  featured?: boolean;
  available: boolean;
  isSignature?: boolean;
  spicyLevel?: number; // 0 (Mild) to 3 (Fiery)
  prepTime?: string;
  calories?: number;
  servingSize?: string;
  allergens?: string[];
  pairedDrink?: string;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  selectedProtein?: string;
  spicePreference?: string;
  specialInstructions?: string;
}

export interface ReservationData {
  name: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  time: string;
  occasion: string;
  seatingZone: string;
  specialRequests?: string;
}

export type OrderStatus = 'received' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    landmark?: string;
    notes?: string;
  };
  subtotal: number;
  deliveryFee: number;
  discount: number;
  discountCode?: string;
  total: number;
  paymentMethod: 'paystack' | 'whatsapp';
  paymentStatus: 'pending' | 'paid' | 'verified_on_delivery';
  status: OrderStatus;
  estimatedDelivery?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'food' | 'restaurant' | 'behind-the-scenes' | 'events' | 'drinks' | 'people';
  image: string;
  description: string;
  highlightTag?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string;
  dishLoved: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'ordering' | 'delivery' | 'payments' | 'reservations' | 'food-dietary' | 'catering';
}
