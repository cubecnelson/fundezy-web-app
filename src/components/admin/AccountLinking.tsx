import { useState, useEffect } from 'react';
import { adminService, type DemoAccount, type MT5Account } from '../../services/adminService';
import { LoadingModal } from './LoadingModal';
import { UserSelect } from './UserSelect';

export function AccountLinking() {
  const [demoAccounts, setDemoAccounts] = useState<DemoAccount[]>([]);
  const [mt5Accounts, setMT5Accounts] = useState<MT5Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedAccount, setExpandedAccount] = useState<string | null>(null);
  const [showUserSelect, setShowUserSelect] = useState<string | null>(null);
  const [processingAction, setProcessingAction] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const [demoData, mt5Data] = await Promise.all([
        adminService.fetchAccounts(),
        adminService.fetchMT5Accounts()
      ]);
      setDemoAccounts(demoData);
      setMT5Accounts(mt5Data);
      setError('');
    } catch (err) {
      setError('Failed to load accounts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkUsers = async (demoAccountId: string, selectedEmails: string[]) => {
    setProcessingAction(true);
    try {
      await adminService.linkUsersToDemo(demoAccountId, selectedEmails);
      await fetchAccounts();
      setShowUserSelect(null);
    } catch (err) {
      setError('Failed to link users');
      console.error(err);
    } finally {
      setProcessingAction(false);
    }
  };

  const getLinkedUsers = (demoAccount: DemoAccount) => {
    return mt5Accounts.filter(mt5 => mt5.login === demoAccount.login);
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {demoAccounts.map((demoAccount) => {
          const isExpanded = expandedAccount === demoAccount.id;
          const linkedUsers = getLinkedUsers(demoAccount);

          return (
            <div key={demoAccount.id} className="p-6">
              {/* Demo Account Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Demo Account: {demoAccount.login}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Server: {demoAccount.server}
                  </p>
                </div>
                <button
                  onClick={() => setExpandedAccount(isExpanded ? null : (demoAccount.id ?? null))}
                  className="text-sm text-fundezy-red hover:text-red-600"
                >
                  {isExpanded ? 'Hide Details' : 'Show Details'}
                </button>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="mt-4">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Linked Users ({linkedUsers.length})
                    </h4>
                    
                    {linkedUsers.length > 0 ? (
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead>
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Email
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Created At
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {linkedUsers.map((user) => (
                              <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                  {user.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    user.status === 'active' 
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                  }`}>
                                    {user.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                  {formatTimestamp(user.createdAt)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No users linked to this account
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => setShowUserSelect(demoAccount.id ?? null)}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-fundezy-red hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fundezy-red"
                  >
                    Link Users
                  </button>
                </div>
              )}

              {/* User Selection Modal */}
              {showUserSelect === demoAccount.id && demoAccount.id && (
                <UserSelect
                  onClose={() => setShowUserSelect(null)}
                  onSave={(selectedEmails) => handleLinkUsers(demoAccount.id!, selectedEmails)}
                  existingUsers={linkedUsers.map(user => user.email)}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Loading Modal */}
      <LoadingModal isOpen={processingAction} />
    </div>
  );
}