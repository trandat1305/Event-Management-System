const Event = require('../models/Event');
const Notification = require('../models/Notification');
const EventParticipants = require('../models/EventParticipants');
const EventOrganizers = require('../models/EventOrganizers');

exports.createEvent = async (req, res) => {
    try {
      const { title, description, isPublic, location, startTime, endTime } = req.body;
      const creator = req.user._id;

      // Handle optional fields with default values
      const isPublicValue = isPublic !== undefined ? isPublic : false; // Default to false
      const descriptionValue = description || ''; // Default to an empty string
      const imageURL = req.file ? `uploads/${req.file.filename}` : null;
      
      // Initialize event data
      const eventData = {
        title,
        description: descriptionValue,
        isPublic: isPublicValue,
        startTime,
        endTime,
        creator: creator,
        imageURL,
        location
      };

      // Create and save the event
      const event = new Event(eventData);
      const newEvent = await event.save();

      // After saving the event
      if (!newEvent || !newEvent._id || !creator) {
        return res.status(500).json({ error: 'Missing event or creator information' });
      }

      const participant = new EventParticipants({
        event: newEvent._id,
        user: creator,
      });
      await participant.save();

      // Before saving, check if already exists
      const existingOrg = await EventOrganizers.findOne({ eventId: newEvent._id, userId: creator, isDeleted: { $ne: true } });
      if (!existingOrg) {
        const eventOrganizer = new EventOrganizers({
          eventId: newEvent._id,
          userId: creator,
        });
        await eventOrganizer.save();
      }

      res.status(201).json(newEvent);
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
      const eventId = req.params.eventId;

      const event = await Event.findById(eventId);
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

      const participants = await EventParticipants.getParticipants(event._id);

      // Handle status updates (e.g., cancellation)
      if (status === 'cancelled') {
        event.status = 'cancelled';

        // Notify attendees about cancellation
        const notifications = participants.map(participant => ({
          userId: participant.user._id,
          eventId: event._id,
          message: `The event "${event.title}" has been cancelled.`,
          type: 'event',
        }));

        await Notification.insertMany(notifications);
        await event.save();
        return res.status(200).json({ message: 'Event cancelled successfully' });
      }

      // Save the updated event
      await event.save();
  
      // Create a notification for the event update
      const notifications = participants.map(participant => ({
        userId: participant.user._id,
        eventId: event._id,
        message: `One or more details of the event "${event.title}" have been updated.`,
        type: 'event',
      }));
      
      await Notification.insertMany(notifications);
  
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

      // Delete all organizers from the EventOrganizers collection
      const organizers = await EventOrganizers.find({ eventId: eventId });
      if (organizers.length > 0) {
        await Promise.all(organizers.map(organizer => organizer.softDelete()));
      }
      
      // Notify attendees about cancellation
      const notifications = participants.map(participant => ({
        userId: participant.user,
        eventId: eventId,
        message: `The event "${event.title}" has been deleted.`,
        type: 'event',
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

    const events = await Event.find({ isPublic: true }).populate('creator', 'username _id');

    if (!events || events.length === 0) {
      return res.status(404).json({ error: 'No events found' });
    }

    res.status(200).json({events : events});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};