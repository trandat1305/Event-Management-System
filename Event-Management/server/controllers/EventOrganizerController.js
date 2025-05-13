
const EventOrganizer = require('../models/EventOrganizer'); // Import the EventOrganizer model

class EventOrganizerController {
    // Create a new EventOrganizer
    static async create(req, res) {
        try {
            const eventOrganizer = await EventOrganizer.create(req.body);
            res.status(201).json(eventOrganizer);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Get all EventOrganizers
    static async getAll(req, res) {
        try {
            const eventOrganizers = await EventOrganizer.find({});
            res.status(200).json(eventOrganizers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get a single EventOrganizer by ID
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const eventOrganizer = await EventOrganizer.findById(id);
            if (!eventOrganizer) {
                return res.status(404).json({ error: 'EventOrganizer not found' });
            }
            res.status(200).json(eventOrganizer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update an EventOrganizer by ID
    static async update(req, res) {
        try {
            const { id } = req.params;
            const updatedEventOrganizer = await EventOrganizer.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedEventOrganizer) {
                return res.status(404).json({ error: 'EventOrganizer not found' });
            }
            res.status(200).json(updatedEventOrganizer);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Delete an EventOrganizer by ID
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedEventOrganizer = await EventOrganizer.findByIdAndDelete(id);
            if (!deletedEventOrganizer) {
                return res.status(404).json({ error: 'EventOrganizer not found' });
            }
            res.status(200).json({ message: 'EventOrganizer deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = EventOrganizerController;