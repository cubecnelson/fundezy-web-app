import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { WaitingListModal } from '../components/WaitingListModal';
import { TermsAcceptanceFlow } from '../components/TermsAcceptanceFlow';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const tiers = [
  {
    name: 'Standard',
    id: 'standard',
    price: '299',
    description: 'Perfect for new traders starting their journey.',
    features: [
      '$10,000 funded account',
      '10% profit target',
      'Maximum 5% daily drawdown',
      'Maximum 10% total drawdown',
      '30-day trading period',
      'Real-time tracking',
    ],
    featured: false,
    isAvailable: true,
  },
  {
    name: 'Professional',
    id: 'professional',
    price: '599',
    description: 'For experienced traders ready to scale.',
    features: [
      '$80,000 funded account',
      '10% profit target',
      'Maximum 5% daily drawdown',
      'Maximum 10% total drawdown',
      '30-day trading period',
      'Priority support',
    ],
    featured: true,
    isAvailable: true,
  },
  {
    name: 'Enterprise',
    id: 'enterprise',
    price: '999',
    description: 'For professional traders seeking maximum opportunity.',
    features: [
      '$200,000 funded account',
      '10% profit target',
      'Maximum 5% daily drawdown',
      'Maximum 10% total drawdown',
      '30-day trading period',
      'VIP support',
    ],
    featured: false,
    isAvailable: true,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Challenge() {
  const [isWaitingListOpen, setIsWaitingListOpen] = useState(false);
  const [isTermsFlowOpen, setIsTermsFlowOpen] = useState(false);
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleDemoSignUp = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signin');
    }
  };

  const handleSelectChallenge = (tierId: string) => {
    setSelectedTierId(tierId);
    setIsTermsFlowOpen(true);
  };

  const handleTermsComplete = () => {
    setIsTermsFlowOpen(false);
    if (user) {
      navigate(`/checkout/${selectedTierId}`);
    } else {
      navigate('/signin', { state: { redirectTo: `/checkout/${selectedTierId}` } });
    }
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-fundezy-red">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Choose your Challenge
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 dark:text-gray-300">
          Select your preferred account size and start your journey to becoming a funded trader.
        </p>

        {/* Demo Account Box */}
        <div className="mt-16 mb-12">
          <div className="rounded-3xl p-8 xl:p-10 bg-gradient-to-r from-fundezy-red/10 to-fundezy-red/5 dark:from-fundezy-red/20 dark:to-fundezy-red/10 border border-fundezy-red/20 dark:border-fundezy-red/30">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-fundezy-red mb-2">Try Demo Account - Free</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Start with up to $200,000 virtual account. Practice your trading strategies risk-free for 4 weeks.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-x-2 text-gray-600 dark:text-gray-300">
                    <CheckIcon className="h-5 w-5 text-fundezy-red" />
                    No credit card required
                  </li>
                  <li className="flex items-center gap-x-2 text-gray-600 dark:text-gray-300">
                    <CheckIcon className="h-5 w-5 text-fundezy-red" />
                    Full platform access
                  </li>
                  <li className="flex items-center gap-x-2 text-gray-600 dark:text-gray-300">
                    <CheckIcon className="h-5 w-5 text-fundezy-red" />
                    Real-time market data
                  </li>
                </ul>
              </div>
              <button
                onClick={handleDemoSignUp}
                className="bg-fundezy-red text-white px-8 py-3 rounded-md hover:bg-red-600 transition-colors font-semibold"
              >
                Sign up now
              </button>
            </div>
          </div>
        </div>

        {/* Challenge Tiers */}
        <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.featured ? 'ring-2 ring-fundezy-red' : 'ring-1 ring-gray-200 dark:ring-gray-700',
                'rounded-3xl p-8 xl:p-10 bg-white dark:bg-gray-800'
              )}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3
                  id={tier.id}
                  className={classNames(
                    tier.featured ? 'text-fundezy-red' : 'text-gray-900 dark:text-white',
                    'text-lg font-semibold leading-8'
                  )}
                >
                  {tier.name}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">${tier.price}</span>
                <span className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-300">/challenge</span>
              </p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-fundezy-red" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              {tier.isAvailable ? (
              <button
                onClick={() => handleSelectChallenge(tier.id)}
                className={classNames(
                  tier.featured
                    ? 'bg-fundezy-red text-white shadow-sm hover:bg-red-600'
                    : 'text-fundezy-red ring-1 ring-inset ring-fundezy-red hover:ring-red-600 dark:ring-red-500 dark:hover:ring-red-400',
                  'mt-8 block w-full rounded-md py-2 px-3 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fundezy-red'
                )}
              >
                Get Started
              </button>
              ) : (
              <button
                onClick={() => setIsWaitingListOpen(true)}
                className={classNames(
                  tier.featured
                    ? 'bg-fundezy-red text-white shadow-sm hover:bg-red-600'
                    : 'text-fundezy-red ring-1 ring-inset ring-fundezy-red hover:ring-red-600 dark:ring-red-500 dark:hover:ring-red-400',
                  'mt-8 block w-full rounded-md py-2 px-3 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fundezy-red'
                )}
              >
                  Join Waiting List
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <WaitingListModal
        isOpen={isWaitingListOpen}
        onClose={() => setIsWaitingListOpen(false)}
      />

      <TermsAcceptanceFlow
        isOpen={isTermsFlowOpen}
        onClose={() => setIsTermsFlowOpen(false)}
        onComplete={handleTermsComplete}
      />
    </div>
  );
}