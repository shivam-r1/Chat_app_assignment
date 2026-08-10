import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import socket from '../services/socket';

export function sendMessage({ username, message, room }) {
  socket.emit('send_message', { username, message, room });
}

export default function useChatMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socketError, setSocketError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/messages');
        if (isMounted) {
          setMessages(response.data?.messages || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.error || err.message || 'Failed to fetch messages');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMessages();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleNewMessage = (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    };

    const handleErrorMessage = (data) => {
      setSocketError(data?.message || data || 'An error occurred on the socket');
    };

    socket.on('new_message', handleNewMessage);
    socket.on('error_message', handleErrorMessage);

    return () => {
      socket.off('new_message', handleNewMessage);
      socket.off('error_message', handleErrorMessage);
    };
  }, []);

  const clearSocketError = useCallback(() => setSocketError(null), []);

  return { messages, loading, error, socketError, sendMessage, clearSocketError };
}
