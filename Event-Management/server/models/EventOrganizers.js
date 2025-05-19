const mongoose = require('mongoose');
const Event = require('./Event');
const User = require('./User');

const eventOrganizerSchema = new mongoose.Schema({
    eventId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Event', 
        required: true,
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    },
    joinedAt: { 
        type: Date, 
        default: Date.now 
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    }, { timestamps: true }
);

eventOrganizerSchema.index({ eventId: 1, userId: 1 }, { unique: true });

eventOrganizerSchema.statics.getOrganizers = async function(eventId) {
    return this.find({ eventId, isDeleted: { $ne: true } }).populate('userId');
};

eventOrganizerSchema.statics.isOrganizer = async function(eventId, userId) {
    return await this.exists({ eventId, userId, isDeleted: { $ne: true } });
};

// Soft remove organizer
eventOrganizerSchema.methods.softDelete = async function () {
    this.isDeleted = true;
    return await this.save();
};

// OrganizerSchema post-save hook
eventOrganizerSchema.post('save', async function () {
    const Participant = mongoose.model('Participant');
    const exists = await Participant.exists({ event: this.eventId, user: this.userId, isDeleted: false });
    if (!exists) {
      await Participant.create({ event: this.eventId, user: this.userId });
    }
});

module.exports = mongoose.model('EventOrganizer', eventOrganizerSchema);