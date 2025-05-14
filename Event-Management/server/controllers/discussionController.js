const Discussion = require('../models/EventDiscussion');
const eventOrganizer = require('../models/EventOrganizers');
const Event = require('../models/Event');

// Post message
exports.postMessage = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id; // Get user ID from the authenticated user
    const { message } = req.body;
    const imageURL = req.file ? req.file.path : null;

    // Validate message length
    if (message.length > 900) {
      return res.status(400).json({ error: 'Message exceeds 900 characters' });
    }

    const newMessage = await Discussion.create({
      eventId: eventId,
      userId: userId,
      content: message,
      imageURL: imageURL,
    });

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post message' });
  }
};

exports.replyToMessage = async (req, res) => {
  try {
    const { eventId, messageId } = req.params;
    const userId = req.user._id; // Get user ID from the authenticated user

    const { message } = req.body;
    const imageURL = req.file ? req.file.path : null;

    // Validate message length
    if (message.length > 900) {
      return res.status(400).json({ error: 'Message exceeds 900 characters' });
    }

    // Find the original message to reply to
    const originalMessage = await Discussion.findById(messageId);
    if (!originalMessage) {
      return res.status(404).json({ error: 'Original message not found' });
    }

    const newReply = await Discussion.create({
      eventId: eventId,
      userId: userId,
      content: message,
      imageURL: imageURL,
      replyToMessageId: messageId, // Link to the original message
    });

    // notify the original messages to indicate they have a reply


    res.status(201).json(newReply);
  } catch (err) {
    res.status(500).json({ error: 'Failed to reply to message', errorMessage: err.message });
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
    const messages = await Discussion.find({ event: eventId })
      .populate('userId', 'username') // Corrected field name
      .sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages', errorMessage: err.message });
  }
};

const getMessageWithReplies = async (messageId) => {
  const message = await Discussion.findById(messageId)
    .populate('userId', 'username') // Populate userId with username
    .lean();

  if (!message) return null;

  if (message.isDeleted) {
    return {
      _id: message._id,
      content: 'Message deleted',
      imageURL: null,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
      replies: []
    };
  }

  // Fetch replies for the current message and sort by timestamp
  const replies = await Discussion.find({ replyToMessageId: message._id })
    .populate('userId', 'username') // Populate userId with username
    .sort({ createdAt: 1 }) // Sort replies by timestamp (ascending)
    .lean();

  // Recursively fetch nested replies
  const nestedReplies = await Promise.all(replies.map(reply => getMessageWithReplies(reply._id)));

  return {
    ...message,
    replies: nestedReplies
  };
};

exports.getAllMessagesWithReplies = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Fetch all top-level messages for the event, sorted by timestamp
    const topLevelMessages = await Discussion.find({ eventId: eventId, replyToMessageId: null })
      .populate('userId', 'username') // Populate userId with username
      .sort({ createdAt: 1 }) // Sort top-level messages by timestamp (ascending)
      .lean();

    // Fetch nested replies for each top-level message
    const messagesWithReplies = await Promise.all(topLevelMessages.map(msg => getMessageWithReplies(msg._id)));

    res.status(200).json(messagesWithReplies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages', errorMessage: err.message });
  }
};