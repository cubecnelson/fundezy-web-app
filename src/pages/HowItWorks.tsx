export const HowItWorks = () => {
  const steps = [
    {
      name: 'Step 1: Fundezy Challenge',
      description: 'Complete our evaluation process by reaching a 10% profit target while adhering to our risk management rules.',
      details: [
        'Trade for 30 days',
        'Reach 10% profit target',
        'Maximum 5% daily loss',
        'Maximum 10% total loss',
      ],
    },
    {
      name: 'Step 2: Verification',
      description: 'Prove your consistency by completing a second phase with a lower profit target.',
      details: [
        'Trade for 60 days',
        'Reach 5% profit target',
        'Same risk management rules',
        'Demonstrate consistent trading',
      ],
    },
    {
      name: 'Step 3: Funded Account',
      description: 'Start trading with our capital and keep up to 80% of your profits.',
      details: [
        'Receive funded account',
        'Up to 80% profit split',
        'Scale up to $400,000',
        'Regular payouts',
      ],
    },
  ];

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Our three-step process is designed to identify skilled traders and provide them with the capital they need to succeed.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {steps.map((step) => (
              <div key={step.name} className="flex flex-col">
                <dt className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                  {step.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">{step.description}</p>
                  <div className="mt-6">
                    <ul role="list" className="space-y-4">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex gap-x-3">
                          <svg
                            className="mt-1 h-5 w-5 flex-none text-fundezy-red"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-600 dark:text-gray-300">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};