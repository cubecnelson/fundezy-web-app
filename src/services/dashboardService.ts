// import mockData from '../data/mockDashboardData.json';

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
  lotSize?: number;
  openPrice?: number;
  closePrice?: number;
}

export interface UnderwaterData {
  date: string;
  drawdown: number;
}

const API_BASE_URL = 'https://us-central1-fundezy-app.cloudfunctions.net/tradeData';

// Mock API calls that return promises to simulate real API behavior
export const dashboardService = {
  getStats: async (mdAccountId: string): Promise<Stats> => {
    const response = await fetch(`${API_BASE_URL}/${mdAccountId}`);
    const data = await response.json();
    if (!data.success) {
      throw new Error('Failed to fetch stats');
    }
    return data.data.tradingMetrics;
  },

  getEquityData: async (mdAccountId: string): Promise<EquityData[]> => {
    const response = await fetch(`${API_BASE_URL}/${mdAccountId}`);
    const data = await response.json();
    if (!data.success) {
      throw new Error('Failed to fetch equity data');
    }
    return data.data.equityData;
  },

  getUnderwaterData: async (mdAccountId: string): Promise<UnderwaterData[]> => {
    const response = await fetch(`${API_BASE_URL}/${mdAccountId}`);
    const data = await response.json();
    if (!data.success) {
      throw new Error('Failed to fetch underwater data');
    }
    return data.data.underwaterData;
  },

  getTrades: async (mdAccountId: string): Promise<{
    previousTrades: Trade[];
    bestTrades: Trade[];
    worstTrades: Trade[];
  }> => {
    const response = await fetch(`${API_BASE_URL}/${mdAccountId}`);
    const data = await response.json();
    if (!data.success) {
      throw new Error('Failed to fetch trades');
    }
    return {
      previousTrades: data.data.tradeHistory.previousTrades,
      bestTrades: data.data.tradeHistory.bestTrades,
      worstTrades: data.data.tradeHistory.worstTrades
    };
  },
};