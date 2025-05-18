const express = require('express');
const discussionRouter = express.Router();
const discussionController = require('../controllers/discussionController');

const authenticateUser = require('../middlewares/authentication');
const { messageValidator } = require('../middlewares/messageValidator'); // Import message validation middleware
const { validationResult } = require('express-validator');

discussionRouter.use(authenticateUser);

discussionRouter.get('/:eventId/messages', discussionController.getAllMessages); // get all messages for an event

discussionRouter.post('/:eventId/messages', messageValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  discussionController.postMessage
); // post a new message

module.exports = discussionRouter;