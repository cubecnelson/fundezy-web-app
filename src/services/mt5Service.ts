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

interface DemoAccount {
  id: string;
  server: string;
  login: string;
  password: string;
  assignedTo?: string | null;
}

interface AuditLog {
  action: string;
  email: string;
  mt5AccountId: string;
  timestamp: Date;
  details: {
    server: string;
    login: string;
    previousStatus: string;
  };
}

export const fetchMT5Account = async (email: string): Promise<MT5Account[]> => {
  if (!email) {
    throw new Error('Email is required to fetch MT5 account');
  }

  try {
    const response = await fetch(`https://mt5accounts-6wrzc5r7aq-uc.a.run.app/email/${email}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch MT5 account: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching MT5 account:', error);
    throw error;
  }
};

const logAccountRemoval = async (auditData: AuditLog): Promise<void> => {
  try {
    const response = await fetch('https://us-central1-fundezy-app.cloudfunctions.net/audit_logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(auditData),
    });

    if (!response.ok) {
      throw new Error('Failed to log account removal');
    }
  } catch (error) {
    console.error('Error logging account removal:', error);
    throw error;
  }
};

export const clearMT5Account = async (account: MT5Account): Promise<void> => {
  try {
    // Log the account removal first
    await logAccountRemoval({
      action: 'ACCOUNT_REMOVED',
      email: account.email,
      mt5AccountId: account.id,
      timestamp: new Date(),
      details: {
        server: account.server,
        login: account.login,
        previousStatus: account.status
      }
    });

    // Clear the MT5 account credentials
    const response = await fetch(`https://mt5accounts-6wrzc5r7aq-uc.a.run.app/${account.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...account,
        login: '',
        password: '',
        status: 'inactive',
        updatedAt: new Date()
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to clear MT5 account');
    }
  } catch (error) {
    console.error('Error clearing MT5 account:', error);
    throw error;
  }
};

export const createDemoAccount = async (email: string): Promise<{ success: boolean; message: string }> => {
  if (!email) {
    return {
      success: false,
      message: 'Email is required to create demo account'
    };
  }

  try {
    // 1. Get available demo account
    const availableResponse = await fetch('https://us-central1-fundezy-app.cloudfunctions.net/demoAccounts/available');
    
    // Check if response is empty (no content)
    if (availableResponse.status === 204) {
      return {
        success: false,
        message: 'No demo accounts available. Please join our waiting list.'
      };
    }

    if (!availableResponse.ok) {
      throw new Error(`Failed to check demo account availability: ${availableResponse.statusText}`);
    }

    const responseText = await availableResponse.text();
    if (!responseText) {
      return {
        success: false,
        message: 'No demo accounts available. Please join our waiting list.'
      };
    }

    let demoAccount: DemoAccount;
    try {
      demoAccount = JSON.parse(responseText);
    } catch (error) {
      console.error('Error parsing demo account response:', error);
      return {
        success: false,
        message: 'No demo accounts available. Please join our waiting list.'
      };
    }

    if (!demoAccount || !demoAccount.id) {
      return {
        success: false,
        message: 'No demo accounts available. Please join our waiting list.'
      };
    }

    // 2. Create MT5 account if it doesn't exist
    let mt5Account;
    try {
      const mt5AccountResponse = await fetch(`https://mt5accounts-6wrzc5r7aq-uc.a.run.app/email/${email}`);
      if (mt5AccountResponse.ok) {
        const accounts = await mt5AccountResponse.json();
        mt5Account = accounts[0];
      }
    } catch (error) {
      console.log('No existing MT5 account found, creating new one');
    }

    if (!mt5Account) {
      // Create new MT5 account
      const createResponse = await fetch('https://mt5accounts-6wrzc5r7aq-uc.a.run.app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          server: demoAccount.server,
          login: demoAccount.login,
          password: demoAccount.password,
          email: email,
          status: 'active',
        }),
      });

      if (!createResponse.ok) {
        throw new Error(`Failed to create MT5 account: ${createResponse.statusText}`);
      }

      mt5Account = await createResponse.json();
    } else {
      // Update existing MT5 account
      const updateResponse = await fetch(`https://mt5accounts-6wrzc5r7aq-uc.a.run.app/${mt5Account.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          server: demoAccount.server,
          login: demoAccount.login,
          password: demoAccount.password,
          email: email,
          status: 'active',
        }),
      });

      if (!updateResponse.ok) {
        throw new Error(`Failed to update MT5 account: ${updateResponse.statusText}`);
      }
    }

    // 4. Assign demo account
    const assignResponse = await fetch(
      `https://us-central1-fundezy-app.cloudfunctions.net/demoAccounts/assign/${demoAccount.id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mt5AccountId: mt5Account.id,
        }),
      }
    );

    if (!assignResponse.ok) {
      throw new Error(`Failed to assign demo account: ${assignResponse.statusText}`);
    }

    return {
      success: true,
      message: 'Demo account created and assigned successfully',
    };
  } catch (error: any) {
    console.error('Error creating demo account:', error);
    return {
      success: false,
      message: error.message || 'Failed to create demo account',
    };
  }
};