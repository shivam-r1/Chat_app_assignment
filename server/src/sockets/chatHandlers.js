const messageService = require('../services/messageService');

const roomUsers = new Map();
const socketRooms = new Map();

function getOnlineUsers(room) {
  const users = roomUsers.get(room);
  if (!users) return [];
  return Array.from(users.values());
}

function addUserToRoom(socketId, room, username) {
  if (!roomUsers.has(room)) {
    roomUsers.set(room, new Map());
  }
  roomUsers.get(room).set(socketId, username);
  socketRooms.set(socketId, { room, username });
}

function removeUserFromRoom(socketId) {
  const info = socketRooms.get(socketId);
  if (!info) return null;

  const { room, username } = info;
  const users = roomUsers.get(room);

  if (users) {
    users.delete(socketId);
    if (users.size === 0) {
      roomUsers.delete(room);
    }
  }

  socketRooms.delete(socketId);
  return { room, username };
}

function validateUsername(username) {
  if (username === undefined || username === null) {
    return { error: 'username is required' };
  }

  if (typeof username !== 'string') {
    return { error: 'username must be a string' };
  }

  const trimmedUsername = username.trim();

  if (!trimmedUsername) {
    return { error: 'username must be non-empty' };
  }

  if (trimmedUsername.length > 30) {
    return { error: 'username must be at most 30 characters' };
  }

  return { username: trimmedUsername };
}

function validateSocketMessage({ username, message }) {
  const usernameResult = validateUsername(username);
  if (usernameResult.error) {
    return usernameResult;
  }

  if (message === undefined || message === null) {
    return { error: 'message is required' };
  }

  if (typeof message !== 'string') {
    return { error: 'message must be a string' };
  }

  const trimmedMessage = message.trim();

  if (!trimmedMessage) {
    return { error: 'message must be non-empty' };
  }

  if (trimmedMessage.length > 1000) {
    return { error: 'message must be at most 1000 characters' };
  }

  return {
    username: usernameResult.username,
    message: trimmedMessage,
  };
}

function leaveCurrentRoom(socket, io) {
  const current = socketRooms.get(socket.id);
  if (!current) return;

  socket.leave(current.room);
  removeUserFromRoom(socket.id);
  io.to(current.room).emit('user_left', {
    username: current.username,
    onlineUsers: getOnlineUsers(current.room),
  });
}

function registerChatHandlers(socket, io) {
  socket.on('join_room', async ({ username, room = 'general' }) => {
    try {
      const usernameResult = validateUsername(username);
      if (usernameResult.error) {
        socket.emit('error_message', { message: usernameResult.error });
        return;
      }

      leaveCurrentRoom(socket, io);

      socket.join(room);
      addUserToRoom(socket.id, room, usernameResult.username);

      io.to(room).emit('user_joined', {
        username: usernameResult.username,
        onlineUsers: getOnlineUsers(room),
      });
    } catch (error) {
      socket.emit('error_message', {
        message: error.message || 'An error occurred',
      });
    }
  });

  socket.on('send_message', async ({ username, message, room = 'general' }) => {
    try {
      const validation = validateSocketMessage({ username, message });
      if (validation.error) {
        socket.emit('error_message', { message: validation.error });
        return;
      }

      const saved = await messageService.createMessage({
        username: validation.username,
        message: validation.message,
        room,
      });

      io.to(room).emit('new_message', {
        _id: saved._id,
        username: saved.username,
        message: saved.message,
        room: saved.room,
        createdAt: saved.createdAt,
      });
    } catch (error) {
      socket.emit('error_message', {
        message: error.message || 'An error occurred',
      });
    }
  });

  socket.on('typing', ({ username, room = 'general' }) => {
    try {
      const usernameResult = validateUsername(username);
      if (usernameResult.error) {
        socket.emit('error_message', { message: usernameResult.error });
        return;
      }

      socket.to(room).emit('user_typing', { username: usernameResult.username });
    } catch (error) {
      socket.emit('error_message', {
        message: error.message || 'An error occurred',
      });
    }
  });

  socket.on('stop_typing', ({ username, room = 'general' }) => {
    try {
      const usernameResult = validateUsername(username);
      if (usernameResult.error) {
        socket.emit('error_message', { message: usernameResult.error });
        return;
      }

      socket.to(room).emit('user_typing', { username: usernameResult.username });
    } catch (error) {
      socket.emit('error_message', {
        message: error.message || 'An error occurred',
      });
    }
  });

  socket.on('disconnect', () => {
    try {
      const removed = removeUserFromRoom(socket.id);
      if (!removed) return;

      io.to(removed.room).emit('user_left', {
        username: removed.username,
        onlineUsers: getOnlineUsers(removed.room),
      });
    } catch (error) {
      console.error('Disconnect handler error:', error.message);
    }
  });
}

module.exports = registerChatHandlers;
