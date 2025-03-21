// frontend/src/components/Dashboard/Dashboard.js
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import API from '../../services/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    API.get('/posts/user') // Replace with your backend route to fetch user-specific posts
      .then((res) => setUserPosts(res.data))
      .catch((err) => console.error('Error fetching user posts:', err));
  }, []);

  return (
    <div>
      <h2>Welcome, {user?.username}!</h2>
      <h3>Your Posts</h3>
      {userPosts.length === 0 ? <p>No posts yet.</p> : 
        userPosts.map((post) => (
          <div key={post._id}>
            <h4>{post.title}</h4>
            <p>{post.content.substring(0, 100)}...</p>
          </div>
        ))
      }
    </div>
  );
};

export default Dashboard;
