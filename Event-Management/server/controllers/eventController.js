const Event = require('../models/Event');
const User = require('../models/User');
const Notification = require('../models/Notification');
const EventParticipants = require('../models/EventParticipants');
const EventOrganizers = require('../models/EventOrganizers');

exports.createEvent = async (req, res) => {
    try {
      const {
        title,
        description,
        startDate,
        endDate,
        location,
        isPublic,
        maxParticipants,
        category
      } = req.body;

      const event = new Event({
        title,
        description,
        startDate,
        endDate,
        location,
        isPublic,
        maxParticipants,
        category,
        organizer: req.user.userId
      });

      await event.save();

      // Add event to organizer's events
      await User.findByIdAndUpdate(req.user.userId, {
        $push: { events: event._id }
      });

      res.status(201).json({
        message: 'Event created successfully',
        event
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating event', error: error.message });
    }
};

exports.getPublicEvents = async (req, res) => {
  try {
    const events = await Event.find({ isPublic: true })
      .populate('organizer', 'username email')
      .sort({ startDate: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error getting events', error: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'username email')
      .populate('participants.user', 'username email');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user has access to private event
    if (!event.isPublic && 
        event.organizer._id.toString() !== req.user.userId && 
        !event.participants.some(p => p.user._id.toString() === req.user.userId)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error getting event', error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is organizer
    if (event.organizer.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Only organizer can update event' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );

    // Notify participants about update
    const notification = new Notification({
      recipient: req.user.userId,
      event: event._id,
      type: 'update',
      message: `Event "${event.title}" has been updated`
    });
    await notification.save();

    res.json({
      message: 'Event updated successfully',
      event: updatedEvent
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is organizer
    if (event.organizer.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Only organizer can delete event' });
    }

    await Event.findByIdAndDelete(req.params.id);

    // Remove event from organizer's events
    await User.findByIdAndUpdate(req.user.userId, {
      $pull: { events: event._id }
    });

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
};

exports.joinEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if event is public
    if (!event.isPublic) {
      return res.status(403).json({ message: 'Cannot join private event' });
    }

    // Check if user is already a participant
    if (event.participants.some(p => p.user.toString() === req.user.userId)) {
      return res.status(400).json({ message: 'Already joined event' });
    }

    // Check if event is full
    if (event.maxParticipants > 0 && 
        event.participants.filter(p => p.status === 'accepted').length >= event.maxParticipants) {
      return res.status(400).json({ message: 'Event is full' });
    }

    // Add user to participants
    event.participants.push({
      user: req.user.userId,
      status: 'pending'
    });
    await event.save();

    // Create notification for organizer
    const notification = new Notification({
      recipient: event.organizer,
      event: event._id,
      type: 'response',
      message: `New join request for event "${event.title}"`
    });
    await notification.save();

    res.json({ message: 'Join request sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error joining event', error: error.message });
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