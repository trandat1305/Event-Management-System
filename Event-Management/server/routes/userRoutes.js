const express = require('express');
const router = express.Router();
const authenMiddleware = require('../middleware/authMiddleware');
const {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require('../Controllers/userController');

// Protected routes
router.get('/profile', authenMiddleware, getUserProfile); // Get user details
router.patch('/profile', authenMiddleware, updateUserProfile); // Update profile
router.delete('/profile', authenMiddleware, deleteUserProfile); // Delete account

module.exports = router;