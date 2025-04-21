import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import styles from '../../styles/Posts.module.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get('/posts')
      .then((res) => setPosts(res.data))
      .catch((err) => console.error('Error fetching posts:', err));
  }, []);

  return (
    <div className={styles.postContainer}>
      <h2>All Blog Posts</h2>
      <div className={styles.postList}>
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post) => (
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
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostList;
