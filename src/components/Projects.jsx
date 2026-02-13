import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const fallbackProjects = [
    {
        id: 1,
        title: 'Portfolio Website',
        description: 'Modern single‑page portfolio built with React, Tailwind CSS and smooth scroll animations.',
        technologies: ['React', 'Tailwind', 'Framer Motion'],
        imageUrl: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
        link: '#',
        githubLink: '#',
    },
    {
        id: 2,
        title: 'Dashboard & Admin Panel',
        description: 'Responsive admin dashboard for managing projects, messages and analytics.',
        technologies: ['React', 'Node.js', 'MongoDB'],
        imageUrl: 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg',
        link: '#',
        githubLink: '#',
    },
    {
        id: 3,
        title: 'E‑Commerce API',
        description: 'Secure REST API for products, orders and users, built with Express.js.',
        technologies: ['Node.js', 'Express.js', 'MongoDB'],
        imageUrl: 'https://images.pexels.com/photos/5720566/pexels-photo-5720566.jpeg',
        link: '#',
        githubLink: '#',
    },
];

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios
            .get('https://my-portafolio-server-1.onrender.com/api/projects')
            .then((res) => setProjects(res.data))
            .catch(() => {
                // If the API is not available, fall back to static projects
                setProjects([]);
            });
    }, []);

    const displayProjects = projects.length ? projects : fallbackProjects;

    return (
        <section name='projects' className='w-full text-gray-300 py-24 relative z-10'>
            <div className='max-w-[1240px] mx-auto px-10'>
                <div className='text-center mb-10'>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className='text-sm uppercase tracking-[0.3em] text-yellow-300 mb-3'
                    >
                        Projects
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='text-3xl sm:text-4xl font-extrabold text-white'
                    >
                        Selected Work
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        className='text-gray-400 max-w-2xl mx-auto mt-3'
                    >
                        A collection of full‑stack projects, dashboards and experiments that showcase how I combine
                        clean UI with solid backend architecture.
                    </motion.p>
                </div>

                <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-8'>
                    {displayProjects.map((item, index) => {
                        const technologies = item.technologies || item.tags || [];
                        const imageSrc = item.image
                            ? `http://localhost:5000/${item.image}`
                            : item.imageUrl;

                        return (
                            <motion.div
                                key={item._id || item.id || index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className='relative group rounded-2xl flex justify-center items-center mx-auto overflow-hidden glass-card shadow-lg h-72'
                            >
                                <div className='absolute inset-0 bg-black/80 transition-all duration-500 z-10' />

                                <img
                                    src={imageSrc}
                                    alt={item.title}
                                    className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-125'
                                />

                                <div className='opacity-100 flex flex-col justify-center items-center text-center z-20 transition-all duration-300 p-4 translate-y-0'>
                                    <span className='text-2xl font-bold text-white tracking-wider mb-2'>
                                        {item.title}
                                    </span>
                                    <p className='text-xs text-gray-300 mb-3 line-clamp-3'>
                                        {item.description}
                                    </p>
                                    <div className='flex gap-2 flex-wrap justify-center mb-3'>
                                        {technologies.slice(0, 4).map((tech, i) => (
                                            <span
                                                key={i}
                                                className='text-xs bg-cyan-400/20 text-cyan-300 px-2 py-1 rounded-full border border-cyan-400/30'
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className='flex gap-4 pt-1 text-center'>
                                        {item.link && item.link !== '#' && (
                                            <a href={item.link} target='_blank' rel='noopener noreferrer'>
                                                <button className='text-center rounded-lg px-4 py-2 bg-white text-gray-900 font-bold text-sm cursor-pointer hover:bg-cyan-400 hover:text-white transition flex items-center gap-2'>
                                                    Demo <FaExternalLinkAlt />
                                                </button>
                                            </a>
                                        )}
                                        {item.githubLink && item.githubLink !== '#' && (
                                            <a href={item.githubLink} target='_blank' rel='noopener noreferrer'>
                                                <button className='text-center rounded-lg px-4 py-2 bg-gray-800 text-white font-bold text-sm cursor-pointer hover:bg-gray-700 transition flex items-center gap-2 border border-gray-600'>
                                                    Code <FaGithub />
                                                </button>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Projects;
