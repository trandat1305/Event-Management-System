const Notification = require('../models/Notification');

// Get notifications with pagination
exports.getNotification = async (req, res) => {
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

exports.createNotification = async ({ userId, eventId, message, type }) => {
  try {
    const notification = new Notification({
      userId,
      eventId,
      message,
      type,
    });

    await notification.save();
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.notificationId;

    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    await notification.softDelete();
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete notification', errorMessage: err.message });
  }
}

exports.deleteAllNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.deleteMany({ userId: userId });
    res.status(200).json({ message: 'All notifications deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete notifications', errorMessage: err.message });
  }
};