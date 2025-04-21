import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import API from '../../services/api';
import styles from '../../styles/Posts.module.css';

const PostDetail = () => {
  const { id } = useParams();  // Get post ID from URL
  const { user } = useContext(AuthContext); // Get logged-in user
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("Error fetching post:", err));
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Post deleted successfully");
      navigate('/dashboard'); // Redirect after deletion
    } catch (error) {
      console.error("❌ Error deleting post:", error.response?.data || error.message);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className={styles.postDetailContainer}>
      <div className={styles.postDetailHeader}>
        <h1 className={styles.postDetailTitle}>{post.title}</h1>
        <div className={styles.postDetailMeta}>
          <span>By {post.author?.username}</span>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </div>
      </div>

      <div className={styles.postDetailContent}>
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className={styles.postDetailActions}>
        {user && post.author?._id === user._id && (
          <>
            <Link to={`/posts/${post._id}/edit`} className={styles.editButton}>
              Edit Post
            </Link>
            <button onClick={handleDelete} className={styles.deleteButton}>
              Delete Post
            </button>
          </>
        )}
        <Link to="/" className={styles.backButton}>
          Back to Posts
        </Link>
      </div>
    </div>
  );
};

export default PostDetail;
