const Event = require('../models/Event');
const invitation = require('../models/Invitation');
const Notification = require('../models/Notification');

// Create Event
exports.createEvent = async (req, res) => {
    try {
      const { title, description, isPublic, location, startTime, endTime } = req.body;
      const organizer = req.user._id;
  
      const event = new Event({ title, description, isPublic, startTime, endTime, creator: organizer, imageUrl: req.file?.path, location });
      await event.save();

      res.status(201).json(event);
    } catch (err) {
      res.status(500).json(err);
    }
};

exports.getEventById = async (req, res) => {
    try {
      const eventId = req.params.id;
      const event = await Event.findById(eventId).populate('creator', 'username');
      if (!event) return res.status(404).json({ error: 'Event not found' });
      res.status(200).json(event);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch event', errorMessage: err.message });
}};
  
  // Update Event
exports.updateEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ error: 'Event not found' });
  
      const oldEvent = event.toObject();

      // Destructure fields from req.body
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
      const eventId = req.params.id;

      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ error: 'Event not found' });
      
      event.softDelete();
  
      // Notify attendees about cancellation

      // Delete all attendees from the Eventparticipants collection
      
  
      res.json({ message: 'Event deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete event', errorMessage: err.message });
    }
};
  
  //Calendar for event
exports.getCalendarEvents = async (req, res) => {
  try {
    const userId = req.user._id;
    const { month, year } = req.query; // Ex:., month=5, year=2025

    // 1. Get hosted events
    const hostedEvents = await Event.find({
      organizer: userId,
      startTime: { 
        $gte: new Date(year, month - 1, 1), 
        $lt: new Date(year, month, 1) 
      }
    });

    // 2. Get accepted invitations
    const acceptedInvites = await Invitation.find({
      user: userId,
      rsvpStatus: 'accepted'
    }).populate('event');

    // 3. Process dates
    const dateMap = new Map();
    
    hostedEvents.forEach(event => {
      const date = event.startTime.toISOString().split('T')[0];
      dateMap.set(date, [...(dateMap.get(date) || []), 'hosting']);
    });

    acceptedInvites.forEach(invite => {
      const date = invite.event.startTime.toISOString().split('T')[0];
      dateMap.set(date, [...(dateMap.get(date) || []), 'attending']);
    });

    // 4. Format response
    const events = Array.from(dateMap.entries()).map(([date, types]) => ({
      date,
      types: [...new Set(types)] // Deduplicate
    }));

    res.json({ events });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch calendar data' });
  }
};

exports.getAllPublicEvents = async (req, res) => {
    try {
      const events = await Event.find().populate('creator', 'username');
      res.status(200).json(events);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

