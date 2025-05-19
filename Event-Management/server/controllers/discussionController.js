const Discussion = require('../models/EventDiscussion');
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

    // Create a new message in the database
    const event = await Event.findByIdIfExists(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const newMessage = await Discussion.create({
      eventId: eventId,
      userId: userId,
      content: message,
    });

    // Create a notification for the event
    // Get all participants of the event except the sender
    const participants = await EventParticipants.find({ event: eventId });
    const participantIds = participants
    .map(participant => participant.userId ? participant.userId.toString() : null)
    .filter(id => id && id !== userId.toString());    
    const notifications = participantIds.map(participantId => ({
      userId: participantId,
      eventId: eventId,
      message: `There's a new message in event "${event.title}!"`,
      type: 'message',
    }));

    await Notification.insertMany(notifications);

    res.status(201).json({message: newMessage});
  } catch (err) {
    res.status(500).json({ error: 'Failed to post message' });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const { eventId } = req.params;
    const messages = await Discussion.find({ eventId: eventId})
      .populate('userId', 'username') // Corrected field name
      .sort({ timestamp: 1 }); 

    res.status(200).json({messages: messages});
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages', errorMessage: err.message });
  }
};