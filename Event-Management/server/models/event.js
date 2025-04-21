const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  isPublic: { type: Boolean, default: true },
  startTime: { type: Date, required: true,
    validate: {
      function(v){ 
        return v > Date.now();
      },
      message:'Event must be scheduled in the future'
    }
   },
  endTime: { type: Date, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String,
    validate: (v) => /^(http|https):\/\/\S+\.(jpg|jpeg|png|webp)$/.test(v),
    message: 'Invalid image URL',
   },
  status: { type: String, enum: ['active','cancelled'],
    default: 'active'
  },
  isDeleted: { type: Boolean, default: false },
}, {
  timestamp:true
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

module.exports = mongoose.model('Event', eventSchema);