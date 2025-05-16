const EventOrganizer = require('../models/EventOrganizers'); // Import the EventOrganizer model

exports.isOrganizer = async (userId, eventId) => {
    try {
        // Check if the user is an organizer of the event
        const organizer = await EventOrganizer.findOne({ userId, eventId });
        return !!organizer; // Return true if the organizer exists, false otherwise
    } catch (error) {
        throw new Error('Error checking organizer status: ' + error.message);
    }
}