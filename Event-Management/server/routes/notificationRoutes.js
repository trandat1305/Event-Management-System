const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authentication');

router.get('/', authMiddleware, notificationController.getUserNotifications);

module.exports = router;