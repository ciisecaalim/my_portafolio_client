import React from 'react';
import { motion } from 'framer-motion';

const skills = [
    { id: 1, name: 'HTML / CSS / Tailwind CSS', level: 95 },
    { id: 2, name: 'JavaScript & React (JSX)', level: 92 },
    { id: 3, name: 'Node.js & Express.js', level: 88 },
    { id: 4, name: 'MongoDB & MySQL', level: 85 },
    { id: 5, name: 'Networking & DevOps basics', level: 80 },
    { id: 6, name: 'Python', level: 90 },
    { id: 7, name: 'Java', level: 85 },
    { id: 8, name: 'C#', level: 96 },
    { id: 9, name: 'Data Structures using Java', level: 72 },
    { id: 10, name: 'Adobe Photoshop', level: 84 },
    { id: 11, name: 'Adobe Illustrator', level: 80 },
    { id: 12, name: 'CapCut', level: 75 },
    { id: 13, name: 'Adobe Premiere Pro', level: 72 },
];

const Skills = () => {
    return (
        <section name='skills' className='w-full text-gray-300 py-24 relative z-10'>
            <div className='max-w-[1240px] mx-auto px-10'>
                <div className='text-center mb-10'>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className='text-sm uppercase tracking-[0.3em] text-yellow-300 mb-3'
                    >
                        My Skills
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='text-3xl sm:text-4xl font-extrabold text-white'
                    >
                        Technical & Professional Skills
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='glass-card rounded-2xl px-6 sm:px-8 py-7 grid gap-6 sm:grid-cols-5'
                >
                    {skills.map((skill) => (
                        <div key={skill.id} className='flex flex-col items-center text-center gap-2'>
                            <div className='relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5'>
                                <div className='absolute inset-0 rounded-full bg-linear-to-tr from-yellow-300 to-purple-500 opacity-60 blur-[6px]' />
                                <div className='relative w-14 h-14 rounded-full bg-slate-950/80 flex items-center justify-center border border-white/10'>
                                    <span className='text-xl font-extrabold text-white'>
                                        {skill.level}%
                                    </span>
                                </div>
                            </div>
                            <p className='text-sm font-medium text-gray-200'>{skill.name}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
