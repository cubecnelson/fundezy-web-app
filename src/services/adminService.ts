import { getApiUrl } from '../config/env.config';

// Types
export interface DemoAccount {
  id?: string;
  login: string;
  password: string;
  readonly: string;
  server: string;
  email: string;
  assignedTo: string;
  createdAt?: {
    _seconds: number;
    _nanoseconds: number;
  } | Date;
  updatedAt?: {
    _seconds: number;
    _nanoseconds: number;
  } | Date;
}

export interface MT5Account {
  id: string;
  server: string;
  login: string;
  password: string;
  email: string;
  status: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  updatedAt: {
    _seconds: number;
    _nanoseconds: number;
  };
}

const BASE_URL = getApiUrl('DEMO_ACCOUNTS');
const MT5_URL = 'https://mt5accounts-6wrzc5r7aq-uc.a.run.app';
const AUDIT_URL = getApiUrl('AUDIT_LOGS');
const ADMIN_CHECK_URL = getApiUrl('ADMIN_CHECK');
const USERS_URL = getApiUrl('USERS');

export const adminService = {
  checkIsAdmin: async (email: string): Promise<boolean> => {
    try {
      const response = await fetch(`${ADMIN_CHECK_URL}?email=${encodeURIComponent(email)}`);
      if (!response.ok) {
        throw new Error(`Failed to check admin status: ${response.status}`);
      }
      const data = await response.json();
      return data.isAdmin === true;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  },

  fetchAccounts: async (): Promise<DemoAccount[]> => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch demo accounts: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error in fetchAccounts:', error);
      throw error;
    }
  },

  fetchMT5Accounts: async (): Promise<MT5Account[]> => {
    try {
      const response = await fetch(MT5_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch MT5 accounts: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error in fetchMT5Accounts:', error);
      throw error;
    }
  },

  createAccount: async (account: DemoAccount): Promise<void> => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...account,
          assignedTo: "", // Explicitly set assignedTo to empty string
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create account: ${response.status}`);
      }
    } catch (error) {
      console.error('Error in createAccount:', error);
      throw error;
    }
  },

  updateAssignment: async (accountId: string, assignedTo: string): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/${accountId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assignedTo,
          updatedAt: new Date(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update account assignment: ${response.status}`);
      }
    } catch (error) {
      console.error('Error in updateAssignment:', error);
      throw error;
    }
  },

  updateMT5AccountStatus: async (accountId: string, status: string): Promise<void> => {
    try {
      // First, get the current account data
      const getResponse = await fetch(`${MT5_URL}/${accountId}`);
      if (!getResponse.ok) {
        throw new Error(`Failed to fetch MT5 account: ${getResponse.status}`);
      }
      const account = await getResponse.json();

      // Log the status change
      await fetch(AUDIT_URL, {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'STATUS_CHANGE',
          email: account.email,
          mt5AccountId: accountId,
          timestamp: new Date(),
          details: {
            previousStatus: account.status,
            newStatus: status,
            server: account.server,
            login: account.login
          }
        }),
      });

      // Update the account status
      const updateResponse = await fetch(`${MT5_URL}/${accountId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...account,
          status,
          login: status === 'inactive' ? '' : account.login,
          password: status === 'inactive' ? '' : account.password,
          updatedAt: new Date(),
        }),
      });

      if (!updateResponse.ok) {
        throw new Error(`Failed to update MT5 account status: ${updateResponse.status}`);
      }
    } catch (error) {
      console.error('Error in updateMT5AccountStatus:', error);
      throw error;
    }
  },

  updateMT5AccountEmail: async (accountId: string, newEmail: string): Promise<void> => {
    try {
      // First, get the current account data
      const getResponse = await fetch(`${MT5_URL}/${accountId}`);
      if (!getResponse.ok) {
        throw new Error(`Failed to fetch MT5 account: ${getResponse.status}`);
      }
      const account = await getResponse.json();

      // Check if email is already in use
      const checkEmailResponse = await fetch(`${MT5_URL}/email/${newEmail}`);
      const existingAccounts = await checkEmailResponse.json();
      if (existingAccounts && existingAccounts.length > 0 && existingAccounts[0].id !== accountId) {
        throw new Error('Email is already in use by another account');
      }

      // Log the email change
      await fetch(AUDIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'EMAIL_CHANGE',
          email: account.email,
          mt5AccountId: accountId,
          timestamp: new Date(),
          details: {
            previousEmail: account.email,
            newEmail: newEmail,
            server: account.server,
            login: account.login
          }
        }),
      });

      // Update the account email
      const updateResponse = await fetch(`${MT5_URL}/${accountId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...account,
          email: newEmail,
          updatedAt: new Date(),
        }),
      });

      if (!updateResponse.ok) {
        throw new Error(`Failed to update MT5 account email: ${updateResponse.status}`);
      }
    } catch (error: any) {
      console.error('Error updating MT5 account email:', error);
      throw error;
    }
  },

  removeAssignment: async (accountId: string, email: string): Promise<void> => {
    try {
      // 1. Update demo account assignment
      await adminService.updateAssignment(accountId, 'VOID_USER');

      // 2. Find and update MT5 account
      const mt5Response = await fetch(`${MT5_URL}/email/${email}`);
      if (!mt5Response.ok) {
        throw new Error(`Failed to fetch MT5 account: ${mt5Response.status}`);
      }

      const mt5Accounts = await mt5Response.json();
      if (mt5Accounts && mt5Accounts.length > 0) {
        const mt5Account = mt5Accounts[0];

        // Log the removal
        await fetch(AUDIT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'ACCOUNT_REMOVED',
            email: email,
            mt5AccountId: mt5Account.id,
            timestamp: new Date(),
            details: {
              server: mt5Account.server,
              login: mt5Account.login,
              previousStatus: mt5Account.status
            }
          }),
        });

        // 3. Update MT5 account
        const updateResponse = await fetch(`${MT5_URL}/${mt5Account.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...mt5Account,
            login: '',
            password: '',
            status: 'inactive',
            updatedAt: new Date(),
          }),
        });

        if (!updateResponse.ok) {
          throw new Error(`Failed to update MT5 account: ${updateResponse.status}`);
        }
      }
    } catch (error) {
      console.error('Error in removeAssignment:', error);
      throw error;
    }
  },

  clearAssignment: async (accountId: string): Promise<void> => {
    return adminService.updateAssignment(accountId, '');
  },

  fetchAllUsers: async (): Promise<string[]> => {
    try {
      const response = await fetch(USERS_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }
      const data = await response.json();
      return data.users.map((user: { email: string }) => user.email);
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  linkUsersToDemo: async (demoAccountId: string, userEmails: string[]): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/${demoAccountId}/link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emails: userEmails }),
      });

      if (!response.ok) {
        throw new Error(`Failed to link users: ${response.status}`);
      }
    } catch (error) {
      console.error('Error linking users:', error);
      throw error;
    }
  },
};