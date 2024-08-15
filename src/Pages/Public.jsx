import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link, NavLink } from 'react-router-dom'
import toast from 'react-hot-toast'

const Public = () => {

    const {handle, categoryId} = useParams() 

    const [collect, setCollect] = useState([])
    const [category, setCategory] = useState([])
    const [links, setLinks] = useState([])

    const fetchCollection = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/v1/user/public/${handle}`)
            setCollect(res.data)
            setCategory(res.data.category)
            // const resCategory = await axios.get(`http://localhost:5000/api/v1/public/category/${id}`)
            // console.log(resCategory)
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    const undefinedCat = category[0]?._id
    console.log("UNDEFINED" ,undefinedCat)

    const fetchLink = async () => {
      try {
        if(categoryId === "1"){
          const res = await axios.get(`http://localhost:5000/api/v1/user/public/link/${undefinedCat}`)
          setLinks(res?.data)
        } else {
          const res = await axios.get(`http://localhost:5000/api/v1/user/public/link/${categoryId}`)
          setLinks(res.data)
        }
      } catch (error) {
        console.log(error.response.data.message)
      }
    }
    
    const trey = async () => {
      const res = await axios.get(`http://localhost:5000/api/v1/user/public/link/${undefinedCat}`)
          setLinks(res?.data)
    }

    useEffect(() => {
      trey()
    }, [undefinedCat])

    useEffect(() => {
      fetchLink()
    }, [categoryId])

    // const fetchCategory = async (id) => {
    //     try {
            
    //         console.log(collect._id)
    //         console.log(res.data)
    //     } catch (error) {
    //         console.log(error.response.data.message)
    //     }
    // }

    useEffect(() => {
        fetchCollection()
        // fetchCategory(collect._id)
        fetchLink()
    }, [])

  return (
    <>
    <div className='container'>
      <div className="head">
        <Link to="/collections">
          <div className="button">
            <img src={""} alt="" />{" "}
            iDs
          </div>
        </Link>
        <div className="button">
          
        </div>
      </div>

      <div className="info_card">
        <div className="info_card_box"><img src={collect?.image?.url} alt="Profile Pic" className="profile_pic" /></div>
        <div className="name">{collect?.name}</div>
        <div className="profession" style={{textTransform: "capitalize"}}>{collect?.type}</div>
        <div className="profession" style={{textTransform: "lowercase", color: "gray"}}>@{collect?.name}</div>
      </div>

      <div className="category">
        {
          category.map((item, index) => (
            <NavLink to={`/${handle}/${item._id}`} className="category_box" key={item._id} >
              <div><img src={"user"} alt="icon" className="icon" /></div>
              <div className="category_title">{item.categoryTitle}</div>
            </NavLink>
          ))
        }
      </div>

      {
          links.map((item, index) => (
            <a to={item.url} key={index} target="_blank">
              <div className="url_card" style={{margin: "15px 15px", padding: "8px", cursor: "pointer"}}>
            {/* <div className="logo">
              <img src={"facebook"} alt="" className="url_card_logo"/>
            </div> */}
                <div className="url_card_info">
                  <div className="title">{item.title}</div>
                  <div className="desc">{item.description}</div>
                </div>
              </div>
            </a>
          ))
        }

    </div>
    
    </>
  )
}

export default Public