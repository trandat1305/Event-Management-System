const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authentication');

router.use(authMiddleware);

router.get('/', authMiddleware, notificationController.getNotifs);

module.exports = router;