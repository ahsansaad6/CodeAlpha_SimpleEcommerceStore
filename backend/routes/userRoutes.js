// backend/routes/userRoutes.js
import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js'; // Import user controller functions
import { protect } from '../middleware/authMiddleware.js'; // We will create this middleware

// Public routes
router.post('/login', authUser);
router.post('/', registerUser); // Register user (also public)

// Private routes (require authentication)
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;