import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/dashboard/Sidebar';
import Topbar from '../components/dashboard/Topbar';
import StatsCard from '../components/dashboard/StatsCard';
import { FaProjectDiagram, FaEnvelope, FaUsers, FaChartLine, FaTrash } from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const Dashboard = () => {
    const { logout } = useContext(AuthContext);
    const [projects, setProjects] = useState([]);
    const [messages, setMessages] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({
        totalProjects: 0,
        totalMessages: 0,
        views: 1250,
        clients: 15
    });

    const [newProject, setNewProject] = useState({
        title: '', description: '', technologies: '', link: '', githubLink: '', image: null
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
        fetchProjects();
        fetchMessages();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get('https://my-portafolio-server-1.onrender.com/api/projects');
            setProjects(res.data);
            setStats(prev => ({ ...prev, totalProjects: res.data.length }));
        } catch (err) { console.error(err); }
    };

    const fetchMessages = async () => {
        try {
            const res = await axios.get('https://my-portafolio-server-1.onrender.com/api/contact');
            setMessages(res.data);
            setStats(prev => ({ ...prev, totalMessages: res.data.length }));
        } catch (err) {
            console.error('Failed to load messages', err?.response?.data || err);
        }
    };

    const handleProjectChange = (e) => {
        if (e.target.name === 'image') {
            setNewProject({ ...newProject, image: e.target.files[0] });
        } else {
            setNewProject({ ...newProject, [e.target.name]: e.target.value });
        }
    };

    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(newProject).forEach(key => formData.append(key, newProject[key]));

        try {
            await axios.post('https://my-portafolio-server-1.onrender.com/api/projects', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            fetchProjects();
            setNewProject({ title: '', description: '', technologies: '', link: '', githubLink: '', image: null });
            alert('Project Added!');
        } catch (err) { console.error(err); alert('Failed to add project'); }
    };

    const deleteProject = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`https://my-portafolio-server-1.onrender.com/api/projects/${id}`);
            fetchProjects();
        } catch (err) { console.error(err); }
    };

    return (
        <div className="flex min-h-screen bg-gray-900 font-sans selection:bg-purple-500 selection:text-white">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} logout={logout} />

            <div className="flex-1 flex flex-col">
                <Topbar />

                <div className="p-8 space-y-8 ml-64">
                    {activeTab === 'overview' && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <StatsCard title="Total Projects" value={stats.totalProjects} icon={<FaProjectDiagram />} color="bg-white/10 hover:bg-white/20 transition duration-300" />
                                <StatsCard title="Total Messages" value={stats.totalMessages} icon={<FaEnvelope />} color="bg-white/10 hover:bg-white/20 transition duration-300" />
                                <StatsCard title="Profile Views" value={stats.views} icon={<FaChartLine />} color="bg-white/10 hover:bg-white/20 transition duration-300" />
                                <StatsCard title="New Clients" value={stats.clients} icon={<FaUsers />} color="bg-white/10 hover:bg-white/20 transition duration-300" />
                            </div>

                            <div className="grid lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 glass-dark p-6 rounded-2xl min-w-0">
                                    <h3 className="text-lg font-bold text-gray-200 mb-4">Project Overview</h3>
                                    <div className="w-full">
                                        <ResponsiveContainer width="100%" height={320}>
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
                                                <Legend />
                                                <Area type="monotone" dataKey="visits" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorVisits)" />
                                                <Area type="monotone" dataKey="projects" stroke="#34d399" fillOpacity={1} fill="url(#colorVisits)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="glass-dark p-6 rounded-2xl min-w-0">
                                    <h3 className="text-lg font-bold text-gray-200 mb-4">Activity</h3>
                                    <div className="w-full">
                                        <ResponsiveContainer width="100%" height={320}>
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
                        </>
                    )}

                    {activeTab === 'projects' && (
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className='glass-dark p-6 rounded-2xl lg:col-span-1 border border-white/10'>
                                <h2 className='text-2xl font-bold mb-6 text-gray-200 border-b border-white/10 pb-2'>Add New Project</h2>
                                <form onSubmit={handleProjectSubmit} className='flex flex-col gap-4'>
                                    <input className='p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-300 transition' placeholder="Title" name="title" value={newProject.title} onChange={handleProjectChange} required />
                                    <textarea className='p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-300 transition' placeholder="Description" rows="4" name="description" value={newProject.description} onChange={handleProjectChange} required />
                                    <input className='p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-300 transition' placeholder="Technologies" name="technologies" value={newProject.technologies} onChange={handleProjectChange} required />
                                    <input className='p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-300 transition' placeholder="Live Link" name="link" value={newProject.link} onChange={handleProjectChange} />
                                    <input className='p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-300 transition' placeholder="GitHub Link" name="githubLink" value={newProject.githubLink} onChange={handleProjectChange} />
                                    <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:bg-white/5 transition">
                                        <input type="file" name="image" onChange={handleProjectChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                        <div className="text-gray-400">
                                            <p>Click to upload image</p>
                                        </div>
                                    </div>
                                    <button className='bg-linear-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition shadow-lg'>Add Project</button>
                                </form>
                            </div>

                            <div className='glass-dark p-6 rounded-2xl lg:col-span-2 border border-white/10'>
                                <h2 className='text-2xl font-bold mb-6 text-gray-200 border-b border-white/10 pb-2'>Existing Projects</h2>
                                <div className='space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar'>
                                    {projects.map(proj => (
                                        <div key={proj._id} className='flex justify-between items-start bg-white/5 p-5 rounded-xl border border-white/10 hover:bg-white/10 transition'>
                                            <div className="flex gap-4">
                                                {proj.image && <img src={`https://my-portafolio-server-1.onrender.com/${proj.image}`} alt={proj.title} className="w-24 h-24 object-cover rounded-lg shadow-sm" />}
                                                <div>
                                                    <h3 className='font-bold text-lg text-gray-200'>{proj.title}</h3>
                                                    <p className='text-sm text-gray-400 mt-1 mb-2'>{proj.description}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {proj.technologies.map((tech, i) => (
                                                            <span key={i} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full border border-purple-500/30">{tech}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => deleteProject(proj._id)} className='p-2 text-red-500 hover:bg-red-500/20 rounded-lg transition'><FaTrash /></button>
                                            </div>
                                        </div>
                                    ))}
                                    {projects.length === 0 && <p className="text-center text-gray-500 py-10">No projects found.</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'messages' && (
                        <div className='glass-dark p-6 rounded-2xl border border-white/10'>
                            <h2 className='text-2xl font-bold mb-6 text-gray-200 border-b border-white/10 pb-2'>Inbox</h2>
                            <div className='grid gap-4'>
                                {messages.length === 0 ? <p className="text-center text-gray-500 py-10">No messages found.</p> : messages.map(msg => (
                                    <div key={msg._id} className='bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition flex justify-between items-center group'>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center text-xl font-bold border border-purple-500/30">
                                                {msg.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className='font-bold text-gray-200'>{msg.name}</h3>
                                                <p className='text-sm text-gray-500'>{msg.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex-1 mx-8">
                                            <p className='text-gray-400 line-clamp-2'>{msg.message}</p>
                                        </div>
                                        <span className='text-xs text-gray-500 font-medium bg-white/5 px-3 py-1 rounded-full border border-white/10'>
                                            {new Date(msg.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
