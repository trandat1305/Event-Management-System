const centralRouter = require("express").Router();
const userRouter = require("./userRoutes");
const adminRouter = require("./adminRoutes");
const eventRouter = require("./eventRoutes");
const discussionRouter = require("./discussionRoutes");
const invitationRouter = require("./invitationRoutes");

centralRouter.use("/users", userRouter);

centralRouter.use("/admins", adminRouter);

centralRouter.use("/events", eventRouter);

centralRouter.use("/discussions", discussionRouter);

centralRouter.use('/invitations', invitationRouter);

module.exports = centralRouter;