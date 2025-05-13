const express = require('express');
const eventRouter = express.Router();
const eventController = require('../controllers/eventController');

const upload = require('../middlewares/uploadImages'); // Import Multer
const authMiddleware = require('../middlewares/authentication'); // Import authentication middleware

eventRouter.get('/getAllPublicEvents', eventController.getAllPublicEvents); // get all public events regardless of attendance

eventRouter.use(authMiddleware); // Protect all routes below this line

eventRouter.post('/createEvent', upload.single('image'), eventController.createEvent);

eventRouter.put('/updateEvent/:id', upload.single('image'), eventController.updateEventImage); // update an event

eventRouter.delete('/deleteEvent/:id', eventController.deleteEvent); 

/**
eventRouter.get('/getEvent/:id', eventController.getEventById); // get an event by ID

eventRouter.get('/getAllEvents', eventController.getAllEvents); // get all events that a person is attending

eventRouter.get('/getAllEvents', eventController.getAllPublicEvents); // get all public events regardless of attendance

eventRouter.get('/privateEvents', eventController.getPrivateEvents); // get all private events that a person is attending

eventRouter.get('/publicEvents', eventController.getPublicEvents); // get all public events that a person is attending

eventRouter.get('/getOrganizedEvents', eventController.getOrganizedEvents); // get all events that a person is organizing

eventRouter.get('/getMyevents', eventController.getMyEvents); // get all events that a person has made

*/
module.exports = eventRouter;

