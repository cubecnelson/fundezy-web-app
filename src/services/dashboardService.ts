// import mockData from '../data/mockDashboardData.json';

import { getApiUrl } from '../config/env.config';

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

export interface DashboardData {
  tradingMetrics: Stats;
  equityData: EquityData[];
  underwaterData: UnderwaterData[];
  tradeHistory: {
    previousTrades: Trade[];
    bestTrades: Trade[];
    worstTrades: Trade[];
  };
}

const API_BASE_URL = getApiUrl('TRADE_DATA');

// Mock API calls that return promises to simulate real API behavior
export const dashboardService = {

  getDashboardTradeData: async (mt5Login: string): Promise<DashboardData> => {
    const response = await fetch(`${API_BASE_URL}/${mt5Login}`);
    const data = await response.json();
    if (!data.success) {
      throw new Error('Failed to fetch dashboard data');
    }
    return data.data;
  },

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

  uploadTradeDataDoc: async (mt5Login: string, jsonData: any): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mt5Login,
        data: jsonData
      })
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || 'Failed to upload trade data');
    }
  },
};