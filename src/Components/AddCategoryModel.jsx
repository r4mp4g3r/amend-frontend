import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {music, money, message} from "../assets/buttonImage/buttonImage"
import toast from 'react-hot-toast'

const AddCategoryModel = ({showModal, setShowModal, token, loading, setLoading, setRedirect, collectionId}) => {

    const [title, setTitle] = useState("")

    const addCategoryHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
          const res = await axios.post(`http://localhost:5000/api/v1/user/collections/${collectionId}/add-category`, {title}, {
            headers: {
              Authorization: `Bearer ${token}`
          }
        })
        toast.success(res.data.message)
        console.log("ADD", res)
        setLoading(false)
        setRedirect(true)
        } catch (error) {
          toast.error(error.response.data.message)
          setLoading(false)
        }
      }

  return (
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
  )
}

export default AddCategoryModel