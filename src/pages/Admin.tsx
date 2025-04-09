import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { adminService } from '../services/adminService';
import { Tab } from '@headlessui/react';
import { DemoAccountsList } from '../components/admin/DemoAccountsList';
import { CreateDemoAccount } from '../components/admin/CreateDemoAccount';
import { MT5AccountsList } from '../components/admin/MT5AccountsList';
import { AccountLinking } from '../components/admin/AccountLinking';
import { useAnalytics } from '../hooks/useAnalytics';
import DashboardDataUpload from './DashboardDataUpload';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useAnalytics('Admin');

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user?.email) {
        navigate('/');
        return;
      }

      try {
        const isAdmin = await adminService.checkIsAdmin(user.email);
        if (!isAdmin) {
          navigate('/');
          return;
        }
        setIsAdmin(true);
      } catch (error) {
        console.error('Error checking admin status:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, navigate]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Admin Dashboard</h1>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 dark:bg-gray-800 p-1 mb-8">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white/60 ring-offset-2 ring-offset-fundezy-red focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white dark:bg-gray-700 text-fundezy-red shadow'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-white/[0.12] hover:text-fundezy-red'
              )
            }
          >
            Create Demo Account
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white/60 ring-offset-2 ring-offset-fundezy-red focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white dark:bg-gray-700 text-fundezy-red shadow'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-white/[0.12] hover:text-fundezy-red'
              )
            }
          >
            Demo Accounts
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white/60 ring-offset-2 ring-offset-fundezy-red focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white dark:bg-gray-700 text-fundezy-red shadow'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-white/[0.12] hover:text-fundezy-red'
              )
            }
          >
            MT5 Accounts
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white/60 ring-offset-2 ring-offset-fundezy-red focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white dark:bg-gray-700 text-fundezy-red shadow'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-white/[0.12] hover:text-fundezy-red'
              )
            }
          >
            Account Linking
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white/60 ring-offset-2 ring-offset-fundezy-red focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white dark:bg-gray-700 text-fundezy-red shadow'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-white/[0.12] hover:text-fundezy-red'
              )
            }
          >
            Dashboard Data Upload
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <CreateDemoAccount />
          </Tab.Panel>
          <Tab.Panel>
            <DemoAccountsList />
          </Tab.Panel>
          <Tab.Panel>
            <MT5AccountsList />
          </Tab.Panel>
          <Tab.Panel>
            <AccountLinking />
          </Tab.Panel>
          <Tab.Panel>
            <DashboardDataUpload />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}