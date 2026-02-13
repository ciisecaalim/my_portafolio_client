import React from 'react';
import { HiBell, HiSearch } from 'react-icons/hi';
import SettingsButton from './SettingsButton';

const Topbar = ({ onOpenSettings }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-white/6 bg-gray-800/40 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold">Admin</div>
        <div className="relative">
          <input placeholder="Search..." className="pl-10 pr-4 py-2 rounded-lg bg-white/5 text-sm focus:outline-none" />
          <span className="absolute left-3 top-2 text-gray-400"><HiSearch /></span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-white/5 transition"><HiBell className="w-5 h-5" /></button>
        <SettingsButton onClick={onOpenSettings} />
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-medium">Ciise Caalim</div>
            <div className="text-xs text-gray-400">Admin</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-300 to-purple-500" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
