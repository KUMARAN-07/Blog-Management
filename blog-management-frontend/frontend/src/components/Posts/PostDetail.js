import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import API from '../../services/api';

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
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>By: {post.author?.username}</p>

      {/* Only show Edit & Delete if logged-in user is the post author */}
      {user && post.author?._id === user._id && (
        <>
          <Link to={`/posts/${post._id}/edit`}>
            <button>Edit</button>
          </Link>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default PostDetail;
