const mongoose = require('mongoose');
const User = require('./User');
const Event = require('./Event');

const participationSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    event: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Event', 
        required: true 
    },
    joinedAt: { 
        type: Date, 
        default: Date.now 
    },
    isDeleted: { 
        type: Boolean, 
        default: false 
    },
});

participationSchema.index({ user: 1, event: 1 }, { unique: true });

// Soft delete participation
participationSchema.methods.softDelete = async function () {
    this.isDeleted = true;
    return await this.save();
};

// Check if participation is active
participationSchema.methods.isActive = function () {
    return !this.isDeleted;
}; 

participationSchema.statics.getParticipants = async function (eventId) {
  return this.find({ event: eventId, isDeleted: { $ne: true } })
    .populate('user', 'username _id');
};

participationSchema.statics.getParticipantCount = async function (eventId) {
    return this.countDocuments({ event: eventId, isDeleted: { $ne: true } });
};
  
// Check if a user is already participating in an event
participationSchema.statics.isUserParticipating = async function (eventId, userId) {
    return await this.exists({ event: eventId, user: userId, isDeleted: { $ne: true } });
};

// Remove a participant from an event
participationSchema.statics.removeParticipant = async function (eventId, userId) {
    const participant = await this.findOne({ event: eventId, user: userId, isDeleted: { $ne: true } });
    if (participant) {
        return await participant.softDelete();
    }
    return null;
};
    
module.exports = mongoose.model('Participant', participationSchema);