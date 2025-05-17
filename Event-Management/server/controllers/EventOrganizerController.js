const EventOrganizer = require('../models/EventOrganizers');
const notificationController = require('./notificationController');

exports.getEventOrganizers = async (req, res) => {
    try {
        const { eventId } = req.params; // Get the event ID from the request parameters
        const organizers = await EventOrganizer.find({ eventId }).populate('userId', 'username _id'); // Find all organizers for the event and populate user details
        res.status(200).json(organizers); // Return the list of organizers
    } catch (error) {
        res.status(500).json({ error: 'Error fetching organizers: ' + error.message }); // Handle errors
    }
}

exports.addEventOrganizer = async (req, res) => {
    try {
        const { eventId, userId } = req.params; // Get event ID and user ID from the request body

        // Check if the user is already an organizer
        if(await EventOrganizer.isOrganizer(eventId, userId)){
            return res.status(400).json({ error: 'User is already an organizer' }); // Handle case where user is already an organizer
        }

        const newOrganizer = new EventOrganizer({ eventId, userId }); // Create a new organizer entry
        await newOrganizer.save(); // Save the new organizer to the database

        // Notify the user of being a new organizer
        const event = await Event.findById(eventId); // Find the event by ID

        await notificationController.createNotification({
            userId: userId,
            eventId: eventId,
            message: `You have been added as an organizer for the event "${event.title}"`,
            type: 'event'
        });


        res.status(201).json(newOrganizer); // Return the newly created organizer
    } catch (error) {
        res.status(500).json({ error: 'Error adding organizer: ' + error.message }); // Handle errors
    }
}

exports.removeEventOrganizer = async (req, res) => {
    try {
        const { eventId, userId } = req.params; // Get event ID and user ID from the request body

        // Check if the user is already an organizer
        const organizer = await EventOrganizer.findOne({ eventId, userId }); // Find the organizer entry
        if (!organizer) {
            return res.status(404).json({ error: 'Organizer not found' }); // Handle case where organizer is not found
        }

        // Notify the user of being removed as an organizer
        const event = await Event.findById(eventId); // Find the event by ID

        await notificationController.createNotification({
            userId: userId,
            eventId: eventId,
            message: `You have been removed as an organizer for the event "${event.title}"`,
            type: 'event'
        });

        await organizer.softDelete(); // Remove the organizer from the database
        res.status(200).json({ message: 'Organizer removed successfully' }); // Return success message
    } catch (error) {
        res.status(500).json({ error: 'Error removing organizer: ' + error.message }); // Handle errors
    }
}
