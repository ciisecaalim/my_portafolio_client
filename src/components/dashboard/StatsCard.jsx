import React from 'react';

const StatsCard = ({ title, value, icon, color }) => {
    return (
        <div className={`p-6 rounded-2xl shadow-lg text-white flex justify-between items-center backdrop-blur-md border border-white/10 ${color}`}>
            <div>
                <p className="text-sm opacity-90 mb-1 font-medium">{title}</p>
                <h3 className="text-3xl font-bold">{value}</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-xl text-2xl backdrop-blur-sm">
                {icon}
            </div>
        </div>
    );
};

export default StatsCard;
