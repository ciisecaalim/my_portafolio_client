import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='w-full bg-black/50 text-gray-400 py-8 border-t border-white/5 backdrop-blur-sm relative z-10'>
            <div className='max-w-[1240px] mx-auto flex flex-col items-center justify-center px-4'>
                <div className='flex gap-8 mb-4'>
                    <FaGithub className='w-6 h-6 hover:text-white cursor-pointer hover:scale-110 transition' />
                    <FaLinkedin className='w-6 h-6 hover:text-white cursor-pointer hover:scale-110 transition' />
                    <FaTwitter className='w-6 h-6 hover:text-white cursor-pointer hover:scale-110 transition' />
                </div>
                <div className='text-center'>
                    <p className='text-sm mb-2'>&copy; {new Date().getFullYear()} Ciise Caalim. All rights reserved.</p>
                    <p className='text-xs flex items-center justify-center gap-1 opacity-70'>
                        Made with <span className='text-red-500'><FaHeart /></span> and React
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
