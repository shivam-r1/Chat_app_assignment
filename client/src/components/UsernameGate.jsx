import { useState, useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

export default function UsernameGate() {
  const [inputVal, setInputVal] = useState('');
  const { setUsername } = useContext(ChatContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setUsername(inputVal.trim());
    }
  };

  return (
    <div className="username-gate-container">
      <div className="username-gate-card">
        <h2>Welcome to Chat</h2>
        <p>Please enter your username to join the chat</p>
        <form onSubmit={handleSubmit} className="username-form">
          <input
            type="text"
            className="username-input"
            placeholder="Enter your username..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            required
            autoFocus
          />
          <button type="submit" className="username-submit-btn">
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
}
