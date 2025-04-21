import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import API from '../../services/api';
import styles from '../../styles/Posts.module.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ No token found. User not authenticated.");
        return;
      }

      try {
        console.log("🔍 Fetching user posts for user:", user?.username);
        const res = await API.get('/posts/my-posts', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ User Posts Fetched:", res.data);
        setUserPosts(res.data);
      } catch (error) {
        console.error("❌ Error fetching user posts:", error.response?.data || error.message);
      }
    };

    fetchUserPosts();
  }, [user]);

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove the deleted post from UI
      setUserPosts(userPosts.filter((post) => post._id !== postId));
      console.log("✅ Post deleted successfully");
    } catch (error) {
      console.error("❌ Error deleting post:", error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.dashboardHeader}>
        <h2>Welcome, {user?.username}!</h2>
        <Link to="/posts/create" className={styles.createButton}>
          Create New Post
        </Link>
      </div>
      <h3>Your Posts</h3>
      <div className={styles.postList}>
        {userPosts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          userPosts.map((post) => (
            <div key={post._id} className={styles.postCard}>
              <div className={styles.postContent}>
                <h3 className={styles.postTitle}>
                  <Link to={`/posts/${post._id}`}>{post.title}</Link>
                </h3>
                <div className={styles.postMeta}>
                  <span>{post.author?.username}</span>
                  <span> • </span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <p className={styles.postExcerpt}>{post.content.substring(0, 150)}...</p>
                <div style={{ marginTop: '1rem' }}>
                  <Link to={`/posts/${post._id}/edit`}>
                    <button style={{ marginRight: '0.5rem' }}>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(post._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
