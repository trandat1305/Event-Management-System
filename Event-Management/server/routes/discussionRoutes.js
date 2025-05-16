const express = require('express');
const discussionRouter = express.Router();
const discussionController = require('../controllers/discussionController');

const authenticateUser = require('../middlewares/authentication');
const upload = require('../middlewares/uploadImages');

discussionRouter.use(authenticateUser);

discussionRouter.get('/:eventId/messages', discussionController.getAllMessages); // get all messages for an event

discussionRouter.post('/:eventId/messages', upload.single('image'), discussionController.postMessage); // create a new message

discussionRouter.delete('/:eventId/messages/:messageId', discussionController.deleteMessage); // delete a message

discussionRouter.put('/:eventId/messages/:messageId', upload.single("image"), discussionController.editMessage); // edit a message

module.exports = discussionRouter;