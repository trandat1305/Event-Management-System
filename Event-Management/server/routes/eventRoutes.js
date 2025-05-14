const express = require('express');
const eventRouter = express.eventRouter();
const eventController = require('../controllers/eventController');

const upload = require('../middlewares/uploadImages'); // Import Multer
const authMiddleware = require('../middlewares/authentication'); // Import authentication middleware

eventRouter.use(authMiddleware); // Protect all routes below this line

eventRouter.get('/:id', eventController.getEventById); // get an event by ID

eventRouter.post('/create', upload.single('image'), eventController.createEvent); // create a new event

eventRouter.put('/:id/update', upload.single('image'), eventController.updateEventImage); // update an event

eventRouter.delete('/:id/delete', eventController.deleteEvent); // delete an event

eventRouter.get('/allPublic', eventController.getAllPublicEvents); // get all public events regardless of attendance

module.exports = eventRouter;