const mongoose = require('mongoose');
const User = require('./User');
const Event = require('./Event');

const notificationSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  eventId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Event',
  },
  message: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['invitation', 'discussion', 'event'], 
    default: 'null' 
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

module.exports = mongoose.model('Notification', notificationSchema);