export const isUat = false;

export const API_CONFIG = {
  BASE_URL: 'https://us-central1-fundezy-app.cloudfunctions.net',
  UAT_BASE_URL: 'https://us-central1-fundezy-app-uat.cloudfunctions.net',
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
  },
} as const;

export const getApiUrl = (endpoint: keyof typeof API_CONFIG.ENDPOINTS): string => {
  const baseUrl = isUat 
      ? API_CONFIG.UAT_BASE_URL 
      : API_CONFIG.BASE_URL;
  return `${baseUrl}${API_CONFIG.ENDPOINTS[endpoint]}`;
}; 