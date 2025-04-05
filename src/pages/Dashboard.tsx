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
import { DemoAccount, fetchDemoAccountAssignedTo, fetchMT5Account, type MT5Account } from '../services/mt5Service';
import { dashboardService, type Stats, type EquityData, type UnderwaterData, type Trade } from '../services/dashboardService';
import { MT5Credentials } from '../components/MT5Credentials';
import { RankingsTable, type RankingType } from '../components/RankingsTable';
import { PlusIcon } from '@heroicons/react/24/outline';
import mockRankingsData from '../data/mockRankingsData.json';
import TeamUserTable from '../components/TeamUserTable';
export const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mt5Accounts, setMT5Accounts] = useState<MT5Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<MT5Account | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [equityData, setEquityData] = useState<EquityData[]>([]);
  const [underwaterData, setUnderwaterData] = useState<UnderwaterData[]>([]);
  const [previousTrades, setPreviousTrades] = useState<Trade[]>([]);
  const [bestTrades, setBestTrades] = useState<Trade[]>([]);
  const [worstTrades, setWorstTrades] = useState<Trade[]>([]);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [rankingType, setRankingType] = useState<RankingType>('daily');
  const [teamUsers, setTeamUsers] = useState<DemoAccount[]>([]);


  useEffect(() => {
    if (user?.email) {
      fetchUserAccounts();
    }
  }, [user?.email]);

  useEffect(() => {
    if (selectedAccount?.id) {
      fetchTeamUsers(selectedAccount?.id);
    }
  }, [selectedAccount?.id]);

  const fetchTeamUsers = async (mt5AccountId: string) => {
    try {
      const demoAccounts = await fetchDemoAccountAssignedTo(mt5AccountId);
      setTeamUsers(demoAccounts);
    } catch (error) {
      console.error('Error fetching team users:', error);
      setTeamUsers([]);
    }
  };


  const fetchUserAccounts = async () => {
    setLoading(true);
    try {
      if (!user?.email) {
        throw new Error('User email is required');
      }
      
      const accounts = await fetchMT5Account(user.email);
      setMT5Accounts(accounts);
      
      // Select the first active account by default
      const activeAccount = accounts.find((acc: MT5Account) => acc.status === 'active');
      if (activeAccount) {
        setSelectedAccount(activeAccount);
        await fetchDashboardData(activeAccount.id);
        
      }
    } catch (err) {
      console.error('Error fetching MT5 accounts:', err);
      setError('Failed to load your trading accounts');
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardData = async (mdAccountId: string) => {
    try {
      const [
        statsData,
        equityDataResult,
        underwaterDataResult,
        tradesData,
      ] = await Promise.all([
        dashboardService.getStats(mdAccountId),
        dashboardService.getEquityData(mdAccountId),
        dashboardService.getUnderwaterData(mdAccountId),
        dashboardService.getTrades(mdAccountId),
      ]);

      setStats(statsData);
      setEquityData(equityDataResult);
      setUnderwaterData(underwaterDataResult);
      setPreviousTrades(tradesData.previousTrades);
      setBestTrades(tradesData.bestTrades);
      setWorstTrades(tradesData.worstTrades);
      setError(null);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    }
  };

  const handleCreateAccount = () => {
    setSelectedAccount(null);
    setShowCreateAccount(true);
  };

  const handleAccountCreated = async () => {
    await fetchUserAccounts();
    setShowCreateAccount(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-xl text-gray-600 dark:text-gray-300">Loading dashboard data...</div>
      </div>
    );
  }

  const checklistItems = stats ? [
    { label: 'More than 3 trades per day', status: stats.dailyTradeCount >= 3 },
    { label: 'Daily loss within limit', status: Math.abs(stats.dailyLossPercent) <= 5 },
    { label: 'Total loss within limit', status: Math.abs(stats.totalLossPercent) <= 10 },
    { label: 'Positive total gain', status: stats.totalGainPercent > 0 },
  ] : [];

  const activeAccounts = mt5Accounts.filter(account => account.status === 'active');
  const showDemoAccountSection = activeAccounts.length < 3;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Get Demo Account Section - Only show if less than 3 active accounts */}
        {showDemoAccountSection && (
          <div className="mb-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-12">
            <div className="text-center">
              <button
                onClick={handleCreateAccount}
                className="inline-flex items-center justify-center p-4 rounded-full bg-fundezy-red text-white hover:bg-red-600 transition-colors"
              >
                <PlusIcon className="h-8 w-8" />
              </button>
              <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                Get a Free Demo Account
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Start trading with virtual funds and prove your skills
              </p>
            </div>
          </div>
        )}

        {/* MT5 Accounts List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Your Trading Accounts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mt5Accounts.map((account) => (
              <button
                key={account.id}
                onClick={() => {
                  setSelectedAccount(account);
                  setShowCreateAccount(false);
                }}
                className={`p-4 rounded-lg border ${
                  selectedAccount?.id === account.id
                    ? 'border-fundezy-red bg-fundezy-red/10 dark:bg-fundezy-red/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-fundezy-red hover:bg-fundezy-red/5 dark:hover:bg-fundezy-red/10'
                } transition-colors`}
              >
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white">
                      Login: {account.login}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Server: {account.server}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    account.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {account.status}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* MT5 Credentials for Create Account */}
        {showCreateAccount && (
          <MT5Credentials
            server=""
            login=""
            password=""
            loading={false}
            error={null}
            email={user?.email ?? ''}
            status="active"
            onRefresh={handleAccountCreated}
          />
        )}

        {/* Rankings Table */}
        <div className="mb-8">
          <RankingsTable
            rankings={mockRankingsData[rankingType]}
            type={rankingType}
            onTypeChange={setRankingType}
          />
        </div>

        {/* Selected Account Dashboard */}
        {selectedAccount && (
          <>
            {/* MT5 Credentials */}
            <MT5Credentials
              server={selectedAccount.server}
              login={selectedAccount.login}
              password={selectedAccount.password}
              loading={loading}
              error={error}
              email={user?.email ?? ''}
              status={selectedAccount.status}
              onRefresh={fetchUserAccounts}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Equity Chart */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    Equity Balance
                  </h3>
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
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Trading Checklist
                </h3>
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

            {/* Trading History */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              {/* Previous Trades */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Previous Trades</h3>
                {previousTrades.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400">
                    No trades yet. Start trading to see your history.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {previousTrades.map((trade) => (
                      <div key={trade.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                          {trade.date} at {trade.time}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <span className="text-gray-900 dark:text-white font-medium">{trade.symbol}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              trade.type === 'BUY' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            }`}>
                              {trade.type}
                            </span>
                          </div>
                          <span className={`font-medium ${
                            trade.profit >= 0 
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            ${trade.profit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Best Performed Trades */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Best Trades</h3>
                {bestTrades.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400">
                    Complete some trades to see your best performers.
                  </p>
                ) : (
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
                )}
              </div>

              {/* Worst Trades */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Worst Trades</h3>
                {worstTrades.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400">
                    Complete some trades to see areas for improvement.
                  </p>
                ) : (
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
                )}
              </div>
            </div>

            {/* Underwater Chart */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Drawdown Recovery
              </h3>
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
          </>
        )}

        {teamUsers && teamUsers.length > 0 && <div className="mt-8">
          <TeamUserTable teamUsers={teamUsers} />
        </div>}
      </div>
    </div>
  );
};

export default Dashboard;