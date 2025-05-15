const invitationRouter = require('express').Router();
const invitationController = require('../controllers/invitationController');

const authMiddleware = require('../middlewares/authMiddleware');

invitationRouter.use(authMiddleware);

invitationRouter.post('/send/:eventId/:inviteeId', invitationController.sendInvitation); // send an invitation to a user

invitationRouter.post('/:inviteId/accept', invitationController.acceptInvitation); // accept an invitation

invitationRouter.post('/:inviteId/deny', invitationController.rejectInvitation); // reject an invitation

invitationRouter.get('/all', invitationController.getAllInvitations); // get all invitations for a user

invitationRouter.get('/all/:eventId', invitationController.getAllInvitationsForEvent); // get all invitations for an event

invitationRouter.get('/sent', invitationController.getSentInvitations); // get all sent invitations

invitationRouter.get('/sent/:eventId', invitationController.getSentInvitationsForEvent); // get all sent invitations for an event

module.exports = router;