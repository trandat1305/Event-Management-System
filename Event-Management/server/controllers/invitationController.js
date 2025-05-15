const Invitation = require('../models/Invitation');
const User = require('../models/User');
const Event = require('../models/Event');
const eventOrganizer = require('../models/EventOrganizers');

exports.sendInvitation = async (req, res) => {
    try {
        const { eventId, userId } = req.body;
        const senderId = req.user._id; // Get user ID from the authenticated user
    
        // Check if the event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the invitation already exists
        const existingInvitation = await Invitation.findOne({
            eventId: eventId,
            userId: userId,
            senderId: senderId,
        });

        if (existingInvitation) {
            return res.status(400).json({ error: 'Invitation already sent' });
        }

        // Create a new invitation
        const invitation = new Invitation({
            eventId: eventId,
            userId: userId,
            senderId: senderId,
        });

        await invitation.save();

        // Optionally, you can send a notification to the invited user
        res.status(201).json({ message: 'Invitation sent successfully', invitation });
    } catch (err) {
        res.status(500).json({ error: 'Failed to send invitation', errorMessage: err.message });
    }
};   

exports.acceptInvitation = async (req, res) => {
    try {
        const { invitationId } = req.params;
        const userId = req.user._id; // Get user ID from the authenticated user

        // Find the invitation
        const invitation = await Invitation.findOne({ _id: invitationId, userId: userId });

        if (!invitation) {
            return res.status(404).json({ error: 'Invitation not found' });
        }

        // Update the RSVP status to 'accepted'
        await invitation.acceptInvitation();

        res.status(200).json({ message: 'Invitation accepted successfully', invitation });
    } catch (err) {
        res.status(500).json({ error: 'Failed to accept invitation', errorMessage: err.message });
    }
}

exports.rejectInvitation = async (req, res) => {
    try {
        const { invitationId } = req.params;
        const userId = req.user._id; // Get user ID from the authenticated user

        // Find the invitation
        const invitation = await Invitation.findOne({ _id: invitationId, userId: userId });

        if (!invitation) {
            return res.status(404).json({ error: 'Invitation not found' });
        }

        // Update the RSVP status to 'rejected'
        await invitation.rejectInvitation();

        res.status(200).json({ message: 'Invitation rejected successfully', invitation });
    } catch (err) {
        res.status(500).json({ error: 'Failed to reject invitation', errorMessage: err.message });
    }
}

exports.getAllInvitations = async (req, res) => {
    try {
        const userId = req.user._id; // Get user ID from the authenticated user

        // Find all invitations for the user
        const invitations = await Invitation.find({ userId: userId })
            .populate({
                path: 'eventId',
                select: 'title description startTime endTime location _id',
                populate: {
                    path: 'creator', // Populate the creator field within the event
                    select: 'username _id' // Include username and _id of the creator
                }
            })
            .populate('senderId', 'username _id');

        res.status(200).json(invitations);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch invitations', errorMessage: err.message });
    }
}

exports.getSentInvitations = async (req, res) => {
    try {
        const senderId = req.user._id; // Get user ID from the authenticated user

        // Find all invitations sent by the user
        const invitations = await Invitation.find({ senderId: senderId })
            .populate('userId', 'username _id')
            .populate('eventId', 'title description startTime endTime location _id');

        res.status(200).json(invitations);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch sent invitations', errorMessage: err.message });
    }
}

exports.getAllInvitationsForEvent = async (req, res) => {
    try {
        const { eventId } = req.params;

        const userId = req.user._id; // Get user ID from the authenticated user

        // Check if the user is the organizer of the event
        const isOrganizer = await eventOrganizer.findOne({ eventId: eventId, userId: userId });
        if (!isOrganizer) {
            return res.status(403).json({ error: 'You are not authorized to view invitations for this event' });
        }

        // Find all invitations for the specified event
        const invitations = await Invitation.find({ eventId: eventId })
            .populate('userId', 'username _id')
            .populate('senderId', 'username _id');

        res.status(200).json(invitations);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch invitations', errorMessage: err.message });
    }
}

exports.getSentInvitationsForEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const senderId = req.user._id; // Get user ID from the authenticated user

        // Find all invitations sent by the user for the specified event
        const invitations = await Invitation.find({ eventId: eventId, senderId: senderId })
            .populate('userId', 'username _id')
            .populate('senderId', 'username _id');

        res.status(200).json(invitations);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch sent invitations', errorMessage: err.message });
    }
}