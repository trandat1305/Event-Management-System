const mongoose = require('mongoose');
const Event = require('./Event');
const User = require('./User');

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


module.exports = mongoose.model('EventOrganizer', eventOrganizerSchema);