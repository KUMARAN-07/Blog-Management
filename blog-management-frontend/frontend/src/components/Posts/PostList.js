import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get('/posts')
      .then((res) => setPosts(res.data))
      .catch((err) => console.error('Error fetching posts:', err));
  }, []);

  return (
    <div>
      <h2>All Blog Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id}>
            <h3>
              <Link to={`/posts/${post._id}`}>{post.title}</Link>
            </h3>
            <p>{post.content.substring(0, 100)}...</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
