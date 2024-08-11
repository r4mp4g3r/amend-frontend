import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import "./Landing.css"; // Ensure you have the appropriate styles

const ResetPasswordRequest = () => {
    const [email, setEmail] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            console.log({ email }); // Check the email before sending it
            const res = await axios.post('http://localhost:5001/api/v1/reset-password', { email });
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error sending reset link');
            console.error(error); // Log error for debugging
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
                            <div className="title">Reset password</div>
                            <div style={{ textAlign: "left" }}>
                                <label>Enter email to reset password</label>
                                <input
                                    type="email"
                                    required
                                    className="input_field shadow"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="spacing_box">
                                <Link to="/">
                                    <button type="button" className="onboard_btn">Cancel</button>
                                </Link>
                                <button type="submit" className="onboard_btn" style={{ background: "#fff", color: "#000" }}>Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordRequest;