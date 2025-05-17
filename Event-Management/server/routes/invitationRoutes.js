const invitationRouter = require('express').Router();
const invitationController = require('../controllers/invitationController');

const authenticateUser = require('../middlewares/authentication');

invitationRouter.use(authenticateUser);

invitationRouter.get('/', invitationController.getAllInvitations); // get all invitations for a user

invitationRouter.get('/sent', invitationController.getSentInvitations); // get all sent invitations

invitationRouter.post('/:eventId/send/:inviteeId', invitationController.sendInvitation); // send an invitation to a user

invitationRouter.post('/:inviteId/accept', invitationController.acceptInvitation); // accept an invitation

invitationRouter.post('/:inviteId/deny', invitationController.rejectInvitation); // reject an invitation

module.exports = invitationRouter;