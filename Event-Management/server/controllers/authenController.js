const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword, role });
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
        const { username, password } = req.body;
        const user = await User.findOne({ username }); 
        if (!user) return res.status(404).json({ error: 'Username not found' });
        if (!(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({ error: 'Incorrect password' });
        }
      // ... generate token
      const token = jwt.sign(
        { userId: user._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
  
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: 'Login failed' }); // Generic error in production
    }
  };
  