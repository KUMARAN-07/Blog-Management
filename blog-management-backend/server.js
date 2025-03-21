const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON requests

// Import Routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post'); // 📌 Added post routes

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes); // 📌 Added post routes

// Basic test route
app.get('/', (req, res) => {
  res.send('🚀 Blog Management System Backend Running 🚀');
});

// MongoDB connection
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI) // ✅ Removed deprecated options
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1); // Exit the process if DB connection fails
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('🔥 Internal Server Error:', err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 5000; // 
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});