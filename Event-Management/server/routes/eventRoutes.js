const express = require('express');
const eventRouter = express.eventRouter();
const eventController = require('../controllers/eventController');

const upload = require('../middlewares/uploadImages'); // Import Multer
const authMiddleware = require('../middlewares/authentication'); // Import authentication middleware

eventRouter.get('/getAllPublicEvents', eventController.getAllPublicEvents); // get all public events regardless of attendance

eventRouter.use(authMiddleware); // Protect all routes below this line

eventRouter.get('/get/:id', eventController.getEventById); // get an event by ID

eventRouter.post('/create', upload.single('image'), eventController.createEvent); // create a new event

eventRouter.put('/update/:id', upload.single('image'), eventController.updateEventImage); // update an event

eventRouter.delete('/delete/:id', eventController.deleteEvent); // delete an event

/**
eventRouter.get('/getAllEvents', eventController.getAllEvents); // get all events that a person is attending

eventRouter.get('/getAllEvents', eventController.getAllPublicEvents); // get all public events regardless of attendance

eventRouter.get('/privateEvents', eventController.getPrivateEvents); // get all private events that a person is attending

eventRouter.get('/publicEvents', eventController.getPublicEvents); // get all public events that a person is attending

eventRouter.get('/getOrganizedEvents', eventController.getOrganizedEvents); // get all events that a person is organizing

eventRouter.get('/getMyevents', eventController.getMyEvents); // get all events that a person has made

*/
module.exports = eventRouter;