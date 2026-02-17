import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import API_URL from '../config';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // ✅ Validation Function
    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[A-Za-z\s]+$/;

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 3) {
            newErrors.name = 'Name must be at least 3 characters';
        } else if (!nameRegex.test(formData.name)) {
            newErrors.name = 'Name can only contain letters';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Enter a valid email address';
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        return newErrors;
    };

    // ✅ Handle Change
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'name') {
            // Remove numbers & special characters automatically
            const onlyLetters = value.replace(/[^A-Za-z\s]/g, '');
            setFormData({
                ...formData,
                name: onlyLetters
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }

        // Clear error while typing
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    // ✅ Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);

            await axios.post(
                `${API_URL}/api/contact`,
                formData
            );

            Swal.fire({
                title: 'Success!',
                text: 'Message Sent Successfully ✅',
                icon: 'success',
                confirmButtonColor: '#9333ea',
                timer: 2000,
                showConfirmButton: false
            });

            setFormData({
                name: '',
                email: '',
                message: ''
            });

            setErrors({});
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to send message ❌',
                icon: 'error',
                confirmButtonColor: '#ef4444'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            name='contact'
            className='w-full md:h-screen p-4 flex justify-center items-center py-32 relative z-10'
        >
            <motion.form
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                onSubmit={handleSubmit}
                className='flex flex-col max-w-[600px] w-full glass p-8 rounded-2xl border border-white/10'
            >
                <div className='pb-8'>
                    <p className='text-4xl font-bold inline border-b-4 border-pink-600 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600'>
                        Contact
                    </p>
                    <p className='text-gray-400 py-4'>
                        // Submit the form below or send direct email
                    </p>
                </div>

                {/* Name */}
                <input
                    type='text'
                    name='name'
                    placeholder='Name'
                    value={formData.name}
                    onChange={handleChange}
                    className={`p-4 rounded-lg outline-none transition-all border 
                        ${errors.name
                            ? 'border-red-500 bg-red-500/5'
                            : 'border-white/5 bg-[#ccd6f6]/5 focus:ring-2 focus:ring-purple-500'}
                        text-gray-200`}
                />
                {errors.name && (
                    <p className='text-red-400 text-sm mt-1'>{errors.name}</p>
                )}

                {/* Email */}
                <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                    className={`my-4 p-4 rounded-lg outline-none transition-all border 
                        ${errors.email
                            ? 'border-red-500 bg-red-500/5'
                            : 'border-white/5 bg-[#ccd6f6]/5 focus:ring-2 focus:ring-purple-500'}
                        text-gray-200`}
                />
                {errors.email && (
                    <p className='text-red-400 text-sm mt-1 -mt-2 mb-2'>{errors.email}</p>
                )}

                {/* Message */}
                <textarea
                    name='message'
                    rows='6'
                    placeholder='Message'
                    value={formData.message}
                    onChange={handleChange}
                    className={`p-4 rounded-lg outline-none transition-all border 
                        ${errors.message
                            ? 'border-red-500 bg-red-500/5'
                            : 'border-white/5 bg-[#ccd6f6]/5 focus:ring-2 focus:ring-purple-500'}
                        text-gray-200`}
                ></textarea>
                {errors.message && (
                    <p className='text-red-400 text-sm mt-1'>{errors.message}</p>
                )}

                {/* Button */}
                <button
                    type='submit'
                    disabled={loading}
                    className={`mt-8 px-6 py-3 rounded-md font-bold text-lg transition-all duration-300
                        ${loading
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700 hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]'}
                        text-white`}
                >
                    {loading ? 'Sending...' : "Let's Collaborate"}
                </button>
            </motion.form>
        </div>
    );
};

export default Contact;
