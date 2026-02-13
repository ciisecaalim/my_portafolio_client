import React from 'react';

const StatCard = ({ title, value, color = 'from-indigo-400 to-indigo-600' }) => {
  return (
    <div className="p-4 rounded-xl glass-dark border border-white/6 shadow-sm">
      <div className={`w-full h-2 rounded-full bg-gradient-to-r ${color} mb-4`} />
      <div className="text-sm text-gray-400">{title}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
    </div>
  );
};

export default StatCard;
