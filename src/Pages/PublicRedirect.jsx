import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import {loading, loader} from "../assets/assets"

const PublicRedirect = () => {

    const {handle} = useParams();
    const navigate = useNavigate()

    const [collect, setCollect] = useState([])
    const [category, setCategory] = useState([])

    const fetchData = async () => {
        const res = await axios.get(`http://localhost:5000/api/v1/user/public/${handle}`)
        setCollect(res.data)
        setCategory(res.data.category)
        navigate(`/${handle}/1`)
    }


    useEffect(() => {
        fetchData()
    }, [])

  return (
    <div style={{height: "100vh", width: "100%", background: "#fff", justifyContent: "center", alignItems: "center"}}>
      <img src={loading} alt="" width={"120px"} />
    </div>
  )
}

export default PublicRedirect