import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  StarIcon, 
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface TrustSignalProps {
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
}

export const TrustSignals = ({ variant = 'default', className = '' }: TrustSignalProps) => {
  const trustMetrics = [
    {
      icon: ShieldCheckIcon,
      label: 'Secure Platform',
      value: 'SSL Encrypted',
      description: 'Enterprise-grade security measures'
    },
    {
      icon: UserGroupIcon,
      label: 'Platform Type',
      value: 'Web-Based',
      description: 'Modern browser-based trading platform'
    },
    {
      icon: CurrencyDollarIcon,
      label: 'Max Funding',
      value: '$400K',
      description: 'Maximum account size available'
    },
    {
      icon: ClockIcon,
      label: 'Platform Uptime',
      value: '24/7',
      description: 'Continuous platform availability'
    }
  ];

  if (variant === 'compact') {
    return (
      <motion.div 
        className={`flex flex-wrap items-center justify-center gap-6 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {trustMetrics.slice(0, 3).map((metric, index) => (
          <motion.div
            key={metric.label}
            className="flex items-center gap-2 text-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <metric.icon className="w-4 h-4 text-fundezy-red" />
            <span className="font-medium text-google-gray dark:text-gray-300">{metric.value}</span>
            <span className="text-gray-500 dark:text-gray-400">{metric.label}</span>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (variant === 'detailed') {
    return (
      <motion.div 
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {trustMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-fundezy-red/10 dark:bg-fundezy-red/20 rounded-lg mb-4">
              <metric.icon className="w-6 h-6 text-fundezy-red" />
            </div>
            <h3 className="text-lg font-semibold text-google-gray dark:text-white mb-2">
              {metric.value}
            </h3>
            <p className="text-sm font-medium text-google-gray dark:text-gray-300 mb-1">
              {metric.label}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {metric.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div 
      className={`flex flex-wrap items-center justify-center gap-8 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {trustMetrics.slice(0, 4).map((metric, index) => (
        <motion.div
          key={metric.label}
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-center w-16 h-16 bg-fundezy-red/10 dark:bg-fundezy-red/20 rounded-full mb-3 mx-auto">
            <metric.icon className="w-8 h-8 text-fundezy-red" />
          </div>
          <div className="text-2xl font-bold text-google-gray dark:text-white">
            {metric.value}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {metric.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}; 