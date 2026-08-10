import { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';

export default function MessageList({ messages = [], loading = false, error = null, currentUser = '' }) {
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  if (loading) {
    return (
      <div className="message-list loading">
        <p className="loading-messages">Loading messages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="message-list error">
        <p className="error-messages">{error}</p>
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="message-list empty">
        <p className="no-messages">No messages yet</p>
      </div>
    );
  }

  return (
    <div ref={listRef} className="message-list" aria-live="polite" aria-label="Chat messages">
      {messages.map((msg, index) => (
        <MessageItem
          key={msg._id || msg.id || index}
          message={msg}
          isOwn={Boolean(currentUser && msg.username === currentUser)}
        />
      ))}
    </div>
  );
}
