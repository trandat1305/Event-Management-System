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