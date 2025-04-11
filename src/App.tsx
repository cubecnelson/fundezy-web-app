import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import Challenge from './pages/Challenge';
import About from './pages/About';
import { HowItWorks } from './pages/HowItWorks';
import Pricing from './pages/Pricing';
import SignIn from './pages/SignIn';
import InvestorRelations from './pages/InvestorRelations';
import Admin from './pages/Admin';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from './services/adminService';

const PrivateRoute = ({ children, isAdmin = false }: { children: React.ReactNode, isAdmin?: boolean }) => {
  const { user, loading } = useAuth();
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(isAdmin);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!isAdmin) {
        setCheckingAdmin(false);
        return;
      }

      if (!user?.email) {
        navigate('/');
        return;
      }

      try {
        const adminStatus = await adminService.checkIsAdmin(user.email);
        setIsUserAdmin(adminStatus);
        if (!adminStatus) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        navigate('/');
      } finally {
        setCheckingAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user, isAdmin, navigate]);

  if (loading || checkingAdmin) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (isAdmin && !isUserAdmin) {
    return null;
  }

  return <>{children}</>;
};


export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route path="/challenge" element={<Challenge />} />
              <Route path="/about" element={<About />} />
              <Route path="/investor-relations" element={
                <PrivateRoute isAdmin={true}>
                  <InvestorRelations />
                </PrivateRoute>
              } />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}