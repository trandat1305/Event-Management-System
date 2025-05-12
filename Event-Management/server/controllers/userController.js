const jwt = require('jsonwebtoken');
const User = require('../models/User');
const upload = require('../middlewares/uploadImages');
require('dotenv').config();

// Register user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: 'User registered', userId: user.id });
  } catch (err) {
    if (err.code === 11000) { // MongoDB duplicate key error
      return res.status(400).json({ error: 'Email or username already exists' });
    }
    res.status(500).json({ error: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOwnUserProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from the authenticated user
    const user = await User.findById(userId).select('-password'); // Exclude password field
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getUserProfileById = async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from the request parameters
    const user = await User.findById(userId).select('-password'); // Exclude password field
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAvatar = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from the authenticated user
    const avatarPath = req.file.path; // Path to the uploaded file

    const user = await User.findByIdAndUpdate(userId, { avatar: avatarPath }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ message: 'Avatar updated successfully', avatar: user.avatar });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from the authenticated user
    const { username, email } = req.body;

    const user = await User.findByIdAndUpdate(userId, { username, email }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'Profile updated successfully', user });
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from the request parameters
    const { username, email, isAdmin } = req.body;

    const user = await User.findByIdAndUpdate(userId, { username, email, isAdmin }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};  

exports.updatePassword = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from the authenticated user
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user || !user.comparePassword(oldPassword)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    await user.resetPassword(newPassword);
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Exclude password field
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsersIncludingDeleted = async (req, res) => {
  try {
    const allUsers = await User.find().setOptions({ skipMiddleware: true });    
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password, isAdmin: true });
    res.status(201).json({ message: 'Admin registered', userId: user.id });
  } catch (err) {
    if (err.code === 11000) { // MongoDB duplicate key error
      return res.status(400).json({ error: 'Email or username already exists' });
    }
    res.status(500).json({ error: err.message });
  }
}

exports.deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from the request parameters
    const user = await User.findById(userId);
    user.softDelete(); // Soft delete the user
    await user.save();
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}