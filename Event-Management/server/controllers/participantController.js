const Participant = require('../models/eventParticipants');

exports.joinEventManual = async (req, res) => {
    try {
        const { userId, eventId } = req.params;

        // Check if the user is already a participant
        const existingParticipant = await Participant.findOne({ event: eventId, user: userId });
        if (existingParticipant) {
            return res.status(400).json({ error: 'Already joined the event' });
        }

        // Create a new participant entry
        const participant = await Participant.create({ event: eventId, user: userId });
        res.status(201).json(participant);
    } catch (err) {
        res.status(500).json({ error: 'Failed to join event' });
    }
}

exports.joinEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user._id;

        // Check if the user is already a participant
        const existingParticipant = await Participant.findOne({ event: eventId, user: userId });
        if (existingParticipant) {
            return res.status(400).json({ error: 'Already joined the event' });
        }

        // Create a new participant entry
        const participant = await Participant.create({ event: eventId, user: userId });
        res.status(201).json(participant);
    } catch (err) {
        res.status(500).json({ error: 'Failed to join event' });
    }
}