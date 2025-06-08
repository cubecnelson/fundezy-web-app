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
import { DemoAccount, fetchDemoAccountAssignedTo, fetchMT5Account, type TradingAccount } from '../services/mt5Service';
import { dashboardService, type Stats, type EquityData, type UnderwaterData, type Trade } from '../services/dashboardService';
import { Credentials } from '../components/MT5Credentials';
import { RankingsTable, type RankingType } from '../components/RankingsTable';
import { PlusIcon } from '@heroicons/react/24/outline';
import TeamUserTable from '../components/TeamUserTable';
import { Challenge, challengeService } from '../services/challengeService';
import { useAnalytics } from '../hooks/useAnalytics';
import { getRankings, type Ranking } from '../services/rankingService';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { ChallengeTracker } from '../components/ChallengeTracker';
import { mttAccountService } from '../services/mttAccountService';
import { mttTradingAccountService } from '../services/mttTradingAccountService';
import { isUniversityEmail } from '../utils/domainCheck';
import { UniversityDomainPopup } from '../components/UniversityDomainPopup';

export const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mt5Accounts, setMT5Accounts] = useState<TradingAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<TradingAccount | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [equityData, setEquityData] = useState<EquityData[]>([]);
  const [underwaterData, setUnderwaterData] = useState<UnderwaterData[]>([]);
  const [previousTrades, setPreviousTrades] = useState<Trade[]>([]);
  const [bestTrades, setBestTrades] = useState<Trade[]>([]);
  const [worstTrades, setWorstTrades] = useState<Trade[]>([]);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [rankingType, setRankingType] = useState<RankingType>('daily');
  const [teamUsers, setTeamUsers] = useState<DemoAccount[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [showUniversityPopup, setShowUniversityPopup] = useState(false);

  useAnalytics('Dashboard');

  useEffect(() => {
    // Check for payment success state
    if (location.state?.paymentSuccess) {
      setShowPaymentSuccess(true);
      // Clear the state to prevent showing the message again on refresh
      navigate(location.pathname, { replace: true });
      // Hide the success message after 5 seconds
      const timer = setTimeout(() => {
        setShowPaymentSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state, navigate]);

  useEffect(() => {
    // Check for showCreateAccount state from navigation
    if (location.state?.showCreateAccount) {
      setShowCreateAccount(true);
      
      // Clear the state to prevent showing the overlay again on refresh
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (user?.email) {
      fetchUserAccounts();
      fetchRankings();
    }
  }, [user?.email]);

  useEffect(() => {
      const challengeIdList = mt5Accounts.map((account) => account.challengeId).filter((id) => id !== undefined);
      fetchChallenges(challengeIdList);
  }, [mt5Accounts]);

  useEffect(() => {
    if (selectedAccount?.id) {
      fetchTeamUsers(selectedAccount?.id);

      fetchDashboardData(selectedAccount.login);
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

  const fetchChallenges = async (challengeIdList: string[]) => {
    if (challengeIdList.length <= 0) return;
    try {
      const challenges = await challengeService.getAllChallenges();
      const filteredChallenges = challenges.filter((challenge) => challengeIdList.includes(challenge.id));
      setChallenges(filteredChallenges);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  }

  const fetchUserAccounts = async () => {
    setLoading(true);
    try {
      if (!user?.email) {
        throw new Error('User email is required');
      }
      var accounts: TradingAccount[] = [];
      const mt5Accounts = await fetchMT5Account(user.email);
      accounts = [...mt5Accounts];
      try {
        
        const mttTradingAccountsPromise =  mttTradingAccountService.getTradingAccountByEmail(user.email);
        const mttAccountPromise = mttAccountService.getAccountByEmail(user.email);
        const result = await Promise.all([mttAccountPromise, mttTradingAccountsPromise]);
        const mttTradingAccounts = result[1];
        const mttAccount = result[0];

        // Transform MTT accounts into MT5Account format
        const transformedMTTAccounts: TradingAccount[] = mttTradingAccounts.map(mttTradingAccount => ({
          id: mttTradingAccount.id,
          server: 'MTT', // Default server for MTT accounts
          login: mttAccount.email || '', // Use login if available, otherwise empty string
          password: mttAccount.password || '', // MTT accounts don't have password
          email: mttAccount.email || '', // Ensure email is always a string
          status: 'active',
          createdAt: {
            _seconds: new Date(mttTradingAccount.created).getTime() / 1000,
            _nanoseconds: 0
          },
          updatedAt: {
            _seconds: new Date(mttTradingAccount.created).getTime() / 1000, // Use created time as updated time if not available
            _nanoseconds: 0
          },
          demoAccountId: undefined,
          challengeId: undefined
        }));

        // Combine both MT5 and MTT accounts
        accounts = [...accounts, ...transformedMTTAccounts];
       
      } catch (error) {
        console.error('Error fetching MTT accounts:', error);
      }

      setMT5Accounts(accounts);

      const activeAccount = accounts.find((acc: TradingAccount) => acc.status === 'active');

      if (activeAccount) {
        setSelectedAccount(activeAccount);
      }
      
      
      // Select the first active account by default
      
    } catch (err) {
      console.error('Error fetching MT5 accounts:', err);
      setError('Failed to load your trading accounts');
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardData = async (mt5Login: string) => {
    try {
      const data = await dashboardService.getDashboardTradeData(mt5Login);
      const statsData = data.tradingMetrics;
      const equityDataResult = data.equityData;
      const underwaterDataResult = data.underwaterData;
      const tradesData = data.tradeHistory;

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

  const handleCreateAccount = async () => {
    if (user?.email && isUniversityEmail(user.email)) {
      setShowUniversityPopup(true);
      return;
    }
    setSelectedAccount(null);
    setShowCreateAccount(true);
  };

  const handleAccountCreated = async () => {
    try {
      await fetchUserAccounts();
    } catch (error) {
      console.error('Error fetching user accounts:', error);
      setError('Failed to fetch user accounts');
    } finally {
      setShowCreateAccount(false);
    }
  };

  const fetchRankings = async () => {
    try {
      const rankingsData = await getRankings();
      setRankings(rankingsData);
    } catch (error) {
      console.error('Error fetching rankings:', error);
      setError('Failed to fetch rankings');
    }
  };

  // const handleOpenWebTerminal = () => {
  //   if (user?.email && isUniversityEmail(user.email)) {
  //     setShowUniversityPopup(true);
  //     return;
  //   }
  //   // ... rest of the existing handleOpenWebTerminal code ...
  // };

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
  const demoAccounts = activeAccounts.filter(account => account.demoAccountId !== undefined);
  const showDemoAccountSection = demoAccounts.length < 2 || (demoAccounts.length < 3 && activeAccounts.some(account => account.challengeId !== undefined));



  const selectedAccountIsEducation = selectedAccount?.challengeId && challenges.find(c => c.id === selectedAccount.challengeId)?.isEducation;
  const selectedAccountDisplayDashboard = selectedAccount?.challengeId && challenges.find(c => c.id === selectedAccount.challengeId)?.displayDashboard;

  const selectedChallenge = selectedAccount?.challengeId 
    ? challenges.find(c => c.id === selectedAccount.challengeId)
    : null;

  console.log('selectedChallenge', selectedChallenge, selectedChallenge?.startDate?.toDate());

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Payment Success Message */}
        {showPaymentSuccess && (
          <div className="mb-8 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-lg flex items-center">
            <CheckCircleIcon className="h-6 w-6 mr-2" />
            <span>Payment successful! Your trading account will be activated shortly.</span>
          </div>
        )}

        {/* Get Demo Account Section - Only show if less than 3 active accounts */}
        {showDemoAccountSection && (
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8 ">
              {/* Demo Account Button */}
              <div className="text-center dark:bg-gray-800 mb-8 bg-gray-50 rounded-lg p-12">
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
          </div>
        )}

        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 ">
            {/* Telegram Channel Section */}
            <div className="text-center dark:bg-gray-800 mb-8 bg-gray-50 rounded-lg p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex justify-center w-full md:w-auto">
                    <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
                    </svg>
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Join Our Telegram Channel
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Stay updated with the latest trading tips, news, and community discussions.
                    </p>
                  </div>
                </div>
                <a
                  href="https://t.me/+Lm5np0Y6R9RhZDM9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#0088cc] hover:bg-[#0077b3] text-white rounded-md transition-colors"
                >
                  Join Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* MT5 Accounts List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Your Trading Accounts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {...mt5Accounts.map((account) => (
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
                    <div className='h-6'>
                    {account.challengeId && (
                      challenges.find(c => c.id === account.challengeId)?.isEducation ? (
                        <span className="inline-flex items-center mt-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          Education
                        </span>
                      ) : (
                        <span className="inline-flex items-center mt-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                          Challenge
                        </span>
                      )
                    )}
                    </div>
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
          <Credentials
            server=""
            login=""
            password=""
            firstName={user?.displayName?.split(' ')[0] ?? ''}
            lastName={user?.displayName?.split(' ').slice(1).join(' ') ?? ''}
            loading={false}
            error={null}
            email={user?.email ?? ''}
            status="active"
            onRefresh={handleAccountCreated}
          />
        )}

        {/* Rankings Table */}
        {selectedAccountIsEducation && selectedAccountDisplayDashboard && (
          <div className="mb-8">
            <RankingsTable
              rankings={rankings.sort((a, b) => a.rank - b.rank).map(ranking => ({
                rank: ranking.rank,
                teamName: `${ranking.teamName} (${ranking.mt5Login})`,
                equityBalance: ranking.equityBalance,
                rankChange: ranking.rankChange
              }))}
              type={rankingType}
              onTypeChange={setRankingType}
            />
          </div>
        )}

        {/* Selected Account Dashboard */}
        {selectedAccount && (
          <>
            {/* Challenge Tracker */}
            {selectedChallenge && stats && (
              <div className="mb-8">
                <ChallengeTracker
                  challengeStartDate={selectedChallenge.startDate?.toDate()}
                  challengeEndDate={selectedChallenge.endDate?.toDate()}
                  currentProfit={stats.totalGainPercent}
                  profitTarget={selectedChallenge.profitTarget ?? 0}
                  dailyLoss={stats.dailyLossPercent}
                  totalLoss={stats.totalLossPercent}
                />
              </div>
            )}

            {/* MT5 Credentials */}
            <Credentials
              firstName={user?.displayName?.split(' ')[0] ?? ''}
              lastName={user?.displayName?.split(' ').slice(1).join(' ') ?? ''}
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
          {selectedAccountDisplayDashboard &&  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                      { equityData[0]?.passingMark && <ReferenceLine y={equityData[0]?.passingMark} label="Passing" stroke="green" strokeDasharray="3 3" />}
                      { equityData[0]?.failingMark && <ReferenceLine y={equityData[0]?.failingMark} label="Failing" stroke="red" strokeDasharray="3 3" />}
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
            </div>}

            {/* Trading History */}
          {selectedAccountDisplayDashboard &&  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
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
            </div>}

            {/* Underwater Chart */}
            {selectedAccountDisplayDashboard &&  <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
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
            </div>}
          </>
        )}
        

        {teamUsers && teamUsers.length > 0 && <div className="mt-8">
          <TeamUserTable teamUsers={teamUsers} />
        </div>}
      </div>

      {/* University Domain Popup */}
      <UniversityDomainPopup
        isOpen={showUniversityPopup}
        onClose={() => setShowUniversityPopup(false)}
      />
    </div>
  );
};

export default Dashboard;