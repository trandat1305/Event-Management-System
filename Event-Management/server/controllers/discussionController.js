const Discussion = require('../models/Discussion');

// Post message
exports.postMessage = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { message } = req.body;

    // Validate message length
    if (message.length > 900) {
      return res.status(400).json({ error: 'Message exceeds 900 characters' });
    }

    const newMessage = await Discussion.create({
      event: eventId,
      user: req.user._id,
      message,
    });

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post message' });
  }
};

// Get messages
exports.getMessagesByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const messages = await Discussion.find({ event: eventId })
      .populate('user', 'username') // Corrected field name
      .sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};