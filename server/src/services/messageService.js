const Message = require('../models/Message');

async function createMessage({ username, message, room = 'general' }) {
  const doc = new Message({ username, message, room });
  return doc.save();
}

async function getHistory({ room = 'general', limit = 50 } = {}) {
  const parsedLimit = Math.min(Math.max(Number(limit) || 50, 1), 100);

  return Message.find({ room }).sort({ createdAt: 1 }).limit(parsedLimit);
}

module.exports = {
  createMessage,
  getHistory,
};
