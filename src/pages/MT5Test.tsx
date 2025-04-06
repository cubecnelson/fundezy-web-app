import { useState } from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { useAnalytics } from '../hooks/useAnalytics';

interface MT5Credentials {
  server: string;
  login: string;
  password: string;
  readonly: string;
}

export default function MT5Test() {
  const [credentials, setCredentials] = useState<MT5Credentials>({
    server: '',
    login: '',
    password: '',
    readonly: ''
  });
  const [showHelp, setShowHelp] = useState(false);
  const [useIframe, setUseIframe] = useState(true);

  useAnalytics('MT5 Test');

  const getTerminalUrl = (useReadOnly: boolean = false) => {
    const params = new URLSearchParams({
      mode: 'demo',
      server: credentials.server,
      login: credentials.login,
      password: useReadOnly ? credentials.readonly : credentials.password,
    });
    
    return `https://web.metatrader.app/terminal?${params.toString()}`;
  };

  const handleConnect = (useReadOnly: boolean = false) => {
    if (!useIframe) {
      window.open(getTerminalUrl(useReadOnly), '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Credentials Bar */}
      <div className="bg-white dark:bg-gray-800 shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Server
                </label>
                <input
                  type="text"
                  value={credentials.server}
                  onChange={(e) => setCredentials({ ...credentials, server: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fundezy-red focus:ring-fundezy-red dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Login
                </label>
                <input
                  type="text"
                  value={credentials.login}
                  onChange={(e) => setCredentials({ ...credentials, login: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fundezy-red focus:ring-fundezy-red dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fundezy-red focus:ring-fundezy-red dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Read-only Password
                </label>
                <input
                  type="password"
                  value={credentials.readonly}
                  onChange={(e) => setCredentials({ ...credentials, readonly: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fundezy-red focus:ring-fundezy-red dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => handleConnect()}
                className="px-4 py-2 bg-fundezy-red text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Open Terminal
              </button>
              
              <button
                onClick={() => handleConnect(true)}
                className="px-4 py-2 border border-fundezy-red text-fundezy-red rounded-md hover:bg-fundezy-red/10 transition-colors"
              >
                Open Read-Only
              </button>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={useIframe}
                  onChange={(e) => setUseIframe(e.target.checked)}
                  className="rounded border-gray-300 text-fundezy-red focus:ring-fundezy-red"
                />
                Use Iframe
              </label>

              <button
                onClick={() => setShowHelp(!showHelp)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                title="Help"
              >
                <QuestionMarkCircleIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Help Panel */}
          {showHelp && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                How to Connect
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Enter your MT5 server address (e.g., MetaQuotes-Demo)</li>
                <li>Input your login ID (usually a number)</li>
                <li>Enter your main password for full trading access</li>
                <li>Enter your read-only password for view-only access</li>
                <li>Click "Open Terminal" for full access or "Open Read-Only" for view-only access</li>
              </ol>
            </div>
          )}
        </div>
      </div>

      {/* Terminal Area */}
      {useIframe && credentials.server && credentials.login && credentials.password && (
        <div className="h-[calc(100vh-8rem)]">
          <iframe
            src={`https://cors-anywhere.herokuapp.com/${getTerminalUrl()}`}
            className="w-full h-full border-0"
            allow="fullscreen"
          />
        </div>
      )}

      {/* Info Area (shown when iframe is disabled or credentials are missing) */}
      {(!useIframe || !credentials.server || !credentials.login || !credentials.password) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              MetaTrader 5 Web Terminal Access
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Enter your credentials above and click either "Open Terminal" for full trading access or "Open Read-Only" for view-only access.
              {useIframe ? ' The terminal will appear below once credentials are entered.' : ' The terminal will open in a new tab.'}
            </p>
            <div className="mt-4 p-4 bg-fundezy-red/10 dark:bg-fundezy-red/20 rounded-md">
              <h3 className="text-lg font-medium text-fundezy-red mb-2">Important Note</h3>
              <p className="text-gray-700 dark:text-gray-300">
                {useIframe 
                  ? 'The iframe option uses a CORS proxy to bypass security restrictions. This might not work in all environments.'
                  : 'Opening in a new tab ensures a secure and reliable trading environment.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}