import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatsCard from '../../components/dashboard/StatsCard';
import { FaProjectDiagram, FaEnvelope, FaUsers, FaChartLine } from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import API_URL from '../../config';

const DashboardHome = () => {
    const [stats, setStats] = useState({
        totalProjects: 0,
        totalMessages: 0,
        views: 1250,
        clients: 15
    });

    const data = [
        { name: 'Jan', visits: 4000, projects: 2400 },
        { name: 'Feb', visits: 3000, projects: 1398 },
        { name: 'Mar', visits: 2000, projects: 9800 },
        { name: 'Apr', visits: 2780, projects: 3908 },
        { name: 'May', visits: 1890, projects: 4800 },
        { name: 'Jun', visits: 2390, projects: 3800 },
        { name: 'Jul', visits: 3490, projects: 4300 },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectsRes = await axios.get(`${API_URL}/api/projects`);
                const messagesRes = await axios.get(`${API_URL}/api/contact`);
                setStats(prev => ({
                    ...prev,
                    totalProjects: projectsRes.data.length,
                    totalMessages: messagesRes.data.length
                }));
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="animate-fade-in-up">
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard title="Total Projects" value={stats.totalProjects} icon={<FaProjectDiagram />} color="bg-white/10" />
                <StatsCard title="Total Messages" value={stats.totalMessages} icon={<FaEnvelope />} color="bg-white/10" />
                <StatsCard title="Profile Views" value={stats.views} icon={<FaChartLine />} color="bg-white/10" />
                <StatsCard title="New Clients" value={stats.clients} icon={<FaUsers />} color="bg-white/10" />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-dark p-6 rounded-2xl min-w-0 border border-white/10">
                    <h3 className="text-lg font-bold text-gray-200 mb-4">Traffic Overview</h3>
                    <div className="w-full h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }} />
                                <Area type="monotone" dataKey="visits" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorVisits)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-dark p-6 rounded-2xl min-w-0 border border-white/10">
                    <h3 className="text-lg font-bold text-gray-200 mb-4">Activity</h3>
                    <div className="w-full h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }} />
                                <Bar dataKey="visits" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
