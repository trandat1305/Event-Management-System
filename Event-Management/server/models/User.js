const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Simple email regex
  },
  password: { 
    type: String, 
    required: true 
  },
  // role: { type: String, enum: ['admin', 'organizer', 'attendee'], default: 'attendee' },
  isAdmin: { 
    type: Boolean, 
    default: false 
  },
  isDeleted: { 
    type: Boolean, 
    default: false 
  },
  imageURL: { 
    type: String,
    default: 'defaultAvatar.jpg', // reminder to change to your default avatar path
    validate: {
      validator: function(v) {
        if (!v) return true;  
        return /^(http|https):\/\/\S+\.(jpg|jpeg|png|webp)$/.test(v);
      },
      message: 'Invalid image URL'
    }
  },
}, { timestamps: true 
});
userSchema.index({ email: 1 }, 
    { unique: true }); // Already implicit from schema
userSchema.index({ username: 1 }, 
    { unique: true }); // Already implicit

// Middleware to exclude soft-deleted users
userSchema.pre(/^find/, function(next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

// Soft delete method
userSchema.methods.softDelete = async function() {
  this.isDeleted = true;
  return await this.save();
};

// Hash the password before saving the user
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10); // 10 rounds
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.resetPassword = async function(newPassword) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(newPassword, salt);
  return await this.save();
};

// Method to compare password during login
userSchema.methods.comparePassword = async function(submittedPassword) {
  return await bcrypt.compare(submittedPassword, this.password);
};

// Method to update the profile image
userSchema.methods.updateProfileImage = async function(newImageURL) {
  this.imageURL = newImageURL;
  return await this.save();
};


// Method to get public profile (without password)
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;  // Omit password field
  return userObject;
};

module.exports = mongoose.model('User', userSchema);