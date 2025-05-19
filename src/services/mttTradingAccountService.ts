import { getApiUrl } from '../config/env.config';

export interface ChallengeTargets {
  maxDailyLoss: number | null;
  maxLoss: number | null;
  profitTarget: number | null;
  maxDailyLossEquityLevel: number | null;
  maxLossEquityLevel: number | null;
  profitTargetEquityLevel: number | null;
}

export interface ChallengeDetails {
  phaseStep: string | null;
  daysTraded: number | null;
  endOfDayBalanceSnapshot: number | null;
  isReadyForEvaluation: boolean;
  challengeTargets: ChallengeTargets;
}

export interface MTTTradingAccount {
  id: string;
  created: string;
  brokerId: string | null;
  login: string | null;
  challengeDetails: ChallengeDetails;
  [key: string]: any; // Allow for additional fields
}

const API_BASE_URL = getApiUrl('MTT_TRADING_ACCOUNTS');

export const mttTradingAccountService = {
  async getAllTradingAccounts(): Promise<MTTTradingAccount[]> {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching MTT trading accounts:', error);
      throw error;
    }
  },

  async getTradingAccountById(id: string): Promise<MTTTradingAccount> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error(`Error fetching MTT trading account with id ${id}:`, error);
      throw error;
    }
  },

  async createTradingAccount(accountData: Partial<MTTTradingAccount>): Promise<MTTTradingAccount> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error creating MTT trading account:', error);
      throw error;
    }
  },

  async updateTradingAccount(id: string, accountData: Partial<MTTTradingAccount>): Promise<MTTTradingAccount> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error(`Error updating MTT trading account with id ${id}:`, error);
      throw error;
    }
  },

  async deleteTradingAccount(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting MTT trading account with id ${id}:`, error);
      throw error;
    }
  },

  async updateChallengeDetails(id: string, challengeDetails: Partial<ChallengeDetails>): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}/challenge`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(challengeDetails),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error updating challenge details for trading account ${id}:`, error);
      throw error;
    }
  },

  async updateChallengeStatus(id: string, status: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}/challenge/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error updating challenge status for trading account ${id}:`, error);
      throw error;
    }
  },

  async updateChallengeTargets(id: string, targets: Partial<ChallengeTargets>): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}/challenge/targets`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(targets),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error updating challenge targets for trading account ${id}:`, error);
      throw error;
    }
  },

  async getTradingAccountByEmail(email: string): Promise<MTTTradingAccount[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/email/${email}`);
      if (!response.ok) {
        if (response.status === 404) {
          return []; // Return empty array if no accounts found
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error(`Error fetching MTT trading accounts with email ${email}:`, error);
      throw error;
    }
  },
}; 