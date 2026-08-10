import { useState, useEffect } from 'react';
import api from '../services/api';

export default function useChatMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return { messages, loading, error };
}

