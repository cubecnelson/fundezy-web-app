import { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Chart } from 'chart.js/auto';
import { useAnalytics } from '../hooks/useAnalytics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const challengeFees = [
  { capital: 10000, fee: 299 },
  { capital: 80000, fee: 599 },
  { capital: 200000, fee: 999 }
];

const investmentHighlights = [
  {
    title: 'Innovative prop trading platform',
    description: 'Revolutionary platform targeting emerging markets with a focus on the Philippines and Brazil. Our technology enables seamless trading experiences with advanced risk management systems.',
    details: [
      'State-of-the-art trading infrastructure',
      'Advanced risk management systems',
      'Automated compliance monitoring',
      'Real-time performance tracking'
    ]
  },
  {
    title: 'B-Book to A-Book evolution',
    description: 'Strategic evolution from B-Book to A-Book model over 7 years, ensuring sustainable growth and regulatory compliance.',
    details: [
      'Phase 1: B-Book (70-80% margins)',
      'Phase 2: Hybrid model (50-60% margins)',
      'Phase 3: A-Book (30-40% margins)',
      'Full regulatory compliance by year 7'
    ]
  },
  {
    title: 'Multiple revenue streams',
    description: 'Diversified revenue model combining challenge fees, profit sharing, and proprietary trading profits.',
    details: [
      'Challenge fees ($299-$999)',
      '20% profit sharing from funded traders',
      'B-Book trading profits',
      'Future: Copy trading and educational content'
    ]
  },
  {
    title: 'Strong market growth',
    description: 'Operating in a rapidly expanding global prop trading market with significant growth potential.',
    details: [
      'Global market size: $15B',
      '25% annual growth rate',
      'Target market share: 15%',
      'Expanding trader base in emerging markets'
    ]
  }
];

export default function InvestorRelations() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [expandedHighlight, setExpandedHighlight] = useState<number | null>(null);

  useAnalytics('Investor Relations');

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        // Calculate capital growth percentages
        const valuations = [1, 5.55, 33.33, 100, 250];
        const capitalGrowth = valuations.map((val, index) => 
          index === 0 ? 0 : Number(((val - valuations[index - 1]) / valuations[index - 1] * 100).toFixed(1))
        );

        const data: ChartData<'line'> = {
          labels: ['Seeding', 'Round A', 'Round B', 'Round C', 'Round D'],
          datasets: [
            {
              label: 'Funding ($M)',
              data: [0.3, 1, 5, 15, 25],
              borderColor: '#e60000',
              backgroundColor: 'rgba(230, 0, 0, 0.2)',
              fill: false,
              yAxisID: 'y',
              tension: 0.4
            },
            {
              label: 'Valuation ($M)',
              data: valuations,
              borderColor: '#ff4444',
              backgroundColor: 'rgba(255, 68, 68, 0.2)',
              fill: false,
              yAxisID: 'y',
              tension: 0.4
            },
            {
              label: 'Capital Growth (%)',
              data: capitalGrowth,
              borderColor: '#4CAF50',
              backgroundColor: 'rgba(76, 175, 80, 0.2)',
              fill: false,
              yAxisID: 'y1',
              tension: 0.4
            }
          ]
        };

        const options: ChartOptions<'line'> = {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.dataset.label || '';
                  if (label.includes('Growth')) {
                    return `${context.parsed.y}%`;
                  }
                  return `$${context.parsed.y}M`;
                }
              }
            }
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Million USD ($)'
              },
              ticks: {
                callback: function(value) {
                  return `$${value}M`;
                }
              }
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              title: {
                display: true,
                text: 'Capital Growth (%)'
              },
              ticks: {
                callback: function(value) {
                  return `${value}%`;
                }
              },
              grid: {
                drawOnChartArea: false
              }
            }
          }
        };

        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data,
          options
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl mb-4">
            Fundezy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Revolutionizing Proprietary Trading
          </p>
          <div className="inline-flex items-center bg-fundezy-red text-white px-6 py-3 rounded-lg">
            <span className="font-semibold">Current Round: Seed Stage</span>
            <span className="mx-4">|</span>
            <span>Raising $300k at $1M Valuation</span>
          </div>
        </div>

        {/* Key Investment Highlights */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Key Investment Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentHighlights.map((highlight, index) => (
              <div 
                key={index} 
                className="relative bg-white dark:bg-gray-800 rounded-lg shadow p-6 cursor-pointer transition-all duration-300"
                onClick={() => setExpandedHighlight(expandedHighlight === index ? null : index)}
              >
                <div className="text-fundezy-red mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-900 dark:text-white font-medium mb-2">{highlight.title}</p>
                
                {/* Expandable Content */}
                <div className={`overflow-hidden transition-all duration-300 ${
                  expandedHighlight === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 mb-4">
                    {highlight.description}
                  </p>
                  <ul className="space-y-2">
                    {highlight.details.map((detail, idx) => (
                      <li key={idx} className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
                        <span className="w-1.5 h-1.5 bg-fundezy-red rounded-full mr-2"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expand/Collapse Indicator */}
                <div className={`absolute bottom-4 right-4 text-fundezy-red transition-transform duration-300 ${
                  expandedHighlight === index ? 'transform rotate-180' : ''
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Model */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Business Model
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Challenge Fees
              </h3>
              <ul className="space-y-3">
                {challengeFees.map((tier) => (
                  <li key={tier.capital} className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>${tier.capital.toLocaleString()} capital:</span>
                    <span className="font-semibold">${tier.fee}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Profit Sharing
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                20% profit retention from funded traders creates a recurring revenue stream.
              </p>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded">
                <p className="text-sm">Example: $10,000 profit = $2,000 firm share</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Evolution Strategy
              </h3>
              <ul className="space-y-2">
                <li className="text-gray-600 dark:text-gray-300">• Phase 1: B-Book (70-80% margins)</li>
                <li className="text-gray-600 dark:text-gray-300">• Phase 2: Hybrid (50-60% margins)</li>
                <li className="text-gray-600 dark:text-gray-300">• Phase 3: A-Book (30-40% margins)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Investment Journey Chart */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Investment Journey & Growth
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="h-[400px]">
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        </div>

        {/* Use of Funds */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Use of Funds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Team Development', amount: '20%', value: '$200,000' },
              { title: 'Technology', amount: '20%', value: '$200,000' },
              { title: 'Marketing', amount: '30%', value: '$300,000' },
              { title: 'Liquidity Reserve', amount: '30%', value: '$300,000' }
            ].map((fund, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {fund.title}
                </h3>
                <p className="text-fundezy-red text-2xl font-bold mb-2">{fund.amount}</p>
                <p className="text-gray-600 dark:text-gray-300">{fund.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Returns Table */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Investment Returns Projection
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Investment Round
                  </th>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Investment Amount
                  </th>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Equity %
                  </th>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Value at Round D
                  </th>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Return Multiple
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    Seed ($1M valuation)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    $300,000
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    30%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400 font-medium">
                    $75M
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400 font-medium">
                    250x
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    Round A ($8M valuation)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    $1,000,000
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    12%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400 font-medium">
                    $45M
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400 font-medium">
                    45x
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    Round B ($33.33M valuation)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    $5,000,000
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    15%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400 font-medium">
                    $37.5M
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400 font-medium">
                    7.5x
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    Round C ($100M valuation)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    $15,000,000
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    15%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400 font-medium">
                    $37.5M
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400 font-medium">
                    2.5x
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            * Projections based on target valuation of $250M at Round D. Actual returns may vary. Past performance does not guarantee future results.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Join Our Investment Round
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Minimum investment: $50,000
          </p>
          <a
            href="mailto:investors@fundezy.com"
            className="inline-flex items-center bg-fundezy-red text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Contact Investment Team
          </a>
        </div>
      </div>
    </div>
  );
}