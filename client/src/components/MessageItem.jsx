export default function MessageItem({ message }) {
  if (!message) return null;

  const { username = 'Unknown', message: text = '', createdAt, timestamp } = message;

  let formattedTime = timestamp;
  if (!formattedTime && createdAt) {
    formattedTime = new Date(createdAt).toLocaleTimeString();
  }

  return (
    <div className="message-item">
      <div className="message-header">
        <span className="message-username">{username}</span>
        {formattedTime && <span className="message-timestamp">{formattedTime}</span>}
      </div>
      <div className="message-body">{text}</div>
    </div>
  );
}

