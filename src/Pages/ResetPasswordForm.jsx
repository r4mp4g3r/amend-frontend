import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ResetPasswordForm = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { token } = useParams(); // Get token from URL
    const navigate = useNavigate();

    console.log("ResetPasswordForm rendered"); // Add this line to confirm component rendering

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("Form submitted with password:", password); // Add this to log the password being submitted

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post(`http://localhost:5001/api/v1/reset-password/${token}`, { password });
            toast.success(res.data.message);
            navigate("/password-changed"); // Redirect to password changed page
        } catch (error) {
            console.error("Error during password reset:", error.response?.data?.message || error); // Log the error
            toast.error(error.response?.data?.message || "Error resetting password");
        }
    };

    return (
        <div className="outer">
            <div className="small_container">
                <div className="heading">
                    {/* Add your logo here if needed */}
                </div>
                <div className="content center">
                    <div className="inner_container">
                        <form onSubmit={submitHandler}>
                            <div className="title">Set password</div>
                            <div style={{ textAlign: "left" }}>
                                <label>Password</label>
                                <input
                                    type="password"
                                    required
                                    className="input_field shadow"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label>Repeat password</label>
                                <input
                                    type="password"
                                    required
                                    className="input_field shadow"
                                    placeholder="Repeat Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div className="spacing_box">
                                <button type="submit" className="onboard_btn" style={{ background: "#fff", color: "#000" }}>Next</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordForm;