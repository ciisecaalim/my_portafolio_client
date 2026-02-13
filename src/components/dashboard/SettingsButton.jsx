import React from 'react';
import { FaCog } from 'react-icons/fa';

const SettingsButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="flex items-center gap-3 px-3 py-2 border rounded-lg bg-gray-800/60 hover:bg-gray-800/80 transition">
      <div className="p-1 rounded bg-white/5">
        <FaCog className="text-yellow-400" />
      </div>
      <div className="text-sm">Settings</div>
    </button>
  );
};

export default SettingsButton;
