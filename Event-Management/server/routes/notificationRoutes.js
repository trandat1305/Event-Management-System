const express = require('express');
const router = express.Router();
const { getUserNotifications } = require('../Controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, getUserNotifications);
module.exports = router;