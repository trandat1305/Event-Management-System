const express = require('express');
const discussionRouter = express.Router();
const discussionController = require('../controllers/discussionController');

const authenticateUser = require('../middlewares/authentication');
const upload = require('../middlewares/uploadImages');

discussionRouter.use(authenticateUser);

discussionRouter.post('/:eventId/messages', upload.single('image'), discussionController.postMessage); // create a new message

discussionRouter.post('/:eventId/messages/:messageId', upload.single('image'), discussionController.replyToMessage); // reply to a message

discussionRouter.delete('/:eventId/messages/:messageId', discussionController.deleteMessage); // delete a message

discussionRouter.put('/:eventId/messages/:messageId', upload.single("image"), discussionController.editMessage); // edit a message

discussionRouter.get('/:eventId/messages', discussionController.getAllMessages); // get all messages for an event WITHOUT replies

discussionRouter.get('/:eventId/messagesIncludingReplies', discussionController.getAllMessagesWithReplies); // get all messages for an event with replies

module.exports = discussionRouter;