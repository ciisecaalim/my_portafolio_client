import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaPalette, FaServer } from 'react-icons/fa';

const services = [
    {
        id: 1,
        icon: <FaCode className="w-8 h-8 text-yellow-300" />,
        title: 'Web Development',
        description:
            'Responsive, performant websites and web apps built with modern stacks like React, Node.js and REST APIs.',
    },
    {
        id: 2,
        icon: <FaPalette className="w-8 h-8 text-purple-400" />,
        title: 'UI / UX Design',
        description:
            'Clean, user‑focused interfaces that balance aesthetics with clarity, accessibility and conversion.',
    },
    {
        id: 3,
        icon: <FaServer className="w-8 h-8 text-cyan-300" />,
        title: 'Backend & APIs',
        description:
            'Secure, scalable backends, REST APIs and database design to power dashboards and admin tools.',
    },
];

const About = () => {
    return (
        <section name='about' className='w-full text-gray-300 py-24 relative z-10'>
            <div className='max-w-[1240px] mx-auto px-10'>
                <div className='grid lg:grid-cols-2 gap-12 mb-12 items-start'>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className='text-sm uppercase tracking-[0.3em] text-yellow-300 mb-3'>
                            About Me
                        </p>
                        <h2 className='text-3xl sm:text-4xl font-extrabold text-white mb-4'>
                            Full‑Stack Developer with a networking & multimedia edge.
                        </h2>
                        <p className='text-gray-400 text-base leading-relaxed mb-3'>
                            Ciise Caalim is a versatile Full‑Stack Web Developer with strong experience across both
                            frontend and backend development. He studied Computer Science at Jamhuuriya University and
                            completed intensive professional training at Rice Academy in Mogadishu, a private academy
                            known for producing high‑quality web developers.
                        </p>
                        <p className='text-gray-400 text-base leading-relaxed mb-3'>
                            Beyond writing clean, maintainable code, Ciise understands how the web works at a deeper
                            level. He has hands‑on knowledge of advanced networking concepts such as IP addressing,
                            routing and connectivity, which helps him design systems that are fast, secure and reliable.
                        </p>
                        <p className='text-gray-400 text-base leading-relaxed'>
                            With strong communication skills and experience in multimedia tools like Photoshop,
                            Illustrator, Premiere Pro and CapCut, he collaborates effectively with designers, teams and
                            clients to ship visually engaging, user‑friendly digital products.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className='text-sm uppercase tracking-[0.3em] text-yellow-300 mb-3 text-center lg:text-left'>
                            My Services
                        </p>
                        <h3 className='text-2xl font-semibold text-white mb-6 text-center lg:text-left'>
                            How I can help your next project
                        </h3>

                        <div className='grid md:grid-cols-2 gap-6'>
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className='glass-card rounded-2xl px-6 py-7 flex flex-col gap-4 border border-white/10 hover:border-yellow-300/60 hover:-translate-y-2 transition-all duration-300 cursor-default'
                        >
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-3'>
                                    <div className='flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5'>
                                        {service.icon}
                                    </div>
                                    <h3 className='text-lg font-semibold text-white'>{service.title}</h3>
                                </div>
                                <span className='text-xs uppercase tracking-[0.25em] text-gray-500'>
                                    Service
                                </span>
                            </div>
                            <p className='text-sm text-gray-400 leading-relaxed'>
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
