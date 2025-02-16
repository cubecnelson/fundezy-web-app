export const Home = () => {
  const features = [
    'Trade with up to $100,000 funded account',
    'Keep up to 80% of your profits',
    'Advanced trading platform',
    'Real-time performance tracking',
    'Professional support team',
    'Scale your account up to $400,000',
  ];

  return (
    <div className="relative isolate">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-google-gray sm:text-6xl">
            Trade with Our Capital, Keep Your Profits
          </h1>
          <p className="mt-6 text-lg leading-8 text-google-gray">
            Join thousands of successful traders who have proven their skills and now trade with our capital. Start your journey to becoming a funded trader today.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a href="/challenge" className="btn-primary">
              Start the Challenge
            </a>
            <a href="/how-it-works" className="btn-secondary">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature} className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-google-blue"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base leading-7 text-google-gray">{feature}</span>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};