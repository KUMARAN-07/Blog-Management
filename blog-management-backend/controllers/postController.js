const Post = require('../models/Post');

// @desc    Create a new blog post
const createPost = async (req, res) => {
  const { title, content } = req.body;

  // Validate request body
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const newPost = await Post.create({
      title: title.trim(),
      content: content.trim(),
      author: req.user._id,
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all blog posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username email');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single blog post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a blog post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== req.user._id.toString())
      return res.status(401).json({ message: 'Not authorized to delete this post' });

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Post removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a blog post
const updatePost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Check if the user is the author of the post
    if (post.author.toString() !== req.user._id.toString())
      return res.status(401).json({ message: 'Not authorized to update this post' });

    // Update fields if provided
    if (title) post.title = title;
    if (content) post.content = content;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    console.log("User ID from request:", req.user?.id); 

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const posts = await Post.find({ author: req.user.id }).populate('author', 'username email'); 
    console.log("Fetched Posts:", posts); 

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


module.exports = { createPost, getAllPosts, getPostById, deletePost, updatePost, getUserPosts };