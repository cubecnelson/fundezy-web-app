import { CheckoutItem } from '../types/checkout';
import { getApiUrl } from '../config/env.config';

const PAYMENT_URL = getApiUrl('PAYMENTS');

export const initializePayment = async (userId: string, userEmail: string, tierId: string, tier: CheckoutItem) => {
    console.log('initializePayment', JSON.stringify({
            userId,
            tierId,
            tier,
            userEmail,
        }));
  try {
    const response = await fetch(`${PAYMENT_URL}/create-payment-intent`, {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userEmail,
            userId,
            tierId,
            tier,
        }),
    });
    console.log('response', response);
    const data = await response.json();

    if (!response.ok) {
        // console.log('response', response);
        throw new Error(data.message || 'Failed to initialize payment');
    }

    return data.clientSecret;
  } catch (err: any) {
    throw new Error(err.message);
  }
}; 