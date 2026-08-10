import { useContext } from 'react';
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
  const { connected } = useSocket(username);
  const { messages, loading, error, socketError, sendMessage } = useChatMessages();

  if (!username) {
    return <UsernameGate />;
  }

  const handleSend = (text) => {
    sendMessage({ username, message: text, room: room || 'general' });
  };

  return (
    <div className="chat-layout">
      <ChatHeader room={room} connected={connected} />
      <div className="chat-body">
        <MessageList messages={messages} loading={loading} error={error} />
        <TypingIndicator typingUsers={[]} />
      </div>
      {socketError && <div className="socket-error">{socketError}</div>}
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


