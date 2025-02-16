import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { fetchMT5Account, type MT5Account } from '../services/mt5Service';
import { dashboardService, type Stats, type EquityData, type UnderwaterData, type Trade } from '../services/dashboardService';
import { MT5Credentials } from '../components/MT5Credentials';

export const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mt5Account, setMT5Account] = useState<MT5Account | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [equityData, setEquityData] = useState<EquityData[]>([]);
  const [underwaterData, setUnderwaterData] = useState<UnderwaterData[]>([]);
  const [previousTrades, setPreviousTrades] = useState<Trade[]>([]);
  const [bestTrades, setBestTrades] = useState<Trade[]>([]);
  const [worstTrades, setWorstTrades] = useState<Trade[]>([]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch MT5 account data
      let mt5Data = null;
      if (user?.email) {
        mt5Data = await fetchMT5Account(user.email);
        setMT5Account(mt5Data);
      }

      // Fetch other dashboard data
      const [
        statsData,
        equityDataResult,
        underwaterDataResult,
        tradesData,
      ] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getEquityData(),
        dashboardService.getUnderwaterData(),
        dashboardService.getTrades(),
      ]);

      setStats(statsData);
      setEquityData(equityDataResult);
      setUnderwaterData(underwaterDataResult);
      setPreviousTrades(tradesData.previousTrades);
      setBestTrades(tradesData.bestTrades);
      setWorstTrades(tradesData.worstTrades);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data. Please try again later.');
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-xl text-gray-600 dark:text-gray-300">Loading dashboard data...</div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-xl text-red-600 dark:text-red-400">{error || 'Failed to load dashboard data'}</div>
      </div>
    );
  }

  const checklistItems = [
    { label: 'More than 3 trades per day', status: stats.dailyTradeCount >= 3 },
    { label: 'Daily loss within limit', status: Math.abs(stats.dailyLossPercent) <= 5 },
    { label: 'Total loss within limit', status: Math.abs(stats.totalLossPercent) <= 10 },
    { label: 'Positive total gain', status: stats.totalGainPercent > 0 },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Rank Display */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Rank: {stats.rank}
            <span className="text-gray-500 dark:text-gray-400 text-xl"> out of {stats.totalTraders} traders</span>
          </h2>
        </div>

        {/* MT5 Credentials */}
        <MT5Credentials
          server={mt5Account?.server ?? ''}
          login={mt5Account?.login ?? ''}
          password={mt5Account?.password ?? ''}
          loading={loading}
          error={error}
          email={user?.email ?? ''}
          onRefresh={fetchDashboardData}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Equity Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Equity Balance</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={equityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <ReferenceLine y={11000} label="Passing" stroke="green" strokeDasharray="3 3" />
                    <ReferenceLine y={9000} label="Failing" stroke="red" strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="equity" stroke="#4285f4" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Trading Checklist</h3>
            <ul className="space-y-4">
              {checklistItems.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                    item.status ? 'bg-green-100 text-green-500 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {item.status ? '✓' : '✗'}
                  </span>
                  <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Consistency Score */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Trading Consistency</h3>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200 dark:text-green-300 dark:bg-green-900">
                  {stats.consistencyScore}% Consistent
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
              <div
                style={{ width: `${stats.consistencyScore}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
              ></div>
            </div>
          </div>
        </div>

        {/* Trading History */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Previous Trades */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Previous Trades</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Symbol</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Profit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {previousTrades.map((trade) => (
                    <tr key={trade.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{trade.symbol}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{trade.type}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${trade.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        ${trade.profit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Best Performed Trades */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Best Trades</h3>
            <div className="overflow-y-auto max-h-[300px]">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-white dark:bg-gray-800 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Symbol</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Profit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {bestTrades.map((trade) => (
                    <tr key={trade.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{trade.symbol}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{trade.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                        +${trade.profit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{trade.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Worst Trades */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Worst Trades</h3>
            <div className="overflow-y-auto max-h-[300px]">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-white dark:bg-gray-800 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Symbol</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Profit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {worstTrades.map((trade) => (
                    <tr key={trade.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{trade.symbol}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{trade.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400">
                        ${trade.profit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{trade.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Underwater Chart */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Drawdown Recovery</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={underwaterData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <ReferenceLine y={0} stroke="#000" />
                <Line type="monotone" dataKey="drawdown" stroke="#ff4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};