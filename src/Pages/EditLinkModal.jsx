import React, { useState } from 'react';
import axios from 'axios';

const EditLinkModal = ({ link, token, onClose, onUpdate }) => {
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/v1/user/links/${link.id}`, { title, url }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onUpdate(response.data.link);
      onClose();
    } catch (error) {
      console.error('Error updating link:', error);
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
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditLinkModal;