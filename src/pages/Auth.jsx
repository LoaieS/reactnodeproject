import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../API/api';
import '../styles/Auth.css';

function Auth({ onAuthSuccess }) {
    const [mode, setMode] = useState('login');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '' // Only used in register mode
    });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate username (at least 3 characters)
        if (formData.username.length < 3) {
            setError("Username must be at least 3 characters long.");
        return;
        }

        // Validate password length (3-8 characters)
        if (formData.password.length < 3 || formData.password.length > 8) {
            setError("Password must be between 3 and 8 characters long.");
        return;
        }

        // Validate password contains at least 1 letter and 1 digit
        if (!/(?=.*[A-Za-z])/.test(formData.password) || !/(?=.*\d)/.test(formData.password)) {
            setError("Password must include at least one letter and one digit.");
        return;
        }

        try {
            const endpoint = mode === 'login' ? '/api/users/login' : '/api/users/register';
            const response = await axios.post(endpoint, formData);
            // On success, update the user state in the parent (App.jsx)
            handleAuthSuccess(response.data.user);
        } catch (err) {
            setError(err.response?.data?.error || 'Authentication failed.');
        }
    };

    const handleAuthSuccess = (userData) => {
        console.log("In Auth.jsx - handleAuthSuccess, received userData:", userData);
        onAuthSuccess(userData);
        navigate("/");
    };

    return (
        <div className="auth-container">
        <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
        {error && <p className="auth-error">{error}</p>}
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label>Username:</label>
            <input 
                type="text" 
                name="username" 
                required 
                value={formData.username} 
                onChange={handleChange}
            />
            </div>
            {mode === 'register' && (
            <div className="form-group">
                <label>Email:</label>
                <input 
                type="email" 
                name="email" 
                required 
                value={formData.email} 
                onChange={handleChange}
                />
            </div>
            )}
            <div className="form-group">
            <label>Password:</label>
            <input
                type="password" 
                name="password" 
                required 
                value={formData.password} 
                onChange={handleChange}
            />
            </div>
            <button type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
        </form>
        <p className="auth-toggle">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <a onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
            {mode === 'login' ? 'Register' : 'Login'}
            </a>
        </p>
        </div>
    );
}

export default Auth;
