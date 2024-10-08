import React, { useState } from 'react';
import "./Landing.css";
import "./Register1.css";
import { logo } from "../assets/assets.js";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

const Signin = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false); // New state for handling errors

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false); // Reset error state

        try {
            const res = await axios.post("http://localhost:5001/api/v1/login", user);
            console.log(res);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("name", res.data.user.name);
            localStorage.setItem("handle", res.data.user.handle);
            localStorage.setItem("email", res.data.user.email);
            localStorage.setItem("image", res.data.user.image ? res.data.user.image.url : null);
            toast.success(res.data.message);
            setLoading(false);
            navigate("/collections");
        } catch (error) {
            setError(true); // Set error state on failure
            toast.error(error.response?.data?.message || "Sign in failed. Please try again.");
            console.log(error.response?.data?.message || error);
            setLoading(false);
        }
    };

    return (
        <div className="outer">
            <div className="small_container">
                <div className="heading">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="content center">
                    <div className="inner_container">
                        <form onSubmit={submitHandler}>
                            <div className="title">Sign in</div>
                            <div style={{ textAlign: "left" }}>
                                <label>Email</label>
                                <input
                                    type="text"
                                    required
                                    name="email"
                                    className="input_field shadow"
                                    placeholder="Enter Email"
                                    onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                                />
                                <label>Password</label>
                                <input
                                    type="password"
                                    required
                                    name="password"
                                    className="input_field shadow"
                                    placeholder="Enter Password"
                                    onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                                />
                                {error && <span className="error-text" style={{ color: "red" }}>*incorrect*</span>}
                            </div>
                            <div className="spacing_box">
                                <Link to="/">
                                    <button type="button" className="onboard_btn">Cancel</button>
                                </Link>
                                <Link to="/reset-password">
                                    <button type="button" className="onboard_btn">Reset password</button>
                                </Link>
                                <button type="submit" className="onboard_btn" style={{ background: "#fff", color: "#000" }}>
                                    {loading ? "Loading..." : "Next"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;