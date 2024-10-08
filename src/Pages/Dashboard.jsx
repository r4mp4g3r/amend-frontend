import React, { useEffect, useState } from 'react';
import "./Dashboard.css";
import axios from 'axios';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import toast from "react-hot-toast";

import { add, bin, back } from "../assets/assets";
import AddCategoryModel from '../Components/AddCategoryModel';
import AddLinkModel from '../Components/AddLinkModel';
import EditCollectionModel from '../Components/EditCollectionModel';

const Dashboard = () => {
  const { collectionId, categoryId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [collect, setCollect] = useState(null);
  const [category, setCategory] = useState([]);
  const [link, setLink] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCollectionEditModel, setShowCollectionEditModel] = useState(false);

  const getLinks = async () => {
    try {
      const res = await axios.get(`/api/v1/user/collections/${collectionId}/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLink(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch links");
    }
  };

  const getCollection = async () => {
    try {
      const response = await axios.get(`/api/v1/user/collections/get-collection/${collectionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCollect(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch collection");
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get(`/api/v1/user/collections/${collectionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategory(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch categories");
    }
  };

  const deleteCollection = async () => {
    if (window.confirm("Are you sure you want to delete this LinkInBio Page?")) {
      try {
        const res = await axios.delete(`/api/v1/user/collection/${collectionId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success(res.data.message);
        navigate("/collections");
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete collection");
      }
    }
  };

  useEffect(() => {
    getLinks();
  }, [categoryId]);

  useEffect(() => {
    getCollection();
    getCategories();
  }, []);

  return (
    <div className='container'>
      <div className="head">
        <Link to="/collections">
          <div className="button">
            <img src={back} alt="" width={"9px"} /> Back
          </div>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", cursor: "pointer" }}>
          <div className="button" onClick={deleteCollection}>
            <img src={bin} alt="" width={"20px"} />
          </div>
          <button type="button" className="button" onClick={() => setShowCollectionEditModel(!showCollectionEditModel)}>
            Edit
          </button>
        </div>
      </div>

      <EditCollectionModel
        showCollectionEditModel={showCollectionEditModel}
        setShowCollectionEditModel={setShowCollectionEditModel}
        token={token}
        collect={collect}
        collectionId={collectionId}
      />

      <div className="info_card">
        <div>
          <img src={collect?.image.url} alt="Profile Pic" className="profile_pic" />
        </div>
        <div className="name">{collect?.name}</div>
        <div className="profession">@{collect?.handle}</div>
        <div className="profession" style={{ textTransform: "capitalize", color: "gray", marginTop: "5px" }}>
          {collect?.type}
        </div>
      </div>

      <div className="category">
        {category.map((item) => (
          <NavLink to={`/collections/${collectionId}/${item._id}`} className="category_box" key={item._id}>
            <div>
              <img src={item.image} alt="icon" className="icon" />
            </div>
            <div className="category_title">{item.categoryTitle}</div>
          </NavLink>
        ))}

        <div className="category_box" onClick={() => setShowModal(true)}>
          <div><img src={add} alt="icon" className="icon" /></div>
          <div className="category_title">Add</div>
        </div>
      </div>

      <AddCategoryModel
        showModal={showModal}
        setShowModal={setShowModal}
        token={token}
        loading={loading}
        setLoading={setLoading}
        setRedirect={setRedirect}
        collectionId={collectionId}
      />

      <div className="main_content">
        {link.map((item, index) => (
          <Link to={item.url} key={index}>
            <div className="url_card">
              <div className="url_card_info">
                <div className="title">{item.title}</div>
                <div className="desc">{item.description}</div>
              </div>
            </div>
          </Link>
        ))}

        <div className="url_card" onClick={() => setAddModal(true)}>
          <div className="logo">
            <img src={add} alt="" className="url_card_logo" />
          </div>
          <div className="url_card_info">
            <div className="title">Add New</div>
          </div>
        </div>

        <AddLinkModel
          loading={loading}
          setLoading={setLoading}
          addModal={addModal}
          setAddModal={setAddModal}
          token={token}
          collectionId={collectionId}
          categoryId={categoryId}
          link={link}
          setLink={setLink}
        />
      </div>
    </div>
  );
};

export default Dashboard;