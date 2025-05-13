
const Event = require('../models/Event');
const invitation = require('../models/Invitation');
const Notification = require('../models/Notification');
// const notificationQueue = require('../Queues/NotifQueue');

// Helper function 
const getAcceptedAttendees = async (eventId) => {
    const invitations = await Invitation.find({ 
      event: eventId, 
      rsvpStatus: 'accepted' 
    });
    return invitations.map(inv => inv.user);
  };
  // Create Event
exports.createEvent = async (req, res) => {
    try {
      const { title, description, isPublic, location, startTime, endTime } = req.body;
      const organizer = req.user._id;
  
      const event = new Event({ title, description, isPublic, startTime, endTime, creator: organizer, imageUrl: req.file?.path, location });
      await event.save();

      /**
  
      // Schedule 24-hour reminder
      const delay = event.startTime - 24 * 60 * 60 * 1000;
      const attendees = await getAcceptedAttendees(event._id);

      */
      
      /**
      notificationQueue.add({
        eventId: event._id,
        userIds: attendees,
        message: 'Event starts in 24 hours!',
      }, { delay });
      */
  
      res.status(201).json(event);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  // Update Event
  exports.updateEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ error: 'Event not found' });
  
      const oldEvent = event.toObject();
      const updates = req.body;
  
      // Update fields
      event.title = updates.title || event.title;
      event.startTime = updates.startTime || event.startTime;
      event.endTime = updates.endTime || event.endTime;
      event.isPublic = updates.isPublic ?? event.isPublic;
      event.description = updates.description || event.description;
      if (updates.status === 'cancelled') event.status = 'cancelled';
  
      // Validate startTime < endTime
      if (event.startTime >= event.endTime) {
        return res.status(400).json({ error: 'End time must be after start time' });
      }
  
      await event.save();
  
      // Check for critical changes
      const isCancelled = event.status === 'cancelled';
      const fieldsChanged = ['title', 'startTime', 'endTime'].some(
        (field) => event[field]?.getTime() !== oldEvent[field]?.getTime()
      );
  
      if (isCancelled || fieldsChanged) {
        const attendees = await getAcceptedAttendees(event._id);
        const message = isCancelled 
          ? 'Event has been cancelled.' 
          : 'Event details have changed.';
  
        notificationQueue.add({ 
          eventId: event._id, 
          userIds: attendees, 
          message 
        });
      }
  
      res.json(event);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update event' });
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

