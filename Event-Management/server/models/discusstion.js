const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // Reference to Event model 
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model 
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: [1000, 'Message must not exceed 1000 characters']
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isDeleted: { 
    type: Boolean, 
    default: false 
  },
}, { timestamps: true 
});

// Middleware to exclude soft-deleted users
userSchema.pre(/^find/, function(next) {
  this.where({ isDeleted: false });
  next();
});

// Soft delete method
userSchema.methods.softDelete = async function() {
  this.isDeleted = true;
  await this.save();
};

module.exports = mongoose.model('Discussion', discussionSchema);