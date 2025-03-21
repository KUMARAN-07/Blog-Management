const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../controllers/postController');

const router = express.Router();

// Blog routes
router.post('/', protect, createPost);         // Create a post (authenticated users)
router.get('/', getAllPosts);                  // Get all posts (public)
router.get('/:id', getPostById);    
router.put('/:id', protect, updatePost);           // Get post by ID (public)
router.delete('/:id', protect, deletePost);    // Delete a post (author only)

module.exports = router;
