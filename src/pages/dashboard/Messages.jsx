import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEnvelopeOpen } from 'react-icons/fa';
import API_URL from '../../config';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/contact`);
            setMessages(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to load messages', err);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this message?')) return;
        try {
            await axios.delete(`${API_URL}/api/contact/${id}`);
            setMessages(messages.filter(msg => msg._id !== id));
        } catch (err) {
            console.error(err);
            alert('Failed to delete message');
        }
    };

    return (
        <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Inbox</h1>
                <span className="bg-purple-600 px-3 py-1 rounded-full text-sm font-medium">{messages.length} Messages</span>
            </div>

            <div className="glass-dark p-6 rounded-2xl border border-white/10 min-h-[500px]">
                {loading ? (
                    <div className="text-center py-20 text-gray-400">Loading messages...</div>
                ) : messages.length === 0 ? (
                    <div className="text-center py-20 text-gray-400 flex flex-col items-center">
                        <FaEnvelopeOpen className="text-4xl mb-4 opacity-50" />
                        <p>No messages found.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {messages.map(msg => (
                            <div key={msg._id} className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition group relative">
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                                            {msg.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-100">{msg.name}</h3>
                                            <a href={`mailto:${msg.email}`} className="text-sm text-purple-400 hover:underline">{msg.email}</a>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500 font-medium bg-black/20 px-3 py-1 rounded-full border border-white/5 whitespace-nowrap">
                                        {new Date(msg.createdAt || msg.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="mt-4 pl-0 md:pl-16 pr-10">
                                    <p className="text-gray-300 leading-relaxed bg-black/20 p-4 rounded-lg border border-white/5">
                                        {msg.message}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(msg._id)}
                                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition opacity-0 group-hover:opacity-100"
                                    title="Delete Message"
                                >
                                    <FaTrash />
                                </button>
                                {msg.replied ? (
                                    <div className="absolute bottom-4 right-4 text-xs text-green-400 font-bold flex items-center gap-1 bg-green-400/10 px-2 py-1 rounded-md border border-green-400/20">
                                        ✓ Auto-Replied
                                    </div>
                                ) : (
                                    <div className="absolute bottom-4 right-4 text-xs text-yellow-500 font-bold flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-md border border-yellow-500/20">
                                        ⚠ No Reply Sent
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages;
