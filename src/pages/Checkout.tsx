import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth } from '../contexts/AuthContext';
import { initializePayment } from '../services/paymentService';
import { CheckoutItem } from '../types/checkout';

const challengeTiers: Record<string, CheckoutItem> = {
  standard: {
    name: 'Standard Challenge',
    description: 'Perfect for new traders starting their journey.',
    price: 299,
    features: [
      '$10,000 funded account',
      '10% profit target',
      'Maximum 5% daily drawdown',
      'Maximum 10% total drawdown',
      '30-day trading period',
      'Real-time tracking',
    ],
  },
  professional: {
    name: 'Professional Challenge',
    description: 'For experienced traders ready to scale.',
    price: 599,
    features: [
      '$80,000 funded account',
      '10% profit target',
      'Maximum 5% daily drawdown',
      'Maximum 10% total drawdown',
      '30-day trading period',
      'Priority support',
    ],
  },
  enterprise: {
    name: 'Enterprise Challenge',
    description: 'For professional traders seeking maximum opportunity.',
    price: 999,
    features: [
      '$200,000 funded account',
      '10% profit target',
      'Maximum 5% daily drawdown',
      'Maximum 10% total drawdown',
      '30-day trading period',
      'VIP support',
    ],
  },
};

const stripePromise = loadStripe('pk_test_51RDnSuQfvuwXfMVkZrlkrArQlhvciM67pQ1LvLiFDeBL9OabgPeMCZaXXoI4iLPn6grdlI9mq4YlX5skMeruwcI600s9QPWrZG');

function PaymentForm({ selectedTier }: { clientSecret: string; selectedTier: CheckoutItem }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const navigate = useNavigate();

  const handleCouponSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe) return;

    try {
      const response = await fetch('/api/validate-coupon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ couponCode }),
      });

      const data = await response.json();

      if (data.valid) {
        setDiscountAmount(data.discountAmount);
        setDiscountApplied(true);
        setError(null);
      } else {
        setError('Invalid coupon code');
        setDiscountApplied(false);
        setDiscountAmount(0);
      }
    } catch (err) {
      setError('Failed to validate coupon');
      setDiscountApplied(false);
      setDiscountAmount(0);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    const { error: submitError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard`,
      },
      redirect: 'if_required',
    });

    if (submitError) {
      setError(submitError.message || 'An error occurred with your payment');
      setProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      navigate('/dashboard', { state: { paymentSuccess: true } });
    }
  };

  const finalPrice = selectedTier.price - discountAmount;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <form onSubmit={handleCouponSubmit} className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-fundezy-red focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Apply
          </button>
        </form>

        {discountApplied && (
          <div className="p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md">
            Coupon applied! ${discountAmount} discount
          </div>
        )}
      </div>

      <PaymentElement />
      
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-fundezy-red text-white py-3 px-4 rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? 'Processing...' : `Pay $${finalPrice}`}
      </button>
    </form>
  );
}

export default function Checkout() {
  const { tier } = useParams<{ tier: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedTier = tier && challengeTiers[tier];

  useEffect(() => {
    if (!selectedTier) {
      navigate('/challenge');
      return;
    }

    const handlePaymentInitialization = async () => {
      setLoading(true);
      setError(null);
      try {
        const clientSecret = await initializePayment(
          user?.uid || 'user123',
          user?.email || 'user@example.com',
          tier || 'standard_challenge_1',
          selectedTier
        );
        setClientSecret(clientSecret);
      } catch (err: any) {
        console.log('err', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    handlePaymentInitialization();
  }, [tier, selectedTier, user, navigate]);

  if (!selectedTier) {
    return null;
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center text-gray-600 dark:text-gray-300">
          Initializing payment...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded relative">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Checkout</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Complete your payment to start the challenge
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h2>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {selectedTier.name}
              </h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                {selectedTier.description}
              </p>
              <ul className="mt-4 space-y-2">
                {selectedTier.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg
                      className="h-5 w-5 text-fundezy-red mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Total</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${selectedTier.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Payment Details
          </h2>
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm clientSecret={clientSecret} selectedTier={selectedTier} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
}