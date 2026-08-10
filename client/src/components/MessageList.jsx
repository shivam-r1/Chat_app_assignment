import MessageItem from './MessageItem';

export default function MessageList({ messages = [], loading = false, error = null }) {
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
    <div className="message-list">
      {messages.map((msg, index) => (
        <MessageItem key={msg._id || msg.id || index} message={msg} />
      ))}
    </div>
  );
}

