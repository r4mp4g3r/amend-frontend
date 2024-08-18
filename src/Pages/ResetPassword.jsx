import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`/api/reset-password/${token}`, { newPassword });
        alert('Password successfully reset.');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                placeholder="Enter your new password" 
                required
            />
            <button type="submit">Reset Password</button>
        </form>
    );
};

export default ResetPassword;