import { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon, MinusIcon } from '@heroicons/react/24/outline';

export type RankingType = 'daily' | 'cumulative' | 'event';

export interface TeamRanking {
  rank: number;
  teamName: string;
  equityBalance: number;
  rankChange: number;
}

interface RankingsTableProps {
  rankings: TeamRanking[];
  type: RankingType;
  onTypeChange: (type: RankingType) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-HK', {
    style: 'currency',
    currency: 'HKD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const getRankChangeIcon = (change: number) => {
  if (change > 0) {
    return <ChevronUpIcon className="h-5 w-5 text-green-500" />;
  } else if (change < 0) {
    return <ChevronDownIcon className="h-5 w-5 text-red-500" />;
  }
  return <MinusIcon className="h-5 w-5 text-gray-400" />;
};

const getRankBadge = (rank: number) => {
  switch (rank) {
    case 1:
      return '🏆';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return null;
  }
};

export const RankingsTable = ({ rankings, type, onTypeChange }: RankingsTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredRankings = rankings.filter(team =>
    team.teamName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRankings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedRankings = filteredRankings.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Team Performance Rankings
          </h2>
          {/* <div className="flex items-center gap-4">
            <select
              value={type}
              onChange={(e) => onTypeChange(e.target.value as RankingType)}
              className="rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-fundezy-red focus:border-fundezy-red"
            >
              <option value="daily">Daily</option>
              <option value="cumulative">Cumulative</option>
              <option value="event">Event</option>
            </select>
            <input
              type="text"
              placeholder="Search teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-fundezy-red focus:border-fundezy-red"
            />
          </div> */}
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Team Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Equity Balance
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Net Profit %
              </th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Rank Change
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {displayedRankings.map((team) => (
              <tr
                key={team.teamName}
                className={`${
                  team.rank <= 10 ? 'bg-gray-50 dark:bg-gray-700' : ''
                } hover:bg-gray-100 dark:hover:bg-gray-600`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  <div className="flex items-center">
                    {getRankBadge(team.rank)}
                    <span className="ml-1">{team.rank}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {team.teamName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {formatCurrency(team.equityBalance)}
                </td>
                {/* <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  team.netProfitPercentage >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {team.netProfitPercentage >= 0 ? '+' : ''}
                  {team.netProfitPercentage.toFixed(1)}%
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  <div className="flex items-center">
                    {getRankChangeIcon(team.rankChange)}
                    <span className="ml-1">
                      {Math.abs(team.rankChange)}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRankings.length)} of{' '}
            {filteredRankings.length} teams
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};