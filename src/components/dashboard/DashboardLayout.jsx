import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { AuthContext } from '../../context/AuthContext';

const DashboardLayout = () => {
    const { logout } = useContext(AuthContext);

    return (
        <div className="flex min-h-screen bg-gray-900 font-sans text-gray-100 selection:bg-purple-500 selection:text-white">
            <Sidebar logout={logout} />
            <div className="flex-1 flex flex-col ml-64 transition-all duration-300">
                <Topbar />
                <div className="p-8 space-y-8 min-h-[calc(100vh-64px)]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
