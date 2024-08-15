import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

const AddLinkModel = ({loading, setLoading, setAddModal, addModal, token, collectionId, categoryId, link, setLink}) => {

    const [addLink, setAddLink] = useState({
        title: "",
        url: "",
        description: ""
      })

    const addLinkHandler = async (e) => {
        e.preventDefault()
        try {
          const res = await axios.post(`http://localhost:5000/api/v1/user/collections/${collectionId}/${categoryId}`, addLink, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          console.log(res.data)
          setLink([res.data, ...link])
          setAddModal(false)
        } catch (error) {
          toast.error(error.response.data.message)
        }
      }

  return (
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
  )
}

export default AddLinkModel