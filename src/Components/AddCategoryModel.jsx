import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import icon from '../assets/icon_assets'

const AddCategoryModel = ({showModal, setShowModal, token, loading, setLoading, setRedirect, collectionId}) => {

    const [title, setTitle] = useState("")
    const [iconImage, setIconImage] = useState("https://res.cloudinary.com/dfflk6oiq/image/upload/v1723742238/icons/jdzzqnphwmd3cs55jky6.png")

    const addCategoryHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
          const res = await axios.post(`http://localhost:5000/api/v1/user/collections/${collectionId}/add-category`, {title, image: iconImage}, {
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
          <img src={iconImage} alt="" />
        </button>
        <div className="add_category_heading">New module</div>
        <input type="text" className="input_field shadow" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Module Name"/>
        <div className="select_image">
          {
            icon.map((item, index) => (
              <button key={index} type="button" className="category_box select_image_btn" onClick={() => setIconImage(item.image_url)}>
                <img src={item.image_url} alt="" />
              </button>
            ))
          }
          
        </div>
        <div className="add_category_btn">
          <button type="button" className="final_btn outline_btn" onClick={() => setShowModal(false)}>Cancel</button>
          <button type="submit" className="final_btn">{loading ? "Loading" : "Add"}</button>
        </div>
      </form>
  )
}

export default AddCategoryModel