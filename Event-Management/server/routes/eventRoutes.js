const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const participantController = require('../controllers/participantController');
const invitationController = require('../controllers/invitationController');
const organizerController = require('../controllers/EventOrganizerController');
const auth = require('../middlewares/auth');

const upload = require('../middlewares/uploadImages'); // Import Multer

// Public routes
router.get('/public', eventController.getPublicEvents);
router.get('/:id', auth, eventController.getEventById);

// Protected routes
router.post('/', auth, eventController.createEvent);
router.put('/:id', auth, eventController.updateEvent);
router.delete('/:id', auth, eventController.deleteEvent);
router.post('/:id/join', auth, eventController.joinEvent);

// Event attendees routes
router.get('/:eventId/attendees', participantController.getEventParticipants); // get all participants of an event
router.get('/:eventId/attendees/count', participantController.getEventAttendeeCount); // get the count of attendees for an event
router.delete('/:eventId/attendees/:participantId', participantController.deleteParticipant); // delete a participant from an event

// Event organizers routes
router.get('/:eventId/organizers', organizerController.getEventOrganizers); // get all organizers of an event
router.post('/:eventId/organizers/:userId', organizerController.addEventOrganizer); // add an organizer to an event
router.delete('/:eventId/organizers/:organizerId', organizerController.removeEventOrganizer); // remove an organizer from an event

// Event invitation routes
router.get('/:eventId/invitations', invitationController.getAllInvitationsForEvent); // get all invitations for an event (reserved for organizers)
router.get('/:eventId/sent-invitations', invitationController.getSentInvitationsForEvent); // get all invitations that the user has sent for an event

module.exports = router;