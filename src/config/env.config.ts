export const isUat = true;

export const API_CONFIG = {
  BASE_URL: 'https://us-central1-fundezy-app.cloudfunctions.net',
  UAT_BASE_URL: 'https://us-central1-fundezy-app-uat.cloudfunctions.net',
  MT5_BASE_URL: 'https://mt5accounts-6wrzc5r7aq-uc.a.run.app',
  ENDPOINTS: {
    TRADE_DATA: '/tradeData',
    DEMO_ACCOUNTS: '/demoAccounts',
    AUDIT_LOGS: '/audit_logs',
    ADMIN_CHECK: '/api/checkAdmin',
    USERS: '/api/users',
    RANKINGS: '/rankings',
    PAYMENTS: '/payments',
    CHALLENGES: '/api',
    MT5_ACCOUNTS: '',
  },
} as const;

export const getApiUrl = (endpoint: keyof typeof API_CONFIG.ENDPOINTS): string => {
  const baseUrl = endpoint === 'MT5_ACCOUNTS' 
    ? API_CONFIG.MT5_BASE_URL 
    : isUat 
      ? API_CONFIG.UAT_BASE_URL 
      : API_CONFIG.BASE_URL;
  return `${baseUrl}${API_CONFIG.ENDPOINTS[endpoint]}`;
}; 