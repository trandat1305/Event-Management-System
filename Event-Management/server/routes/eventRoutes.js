const eventRouter = require('express').Router();
const eventController = require('../controllers/eventController');
const participantController = require('../controllers/participantController');
const invitationController = require('../controllers/invitationController');
const organizerController = require('../controllers/EventOrganizerController');

const upload = require('../middlewares/uploadImages'); // Import Multer
const authenticateUser = require('../middlewares/authentication'); // Import authentication middleware

eventRouter.use(authenticateUser); // Protect all routes below this line

// Event data routes
eventRouter.get('/:eventId', eventController.getEventById); // get an event by ID

eventRouter.get('/public', eventController.getAllPublicEvents); // get all public events regardless of attendance

// Event creation and modification routes
eventRouter.post('/', upload.single('image'), eventController.createEvent); // create a new event

eventRouter.put('/:eventId', upload.single('image'), eventController.updateEvent); // update an event

eventRouter.delete('/:eventId', eventController.deleteEvent); // delete an event

// Event attendees routes
eventRouter.get('/:eventId/attendees', participantController.getEventParticipants); // get all participants of an event

eventRouter.get('/:eventId/attendees/count', participantController.getEventAttendeeCount); // get the count of attendees for an event

eventRouter.delete('/:eventId/attendees/:participantId', participantController.deleteParticipant); // delete a participant from an event

// Event organizers routes
eventRouter.get('/:eventId/organizers', organizerController.getEventOrganizers); // get all organizers of an event

eventRouter.post('/:eventId/organizers/:userId', organizerController.addEventOrganizer); // add an organizer to an event

eventRouter.delete('/:eventId/organizers/:organizerId', organizerController.removeEventOrganizer); // remove an organizer from an event

// Event joining and leaving
eventRouter.post('/:eventId/join', participantController.joinEvent); // join an event

eventRouter.post('/:eventId/leave', participantController.leaveEvent); // leave an event

// Event invitation routes
eventRouter.get('/:eventId/invitations', invitationController.getAllInvitationsForEvent); // get all invitations for an event (reserved for organizers)

eventRouter.get('/:eventId/sent-invitations', invitationController.getSentInvitationsForEvent); // get all invitations that the user has sent for an event

module.exports = eventRouter;