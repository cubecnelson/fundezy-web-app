import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAnalytics } from '../hooks/useAnalytics';
import { sendEmailVerification } from 'firebase/auth';

export default function VerifyEmail() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useAnalytics('Verify Email');

  useEffect(() => {
    const checkEmailVerification = async () => {
      if (!user) {
        navigate('/signin');
        return;
      }

      try {
        await user.reload();
        if (user.emailVerified) {
          navigate('/dashboard');
        } else {
          setIsLoading(false);
        }
      } catch (error: any) {
        setError(error.message || 'Error checking email verification status');
        setIsLoading(false);
      }
    };

    checkEmailVerification();
  }, [user, navigate]);

  const handleResendVerification = async () => {
    if (!user) return;

    try {
      await sendEmailVerification(user);
      setError('Verification email sent! Please check your inbox.');
    } catch (error: any) {
      setError(error.message || 'Error sending verification email');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fundezy-red"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            We've sent a verification email to {user?.email}. Please check your inbox and click the verification link to continue.
          </p>
        </div>

        {error && (
          <div className={`px-4 py-3 rounded relative ${error.includes('sent') ? 'bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300'}`} role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="mt-8 space-y-4">
          <button
            onClick={handleResendVerification}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fundezy-red hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fundezy-red"
          >
            Resend Verification Email
          </button>
          <button
            onClick={() => navigate('/signin')}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fundezy-red"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
} 