const Notification = require('../models/Notification');

// Get notifications with pagination
exports.getNotifs = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ userId: userId })
      .sort({ createdAt: -1 })
      .populate('eventId', 'title')
      .exec();
    
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications', errorMessage: err.message });
  }
};
