import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { WaitingListModal } from '../components/WaitingListModal';
import { useAnalytics } from '../hooks/useAnalytics';

const tiers = [
  {
    name: 'Standard Challenge',
    id: 'tier-standard',
    priceMonthly: 299,
    description: 'Ideal for new traders beginning their journey.',
    features: [
      '$10,000 funded account',
      '10% profit target',
      'Maximum 5% daily drawdown',
      'Maximum 10% total drawdown',
      '30-day trading period',
      'Real-time tracking',
      'Basic support',
    ],
    featured: false,
  },
  {
    name: 'Professional Challenge',
    id: 'tier-professional',
    priceMonthly: 599,
    description: 'For skilled traders looking to grow further.',
    features: [
      '$80,000 funded account',
      '10% profit target',
      'Maximum 5% daily drawdown',
      'Maximum 10% total drawdown',
      '30-day trading period',
      'Real-time tracking',
      'Priority support',
      'Advanced analytics',
    ],
    featured: true,
  },
  {
    name: 'Enterprise Challenge',
    id: 'tier-enterprise',
    priceMonthly: 999,
    description: 'For advanced traders pursuing greater potential.',
    features: [
      '$200,000 funded account',
      '10% profit target',
      'Maximum 5% daily drawdown',
      'Maximum 10% total drawdown',
      '30-day trading period',
      'Real-time tracking',
      'VIP support',
      'Advanced analytics',
      'One-on-one mentoring',
      'Custom scaling plan',
    ],
    featured: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Pricing() {
  const [isWaitingListOpen, setIsWaitingListOpen] = useState(false);
  useAnalytics('Pricing');

  return (
    <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-fundezy-red">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Pricing plans for traders of all levels
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Choose the account size that matches your trading goals and experience level.
          </p>
        </div>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
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
                <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                  ${tier.priceMonthly}
                </span>
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
            </div>
          ))}
        </div>
      </div>

      <WaitingListModal
        isOpen={isWaitingListOpen}
        onClose={() => setIsWaitingListOpen(false)}
      />
    </div>
  );
}