import React from 'react';
import { FaTachometerAlt, FaUser, FaTools, FaDatabase, FaNetworkWired, FaVideo, FaProjectDiagram, FaCog, FaChartLine, FaEnvelope } from 'react-icons/fa';

const items = [
  { key: 'overview', icon: <FaTachometerAlt />, label: 'Dashboard' },
  { key: 'projects', icon: <FaProjectDiagram />, label: 'Projects' },
  { key: 'messages', icon: <FaEnvelope />, label: 'Messages' },
  { key: 'profile', icon: <FaUser />, label: 'Profile' },
  { key: 'skills', icon: <FaTools />, label: 'Skills' },
  { key: 'backend', icon: <FaChartLine />, label: 'Backend & APIs' },
  { key: 'databases', icon: <FaDatabase />, label: 'Databases' },
  { key: 'network', icon: <FaNetworkWired />, label: 'Network Settings' },
  { key: 'multimedia', icon: <FaVideo />, label: 'Multimedia' },
  { key: 'reports', icon: <FaChartLine />, label: 'Reports' },
  { key: 'settings', icon: <FaCog />, label: 'Settings' }
];

const Sidebar = (props) => {
  // Support both APIs: `active`/`setActive` (admin) and `activeTab`/`setActiveTab` (dashboard)
  const activeKey = props.active || props.activeTab || 'overview';
  const setActiveFn = props.setActive || props.setActiveTab || (() => {});
  const logout = props.logout;

  return (
    <aside className="w-64 p-6 border-r border-white/6 bg-gray-900/70">
      <div className="mb-8">
        <div className="text-2xl font-bold mb-1">Control</div>
        <div className="text-sm text-gray-400">Admin Dashboard</div>
      </div>

      <nav className="space-y-2">
        {items.map(i => (
          <button key={i.key} onClick={() => setActiveFn(i.key)} className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition ${activeKey === i.key ? 'bg-white/6' : 'hover:bg-white/2'}`}>
            <span className="text-yellow-300">{i.icon}</span>
            <span className="text-sm">{i.label}</span>
          </button>
        ))}
      </nav>

      {logout && (
        <div className="mt-6">
          <button onClick={logout} className="w-full text-left px-3 py-2 rounded-lg text-red-400 hover:text-red-300">Logout</button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
