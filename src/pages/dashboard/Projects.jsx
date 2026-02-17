import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../config';
import { FaTrash, FaGithub, FaExternalLinkAlt, FaImage } from 'react-icons/fa';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        title: '', description: '', technologies: '', link: '', githubLink: '', image: null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/projects`);
            setProjects(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
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
            await axios.post(`${API_URL}/api/projects`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            fetchProjects();
            setNewProject({ title: '', description: '', technologies: '', link: '', githubLink: '', image: null });
            alert('Project Added Successfully!');
        } catch (err) { console.error(err); alert('Failed to add project'); }
    };

    const deleteProject = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        try {
            await axios.delete(`${API_URL}/api/projects/${id}`);
            fetchProjects();
        } catch (err) { console.error(err); }
    };

    return (
        <div className="grid lg:grid-cols-3 gap-8 animate-fade-in-up">
            {/* Add Project Form */}
            <div className='glass-dark p-6 rounded-2xl lg:col-span-1 border border-white/10 h-fit sticky top-24'>
                <h2 className='text-2xl font-bold mb-6 text-gray-200 border-b border-white/10 pb-2'>Add New Project</h2>
                <form onSubmit={handleProjectSubmit} className='flex flex-col gap-4'>
                    <input
                        className='p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-300 transition'
                        placeholder="Project Title"
                        name="title"
                        value={newProject.title}
                        onChange={handleProjectChange}
                        required
                    />
                    <textarea
                        className='p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-300 transition'
                        placeholder="Description"
                        rows="4"
                        name="description"
                        value={newProject.description}
                        onChange={handleProjectChange}
                        required
                    />
                    <input
                        className='p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-300 transition'
                        placeholder="Technologies (comma separated)"
                        name="technologies"
                        value={newProject.technologies}
                        onChange={handleProjectChange}
                        required
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            className='p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-300 transition'
                            placeholder="Live Demo URL"
                            name="link"
                            value={newProject.link}
                            onChange={handleProjectChange}
                        />
                        <input
                            className='p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-300 transition'
                            placeholder="GitHub URL"
                            name="githubLink"
                            value={newProject.githubLink}
                            onChange={handleProjectChange}
                        />
                    </div>

                    <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:bg-white/5 transition group">
                        <input type="file" name="image" onChange={handleProjectChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className="text-gray-400 group-hover:text-purple-400 transition-colors flex flex-col items-center gap-2">
                            <FaImage className="text-2xl" />
                            <p className="text-sm">{newProject.image ? newProject.image.name : "Click to upload project cover"}</p>
                        </div>
                    </div>

                    <button className='bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition shadow-lg mt-2'>
                        Add Project
                    </button>
                </form>
            </div>

            {/* Project List */}
            <div className='glass-dark p-6 rounded-2xl lg:col-span-2 border border-white/10'>
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-2">
                    <h2 className='text-2xl font-bold text-gray-200'>Existing Projects</h2>
                    <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30">
                        {projects.length} Total
                    </span>
                </div>

                <div className='space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar'>
                    {loading ? (
                        <div className="text-center py-20 text-gray-400">Loading projects...</div>
                    ) : projects.map(proj => (
                        <div key={proj._id} className='flex flex-col sm:flex-row gap-5 bg-white/5 p-5 rounded-xl border border-white/10 hover:bg-white/10 transition group'>
                            <div className="shrink-0">
                                {proj.image ? (
                                    <img src={`${API_URL}/${proj.image}`} alt={proj.title} className="w-full sm:w-32 h-32 object-cover rounded-lg shadow-md" />
                                ) : (
                                    <div className="w-full sm:w-32 h-32 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
                                        No Image
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h3 className='font-bold text-xl text-gray-100'>{proj.title}</h3>
                                        <button
                                            onClick={() => deleteProject(proj._id)}
                                            className='p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition'
                                            title="Delete Project"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                    <p className='text-sm text-gray-400 mt-2 mb-3 line-clamp-2'>{proj.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {proj.technologies.map((tech, i) => (
                                            <span key={i} className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full border border-indigo-500/30">
                                                {tech.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3 text-sm">
                                    {proj.link && (
                                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition">
                                            <FaExternalLinkAlt /> Live Demo
                                        </a>
                                    )}
                                    {proj.githubLink && (
                                        <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
                                            <FaGithub /> Source Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {!loading && projects.length === 0 && (
                        <div className="text-center text-gray-500 py-10 border-2 border-dashed border-gray-700 rounded-xl">
                            <p>No projects found. Add your first project!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Projects;
