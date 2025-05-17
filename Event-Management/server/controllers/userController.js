const jwt = require('jsonwebtoken');
const User = require('../models/User');
const upload = require('../middlewares/uploadImages');
const eventParticipants = require('../models/EventParticipants');
const eventOrganizers = require('../models/EventOrganizers');
require('dotenv').config();

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Create a new user instance
    const user = new User({ username, email, password });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User registered', userId: user.id });
  } catch (err) {
    if (err.code === 11000) { // MongoDB duplicate key error
      return res.status(400).json({ error: 'Email or username already exists' });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from the authenticated user
    const user = await User.findById(userId).select('-password'); // Exclude password field
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getUserEvents = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from the authenticated user

    const events = await eventParticipants
    .find({ user: userId })
    .populate({
      path: 'event', // Populate the event details
      populate: {
        path: 'creator', // Populate the organizer details
        select: 'username _id', // Select only the username
    }});

    if (!events || events.length === 0) {
      return res.status(404).json({ error: 'No events found for this user' });
    }

    // Add the `myEvent` key to each event
    const updatedEvents = events.map(event => {
      const isMyEvent = event.event.creator._id.toString() === userId.toString();
      return {
        ...event.toObject(), // Convert Mongoose document to plain object
        myEvent: isMyEvent // Add the `myEvent` key
      };
    });

    res.status(200).json(updatedEvents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserOrganizedEvents = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from the authenticated user
    const events = await eventOrganizers
    .find({ user: userId })
    .populate({ path: 'event', populate: { path: 'creator', select: 'username _id' } });
    if (!events || events.length === 0) {
      return res.status(404).json({ error: 'No events found for this user' });
    }

    // Add the `myEvent` key to each event
    const updatedEvents = events.map(event => {
      const isMyEvent = event.event.creator._id.toString() === userId.toString();
      return {
        ...event.toObject(), // Convert Mongoose document to plain object
        myEvent: isMyEvent // Add the `myEvent` key
      };
    });
    res.status(200).json(updatedEvents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserCreatedEvents = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from the authenticated user
    const events = await Event.find({ creator: userId }).populate('creator', 'username _id');
    if (!events || events.length === 0) {
      return res.status(404).json({ error: 'No events found for this user' });
    }

    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};  

exports.getUserProfileById = async (req, res) => {
  try {
    const userId = req.params.userId; // Get user ID from the request parameters
    const user = await User.findById(userId).select('-password'); // Exclude password field
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from the authenticated user
    const { username, email, password } = req.body;
    const avatarPath = req.file ? req.file.path : null; // Check if an avatar file is uploaded

    // Prepare the update object
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = password;
    if (avatarPath) updateData.avatar = avatarPath;

    // Update the user
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.userId; // Get user ID from the request parameters
    const { username, email, password } = req.body;

    const user = await User.findByIdAndUpdate(userId, { username, email, password }, { new: true });
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
    const userId = req.params.userId; // Get user ID from the request parameters
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: 'User not found' });

    user.softDelete(); // Soft delete the user
    await user.save();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}