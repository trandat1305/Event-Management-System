const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, 
    required: true, 
    unique: true },
  email: { type: String, 
    required: true, 
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Simple email regex
   },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'organizer', 'attendee'], default: 'attendee' },
  isDeleted: { 
    type: Boolean, 
    default: false 
  },
}, { timestamps: true 
});
userSchema.index({ email: 1 }, 
    { unique: true }); // Already implicit from schema
userSchema.index({ username: 1 }, 
    { unique: true }); // Already implicit

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

module.exports = mongoose.model('User', userSchema);