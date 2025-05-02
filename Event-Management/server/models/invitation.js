const mongoose = require('mongoose');
const Event = require('./Event');
const User = require('./User');

const invitationSchema = new mongoose.Schema({
  eventId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Event', 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  rsvpStatus: { 
    type: String, 
    enum: ['pending', 'accepted', 'declined'], 
    default: 'pending' 
  },

  timeSent: { 
    type: Date, 
    default: Date.now 
  },
  timeResponded: {
    type: Date,
    default: null 
  },
  isDeleted: { 
    type: Boolean, 
    default: false 
  },
}, { timestamps: true 
});

// Auto set timeResponded when RSVP status changes
invitationSchema.pre('save', function(next) {
  if (this.isModified('rsvpStatus') && this.rsvpStatus !== 'pending' && !this.timeResponded) {
    this.timeResponded = new Date();
  }
  next();
});

invitationSchema.pre(/^find/, function(next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

invitationSchema.methods.softDelete = async function() {
  this.isDeleted = true;
  return await this.save();
};

invitationSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  if (update.rsvpStatus && update.rsvpStatus !== 'pending' && !update.timeResponded) {
    this.setUpdate({ 
      ...update, 
      timeResponded: new Date()
    });
  }
  next();
});

invitationSchema.index({ eventId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Invitation', invitationSchema);