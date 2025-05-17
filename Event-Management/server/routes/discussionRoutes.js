const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussionController');
const auth = require('../middlewares/auth');

// Protected routes
router.post('/', auth, discussionController.createDiscussion);
router.get('/event/:eventId', auth, discussionController.getEventDiscussions);
router.post('/:discussionId/reply', auth, discussionController.addReply);

module.exports = router;