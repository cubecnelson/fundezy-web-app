import { getApiUrl } from '../config/env.config';

export interface MTTAccount {
  uuid: string;
  created: string;
  updated: string;
  verificationStatus: 'NEW' | 'VERIFIED' | 'REJECTED';
  type: 'RETAIL' | 'PROFESSIONAL';
  [key: string]: any; // Allow for additional fields
}

const API_BASE_URL = getApiUrl('MTT_ACCOUNTS');

export const mttAccountService = {
  async getAllAccounts(): Promise<MTTAccount[]> {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching MTT accounts:', error);
      throw error;
    }
  },

  async getAccountById(id: string): Promise<MTTAccount> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error(`Error fetching MTT account with id ${id}:`, error);
      throw error;
    }
  },

  async createAccount(accountData: Partial<MTTAccount>): Promise<MTTAccount> {
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
      console.error('Error creating MTT account:', error);
      throw error;
    }
  },

  async updateAccount(id: string, accountData: Partial<MTTAccount>): Promise<MTTAccount> {
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
      console.error(`Error updating MTT account with id ${id}:`, error);
      throw error;
    }
  },

  async deleteAccount(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting MTT account with id ${id}:`, error);
      throw error;
    }
  },

  async getAccountByEmail(email: string): Promise<MTTAccount> {
    try {
      const response = await fetch(`${API_BASE_URL}/email/${email}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Account not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error(`Error fetching MTT account with email ${email}:`, error);
      throw error;
    }
  },
}; 