export interface Dish {
  id: string;
  name: string;
  category: 'starters' | 'mains' | 'cocktails' | 'desserts';
  description: string;
  price: number;
  image: string;
  tags: string[];
  calories?: number;
  sensoryNotes?: string;
  isPopular?: boolean;
}

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  zone: string;
  specialRequests?: string;
}

export interface ContactInfo {
  address: string;
  hours: string;
  email: string;
  phone: string;
}
