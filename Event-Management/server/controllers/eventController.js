// controllers/eventController.js
const Event = require('../models/event');

// POST /api/events
exports.createEvent = async (req, res, next) => {
  try {
    const data = { ...req.body, organizer: req.user._id };
    if (req.file) data.image = req.file.path;
    const event = await Event.create(data);
    res.status(201).json(event);
  } catch (err) { next(err); }
};

// GET /api/events
exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ /* apply filters if any */ });
    res.json(events);
  } catch (err) { next(err); }
};

// GET /api/events/:id
exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'username email');
    res.json(event);
  } catch (err) { next(err); }
};

// PUT /api/events/:id
exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event || !event.organizer.equals(req.user._id))
      return res.status(403).json({ message: 'Forbidden' });
    Object.assign(event, req.body);
    await event.save();
    res.json(event);
  } catch (err) { next(err); }
};

// DELETE /api/events/:id
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event.organizer.equals(req.user._id))
      return res.status(403).json({ message: 'Forbidden' });
    await event.remove();
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
