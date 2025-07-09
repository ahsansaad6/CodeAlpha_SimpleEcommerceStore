// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js'; // Imports our custom asyncHandler middleware
import User from '../models/userModel.js'; // Imports the User model using ES Module syntax

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the cookie (This is the key difference from your old code)
  token = req.cookies.jwt; // Assuming cookieParser middleware is used in server.js

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password'); // Attach user to request
      next(); // Move to the next middleware or route handler
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Admin middleware (optional, for future admin routes)
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401); // Using 401 Unauthorized for simplicity, 403 Forbidden is also common
    throw new new Error('Not authorized as an admin');
  }
};

export { protect, admin };