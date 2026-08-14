import { RESTAURANT_CONFIG } from '../config/restaurant';

interface PaystackPaymentProps {
  email: string;
  amount: number; // in Naira (will be multiplied by 100 for kobo)
  reference: string;
  customerName: string;
  phone: string;
  onSuccess: (response: { reference: string; status: string }) => void;
  onClose: () => void;
}

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: any) => {
        openIframe: () => void;
      };
    };
  }
}

export const loadPaystackScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.PaystackPop) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const initiatePaystackPayment = async (options: PaystackPaymentProps) => {
  const { email, amount, reference, customerName, phone, onSuccess, onClose } = options;
  const publicKey = RESTAURANT_CONFIG.paystackPublicKey;

  const scriptLoaded = await loadPaystackScript();

  if (scriptLoaded && window.PaystackPop && publicKey.startsWith('pk_live_')) {
    const handler = window.PaystackPop.setup({
      key: publicKey,
      email,
      amount: Math.round(amount * 100), // convert to Kobo
      ref: reference,
      currency: 'NGN',
      metadata: {
        custom_fields: [
          {
            display_name: 'Customer Name',
            variable_name: 'customer_name',
            value: customerName
          },
          {
            display_name: 'Phone Number',
            variable_name: 'phone_number',
            value: phone
          }
        ]
      },
      callback: (response: any) => {
        onSuccess({
          reference: response.reference || reference,
          status: 'success'
        });
      },
      onClose: () => {
        onClose();
      }
    });
    handler.openIframe();
  } else {
    // Development / Test Simulation or Custom Mock Gateway Modal
    // This allows testing the full checkout flow without requiring a live banking key immediately
    return 'USE_MODAL_SIMULATION';
  }
};
