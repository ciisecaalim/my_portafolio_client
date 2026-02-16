import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Resume from './pages/Resume';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider, AuthContext } from './context/AuthContext';
import DashboardProfile from './components/dashboard/DashboardProfile';

const PrivateRoute = ({ children }) => {
  const auth = React.useContext(AuthContext);

  // If provider is missing for some reason, block access gracefully
  if (!auth) {
    return <Navigate to="/login" />;
  }

  const { user, loading } = auth;
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resume" element={<Resume />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
                <DashboardProfile />
              </PrivateRoute>
              
            }
          />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
