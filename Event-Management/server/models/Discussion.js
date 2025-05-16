const mongoose = require('mongoose');
const Event = require('.models/event');
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
  imageURL: [{ 
    type: String,
    default: null,
    validate: {
      validator: function(v) {
        if (!v) return true;  
        return /^(http|https):\/\/\S+\.(jpg|jpeg|png|webp)$/.test(v);
      },
      message: 'Invalid image URL'
    }
  }],
  replyToMessageId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Message', 
    default: null  // Tracks if the message is a reply to another message
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

// Return the full message unless it's deleted
messageSchema.set('toJSON', {
  transform: function(doc, ret) {
    if (ret.isDeleted) {
      return {
        _id: ret._id,
        content: 'Message deleted',
        createdAt: ret.createdAt,
        updatedAt: ret.updatedAt
      };
    }

    // Otherwise, return the full message
    return ret;
  }
});

// Middleware to exclude soft-deleted messages
messageSchema.pre(/^find/, function(next) {
  this.where({ isDeleted: { $ne: true } }); // Excludes soft-deleted messages
  next();
});

// Soft delete method
messageSchema.methods.softDelete = async function() {
  this.isDeleted = true;
  return await this.save();
};

messageSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  if (update.content) {
    update.isEdited = true;
    this.setUpdate(update);
  }
  next();
});

messageSchema.methods.editContent = async function(newContent) {
  this.content = newContent;
  this.isEdited = true;
  return await this.save();
};


module.exports = mongoose.model('Message', messageSchema);