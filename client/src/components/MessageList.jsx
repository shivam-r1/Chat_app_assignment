import MessageItem from './MessageItem';

export default function MessageList({ messages = [] }) {
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
        <MessageItem key={msg.id || index} message={msg} />
      ))}
    </div>
  );
}
