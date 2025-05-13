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
    /**
    rsvpStatus: { 
        type: String, 
        enum: ['yes', 'no', 'maybe'], 
        default: 'maybe'
    }, */
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

// Get all active participants for an event
participationSchema.statics.getActiveParticipants = async function (eventId) {
    return this.find({ event: eventId, isDeleted: { $ne: true } }).populate('user');
};
  
// Check if a user is already participating in an event
participationSchema.statics.isUserParticipating = async function (eventId, userId) {
    return await this.exists({ event: eventId, user: userId, isDeleted: { $ne: true } });
};
    
module.exports = mongoose.model('Participant', participationSchema);