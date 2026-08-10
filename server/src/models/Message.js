const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    room: {
      type: String,
      default: 'general',
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

messageSchema.index({ room: 1, createdAt: 1 });

module.exports = mongoose.model('Message', messageSchema);
