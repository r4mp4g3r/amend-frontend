import React, { useState } from 'react';
import axios from 'axios';

const EditCategoryModal = ({ category, token, onClose, onUpdate }) => {
  const [title, setTitle] = useState(category.title);
  const [url, setUrl] = useState(category.url);
  const [description, setDescription] = useState(category.description || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/v1/user/categories/${category.id}`, {
        title,
        url,
        description,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onUpdate(response.data.category);
      onClose();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
          required
        />
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description (Optional)"
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditCategoryModal;