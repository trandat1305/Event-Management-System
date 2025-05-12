const express = require('express');
const eventRouter = express.Router();
const eventController = require('../controllers/eventController');

const upload = require('../configuration/multer'); // Import Multer

// Protected routes (organizer/admins only)
eventRouter.use(authMiddleware); // Protect all routes below this line

eventRouter.post('/createEvent', upload.single('image'), createEvent); // Use Multer for image upload

eventRouter.put('updateEvent/:id', authMiddleware, updateEvent);
eventRouter.delete('/:id', authMiddleware, deleteEvent);

// Public route
eventRouter.get('/publicEvents', getPublicEvents);

//calendar route
eventRouter.get('/calendar', authenMiddleware, getCalendarEvents);

module.exports = router;

