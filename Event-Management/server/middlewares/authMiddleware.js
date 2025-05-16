const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId); // Check if user exists
    if (!user) return res.status(401).json({ error: 'User no longer exists' });
    req.user = user; // { userId, role } from JWT payload
    console.log('User authenticated:', req.user);
    next();
  } catch (err) {
    let errorMsg = 'Invalid token';
    if (err.name === 'TokenExpiredError') errorMsg = 'Token expired';
    res.status(401).json({ error: errorMsg });
  }
};
module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Gắn thông tin người dùng vào request
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};