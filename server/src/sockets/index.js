const registerChatHandlers = require('./chatHandlers');

function initSocket(io) {
  io.on('connection', (socket) => {
    registerChatHandlers(socket, io);
  });

  console.log('Socket.IO server ready');
}

module.exports = initSocket;
