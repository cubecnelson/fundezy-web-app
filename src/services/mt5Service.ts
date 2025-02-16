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
  assignedTo?: string;
}

export const fetchMT5Account = async (email: string): Promise<MT5Account> => {
  if (!email) {
    throw new Error('Email is required to fetch MT5 account');
  }

  try {
    const response = await fetch(`https://mt5accounts-6wrzc5r7aq-uc.a.run.app/email/${email}`);
    if (!response.ok) {
      throw new Error('Failed to fetch MT5 account');
    }
    const data = await response.json();
    if (!data || !data[0]) {
      throw new Error('No MT5 account found for this email');
    }
    return data[0];
  } catch (error) {
    console.error('Error fetching MT5 account:', error);
    throw error;
  }
};

export const createDemoAccount = async (email: string): Promise<{ success: boolean; message: string }> => {
  if (!email) {
    throw new Error('Email is required to create demo account');
  }

  try {
    // 1. Get available demo account
    const availableResponse = await fetch('https://us-central1-fundezy-app.cloudfunctions.net/demoAccounts/available');
    if (!availableResponse.ok) {
      throw new Error('No demo accounts available');
    }
    const demoAccount: DemoAccount = await availableResponse.json();

    // 2. Get MT5 account for the email
    const mt5AccountResponse = await fetch(`https://mt5accounts-6wrzc5r7aq-uc.a.run.app/email/${email}`);
    if (!mt5AccountResponse.ok) {
      throw new Error('Failed to fetch MT5 account');
    }
    const mt5Accounts = await mt5AccountResponse.json();
    if (!mt5Accounts || !mt5Accounts[0]) {
      throw new Error('No MT5 account found for this email');
    }
    const mt5Account = mt5Accounts[0];

    // 3. Update MT5 account with demo account credentials
    const updateResponse = await fetch(`https://mt5accounts-6wrzc5r7aq-uc.a.run.app/${mt5Account.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        server: demoAccount.server,
        login: demoAccount.login,
        password: demoAccount.password,
        email: mt5Account.email,
        status: 'active',
      }),
    });

    if (!updateResponse.ok) {
      throw new Error('Failed to update MT5 account');
    }

    // 4. Assign demo account to MT5 account
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
      throw new Error('Failed to assign demo account with id');
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