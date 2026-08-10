import { useState, useEffect } from 'react';
import socket from '../services/socket';

export default function useSocket(username) {
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    if (!username) {
      setConnected(false);
      return;
    }

    const handleConnect = () => {
      setConnected(true);
      socket.emit('join_room', { username, room: 'general' });
    };

    const handleDisconnect = () => {
      setConnected(false);
    };

    const handleConnectError = () => {
      setConnected(false);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleConnectError);

    if (socket.connected) {
      handleConnect();
    } else {
      socket.connect();
    }

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleConnectError);
      socket.disconnect();
      setConnected(false);
    };
  }, [username]);

  return { connected };
}

