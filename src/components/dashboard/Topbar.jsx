import React, { useState, useEffect } from 'react';
import { HiBell, HiSearch } from 'react-icons/hi';
import SettingsButton from './SettingsButton';
import axios from 'axios';
import API_URL from '../../config';

const Topbar = ({ onOpenSettings }) => {
  const [profile, setProfile] = useState({
    name: "Ciise Caalim",
    role: "Admin",
    image: null
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/profile`);
        if (res.data) {
          setProfile({
            name: res.data.name || "Ciise Caalim",
            role: res.data.role || "Admin",
            image: res.data.image ? `${API_URL}${res.data.image}` : null
          });
        }
      } catch (err) {
        console.error("Failed to fetch profile for topbar", err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-white/6 bg-gray-800/40 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Admin</div>
        <div className="relative">
          <input placeholder="Search..." className="pl-10 pr-4 py-2 rounded-lg bg-white/5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all border border-white/5" />
          <span className="absolute left-3 top-2.5 text-gray-400"><HiSearch /></span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-white/5 transition relative">
          <HiBell className="w-5 h-5 text-gray-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>
        <SettingsButton onClick={onOpenSettings} />
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium text-gray-200">{profile.name}</div>
            <div className="text-xs text-purple-400 font-medium">{profile.role}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-[2px]">
            <div className="w-full h-full rounded-full overflow-hidden bg-gray-800">
              {profile.image ? (
                <img src={profile.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                  {profile.name.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
