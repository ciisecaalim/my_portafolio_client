import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = token;
            setUser({ token }); // In a real app, verify token with backend here
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        // Simple local admin login for Ciise
        if (
            (username === 'ciise@gmail.com' || username === 'ciise@gmail/com') &&
            password === '12345678'
        ) {
            const token = 'local-admin-token';
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = token;
            setUser({ token });
            return;
        }

        // Fallback to backend authentication if different credentials are used
        const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['Authorization'] = res.data.token;
        setUser({ token: res.data.token });
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
