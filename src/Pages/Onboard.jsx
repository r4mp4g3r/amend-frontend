import React, { useEffect, useRef, useState } from "react";
import "./Landing.css";
import "./Onboard.css";
import { logo, upload, user_profile } from "../assets/assets.js";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Onboard = () => {

  const navigate = useNavigate()

  const inputRef = useRef(null)

  const [file, setFile] = useState("")
  const [filePrev, setFilePrev] = useState("")
  // const [profileType, setProfileType] = useState("Individual")
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem("token")
  
  const handleClick = () => {
    inputRef.current.click()
  }

  const changeFileHandler = (e) => {
    const file = e.target.files[0]
    console.log(file)

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setFilePrev(reader.result)
      setFile(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      console.log(formData)

      const res = await axios.post("http://localhost:5001/api/v1/upload-image", formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      console.log(res)
      toast.success(res.data.message)
      localStorage.setItem("image", res.data.user.image.url)
      navigate("/collections")
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if(!token){
      navigate("/")
    }
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <div className="outer">
        <div className="small_container">
          <div className="heading">
            <div>
              <img src={logo} alt="Logo" />
            </div>
            <div>
              <Link to="/collections">
                <button type="button" className="final_btn outline_btn">Skip</button>
              </Link>
              <button className="final_btn">{loading ? "Loading..." : "Done"}</button>
            </div>
          </div>
          <div className="final_onboard_container">
            <div className="info">
              <div className="profile_pic_box center" onClick={handleClick}>
                <input type="file" name="" accept="image/" id="" hidden ref={inputRef} onChange={changeFileHandler} />
                <img src={filePrev ? filePrev : user_profile} alt="" className="profile_pic" style={{height: "120px", width:"120px"}} />
                <div className="upload center">
                  <img src={upload} alt="" />
                </div>
              </div>
              <div className="title_final">{localStorage.getItem("name")}</div>
              <div className="handle">@{localStorage.getItem("handle")}</div>
              <div className="type">Individual</div>
              {/* <div className="type_box_container">
                <div className="type_box" onClick={() => setProfileType("Individual")}>Individual</div>
                <div className="type_box" onClick={() => setProfileType("Business")}>Business</div>
                <div className="type_box" onClick={() => setProfileType("Mics")}>Mics</div>
              </div> */}
            </div>

            {/* <div className="category">
              <div className="category_box active">
                <div>
                  <img src={""} alt="icon" className="icon" />
                </div>
                <div className="category_title">Main</div>
              </div>
              <div className="category_box">
                <div>
                  <img src={""} alt="icon" className="icon" />
                </div>
                <div className="category_title">Add</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Onboard;
