import { useState } from 'react';
import { adminService, type DemoAccount } from '../../services/adminService';

export function CreateDemoAccount() {
  const [error, setError] = useState('');
  const [newAccount, setNewAccount] = useState<DemoAccount>({
    login: '',
    password: '',
    readonly: '',
    server: 'MetaQuotes-Demo',
    email: '',
    assignedTo: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminService.createAccount(newAccount);

      // Reset form
      setNewAccount({
        login: '',
        password: '',
        readonly: '',
        server: 'MetaQuotes-Demo',
        email: '',
        assignedTo: '',
      });
      setError('');
    } catch (err) {
      setError('Failed to create demo account');
      console.error(err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Create New Demo Account</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Login
            </label>
            <input
              type="text"
              value={newAccount.login}
              onChange={(e) => setNewAccount({ ...newAccount, login: e.target.value })}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-fundezy-red focus:ring-fundezy-red dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="text"
              value={newAccount.password}
              onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-fundezy-red focus:ring-fundezy-red dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Read Only Password
            </label>
            <input
              type="text"
              value={newAccount.readonly}
              onChange={(e) => setNewAccount({ ...newAccount, readonly: e.target.value })}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-fundezy-red focus:ring-fundezy-red dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Server
            </label>
            <input
              type="text"
              value={newAccount.server}
              onChange={(e) => setNewAccount({ ...newAccount, server: e.target.value })}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-fundezy-red focus:ring-fundezy-red dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-fundezy-red text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}