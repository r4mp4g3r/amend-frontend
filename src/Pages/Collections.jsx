import React, { useEffect, useState, useRef } from 'react'
import CollectionCard from '../Components/CollectionCard'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import "./Collections.css"
import { add, user_profile, upload, loader } from '../assets/assets'
import toast from "react-hot-toast"
import AddCollectionModel from '../Components/AddCollectionModel'

const Collections = () => {

    const navigate = useNavigate()
    const token = localStorage.getItem("token");

    const [collections, setCollections] = useState([])
    const [showModel, setShowModel] = useState(false)
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
            const res = await axios.post("http://localhost:5001/api/v1/user/collections/check-handle", {handle}, {
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
            const createCollection = await axios.post("http://localhost:5001/api/v1/user/create-collection", formData, {
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

    const getAllCollections = async () => {
        try {
            const res = await axios.get("http://localhost:5001/api/v1/user/collections", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res)
            setCollections(res.data.data)
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    const getAllSavedCollections = async () => {

    }

    console.log(collections)

    useEffect(() => {
        if(!token){
            navigate("/signin")
        }
        localStorage.setItem("image", "https://res.cloudinary.com/dfflk6oiq/image/upload/v1723648086/user_profile_p8ofmu.jpg")
        getAllCollections()
    }, [])

  return (
    <div className="container">
        <div className="collection_header">
            <div className="collection_image">
                <img src={localStorage.getItem("image") ? localStorage.getItem("image") : user_profile } alt="user profile image" className="profile_pic" />
            </div>
            <div>iDs</div>
            <div>
                <button type="button" onClick={() => setShowModel(true)}><img src={add} alt="" /></button>
            </div>
        </div>

        <AddCollectionModel showModel={showModel} setShowModel={setShowModel} token={token} collections={collections} setCollections={setCollections} />

        <div style={{padding: "15px"}}>
            <div style={{fontSize: "20px"}}>My iDs</div>
            {
                collections && collections.map((collection, index) => (
                    <Link to={`/collections/${collection._id}/${collection.category[0]}`} key={index}>
                        <div className="id_card" >
                            <div className="id_card_img_box">
                                <img src={collection.image?.url ? collection.image?.url : localStorage.getItem("image")} alt="" />
                            </div>
                            <div>
                                <div className="id_card_name">{collection.name}</div>
                                <div className="id_card_type">{collection.type}</div>
                            </div>
                        </div>
                    </Link>
                )) 
            }
            {collections.length === 0 && <p className="create_new_text" onClick={() => setShowModel(true)}>No iDs! Create a new iD</p>}
            

        </div>

        {/* <div style={{padding: "15px"}}>
            <div style={{fontSize: "20px"}}>Public</div>        

            <div className="id_card">
                <div className="id_card_img_box">
                    <img src={localStorage.getItem("image")} alt="" />
                </div>
                <div>
                    <div className="id_card_name">Ankan Mandal</div>
                    <div className="id_card_type">Individual</div>
                </div>
            </div>
        </div> */}

    </div>
  )
}

export default Collections