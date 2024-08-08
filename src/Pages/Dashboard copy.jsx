import React, { useEffect, useState } from 'react'
// import { BottomNavbar } from '../Components/BottomNavbar.jsx'
import "./Dashboard.css"
import axios from 'axios'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import toast from "react-hot-toast"

import {add, user} from "../assets/assets"
import {music, money, message} from "../assets/buttonImage/buttonImage"

const Dashboard = () => {

  const {handle, id, categoryId, catName} = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const [loading, setLoading] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [collect, setCollect] = useState(null)
  const [data, setData] = useState([])

  const [showModal, setShowModal] = useState(false)
  const [addModal, setAddModal] = useState(false)

  const [title, setTitle] = useState("")

  const [addLink, setAddLink] = useState({
    title: "",
    url: "",
    description: ""
  })

  // -----------------------------------

  const addLinkHandler = async (e) => {
    e.preventDefault()
    console.log(addLink)
    try {
      const response = await axios.post(`http://localhost:5000/api/v1/user/collections/${id}/${categoryId}`, addLink, {
        headers: {
          Authorization: `Bearer ${token}`
      }
    })
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const getLinks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/user/collections/${id}/${categoryId}/${catName}`, addLink, {
        headers: {
          Authorization: `Bearer ${token}`
      }
    })
      console.log("Data",response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  // -----------------------------------------

  const getCollection = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/user/collections/${handle}`, {
            headers: {
              Authorization: `Bearer ${token}`
          }
        })
      setCollect(response.data)
      setData(response.data.category)  
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  console.log(data)

  const addCategoryHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(`http://localhost:5000/api/v1/user/collections/${id}/add-category`, {title}, {
        headers: {
          Authorization: `Bearer ${token}`
      }
    })
    toast.success(res.data.message)
    console.log(res)
    setLoading(false)
    setRedirect(true)
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if(redirect){
      window.location.reload();
    }
  }, [redirect])

  useEffect(() => {
    if(!token){
      navigate("/login")
    }
    getCollection()
    // getLinks()
  }, [])
  

  return (
    <>
    <div className='container'>
      <div className="head">
        <div className="button">
          <img src={""} alt="" />{" "}
          iDs
        </div>
        <div className="button">
          <img src={""} alt="" width={"15px"}/>{" "}
          Edit
        </div>
      </div>

      <div className="info_card">
        <div><img src={collect?.image.url} alt="Profile Pic" className="profile_pic" /></div>
        <div className="name">{collect?.name}</div>
        <div className="profession" style={{textTransform: "capitalize"}}>{collect?.type}</div>
      </div>

      <div className="category">
        {
          data.map((item, index) => (
            <NavLink to={`/collections/${id}/${item._id}/${item.categoryTitle}`} className="category_box" key={item._id} >
              <div><img src={user} alt="icon" className="icon" /></div>
              <div className="category_title">{item.categoryTitle}</div>
            </NavLink>
          ))
        }

            <Link to={``} >
              <div className="category_box" onClick={() => setShowModal(!showModal)}>
                <div><img src={add} alt="icon" className="icon" /></div>
                <div className="category_title">Add</div>
              </div>
            </Link>

      </div>

      <form onSubmit={addCategoryHandler} className="add_category_modal" style={{display: showModal ? "block" : "none", padding: "0 15px"}}>
        <button className="category_box select_image_btn">
          <img src={message} alt="" />
        </button>
        <div className="add_category_heading">New module</div>
        <input type="text" className="input_field shadow" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Module Name"/>
        <div className="select_image">
          <button className="category_box select_image_btn">
            <img src={message} alt="" />
          </button>
          <button className="category_box select_image_btn">
            <img src={music} alt="" />
          </button>
          <button className="category_box select_image_btn">
            <img src={money} alt="" />
          </button>
        </div>
        <div className="add_category_btn">
          <button type="button" className="final_btn outline_btn" onClick={() => setShowModal(false)}>Cancel</button>
          <button type="submit" className="final_btn">{loading ? "Loading" : "Add"}</button>
        </div>
      </form>

      <div className="main_content">
      

        <div className="url_card">
          {/* <div className="logo">
            <img src={"facebook"} alt="" className="url_card_logo"/>
          </div> */}
          <div className="url_card_info">
            <div className="title">Personal Site</div>
            <div className="desc">It's a mic of everything me</div>
          </div>
        </div>

        <div className="url_card" style={{display: addModal ? "block" : "none"}}>
          <form className="url_card_info_inputs" onSubmit={addLinkHandler}>
            <input type="text" value={addLink.title} name="title" onChange={(e) => setAddLink(prev => ({...prev, [e.target.name]: e.target.value}))} placeholder="Enter Title" />
            <input type="text" value={addLink.url} name="url" onChange={(e) => setAddLink(prev => ({...prev, [e.target.name]: e.target.value}))} placeholder="Enter Url" />
            <input type="text" value={addLink.description} name="description" onChange={(e) => setAddLink(prev => ({...prev, [e.target.name]: e.target.value}))} placeholder="Enter Description (Optional)" />
            <div className="add_category_btn">
              <button type="button" className="final_btn outline_btn" onClick={() => setAddModal(false)}>Cancel</button>
              <button type="submit" className="final_btn">{loading ? "Loading..." : "Add"}</button>
            </div>
          </form>
        </div>

        <div className="url_card" onClick={() => setAddModal(true)}>
          <div className="logo">
            <img src={add} alt="" className="url_card_logo"/>
          </div>
          <div className="url_card_info">
            <div className="title">Add New</div>
          </div>
        </div>

      </div>
      {/* <BottomNavbar /> */}
    </div>
    
    </>
  )
}

export default Dashboard