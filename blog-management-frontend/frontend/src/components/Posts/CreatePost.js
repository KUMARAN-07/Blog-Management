// frontend/src/components/Posts/CreatePost.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import styles from '../../styles/Posts.module.css';

const CreatePost = () => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to create a post');
        setLoading(false);
        return;
      }

      await API.post('/posts', formData);
      setLoading(false);
      navigate('/');
    } catch (err) {
      console.error('Error creating post:', err.response || err);
      if (err.response?.status === 401) {
        setError('Please login to create a post');
      } else {
        setError(
          err.response?.data?.message ||
          'Error creating post. Please try again.'
        );
      }
      setLoading(false);
    }
  };

  return (
    <div className={styles.postContainer}>
      <form className={styles.postForm} onSubmit={handleSubmit}>
        <h2>Create a New Post</h2>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.formGroup}>
          <label className={styles.label}>Title:</label>
          <input
            type="text"
            name="title"
            className={styles.input}
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Content:</label>
          <textarea
            name="content"
            className={styles.textarea}
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your post content here"
          ></textarea>
        </div>
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
