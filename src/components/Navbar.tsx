import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="bg-white border-b border-google-border dark:bg-gray-900 dark:border-gray-700">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="flex items-center space-x-2">
            <Logo /> {process.env.NODE_ENV === 'production' ? undefined : 'UAT'}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <ThemeToggle />
          </div>
          <button
            type="button"
            className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-google-gray dark:text-gray-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm text-google-gray hover:text-google-blue dark:text-gray-400 dark:hover:text-white"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <ThemeToggle />
          {user ? (
            <>
              <a
                href="/dashboard"
                className="rounded-md bg-fundezy-red px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors"
              >
                Dashboard
              </a>
              <button
                onClick={handleLogout}
                className="text-sm text-google-gray hover:text-fundezy-red dark:text-gray-400 dark:hover:text-red-500"
              >
                Sign Out
              </button>
            </>
          ) : (
            <a
              href="/signin"
              className="rounded-md bg-fundezy-red px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors"
            >
              Sign In
            </a>
          )}
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 dark:bg-gray-900 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center space-x-2">
              <Logo />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-google-gray dark:text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-google-border dark:divide-gray-700">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base text-google-gray hover:bg-google-hover dark:text-gray-400 dark:hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                {user ? (
                  <>
                    <a
                      href="/dashboard"
                      className="-mx-3 block rounded-lg bg-fundezy-red px-3 py-2.5 text-base font-medium text-white hover:bg-red-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </a>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base text-google-gray hover:text-fundezy-red dark:text-gray-400 dark:hover:text-red-500"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <a
                    href="/signin"
                    className="-mx-3 block rounded-lg bg-fundezy-red px-3 py-2.5 text-base font-medium text-white hover:bg-red-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </a>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};