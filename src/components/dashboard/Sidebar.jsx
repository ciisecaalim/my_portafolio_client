import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaTools, FaDatabase, FaNetworkWired, FaVideo, FaProjectDiagram, FaCog, FaChartLine, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

const items = [
  { key: 'overview', path: '/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard', end: true },
  { key: 'projects', path: '/dashboard/projects', icon: <FaProjectDiagram />, label: 'Projects' },
  { key: 'messages', path: '/dashboard/messages', icon: <FaEnvelope />, label: 'Messages' },
  { key: 'skills', path: '/dashboard/skills', icon: <FaTools />, label: 'Skills' },
  { key: 'profile', path: '/dashboard/profile', icon: <FaUser />, label: 'Profile' },
];

const Sidebar = ({ logout }) => {
  return (
    <aside className="w-64 h-screen fixed left-0 top-0 border-r border-white/5 bg-gray-900/95 backdrop-blur-xl z-50 flex flex-col">
      <div className="p-6 border-b border-white/5">
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Admin</div>
        <div className="text-sm text-gray-500">Control Panel</div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {items.map(i => (
          <NavLink
            key={i.key}
            to={i.path}
            end={i.end}
            className={({ isActive }) => `
              w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
              ${isActive
                ? 'bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-white border border-purple-500/20 shadow-lg shadow-purple-500/5'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }
            `}
          >
            <span className={`${({ isActive }) => isActive ? 'text-purple-400' : 'text-gray-500'}`}>{i.icon}</span>
            <span className="text-sm font-medium">{i.label}</span>
          </NavLink>
        ))}
      </nav>

      {logout && (
        <div className="p-4 border-t border-white/5">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <FaSignOutAlt />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
