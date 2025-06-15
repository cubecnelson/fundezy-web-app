import { useAnalytics } from '../hooks/useAnalytics';
import { motion } from 'framer-motion';
import { 
  TrophyIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  PlayIcon,
  BanknotesIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';

export const Home = () => {
  useAnalytics('Home');

  const stats = [
    { number: '$400,000', label: 'Max Funding', icon: BanknotesIcon },
    { number: 'Up to 80%', label: 'Profit Split', icon: ChartBarIcon },
    { number: '24/7', label: 'Platform Uptime', icon: UserGroupIcon },
    { number: '2024', label: 'Platform Launch', icon: CurrencyDollarIcon },
  ];

  const features = [
    {
      icon: ShieldCheckIcon,
      title: 'Risk Management',
      description: 'Advanced risk management tools and real-time monitoring to protect your account.',
      color: 'text-blue-500'
    },
    {
      icon: ArrowTrendingUpIcon,
      title: 'Scale Your Success',
      description: 'Scale your account up to $400,000 as you prove your trading consistency.',
      color: 'text-green-500'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Transparent Pricing',
      description: 'Clear and straightforward pricing with no hidden fees or surprise charges.',
      color: 'text-fundezy-red'
    },
    {
      icon: ChartBarIcon,
      title: 'Performance Tracking',
      description: 'Real-time analytics and detailed reporting to monitor your trading progress.',
      color: 'text-purple-500'
    },
  ];

  const tradingBenefits = [
    'Trade with up to $400,000 funded account',
    'Keep up to 80% of your profits',
    'Advanced trading platform access',
    'Real-time performance tracking',
    'Scale your account as you prove consistency',
    'Multiple asset classes available',
    'Clear drawdown and profit targets',
    'Transparent challenge requirements'
  ];

  const pricingPlans = [
    {
      name: 'Standard Challenge',
      amount: '$25,000',
      price: '$150',
      popular: false,
      features: ['10% profit target', 'Max 5% daily drawdown', 'Max 10% total drawdown', '30-day trading period']
    },
    {
      name: 'Professional Challenge',
      amount: '$100,000',
      price: '$500',
      popular: true,
      features: ['10% profit target', 'Max 5% daily drawdown', 'Max 10% total drawdown', '30-day trading period', 'Real-time tracking']
    },
    {
      name: 'Enterprise Challenge',
      amount: '$400,000',
      price: '$1,500',
      popular: false,
      features: ['10% profit target', 'Max 5% daily drawdown', 'Max 10% total drawdown', '30-day trading period', 'Advanced analytics']
    }
  ];

  const platformFeatures = [
    {
      title: 'Advanced Technology',
      description: 'Built with modern web technologies for optimal performance and security.',
      icon: ArrowTrendingUpIcon,
      details: 'React, TypeScript, and real-time data processing'
    },
    {
      title: 'Transparent Rules',
      description: 'Clear, straightforward trading rules with no hidden conditions or surprises.',
      icon: CheckCircleIcon,
      details: 'All terms clearly defined and easily accessible'
    },
    {
      title: 'Secure Platform',
      description: 'Enterprise-grade security measures to protect your data and trading activity.',
      icon: ShieldCheckIcon,
      details: 'SSL encryption and secure authentication'
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="relative isolate overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-gray-950 dark:via-gray-900 dark:to-black">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-fundezy-red/10 to-purple-600/10 dark:from-fundezy-red/5 dark:to-purple-600/5"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
        
        {/* Floating Elements */}
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 bg-fundezy-red/20 rounded-full blur-xl"
          animate={{ 
            y: [-20, 20, -20],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute top-40 right-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"
          animate={{ 
            y: [20, -20, 20],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <motion.div 
            className="mx-auto max-w-4xl text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
                         {/* Trust Badge */}
             <motion.div
               variants={fadeInUp}
               className="mb-8"
             >
               <div className="inline-flex items-center px-4 py-2 bg-fundezy-red/10 dark:bg-fundezy-red/20 rounded-full border border-fundezy-red/20">
                 <ShieldCheckIcon className="w-4 h-4 text-fundezy-red mr-2" />
                 <span className="text-sm font-medium text-fundezy-red">Secure & Transparent Trading Platform</span>
               </div>
             </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl font-bold tracking-tight text-white sm:text-7xl"
            >
              Trade with Our Capital,
              <span className="block bg-gradient-to-r from-fundezy-red to-red-400 bg-clip-text text-transparent">
                Keep Your Profits
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={fadeInUp}
              className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto"
            >
              Join the elite community of funded traders. Prove your skills, get funded up to $400,000, 
              and keep up to 80% of your profits. Start your journey to financial freedom today.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="mt-10 flex items-center justify-center gap-x-6 flex-wrap"
            >
              <motion.a 
                href="/pricing" 
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-fundezy-red rounded-lg hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <TrophyIcon className="w-5 h-5 mr-2" />
                Start Trading Challenge
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ zIndex: -1 }}
                />
              </motion.a>
              
              <motion.a 
                href="/how-it-works" 
                className="group inline-flex items-center text-lg text-gray-300 hover:text-white transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <PlayIcon className="w-5 h-5 mr-2" />
                How It Works
                <motion.span 
                  className="ml-1 group-hover:ml-2 transition-all duration-300"
                  aria-hidden="true"
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={fadeInUp}
              className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-fundezy-red/10 rounded-lg mb-4">
                    <stat.icon className="w-6 h-6 text-fundezy-red" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-base font-semibold leading-7 text-fundezy-red">Why Choose Fundezy</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-google-gray dark:text-white sm:text-4xl">
              Everything you need to succeed as a funded trader
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              We provide the tools, capital, and support you need to take your trading to the next level.
            </p>
          </motion.div>
          
          <motion.div 
            className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                             {features.map((feature) => (
                 <motion.div 
                   key={feature.title}
                   variants={fadeInUp}
                   className="group relative"
                 >
                  <dt className="text-base font-semibold leading-7 text-google-gray dark:text-white">
                    <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 group-hover:shadow-lg transition-all duration-300`}>
                      <feature.icon className={`h-8 w-8 ${feature.color} transition-transform duration-300 group-hover:scale-110`} aria-hidden="true" />
                    </div>
                    {feature.title}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>
        </div>
      </section>

      {/* Trading Benefits Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight text-google-gray dark:text-white sm:text-4xl mb-4">
                Your Trading Advantages
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Everything you need to maximize your trading potential
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
                             {tradingBenefits.map((benefit) => (
                 <motion.div 
                   key={benefit}
                   variants={fadeInUp}
                   className="flex items-start gap-x-3 p-4 rounded-lg bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                 >
                  <CheckCircleIcon className="h-6 w-6 flex-none text-fundezy-red mt-0.5" />
                  <span className="text-base leading-7 text-google-gray dark:text-gray-200">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-google-gray dark:text-white sm:text-4xl">
              Choose Your Challenge
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Select the funding level that matches your trading goals
            </p>
          </motion.div>
          
          <motion.div 
            className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                variants={fadeInUp}
                className={`relative rounded-3xl p-8 shadow-2xl ring-1 ${
                  plan.popular 
                    ? 'bg-fundezy-red text-white ring-fundezy-red scale-105 lg:scale-110' 
                    : 'bg-white dark:bg-gray-800 text-google-gray dark:text-white ring-gray-200 dark:ring-gray-700'
                } ${index === 1 ? 'lg:z-10' : ''}`}
              >
                {plan.popular && (
                  <p className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-3 py-2 text-sm font-medium text-white text-center">
                    Most Popular
                  </p>
                )}
                <div className="text-center">
                  <h3 className={`text-lg font-semibold leading-8 ${plan.popular ? 'text-white' : 'text-google-gray dark:text-white'}`}>
                    {plan.name}
                  </h3>
                  <p className={`mt-4 text-sm leading-6 ${plan.popular ? 'text-red-100' : 'text-gray-600 dark:text-gray-400'}`}>
                    Get funded with
                  </p>
                  <p className={`mt-6 flex items-baseline justify-center gap-x-2`}>
                    <span className={`text-4xl font-bold tracking-tight ${plan.popular ? 'text-white' : 'text-google-gray dark:text-white'}`}>
                      {plan.amount}
                    </span>
                  </p>
                  <p className={`mt-2 text-lg font-semibold ${plan.popular ? 'text-red-100' : 'text-gray-600 dark:text-gray-400'}`}>
                    for {plan.price}
                  </p>
                </div>
                <ul className={`mt-8 space-y-3 text-sm leading-6 ${plan.popular ? 'text-red-100' : 'text-gray-600 dark:text-gray-300'}`}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckCircleIcon className={`h-6 w-5 flex-none ${plan.popular ? 'text-white' : 'text-fundezy-red'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.a
                  href="/pricing"
                  className={`mt-8 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-300 ${
                    plan.popular
                      ? 'bg-white text-fundezy-red hover:bg-gray-100 focus-visible:outline-white'
                      : 'bg-fundezy-red text-white shadow-sm hover:bg-red-600 focus-visible:outline-fundezy-red'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

             {/* Platform Features Section */}
       <section className="py-24 bg-gray-50 dark:bg-gray-800">
         <div className="mx-auto max-w-7xl px-6 lg:px-8">
           <motion.div
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="mx-auto max-w-2xl text-center"
           >
             <h2 className="text-3xl font-bold tracking-tight text-google-gray dark:text-white sm:text-4xl">
               Built for Modern Trading
             </h2>
             <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
               Our platform combines cutting-edge technology with transparent operations
             </p>
           </motion.div>
           
           <motion.div 
             className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
             initial="initial"
             whileInView="animate"
             viewport={{ once: true }}
             variants={staggerContainer}
           >
             {platformFeatures.map((feature) => (
               <motion.div
                 key={feature.title}
                 variants={fadeInUp}
                 className="flex flex-col justify-between bg-white dark:bg-gray-700 p-8 shadow-lg rounded-2xl"
               >
                 <div>
                   <div className="flex items-center justify-center w-12 h-12 bg-fundezy-red/10 dark:bg-fundezy-red/20 rounded-lg mb-6">
                     <feature.icon className="w-6 h-6 text-fundezy-red" />
                   </div>
                   <h3 className="text-xl font-semibold text-google-gray dark:text-white mb-4">
                     {feature.title}
                   </h3>
                   <p className="text-lg leading-8 text-google-gray dark:text-gray-200 mb-4">
                     {feature.description}
                   </p>
                   <p className="text-sm text-gray-600 dark:text-gray-400">
                     {feature.details}
                   </p>
                 </div>
               </motion.div>
             ))}
           </motion.div>
         </div>
       </section>

      {/* CTA Section */}
      <section className="relative isolate px-6 py-24 sm:py-32 lg:px-8 bg-gradient-to-br from-fundezy-red to-red-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Start Your Funded Trading Journey?
            </h2>
                         <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-red-100">
               Start your journey with our transparent trading platform designed for serious traders seeking capital.
             </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <motion.a
                href="/pricing"
                className="bg-white px-8 py-4 text-lg font-semibold text-fundezy-red shadow-sm hover:bg-gray-100 rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Challenge Now
              </motion.a>
              <motion.a
                href="/how-it-works"
                className="text-lg font-semibold leading-6 text-white hover:text-red-100 transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                Learn more <span aria-hidden="true">→</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};