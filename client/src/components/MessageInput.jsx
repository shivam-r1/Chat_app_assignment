import { useState } from 'react';

export default function MessageInput({ onSend }) {
  const [text, setText] = useState('');
  const isEmpty = !text.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSend && text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <label htmlFor="message-input" className="sr-only">Message</label>
      <input
        id="message-input"
        type="text"
        className="message-input"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="send-btn" disabled={isEmpty}>
        Send
      </button>
    </form>
  );
}
