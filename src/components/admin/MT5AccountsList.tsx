import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { adminService, type MT5Account } from '../../services/adminService';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function MT5AccountsList() {
  const [accounts, setAccounts] = useState<MT5Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingAccount, setEditingAccount] = useState<{ id: string; email: string } | null>(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const data = await adminService.fetchMT5Accounts();
      const sortedAccounts = data.sort((a, b) => {
        const emailCompare = a.email.localeCompare(b.email);
        if (emailCompare === 0) {
          return a.login.localeCompare(b.login);
        }
        return emailCompare;
      });
      setAccounts(sortedAccounts);
      setError('');
    } catch (err) {
      setError('Failed to load MT5 accounts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (account: MT5Account) => {
    try {
      const newStatus = account.status === 'active' ? 'inactive' : 'active';
      await adminService.updateMT5AccountStatus(account.id, newStatus);
      await fetchAccounts();
    } catch (err) {
      setError('Failed to update account status');
      console.error(err);
    }
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAccount) return;

    try {
      await adminService.updateMT5AccountEmail(editingAccount.id, editingAccount.email);
      setEditingAccount(null);
      await fetchAccounts();
    } catch (err) {
      setError('Failed to update email');
      console.error(err);
    }
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
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Login
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Server
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Updated At
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
                {editingAccount?.id === account.id ? (
                  <form onSubmit={handleUpdateEmail} className="flex gap-2">
                    <input
                      type="email"
                      value={editingAccount.email}
                      onChange={(e) => setEditingAccount({ ...editingAccount, email: e.target.value })}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-fundezy-red focus:ring-fundezy-red dark:bg-gray-700 dark:text-white text-sm"
                      required
                    />
                    <button
                      type="submit"
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingAccount(null)}
                      className="text-gray-600 hover:text-gray-700 font-medium"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  account.email
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {account.login}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {account.server}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <Switch
                  checked={account.status === 'active'}
                  onChange={() => handleStatusToggle(account)}
                  className={classNames(
                    account.status === 'active' ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-fundezy-red focus:ring-offset-2'
                  )}
                >
                  <span
                    className={classNames(
                      account.status === 'active' ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  >
                    <span
                      className={classNames(
                        account.status === 'active' ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                      )}
                      aria-hidden="true"
                    >
                      <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                        <path
                          d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span
                      className={classNames(
                        account.status === 'active' ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                      )}
                      aria-hidden="true"
                    >
                      <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                      </svg>
                    </span>
                  </span>
                </Switch>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {formatTimestamp(account.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {formatTimestamp(account.updatedAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {!editingAccount && (
                  <button
                    onClick={() => setEditingAccount({ id: account.id, email: account.email })}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Edit Email
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}