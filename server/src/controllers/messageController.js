const messageService = require('../services/messageService');

async function sendMessage(req, res, next) {
  try {
    const message = await messageService.createMessage(req.body);
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
}

async function getMessages(req, res, next) {
  try {
    const { room, limit } = req.query;
    const messages = await messageService.getHistory({ room, limit });
    res.status(200).json({ messages });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  sendMessage,
  getMessages,
};
