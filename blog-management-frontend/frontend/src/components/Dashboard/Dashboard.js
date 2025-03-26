import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import API from '../../services/api';

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
    <div>
      <h2>Welcome, {user?.username}!</h2>
      <h3>Your Posts</h3>
      {userPosts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        userPosts.map((post) => (
          <div key={post._id}>
            <h4>{post.title}</h4>
            <p>{post.content.substring(0, 100)}...</p>
            
            {/* Edit Button */}
            <Link to={`/posts/${post._id}/edit`}>
              <button>Edit</button>
            </Link>

            {/* Delete Button */}
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
