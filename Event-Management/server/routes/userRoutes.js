const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require('../Controllers/userController');

// Protected routes
router.get('/profile', authMiddleware, getUserProfile); // Get user details
router.patch('/profile', authMiddleware, updateUserProfile); // Update profile
router.delete('/profile', authMiddleware, deleteUserProfile); // Delete account

module.exports = router;