import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../config';
import { FaTrash, FaPlus, FaCode, FaEdit } from 'react-icons/fa';

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', level: 50 });
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            // Adjust this URL if your local env is different, assuming same server layout
            const res = await axios.get(`${API_URL}/api/skills`);
            setSkills(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`${API_URL}/api/skills/${currentId}`, formData);
                alert('Skill updated!');
            } else {
                await axios.post(`${API_URL}/api/skills`, formData);
                alert('Skill added!');
            }
            fetchSkills();
            resetForm();
        } catch (err) {
            console.error(err);
            alert('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Confirm delete?')) return;
        try {
            await axios.delete(`${API_URL}/api/skills/${id}`);
            fetchSkills();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (skill) => {
        setFormData({ name: skill.name, level: skill.level });
        setIsEditing(true);
        setCurrentId(skill._id);
    };

    const resetForm = () => {
        setFormData({ name: '', level: 50 });
        setIsEditing(false);
        setCurrentId(null);
    };

    return (
        <div className="grid lg:grid-cols-3 gap-8 animate-fade-in-up">

            {/* Form Section */}
            <div className='glass-dark p-6 rounded-2xl lg:col-span-1 border border-white/10 h-fit sticky top-24'>
                <h2 className='text-2xl font-bold mb-6 text-gray-200 border-b border-white/10 pb-2'>
                    {isEditing ? 'Edit Skill' : 'Add New Skill'}
                </h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Skill Name</label>
                        <input
                            className='w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-300 transition'
                            placeholder="e.g. React, Node.js"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm text-gray-400">Proficiency Level</label>
                            <span className="text-sm font-bold text-purple-400">{formData.level}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            value={formData.level}
                            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                        />
                    </div>

                    <div className="flex gap-2 mt-2">
                        <button type="submit" className='flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition shadow-lg flex items-center justify-center gap-2'>
                            {isEditing ? <FaEdit /> : <FaPlus />}
                            {isEditing ? 'Update Skill' : 'Add Skill'}
                        </button>
                        {isEditing && (
                            <button type="button" onClick={resetForm} className="px-4 py-3 rounded-lg bg-gray-600 hover:bg-gray-500 text-white transition">
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* List Section */}
            <div className='glass-dark p-6 rounded-2xl lg:col-span-2 border border-white/10'>
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-2">
                    <h2 className='text-2xl font-bold text-gray-200'>My Skills</h2>
                    <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30">
                        {skills.length} Skills
                    </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {loading ? (
                        <div className="col-span-2 text-center py-10 text-gray-400">Loading skills...</div>
                    ) : skills.map(skill => (
                        <div key={skill._id} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-3 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-purple-400 shadow-inner">
                                        <FaCode />
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-100">{skill.name}</h3>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(skill)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg"><FaEdit /></button>
                                    <button onClick={() => handleDelete(skill._id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"><FaTrash /></button>
                                </div>
                            </div>

                            <div className="relative z-10">
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                    <span>Proficiency</span>
                                    <span>{skill.level}%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${skill.level}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Decorative background glow */}
                            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-purple-600/20 blur-3xl rounded-full pointer-events-none"></div>
                        </div>
                    ))}
                    {!loading && skills.length === 0 && (
                        <div className="col-span-2 text-center text-gray-500 py-10 border-2 border-dashed border-gray-700 rounded-xl">
                            <p>No skills found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Skills;
