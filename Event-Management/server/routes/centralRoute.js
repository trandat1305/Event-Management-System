const centralRouter = require("express").Router();
const userRouter = require("./userRoutes");
const adminRouter = require("./adminRoutes");
const eventRouter = require("./eventRoutes");
const discussionRouter = require("./discussionRoutes");
const invitationRouter = require("./invitationRoutes");
const mongoose = require('mongoose');

// List all param names you want to check
const paramNames = ['eventId', 'inviteeId', 'notificationId', 'userId', 'adminId', 'messageId', 'invitationId', 'organizerId', 'participantId'];

paramNames.forEach(paramName => {
  centralRouter.param(paramName, (req, res, next, value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return res.status(400).json({ error: `${paramName} must be a valid MongoDB ObjectId` });
    }
    next();
  });
});

centralRouter.use("/users", userRouter);

centralRouter.use("/admins", adminRouter);

centralRouter.use("/events", eventRouter);

centralRouter.use("/discussions", discussionRouter);

centralRouter.use('/invitations', invitationRouter);

module.exports = centralRouter;