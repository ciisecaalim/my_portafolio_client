import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/contact', formData);
            alert('Message Sent!');
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            console.error(err);
            alert('Failed to send message');
        }
    };

    return (
        <div name='contact' className='w-full md:h-screen p-4 flex justify-center items-center py-32 relative z-10'>
            <motion.form
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                onSubmit={handleSubmit}
                className='flex flex-col max-w-[600px] w-full glass p-8 rounded-2xl border border-white/10'
            >
                <div className='pb-8'>
                    <p className='text-4xl font-bold inline border-b-4 border-pink-600 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600'>Contact</p>
                    <p className='text-gray-400 py-4'>// Submit the form below or shoot me an email - myemail@example.com</p>
                </div>

                <input
                    className='bg-[#ccd6f6]/5 p-4 text-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 focus:bg-[#ccd6f6]/10 transition-all border border-white/5'
                    type="text"
                    placeholder='Name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    className='my-4 p-4 bg-[#ccd6f6]/5 text-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 focus:bg-[#ccd6f6]/10 transition-all border border-white/5'
                    type="email"
                    placeholder='Email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <textarea
                    className='bg-[#ccd6f6]/5 p-4 text-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 focus:bg-[#ccd6f6]/10 transition-all border border-white/5'
                    name="message"
                    rows="10"
                    placeholder='Message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>

                <button className='text-white border border-purple-500 bg-purple-600/20 hover:bg-purple-600 hover:border-purple-600 px-4 py-3 my-8 mx-auto flex items-center rounded-md font-bold text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]'>
                    Let's Collaborate
                </button>
            </motion.form>
        </div>
    );
};

export default Contact;
