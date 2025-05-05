const mongoose = require('mongoose');
const Event = require('./Event');
const User = require('./User');
const Participant = require('./Participants');

const eventOrganizerSchema = new mongoose.Schema({
    eventId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Event', 
        required: true },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true },
    status: { 
      type: String, 
      enum: ['pending', 'accepted', 'rejected'], 
      default: 'pending' 
    },
    invitedAt: { type: Date, default: Date.now },
    acceptedAt: { type: Date },
    }, 
    { timestamps: true 
});

eventOrganizerSchema.index({ event: 1, user: 1 }, { unique: true });

// Get all active organizers of an event
eventOrganizerSchema.statics.getOrganizers = async function(eventId) {
    return this.find({ event: eventId, isDeleted: { $ne: true } }).populate('user');
};

// Check if a user is an organizer of a given event
eventOrganizerSchema.statics.isOrganizer = async function(eventId, userId) {
    return await this.exists({ event: eventId, user: userId, isDeleted: { $ne: true } });
};

// Soft remove organizer
eventOrganizerSchema.methods.softDelete = async function () {
    this.isDeleted = true;
    return await this.save();
};

// OrganizerSchema post-save hook
eventOrganizerSchema.post('save', async function () {
    const Participant = mongoose.model('Participant');
    const exists = await Participant.exists({ event: this.event, user: this.user, isDeleted: false });
  
    if (!exists) {
      await Participant.create({ event: this.event, user: this.user });
    }
});

module.exports = mongoose.model('EventOrganizer', eventOrganizerSchema);