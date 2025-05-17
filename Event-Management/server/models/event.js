const mongoose = require('mongoose');
const User = require('./User');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined'],
      default: 'pending'
    }
  }],
  maxParticipants: {
    type: Number,
    default: 0 // 0 means unlimited
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  discussions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discussion'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  imageURL: { 
    type: String,
    default: 'uploads/defaultPicture.jpg', // reminder to change to your default picture path
    validate: {
      validator: function(v) {
        if (!v) return true;  
        return /^(uploads\/\S+\.(jpg|jpeg|png|webp)$)|(https?:\/\/\S+\.(jpg|jpeg|png|webp))$/.test(v);
      },
      message: 'Invalid image URL'
    }
  },
  status: { 
    type: String, 
    enum: ['active','cancelled', "finished"],
    default: 'active'
  },
  isDeleted: { 
    type: Boolean, 
    default: false 
  },
}, {
  timestamps:true
});

eventSchema.pre(/^find/, function(next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

eventSchema.methods.softDelete = async function() {
  this.isDeleted = true;
  return await this.save();
}

eventSchema.statics.findByIdIfExists = async function (id) {
  try {
    const event = await this.findById(id);
    return event || null; // Return the event if it exists, otherwise null
  } catch (err) {
    console.error('Error checking event existence:', err.message);
    return null; // Return null in case of an error
  }
};

// Schema-level validator for startTime and endTime
eventSchema.path('endDate').validate(function(value) {
  // `this` refers to the document
  return this.startDate && value > this.startDate;
}, 'End date must be after start date');

// Another schema-level validator for startTime being in future
eventSchema.path('startDate').validate(function(value) {
  return value > Date.now();
}, 'Start date must be in the future');

// Update the updatedAt timestamp before saving
eventSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Event', eventSchema);