const Invitation = require('../models/Invitation');
const User = require('../models/User');
const Event = require('../models/Event');

// Send invitation
exports.sendInvitation = async (req, res) => {
    try {
      const { eventId, userId } = req.body;
      const organizerId = req.user._id;
  
      // Verify organizer owns the event 
      const event = await Event.findOne({ 
        _id: eventId, 
        organizer: organizerId 
      });
      if (!event) return res.status(403).json({ error: 'Unauthorized' });
  
      // Check if user exists
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      // Prevent duplicate invitations
      const existingInvite = await Invitation.findOne({ event: eventId, user: userId });
      if (existingInvite) {
        return res.status(400).json({ error: 'Invitation already sent' });
      }
  
      const invitation = await Invitation.create({ event: eventId, user: userId });
      res.status(201).json(invitation);
    } catch (err) {
      res.status(500).json({ error: 'Failed to send invitation' });
    }
  };
  
  // Update RSVP
  exports.updateRSVP = async (req, res) => {
    try {
      const { rsvpStatus } = req.body;
      const invitation = await Invitation.findById(req.params.id);
  
      if (!invitation) return res.status(404).json({ error: 'Invitation not found' });
      
      // Validate user ownership 
      if (invitation.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
  
      invitation.rsvpStatus = rsvpStatus;
      await invitation.save();
      res.json(invitation);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update RSVP' });
    }
  };