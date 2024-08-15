import React, { useEffect, useRef, useState } from 'react'
import { user_profile, upload } from '../assets/assets'
import toast from 'react-hot-toast'
import axios from 'axios'

const AddCollectionModel = ({setShowModel, showModel, token, collections, setCollections}) => {

    const [name, setName] = useState("")
    const [type, setType] = useState("individual")

    const [loading, setLoading] = useState(false)

    //-------------------Image----------------------------
    const inputRef = useRef(null)
    const [file, setFile] = useState("")
    const [filePrev, setFilePrev] = useState("")

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

      //--------------------------------------------------

    // ------------------Check Handle Availability--------------
    const [handle, setHandle] = useState("")
    const [handleAvailable, setHandleAvailable] = useState(false)
    const [handleText, setHandleText] = useState("")

    const checkHandle = async () => {
        try {
            if(handle === ""){
                setHandleText("")
                return setHandleAvailable(false)
            }
            const res = await axios.post("http://localhost:5000/api/v1/user/check-collections-handle", {handle}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(res.status === 200){
                setHandleText("✅")
                setHandleAvailable(true)
            } else {
                setHandleText("❌")
                setHandleAvailable(false)
            }
        } catch (error) {
            setHandleText("❌")
            setHandleAvailable(false)
            console.log(error.response.data.message)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            checkHandle()
          }, "1300");
        
    }, [handle])

    // --------Check Handle Availability--------

    const submitHandler = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("file", file)
        formData.append("name", name)
        formData.append("type", type)
        formData.append("handle", handle)
        setLoading(true)
        console.log(formData)
        try {
            const createCollection = await axios.post("http://localhost:5000/api/v1/user/create-collection", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }) 
            console.log(createCollection)
            toast.success(createCollection.data.message)
            setCollections([createCollection.data.collection, ...collections])
            setFilePrev("")
            setName("")
            setShowModel(false)
            setLoading(false)
            
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error.response.data.message)
            setLoading(false)
        }
    }


  return (
    <div className="model" style={{display: showModel ? "block" : "none"}}>
        <div className="model_box">
        <button type="button" className="close_btn" onClick={() => setShowModel(false)}>❌</button>
            <form onSubmit={submitHandler}>
            <div className="profile_pic_box center" onClick={handleClick}>
                <input type="file" name="" accept="image/" id="" hidden ref={inputRef} onChange={changeFileHandler} />
                <img src={filePrev ? filePrev : user_profile} alt="" style={{width: "120px", height: "120px"}} className="profile_pic" />
                <div className="upload center">
                  <img src={upload} alt="" />
                </div>
            </div>

                <div style={{textAlign: "center", margin: "10px 0", textTransform: "capitalize"}}><p>{type}</p></div>
                <div className="inner_container" style={{padding: "15px", textAlign: "left"}}>
                    <div className="inner_container" style={{textAlign: "left"}}>
                        <div className="title">Choose your handle</div>
                        <div className="input_onboard shadow" style={{ marginTop: "5px", marginBottom: "10px"}}>
                            <div className="short_text">Amend.id/</div>
                            <input type="text" value={handle} onChange={(e) => setHandle(e.target.value)} required/>
                            <div className="check_taken">{handleText}</div>
                        </div>
                        </div>

                    <label htmlFor="">Name</label>
                    <input type="text" className='input_field shadow' required placeholder='Enter name' 
                    onChange={(e) => setName(e.target.value)}
                    value={name} />
                    <div className="select_type">
                        <button type="button" onClick={() => setType("individual")}>Individual</button>
                        <button type="button" onClick={() => setType("business")}>Business</button>
                        <button type="button" onClick={() => setType("misc")}>Misc</button>
                    </div>
                </div>
                <div style={{textAlign: "center"}}>
                    <button className="collection_submit" type="submit">{loading ? "Loading..." : "Create Collection"}</button>
                </div>
            </form>
        </div>
        </div>

  )
}

export default AddCollectionModel