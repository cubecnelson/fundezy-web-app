enum Environment {
  PROD = 'prod',
  UAT = 'uat',
  DEV = 'dev',
}

export const currentEnvironment: Environment = Environment.UAT;

export const API_CONFIG = {
  BASE_URL: 'https://us-central1-fundezy-app.cloudfunctions.net',
  UAT_BASE_URL: 'https://us-central1-fundezy-app-uat.cloudfunctions.net',
  DEV_BASE_URL: 'http://127.0.0.1:5001',
  ENDPOINTS: {
    TRADE_DATA: '/tradeData',
    DEMO_ACCOUNTS: '/demoAccounts',
    AUDIT_LOGS: '/audit_logs',
    ADMIN_CHECK: '/api/checkAdmin',
    USERS: '/api/users',
    RANKINGS: '/rankings',
    PAYMENTS: '/payments',
    CHALLENGES: '/api',
    MT5_ACCOUNTS: '/mt5Accounts',
    TIERS: '/tiers',
    MTT_ACCOUNTS: '/mttAccounts',
    MTT_TRADING_ACCOUNTS: '/mttTradingAccounts',
    MTT_PROXY: '/mttProxy',
    SSO_REDIRECT_URL: '/mttProxy/signin',
  },
} as const;

export const getApiUrl = (endpoint: keyof typeof API_CONFIG.ENDPOINTS): string => {
  switch (currentEnvironment.toString()) {
    case 'prod':
      return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS[endpoint]}`;
    case 'uat':
      return `${API_CONFIG.UAT_BASE_URL}${API_CONFIG.ENDPOINTS[endpoint]}`;
    case 'dev':
      return `${API_CONFIG.DEV_BASE_URL}${API_CONFIG.ENDPOINTS[endpoint]}`;
    default:
      return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS[endpoint]}`;
  }
}; 