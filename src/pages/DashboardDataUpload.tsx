import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAnalytics } from '../hooks/useAnalytics';
import { dashboardService } from '../services/dashboardService';
import { adminService } from '../services/adminService';

export const DashboardDataUpload = () => {
  const { user } = useAuth();
  const [jsonData, setJsonData] = useState('');
  const [mt5Login, setMt5Login] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useAnalytics('DashboardDataUpload');


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
  const handleSubmit = async () => {
    try {
      setIsUploading(true);
      setError(null);
      
      // Validate JSON
      const parsedData = JSON.parse(jsonData);
      
      // Upload the data
      await dashboardService.uploadTradeDataDoc(parsedData.mt5Login, parsedData);
      
      setSuccess('Data uploaded successfully!');
      setJsonData('');
      setMt5Login('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON format. Please check your input.');
      setSuccess(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upload Dashboard Trade Data</h2>
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-200 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{success}</span>
              </div>
            )}

            <div className="space-y-6">
              {/* <div>
                <label htmlFor="mt5Login" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  MT5 Login
                </label>
                <input
                  type="text"
                  id="mt5Login"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={mt5Login}
                  onChange={(e) => setMt5Login(e.target.value)}
                  placeholder="Enter MT5 login"
                />
              </div> */}

              <div>
                <label htmlFor="jsonData" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Paste your trade data JSON here
                </label>
                <textarea
                  id="jsonData"
                  rows={15}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={jsonData}
                  onChange={(e) => setJsonData(e.target.value)}
                  placeholder="Paste your JSON data here..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={isUploading}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 ${
                    isUploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isUploading ? 'Uploading...' : 'Upload Data'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDataUpload; 