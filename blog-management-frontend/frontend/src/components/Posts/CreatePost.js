// frontend/src/components/Posts/CreatePost.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

const CreatePost = () => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/posts', formData);
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Content:</label>
          <textarea name="content" value={formData.content} onChange={handleChange} required></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
