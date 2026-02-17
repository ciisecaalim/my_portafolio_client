import React from 'react';
import { HiArrowNarrowRight, HiDownload } from 'react-icons/hi';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Hero = () => {
    return (
        <section name='home' className='w-full relative overflow-hidden pt-24 pb-16'>
            {/* Container */}
            <div className='max-w-[1240px] mx-auto px-10'>
                <div className='flex flex-col-reverse md:flex-row justify-between items-center gap-12 md:gap-16'>

                    {/* Text Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className='flex flex-col justify-center md:w-3/5'
                    >
                        <p className='text-yellow-300 font-mono text-base mb-3 tracking-wide'>
                            Full-Stack Web Developer
                        </p>
                        <h1 className='text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-3 leading-tight'>
                            Hi, I&apos;m <span className='text-gradient'>Ciise Caalim</span>
                        </h1>
                        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-300 mb-6'>
                            Building reliable, modern web experiences.
                        </h2>
                        <p className='text-gray-400 max-w-[600px] text-lg leading-relaxed'>
                            I&apos;m a passionate Full‑Stack Web Developer with experience across React, Node.js, Express,
                            MongoDB and SQL. I studied Computer Science at Jamhuuriya University and completed
                            professional full‑stack training at Rice Academy in Mogadishu, where I honed both my frontend
                            and backend skills.
                        </p>

                        <div className='flex flex-wrap gap-4 mt-8'>
                            <Link to="projects" smooth={true} duration={500}>
                                <button className='group text-gray-900 bg-yellow-300 px-7 py-3 flex items-center rounded-full font-semibold hover:bg-yellow-400 transition-all duration-300 shadow-[0_10px_25px_rgba(250,204,21,0.45)]'>
                                    View Portfolio
                                    <span className='group-hover:translate-x-1 duration-300'>
                                        <HiArrowNarrowRight className='ml-3' />
                                    </span>
                                </button>
                            </Link>
                            <a href="/resume" target="_blank" rel="noopener noreferrer">
                                <button className='text-white bg-white/5 border border-white/15 px-7 py-3 flex items-center rounded-full font-medium hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-sm'>
                                    Download CV <HiDownload className='ml-2' />
                                </button>
                            </a>
                        </div>

                        {/* Social Icons (Inline) */}
                        <div className='flex gap-6 mt-10 text-gray-400'>
                          <a href="https://github.com/ciisecaalim"> <FaGithub className='w-6 h-6 hover:text-white cursor-pointer hover:scale-110 transition' /></a> 
                           <a href="https://www.linkedin.com/in/ciise-caalim-29ba8536a/"> <FaLinkedin className='w-6 h-6 hover:text-white cursor-pointer hover:scale-110 transition' /></a>
                           <a
  href="https://wa.me/252619810803?text=Asc%20Wll%20IsCo,%20Waxaan%20rabaa%20in%20aan%20kula%20xiriirto%20arrin%20la%20xiriirta%20project."
  target="_blank"
  rel="noopener noreferrer"
>
  <FaWhatsapp className="w-6 h-6 hover:text-green-400 cursor-pointer hover:scale-110 transition" />
</a>

                        </div>
                    </motion.div>

                    {/* Visual/Image Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.15 }}
                        className='flex justify-center items-center md:w-2/5'
                    >
                            <div className='relative w-64 h-64 sm:w-72 sm:h-72'>
                            <div className='absolute -inset-3 rounded-3xl bg-linear-to-tr from-yellow-300 via-purple-500 to-cyan-400 opacity-90 blur-[2px]'></div>
                            <div className='relative w-full h-full rounded-3xl overflow-hidden glass-card border border-yellow-300/40'>
                                <img
                                    src="/img/img.jpeg"
                                    alt="Profile"
                                    className='w-full h-full object-cover opacity-90 hover:scale-110 transition duration-700'
                                />
                                <div className='absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent'></div>
                                <div className="absolute bottom-4 left-4">
                                    <p className='text-white font-semibold text-lg'>Ciise Caalim</p>
                                    <p className='text-xs text-yellow-300 uppercase tracking-widest'>Full‑Stack Web Developer</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Stats strip */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.25 }}
                    className="mt-12"
                >
                    <div className='glass-card rounded-2xl px-8 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center'>
                        <div>
                            <p className='text-3xl sm:text-4xl font-extrabold text-white mb-1'>2+</p>
                            <p className='text-sm uppercase tracking-[0.2em] text-gray-400'>Years Experience</p>
                        </div>
                        <div className='border-y sm:border-y-0 sm:border-x border-white/10 py-4 sm:py-0'>
                            <p className='text-3xl sm:text-4xl font-extrabold text-white mb-1'>20+</p>
                            <p className='text-sm uppercase tracking-[0.2em] text-gray-400'>Projects Completed</p>
                        </div>
                        <div>
                            <p className='text-3xl sm:text-4xl font-extrabold text-white mb-1'>10+</p>
                            <p className='text-sm uppercase tracking-[0.2em] text-gray-400'>Happy Clients</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
