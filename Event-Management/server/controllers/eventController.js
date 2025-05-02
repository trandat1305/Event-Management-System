const Event = require('../models/Event');
const Invitation = require('../models/Invitation');
const Notification = require('../models/Notification');
const notificationQueue = require('../Queues/NotifQueue');

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
      const { title, description, isPublic, startTime, endTime } = req.body;
      const organizer = req.user._id;
  
      // Validate startTime < endTime
      if (new Date(startTime) >= new Date(endTime)) {
        return res.status(400).json({ error: 'End time must be after start time' });
      }
  
      const event = new Event({ ...req.body, organizer, imageUrl: req.file?.path });
      await event.save();
  
      // Schedule 24-hour reminder
      const delay = event.startTime - 24 * 60 * 60 * 1000;
      const attendees = await getAcceptedAttendees(event._id);
      
      notificationQueue.add({
        eventId: event._id,
        userIds: attendees,
        message: 'Event starts in 24 hours!',
      }, { delay });
  
      res.status(201).json(event);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create event' });
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