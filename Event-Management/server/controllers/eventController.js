const Event = require('../models/Event');
const invitation = require('../models/Invitation');
const Notification = require('../models/Notification');
const EventParticipants = require('../models/EventParticipants');

exports.createEvent = async (req, res) => {
    try {
      const { title, description, isPublic, location, startTime, endTime } = req.body;
      const creator = req.user._id;

      // Validate required fields
      if (!title || !startTime || !endTime || !location) {
        return res.status(400).json({ error: 'Title, startTime, endTime, and location are required' });
      }

      // Handle optional fields with default values
      const isPublicValue = isPublic !== undefined ? isPublic : false; // Default to false
      const descriptionValue = description || ''; // Default to an empty string
      const imageUrl = req.file?.path || null; // Default to null if no file is uploaded

      // Initialize event data
      const eventData = {
        title,
        description: descriptionValue,
        isPublic: isPublicValue,
        startTime,
        endTime,
        creator: creator,
        imageUrl,
        location
      };

      // Create and save the event
      const event = new Event(eventData);
      await event.save();

      res.status(201).json(event);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create event', errorMessage: err.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
      const eventId = req.params.eventId;
      const event = await Event.findById(eventId).populate('creator', 'username');
      if (!event) return res.status(404).json({ error: 'Event not found' });

      // Check if the user is the creator of the event
      const isCreator = event.creator._id.toString() === req.user._id.toString();
      if (isCreator) {
        event.myEvent = true; // Add the `myEvent` key
      }

      res.status(200).json(event);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch event', errorMessage: err.message });
}};
  
exports.updateEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ error: 'Event not found' });
  
      const oldEvent = event.toObject();

      const { title, startTime, endTime, isPublic, location, description, status } = req.body;

      // Update fields dynamically
      const fieldsToUpdate = { title, startTime, endTime, isPublic, location, description };
      for (const [key, value] of Object.entries(fieldsToUpdate)) {
        if (value !== undefined) {
          event[key] = value;
        }
      }

      // Handle file upload for imageUrl
      if (req.file?.path) {
        event.imageURL = req.file.path;
      }

      // Handle status updates (e.g., cancellation)
      if (status === 'cancelled') {
        event.status = 'cancelled';

        // Notify attendees about cancellation
        // Remove all participants from the Eventparticipants collection
      }
  
      // Create a notification for the event update
  
      // Save the updated event
      await event.save();
  
      res.json(event);
    } catch (err) {
      console.error('Error updating event:', err.message);
      res.status(500).json({ error: 'Failed to update event', errorMessage: err.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
      const eventId = req.params.eventId;

      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ error: 'Event not found' });
      
      await event.softDelete();

      // Delete all attendees from the Eventparticipants collection
      const participants = await EventParticipants.find({ event: eventId });
      if (participants.length > 0) {
        await Promise.all(participants.map(participant => participant.softDelete()));
      }
      
      // Notify attendees about cancellation
      const notifications = participants.map(participant => ({
        userId: participant.userId,
        eventId: eventId,
        message: `The event "${event.title}" has been deleted.`,
      }));
      await Notification.insertMany(notifications);

      res.json({ message: 'Event deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete event', errorMessage: err.message });
    }
};
  
exports.getAllPublicEvents = async (req, res) => {
  try {
    const userId = req.user._id; // Get the authenticated user's ID

    const events = await Event.find().populate('creator', 'username _id');

    if (!events || events.length === 0) {
      return res.status(404).json({ error: 'No events found' });
    }

    // Add the `myEvent` key to each event
    const updatedEvents = events.map(event => {
      const isMyEvent = event.creator._id.toString() === userId?.toString();
      return {
        ...event.toObject(), // Convert Mongoose document to plain object
        myEvent: isMyEvent // Add the `myEvent` key
      };
    });

    res.status(200).json(updatedEvents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};