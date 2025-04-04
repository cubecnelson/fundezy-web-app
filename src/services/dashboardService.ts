import mockData from '../data/mockDashboardData.json';

export interface Stats {
  rank: number;
  totalTraders: number;
  dailyTradeCount: number;
  dailyLossPercent: number;
  totalLossPercent: number;
  totalGainPercent: number;
  consistencyScore: number;
}

export interface EquityData {
  date: string;
  equity: number;
  passingMark: number;
  failingMark: number;
}

export interface Trade {
  id: number;
  symbol: string;
  type: string;
  profit: number;
  date: string;
  time: string;
}

export interface UnderwaterData {
  date: string;
  drawdown: number;
}

// Mock API calls that return promises to simulate real API behavior
export const dashboardService = {
  getStats: async (): Promise<Stats> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData.stats);
      }, 500);
    });
  },

  getEquityData: async (): Promise<EquityData[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData.equityData);
      }, 500);
    });
  },

  getUnderwaterData: async (): Promise<UnderwaterData[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData.underwaterData);
      }, 500);
    });
  },

  getTrades: async (): Promise<{
    previousTrades: Trade[];
    bestTrades: Trade[];
    worstTrades: Trade[];
  }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          previousTrades: mockData.previousTrades.slice(0, 5),
          bestTrades: mockData.bestTrades,
          worstTrades: mockData.worstTrades
        });
      }, 500);
    });
  },
};