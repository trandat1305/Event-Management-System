const mongoose = require('mongoose');
const User = require('./User');

const eventSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  isPublic: { 
    type: Boolean, default: true 
  },
  startTime: { 
    type: Date, 
    required: true 
  },
  endTime: { 
    type: Date, 
    required: true 
  },
  creator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', required: true 
  },
  imageURL: [{ 
    type: String,
    default: 'defaultPicture.jpg', // reminder to change to your default picture path
    validate: {
      validator: function(v) {
        if (!v) return true;  
        return /^(http|https):\/\/\S+\.(jpg|jpeg|png|webp)$/.test(v);
      },
      message: 'Invalid image URL'
    }
  }],
  status: { 
    type: String, 
    enum: ['active','cancelled', "finished"],
    default: 'active'
  },
  location: {
      type: String,
      required: true
  },
  isDeleted: { 
    type: Boolean, 
    default: false 
  },
}, {
  timestamps:true
});

// Schema-level validator for startTime and endTime
eventSchema.path('endTime').validate(function(value) {
  // `this` refers to the document
  return this.startTime && value > this.startTime;
}, 'End time must be after start time');

// Another schema-level validator for startTime being in future
eventSchema.path('startTime').validate(function(value) {
  return value > Date.now();
}, 'Start time must be in the future');

module.exports = mongoose.model('Event', eventSchema);