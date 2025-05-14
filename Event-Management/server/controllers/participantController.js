const Participant = require('../models/EventParticipants');
const eventOrganizer = require('../models/EventOrganizers');

exports.joinEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user._id; // Get user ID from the authenticated user

        // Check if the user is already a participant
        const isParticipating = await Participant.isUserParticipating(eventId, userId);
        if (isParticipating) {
            return res.status(400).json({ error: 'User is already participating in this event.' });
        }   

        // Create a new participant entry
        const participant = await Participant.create({ event: eventId, user: userId });
        res.status(201).json(participant);
    } catch (err) {
        res.status(500).json({ error: 'Failed to join event', errorMessage: err.message });
    }
};

exports.leaveEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user._id; // Get user ID from the authenticated user

        // Check if the user is a participant
        const isParticipating = await Participant.isUserParticipating(eventId, userId);
        if (!isParticipating) {
            return res.status(400).json({ error: 'User is not participating in this event.' });
        }

        // Soft delete the participant entry
        const participant = await Participant.findOne({ event: eventId, user: userId });
        await participant.softDelete();
        res.status(200).json({ message: 'Successfully left the event.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to leave event', errorMessage: err.message });
    }
}

exports.getEventParticipants = async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user._id; // Get user ID from the authenticated user

        // maybe this should only be for people who attend the event?

        // Get all participants for the event
        const participants = await Participant.find({ event: eventId, isDeleted: { $ne: true } })
            .populate('user', 'username _id')
            .populate('event', 'title _id');

        res.status(200).json(participants);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get participants', errorMessage: err.message });
    }
};

exports.getEventAttendeeCount = async (req, res) => {
    try {
        const { eventId } = req.params;
        
        // Get the count of active participants for the event
        const count = await Participant.countDocuments({ event: eventId, isDeleted: { $ne: true } });
        res.status(200).json({ count });
    } catch (err) {
        res.status(500).json({ error: 'Failed to get attendee count', errorMessage: err.message });
    }
}

exports.deleteParticipant = async (req, res) => {
    try {
        const userId = req.user._id; // Get user ID from the authenticated user
        const { eventId, participantId } = req.params; // Get event ID and user ID from the request parameters

        // Check if the user is an organizer of the event
        const isOrganizer = await eventOrganizer.exists({ event: eventId, user: userId });
        if (!isOrganizer) {
            return res.status(403).json({ error: 'User is not authorized to delete participants.' });
        }

        // Soft delete the participant entry
        const participant = await Participant.findOne({ event: eventId, user: participantId });
        if (!participant) {
            return res.status(404).json({ error: 'Participant not found.' });
        }
        
        await participant.softDelete();
        res.status(200).json({ message: 'Participant deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete participant', errorMessage: err.message });
    }
}