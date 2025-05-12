const express = require('express');
const router = express.Router();
const {
  createEvent,
  getPublicEvents,
  updateEvent,
  deleteEvent,
} = require('../Controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');
const restrictTo = require('../middlewares/roleMiddleware');
const { validateEventCreation } = require('../middlewares/Validators/eventValidator');
const upload = require('../configuration/multer'); // Import Multer

// Protected routes (organizer/admins only)

router.post(
  '/',
  authMiddleware,
  restrictTo('admin', 'organizer'),
  validateEventCreation,
  createEvent
);

router.put('/:id', authMiddleware, updateEvent);
router.delete('/:id', authMiddleware, deleteEvent);

// Public route
router.get('/public', getPublicEvents);

//calendar route
router.get('/calendar', authenMiddleware, getCalendarEvents);

module.exports = router;

