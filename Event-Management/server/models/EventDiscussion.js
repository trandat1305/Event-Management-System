const mongoose = require('mongoose');
const Event = require('./Event');
const User = require('./User');


// Message Schema
const messageSchema = new mongoose.Schema({
  eventId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Event', 
    required: true
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },
  content: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: [1000, 'Message must not exceed 1000 characters']
  },
  isEdited: { 
    type: Boolean, 
    default: false 
  },
  isDeleted: { 
    type: Boolean, 
    default: false  // Marks the message as deleted or not
  }
}, { timestamps: true }
);

// Soft delete method
messageSchema.methods.softDelete = async function() {
  this.isDeleted = true;
  return await this.save();
};

module.exports = mongoose.model('Message', messageSchema);