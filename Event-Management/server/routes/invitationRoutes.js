const express = require('express');
const router = express.Router();
const {
  sendInvitation,
  updateRSVP,
  getEventInvitations,
} = require('../Controllers/invitationController');
const authMiddleware = require('../middlewares/authMiddleware');

// Organizer sends invitations
router.post('/send', authMiddleware, sendInvitation);

// Attendee updates RSVP
router.patch('/:id/rsvp', authMiddleware, updateRSVP);

// Get all invitations for an event
router.get('/event/:eventId', authMiddleware, getEventInvitations);

module.exports = router;