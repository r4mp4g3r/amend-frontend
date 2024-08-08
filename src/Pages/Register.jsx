import React, { useEffect, useState } from 'react'
import "./Landing.css"
import "./Register.css"
import {logo} from "../assets/assets.js"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const OnBoard = () => {

    const navigate = useNavigate()

    const [handle, setHandle] = useState("")
    const [handleAvailable, setHandleAvailable] = useState(false)
    const [handleText, setHandleText] = useState("")

    const checkHandle = async () => {

        if(handle === ""){
            setHandleText("")
            return setHandleAvailable(false)
        }
        const res = await axios.post("http://localhost:5000/api/v1/checkhandle", {handle})
        if(res.status === 201){
            setHandleText("✅")
            setHandleAvailable(true)
        } else {
            setHandleText("❌")
            setHandleAvailable(false)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            checkHandle()
          }, "1100");
        
    }, [handle])

  return (

    <div className="outer">
        <div className="small_container">
            <div className="heading">
                <img src={logo} alt="Logo" />
            </div>
            <div className="content center">
                <div className="inner_container">
                <div className="title">Choose your handle</div>
                <div className="input_onboard shadow">
                    <div className="short_text">Amend.id/</div>
                    <input type="text" value={handle} onChange={(e) => setHandle(e.target.value)} required/>
                    <div className="check_taken">{handleText}</div>
                </div>
                <div className="spacing_box">
                    <Link to="/">
                        <button className="onboard_btn">Cancel</button>
                    </Link>
                    <Link to={`/register/1?handle=${handle}`}>
                        <button
                        type="button"
                        className="onboard_btn" 
                        style={{background: "#fff", color:"#000"}}
                        disabled={!handleAvailable}
                        >
                          Next
                        </button>
                    </Link>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OnBoard