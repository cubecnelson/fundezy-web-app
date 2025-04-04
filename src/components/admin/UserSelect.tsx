import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { adminService } from '../../services/adminService';

interface UserSelectProps {
  onClose: () => void;
  onSave: (selectedEmails: string[]) => void;
  existingUsers: string[];
}

export function UserSelect({ onClose, onSave, existingUsers }: UserSelectProps) {
  const [users, setUsers] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const allUsers = await adminService.fetchAllUsers();
      // Filter out users that are already linked
      const availableUsers = allUsers.filter(user => !existingUsers.includes(user));
      setUsers(availableUsers);
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    onSave(selectedUsers);
  };

  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-50 overflow-y-auto"
      open={true}
      onClose={onClose}
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
          <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Select Users to Link
          </Dialog.Title>

          {error && (
            <div className="mt-2 p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded">
              {error}
            </div>
          )}

          <div className="mt-4">
            {loading ? (
              <div className="text-center">Loading users...</div>
            ) : (
              <div className="max-h-60 overflow-y-auto">
                {users.map((email) => (
                  <label key={email} className="flex items-center space-x-3 py-2">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(email)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers([...selectedUsers, email]);
                        } else {
                          setSelectedUsers(selectedUsers.filter(u => u !== email));
                        }
                      }}
                      className="h-4 w-4 text-fundezy-red focus:ring-fundezy-red border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-900 dark:text-white">{email}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-400"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={selectedUsers.length === 0}
              className="px-4 py-2 text-sm font-medium text-white bg-fundezy-red rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fundezy-red disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}