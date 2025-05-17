const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const eventRoutes = require('./eventRoutes');
const discussionRoutes = require('./discussionRoutes');
const notificationRoutes = require('./notificationRoutes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/events', eventRoutes);
router.use('/discussions', discussionRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;