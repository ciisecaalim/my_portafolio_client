import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaChalkboardTeacher, FaNetworkWired } from 'react-icons/fa';

const certificateItems = [
    {
        id: 1,
        title: 'Full‑Stack Web Development Certificate',
        issuer: 'Rice Academy – Mogadishu',
        detail: 'Intensive program covering React, Node.js, Express.js and MongoDB.',
    },
    {
        id: 2,
        title: 'Computer Science Degree',
        issuer: 'Jamhuuriya University',
        detail: 'BSc in Computer Science with focus on software engineering fundamentals.',
    },
    {
        id: 3,
        title: 'Advanced Networking & Routing',
        issuer: 'Professional Workshops',
        detail: 'Hands‑on training on IP addressing, routing and network troubleshooting.',
    },
];

const galleryItems = [
    {
        id: 1,
        label: 'Speaking & Seminars',
    },
    {
        id: 2,
        label: 'Certificates & Awards',
    },
    {
        id: 3,
        label: 'Project Showcase Shots',
    },
];

const Certificates = () => {
    return (
        <section name='certificates' className='w-full text-gray-300 py-24 relative z-10'>
            <div className='max-w-[1240px] mx-auto px-10'>
                <div className='text-center mb-10'>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className='text-sm uppercase tracking-[0.3em] text-yellow-300 mb-3'
                    >
                        Certificates &amp; Seminars
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='text-3xl sm:text-4xl font-extrabold text-white'
                    >
                        Continuous Learning &amp; Recognition
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        className='text-gray-400 max-w-2xl mx-auto mt-3'
                    >
                        A selection of the certificates, trainings and seminars that shaped my journey as a
                        full‑stack developer and technology professional.
                    </motion.p>
                </div>

                <div className='grid lg:grid-cols-2 gap-10 items-start'>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className='space-y-4'
                    >
                        {certificateItems.map((item, index) => (
                            <div
                                key={item.id}
                                className='glass-card rounded-2xl px-6 py-5 border border-white/10 flex gap-4 items-start'
                            >
                                <div className='mt-1 text-yellow-300'>
                                    {index === 0 && <FaCertificate />}
                                    {index === 1 && <FaChalkboardTeacher />}
                                    {index === 2 && <FaNetworkWired />}
                                </div>
                                <div>
                                    <p className='text-xs uppercase tracking-[0.2em] text-gray-500 mb-1'>
                                        {item.issuer}
                                    </p>
                                    <h3 className='text-base sm:text-lg font-semibold text-white mb-1'>
                                        {item.title}
                                    </h3>
                                    <p className='text-sm text-gray-400'>{item.detail}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className='glass-card rounded-2xl px-6 py-7 border border-white/10'
                    >
                        <p className='text-sm uppercase tracking-[0.3em] text-yellow-300 mb-4'>
                            Photo Highlights
                        </p>
                        <p className='text-gray-400 text-sm mb-6'>
                            Use this space to display photos from seminars, certificate ceremonies and project
                            screenshots. You can later replace these placeholders with your own images.
                        </p>
                        <div className='grid sm:grid-cols-3 gap-4'>
                            {galleryItems.map((item) => (
                                <div
                                    key={item.id}
                                    className='relative h-28 rounded-xl overflow-hidden bg-linear-to-tr from-purple-700/60 via-cyan-500/40 to-yellow-300/60'
                                >
                                    <div className='absolute inset-0 bg-black/40' />
                                    <div className='relative h-full w-full flex items-center justify-center px-3 text-center'>
                                        <span className='text-xs font-semibold text-gray-100'>
                                            {item.label}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Certificates;

