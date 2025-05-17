const Discussion = require('../models/Discussion');
const eventOrganizer = require('../models/EventOrganizers');
const Event = require('../models/Event');
const Notification = require('../models/Notification');
const EventParticipants = require('../models/EventParticipants');
const { eventExists } = require('../controllers/eventController');

// Post message
exports.postMessage = async (req, res) => {
  try {
    const { eventId } = req.params; // Event ID from the route
    const userId = req.user._id; // Get user ID from the authenticated user
    const { message } = req.body; // Message content from the request body
    const imageURL = req.file ? req.file.path : null;

    // Create a new message in the database
    const event = await eventExists(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const newMessage = await Discussion.create({
      eventId: eventId,
      userId: userId,
      content: message,
      imageURL: imageURL,
    });

    // Create a notification for the event
    // Get all participants of the event except the sender
    const participants = await EventParticipants.find({ event: eventId });
    const participantIds = participants.map(participant => participant.userId.toString()).filter(id => id !== userId.toString());
    const notifications = participantIds.map(participantId => ({
      userId: participantId,
      eventId: eventId,
      message: `There's a new message in event "${event.title}!"`,
      type: 'message',
    }));

    await Notification.insertMany(notifications);

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post message' });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { eventId, messageId } = req.params;
    const userId = req.user._id; // Get user ID from the authenticated user

    // Find the message and mark it as deleted
    const message = await Discussion.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Check if the message belongs to the specified event
    if (message.eventId.toString() !== eventId) {
      return res.status(400).json({ error: 'Message does not belong to the specified event' });
    }

    // Check if the user is the poster of the message
    if (message.userId.toString() === userId.toString()) {
      message.softDelete();
      await message.save();
      return res.status(200).json({ message: 'Message deleted successfully' });
    }

    // Check if the user is an organizer of the event
    const organizer = await eventOrganizer.findOne({
      eventId: eventId,
      userId: userId,
    });
    
    if (organizer) {
      message.softDelete();
      await message.save();
      return res.status(200).json({ message: 'Message deleted successfully' });
    }

    // If neither condition is met, deny access
    return res.status(403).json({ error: 'You are not authorized to delete this message' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete message', errorMessage: err.message });
  }
};

exports.editMessage = async (req, res) => {
  try {
    const { eventId, messageId } = req.params;
    const userId = req.user._id; // Get user ID from the authenticated user
    const { message } = req.body;
    const imageURL = req.file ? req.file.path : null;

    // Validate message length
    if (message.length > 900) {
      return res.status(400).json({ error: 'Message exceeds 900 characters' });
    }

    // Find the message to edit
    const messageToEdit = await Discussion.findById(messageId);
    if (!messageToEdit) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Check if the message belongs to the specified event
    if (messageToEdit.eventId.toString() !== eventId) {
      return res.status(400).json({ error: 'Message does not belong to the specified event' });
    }

    // Check if the user is authorized to edit the message
    if (messageToEdit.userId.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'You are not authorized to edit this message' });
    }

    // Prepare update data
    const updateData = { content: message, isEdited: true };
    if (imageURL) {
      updateData.imageURL = imageURL;
    }

    // Update the message
    const updatedMessage = await Discussion.findByIdAndUpdate(
      messageId,
      updateData,
      { new: true } // Return the updated document
    );

    res.status(200).json(updatedMessage);
  } catch (err) {
    console.error('Error editing message:', err.message);
    res.status(500).json({ error: 'An unexpected error occurred while editing the message' });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const { eventId } = req.params;
    const messages = await Discussion.find({ event: eventId})
      .populate('userId', 'username') // Corrected field name
      .sort({ timestamp: 1 }); 

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages', errorMessage: err.message });
  }
};

// Create new discussion
exports.createDiscussion = async (req, res) => {
  try {
    const { eventId, content } = req.body;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user has access to event
    if (!event.isPublic && 
        event.organizer.toString() !== req.user.userId && 
        !event.participants.some(p => p.user.toString() === req.user.userId)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const discussion = new Discussion({
      event: eventId,
      author: req.user.userId,
      content
    });

    await discussion.save();

    // Add discussion to event
    event.discussions.push(discussion._id);
    await event.save();

    // Notify event organizer
    const notification = new Notification({
      recipient: event.organizer,
      event: eventId,
      type: 'discussion',
      message: `New discussion in event "${event.title}"`
    });
    await notification.save();

    res.status(201).json({
      message: 'Discussion created successfully',
      discussion
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating discussion', error: error.message });
  }
};

// Get discussions for event
exports.getEventDiscussions = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user has access to event
    if (!event.isPublic && 
        event.organizer.toString() !== req.user.userId && 
        !event.participants.some(p => p.user.toString() === req.user.userId)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const discussions = await Discussion.find({ event: eventId })
      .populate('author', 'username')
      .populate('replies.author', 'username')
      .sort({ createdAt: -1 });

    res.json(discussions);
  } catch (error) {
    res.status(500).json({ message: 'Error getting discussions', error: error.message });
  }
};

// Add reply to discussion
exports.addReply = async (req, res) => {
  try {
    const { discussionId } = req.params;
    const { content } = req.body;

    const discussion = await Discussion.findById(discussionId);
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    // Check if user has access to event
    const event = await Event.findById(discussion.event);
    if (!event.isPublic && 
        event.organizer.toString() !== req.user.userId && 
        !event.participants.some(p => p.user.toString() === req.user.userId)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    discussion.replies.push({
      author: req.user.userId,
      content
    });

    await discussion.save();

    // Notify discussion author
    if (discussion.author.toString() !== req.user.userId) {
      const notification = new Notification({
        recipient: discussion.author,
        event: event._id,
        type: 'discussion',
        message: `New reply to your discussion in event "${event.title}"`
      });
      await notification.save();
    }

    res.json({
      message: 'Reply added successfully',
      discussion
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding reply', error: error.message });
  }
};