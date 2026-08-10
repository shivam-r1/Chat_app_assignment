export default function MessageItem({ message }) {
  if (!message) return null;

  const { username = 'Unknown', message: text = '', timestamp = '' } = message;

  return (
    <div className="message-item">
      <div className="message-header">
        <span className="message-username">{username}</span>
        {timestamp && <span className="message-timestamp">{timestamp}</span>}
      </div>
      <div className="message-body">{text}</div>
    </div>
  );
}
