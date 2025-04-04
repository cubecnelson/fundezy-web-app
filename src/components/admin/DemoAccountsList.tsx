import { useState, useEffect } from 'react';
import { adminService, type DemoAccount } from '../../services/adminService';

export function DemoAccountsList() {
  const [accounts, setAccounts] = useState<DemoAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const data = await adminService.fetchAccounts();
      setAccounts(data);
      setError('');
    } catch (err) {
      setError('Failed to load accounts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAssignment = async (accountId: string, email: string) => {
    try {
      await adminService.removeAssignment(accountId, email);
      await fetchAccounts();
    } catch (err) {
      setError('Failed to remove assignment');
      console.error(err);
    }
  };

  const handleClearAssignment = async (accountId: string) => {
    try {
      await adminService.clearAssignment(accountId);
      await fetchAccounts();
    } catch (err) {
      setError('Failed to clear assignment');
      console.error(err);
    }
  };

  const openWebTerminal = (account: DemoAccount, useReadOnly: boolean = false) => {
    const baseUrl = 'https://web.metatrader.app/terminal';
    const params = new URLSearchParams({
      mode: 'demo',
      server: account.server,
      login: account.login,
      password: useReadOnly ? account.readonly : account.password,
    });
    window.open(`${baseUrl}?${params.toString()}`, '_blank');
  };

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return '-';
    
    if (timestamp._seconds) {
      return new Date(timestamp._seconds * 1000).toLocaleString();
    }
    
    if (timestamp instanceof Date) {
      return timestamp.toLocaleString();
    }
    
    return '-';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Login
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Password
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Read Only Password
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Server
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Assigned To
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {accounts.map((account) => (
            <tr key={account.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {account.login}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {account.password}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {account.readonly}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {account.server}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {account.assignedTo || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {formatTimestamp(account.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                <div className="flex space-x-2">
                  <button
                    onClick={() => openWebTerminal(account)}
                    className="text-fundezy-red hover:text-red-600 font-medium"
                  >
                    Open Terminal
                  </button>
                  <button
                    onClick={() => openWebTerminal(account, true)}
                    className="text-fundezy-red hover:text-red-600 font-medium"
                  >
                    Open Read-Only
                  </button>
                  {account.assignedTo && account.assignedTo !== 'VOID_USER' && (
                    <button
                      onClick={() => handleRemoveAssignment(account.id!, account.email)}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  )}
                  {account.assignedTo && (
                    <button
                      onClick={() => handleClearAssignment(account.id!)}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}