const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'Event', 
    required: true },
  user: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true },
  rsvpStatus: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
  isDeleted: { 
    type: Boolean, 
    default: false 
  },
}, { timestamps: true 
});
invitationSchema.index({ event: 1, user: 1 }, { unique: true });

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

module.exports = mongoose.model('Invitation', invitationSchema);