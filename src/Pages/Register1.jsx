import React, { useState } from 'react'
import "./Landing.css"
import "./Register1.css"
import {logo} from "../assets/assets.js"
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast';
import Loading from "../assets/Loading.svg"

const Register1 = () => {

    const navigate = useNavigate()

    const [handle, setHandle] = useSearchParams();
    const handleUsername = handle.get('handle')

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        handle: handleUsername
    })
    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post("http://localhost:5001/api/v1/register", user);
            console.log(res)
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("name", res.data.user.name);
            localStorage.setItem("handle", res.data.user.handle);
            localStorage.setItem("email", res.data.user.email);
            toast.success(res.data.message)
            setLoading(false)
            navigate("/onboard")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error.response.data.message)
            setLoading(false)
        }
    }

  return (
    <>
    <div className="outer">
        <div className="small_container">
            <div className="heading">
                <img src={logo} alt="Logo" />
            </div>
            <div className="content center">
                <div className="inner_container">
                <form onSubmit={submitHandler}>
                    <div className="title">Enter Name & Email</div>
                    <div style={{textAlign: "left"}}>
                    <label>Name</label>
                    <input type="text" required name="name" className="input_field shadow" placeholder="Enter Name" onChange={(e) => setUser({...user, [e.target.name]: e.target.value})} />
                    <label>Email</label>
                    <input type="text" required name="email" className="input_field shadow" placeholder="Enter Email" onChange={(e) => setUser({...user, [e.target.name]: e.target.value})} />
                    <label>Password</label>
                    <input type="password" required name="password" className="input_field shadow" placeholder="Enter Password" onChange={(e) => setUser({...user, [e.target.name]: e.target.value})} />
                    </div>
                    <div className="spacing_box">
                        <Link to="/">
                            <button type="button" className="onboard_btn">Cancel</button>
                        </Link>
                        <button type="submit" className="onboard_btn" style={{background: "#fff", color:"#000"}}>
                            {loading ? "Loading..." : "Submit"}
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Register1