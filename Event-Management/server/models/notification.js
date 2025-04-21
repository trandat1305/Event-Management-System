const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true },
  event: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'Event' },
  message: { type: String, 
    required: true },
  read: { type: Boolean, 
    default: false },
  createdAt: { type: Date, 
    default: Date.now },
  isDeleted: { 
    type: Boolean, 
    default: false 
  },
}, { timestamps: true 
});
notificationSchema.index({ user: 1, read: 1 }); // Faster "unread notifications" queries

// Middleware to exclude soft-deleted users
userSchema.pre(/^find/, function(next) {
  this.where({ isDeleted: false });
  next();
});

// Soft delete method
userSchema.methods.softDelete = async function() {
  this.isDeleted = true;
  await this.save();
};

module.exports = mongoose.model('Notification', notificationSchema);