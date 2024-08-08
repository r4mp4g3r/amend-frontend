import React from 'react'
import "./Landing.css"
import {logo, rocket} from "../assets/assets.js"
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className="outer">
        <div className="small_container">
            <div className="heading">
                <img src={logo} alt="Logo" />
            </div>
            <div className="content center">
                <div className="inner_container">
                <div className="title">Welcome to Amend iD</div>
                 <Link to="/signin">
                     <div className="btn shadow">
                         Sign in
                     </div>
                 </Link>
                <Link to="/register">
                     <div className="btn shadow center">
                         Create iD 
                         <img src={rocket} alt="create id" style={{paddingLeft: "8px"}} />
                     </div>
                 </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Landing