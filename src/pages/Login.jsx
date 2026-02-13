import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/dashboard');
        } catch (err) {
            console.error('Login failed:', err);
            alert('Invalid credentials');
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950'>
            <form onSubmit={onSubmit} className='flex flex-col w-full max-w-sm p-8 glass-card rounded-2xl border border-white/10'>
                <h2 className='text-3xl font-bold text-center text-white mb-2'>Ciise Caalim</h2>
                <p className='text-center text-sm text-gray-400 mb-8'>
                    Admin login to manage projects, messages and certificates.
                    Use <span className='font-semibold text-yellow-300'>ciise@gmail.com</span> / <span className='font-semibold'>12345678</span>.
                </p>
                <input
                    type="email"
                    placeholder="Email (ciise@gmail.com)"
                    name="username"
                    value={username}
                    onChange={onChange}
                    className='mb-4 p-3 bg-[#ccd6f6] rounded text-primary focus:outline-none'
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    className='mb-6 p-3 bg-[#ccd6f6] rounded text-primary focus:outline-none'
                    required
                />
                <button type="submit" className='w-full py-3 bg-secondary text-primary font-bold rounded hover:bg-[#4cc9ac] transition duration-300'>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
