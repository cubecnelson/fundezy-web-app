import { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { createDemoAccount } from '../services/mt5Service';

interface MT5CredentialsProps {
  server: string;
  login: string;
  password: string;
  loading: boolean;
  error: string | null;
  email: string;
  onRefresh: () => void;
}

export const MT5Credentials = ({ server, login, password, loading, error, email, onRefresh }: MT5CredentialsProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [createAccountError, setCreateAccountError] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    // Show overlay if credentials are empty
    setShowOverlay(!server || !login || !password);
  }, [server, login, password]);

  const handleCreateDemoAccount = async () => {
    setCreatingAccount(true);
    setCreateAccountError(null);

    try {
      const result = await createDemoAccount(email);
      
      if (result.success) {
        // Fetch updated MT5 account details
        await onRefresh();
        setShowOverlay(false);
      } else {
        setCreateAccountError(result.message);
      }
    } catch (error: any) {
      setCreateAccountError(error.message);
    } finally {
      setCreatingAccount(false);
    }
  };

  const openWebTerminal = () => {
    const baseUrl = 'https://web.metatrader.app/terminal';
    const params = new URLSearchParams({
      mode: 'demo',
      server,
      login,
      password,
    });
    window.open(`${baseUrl}?${params.toString()}`, '_blank');
  };

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">MT5 Credentials</h3>
        <div className="text-center text-gray-600 dark:text-gray-400">Loading credentials...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">MT5 Credentials</h3>
        <div className="text-center text-red-600 dark:text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8 relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">MT5 Credentials</h3>
        {server && login && password && (
          <button
            onClick={openWebTerminal}
            className="bg-fundezy-red text-white px-4 py-2 rounded hover:bg-red-600 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Open Web Terminal
          </button>
        )}
      </div>
      
      {/* Credentials Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Server</label>
          <input
            type="text"
            value={server}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-300 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Login</label>
          <input
            type="text"
            value={login}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-300 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              readOnly
              className="block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-300 p-2 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
              ) : (
                <EyeIcon className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Create Demo Account Overlay */}
      {showOverlay && (
        <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Create Demo Account
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Start your trading journey with a demo account. Practice your strategies risk-free.
            </p>
            
            {createAccountError && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded">
                {createAccountError}
              </div>
            )}

            <button
              onClick={handleCreateDemoAccount}
              disabled={creatingAccount}
              className="w-full bg-fundezy-red text-white py-2 px-4 rounded hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {creatingAccount ? 'Creating Account...' : 'Create Demo Account'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};