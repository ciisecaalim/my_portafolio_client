import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun } from 'react-icons/fi';

const Navbar = () => {
    const [nav, setNav] = useState(false);

    const links = [
        { id: 1, link: 'home', label: 'home' },
        { id: 2, link: 'about', label: 'about' },
        { id: 3, link: 'skills', label: 'skills' },
        { id: 4, link: 'achievements', label: 'Achievements' },
        { id: 5, link: 'experience', label: 'experience' },
        { id: 6, link: 'certificates', label: 'certificates' },
        { id: 7, link: 'projects', label: 'projects' },
        { id: 8, link: 'contact', label: 'contact' },
    ];

    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-20 flex justify-between items-center px-10 pt-6 z-20"
        >
            <div>
                <h1 className='text-3xl font-extrabold tracking-tighter cursor-pointer text-white'>
                    <span className='text-gradient'>Ciise&nbsp;Caalim</span>
                </h1>
            </div>

            <ul className='hidden md:flex gap-8'>
                {links.map(({ id, link, label }) => (
                    <li key={id} className='relative group'>
                        <Link
                            to={link}
                            smooth={true}
                            duration={500}
                            className='cursor-pointer font-medium text-gray-300 hover:text-white capitalize text-lg tracking-wide transition-colors'
                        >
                            {label}
                        </Link>
                        <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-400 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                    </li>
                ))}
            </ul>

            {/* Right side controls */}
            <div className="flex items-center gap-4">
                {/* Theme toggle placeholder to match design */}
                <button
                    type="button"
                    className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-yellow-300 hover:bg-yellow-400/10 hover:border-yellow-300/60 transition-colors"
                >
                    <FiSun size={18} />
                </button>

                <div onClick={() => setNav(!nav)} className='cursor-pointer pr-1 text-gray-300 md:hidden'>
                    {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
                </div>
            </div>

            <AnimatePresence>
                {nav && (
                    <motion.ul
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 100 }}
                        className='flex flex-col justify-center items-center absolute top-0 right-0 w-full h-screen bg-black/95 z-50 md:hidden'
                    >
                        {links.map(({ id, link, label }) => (
                            <li key={id} className='px-4 cursor-pointer capitalize py-6 text-4xl text-gray-300 hover:text-white hover:scale-110 transition-transform'>
                                <Link onClick={() => setNav(false)} to={link} smooth={true} duration={500}>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Navbar;
