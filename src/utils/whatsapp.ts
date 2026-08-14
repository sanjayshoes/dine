import { CartItem } from '../types';
import { RESTAURANT_CONFIG, formatNaira } from '../config/restaurant';

export interface WhatsAppOrderPayload {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount?: number;
  total: number;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  deliveryAddress?: string;
  city?: string;
  orderNumber?: string;
  notes?: string;
}

/**
 * Generates the official Savanna Bites WhatsApp order message
 * conforming precisely to the required brand format.
 */
export const generateWhatsAppOrderMessage = (payload: WhatsAppOrderPayload): string => {
  const {
    items,
    subtotal,
    deliveryFee,
    discount = 0,
    total
  } = payload;

  const itemsList = items
    .map((item, index) => {
      const itemTotal = item.dish.price * item.quantity;
      const customization = item.selectedProtein ? ` (${item.selectedProtein})` : '';
      return `${index + 1}. ${item.dish.name}${customization} × ${item.quantity} — ${formatNaira(itemTotal)}`;
    })
    .join('\n');

  let summaryLines = `Subtotal: ${formatNaira(subtotal)}`;
  if (discount > 0) {
    summaryLines += `\nDiscount: -${formatNaira(discount)}`;
  }
  summaryLines += `\nDelivery: ${formatNaira(deliveryFee)}`;
  summaryLines += `\nTotal: ${formatNaira(total)}`;

  return `Hello Savanna Bites 👋

I would like to place an order.

*MY ORDER*

${itemsList}

*ORDER SUMMARY*

${summaryLines}

Please confirm my order and provide the next steps.

Thank you.
Savanna Bites — Taste the Heart of Africa ❤️`;
};

/**
 * Constructs the wa.me WhatsApp URL with encoded message
 */
export const generateWhatsAppUrl = (payload: WhatsAppOrderPayload): string => {
  const message = generateWhatsAppOrderMessage(payload);
  const encoded = encodeURIComponent(message);
  const cleanPhone = RESTAURANT_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
};

/**
 * Opens WhatsApp order destination safely across mobile and desktop
 */
export const openWhatsAppOrder = (payload: WhatsAppOrderPayload) => {
  if (!payload.items || payload.items.length === 0) return;
  const url = generateWhatsAppUrl(payload);
  
  if (typeof window !== 'undefined') {
    // Open in a new tab/window on desktop; allows mobile devices to launch the WhatsApp app
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = url;
    }
  }
};

