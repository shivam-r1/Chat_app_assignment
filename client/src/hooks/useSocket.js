import { useState, useEffect } from 'react';
import socket from '../services/socket';

export default function useSocket(username) {
  const [status, setStatus] = useState(socket.connected ? 'connected' : 'connecting');

  useEffect(() => {
    if (!username) {
      setStatus('connecting');
      return;
    }

    const handleConnect = () => {
      setStatus('connected');
      socket.emit('join_room', { username, room: 'general' });
    };

    const handleDisconnect = () => {
      setStatus('disconnected');
    };

    const handleConnectError = () => {
      setStatus('disconnected');
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
      setStatus('connecting');
    };
  }, [username]);

  return { connected: status === 'connected', status };
}
