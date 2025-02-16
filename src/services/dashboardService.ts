import mockData from '../data/mockDashboardData.json';

export interface MT5Credentials {
  server: string;
  login: string;
  password: string;
}

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

export interface UnderwaterData {
  date: string;
  drawdown: number;
}

export interface Trade {
  id: number;
  symbol: string;
  type: string;
  profit: number;
  date: string;
}

export interface DashboardData {
  mt5Credentials: MT5Credentials;
  stats: Stats;
  equityData: EquityData[];
  underwaterData: UnderwaterData[];
  previousTrades: Trade[];
  bestTrades: Trade[];
  worstTrades: Trade[];
}

// Mock API calls that return promises to simulate real API behavior
export const dashboardService = {
  getMT5Credentials: async (): Promise<MT5Credentials> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData.mt5Credentials);
      }, 500);
    });
  },

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
          previousTrades: mockData.previousTrades,
          bestTrades: mockData.bestTrades,
          worstTrades: mockData.worstTrades,
        });
      }, 500);
    });
  },
};