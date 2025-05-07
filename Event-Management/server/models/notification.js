const mongoose = require('mongoose');
const User = require('./User');
const Event = require('./Event');

const notificationSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  event: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Event',
  },
  message: { 
    type: String, 
    required: true 
  },
  isRead: { 
    type: Boolean, 
    default: false 
  },
  isDeleted: { 
    type: Boolean, 
    default: false 
  },
}, { 
  timestamps: true 
});
notificationSchema.index({ user: 1, isRead: 1 }); // Faster "unread notifications" queries

// Exclude soft-deleted notifications
notificationSchema.pre(/^find/, function(next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

// Soft delete method
notificationSchema.methods.softDelete = async function() {
  this.isDeleted = true;
  return await this.save();
};

// Static method to create a new notification
notificationSchema.statics.createNotification = async function({ userId, eventId = null, message }) {
  return await this.create({
    user: userId,
    event: eventId,
    message: message,
  });
};


module.exports = mongoose.model('Notification', notificationSchema);