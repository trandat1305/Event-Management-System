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
    if (!user.IsAdmin) return res.status(403).json({ error: 'Access denied. Not an admin.' });
    req.user = user; // { userId, role } from JWT payload
    console.log('User authenticated:', req.user);
    next();
  } catch (err) {
    let errorMsg = 'Invalid token';
    if (err.name === 'TokenExpiredError') errorMsg = 'Token expired';
    res.status(401).json({ error: errorMsg });
  }
};
module.exports = authenticateAdmin;