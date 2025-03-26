const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded); // Debugging
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error("JWT Verification Error:", error); // Debugging
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    console.log("No token found in request headers");
    res.status(401).json({ message: 'No token, authorization denied' });
  }
};

module.exports = { protect };
