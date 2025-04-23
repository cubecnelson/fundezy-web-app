import { useEffect, useState } from 'react';


interface ChallengeTrackerProps {
  challengeStartDate: Date;
  challengeEndDate: Date;
  currentProfit: number;
  profitTarget: number;
  dailyLoss: number;
  totalLoss: number;
}

export const ChallengeTracker = ({
  challengeStartDate,
  challengeEndDate,
  currentProfit,
  profitTarget,
  dailyLoss,
  totalLoss,
}: ChallengeTrackerProps) => {
  const challengeDuration = Math.ceil((challengeEndDate.getTime() - challengeStartDate.getTime()) / (1000 * 60 * 60 * 24));
  const [daysElapsed, setDaysElapsed] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    const startDate = new Date(challengeStartDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysElapsed(diffDays);
    setProgressPercentage((diffDays / challengeDuration) * 100);
  }, [challengeStartDate, challengeDuration]);

  const isDailyLossExceeded = dailyLoss < -5;
  const isTotalLossExceeded = totalLoss < -10;
  const isProfitTargetReached = currentProfit >= profitTarget;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Challenge Progress
      </h3>

      {/* Challenge Progress */}
      <div className="mb-8">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2">
          <div
            className="bg-fundezy-red h-4 rounded-full"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Day {daysElapsed} of {challengeDuration}
        </p>
      </div>

      {/* Profit Target */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600 dark:text-gray-300">Current Profit: {currentProfit}%</span>
          <span className="text-gray-600 dark:text-gray-300">Target: {profitTarget}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
          <div
            className={`h-2 rounded-full ${
              isProfitTargetReached ? 'bg-green-500' : 'bg-fundezy-red'
            }`}
            style={{
              width: `${Math.min((currentProfit / profitTarget) * 100, 100)}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Risk Management */}
      <div>
        <h4 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
          Risk Management
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">Maximum 5% Daily Loss</span>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                isDailyLossExceeded
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
              }`}
            >
              {isDailyLossExceeded ? 'Failed' : 'Pass'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">Maximum 10% Total Loss</span>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                isTotalLossExceeded
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
              }`}
            >
              {isTotalLossExceeded ? 'Failed' : 'Pass'}
            </span>
          </div>
        </div>
      </div>

      {/* Challenge Status Message */}
      <div className="mt-8 text-center text-sm">
        {isDailyLossExceeded || isTotalLossExceeded ? (
          <p className="text-red-600 dark:text-red-400">
            Challenge failed due to risk management violation
          </p>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">Stay disciplined and achieve your goals!</p>
        )}
      </div>
    </div>
  );
}; 