import { useContext } from 'react';
import { ChatProvider, ChatContext } from './context/ChatContext';
import UsernameGate from './components/UsernameGate';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import TypingIndicator from './components/TypingIndicator';
import './App.css';

function ChatMain() {
  const { username, room } = useContext(ChatContext);

  if (!username) {
    return <UsernameGate />;
  }

  return (
    <div className="chat-layout">
      <ChatHeader room={room} />
      <div className="chat-body">
        <MessageList messages={[]} />
        <TypingIndicator typingUsers={[]} />
      </div>
      <MessageInput />
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
