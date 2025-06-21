import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AssetPurchase from './pages/AssetPurchase';
import AssetTransfer from './pages/AssetTransfer';
import AssetAssignment from './pages/AssetAssignment';
import AssetExpenditure from './pages/AssetExpenditure';
import TransactionHistory from './pages/TransactionHistory';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Track login status on page load & whenever localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkAuth();

    window.addEventListener('storage', checkAuth); // for cross-tab logout too

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  return (
    <Router>
      <div>
        <nav style={{ padding: '10px', background: '#eee' }}>
          {isLoggedIn ? (
            <>
              <Link to="/" style={{ margin: '10px' }}>Dashboard</Link>
              <Link to="/purchase" style={{ margin: '10px' }}>Purchase</Link>
              <Link to="/transfer" style={{ margin: '10px' }}>Transfer</Link>
              <Link to="/assign-asset" style={{ margin: '10px' }}>Assign Asset</Link>
              <Link to="/expend-asset" style={{ margin: '10px' }}>Expend Asset</Link>
              <Link to="/transactions" style={{ margin: '10px' }}>Transaction History</Link>
              <button
                onClick={handleLogout}
                style={{ margin: '10px' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ margin: '10px' }}>Login</Link>
              <Link to="/signup" style={{ margin: '10px' }}>Signup</Link>
            </>
          )}
        </nav>

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/purchase" element={<PrivateRoute><AssetPurchase /></PrivateRoute>} />
          <Route path="/transfer" element={<PrivateRoute><AssetTransfer /></PrivateRoute>} />
          <Route path="/assign-asset" element={<PrivateRoute><AssetAssignment /></PrivateRoute>} />
          <Route path="/expend-asset" element={<PrivateRoute><AssetExpenditure /></PrivateRoute>} />
          <Route path="/transactions" element={<PrivateRoute><TransactionHistory /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
