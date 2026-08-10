import { useContext, useEffect } from 'react';
import { ChatProvider, ChatContext } from './context/ChatContext';
import UsernameGate from './components/UsernameGate';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import TypingIndicator from './components/TypingIndicator';
import useChatMessages from './hooks/useChatMessages';
import useSocket from './hooks/useSocket';
import './App.css';

function ChatMain() {
  const { username, room } = useContext(ChatContext);
  const { connected, status } = useSocket(username);
  const { messages, loading, error, socketError, sendMessage, clearSocketError } = useChatMessages();

  // Clear socket error automatically when the connection is restored
  useEffect(() => {
    if (connected && socketError) {
      clearSocketError();
    }
  }, [connected, socketError, clearSocketError]);

  if (!username) {
    return <UsernameGate />;
  }

  const handleSend = (text) => {
    sendMessage({ username, message: text, room: room || 'general' });
  };

  return (
    <div className="chat-layout">
      <ChatHeader room={room} status={status} />
      <div className="chat-body">
        <MessageList messages={messages} loading={loading} error={error} currentUser={username} />
        <TypingIndicator typingUsers={[]} />
      </div>
      {socketError && (
        <div className="socket-error" role="alert">
          <span>{socketError}</span>
          <button
            className="socket-error-dismiss"
            onClick={clearSocketError}
            aria-label="Dismiss error"
          >
            ✕
          </button>
        </div>
      )}
      <MessageInput onSend={handleSend} />
    </div>
  );
}

export default function App() {
  return (
    <ChatProvider>
      <ChatMain />
    </ChatProvider>
  );
}
