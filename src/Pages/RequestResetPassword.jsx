import React, { useState } from 'react';
import axios from 'axios';

const RequestResetPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/request-reset-password', { email });
        alert('Password reset link sent to your email.');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email" 
                required
            />
            <button type="submit">Request Password Reset</button>
        </form>
    );
};

export default RequestResetPassword;