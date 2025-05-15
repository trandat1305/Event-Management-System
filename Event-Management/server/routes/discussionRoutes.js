const express = require('express');
const discussionRouter = express.Router();
const discussionController = require('../controllers/discussionController');

const authenticateUser = require('../middlewares/authentication');
const upload = require('../middlewares/uploadImages');

discussionRouter.use(authenticateUser);

discussionRouter.post('/:eventId/create/', upload.single('image'), discussionController.postMessage); // create a new message

discussionRouter.post('/:eventId/reply/:messageId', upload.single('image'), discussionController.replyToMessage); // reply to a message

discussionRouter.delete('/:eventId/delete/:messageId', discussionController.deleteMessage); // delete a message

discussionRouter.put('/:eventId/edit/:messageId', upload.single("image"), discussionController.editMessage); // edit a message

discussionRouter.get('/:eventId/getAll/', discussionController.getAllMessages); // get all messages for an event

discussionRouter.get('/:eventId/getAllwithReplies/', discussionController.getAllMessagesWithReplies); // get all messages for an event with replies

module.exports = discussionRouter;