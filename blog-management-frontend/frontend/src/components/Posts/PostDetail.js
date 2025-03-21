// frontend/src/components/Posts/PostDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../../services/api';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error('Error fetching post:', err));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await API.delete(`/posts/${id}`);
        navigate('/');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (!post) return <p>Loading post...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <Link to={`/posts/${post._id}/edit`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default PostDetail;
