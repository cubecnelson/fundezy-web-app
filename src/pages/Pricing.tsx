import { useEffect, useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { WaitingListModal } from '../components/WaitingListModal';
import { useAnalytics } from '../hooks/useAnalytics';
import { getAccountByEmail, getChallenges } from '../services/matchTraderService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
const tiersMap = {
  "26135048-f2ce-48ad-a633-df3646eb48ad": (initialBalance: number, fee: number) => ({
    name: 'Special Challenge',
    id: 'tier-special',
    priceMonthly: fee,
    description: 'Perfect for traders starting with a smaller account.',
    features: [
      `$${initialBalance} funded account`,
      '10% profit target',
      'Maximum 5% daily drawdown',
      'Maximum 10% total drawdown',
      '30-day trading period',
      'Real-time tracking',
    ],
    featured: false,
  }),
  "7cc659d9-04a0-42c0-a946-9eed8ee9ae13": (initialBalance: number, fee: number) => ({
    name: 'Standard Challenge',
    id: 'tier-standard',
    priceMonthly: fee,
    description: 'Ideal for new traders beginning their journey.',
    features: [
      `$${initialBalance} funded account`,
      '10% profit target',
      'Maximum 5% daily drawdown',
      'Maximum 10% total drawdown',
      '30-day trading period',
      'Real-time tracking',
    ],
    featured: false,
  }),
  "fea61522-6f51-4b24-8f79-9836518d59b3": (initialBalance: number, fee: number) => ({
    name: 'Professional Challenge',
    id: 'tier-professional',
    priceMonthly: fee,
    description: 'For skilled traders looking to grow further.',
    features: [
      `$${initialBalance} funded account`,
      '10% profit target',
      'Maximum 5% daily drawdown',
      'Maximum 10% total drawdown',
      '30-day trading period',
      'Real-time tracking',
    ],
    featured: true,
  }),
 "2a965ca0-7612-4fcf-af2a-cc3717858799": (initialBalance: number, fee: number) => ({
    name: 'Enterprise Challenge',
    id: 'tier-enterprise',
    priceMonthly: fee,
    description: 'For advanced traders pursuing greater potential.',
    features: [
      `$${initialBalance} funded account`,
      '10% profit target',
      'Maximum 5% daily drawdown',
      'Maximum 10% total drawdown',
      '30-day trading period',
      'Real-time tracking',
    ],
    featured: false,
  }),
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Pricing() {

  const { user } = useAuth();
  const [tiers, setTiers] = useState<any[]>([]);
  const [isWaitingListOpen, setIsWaitingListOpen] = useState(false);
  useAnalytics('Pricing');
  const navigate = useNavigate();


  const fetchChallenges = async () => {
    const challenges = await getChallenges();
    const activeChallenges = challenges.filter((c) => c.isHidden === false);
    console.log(activeChallenges);
    setTiers(activeChallenges.sort((a, b) => a.fee - b.fee).map((c) => {
      const tierFunction = tiersMap[c.challengeId as keyof typeof tiersMap];
      return tierFunction ? tierFunction(c.phases[0].initialBalance, c.fee) : null;
    }).filter((t) => t != null));
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  const handleGetStarted = async () => {
    if (!user) {
      navigate('/signin');
      return;
    }

    if (!user.email) {
      console.error('User email is missing');
      navigate('/signin');
      return;
    }

    try {
      // Check if user has a matchTrader account
      const mttAccount = await getAccountByEmail(user.email);

      if (mttAccount) {
        // User has matchTrader account, redirect to platform
        window.open("https://platform.fundezy.io", "_blank");
      } else {
        // User doesn't have matchTrader account, redirect to dashboard
        navigate('/dashboard', { state: { showCreateAccount: true } });
      }
    } catch (error) {
      console.error('Error checking matchTrader account:', error);
      // If there's an error, assume user doesn't have an account and redirect to dashboard
      navigate('/dashboard', { state: { showCreateAccount: true } });
    }
  };

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
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-x-8">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.featured ? 'ring-2 ring-fundezy-red' : 'ring-1 ring-gray-200 dark:ring-gray-700',
                'rounded-3xl p-8 xl:p-10 bg-white dark:bg-gray-800 flex flex-col h-full', 'flex justify-between'
              )}
            >
              <div>
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
                  {tier.features.map((feature: string) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-fundezy-red" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={handleGetStarted}
                className={classNames(
                  tier.featured
                    ? 'bg-fundezy-red text-white shadow-sm hover:bg-red-600'
                    : 'text-fundezy-red ring-1 ring-inset ring-fundezy-red hover:ring-red-600 dark:ring-red-500 dark:hover:ring-red-400',
                  'mt-8 block w-full rounded-md py-2 px-3 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fundezy-red'
                )}
              >
                Get Started
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