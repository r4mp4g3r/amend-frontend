import React, { useEffect, useRef, useState } from 'react'
import { user_profile, upload } from '../assets/assets'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const EditCollectionModel = ({showCollectionEditModel, setShowCollectionEditModel, token, collect, collectionId}) => {

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

    const submitHandler = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("file", file)
        formData.append("name", name)
        formData.append("type", type)
        setLoading(true)
        console.log(formData)
        try {
            const createCollection = await axios.put(`http://localhost:5000/api/v1/user/update-collection/${collectionId}`, formData, {
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

    useEffect(() => {
        setName(collect?.name)
        setType(collect?.type)
    },[collect])


  return (
    <div className="model" style={{display: showCollectionEditModel ? "block" : "none"}}>
        <div className="model_box">
        <button type="button" className="close_btn" onClick={() => setShowCollectionEditModel(false)}>❌</button>
            <form onSubmit={submitHandler}>
            <div className="profile_pic_box center" onClick={handleClick}>
                <input type="file" name="" accept="image/" id="" hidden ref={inputRef} onChange={changeFileHandler} />
                <img src={filePrev ? filePrev : collect?.image.url} alt="" style={{width: "120px", height: "120px"}} className="profile_pic" />
                <div className="upload center">
                  <img src={upload} alt="" />
                </div>
            </div>

                <div style={{textAlign: "center", margin: "10px 0", textTransform: "capitalize"}}><p>{type}</p></div>
                <div className="inner_container" style={{padding: "15px", textAlign: "left"}}>
                    {/* <div className="inner_container" style={{textAlign: "left"}}>
                        <div className="title">Choose your handle</div>
                        <div className="input_onboard shadow" style={{ marginTop: "5px", marginBottom: "10px"}}>
                            <div className="short_text">Amend.id/</div>
                            <input type="text" value={handle} onChange={(e) => setHandle(e.target.value)} required/>
                            <div className="check_taken">{handleText}</div>
                        </div>
                        </div> */}

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
                    <button disabled={loading} className="collection_submit" type="submit">{loading ? "Loading..." : "Edit Collection"}</button>
                </div>
            </form>
        </div>
        </div>

  )
}

export default EditCollectionModel