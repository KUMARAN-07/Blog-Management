const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getUserPosts,
} = require('../controllers/postController');

const router = express.Router();

router.get('/my-posts', protect, getUserPosts); // ✅ This must be ABOVE `/:id`

router.post('/', protect, createPost);         // Create a post (authenticated users)
router.get('/', getAllPosts);                  // Get all posts (public)
router.get('/:id', getPostById);               // Get post by ID (public)
router.put('/:id', protect, updatePost);       // Update a post (author only)
router.delete('/:id', protect, deletePost);    // Delete a post (author only)

module.exports = router;
