const express = require('express');
const eventRouter = express.eventRouter();
const eventController = require('../controllers/eventController');
const participantController = require('../controllers/participantController'); // Import participant controller

const upload = require('../middlewares/uploadImages'); // Import Multer
const authMiddleware = require('../middlewares/authentication'); // Import authentication middleware

eventRouter.use(authMiddleware); // Protect all routes below this line

eventRouter.get('/:id', eventController.getEventById); // get an event by ID

eventRouter.post('/create', upload.single('image'), eventController.createEvent); // create a new event

eventRouter.put('/:id/update', upload.single('image'), eventController.updateEventImage); // update an event

eventRouter.delete('/:id/delete', eventController.deleteEvent); // delete an event

eventRouter.get('/:eventId/participants', participantController.getEventParticipants); // get all participants of an event

eventRouter.get('/:eventId/attendee-count', participantController.getEventAttendeeCount); // get the count of attendees for an event

eventRouter.delete('/:eventId/:participantId', participantController.deleteParticipant); // delete a participant from an event

eventRouter.delete('/:eventId/participants', participantController.deleteAllParticipants); // delete all participants of an event

eventRouter.post('/:eventId/join', participantController.joinEvent); // join an event

eventRouter.post('/:eventId/leave', participantController.leaveEvent); // leave an event

eventRouter.get('/allPublic', eventController.getAllPublicEvents); // get all public events regardless of attendance

module.exports = eventRouter;