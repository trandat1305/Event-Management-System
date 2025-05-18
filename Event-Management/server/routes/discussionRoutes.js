const express = require('express');
const discussionRouter = express.Router();
const discussionController = require('../controllers/discussionController');

const authenticateUser = require('../middlewares/authentication');
const upload = require('../middlewares/uploadImages');
const { messageValidator } = require('../middlewares/messageValidator'); // Import message validation middleware
const { validationResult } = require('express-validator');

discussionRouter.use(authenticateUser);

discussionRouter.get('/:eventId/messages', discussionController.getAllMessages); // get all messages for an event

discussionRouter.post('/:eventId/messages', upload.single('image'), messageValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  discussionController.postMessage
); // post a new message

discussionRouter.delete('/:eventId/messages/:messageId', discussionController.deleteMessage); // delete a message

discussionRouter.put('/:eventId/messages/:messageId', upload.single('image'), messageValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  discussionController.editMessage
); // edit a message

module.exports = discussionRouter;