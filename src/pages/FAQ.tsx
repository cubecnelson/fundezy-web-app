import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string | React.ReactNode;
}

const faqData: FAQItem[] = [
  // General Questions
  {
    id: 1,
    category: 'General Questions',
    question: 'What is Fundezy.io?',
    answer: 'Fundezy.io is a platform designed to help individuals and teams access funding opportunities quickly and efficiently.'
  },
  {
    id: 2,
    category: 'General Questions',
    question: 'Who can use Fundezy.io?',
    answer: 'Anyone looking for funding opportunities, including students, researchers, and entrepreneurs, can use Fundezy.io.'
  },

  // Account and Verification
  {
    id: 4,
    category: 'Account and Verification',
    question: 'How do I create an account?',
    answer: 'Simply sign up using your email address and follow the instructions to verify your account.'
  },
  {
    id: 5,
    category: 'Account and Verification',
    question: 'Do I need to verify my identity?',
    answer: 'Yes, identity verification is required to ensure a secure and trustworthy platform.'
  },

  // Challenge Overview
  {
    id: 10,
    category: 'Challenge Overview',
    question: 'What is the Fundezy Challenge?',
    answer: 'The Fundezy Challenge is a three-step evaluation process designed to assess and fund traders. Participants must meet profit targets and adhere to strict risk management rules to qualify for a funded account.'
  },
  {
    id: 11,
    category: 'Challenge Overview',
    question: 'What are the steps in the Fundezy Challenge?',
    answer: (
      <>
        <p>The Fundezy Challenge consists of three steps:</p>
        <ol className="list-decimal ml-6 mt-2">
          <li>Evaluation – Trade for 30 days, reach a 10% profit target, and follow risk management rules (maximum 5% daily loss and 10% total loss).</li>
          <li>Verification – Trade for 60 days, reach a 5% profit target, and demonstrate consistent trading while following the same risk management rules.</li>
          <li>Funded Account – Start trading with Fundezy's capital, keep up to 80% of profits, and scale up to $400,000.</li>
        </ol>
      </>
    )
  },

  // Rules and Requirements
  {
    id: 12,
    category: 'Rules and Requirements',
    question: 'What happens if I fail to meet the profit target in Step 1 or Step 2?',
    answer: 'If you fail to meet the profit target within the specified time, you will not pass the challenge. You can restart the challenge by reapplying.'
  },
  {
    id: 13,
    category: 'Rules and Requirements',
    question: 'What happens if I exceed the 5% daily loss or 10% total loss limits?',
    answer: 'Exceeding either the daily or total loss limits will result in immediate disqualification from the challenge.'
  },
  {
    id: 14,
    category: 'Rules and Requirements',
    question: 'Can I use any trading strategy?',
    answer: 'Yes, you are free to use any trading strategy as long as it adheres to the risk management rules.'
  },

  // Trading and Profit Details
  {
    id: 15,
    category: 'Trading and Profit Details',
    question: 'How is the profit target calculated?',
    answer: 'The profit target is calculated based on the initial account balance provided at the start of the challenge.'
  },
  {
    id: 16,
    category: 'Trading and Profit Details',
    question: 'How is the profit split calculated in the funded account phase?',
    answer: 'In the funded account phase, you will keep up to 80% of the profits you generate. The exact percentage will depend on the agreement with Fundezy.'
  },
  {
    id: 17,
    category: 'Trading and Profit Details',
    question: 'Can I scale up to $400,000 immediately after Step 3?',
    answer: 'Scaling up to $400,000 is a gradual process based on your performance and consistency. You will need to meet specific milestones to increase your account size.'
  },

  // Support and Assistance
  {
    id: 18,
    category: 'Support and Assistance',
    question: 'Who can I contact for support?',
    answer: 'You can reach out to our support team via email for assistance.'
  },
  {
    id: 19,
    category: 'Support and Assistance',
    question: 'Where can I find more information?',
    answer: 'Visit our Help Center or FAQ section for detailed guides and answers.'
  },

  // Other Questions
  {
    id: 20,
    category: 'Other Questions',
    question: 'Is Fundezy.io available globally?',
    answer: 'Yes, Fundezy.io is accessible to users worldwide.'
  },
  {
    id: 21,
    category: 'Other Questions',
    question: 'Can I withdraw funds directly?',
    answer: 'Yes, once your funding is approved, you will receive instructions on how to access the funds.'
  },
  {
    id: 22,
    category: 'Other Questions',
    question: 'Are there any restrictions on how I use the funds?',
    answer: 'Some funding options may have specific terms and conditions. Please review them carefully before applying.'
  }
];

const highlightText = (text: string, query: string) => {
  if (!query) return text;
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, i) => 
    part.toLowerCase() === query.toLowerCase() ? 
      <span key={i} className="bg-yellow-500 text-black">{part}</span> : 
      part
  );
};

const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const categories = ['All', ...new Set(faqData.map(faq => faq.category))];

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const renderAnswer = (answer: string | React.ReactNode) => {
    if (typeof answer === 'string') {
      return highlightText(answer, searchQuery);
    }
    return answer;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-black text-gray-900 dark:text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            How can we help you?
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
            Find answers to frequently asked questions about Fundezy's investment platform.
          </p>
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full px-12 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-fundezy-red border border-gray-200 dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 19L14.65 14.65"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Category Buttons */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full transition-colors duration-200 ${
                activeCategory === category
                  ? 'bg-fundezy-red text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence>
            {filteredFAQs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-4"
              >
                <div
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden cursor-pointer border border-gray-200 dark:border-gray-700"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <div className="p-6 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {highlightText(faq.question, searchQuery)}
                    </h3>
                    <svg
                      className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${
                        expandedItems.includes(faq.id) ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  <AnimatePresence>
                    {expandedItems.includes(faq.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-6 pb-6 text-gray-600 dark:text-gray-300"
                      >
                        {renderAnswer(faq.answer)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default FAQ; 