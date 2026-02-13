import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const educationItems = [
    {
        id: 1,
        title: 'BSc in Computer Science',
        place: 'Jamhuuriya University, Mogadishu',
        period: '2019 – 2023',
    },
    {
        id: 2,
        title: 'Full‑Stack Web Development Program',
        place: 'Rice Academy, Mogadishu',
        period: '2021 – 2022',
    },
];

const experienceItems = [
    {
        id: 1,
        title: 'Full‑Stack Web Developer',
        place: 'Freelance / Remote',
        period: '2021 – Present',
    },
    {
        id: 2,
        title: 'Junior Web Developer (Intern)',
        place: 'Local Tech & Training Centers',
        period: '2020 – 2021',
    },
];

const Experience = () => {
    return (
        <section name='experience' className='w-full text-gray-300 py-24 relative z-10'>
            <div className='max-w-[1240px] mx-auto px-10'>
                <div className='text-center mb-10'>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className='text-sm uppercase tracking-[0.3em] text-yellow-300 mb-3'
                    >
                        Why Me
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='text-3xl sm:text-4xl font-extrabold text-white'
                    >
                        Education & Experience
                    </motion.h2>
                </div>

                <div className='grid md:grid-cols-2 gap-8'>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className='glass-card rounded-2xl px-6 py-7 border border-white/10'
                    >
                        <div className='flex items-center gap-3 mb-5'>
                            <div className='w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-yellow-300'>
                                <FaGraduationCap />
                            </div>
                            <h3 className='text-xl font-semibold text-white'>Education</h3>
                        </div>
                        <ul className='space-y-4'>
                            {educationItems.map((item) => (
                                <li key={item.id} className='border-l border-white/10 pl-4'>
                                    <p className='text-sm uppercase tracking-[0.2em] text-gray-500 mb-1'>
                                        {item.period}
                                    </p>
                                    <p className='text-base font-semibold text-white'>{item.title}</p>
                                    <p className='text-sm text-gray-400'>{item.place}</p>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className='glass-card rounded-2xl px-6 py-7 border border-white/10'
                    >
                        <div className='flex items-center gap-3 mb-5'>
                            <div className='w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-cyan-300'>
                                <FaBriefcase />
                            </div>
                            <h3 className='text-xl font-semibold text-white'>Experience</h3>
                        </div>
                        <ul className='space-y-4'>
                            {experienceItems.map((item) => (
                                <li key={item.id} className='border-l border-white/10 pl-4'>
                                    <p className='text-sm uppercase tracking-[0.2em] text-gray-500 mb-1'>
                                        {item.period}
                                    </p>
                                    <p className='text-base font-semibold text-white'>{item.title}</p>
                                    <p className='text-sm text-gray-400'>{item.place}</p>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Experience;

