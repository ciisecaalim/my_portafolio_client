import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

import Resume from './pages/Resume';
// AdminDashboard merged into Dashboard
import { AuthProvider, AuthContext } from './context/AuthContext';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import Projects from './pages/dashboard/Projects';
import Messages from './pages/dashboard/Messages';
import Skills from './pages/dashboard/Skills';
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
          <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
            <Route index element={<DashboardHome />} />
            <Route path="projects" element={<Projects />} />
            <Route path="skills" element={<Skills />} />
            <Route path="messages" element={<Messages />} />
            <Route path="profile" element={<DashboardProfile />} />
          </Route>        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
